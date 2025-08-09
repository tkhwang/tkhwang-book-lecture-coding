import { HumanMessage } from "@langchain/core/messages";
import { ChatOpenAI } from "@langchain/openai";
import 'dotenv/config'

const model = new ChatOpenAI({ model: 'gpt-3.5-turbo', apiKey: process.env.OPENAI_API_KEY })
const prompt = [new HumanMessage("프랑스 수도는 어디인가요 ?")]

const response = await model.invoke(prompt)
console.log(response)