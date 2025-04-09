from openai import OpenAI

from utils.load_env import openai_api, openai_org, openai_proj

openai_client = OpenAI(
    api_key=openai_api,
    organization=openai_org,
    project=openai_proj
)