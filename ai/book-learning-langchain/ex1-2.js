import 'dotenv/config'
import { ChatOpenAI, OpenAI } from '@langchain/openai'

const model = new ChatOpenAI({ model: 'gpt-3.5-turbo', apiKey: process.env.OPENAI_API_KEY })

const result = await model.invoke('하늘이')

console.log(result)