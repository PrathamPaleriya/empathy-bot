import uuid

from fastapi import APIRouter, Body, Depends, HTTPException
from fastapi.security import OAuth2PasswordBearer
from pydantic import BaseModel

from components.auth_utils import (
    create_access_token,
    create_user_profile,
    get_current_user,
    get_user_id,
    update_user_password,
    verify_password,
)
from components.mongo_utils import (
    delete_user_by_id,
    get_user_by_email,
    get_user_by_id,
    mark_token_used,
    store_reset_token,
    user_onboarding,
    verify_reset_token,
)
from components.pine_utils import delete_user_data
from components.redis_utils import delete_core
from utils.logger_config import logger
from utils.send_mail import send_delete_account_email, send_reset_password_email, send_welcome_email

auth_router = APIRouter()


oauth2_scheme = OAuth2PasswordBearer(tokenUrl="api/v0/auth/token")


class LoginRequest(BaseModel):
    """Pydantic class for login."""
    email: str
    password: str

class SignUpRequest(BaseModel):
    """Pydantic class for singup."""
    email: str
    password: str

class ForgotPasswordRequest(BaseModel):
    """Pydantic class for ForgetPassRequest."""
    email:str

class ResetPasswordRequest(BaseModel):
    """Pydantic class for ForgetPassRequest."""
    token: str
    new_password: str

@auth_router.post("/signup")
async def signup(request: SignUpRequest):
    """Signup Route."""
    email = request.email.lower()
    password = request.password
    logger.info(
        "Signup request",
        extra={
            "email": email,
            "password": password
        }
    )

    if not email or not password:
        raise HTTPException(status_code=400, detail="Email and password required")

    try:
        user_id = create_user_profile(
            email=email,
            password=password
        )
        token = create_access_token(data={"sub": user_id})
        send_welcome_email(
            to=email
        )
        return {"access_token": token, "token_type": "bearer", "user_id": user_id}
    
    except HTTPException as http_exc:
        raise http_exc

    except Exception as e:
        logger.exception(
            "Error happened in in signup route.",
            extra={
                "exception": e,
                "email": email
            }
        )
        raise e


@auth_router.post("/login")
async def login(request: LoginRequest):
    """Login Route."""
    logger.info(
        "login request",
        extra={
            "email": request.email,
            "password": request.password
        }
    )
    try:
        user = get_user_by_email(
            email=request.email.lower()
        )
        if user and verify_password(
            request.password,
            user["profile"]["password"]
        ):
            token = create_access_token(data={"sub": str(user["_id"])})
            return {"access_token": token, "token_type": "bearer"}
        else:
            raise HTTPException(status_code=401, detail="Invalid credentials")
        
    except HTTPException as http_exc:
        raise http_exc
    
    except Exception as e:
        logger.exception(
            "Error happened in in login route.",
            extra={
                "exception": e,
                "email": request.email
            }
        )
        raise e

@auth_router.get("/me")
async def get_me(user: dict = Depends(get_current_user)):
    """User Details Route."""
    logger.info(
        "Request for user details route"
    )
    
    return {
        "email": user["profile"]["email"],
        "user_id": str(user["_id"]),
        "core_memory": user.get("core_memory", {})
    }


@auth_router.delete("/me")
async def delete_me(user_id: str = Depends(get_user_id)):
    """Route to delete account and all the data."""
    logger.info(
        "User request to Delete Account.",
        extra={
            "user_id": user_id
        }
    )

    try:
        user = get_user_by_id(
            user_id=user_id
        )

        if user:
            mail = user["profile"]["email"]
            send_delete_account_email(to=mail)

        delete_user_by_id(
            user_id=user_id
        )
        delete_core(
            user_id=user_id
        )
        await delete_user_data(
            user_id=user_id
        )

        logger.info(
            "User account and data deleted successfully.",
            extra={
                "user_id": user_id
            }
        )

        return {
            "success": True
        }
    
    except HTTPException as http_exc:
        raise http_exc
    
    except Exception as e:
        logger.exception(
            "Error happend during deleting user's account.",
            extra={
                "user_id": user_id,
                "error": e
            }
        )
        
        raise e
    
@auth_router.post("/onboard")
async def onboard_user(
    core_memory: dict = Body(...),
    user_id: str = Depends(get_user_id)
):
    """Route to onboard user with initial core memory."""
    logger.info(
        "Onboarding user with core memory.",
        extra={
            "user_id": user_id,
            "core_memory": core_memory
        }
    )
    try:
        user_onboarding(core_memory=core_memory, user_id=user_id)
        return {"success": True, "message": "User onboarded successfully"}
    
    except HTTPException as http_exc:
        raise http_exc

    except Exception as e:
        logger.exception(
            "Error occurred during onboarding.",
            extra={
                "user_id": user_id,
                "error": e
            }
        )
        raise HTTPException(status_code=500, detail="Onboarding failed")
    

@auth_router.post("/forgot-password")
async def forgot_password(request: ForgotPasswordRequest):
    """Route to forget password."""
    email = request.email.lower()
    user = get_user_by_email(email)
    logger.info(
        "Forget Password Request for email: .",
        extra={
            "email": email,
        }
    )
    try:
        if not user:
            raise HTTPException(status_code=404, detail="User not found")

        reset_token = uuid.uuid4().hex
        store_reset_token(str(user["_id"]), reset_token)

        reset_link = f"https://empathy.athams.com/reset-password?token={reset_token}"
        send_reset_password_email(
            to=email,
            reset_link=reset_link
        )

        return {"success": True, "message": "Reset link sent to email"}
    
    except HTTPException as http_exc:
        raise http_exc
    
    except Exception as e:
        logger.exception(
            "Error occurred during forget password.",
            extra={
                "email": email,
                "error": e
            }
        )
        raise HTTPException(status_code=500, detail="forgot Password failed.")
    
@auth_router.post("/reset-password")
async def reset_password(request: ResetPasswordRequest):
    """Route to reset password."""
    try:
        record = verify_reset_token(request.token)
        if not record:
            raise HTTPException(status_code=400, detail="Invalid or expired token")

        user = get_user_by_id(record["user_id"])
        if not user:
            raise HTTPException(status_code=404, detail="User not found")

        update_user_password(record["user_id"], request.new_password)
        mark_token_used(request.token)

        return {"success": True, "message": "Password reset successful"}
    
    except HTTPException as http_exc:
        raise http_exc

    except Exception as e:
        logger.exception(
            "Error occurred during reset password.",
            extra={
                "error": e
            }
        )
        raise HTTPException(status_code=500, detail="Reset Password failed.")
    