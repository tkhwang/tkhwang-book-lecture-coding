import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, '..', '.env') });
import { Calculator } from "@langchain/community/tools/calculator";
import { DuckDuckGoSearch } from "@langchain/community/tools/duckduckgo_search";
import { ChatOpenAI, OpenAIEmbeddings } from "@langchain/openai";
import { MemoryVectorStore } from "langchain/vectorstores/memory";
import { Document } from '@langchain/core/documents';
import { Annotation, END, messagesStateReducer, START, StateGraph } from '@langchain/langgraph';
import { ToolNode } from '@langchain/langgraph/prebuilt';
import { HumanMessage } from '@langchain/core/messages';

const search = new DuckDuckGoSearch();
const calculator = new Calculator();
const tools = [search, calculator];

const embeddings = new OpenAIEmbeddings();
const model = new ChatOpenAI({
    model: 'gpt-4o-mini',
    apiKey: process.env.OPENAI_API_KEY,
    temperature: 0.1
});

const toolsStore = await MemoryVectorStore.fromDocuments(
    tools.map((tool) => new Document({
        pageContent: tool.description,
        metadata: { name: tool.constructor.name }
    })),
    embeddings
)
const toolsRetriever = toolsStore.asRetriever();

const annotation = Annotation.Root({
    messages: Annotation({
        reducer: messagesStateReducer,
        default: () => []
    }),
    selected_tools: Annotation()
})

async function modelNode(state) {
    const selectedTools = tools.filter((tool) => state.selected_tools.includes(tool.constructor.name));
    const response = await model.bindTools(selectedTools).invoke(state.messages);
    return { messages: response };
}

async function selectTools(state) {
    const query = state.messages[state.messages.length - 1].content;
    const toolDocs = await toolsRetriever.invoke(query);
    return { selected_tools: toolDocs.map((doc) => doc.metadata.name) };
}

// Custom condition function for routing after the model node
function customToolsCondition(state) {
    const lastMessage = state.messages[state.messages.length - 1];
    // Check if the last message has tool calls
    if (lastMessage.tool_calls && lastMessage.tool_calls.length > 0) {
        return 'tools';
    }
    return END;
}

const workflow = new StateGraph(annotation)
    .addNode('select_tools', selectTools)
    .addNode('model', modelNode)
    .addNode('tools', new ToolNode(tools))
    .addEdge(START, 'select_tools')
    .addEdge('select_tools', 'model')
    .addConditionalEdges('model', customToolsCondition)
    .addEdge('tools', 'model')

const graph = workflow.compile();

const result = await graph.invoke({
    messages: [new HumanMessage('미국 대통령 트럼프가 한국에 방한했을때 나이가 몇 살이었나요 ?')]
})

console.log(result);

