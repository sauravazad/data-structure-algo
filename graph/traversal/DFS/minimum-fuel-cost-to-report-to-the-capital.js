// https://leetcode.com/problems/minimum-fuel-cost-to-report-to-the-capital/


var minimumFuelCost = function(roads, seats) {

  const graph = {}

  for( let road of roads) {
    graph[road[0]] ??=  []
    graph[road[1]] ??=  []
    graph[road[0]].push(road[1])
    graph[road[1]].push(road[0])
  }

  let res = 0

  const DFS = (node, parent) => {
    let passengers  = 0

    for( let child of graph[node] ?? []) {
      if (child !== parent) {
        const p = DFS(child, node)
        passengers += p
        res += Math.ceil(p / seats)
      }
    }
    return passengers + 1
  }
  DFS(0, -1)
  return res
};
// Driver code
var main = function () {
  const fn = minimumFuelCost
  const input = [
    [[[0,1],[0,2],[0,3]], 5],
    [[[3,1],[3,2],[1,0],[0,4],[0,5],[4,6]], 2],
    [[], 1]
  ]
  /**
   *  Fill the time complexity for each function
   */

  for (var i = 0; i < input.length; i++) {
      console.log(i + 1 + ".\t Input array: \t", input[i]);
      var result = fn(...input[i]);
      console.log("\t Result is \t: ",result);
      console.log("-".repeat(100));
  }
}

main();