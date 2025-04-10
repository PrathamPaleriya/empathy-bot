import json

from agents.utils.prompt_template import PromptTemplate
from agents.utils.prompts import memory_agent_prompt
from agents.utils.tools import memory_agent_tool
from components.embedding import get_embedding
from components.openai_utils import openai_client
from components.pine_utils import upsert_data
from utils.constants import OPENAI_MODEL

memory_agent_prompt_template =  PromptTemplate(memory_agent_prompt)

class MemoryAgent:
    """Memory agent whose main task is to update the core and recall memory of the bot."""
    
    def __init__(self, core_memory, chat_history, message, user_id):
        self.core_memory = core_memory
        self.chat_history = chat_history
        self.message = message
        self.user_id = user_id

    async def _add_chathistory(self, type: str, message: str):
        try:
            self.chat_history.append({
                type: message
            })
        except Exception as e:
            raise e


    async def _append_core(self, type:str, key:str, memory:str):
        print(f"[append_core] type={type}, key={key}, memory={memory}")  # DEBUG
        try:
            self.core_memory[type][key] = memory
            print(f"[append_core] Updated core_memory: {self.core_memory}")  # DEBUG
        except Exception as e:
            raise e

    async def _update_core(self, type:str, memory:str):
        print(f"[update_core] type={type}, memory={memory}")  # DEBUG
        try:
            memory_dict = json.loads(memory)
            self.core_memory[type] = memory_dict
            print(f"[update_core] Updated core_memory: {self.core_memory}")  # DEBUG
        except Exception as e:
            raise e
    
    async def _add_recall(self, type: str, memory: str):
        print(f"[add_recall] type={type}, memory={memory}")  # DEBUG
        try:
            vector = get_embedding(memory)

            await upsert_data(
                user_id=self.user_id,
                vector=vector,
                memory_type=type,
                text=memory
            )
        
        except Exception as e:
            raise e
        
    async def run(self):
        """Main function to run the agent.

        Returns: dict: 
        - On success:
        {
            "success": True,
            "output": response.output,
            "updated_core_memory": self.core_memory
        }
        ---
        - On failure:
        {
            "success": False,
            "exception": e
        }
        """
        user_message = [
            {
                "role": "system",
                "content": memory_agent_prompt_template.format(
                    user_core = self.core_memory["user_core"],
                    assistant_core = self.core_memory["assistant_core"],
                    message = self.chat_history
                )
            },
            {
                "role": "user",
                "content": self.message
            }
        ]

        available_functions = {
            "append_core": self._append_core,
            "update_core": self._update_core,
            "add_recall": self._add_recall
        }

        try:
            response = openai_client.responses.create(
                model=OPENAI_MODEL,
                input=user_message,
                tools=memory_agent_tool,
                tool_choice="auto",
                temperature=0
            )

            for action in response.output:
                print("[MemoryAgent] response:", action) #DEBUG
                if action.type == "function_call":
                    function_name = action.name
                    function_to_call = available_functions[function_name]
                    function_args = json.loads(action.arguments)
                    await function_to_call(**function_args)

            return {
                "success": True,
                "output": response.output,
                "updated_core_memory": self.core_memory
            }

        except Exception as e:
            
            return {
                "success": False,
                "exception": e
            }