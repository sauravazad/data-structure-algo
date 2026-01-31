/**
https://leetcode.com/problems/shortest-cycle-in-a-graph/
 */

const detectCycleBFS = (N, edges) => {
  const graph = Array(N).fill().map(() => Array().fill([]))
  try {
    for (const e of edges) {
      graph[e[0]].push(e[1])
      graph[e[1]].push(e[0])
    }
  } catch (ex) {
    console.error(ex)
  }

  const visited = []
  const parents = []

  const findCycle = (source, parent) => {
    let counter = 1
    const queue = []
    queue.push(source)
    visited[source] = true
    parents[source] = parent
    while (queue.length > 0) {
      const current = queue.shift()
      counter++
      for (const n of graph[current]) {
        if (!visited[n]) {
          queue.push(n)
          visited[n] = true
          parents[n] = current
        } else if (n != parents[current]) { // if n is not it  parent  and we have visited the node that implies there is a cycle
          console.info(`Length of the cycle is ${counter}`)
          return true
        }
      }
    }
    return false
  }
  // iterate through all the vertex as source and call findCycle
  for (const v in graph) {
    if (!visited[v]) {
      if (findCycle(parseInt(v), -1)) {
        return true
      }
    }
  }
  return false
}

// Driver code
const main = function () {
  const fn = detectCycleBFS
  const input = [
    [7, [[0, 1], [1, 2], [2, 0], [3, 4], [4, 5], [5, 6], [6, 3]]],
    [4, [[0, 1], [0, 2]]],
    [5, [[0, 1], [0, 2], [2, 0]]]
  ]
  /**
   *  Fill the time complexity for each function
   */

  for (let i = 0; i < input.length; i++) {
    console.log(i + 1 + '.\t Input array:', input[i])
    const result = fn(...input[i])
    console.log('\t Result is', result)
    console.log('-'.repeat(100))
  }
}

main()
