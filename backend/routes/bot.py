
from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel

from agents.genrator_agent import GenratorAgent
from agents.memory_agent import MemoryAgent
from components.auth_utils import get_user_id
from components.mongo_utils import fetch_core
from components.redis_utils import get_core, set_core
from utils.logger_config import logger

bot_router = APIRouter()

class ChatInput(BaseModel):
    """Pydantic class for chat input."""
    message: str
    chat_history: list[dict]

@bot_router.post("/chat")
async def chat(data: ChatInput, user_id: str = Depends(get_user_id)):
    """Main to interact with bot."""
    logger.info(
        "Message received:",
        extra={
            "user_message": data.message,
            "user_id": user_id
        }
    )

    try:
        core_memory = get_core(user_id=user_id)

        if not core_memory:
            core_memory = fetch_core(
                user_id=user_id
            )
            if not core_memory:
                raise HTTPException(
                    status_code=404, detail="Core memory not found"
                )
            set_core(
                core=core_memory,
                user_id=user_id
            )

        chat_history = data.chat_history[-20:]

        memoryagent = MemoryAgent(
            core_memory=core_memory,
            chat_history=chat_history,
            message=data.message,
            user_id=user_id
        )

        memory_response = await memoryagent.run()

        if not memory_response["success"]:
            raise HTTPException(
                status_code=500, detail="MemoryAgent failed to process"
            )
        
        updated_core_memory = memory_response["updated_core_memory"]

        genratoragent = GenratorAgent(
            core_memory=updated_core_memory,
            chat_history=chat_history,
            message=data.message,
            user_id=user_id
        )

        response = await genratoragent.run()
        
        if not response["success"]:
            raise HTTPException(
                status_code=500, detail="GenratorAgent failed to process"
            )
        
        if response.get("crisi"):
            return {
                "success": True,
                "type": "crisi",
                "severity": response["crisi"]["severity"],
                "response": response["output"]
            }
        
        logger.info(
            "Message respone:",
            extra={
                "user_message": data.message,
                "response": response,
                "user_id": user_id
            }
        )
        
        return {
            "success": True,
            "type": "chat",
            "response": response["output"]
        }

    except Exception as e:
        logger.exception(
            "Error happened while processing message.",
            extra={
                "exception": e
            }
        )
        raise HTTPException(status_code=500, detail="Internal Server Error")
