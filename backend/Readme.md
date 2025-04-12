EmpathyBot Backend
==================

EmpathyBot is an AI-powered chatbot designed to understand and respond with emotional intelligence. This repository contains the backend logic and APIs.

--------------------------------------------------
🌐 Backend Scope
--------------------------------------------------
- Session and memory handling using Redis and MongoDB
- Communication with OpenAI via custom agents
- Short-term (core) and long-term (recall) memory management
- Vector storage with Pinecone for emotional context
- Tool-based AI logic and prompt handling

--------------------------------------------------
🛠️ Tech Stack
--------------------------------------------------
- **FastAPI**: For RESTful API backend
- **Redis (Upstash)**: For fast in-memory storage of core memory
- **MongoDB**: For long-term persistent storage of user memory
- **Pinecone**: Vector DB for storing and retrieving memory embeddings
- **OpenAI GPT-4o**: LLM for processing and understanding messages
- **Poetry**: Dependency and environment manager
- **Ruff**: Linting and code formatting
- **Pre-commit**: Git hook for code quality enforcement

--------------------------------------------------
🚀 Getting Started
--------------------------------------------------

Prerequisites:
- Python 3.11
- git
- pip and venv
- Poetry (https://python-poetry.org/docs/#installation)

Setup Instructions:

1. Clone the repository:
   git clone https://github.com/your-username/empathybot-backend.git
   cd empathybot-backend

2. Create and activate a virtual environment:
   python -m venv venv
   source venv/bin/activate       # On Windows: .\venv\Scripts\activate

3. Install Poetry:
   pip install poetry

4. Install dependencies:
   poetry install

5. Install pre-commit hooks:
   pre-commit install

--------------------------------------------------
🧪 Running Tests
--------------------------------------------------
Run the following command:
   pytest

--------------------------------------------------
🧹 Code Quality
--------------------------------------------------
- Linting: Ruff (https://docs.astral.sh/ruff/)
- Pre-commit: Automatically checks code before commits

To run manually:
   pre-commit run --all-files

--------------------------------------------------
🤝 Contributing
--------------------------------------------------
1. Fork the repository
2. Create a new branch (git checkout -b feature-name)
3. Make your changes
4. Run pre-commit and pytest
5. Push your branch and open a pull request

--------------------------------------------------
📄 License
--------------------------------------------------
This project is licensed under the CC BY-NC-ND 4.0 license.

--------------------------------------------------
😁 Made by Prathammmmmmmmmmm!!!!!!
