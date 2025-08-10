import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";


const loader = new PDFLoader("./chat02/principles_2nd_edition_updated.pdf")
const docs = await loader.load();

console.log(docs);