import { OpenAIEmbeddings } from "@langchain/openai";
import { TextLoader } from "langchain/document_loaders/fs/text";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";


const loader = new TextLoader("./chat02/extracted_text.txt")
const docs = await loader.load();
console.log("🚀 ~ docs:", docs)

const splitter = new RecursiveCharacterTextSplitter({
    chunkSize: 1000,
    chunkOverlap: 200,
})

const chunks = await splitter.splitDocuments(docs);
console.log("🚀 ~ chunks:", chunks)

const model = new OpenAIEmbeddings()
const embeddings = await model.embedDocuments(chunks.map((chunk) => chunk.pageContent))
console.log("🚀 ~ embeddings:", embeddings)
