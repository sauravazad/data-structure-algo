// https://leetcode.com/problems/find-closest-node-to-given-two-nodes/

const assert = require("assert")

var closestMeetingNode = function(edges, node1, node2) {
  const n = edges.length
  const graph = Array(n).fill().map(() => Array().fill([]))

  for(let i = 0; i < n ; i++) {
    const edge = edges[i]
    if(edge !== -1) {
      graph[i].push(edge)
    }
  }

  const DFSDepth = (curr, parent, distances) => {
    distances[curr] = (distances[parent] ?? 0) + 1
    for( let n of graph[curr]) {
      if(!distances[n]) DFSDepth(n, curr, distances)
    }
  }
  const distance1 = [] , distance2 = []

  DFSDepth(node1, -1, distance1)
  DFSDepth(node2, -1, distance2)
  /**
    DO DFS from node1, node2 to each vertex and get the minimum
   */
  let ans = -1
  let max = Infinity
  for(let i = 0 ; i < n; i++) {
    if(distance1[i] && distance2[i]) {
      let max_local = Math.max(distance1[i], distance2[i])
      if(max_local < max) {
        max = max_local
        ans = i
      }
    }
  }
  return ans
};
// Driver code
var main = function () {
  const fn = closestMeetingNode
  const input = [
    [[2,2,3,-1], 0,1],
    [[1,2,-1], 0, 2]
  ]

  const output = [
    2,2
  ]
  /**
   *  Fill the time complexity for each function
   */

  for (var i = 0; i < input.length; i++) {
      console.log(i + 1 + ".\t Input array: \t", input[i]);
      var result = fn(...input[i]);
      console.log("\t Result is \t: ",result);
      console.log("-".repeat(100));
      assert.equal(result, output[i])
  }
}

main();