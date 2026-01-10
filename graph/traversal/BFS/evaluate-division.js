/**
https://leetcode.com/problems/evaluate-division/
 */

const print2DMatrix = (matrix) => {
  const length = matrix[0].length -1
  console.info('_____'.repeat(length))
  for(let i = 0; i < matrix.length; i++) {
    console.info('| ' +matrix[i].join(" | ") + ' |')
  }
  console.info('-----'.repeat(length))
}
/**
 * @param {string[][]} equations
 * @param {number[]} values
 * @param {string[][]} queries
 * @return {number[]}
 */

var calcEquation = function(equations, values, queries) {
  // console.info(`
  //   \n equations: ${equations},
  //   \n values: ${values},
  //   \n queries: ${queries},
  // `)
  const graph = {}
  for(let i = 0; i < equations.length; i++) {
    const equation = equations[i]
    // console.info(equation)
    const value = values[i]
    graph[equation[0]] = graph[equation[0]] || []
    graph[equation[1]] = graph[equation[1]] || []
    graph[equation[0]].push([equation[1], value])
    graph[equation[1]].push([equation[0], 1/value])
  }
  // console.info('graph \n ', graph)

  const bfs = (source, dest) => {
    const visited = {}
    const q = []
    // const graph[source][1]
    q.push([source, 1])
    while(q.length) {
      const [node, value] = q.shift()
      visited[node] = true
      if(node == dest) return value
      // if node exists
      if(graph[node]) {
        for (let neigh of graph[node]) {
          const [_node, _value] = neigh
          if(!visited[_node]) {
            // console.info('_node', value * _value)
            q.push([_node, value * _value])
          }
        }
      }
    }
    return -1
  }

  // process the query
  const ans = []
  for(let q = 0; q < queries.length ; q++) {
    const query = queries[q]
    let result = -1
    if(graph[query[0]] && graph[query[1]]) {
      result = bfs(query[0], query[1])
    }
    ans.push(result)
  }
  return ans
};
// Driver code
var main = function () {
  const fn = calcEquation
  const input = [
    [
      [["a","b"],["b","c"]],
      [2.0,3.0],
      [["a","c"],["b","a"],["a","e"],["a","a"],["x","x"]]
    ],
    [
      [["a","b"],["b","c"],["bc","cd"]],
      [1.5,2.5,5.0],
      [["a","c"],["c","b"],["bc","cd"],["cd","bc"]]
    ],
    [
      [["a","b"]],
      [0.5],
      [["a","b"],["b","a"],["a","c"],["x","y"]]
    ]
  ]
  /**
   *  Fill the time complexity for each function
   */

  for (var i = 0; i < input.length; i++) {
      console.log(i + 1 + ".\t Input array: \t", input[i]);
      var result = fn(...input[i]);
      console.log("\t Result is \t: ",result);
      console.log("-".repeat(100),  "\n");
  }
}

main();