from sentence_transformers import SentenceTransformer

from utils.constants import EMBEDDING_MODEL

embedding_model = SentenceTransformer(EMBEDDING_MODEL)

def get_embedding(text):
    """Get embedding for a given text using Sentence Transformers."""
    return embedding_model.encode(text).tolist()