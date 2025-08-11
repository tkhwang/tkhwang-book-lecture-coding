import { ChatPromptTemplate } from "@langchain/core/prompts";

import 'dotenv/config'
import { ChatOpenAI } from '@langchain/openai'
import { RunnableLambda } from "@langchain/core/runnables";

const template = ChatPromptTemplate.fromMessages([
    ["system", "You are a helpful assistant."],
    ["user", "{question}"],
])

const model = new ChatOpenAI({ model: 'gpt-3.5-turbo', apiKey: process.env.OPENAI_API_KEY })

const chatbot = template.pipe(model)

const response = await chatbot.invoke({ question: "거대 언어 모델은 어디서 제공하나요 ?" })
console.log("🚀 ~ response:", response)

