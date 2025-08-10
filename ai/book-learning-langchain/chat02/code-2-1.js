import { TextLoader } from "langchain/document_loaders/fs/text";

const loader = new TextLoader("./test.txt")

const docs = await loader.load()

console.log("🚀 ~ docs:", docs)