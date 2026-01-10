/**
https://leetcode.com/problems/flower-planting-with-no-adjacent/
 */

const isValid = (graph, colorsArray, source, color) => {
  if(!graph[source]) return false
  for(let neigh of graph[source]) {
    if (colorsArray[neigh] &&  colorsArray[neigh] == color) return false
  }
  return true
}

const colorUtility = (graph, colors, colorsArray, V, source) => {
  // console.info(`Source ${source}`, colorsArray)
  if(source == V) {
    return true // ie we have covered all the edges
  }
  // iterate over the neighbor of source and check if it is ok to fill a color
  for(let c=1; c <= colors; c++) {
    if(isValid(graph, colorsArray, source, c)) {
      colorsArray[source] = c
      // console.info(`Filling Source ${source} with color`, c)
      if(colorUtility(graph, colors, colorsArray, V, source + 1)){
        return true
      } else {
        // console.info(`reverting Source ${source} with color`, c)
        colorsArray[source] = -1 // revert the color if it fails
      }
    }
  }

}

/**
 * @param {number} n
 * @param {number[][]} paths
 * @return {number[]}
 */
var gardenNoAdj = function(n, paths) {
  const g = Array(n + 1).fill().map(() => Array().fill([]))
  for(let e of paths) {
    g[e[0]].push(e[1])
    g[e[1]].push(e[0])
  }
  // console.info('Graph is ', g)
  const colors = 4 // there are only 4 colors
  const colorsArray = Array(n+1).fill(-1)
  const result = colorUtility(g, colors, colorsArray, n + 1, 1) // start from 1 as gardens are labelled from 1
  // console.info(`Color array is `, colorsArray)
  colorsArray.shift()
  return colorsArray
};
// Driver code
var main = function () {
  fn = gardenNoAdj
  const input = [
    [3, [[1,2],[2,3],[3,1]]],
    [4, [[1,2],[3,4]]],
    [4, [[1,2],[2,3],[3,4],[4,1],[1,3],[2,4]]]
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