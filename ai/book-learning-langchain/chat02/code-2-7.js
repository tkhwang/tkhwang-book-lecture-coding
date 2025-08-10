import { OpenAIEmbeddings } from "@langchain/openai";


const model = new OpenAIEmbeddings();
const embeddings = await model.embedDocuments([
    "Hi there!",
    "Oh, there",
    "What'\s your name?",
    "My friends call me World.",
    "Hello World!"
])
console.log("🚀 ~ embeddings:", embeddings)
