/**
https://leetcode.com/problems/find-center-of-star-graph/
 */
class Graph {
  constructor (size) {
    const list = [...Array(size)].map(() => [])
    this.adjList = list
  }

  addEdge (u, v) {
    // as it is a un directed graph
    this.adjList[u].push(v)
    this.adjList[v].push(u)
  }
}

const insertInGraph = (size, edges) => {
  const graph = new Graph(size)
  edges.forEach((e) => {
    graph.addEdge(...e)
  })
  return graph
}
// Driver code
const main = function () {
  const fn = insertInGraph
  const input = [
    5
  ]
  const edges = [
    [[0, 1], [0, 2], [1, 2], [2, 0], [2, 3]]
  ]
  /**
   *  Fill the time complexity for each function
   */

  for (let i = 0; i < input.length; i++) {
    console.log(i + 1 + '.\t Input array:', input[i])
    const result = fn(input[i], edges[i])
    console.log('\t Result is', result)
    console.log('-'.repeat(100))
  }
}

main()
