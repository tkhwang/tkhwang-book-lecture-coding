import 'dotenv/config';
import { AIMessage, HumanMessage, SystemMessage, trimMessages } from '@langchain/core/messages';
import { ChatOpenAI } from '@langchain/openai';

const messages = [
  new SystemMessage('당신은 친절한 어시스턴트입니다.'),
  new HumanMessage('안녕하세요. 저는 tkhwang 입니다.'),
  new AIMessage('안녕하세요!'),
  new HumanMessage('바닐라 이이스크림을 좋아해죠!'),
  new AIMessage('저도 좋아합니다!'),
  new HumanMessage('저는 오늘 친구와 카페에 가서 커피를 마셨어요.'),
  new AIMessage('커피 마시는 것도 좋네요!'),
  new HumanMessage('오늘 날씨가 좋네요.'),
  new AIMessage('네, 좋은 날씨에 외출하는 것도 좋네요!'),
  new HumanMessage('오늘 친구와 카페에 가서 커피를 마셨어요.'),
  new AIMessage('커피 마시는 것도 좋네요!'),
  new HumanMessage('오늘 날씨가 좋네요.'),
  new AIMessage('네, 좋은 날씨에 외출하는 것도 좋네요!'),
];
console.log('🚀 ~ messages:', messages);

const trimmer = trimMessages({
  maxTokens: 200,
  strategy: 'last',
  tokenCounter: new ChatOpenAI({
    model: 'gpt-4o',
    apiKey: process.env.OPENAI_API_KEY,
  }),
  includeSystem: true,
  allowPartial: true,
});

const trimmed = await trimmer.invoke(messages);
console.log('🚀 ~ trimmed:', trimmed);
