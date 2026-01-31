/**
  https://leetcode.com/problems/find-center-of-star-graph/
 */

const createGraph = (edges, size) => {
  const graph = {}
  let maxDegreeNode = 0
  for (e of edges) {
    graph[e[0]]?.length ? graph[e[0]].push(e[1]) : graph[e[0]] = [e[1]]
    graph[e[1]]?.length ? graph[e[1]].push(e[0]) : graph[e[1]] = [e[0]]
    if (graph[e[1]].length > graph[e[0]].length) maxDegreeNode = e[1]
    else maxDegreeNode = e[0]
  }
  return { graph, maxDegreeNode }
}

const findCenter = (edges) => {
  const { maxDegreeNode } = createGraph(edges)
  return maxDegreeNode
}

// Driver code
const main = function () {
  const fn = findCenter
  const input = [
    [[1, 2], [2, 3], [4, 2]],
    [[1, 2], [5, 1], [1, 3], [1, 4]]
  ]
  /**
   *  Fill the time complexity for each function
   */

  for (let i = 0; i < input.length; i++) {
    console.log(i + 1 + '.\t Input array:', input[i])
    const result = fn(input[i])
    console.log('\t Result is', result)
    console.log('-'.repeat(100))
  }
}

main()
