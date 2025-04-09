# ruff: noqa

memory_agent_tool = [
    {
        "type": "function",
        "name": "append_core",
        "description": "Append information to the core memory.",
        "strict": True,
        "parameters": {
            "type": "object",
            "properties": {
                "type": {
                    "type": "string",
                    "enum": ["user_core", "assistant_core"],
                    "description": "The category of core memory to append to.",
                },
                "key": {
                    "type": "string",
                    "description": "The key associated with the memory to append.",
                },
                "memory": {
                    "type": "string",
                    "description": "The memory content to append.",
                }
            },
            "required": ["type", "memory"],
            "additionalProperties": False
        },
    },
    {
        "type": "function",
        "name": "update_core",
        "description": "Update one or more entries in the core memory.",
        "strict": True,
        "parameters": {
            "type": "object",
            "properties": {
                "type": {
                    "type": "string",
                    "enum": ["user_core", "assistant_core"],
                    "description": "The category of core memory to update.",
                },
                "memory": {
                    "type": "object",
                    "description": "A dictionary representing the complete updated core memory content.",
                }
            },
            "required": ["type", "memory"],
            "additionalProperties": False
        },
    },
    {
        "type": "function",
        "name": "add_recall",  
        "description": "Add significant experiences, emotional events, or traumas to recall memory.",
        "strict": True,
        "parameters": {
            "type": "object",
            "properties": {
                "type": {
                    "type": "string",
                    "description": "The category or nature of the emotion or experience.",
                },
                "memory": {
                    "type": "string",
                    "description": "The memory content to be stored in recall memory.",
                }
            },
            "required": ["type","memory"],
            "additionalProperties": False
        },
    },
] #noqa

genrator_agent_tool = [
    {
        "type": "function",
        "name": "look_long_term_memory",
        "description": "Search for information stored in long-term memory, such as past experiences, known individuals, or historical context.",
        "strict": True,
        "parameters": {
            "type": "object",
            "properties": {
                "query": {
                    "type": "string",
                    "description": "The query string used to retrieve relevant information from long-term memory.",
                },
            },
            "required": ["query"],
            "additionalProperties": False
        },
    },
    {
        "type": "function",
        "name": "crisis_alert",
        "description": "Flag situations involving mental health emergencies, such as suicidal thoughts, self-harm, or acute depression.",
        "strict": True,
        "parameters": {
            "type": "object",
            "properties": {
                "severity": {
                    "type": "number",
                    "description": "The severity of the crisis on a scale from 1 (low) to 5 (critical).",
                },
            },
            "required": ["severity"],
            "additionalProperties": False
        },
    },
] #noqa
