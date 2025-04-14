from fastapi import APIRouter, Depends, HTTPException
from fastapi.security import OAuth2PasswordBearer
from pydantic import BaseModel

from components.auth_utils import (
    create_access_token,
    create_user_profile,
    get_current_user,
    verify_password,
)
from components.mongo_utils import get_user_by_email
from utils.logger_config import logger

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


@auth_router.post("/signup")
async def signup(request: SignUpRequest):
    """Signup Route."""
    email = request.email
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
        return {"access_token": token, "token_type": "bearer", "user_id": user_id}
    
    except Exception as e:
        logger.exception(
            "Error happened in in signup route.",
            extra={
                "exception": e
            }
        )


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
            email=request.email
        )
        if user and verify_password(
            request.password,
            user["profile"]["password"]
        ):
            token = create_access_token(data={"sub": str(user["_id"])})
            return {"access_token": token, "token_type": "bearer"}
        else:
            raise HTTPException(status_code=401, detail="Invalid credentials")
    except Exception as e:
        logger.exception(
            "Error happened in in login route.",
            extra={
                "exception": e
            }
        )

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
