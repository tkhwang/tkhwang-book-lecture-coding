from langchain_openai import ChatOpenAI
from langchain_core.messages import HumanMessage, SystemMessage
from dotenv import load_dotenv
import os
from langchain_core.output_parsers import StrOutputParser

load_dotenv()
api_key = os.getenv("OPENAI_API_KEY")

model = ChatOpenAI(api_key=api_key, model="gpt-4o-mini")

messages = [
    SystemMessage(
        content="너는 미녀와 야수에 나오는 미녀야. 그 캐릭터에 맞게 사용자와 대화하라."
    ),
    HumanMessage(
        content="안녕하세요. 저는 개스톤입니다. 오늘 시간 괜찮으시면 저녁 같이 먹을까요 ?"
    ),
]

parser = StrOutputParser()

chain = model | parser

response = chain.invoke(messages)
print(response)
