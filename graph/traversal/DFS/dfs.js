const createGraphUndirected = (N, edges) => {
  const graph = {}
  for (const e of edges) {
    graph[e[0]] ? graph[e[0]].add(e[1]) : (graph[e[0]] = new Set([e[1]]))
    graph[e[1]] ? graph[e[1]].add(e[0]) : (graph[e[1]] = new Set([e[0]]))
  }
  return graph
}

const DFS = (N, edges, startVertex) => {
  const graph = createGraphUndirected(N, edges)
  console.info(graph)
  const stack = []
  const path = []
  const visited = new Map()
  // perform bfs from vertex 1
  const start = startVertex || 1
  stack.push(start)
  visited.set(start, true)
  while (stack.length) {
    /**
      - pop from top of the stack
      - mark it as visited if not already visited
      - push the neighbors into the stack
     */
    const v = stack.pop()
    path.push(v)
    for (const e of graph[v]) {
      if (visited.has(e) === false) {
        visited.set(e, true)
        stack.push(e)
      }
    }
  }

  // for(let v of visited.keys()) {
  //   path.push(v)
  // }
  return path
}

// Driver code
const main = function () {
  const fn = DFS
  const input = [
    [4, [[0, 1], [0, 2], [1, 2], [2, 3], [3, 3]]]
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
