const createGraph = (N, edges, isDirected) => {
  const graph = Array(N).fill().map(() => Array().fill([]))
  for (const e of edges) {
    graph[e[0]].push(e[1])
    if (!isDirected) {
      graph[e[1]].push(e[0])
    }
  }
  return graph
}
// visit after solving topological sort // Khan's algorithm(BFS) https://csacademy.com/lesson/topological_sorting
const detectCycleBFS = (N, edges) => {

}

// Driver code
const main = function () {
  const fn = detectCycleBFS
  const input = [
    [7, [[0, 1], [1, 2], [2, 0], [3, 4], [4, 5], [5, 6], [6, 3]]],
    [4, [[0, 1], [0, 2]]]
  ]
  /**
   *  Fill the time complexity for each function
   */

  for (let i = 0; i < input.length; i++) {
    console.log(i + 1 + '.\t Input array:', input[i])
    const result = fn(...input[i])
    console.log('\t Result is', result)
    console.log('-'.repeat(100))
  }
}

main()
