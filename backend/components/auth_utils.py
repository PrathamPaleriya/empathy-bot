from datetime import UTC, datetime, timedelta

from fastapi import Depends, HTTPException
from fastapi.security import OAuth2PasswordBearer
from jose import JWTError, jwt
from passlib.context import CryptContext

from components.mongo_utils import create_profile, get_user_by_email, get_user_by_id
from utils.load_env import algorithm, secret_key

SECRET_KEY = secret_key
ALGORITHM = algorithm
ACCESS_TOKEN_EXPIRE_MINUTES = 60 * 24 * 7 

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="api/v0/auth/token")
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def create_access_token(data: dict):
    """Auth util function to create access token."""
    to_encode = data.copy()
    expire = datetime.now(UTC)+ (
        timedelta(
            minutes=ACCESS_TOKEN_EXPIRE_MINUTES
        )
    )
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)

def verify_password(plain_password, hashed_password):
    """Auth util function to verify pass."""
    return pwd_context.verify(plain_password, hashed_password)

def get_password_hash(password):
    """Auth util function to hash a pass."""
    return pwd_context.hash(password)

def get_current_user(token: str = Depends(oauth2_scheme)):
    """Auth util function to get current user."""
    credentials_exception = HTTPException(status_code=401, detail="Invalid token")
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        user_id = payload.get("sub")
        if user_id is None:
            raise credentials_exception
    except JWTError:
        raise credentials_exception

    user = get_user_by_id(user_id)
    if user is None:
        raise credentials_exception
    return user

def create_user_profile(email: str, password: str):
    """Auth util function to create profile."""
    if get_user_by_email(
        email=email
    ):
        raise HTTPException(status_code=409, detail="User already exists")
    
    hashed_password = get_password_hash(password)
    profile = {
        "email" : email,
        "password": hashed_password
    }

    user_id = create_profile(
        profile=profile
    )

    return str(user_id)
