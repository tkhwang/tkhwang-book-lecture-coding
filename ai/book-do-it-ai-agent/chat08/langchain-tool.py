from dotenv import load_dotenv
import os
from langchain_openai import ChatOpenAI
from langchain_core.messages import HumanMessage, SystemMessage
from datetime import datetime
from langchain_core.tools import tool
import pytz

load_dotenv()
api_key = os.getenv("OPENAI_API_KEY")


@tool
def get_current_time(timezone: str, location: str) -> str:
    """Get the current time for a specific timezone and location.

    Args:
        timezone: The timezone string (e.g., 'America/Los_Angeles')
        location: The location name (e.g., 'Los Angeles')

    Returns:
        A string with the current time in the specified timezone and location
    """
    tz = pytz.timezone(timezone)
    now = datetime.now(tz).strftime("%Y-%m-%d %H:%M:%S")
    location_and_local_time = f"{timezone} ({location})의 현재 시간은 {now} 입니다."
    print(location_and_local_time)
    return location_and_local_time


tools = [get_current_time]
tool_dict = {
    "get_current_time": get_current_time,
}


model = ChatOpenAI(api_key=api_key, model="gpt-4o-mini")
llm_with_tools = model.bind_tools(tools)

messages = [
    SystemMessage("너는 사용자의 질문에 답변을 하기 위해 tools를 사용할 수 있다."),
    HumanMessage(content="부산은 현재 시간은 언제인가요?"),
]

response = llm_with_tools.invoke(messages)
print(response)
