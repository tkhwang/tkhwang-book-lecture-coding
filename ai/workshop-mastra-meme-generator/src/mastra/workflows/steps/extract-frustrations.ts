import z from "zod";
import { frustrationsSchema } from "../schemas";
import { generateObject } from "ai";
import { openai } from "@ai-sdk/openai";
import { createStep } from "@mastra/core/workflows";

export const extractFrustrationsStep = createStep({
    id: 'extract-frustrations',
    description:
        'Extract and categorize user frustrations from raw input using AI',
    inputSchema: z.object({
        userInput: z.string().describe('Raw user input about work frustrations'),
    }),
    outputSchema: frustrationsSchema.extend({
        analysis: z.object({
            message: z.string()
        })
    }),
    execute: async ({ inputData }) => {
        try {
            console.log('🔍 Analyzing your workplace frustrations...');

            const result = await generateObject({
                model: openai('gpt-4o-mini'),
                schema: frustrationsSchema,
                prompt: `
          Analyze this workplace frustration and extract structured information:
          
          "${inputData.userInput}"
          
          Extract:
          - Individual frustrations with categories
          - Overall mood
          - Keywords for each frustration
          - Suggested meme style
          
          Keep analysis concise and focused.
        `,
            })

            const frustrations = result.object;

            console.log(
                `✅ Found ${frustrations.frustrations.length} frustrations, mood: ${frustrations.overallMood}`,
            );

            return {
                ...frustrations,
                analysis: {
                    message: `Analyzed your frustrations - main issue: ${frustrations.frustrations[0]?.category} (${frustrations.overallMood} mood)`,
                }
            }

        } catch (error) {
            console.error('Error extracting frustrations:', error);
            throw new Error('Failed to analyze frustrations');
        }
    },
})
