import 'dotenv/config';
import { DuckDuckGoSearch } from '@langchain/community/tools/duckduckgo_search';
import { Calculator } from '@langchain/community/tools/calculator';
import { ChatOpenAI } from '@langchain/openai';
import { AIMessage } from '@langchain/core/messages';
import { END, START, StateGraph } from '@langchain/langgraph';
import { ToolNode, toolsCondition } from '@langchain/langgraph/prebuilt';
import { MessagesAnnotation } from '@langchain/langgraph';
import { HumanMessage } from '@langchain/core/messages';
import fs from 'fs';

const search = new DuckDuckGoSearch();
const cal = new Calculator();
const tools = [search, cal];

const model = new ChatOpenAI({
  model: 'gpt-4o-mini',
  apiKey: process.env.OPENAI_API_KEY,
}).bindTools(tools);

async function firstModelNode(state) {
  const query = state.messages[state.messages.length - 1].content;
  const searchToolCall = {
    name: 'duckduckgo_search',
    args: { query },
    id: Math.random().toString(),
  };

  // Return an AIMessage with the tool call
  return {
    messages: new AIMessage({
      content: '',
      tool_calls: [searchToolCall],
    }),
  };
}

async function modelNode(state) {
  const response = await model.invoke(state.messages);
  return { messages: response };
}

const workflow = new StateGraph(MessagesAnnotation)
  .addNode('first_model', firstModelNode)
  .addNode('model', modelNode)
  .addNode('tools', new ToolNode(tools))
  .addEdge(START, 'first_model')
  .addEdge('first_model', 'tools')
  .addEdge('tools', 'model')
  .addConditionalEdges('model', toolsCondition)
  .addEdge('model', END);

const graph = workflow.compile();

const input = {
  messages: [new HumanMessage('미국의 제30대 대동령이 사망했을 때 몇 살이었나요 ?')],
};

const result = await graph.invoke(input);
console.log('🚀 ~ result:', result);

// const image = await graph.getGraphAsync();
// const png = await image.drawMermaidPng();

// const arrayBuffer = await png.arrayBuffer();
// const buffer = Buffer.from(arrayBuffer);

// fs.writeFileSync('./chat06/graph.png', buffer);
