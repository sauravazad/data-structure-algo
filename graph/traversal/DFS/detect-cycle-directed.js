const createGraph = (N, edges, isDirected = false) => {
  const graph = {}
  for (let e of edges) {
    graph[e[0]] ? graph[e[0]].add(e[1]) : graph[e[0]] = new Set([e[1]])
    if(!isDirected) {
      graph[e[1]] ? graph[e[1]].add(e[0]) : graph[e[1]] = new Set([e[0]])
    }
  }
  return graph
}

const hasCycle = (N, edges) => {
  const graph = createGraph(N, edges, true)
  const visited = new Map()
  /**
    use visited as a mark to track if the node has been passed and then backtracked
    while backtracking mark it as 2 and while visiting initially mark it as 1
    So that when we encounter a node that has already been visited we can check if it is a back edge
   */
  const DFSHelper = (current, parent) => {
    visited.set(current, 1)
    for( let neighbors of graph[current]) {
      if(!visited.has(neighbors)) {
        if(DFSHelper(neighbors, current)) {
          return true
        }
      } else if (neighbors !== parent && visited.get(neighbors) === 1) {
        // back edge
        return true
      }
    }
    // mark it as backtracked
    visited.set(current, 2)
    return false
  }
  return DFSHelper(edges[0][0], -1)
}
// Driver code
var main = function () {
  const fn = hasCycle
  const input = [
    [4, [[0, 1], [0, 2], [0, 3]]],
    [7, [[0, 1], [1, 2], [2, 0], [3, 4], [4, 5], [5, 6], [6, 3]]],
    [4, [[0, 1], [1, 2], [2, 0]]]
  ]
  /**
   *  Fill the time complexity for each function
   */

  for (var i = 0; i < input.length; i++) {
      console.log(i + 1 + ".\t Input array:", input[i]);
      var result = fn(...input[i]);
      console.log("\t Graph has cycle",result);
      console.log("-".repeat(100));
  }
}

main();