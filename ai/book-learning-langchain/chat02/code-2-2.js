import { CheerioWebBaseLoader } from "@langchain/community/document_loaders/web/cheerio";


const loader = new CheerioWebBaseLoader("https://www.google.com");
const docs = await loader.load();

console.log(docs);