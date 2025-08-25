from langchain.chat_models import init_chat_model
import os
from dotenv import load_dotenv

load_dotenv()

model = init_chat_model(
    model="gpt-4o-mini",
    api_key=os.getenv("OPENAI_API_KEY"),
)

response = model.invoke("Hello, world!")
print(response)