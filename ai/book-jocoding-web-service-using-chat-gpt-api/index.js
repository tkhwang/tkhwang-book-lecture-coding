require("dotenv").config()
const OpenAI = require("openai")

const { OPENAI_API_KEY } = process.env
console.log("TCL: OPENAI_API_KEY", OPENAI_API_KEY)

const openai = new OpenAI({
  apiKey: OPENAI_API_KEY,
})

async function main() {
  const response = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [{ role: "user", content: "Hello!" }],
  })
  console.log(response.data)
}

main()
