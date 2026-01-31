// https://leetcode.com/problems/minimum-score-of-a-path-between-two-cities

const createGraph = (edges, n) => {
  const g = Array(n + 1).fill().map(() => Array().fill())
  for (const e of edges) {
    g[e[0]].push([e[1], e[2]])
    g[e[1]].push([e[0], e[2]])
  }
  return g
}

const minScore = function (n, roads) {
  const graph = createGraph(roads, n)
  let cost = Infinity
  const visited = {}
  const DFS = (current) => {
    visited[current] = true
    for (const neigh of graph[current]) {
      const [n, w] = neigh
      cost = Math.min(cost, w)
      if (!visited[n]) {
        DFS(n)
        visited[n] = true
      }
    }
  }

  DFS(1)
  return cost
}

// Driver code
const main = function () {
  const fn = minScore
  const input = [
    [4, [[1, 2, 9], [2, 3, 6], [2, 4, 5], [1, 4, 7]]],
    [4, [[1, 2, 2], [1, 3, 4], [3, 4, 7]]]
  ]
  /**
   *  Fill the time complexity for each function
   */

  for (let i = 0; i < input.length; i++) {
    console.log(i + 1 + '.\t Input array: \t', input[i])
    const result = fn(...input[i])
    console.log('\t Result is \t: ', result)
    console.log('-'.repeat(100))
  }
}

main()
