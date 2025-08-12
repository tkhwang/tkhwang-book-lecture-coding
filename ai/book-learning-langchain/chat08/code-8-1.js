import z from 'zod';
import 'dotenv/config';
import { ChatOpenAI } from '@langchain/openai';

const joke = z.object({
  setup: z.string().describe('농담의 설정'),
  punchline: z.string().describe('농담의 포인트'),
});

const model = new ChatOpenAI({
  model: 'gpt-4o-mini',
  apiKey: process.env.OPENAI_API_KEY,
});

// @ts-expect-error
const structured = model.withStructuredOutput(joke);

const result = await structured.invoke('고양이에 대한 농담을 만들어 주세요.');
console.log('🚀 ~ result:', result);
