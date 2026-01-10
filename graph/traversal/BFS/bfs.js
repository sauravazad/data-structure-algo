const createGraphUndirected = (N, edges) => {
  const graph = {}
  for (let e of edges) {
    graph[e[0]] ? graph[e[0]].add(e[1]) : graph[e[0]] = new Set([e[1]])
    graph[e[1]] ? graph[e[1]].add(e[0]) : graph[e[1]] = new Set([e[0]])
  }
  return graph
}

const bfs = (N, edges, startNode) => {
  const graph = createGraphUndirected(N, edges)
  // console.info("graph", graph)
  const visited = new Map()
  const queue = []
  let path = []
  let qIndex = 0
  // push the start Node into the queue and process
  const start = startNode|| 1
  queue.push(start)
  visited.set(start, true)
  while(queue[qIndex] !== undefined) {
    let v = queue[qIndex]
    /**
      - get the first element from the queue
      - check if it is visited , else mark it as visited
      - push the neighbors into the queue
     */
      path.push(v)
      for(let vert of graph[v])  {
        if(!visited.has(vert)) {
          visited.set(vert, true)
          queue.push(vert)
        }
      }
    qIndex++
  }
  return path

}
// Driver code
var main = function () {
  const fn = bfs
  const input = [
    [4,[[0, 1],[0, 2],[1, 2],[2, 3],[3, 3]]],
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