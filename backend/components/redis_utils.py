from redis import Redis

from utils.load_env import redis_host, redis_pass

redis_client = Redis(
    host=redis_host,
    port=6379,
    password=redis_pass,
    ssl=True
)

# redis_client.set(
#     name="Text",
#     value="test_value",
#     ex="3600"
# )

# print(redis_client.get("Text")) #Output: b'test_value'