import { ChatOpenAI } from "@langchain/openai";
import 'dotenv/config'

const model = new ChatOpenAI({
    model: "gpt-3.5-turbo",
    apiKey: process.env.OPENAI_API_KEY,
})

const completion = await model.invoke("Hi, there.")
console.log("🚀 ~ completion:", completion)

const completions = await model.batch([
    'Hi there!',
    'Bye!'
])

for await (const token of await model.stream('Bye!')) {
    console.log("🚀 ~ token:", token.content)
}

