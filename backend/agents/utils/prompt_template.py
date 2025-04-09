class PromptTemplate:
    """Inhouse prompt template class inspired by Langchain."""

    def __init__(self, template: str):
        self.template = template

    def format(self, **kwargs):
        """Function to format the prompt."""
        return self.template.format(**kwargs)