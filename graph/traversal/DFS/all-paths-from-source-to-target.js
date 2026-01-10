// Driver code

const  allPathsSourceTarget = function(graph) {
  const DFS = (source, dest) => {
    let result = []
    const stack = []
    stack.push([source, [source]])
    while(stack.length) {
      const [current, path] = stack.pop()
      if(current === dest)  {
        result.push([...path])
      }
      // visit its neighbor if they exist

      for(let neigh of graph[current] ?? []) {
        // don't need visited as it is guaranteed to be a directed acyclic graph
          const currentPath = [...path]
          currentPath.push(neigh)
          stack.push([neigh, currentPath])
      }
    }
    return result
  }
  const result = DFS(0, graph.length -1)
  return result
};
var main = function () {
  const fn = allPathsSourceTarget
  const input = [
    [[1,2],[3],[3],[]],
    [[4,3,1],[3,2,4],[3],[4],[]]
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