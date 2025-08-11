import { HumanMessage, SystemMessage } from '@langchain/core/messages';
import { Annotation, END, messagesStateReducer, START, StateGraph } from '@langchain/langgraph';
import { ChatOpenAI } from '@langchain/openai';
import 'dotenv/config';

const modelLowTemp = new ChatOpenAI({
  model: 'gpt-4o-mini',
  temperature: 0.1,
  apiKey: process.env.OPENAI_API_KEY,
});

const modelHighTemp = new ChatOpenAI({
  model: 'gpt-4o-mini',
  temperature: 0.7,
  apiKey: process.env.OPENAI_API_KEY,
});

const annotation = Annotation.Root({
  messages: Annotation({
    reducer: messagesStateReducer,
    default: () => [],
  }),
  user_query: Annotation(),
  sql_query: Annotation(),
  sql_explanation: Annotation(),
});

const generatePrompt = new SystemMessage(
  '당신은 친절한 데이터 분석가입니다. 사용자의 질문을 바탕으로 SQL 쿼리를 작성하세요.'
);

async function generateSql(state) {
  const userMessage = new HumanMessage(state.user_query);
  const messages = [generatePrompt, ...state.messages, userMessage];

  const response = await modelLowTemp.invoke(messages);
  return {
    sql_query: response.content,
    messages: [...messages, response],
  };
}

const explainPrompt = new SystemMessage(
  '당신은 친절한 데이터 분석가입니다. 사용자에게 SQL 쿼리를 간단하게 설명하세요.'
);

async function explainSql(state) {
  const messages = [explainPrompt, ...state.messages];
  const response = await modelHighTemp.invoke(messages);
  return {
    sql_explanation: response.content,
    messages: response,
  };
}

const workflow = new StateGraph(annotation)
  .addNode('generate_sql', generateSql)
  .addNode('explain_sql', explainSql)
  .addEdge(START, 'generate_sql')
  .addEdge('generate_sql', 'explain_sql')
  .addEdge('explain_sql', END);

const graph = workflow.compile();

const input = { user_query: '최근 30일 동안 가장 많이 팔린 상품은 무엇인가요?' };

const result = await graph.invoke(input);
console.log('🚀 ~ result:', result);
