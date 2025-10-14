import { ChatPromptTemplate } from "@langchain/core/prompts";
import { ChatOpenAI } from "@langchain/openai";
import z from "zod";


export const planObject = z.object({
    steps: z
        .array(z.string())
        .describe("different steps to follow, should be in sorted order"),
})

const plannerPrompt = ChatPromptTemplate.fromTemplate(
    `For the given objective, come up with a simple step by step plan. \
This plan should involve individual tasks, that if executed correctly will yield the correct answer. Do not add any superfluous steps. \
The result of the final step should be the final answer. Make sure that each step has all the information needed - do not skip steps.

{objective}`,
);

const model = new ChatOpenAI({ model: "gpt-4o-mini" });
const structureModel = model.withStructuredOutput(planObject);

export const planner = plannerPrompt.pipe(structureModel)