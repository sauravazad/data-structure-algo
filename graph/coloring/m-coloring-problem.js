/**
https://practice.geeksforgeeks.org/problems/m-coloring-problem-1587115620/1

https://www.geeksforgeeks.org/m-coloring-problem/
Given an undirected graph and an integer M. The task is to determine if the graph can be colored with at most M colors
such that no two adjacent vertices of the graph are colored with the same color.
Here coloring of a graph means the assignment of colors to all vertices. Print 1 if it is possible to color vertices and 0 otherwise.
 */

const isSafe = (i, j, graph, V, color) => {
  // check if we can assign color j to node i
  // no neighbor should have the same color
  for(let k = 0; k < V; k++) {
    if(graph[i][k] == 1 && color[k] == j) return false
  }
  return true
}

const fillColorUtility = (graph, m, color, V, i) => {
  // console.info(`fillColorUtility => m: ${m} Vertexes : ${V}, index: ${i}`, `color: ${color}`)
  if(i == V) return true
  for(let j = 0; j < m; j++) {
    if(isSafe(i, j, graph, V, color)) {
      color[i] = j
      if(fillColorUtility(graph, m, color, V, i+1)) {
        return true
      } else  {
        // reset the color if it was wrong
        color[i] = -1
      }

    }
  }
  return false
}
const graphColoring = (m, grid) => {
  const V = grid.length
  const color = Array(V).fill(-1)
  return fillColorUtility(grid, m, color, V, 0)
}

// Driver code
var main = function () {
  const fn = graphColoring
  const input = [
    [3, [[ 0, 1, 1, 1 ],[ 1, 0, 1, 0 ],[ 1, 1, 0, 1 ],[ 1, 0, 1, 0 ]] ], // true
    [3, [[ 1, 1, 1, 1 ],[ 1, 1, 1, 1 ],[ 1, 1, 1, 1 ],[ 1, 1, 1, 1 ]] ] // false
  ]
  /**
   *  Fill the time complexity for each function

  Time Complexity: O(m^V). There is a total of O(mV) combinations of colors. The upper bound time complexity remains the same but the average time taken will be less.
  Auxiliary Space: O(V). The recursive Stack of the graph coloring function will require O(V) space.
   */

  for (var i = 0; i < input.length; i++) {
      console.log(i + 1 + ".\t Input array:", input[i]);
      var result = fn(...input[i]);
      console.log("\t Result is",result);
      console.log("-".repeat(100));
  }
}

main();