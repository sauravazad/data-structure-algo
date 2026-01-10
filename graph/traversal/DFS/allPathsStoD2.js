const assert = require('node:assert');

const createGraph = (N, edges, isDirected) => {
  const graph = {}
  for(const e of edges) {
    graph[e[0]] ??= []
    graph[e[0]].push(e[1])
    if(!isDirected){
      graph[e[1]] ??= []
      graph[e[1]].push(e[0])
    }
  }
  return graph
}

const findWays = (n, edges, source, dest) => {
  const graph = createGraph(n, edges, true)

  // use dfs to solve for the path
  const result = []
  const visited = {}

  const DFS = (current, destination, path) => {
    if(current === destination) {
      result.push([...path])
    }
    // else visit all the neighbors and call recursive

    for(let neigh of graph[current] ?? []) {
      if(!visited[neigh]) {
        visited[neigh] = true
        path.push(neigh)
        DFS(neigh,destination, path)
        // remove from path as we have to find all paths
        visited[neigh] = false
        path.pop()
      }
    }
  }

  const DFSStack = (source, destination, paths) => {
    const result = []
    const stack = []
    stack.push([source, paths])
    while(stack.length) {
      const [current, path] = stack.pop()
      if(current === destination) {
        result.push([...path])
      }
      visited[current] = true
      for(let neigh of graph[current] ?? []) {
        if(!visited[neigh]) {
          const currentPath = [...path]
          currentPath.push(neigh)
          stack.push([neigh, currentPath])
        }
      }
      // un mark visited of current
      // visited[current] = false
    }
    return result
  }

  // DFS(source, dest, [source])
  const res = DFSStack(source, dest, [source])
  return res
}

// Driver code
var main = function () {
  const fn = findWays
  const input = [
    [5, [[1, 2], [1, 3], [2, 3], [1, 4], [4, 5]], 1,5],
    [3, [['JFK', 'SFO'], ['JFK', 'ATL'], ['SFO', 'ATL'], ['ATL', 'JFK'], ['ATL', 'SFO']], 'JFK', 'SFO']
  ]

  const output = [
    [[ 1, 4, 5 ]],
    [
      [ 'JFK', 'SFO' ],
      [ 'JFK', 'ATL', 'JFK', 'SFO' ],
      [ 'JFK', 'ATL', 'SFO' ]
    ]
  ]
  /**
   *  Fill the time complexity for each function
   */

  for (var i = 0; i < input.length; i++) {
      console.log(i + 1 + ".\t Input array: \t", input[i]);
      var result = fn(...input[i]);
      console.log("\t Result is \t: ",result);
      console.log("-".repeat(100));
      assert.deepEqual(result, output[i])
  }
}

main();