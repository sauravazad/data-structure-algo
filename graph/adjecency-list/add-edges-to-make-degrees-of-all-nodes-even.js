/**
https://leetcode.com/problems/add-edges-to-make-degrees-of-all-nodes-even

[Hint:]
- Note that if we add one edge it increases degree of 2 vertices
- The number of nodes with an odd degree in the original graph should be either 0, 2, or 4. Try to work on each of these cases.
 */

const createGraphUndirected = (N, edges) => {
  const graph = {}
  for(let i = 1; i <= N; i++) {
    graph[i] = new Set()
  }
  for (let e of edges) {
    graph[e[0]] ? graph[e[0]].add(e[1]) : graph[e[0]] = new Set([e[1]])
    graph[e[1]] ? graph[e[1]].add(e[0]) : graph[e[1]] = new Set([e[0]])
  }
  return graph
}

const isPossible = function(n, edges) {
  const graph = createGraphUndirected(n, edges)
  // iterate through the graph and check for vertex with odd degree
  /*  it should be either
    -  zero , no changes are required
    - 2, One edge has to be added
    - 4 Two edges needs to be connected
  */
  console.info(graph)
  let count = new Set()
  for(let v of Object.keys(graph)) {
    if(graph[v].size %2 != 0) {
      count.add(parseInt(v, 10))
    }
  }
  // console.info("count", count.size)
  let flag = false
  if(count.size %2  === 0) {
    if(count.size === 0) return true // no addition is required
    // if number of vertex with odd degree is 2 then we can connect them if not connected to make them even , or there exists a vertex that is not connected to either of the vertexes
    if(count.size === 2) {
      // console.info(count)
      const [v1, v2] = count
      // if they are not connected then we can add one edge to make the degree even
      if (!graph[v1].has(v2)) {
        return true
      }
      let common = []
      for(let v of Object.keys(graph)) {
        if (graph[v].has(v1) === false && graph[v].has(v2) === false) common.push(v)
      }
      // console.info('common', common)
      if(common.length >= 1) return true
    } else if(count.size === 4) {
      const [i1, i2, i3, i4] = count
      const flag1 = !(graph[i1].has(i3) || graph[i2].has(i4))
      const flag2 = !(graph[i1].has(i4) || graph[i3].has(i2))
      const flag3 = !(graph[i1].has(i2) || graph[i3].has(i4))
      flag = flag1 || flag2 || flag3
      return flag
    }
  }
    return flag
  // return flag
};
// Driver code
var main = function () {
  const fn = isPossible
  const input = [
    [6, [[6,4],[1,4],[1,6],[5,6]]],
    // [4, [[1,2],[2,3],[2,4],[3,4]]],
    // [4, [[1,2],[1,3],[1,4]]],
    // [5, [[1,2],[2,3],[3,4],[4,2],[1,4],[2,5]]],
    // [4, [[1,2],[3,4]]],

    // [5, [[1,2],[2,4]]]
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