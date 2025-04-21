import hashlib


def hash_token(token: str) -> str:
    """Token utils function to hash the token and store in db."""
    return hashlib.sha256(token.encode()).hexdigest()