from components.openai_utils import openai_client
from utils.constants import EMBEDDING_MODEL

# def get_embedding(text):
#     """Get embedding for a given text using Sentence Transformers."""
#     return embedding_model.encode(text).tolist()

def get_embedding(text: str) -> list:
    """Openai text to embedding function."""
    response = openai_client.embeddings.create(
        input=text,
        model=EMBEDDING_MODEL
    )

    return response.data[0].embedding