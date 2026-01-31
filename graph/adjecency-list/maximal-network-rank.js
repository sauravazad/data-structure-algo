/**
https://leetcode.com/problems/maximal-network-rank/
 */
const maximalNetworkRank = (N, roads) => {
  const graph = [...new Array(N)].map(() => [])
  for (const road of roads) {
    graph[road[1]].push(road[0])
    graph[road[0]].push(road[1])
  }
  // debug vertex degree
  for (const [vertex, edges] of Object.entries(graph)) {
    console.info(`Degree of vertex ${vertex}: ${edges.length}`)
  }
  let maxRank = 0
  for (let c1 = 0; c1 < N; c1++) {
    for (let c2 = 0; c2 < N; c2++) {
    // if there is a path between the vertices the -
      if (c1 !== c2) {
        const degreeCity1 = graph[c1].length
        const degreeCity2 = graph[c2].length
        let rank = degreeCity1 + degreeCity2
        if (graph[c1].indexOf(c2) !== -1) {
          rank -= 1 // -1 because there is a path between the vertex , it will be counted twice
        }
        maxRank = Math.max(maxRank, rank)
      }
    }
  }
  return maxRank
}

// Driver code
const main = function () {
  const fn = maximalNetworkRank
  const input = [
    [4, [[0, 1], [0, 3], [1, 2], [1, 3]]],
    [5, [[0, 1], [0, 3], [1, 2], [1, 3], [2, 3], [2, 4]]],
    [8, [[0, 1], [1, 2], [2, 3], [2, 4], [5, 6], [5, 7]]]
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
