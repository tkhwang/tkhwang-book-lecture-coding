import { Mastra } from '@mastra/core';
import { storage } from './memory';
import { testWorkflow } from './workflows/test-workflow';
import { memeGenerationWorkflow } from './workflows/meme-generation';
import { memeGeneratorAgent } from './workflows/agents/meme-generator';

export const mastra = new Mastra({
  storage,
  agents: {
    memeGenerator: memeGeneratorAgent,
  },
  workflows: {
    'meme-generation': memeGenerationWorkflow,
  },
  telemetry: {
    enabled: true,
  },
});