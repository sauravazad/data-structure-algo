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

const bfs = (N, edges, source, destination) => {
  const graph = createGraphUndirected(N, edges)
  console.info(graph)
  const queue = []
  const parents = []
  const path = []
  const visited = new Map()
  // set depth 0 for start node
  visited.set(source, 0)
  let startIndex = 0
  parents[source] = source
  queue.push(source)

  while(startIndex < queue.length ) {
    const current = queue[startIndex]
    path.push(current)
    for(let neighbor of graph[current]) {
      let depth = visited.get(current) + 1
      if(!visited.has(neighbor)) {
        visited.set(neighbor, depth)
        queue.push(neighbor)
        parents[neighbor] = current
      }
    }
    startIndex++
  }
  console.info("path is ", path.join('-->'))
  let path2 = []
  let tmp = destination
  while(tmp != source) {
    path2.unshift(tmp)
    tmp = parents[tmp]
  }
  path2.unshift(source)
  console.info(`parents path is `, path2.join('-->'))
}

// Driver code
var main = function () {
  const fn = bfs
  const input = [
    [4,[[0, 1],[0, 2],[1, 2],[2, 3],[3, 3]], 1, 3],
    [6, [[1, 2], [2, 3], [3, 4], [1, 0], [0, 4], [3, 5], [4, 5], [5, 6]], 1, 6]
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