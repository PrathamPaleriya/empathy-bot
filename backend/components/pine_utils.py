import random
import string
from datetime import datetime

from pinecone import Pinecone

from utils.load_env import pinecone_api, pinecone_namespace

pine_client = Pinecone(
    api_key=pinecone_api
)
index = pine_client.Index(
    "hobby"
)

def _generate_id(length=7):
    chars = string.ascii_letters + string.digits
    return ''.join(random.choices(chars, k=length))

async def upsert_data(
    user_id: str,
    vector: list,
    memory_type: str,
    text: str
) -> None:
    """Pinecone Util Function to append new vector to the db."""
    try:
        vector_id = f"{user_id}#{_generate_id()}"
        index.upsert(
            namespace=pinecone_namespace,
            vectors=[
                {
                    "id": vector_id,
                    "values": vector,
                    "metadata": {
                        "user_id": user_id, 
                        "type": memory_type, 
                        "text": text, 
                        "created_at": datetime.now().isoformat()
                    }
                }
            ]
        )
    
    except Exception as e:
        raise e
    
async def fetch_data(
    vector: list,
    user_id: str,
    top_k: int = 3
) -> list:
    """Pinecone util function to perform similarity search in the db."""
    try:
        metadata_filter = {
            "user_id": user_id
        }

        result = index.query(
            namespace=pinecone_namespace,
            vector=vector,
            filter=metadata_filter,
            top_k=top_k,
            include_metadata=True
        )

        return result.get("matches", [])
    
    except Exception as e:
        raise e
    

async def list_data(
    user_id: str 
):
    """Pinecone util function to list all the vector assisiated to the user."""
    try:
        result = index.list(
            namespace=pinecone_namespace,
            prefix=f"{user_id}#"
        )

        return result
    
    except Exception as e:
        raise e


async def delete_data_by_id(
    ids: list[str]
) -> None:
    """Pinecone util function to delete the vector by id."""
    try:
        index.delete(
            namespace=pinecone_namespace,
            ids=ids
        )
    except Exception as e:
        raise e
    

async def delete_user_data(
    user_id: str
) -> None:
    """Pinecone util function to delete all vector of user."""
    try:
        for ids in index.list(prefix=f'{user_id}#', namespace=pinecone_namespace):
            index.delete(ids=ids, namespace=pinecone_namespace)

    except Exception as e:
        raise e