const createGraphUndirected = (N, edges, isDirected = false) => {
  const graph = {}
  for (let e of edges) {
    graph[e[0]] ? graph[e[0]].add(e[1]) : graph[e[0]] = new Set([e[1]])
    if(!isDirected) {
      graph[e[1]] ? graph[e[1]].add(e[0]) : graph[e[1]] = new Set([e[0]])
    }
  }
  return graph
}

const bfs = (N, edges) => {
  const graph = createGraphUndirected(N, edges)
  // console.info(graph)
  const BFS = (start, dest) => {
    const queue = []
    let startIndex = 0
    const visited = new Map()
    const path = []
    queue.push(start)
    // set visited with  depth , 0 for start node
    visited.set(start, 0)
    while(startIndex < queue.length) {
      const curr = queue[startIndex]
      path.push(curr)
      for(let nei of graph[curr]) {
        if (!visited.has(nei)) {
          queue.push(nei)
          visited.set(nei, visited.get(curr) + 1)
        }
      }
      if (visited.get(dest)){
          console.info('Path traversed :-', path)
          return visited.get(dest)
        }
      startIndex++
    }
    return -1
  }
  return  BFS(0, 3)
}
// Driver code
var main = function () {
  const fn = bfs
  const input = [
    [4,[[0, 1],[0, 2],[1, 2],[2, 3],[3, 3]]],
    // [7, [[1, 2], [2, 3], [3, 4], [1, 0], [0, 4], [3, 5], [4, 5], [5, 6]]]
  ]
  /**
   *  Fill the time complexity for each function
   */

  for (var i = 0; i < input.length; i++) {
      console.log(i + 1 + ".\t Input array:", input[i]);
      var result = fn(...input[i]);
      console.log("\t Result is",result);
      console.log("-".repeat(100));
  }
}

main();