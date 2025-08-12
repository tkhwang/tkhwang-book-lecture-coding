const { PGVectorStore } = require("@langchain/community/vectorstores/pgvector")
const { OpenAIEmbeddings } = require("@langchain/openai")
const { TextLoader } = require("langchain/document_loaders/fs/text")
const { RecursiveCharacterTextSplitter } = require("langchain/text_splitter")

const connectionString = "postgresql+psycopg://langchain:langchain@localhost:6024/langchain"

const loader = new TextLoader("./chat02/extracted_text.txt")
const raw_docs = await loader.load()

const splitter = new RecursiveCharacterTextSplitter({
    chunkSize: 1000,
    chunkOverlap: 200,
})
const docs = await splitter.splitDocuments(raw_docs)

const model = new OpenAIEmbeddings();
const db = await PGVectorStore.fromDocuments(docs, model, {
    postgresConnectionOptions: {
        connectionString
    }
})
console.log("🚀 ~ db:", db)

const results = await db.similaritySearch('AI agent', 4)
console.log("🚀 ~ results:", results)