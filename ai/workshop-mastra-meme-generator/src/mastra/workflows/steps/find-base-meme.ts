import { createStep } from '@mastra/core/workflows';
import { z } from 'zod';
import { frustrationsSchema, memeTemplateSchema } from '../schemas';

export const findBaseMemeStep = createStep({
    id: 'find-base-meme',
    description: 'Find a base meme template',
    inputSchema: frustrationsSchema.extend({
        analysis: z.object({
            message: z.string(),
        }),
    }),
    outputSchema: z.object({
        templates: z.array(memeTemplateSchema),
        searchCriteria: z.object({
            primaryMood: z.enum(['frustrated', 'annoyed', 'overwhelmed', 'tired', 'angry', 'sarcastic']),
            style: z.enum(['classic', 'modern', 'corporate', 'developer', 'meeting', 'remote-work']),
        }),
        analysis: z.object({
            message: z.string(),
        }),
    }),
    execute: async ({ inputData }) => {
        try {
            console.log('🔍 Searching for the perfect meme template...');

            const response = await fetch('https://api.imgflip.com/get_memes');
            const data = await response.json() as {
                success: boolean;
                data: {
                    memes: Array<{
                        id: string;
                        name: string;
                        url: string;
                        width: number;
                        height: number;
                        box_count: number;
                    }>;
                };
            };

            if (!data.success) {
                throw new Error('Failed to fetch meme templates');
            }

            const popularMemes = data.data.memes.slice(0, 100);
            const shuffled = popularMemes.sort(() => Math.random() - 0.5);
            const selectedMemes = shuffled.slice(0, 10);
            console.log(`✅ Found ${selectedMemes.length} suitable meme templates`);

            return {
                templates: selectedMemes,
                searchCriteria: {
                    primaryMood: inputData.overallMood,
                    style: inputData.suggestedMemeStyle,
                },
                analysis: {
                    message: `Found ${selectedMemes.length} meme templates matching ${inputData.overallMood} mood`,
                },
            }
        } catch (error) {
            console.error('Error finding meme templates:', error);
            throw new Error('Failed to find meme templates');
        }
    }
})