from openai import OpenAI
from dotenv import load_dotenv
import os
import base64

load_dotenv()
api_key = os.getenv("OPENAI_API_KEY")

client = OpenAI(api_key=api_key)


def encode_image(image_path: str):
    with open(image_path, "rb") as image_file:
        return base64.b64encode(image_file.read()).decode("utf-8")


image_path = "./chat06/data/rudi-west-IHCHpxUIIVs-unsplash.jpg"
encoded_image = encode_image(image_path)


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
                    "url": f"data:image/jpeg;base64,{encoded_image}",
                },
            },
        ],
    }
]

response = client.chat.completions.create(model="gpt-4o-mini", messages=messages)

print(response.choices[0].message.content)
