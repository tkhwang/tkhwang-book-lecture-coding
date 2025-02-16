import { continueConversation } from '../src/actions'; 
import { getSupportedModel } from '../src/utils';
import { MockLanguageModelV1 } from 'ai/test';

jest.mock('../src/utils', () => ({
  getSupportedModel: jest.fn(),
}));

describe('continueConversation', () => {
  beforeEach(() => {
    jest.clearAllMocks(); // Clear mocks before each test
  });
  it('should return messages and the new message generated by the model', async () => {
    const history = [];
    const provider = 'someProvider';
    const model = 'someModel';
  
    const mockGeneratedText = 'Hello, world!';
    getSupportedModel.mockReturnValue(new MockLanguageModelV1({
      doGenerate: async () => ({
        rawCall: { rawPrompt: null, rawSettings: {} },
        finishReason: 'stop',
        usage: { promptTokens: 10, completionTokens: 20 },
        text: mockGeneratedText, // Ensure this matches your expectation
      }),
    }));

    const response = await continueConversation("Hello", history, provider, model);

    // Assertions
    expect(getSupportedModel).toHaveBeenCalledWith(provider, model);
    expect(response.messages).toEqual(history);
    expect(response.newMessage).toEqual(mockGeneratedText);
  });
});