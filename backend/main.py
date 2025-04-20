import uvicorn
from fastapi import APIRouter, FastAPI
from fastapi.middleware.cors import CORSMiddleware

from routes.auth import auth_router
from routes.bot import bot_router
from utils.constants import ROUTE_PREFIX
from utils.logger_config import logger

app = FastAPI(
    title="Empathy-Bot Backend, By Pratham Paleriya",
    version="0.1.0",
    docs_url="/api/docs",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        ""
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
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
app.include_router(
    bot_router,
    prefix=f"{ROUTE_PREFIX}/bot"
)


if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)