import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";
import { writeFile } from 'fs/promises';


const loader = new PDFLoader("./chat02/principles_2nd_edition_updated.pdf")
const docs = await loader.load();
console.log(docs);

// save text to file
const textContent = docs.map(doc => doc.pageContent).join('\n\n');
await writeFile('./chat02/extracted_text.txt', textContent, 'utf-8');
console.log('Text saved to extracted_text.txt');
