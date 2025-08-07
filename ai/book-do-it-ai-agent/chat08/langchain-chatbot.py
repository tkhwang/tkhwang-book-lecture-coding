from dotenv import load_dotenv
import os
from langchain_openai import ChatOpenAI
from langchain_core.messages import HumanMessage, SystemMessage

load_dotenv()
api_key = os.getenv("OPENAI_API_KEY")

model = ChatOpenAI(api_key=api_key, model="gpt-4o-mini")

messages = [
    HumanMessage(content="Hello, how are you?"),
]

response = model.invoke(messages)
print(response)
