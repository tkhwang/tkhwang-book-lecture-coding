import { Annotation, START, StateGraph } from '@langchain/langgraph';

const StateAnnotation = Annotation.Root({
  foo: Annotation(),
});

const SubgraphStateAnnotation = Annotation.Root({
  bar: Annotation(),
  bza: Annotation(),
});

const subgraphNode = async (state) => {
  return { bar: state.bar + 'baz' };
};

const subgraph = new StateGraph(SubgraphStateAnnotation)
  .addNode('subgraph', subgraphNode)
  .addEdge(START, 'subgraph')
  .compile();

const subgraphWrapperNode = async (state) => {
  const reponse = await subgraph.invoke({
    bar: state.foo,
  });
  return {
    foo: reponse.bar,
  };
};

const parentGraph = new StateGraph(StateAnnotation)
  .addNode('subgraph', subgraphWrapperNode)
  .addEdge(START, 'subgraph')
  .compile();

const initialState = { foo: 'hello' };
const result = await parentGraph.invoke(initialState);
console.log(result);
