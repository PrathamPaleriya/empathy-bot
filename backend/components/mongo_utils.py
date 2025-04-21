from datetime import UTC, datetime, timedelta

from bson import ObjectId
from pymongo import MongoClient

from components.token_utils import hash_token
from utils.load_env import mongodb_collection, mongodb_db, mongodb_uri

mongo_client = MongoClient(
    mongodb_uri
)

db = mongo_client[mongodb_db]
collection = db[mongodb_collection]
reset_tokens = db["reset_tokens"]

def create_profile(profile: dict, memory: dict = {}):
    """Mongo Util function to create a user profile.

    Args:
        profile: dict
        memory: dict
    """
    try:
        response = collection.insert_one(
            {
                "profile": profile,
                "core_memory": memory,
                "created_at": datetime.now(),
                "updated_at": datetime.now()
            }
        )

        return response.inserted_id
    
    except Exception as e:
        raise e
    
def check_and_update_core(core_memory: dict, user_id: str):
    """Mongo Util function to check the core_memory and update it."""
    try:
        old_core_memory = collection.find_one(
            {"_id": ObjectId(user_id)},
            {"core_memory": 1, "_id": 0}
        )

        if (
            old_core_memory and
            old_core_memory.get("core_memory") != core_memory
        ):
            collection.update_one(
                {"_id": ObjectId(user_id)},
                {
                    "$set": {
                        "core_memory": core_memory, 
                        "updated_at": datetime.now() 
                    }
                }
            )
        
    except Exception as e:
        raise e
    
def user_onboarding(core_memory: dict, user_id: str):
    """Mongo utils function to onboarding the user by saving core memory in initial."""
    try:
        collection.update_one(
            {"_id": ObjectId(user_id)},
            {
               "$set": {
                    "core_memory": core_memory, 
                    "updated_at": datetime.now() 
                } 
            }
        )
    except Exception as e:
        raise e
    
def fetch_core(user_id: str):
    """Mongo Util function to return core_memory of a user."""
    try:
        core_memory = collection.find_one(
            {"_id": ObjectId(user_id)},
            {"core_memory": 1, "_id": 0}
        )

        return core_memory.get("core_memory", {})
    
    except Exception as e:
        raise e


def get_user_by_id(user_id: str):
    """Mongo Util function to get user by id."""
    try:
        data = collection.find_one(
            {
                "_id": ObjectId(user_id),
            }
        )

        return data if data else None
    except Exception as e:
        raise e
    
def get_user_by_email(email: str):
    """Mongo Util function to get user by id."""
    try:
        data = collection.find_one(
            {
                "profile.email": email,
            }
        )

        return data if data else None
    except Exception as e:
        raise e
    
def delete_user_by_id(user_id:str):
    """Mongo Utils to delete account db."""
    try:
        collection.delete_one(
            {
                "_id": ObjectId(user_id),
            }
        )

        return True
    except Exception as e:
        raise e
    
def update_passowrd(user_id:str, hashed_password):
    """Mongodb Uitls to update the user password."""
    try:
        collection.update_one(
            {"_id": ObjectId(user_id)},
            {"$set": {"profile.password": hashed_password}}
        )
    except Exception as e:
        raise e
    

# reset tokens utils
def store_reset_token(user_id: str, token: str):
    """Mongo db utils to store reset token."""
    try:
        hashed = hash_token(token)
        db.reset_tokens.insert_one({
            "user_id": user_id,
            "token": hashed,
            "created_at": datetime.now(UTC),
            "expires_at": datetime.now(UTC) + timedelta(minutes=30),
            "used": False
        })
    except Exception as e:
        raise e

def verify_reset_token(token: str):
    """Mongo db utils to verify reset token."""
    try:
        hashed = hash_token(token)
        record = db.reset_tokens.find_one({"token": hashed})
        if not record:
            return None
        if record["used"] or record["expires_at"] < datetime.now(record["expires_at"].tzinfo):
            return None
        return record
    except Exception as e:
        raise e

def mark_token_used(token: str):
    """Mongo db utils to mark reset token true."""
    try:
        hashed = hash_token(token)
        db.reset_tokens.update_one({"token": hashed}, {"$set": {"used": True}})
    except Exception as e:
        raise e