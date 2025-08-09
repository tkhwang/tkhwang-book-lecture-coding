import z from "zod";
import 'dotenv/config'
import { ChatOpenAI } from '@langchain/openai'


const answerSchema = z.object({
    answer: z.string().describe("사요8ㅇ자의 질문에 대한 답변"),
    justiciation: z.string().describe("답변의 근거가 되는 이유"),
})
    .describe("사용자의 질문에 대한 답변과 근거가 되는 이유를 함께 제공하세요.")

const model = new ChatOpenAI({
    model: "gpt-3.5-turbo",
    apiKey: process.env.OPENAI_API_KEY,
}).withStructuredOutput(answerSchema)

const response = await model.invoke("1 킬로그램의 벽돌과 1킬로그램의 깃털 중 어느 쪽이 더 무겁나요 ?")
console.log("🚀 ~ response:", response)

