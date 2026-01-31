/**
 * https://www.educative.io/answers/what-is-a-bipartite-graph
https://leetcode.com/problems/possible-bipartition
 */
const possibleBipartition = (v, edges) => {
  const g = Array(v + 1).fill().map(() => Array().fill([]))

  for (const e of edges) {
    g[e[0]].push(e[1])
    g[e[1]].push(e[0])
  }
  const color = Array(v + 1).fill(-1) // node may start from 0 or 1

  const isBipartite = (source, c) => {
    const queue = []
    queue.push(source)
    // Assign first color to source
    color[source] = c
    while (queue.length) {
      const current = queue.shift()
      for (const neighbor of g[current]) {
        // if not colored fill alternate color
        if (color[neighbor] == -1) {
          color[neighbor] = 1 - color[current]
          queue.push(neighbor)
        } else if (color[neighbor] === color[current]) {
          return false
        }
      }
    }
    // console.log('color', color)
    return true
  }

  // iterate over the graph and call isBipartite if color is not allocated
  for (let i = 0; i <= v; i++) {
    if (color[i] == -1) {
      if (isBipartite(i, 0) === false) return false
    }
  }
  return true
}

const main = () => {
  const v = 4
  const edges = [[0, 1], [1, 2], [0, 3], [2, 3]]

  console.log('Is Bipartite Graph ? ', possibleBipartition(v, edges))

  console.log('Is Bipartite Graph ? ', possibleBipartition(3, [[1, 2], [1, 3], [2, 3]]))
}

main()
