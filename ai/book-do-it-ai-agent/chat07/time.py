from datetime import datetime
from openai import OpenAI
from dotenv import load_dotenv
import os

load_dotenv()
api_key = os.getenv("OPENAI_API_KEY")

client = OpenAI(api_key=api_key)


def get_current_time():
    now = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    print(now)
    return now


tools = [
    {
        "type": "function",
        "function": {
            "name": "get_current_time",
            "description": "Get the current time",
            "parameters": {},
        },
    }
]


def get_ai_resonse(messages, tools=None):
    resonse = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=messages,
        tools=tools,
    )
    return resonse


messages = [
    {
        "role": "system",
        "content": "You are a helpful assistant that can tell the current time.",
    }
]

while True:
    user_input = input("Enter a command: ")

    if user_input == "exit":
        break

    messages.append({"role": "user", "content": user_input})

    ai_response = get_ai_resonse(messages, tools=tools)
    ai_message = ai_response.choices[0].message
    print(ai_message)

    tool_calls = ai_message.tool_calls
    if tool_calls:
        for tool_call in tool_calls:
            tool_name = tool_call.function.name
            tool_call_id = tool_call.id

            if tool_name == "get_current_time":
                messages.append(
                    {
                        "role": "function",
                        "tool_call_id": tool_call_id,
                        "name": tool_name,
                        "content": get_current_time(),
                    }
                )

            ai_response = get_ai_resonse(messages, tools)
            ai_message = ai_response.choices[0].message

    messages.append(ai_message)
    print("AI\t: ", ai_message)
