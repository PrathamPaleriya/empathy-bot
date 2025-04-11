import os

from dotenv import load_dotenv

load_dotenv()

openai_api = os.getenv("OPENAI_API_KEY")
openai_org = os.getenv("OPENAI_ORG_ID")
openai_proj = os.getenv("OPENAI_PROJECT_ID")
pinecone_api = os.getenv("PINECONE_API_KEY")
pinecone_index = os.getenv("INDEX_NAME")    
pinecone_namespace = os.getenv("NAMESPACE")
mongodb_uri = os.getenv("MONGODB_URI")
mongodb_db = os.getenv("MONGODB_DB")
mongodb_collection = os.getenv("MONGODB_COLLECTION")
redis_host = os.getenv("REDIS_HOST")
redis_pass = os.getenv("REDIS_PASS")