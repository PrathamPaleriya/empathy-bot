EMBEDDING_MODEL = "text-embedding-3-small"
OPENAI_MODEL = "gpt-4o-mini"
REDIS_EXP = 3600 

SKIP_FIELDS_LOGGER = (
    "args",
    "exc_info",
    "exc_text",
    "stack_info",
    "msg",
    "levelname",
    "levelno",
    "pathname",
    "filename",
    "module",
    "created",
    "msecs",
    "relativeCreated",
    "thread",
    "threadName",
    "processName",
    "process",
    "name",
    "lineno",
    "funcName",
)