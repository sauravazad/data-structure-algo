//https://practice.geeksforgeeks.org/problems/level-of-nodes-1587115620/1

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

const findNodeLevel = (N, edges, X) => {
  const graph = createGraphUndirected(N, edges)
  // console.info(graph)
  const visited = new Map()
  const stack = []
  const path = []
  const start = edges[0][0]
  // set level = 0 in  visited
  visited.set(start, 0)
  stack.push(start)
  while(stack.length) {
    const curr = stack.pop()
    path.push(curr)
    for(let v of graph[curr]) {
      if (!visited.has(v)) {
        visited.set(v, visited.get(curr) + 1)
        stack.push(v)
      }
    }
    if(visited.has(X)) { return  visited.get(X)}
  }
  // console.log(visited)
  return -1
}
// Driver code
var main = function () {
  const fn = findNodeLevel
  const input = [
    [6, [
      [0 ,1],
      [0 ,2],
      [1, 3],
      [1, 4],
      [2, 5]
      ], 4],
    [4,[[0, 1],[0, 2],[1, 2],[2, 3],[3, 3]], 2]
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