from datetime import datetime

from bson import ObjectId
from pymongo import MongoClient

from utils.load_env import mongodb_collection, mongodb_db, mongodb_uri

mongo_client = MongoClient(
    mongodb_uri
)

db = mongo_client[mongodb_db]
collection = db[mongodb_collection]

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

        if old_core_memory != core_memory:
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

        return core_memory
    
    except Exception as e:
        raise e
