const createGraphUndirected = (N, edges, isDirected = false) => {
  const graph = {}
  for (const e of edges) {
    graph[e[0]] ? graph[e[0]].add(e[1]) : graph[e[0]] = new Set([e[1]])
    if (!isDirected) {
      graph[e[1]] ? graph[e[1]].add(e[0]) : graph[e[1]] = new Set([e[0]])
    }
  }
  return graph
}

const detectCycle = (N, edges) => {
  const graph = createGraphUndirected(N, edges)
  const visited = new Map()
  const DFS = (current, parent) => {
    // mark the current node as visited
    visited.set(neighbors, true)
    for (const neighbors of graph[current]) {
      if (!visited.has(neighbors)) {
        const subProblem = DFS(neighbors, current)
        if (subProblem) {
          return true
        }
      } else if (neighbors != parent) { // discard the current node's previous node or parent
        return true
      }
    }
    return false
  }
  return DFS(edges[0][0], -1)
}
// Driver code
const main = function () {
  const fn = detectCycle
  const input = [
    [7, [[0, 1], [1, 2], [2, 0], [3, 4], [4, 5], [5, 6], [6, 3]]],
    [4, [[[0, 1], [0, 2]]]]
  ]
  /**
   *  Fill the time complexity for each function
   */

  for (let i = 0; i < input.length; i++) {
    console.log(i + 1 + '.\t Input array:', input[i])
    const result = fn(...input[i])
    console.log('\t Graph has Cycle', result)
    console.log('-'.repeat(100))
  }
}

main()
