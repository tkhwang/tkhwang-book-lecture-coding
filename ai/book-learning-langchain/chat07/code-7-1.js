import 'dotenv/config';
import { ChatOpenAI } from '@langchain/openai';
import { Annotation, END, messagesStateReducer, START, StateGraph } from '@langchain/langgraph';
import { AIMessage, HumanMessage, SystemMessage } from '@langchain/core/messages';

const model = new ChatOpenAI({
  model: 'gpt-4o-mini',
  apiKey: process.env.OPENAI_API_KEY,
});

const annotation = Annotation.Root({
  messages: Annotation({
    reducer: messagesStateReducer,
    default: () => [],
  }),
});

const generatePrompt = new SystemMessage(
  `당신은 훌륭한 3단락 에세이를 작성하는 입무를 가진 에세이 어시스턴트입니다.
    사용자의 요청에 맞춰 최상의 에시지를 작성하세요.
    사용자가 비평을 제공하면, 이전 시도에 대한 수정 버전을 응답하세요.
  `
);

async function generate(state) {
  const answer = await model.invoke(state.messages);
  return { messages: [answer] };
}

const relfectionPrompt = new SystemMessage(
  `당신은 에세이 제출물을 평가하는 교사입니다. 사용자의 제출물에 대해 비평과 추천을 생성하세요. 
    길이, 깊이, 스타일 등과 같은 구체적인 요구사항을 포함한 자세한 추천을 제공하세요.
  `
);

async function reflect(state) {
  const clsMap = {
    ai: HumanMessage,
    human: AIMessage,
  };

  const translated = [
    relfectionPrompt,
    state.messages[0],
    ...state.messages.slice(1).map((msg) => new clsMap[msg._getType()](msg.content)),
  ];

  const answer = await model.invoke(translated);
  return { messages: [new HumanMessage({ content: answer.content })] };
}

function shouldContinue(state) {
  if (state.messages.length > 6) return END;
  return 'reflect';
}

const workflow = new StateGraph(annotation)
  .addNode('generate', generate)
  .addNode('reflect', reflect)
  .addEdge(START, 'generate')
  .addConditionalEdges('generate', shouldContinue)
  .addEdge('reflect', END);

const graph = workflow.compile();
const input = {
  messages: [
    new HumanMessage(`
아직 본격적으로 런닝을 하지는 않지만 평상시에도 max cushion 런닝화가 발이 편할 것 같아서 최근 구입하여 평상화로 신고 있다. Max Cushion 런닝화를 신었을 때의 첫 느낌은 마치 구름 위를 걷는 것 같았다. 발바닥에 전해지는 푹신한 감촉은 분명 기존의 어떤 신발보다 편안했다.

하지만 며칠 후, 이상한 일이 일어났다. 처음에는 더 없이 편안한 느낌이었는데, 오랜 시간 착용을 하니 이상하게 이전의 일반 운동화보다 발이 불편한 느낌이 든다. 특히 발바닥이 이전보다 불편한 느낌이 들었고, 무릎에도 미묘한 불편함이 찾아왔다.

이것이 바로 ‘최적화의 역설’이 아닐까 ?

img
더 좋은 것이 항상 더 나은 것은 아니다
우리는 종종 ‘더 많은 것’이 ‘더 좋은 것’이라고 착각한다. 더 많은 쿠션, 더 많은 편안함, 더 많은 지원. 하지만 인간의 몸은 완벽한 편안함을 위해 설계되지 않았다. 오히려 적당한 자극과 도전을 통해 균형을 유지하도록 만들어졌다.

발은 땅의 울퉁불퉁함을 느끼며 수많은 작은 근육들을 활성화시킨다. 너무 많은 쿠션은 이런 자연스러운 메커니즘을 방해한다.

적당한 불편함의 지혜
런닝화 전문가들이 말하는 ‘적당한 지지력’과 ‘자연스러운 착지감’은 우연이 아니다. 수십 년의 연구와 경험이 증명한 것은 발이 스스로 균형을 잡을 수 있을 때 가장 건강하다는 사실이다.

인생도 마찬가지다. 적당한 긴장감, 적당한 도전, 적당한 불확실성이 우리를 더 강하게 만든다. 완전히 예측 가능한 삶은 처음에는 안전해 보이지만, 결국 우리의 적응력과 회복력을 약화시킨다.

장기적 관점의 중요성
Max Cushion 신발이 나쁜 것은 아니다. 부상 회복 중이거나 특별한 상황에서는 필요할 수 있다. 문제는 이를 영구적인 해결책으로 여기는 것이다.

마찬가지로 편안한 선택들도 그 자체로는 문제가 없다. 중요한 것은 그것이 일시적인 휴식인지, 아니면 영구적인 회피인지를 구분하는 것이다.

균형의 예술
결국 삶은 균형의 예술이다. 너무 많은 쿠션도, 너무 적은 지지도 문제다. 핵심은 자신의 몸과 상황을 정확히 이해하고, 그에 맞는 적절한 수준을 찾는 것이다.

때로는 Max Cushion이 필요할 때가 있다. 하지만 그것이 영원한 답은 아니라는 것을 기억해야 한다. 진정한 편안함은 완벽한 쿠션에서 오는 것이 아니라, 우리 몸과 마음이 다양한 상황에 유연하게 적응할 수 있는 능력에서 온다.

런닝화를 고르듯 인생의 선택도 신중해야 한다. 당장 편해 보이는 것보다는, 장기적으로 우리를 더 강하고 건강하게 만들어 줄 것을 선택하는 지혜가 필요하다.
  `),
  ],
};

const result = await graph.invoke(input);
console.log('🚀 ~ result:', result);
