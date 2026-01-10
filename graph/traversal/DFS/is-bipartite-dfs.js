const isBipartite  = (graph) => {
  const visited = new Map()
  const colorMap = []

  const isBipartiteChecker = (source, parent, color) => {
    visited.set(source, true)
    colorMap[source] = color
    for(let neigh of graph[source] ?? []) {
      // if not visited fill with alternate color
      if(!visited.has(neigh)) {
        const ans = isBipartiteChecker(neigh, source, 1-color)
        if(!ans) return false
      } else if (parent !== neigh && color === colorMap[neigh]) {
        return false
      }
    }
    return false
  }
  let ans = true
  for (let v in graph) {
    if(!visited[v]) {
      ans &=isBipartiteChecker(v, -1, 1)
    }
  }
  return true
}


// Driver code
var main = function () {
  const fn = isBipartite
  const input = [
    [[1, 2, 3], [0, 2], [0, 1, 3], [0, 2]]
  ]
  /**
   *  Fill the time complexity for each function
   */

  for (var i = 0; i < input.length; i++) {
      console.log(i + 1 + ".\t Input array: \t", input[i]);
      var result = fn(input[i]);
      console.log("\t Result is \t: ",result);
      console.log("-".repeat(100));
  }
}

main();