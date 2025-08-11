const { db } = await import("./code-3-1.js")

const retriever = db.asRetriever();

const docs = await retriever.invoke("AI agent")
console.log("🚀 ~ docs:", docs)
