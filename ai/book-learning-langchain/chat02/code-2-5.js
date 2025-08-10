import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters"

const PYTHON_CODE = `
def hello_world():
    print("Hello, World!")

hello_world()
`

const pythonSplitter = RecursiveCharacterTextSplitter.fromLanguage('python', {
    chunkSize: 50,
    chunkOverlap: 0,
})

const pythonDocs = await pythonSplitter.createDocuments([PYTHON_CODE])
console.log(pythonDocs)