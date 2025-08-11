import 'dotenv/config';
import { Annotation, END, messagesStateReducer, START, StateGraph } from '@langchain/langgraph';
import { ChatOpenAI } from '@langchain/openai';
import { HumanMessage } from '@langchain/core/messages';

const StateAnnotation = Annotation.Root({
  messages: Annotation({
    reducer: messagesStateReducer,
    default: () => [],
  }),
});

const model = new ChatOpenAI({
  model: 'gpt-4o-mini',
  apiKey: process.env.OPENAI_API_KEY,
});

async function chatbot(state) {
  const answer = await model.invoke(state.messages);
  return { messages: answer };
}

const workflow = new StateGraph(StateAnnotation)
  .addNode('chatbot', chatbot)
  .addEdge(START, 'chatbot')
  .addEdge('chatbot', END);

const graph = workflow.compile();

const input = { messages: [new HumanMessage('안녕하세요!')] };

// for await (const chunk of await graph.stream(input)) {
//   console.log(chunk);
// }

const result = await graph.invoke(input);
console.log('🚀 ~ result:', result);
