import { JsonOutputToolsParser } from "@langchain/core/output_parsers/openai_tools";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { tool } from "@langchain/core/tools"
import { ChatOpenAI } from "@langchain/openai";
import z from "zod"
import { planObject } from "./plan";


const responseObject = z.object({
    response: z.string().describe("Response to user."),
})

const responseTool = tool(() => { }, {
    name: "response",
    description: "Respond to the user's query",
    schema: responseObject,
})

const planTool = tool(() => { }, {
    name: "plan",
    description: "This tool is used to plan the steps to follow.",
    schema: planObject,
})

const replannerPrompt = ChatPromptTemplate.fromTemplate(
    `For the given objective, come up with a simple step by step plan. 
This plan should involve individual tasks, that if executed correctly will yield the correct answer. Do not add any superfluous steps.
The result of the final step should be the final answer. Make sure that each step has all the information needed - do not skip steps.

Your objective was this:
{input}

Your original plan was this:
{plan}

You have currently done the follow steps:
{pastSteps}

Update your plan accordingly. If no more steps are needed and you can return to the user, then respond with that and use the 'response' function.
Otherwise, fill out the plan.  
Only add steps to the plan that still NEED to be done. Do not return previously done steps as part of the plan.`,
);

const parser = new JsonOutputToolsParser();

export const replanner = replannerPrompt
    .pipe(
        new ChatOpenAI({ model: "gpt-4o-mini" })
            .bindTools([
                planTool,
                responseTool,
            ])
    )
    .pipe(parser)