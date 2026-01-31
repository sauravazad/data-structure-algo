/**
https://leetcode.com/problems/shortest-cycle-in-a-graph/
 */

const createGraph = (N, edges, isDirected) => {
  const graph = Array(N).fill().map(() => Array().fill([]))
  for (const e of edges) {
    graph[e[0]].push(e[1])
    if (!isDirected) {
      graph[e[1]].push(e[0])
    }
  }
  return graph
}

const findShortestCycle = (N, edges) => {
  const graph = createGraph(N, edges)
  const parents = []
  let visited = []
  let shortest = Infinity

  const findCycle = (source, parent) => {
    const distance = []
    const queue = []
    queue.push(source)
    parents[source] = parent
    distance[source] = 0
    visited[source] = true

    while (queue.length > 0) {
      const current = queue.shift()
      for (const n of graph[current]) {
        if (!visited[n]) {
          queue.push(n)
          visited[n] = true
          parents[n] = current
          distance[n] = distance[current] + 1
        } else if (n != parents[current] && current != parents[n]) {
          // calculate the distance from the source
          shortest = Math.min(shortest, distance[n] + distance[current] + 1)
        }
      }
    }
  }

  for (const v in graph) {
    // clear the last visited
    visited = []
    findCycle(parseInt(v), -1)
  }
  if (shortest === Infinity) shortest = -1
  return shortest
}

// Driver code
const main = function () {
  const fn = findShortestCycle
  const input = [
    [7, [[0, 1], [1, 2], [2, 0], [3, 4], [4, 5], [5, 6], [6, 3]]],
    [4, [[0, 1], [0, 2]]],
    [8, [[1, 3], [3, 5], [5, 7], [7, 1], [0, 2], [2, 4], [4, 0], [6, 0], [6, 1]]],
    [4, [[1, 2], [0, 1], [3, 2], [1, 3]]]
  ]
  /**
   *  Fill the time complexity for each function
   */

  for (let i = 0; i < input.length; i++) {
    console.log(i + 1 + '.\t Input array:', input[i])
    const result = fn(...input[i])
    console.log('\t Graph  has cycle of length', result)
    console.log('-'.repeat(100))
  }
}

main()
