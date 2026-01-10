/**
https://leetcode.com/problems/minimum-degree-of-a-connected-trio-in-a-graph/
1761. Minimum Degree of a Connected Trio in a Graph

You are given an undirected graph. You are given an integer n which is the number of nodes in the graph and an array edges, where each edges[i] = [ui, vi] indicates that there is an undirected edge between ui and vi.
A connected trio is a set of three nodes where there is an edge between every pair of them.
The degree of a connected trio is the number of edges where one endpoint is in the trio, and the other is not.
Return the minimum degree of a connected trio in the graph, or -1 if the graph has no connected trios.
 */

const createGraphUndirected = (N, edges) => {
  const graph = {}
  for (let e of edges) {
    graph[e[0]] ? graph[e[0]].add(e[1]) : graph[e[0]] = new Set([e[1]])
    graph[e[1]] ? graph[e[1]].add(e[0]) : graph[e[1]] = new Set([e[0]])
  }
  return graph
}

const  minTrioDegree2  = function(n, edges) {
  // time Complexity = O(n^3)
  const graph = createGraph(n, edges)
  console.info(graph)
  let ans = Number.MAX_SAFE_INTEGER
  for(let e1 of Object.keys(graph)) {
    for(let e2 of graph[e1]) {
      for(let e3 of graph[e1]) {
        if(e3 in graph[e2] && e2 != e3) {
          ans = Math.min(ans, graph[e1].length + graph[e2].length + graph[e3].length - 6)
        }
      }
    }
  }
  return ans < Number.MAX_SAFE_INTEGER ? ans : -1
};

const minTrioDegree = (N, edges) => {
  const graph = createGraph(N, edges)
  let ans = Number.MAX_SAFE_INTEGER
  // console.info(graph)
  for(let edge of edges) {//n
    const [node1, node2] = edge
    // iterate through neighbor of the node1
    for (let vertex of graph[node1]) {
      // check if there is path for vertex in node2
      if(graph[node2].has(vertex)) {
        // it is a trio
        const degreeOfTrio = graph[node1].size + graph[node2].size + graph[vertex].size - 6
        // console.info(`Found a trio`, node1, node2, vertex, degreeOfTrio)
        ans = Math.min(ans, degreeOfTrio) // (3 * 2)it is uni directional , hence the path between the trio is counted twice
      }
    }
  }
  return Number.MAX_SAFE_INTEGER === ans ? -1 : ans
}

// Driver code
var main = function () {
  const fn = minTrioDegree
  const input = [
    [6, [[1,2],[1,3],[3,2],[4,1],[5,2],[3,6]]],
    [7, [[1,3],[4,1],[4,3],[2,5],[5,6],[6,7],[7,5],[2,6]]]
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