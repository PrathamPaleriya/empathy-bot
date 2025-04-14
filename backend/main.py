from fastapi import APIRouter, FastAPI

from routes.auth import auth_router
from utils.constants import ROUTE_PREFIX
from utils.logger_config import logger

app = FastAPI(
    title="Empathy-Bot Backend, By Pratham Paleriya",
    version="0.1.0",
    docs_url="/api/docs",
)

route = APIRouter()

@route.get("/ping")
def ping():
    """Route to check the connection."""
    logger.info(
        "Ping route"
    )
    return "Welcome to Empathy bot server"

app.include_router(route)
app.include_router(
    auth_router,
    prefix=f"{ROUTE_PREFIX}/auth"
)


