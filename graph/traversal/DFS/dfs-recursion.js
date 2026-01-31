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

// const DFS = (N, edges, startVertex) => {
//   const graph = createGraphUndirected(N, edges)
//   const visited = new Map()
//   const stack = []
//   const start = startVertex || 0
//   stack.push(start)
//   visited.set(start, true)
//   while(stack.length) {
//     const curr = stack.pop()
//     for(let neigh of graph[curr]) {
//       if(!visited.has(neigh)) {
//         stack.push(neigh)
//         visited.set(neigh, true)
//       }
//     }
//   }
//   const path = []
//   for( let v of visited.keys()) {
//     path.push(v)
//   }
//   return path
// }

const DFS = (N, edges) => {
  const visited = new Map()
  const graph = createGraphUndirected(N, edges)
  const DFSHelper = (current) => {
    visited.set(current, true)
    for (const neighbors of graph[current]) {
      if (!visited.has(neighbors)) {
        DFSHelper(neighbors)
      }
    }
  }
  DFSHelper(edges[0][0])
  const path = []
  for (const v of visited.keys()) {
    path.push(v)
  }
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
