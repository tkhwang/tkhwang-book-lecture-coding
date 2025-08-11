import { Annotation, START, StateGraph } from '@langchain/langgraph';

const StateAnnotation = Annotation.Root({
  foo: Annotation(),
});

const SubgraphAnnotation = Annotation.Root({
  foo: Annotation(),
  bar: Annotation(),
});

const subgraphNode = async (state) => {
  return { foo: state.foo + 'bar' };
};

const subgraph = new StateGraph(SubgraphAnnotation)
  .addNode('subgraph', subgraphNode)
  .addEdge(START, 'subgraph')
  .compile();

const parentGraph = new StateGraph(StateAnnotation)
  .addNode('subgraph', subgraph)
  .addEdge(START, 'subgraph')
  .compile();

const initialState = { foo: 'hello' };
const result = await parentGraph.invoke(initialState);
console.log(result);
