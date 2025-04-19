import json

from agents.utils.prompt_template import PromptTemplate
from agents.utils.prompts import generator_agent_prompt, retrival_agent_prompt
from agents.utils.tools import genrator_agent_tool
from components.embedding import get_embedding
from components.openai_utils import openai_client
from components.pine_utils import fetch_data
from utils.constants import OPENAI_MODEL
from utils.logger_config import logger

retrival_agent_prompt_template =  PromptTemplate(retrival_agent_prompt)
generator_agent_prompt_template =  PromptTemplate(generator_agent_prompt)

class GenratorAgent:
    """Genrator agent whose main task is to genrate response."""

    def __init__(self, core_memory, chat_history, message, user_id):
        self.core_memory = core_memory
        self.chat_history = chat_history
        self.message = message
        self.user_id = user_id
        self.crisi = False

    async def _crisis_alert(self, severity: int):
        self.crisi = {
            "severity": severity
        }

        return (
            f"User is suffering from critical mental challange, provide response carefully. severity:{severity}" #noqa:E501
        )

    async def _look_long_term_memory(self, query: str):
        try:
            vector = get_embedding(text=query)
            response = await fetch_data(
                vector=vector,
                user_id=self.user_id,
            )

            value = []

            logger.info(
                "Vector search response:",
                extra={
                    "matches": response,
                    "user_id": self.user_id
                }
            )

            for match in response:
                if 'text' in match['metadata']:
                    value.append(match['metadata']['text'])

            return { "recall_memory" : "\n".join(value)}
        
        except Exception as e:
            raise e


    async def run(self):
        """Main function to run the agent asynchronously.

        Returns: dict: 
        - On success:
        {
            "success": True,
            "output": concatenated agent replies or message,
            "crisi": self.crisi
        }
        ---
        - On failure:
        {
            "success": False,
            "exception": e
        }
        """
        reply = []
        model = OPENAI_MODEL
        messsage = [
            {
                "role": "system",
                "content": retrival_agent_prompt_template.format(
                    core_memory = self.core_memory,
                    conversation_history = self.chat_history
                )
            },
            {
                "role": "user",
                "content": self.message
            }
        ]
        available_functions = {
            "look_long_term_memory": self._look_long_term_memory,
            "crisis_alert": self._crisis_alert
        }

        try:
            response = openai_client.responses.create(
                model=model,
                input=messsage,
                tools=genrator_agent_tool,
                tool_choice="auto",
                temperature=0
            )

            logger.info(
                "[RetrivalAgent] response:",
                extra={
                    "response": response,
                    "user_id": self.user_id
                }
            )

            for actions in response.output:
                if actions.type == "function_call":

                    function_name = actions.name
                    function_to_call = available_functions[function_name]
                    function_args = json.loads(actions.arguments)
                    function_response = await function_to_call(**function_args)

                    logger.info(
                        "Tool calling in [GenratorAgent]:",
                        extra={
                            "function": actions.name,
                            "arguments": actions.arguments,
                            "user_id": self.user_id,
                            "output": str(function_response)
                        }
                    )
                    
                    second_message = [
                        {
                            "role": "system",
                            "content": generator_agent_prompt_template.format(
                                core_memory = self.core_memory,
                                conversation_history = self.chat_history
                            )
                        },
                        {
                            "role": "user",
                            "content": self.message
                        },
                        {
                            "type": "function_call",
                            "call_id":  actions.call_id,
                            "name": actions.name,
                            "arguments": actions.arguments
                        },
                        {
                            "type": "function_call_output",
                            "call_id": actions.call_id,
                            "output": str(function_response)
                        }
                    ]

                else:
                    second_message = [
                        {
                            "role": "system",
                            "content": generator_agent_prompt_template.format(
                                core_memory = self.core_memory,
                                conversation_history = self.chat_history
                            )
                        },
                        {
                            "role": "user",
                            "content": self.message
                        }
                    ]
                    
                second_response = openai_client.responses.create(
                    input=second_message,
                    model=model
                )

                logger.info(
                    "[GenratorAgent] response:",
                    extra={
                        "response": second_response,
                        "user_id": self.user_id
                    }
                )
                    
                reply.append(second_response.output_text)
                
                
            return {
                    "success": True,
                    "output": "\n".join(reply),
                    "crisi": self.crisi
                }
        
        
        except Exception as e:
            logger.info(
                "Error happend in [Genrator Agent]:",
                extra={
                    "error": e,
                    "user_id": self.user_id
                }
            )
            
            return {
                "success": False,
                "exception": e
            }

