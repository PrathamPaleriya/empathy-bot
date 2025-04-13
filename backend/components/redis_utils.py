import json

from redis import Redis

from utils.constants import REDIS_EXP
from utils.load_env import redis_host, redis_pass

redis_client = Redis(
    host=redis_host,
    port=6379,
    password=redis_pass,
    ssl=True
)


def set_core(user_id: str, core: dict) -> None:
    """Redis util function to set core memory."""
    key = f'core:{user_id}'
    try:
        redis_client.set(
            name=key,
            value=json.dumps(core),
            ex=REDIS_EXP
        )

    except Exception as e:
        raise e
    
def get_core(user_id: str) -> dict:
    """Redis util function to get core memory."""
    key = f'core:{user_id}'
    try:
        core_memory = redis_client.get(
            key
        )
        if core_memory:
            return json.loads(core_memory.decode("utf-8"))
        else:
            return None
    
    except Exception as e:
        raise e
    