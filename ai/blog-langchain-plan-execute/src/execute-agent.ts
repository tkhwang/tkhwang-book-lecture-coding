import { createReactAgent } from "@langchain/langgraph/prebuilt";
import { ChatOpenAI } from "@langchain/openai";
import { tools } from "./tool";

export const agentExecutor = createReactAgent({
    llm: new ChatOpenAI({ model: "gpt-4o-mini" }),
    tools
})