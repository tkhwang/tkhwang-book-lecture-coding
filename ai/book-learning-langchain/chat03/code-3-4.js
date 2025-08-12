const { ChatPromptTemplate } = require("@langchain/core/prompts");
const { ChatOpenAI } = require("@langchain/openai");
import { RunnableLambda } from '@langchain/core/runnables';
import 'dotenv/config'
const { db } = await import("./code-3-1.js")

const retriever = db.asRetriever();

const prompt = ChatPromptTemplate.fromTemplate(
    '다음 컨텍스트만 사용해 질문에 답변하세요.\n 컨텍스트: {context}\n 질문: {question}\n 답변:'
)

const llm = new ChatOpenAI({ temperature: 0, modelName: "gpt-4o-mini", apiKey: process.env.OPENAI_API_KEY })

// const chain = prompt.pipe(llm)

// const result = await chain.invoke({
//     context: docs,
//     question: query
// })

const qa = RunnableLambda.from(async (input) => {
    const docs = await retriever.invoke(input);
    const formatted = await prompt.invoke({ context: docs, question: input })
    const answer = await llm.invoke(formatted);
    return answer
})

const finalResult = await qa.invoke("AI agent")
console.log("🚀 ~ finalResult:", finalResult)