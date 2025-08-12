import 'dotenv/config';
import { ChatOpenAI } from '@langchain/openai';
import z from 'zod';
import { START, END, StateGraph } from '@langchain/langgraph';
import { SystemMessage } from '@langchain/core/messages';

const SupervisorDecision = z.object({
  next: z.enum(['researcher', 'coder', 'FINISH']),
});

const model = new ChatOpenAI({
  model: 'gpt-4o-mini',
  apiKey: process.env.OPENAI_API_KEY,
});
const modelWithStructuredOutput = model.withStructuredOutput(SupervisorDecision);

const agents = ['researcher', 'coder'];

const systemPromptPart1 = `
당신은 다음 서브에이전트 사이의 대화를 관리하는 슈퍼바이저입니다. 서브에이전트: ${agents.join(',')}
다음으로 행동할 서브에이전트를 지목하세요. 각 서브 에이전트는 임무를 수행하고 결과와 상태를 응답합니다. 
실행할 서브에이전트가 없거나 작업이 완료되면, FINISH 로 응답하세요.
`;

const systemPromptPart2 = `
위 대화를 바탕으로 행동할 서브에이전트는 누구입니까 ? 아니면 FINISH 해야 합니까 ? 서브에이전트: ${agents.join(',')},
FINISH
`;

const supervisor = async (state) => {
  const messages = [
    new SystemMessage(systemPromptPart1),
    ...state.messages,
    new SystemMessage(systemPromptPart2),
  ];

  const result = await modelWithStructuredOutput.invoke(messages);
  return {
    messages: state.messages,
    next: result.next,
  };
};

const researcher = async (state) => {
  // TODO:
  return {
    messages: [...state.messages, response],
  };
};

const coder = async (state) => {
  // TODO:
  return {
    messages: [...state.messages, response],
  };
};

const graph = new StateGraph(StateAnnotation)
  .addNode('supervisor', supervisor)
  .addNode('researcher', researcher)
  .addNode('coder', coder)
  .addEdge(START, 'supervisor')
  .addConditionalEdges('supervisor', async (state) => {
    return state.next === 'FINISH' ? END : state.next;
  })
  .addEdge('researcher', 'supervisor')
  .addEdge('coder', 'supervisor')
  .compile();
