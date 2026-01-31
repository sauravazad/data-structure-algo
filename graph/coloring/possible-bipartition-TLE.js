// vertex coloring => use backtracking

/**
 * https://leetcode.com/problems/possible-bipartition/description/
Given an undirected graph and an integer M. The task is to determine if the graph can be colored with at most M colors
such that no two adjacent vertices of the graph are colored with the same color.
Here coloring of a graph means the assignment of colors to all vertices. Print 1 if it is possible to color vertices and 0 otherwise.

*/
const print2DMatrix = (matrix) => {
  const length = matrix[0].length - 1
  console.info('_____'.repeat(length))
  for (let i = 0; i < matrix.length; i++) {
    console.info('| ' + matrix[i].join(' | ') + ' |')
  }
  console.info('-----'.repeat(length))
}
const isValid = (i, j, graph, V, color) => {
  // check if we can assign color j to node i
  // no neighbor should have the same color
  for (let k = 0; k < V; k++) {
    if (graph[i][k] != 0 && color[k] == j) return false
  }
  return true
}

const fillColor = (graph, m, color, V, i) => {
  if (i == V) return true
  // iterate over the color count to fill the nodes recursively
  for (let c = 0; c < m; c++) {
    if (isValid(i, c, graph, V, color)) {
      color[i] = c
      // console.info(`Node ${i}, Color: ${c}`, color)
      if (fillColor(graph, m, color, V, i + 1)) {
        return true
      } else {
        // if we could not allocate the color to the node reset it
        color[i] = -1
        // console.info(`Back tracking : Node ${i}, Color: ${c}`, color)
      }
    }
  }
  return false
}

function possibleBipartition (n, dislikes) {
  const color = Array(n + 1).fill(-1)
  const m = 2
  const g = Array(n + 1).fill().map(() => Array(n).fill(0))
  for (const e of dislikes) {
    g[e[0]][e[1]] = 1
    g[e[1]][e[0]] = 1
  }
  // print2DMatrix(g)
  const result = fillColor(g, m, color, n + 1, 0)
  console.log(color)
  return result
}
// Driver code
const main = function () {
  const fn = possibleBipartition
  const input = [
    [4, [[1, 2], [1, 3], [2, 4]]],
    [3, [[1, 2], [1, 3], [2, 3]]]
  ]
  /**
   *  Fill the time complexity for each function
   * will TLE
   */

  for (let i = 0; i < input.length; i++) {
    console.log(i + 1 + '.\t Input array:', input[i])
    const result = fn(...input[i])
    console.log('\t Result is', result)
    console.log('-'.repeat(100))
  }
}

main()
