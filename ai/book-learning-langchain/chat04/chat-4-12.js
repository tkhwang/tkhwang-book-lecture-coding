import { AIMessage, filterMessages, HumanMessage, SystemMessage } from '@langchain/core/messages';

const messages = [
  new SystemMessage({ content: '당신은 친절한 어시스턴트입니다.', id: '1' }),
  new HumanMessage({ content: '예시 입력', id: '2', name: 'example_user' }),
  new AIMessage({ content: '예시 출력', id: '3', name: 'example_assistant' }),
  new HumanMessage({ content: '실제 입력', id: '4', name: 'bob' }),
  new AIMessage({ content: '실제 출력', id: '5', name: 'alice' }),
];

const filterByHumanMessages = filterMessages(messages, {
  includeTypes: ['human'],
});

console.log('🚀 ~ filterByHumanMessages:', filterByHumanMessages);
