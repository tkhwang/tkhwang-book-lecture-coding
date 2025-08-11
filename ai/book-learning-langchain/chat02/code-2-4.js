import { TextLoader } from "langchain/document_loaders/fs/text";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";


const loader = new TextLoader("./chat02/test.txt")
const docs = await loader.load();

const splitter = new RecursiveCharacterTextSplitter({
    chunkSize: 1000,
    chunkOverlap: 200,
})

const splittedDoc = await splitter.splitDocuments(docs);
console.log(splittedDoc);