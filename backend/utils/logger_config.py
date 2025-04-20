import json
import logging
from datetime import datetime
from threading import Lock

from bson import ObjectId

from utils.constants import SKIP_FIELDS_LOGGER


class SingletonLogger:
    """A singleton logger to ensure only one instance is created."""

    _instance = None
    _lock = Lock()

    def __new__(cls, *args, **kwargs):
        """Ensures that only a single instance of the SingletonLogger exists."""
        with cls._lock:
            if not cls._instance:
                cls._instance = super().__new__(cls, *args, **kwargs)
                cls._instance._initialize_logger()
            return cls._instance

    def _initialize_logger(self):
        self.logger = logging.getLogger("SingletonLogger")
        self.logger.setLevel(logging.DEBUG)

        # Avoid duplicate handlers
        if not self.logger.handlers:
            stream_handler = logging.StreamHandler()
            stream_handler.setLevel(logging.DEBUG)

            formatter = JsonFormatter()
            stream_handler.setFormatter(formatter)

            self.logger.addHandler(stream_handler)


class JsonFormatter(logging.Formatter):
    """Custom JSON formatter for logging in compact JSON format."""

    def format(self, record: logging.LogRecord):
        """Format log records as compact JSON."""
        # Base log data with only the required fields
        log_data = {
            "logged_at": datetime.now().isoformat(),
            "level": record.levelname,
            "message": record.getMessage(),
            "function_name": record.funcName,
            "file_path": record.pathname,
            "line_number": record.lineno,
        }

        # Include extra fields dynamically, excluding unnecessary ones
        extra_fields = {
            key: value
            for key, value in vars(record).items()
            if key not in SKIP_FIELDS_LOGGER
        }
        log_data.update(extra_fields)

        # Handle non-serializable data like ObjectId or datetime
        def custom_serializer(obj):
            if isinstance(obj, ObjectId):
                return str(obj)
            elif isinstance(obj, datetime):
                return obj.isoformat()
            elif hasattr(obj, "__dict__"):
                return str(obj)
            elif hasattr(obj, "model"):
                return {
                    "model": getattr(obj, "model", None),
                    "usage": getattr(obj, "usage", None),
                }
            return f"<Unserializable object of type {obj.__class__.__name__}>"

        # Return as compact JSON (no indentation)
        return json.dumps(log_data, default=custom_serializer)


# Create a single logger instance
logger = SingletonLogger().logger
