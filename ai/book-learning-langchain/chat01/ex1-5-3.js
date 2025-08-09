import { ChatPromptTemplate } from "@langchain/core/prompts";
import 'dotenv/config'
import { ChatOpenAI } from '@langchain/openai'
import { RunnableLambda } from "@langchain/core/runnables";

const template = ChatPromptTemplate.fromMessages([
    ["system", "You are a helpful assistant."],
    ["user", "{question}"],
])

const model = new ChatOpenAI({ model: 'gpt-3.5-turbo', apiKey: process.env.OPENAI_API_KEY })

const chatbot = RunnableLambda.from(async function* (values) {
    const prompt = await template.invoke(values);
    for await (const token of await model.stream(prompt)) {
        yield token;
    }
})

for await (const token of await chatbot.stream({ question: "거대 언어 모델은 어디서 제공하나요 ?" })) {
    console.log("🚀 ~ token:", token.content)
}

