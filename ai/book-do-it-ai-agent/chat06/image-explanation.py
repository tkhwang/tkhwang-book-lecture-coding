from openai import OpenAI
from dotenv import load_dotenv
import os

load_dotenv()
api_key = os.getenv("OPENAI_API_KEY")

client = OpenAI(api_key=api_key)

messages = [
    {
        "role": "user",
        "content": [
            {
                "type": "text",
                "text": "이 이미지에 대해 설명해 주세요.",
            },
            {
                "type": "image_url",
                "image_url": {
                    "url": "https://imgnews.pstatic.net/image/001/2025/08/07/PYH2025080703740001301_P4_20250807103015955.jpg?type=w860",
                },
            },
        ],
    }
]

response = client.chat.completions.create(model="gpt-4o-mini", messages=messages)

print(response.choices[0].message.content)
