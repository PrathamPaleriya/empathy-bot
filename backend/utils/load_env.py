import os

from dotenv import load_dotenv

load_dotenv()

openai_api = os.getenv("OPENAI_API_KEY")
openai_org = os.getenv("OPENAI_ORG_ID")
openai_proj = os.getenv("OPENAI_PROJECT_ID")
pinecone_api = os.getenv("PINECONE_API_KEY")
pinecone_index = os.getenv("INDEX_NAME")    
pinecone_namespace = os.getenv("NAMESPACE")