const createGraphUndirected = (N, edges, isDirected = false) => {
  const graph = {}
  for (const e of edges) {
    graph[e[0]] ? graph[e[0]].add(e[1]) : graph[e[0]] = new Set([e[1]])
    if (!isDirected) {
      graph[e[1]] ? graph[e[1]].add(e[0]) : graph[e[1]] = new Set([e[0]])
    }
  }
  return graph
}

const bfs = (N, edges, startVertex) => {
  const graph = createGraphUndirected(N, edges)
  const queue = []
  const depth = new Map()
  const parent = new Map()
  const visited = new Map()
  const start = startVertex ?? 0
  let index = 0
  visited.set(start, true)
  depth.set(start, 0) // root has depth of 0
  parent.set(start, -1) // set parent of root to -1
  queue.push(index)
  while (queue[index] !== undefined) {
    const v = queue[index]
    for (const neighbors of graph[v]) {
      if (!visited.has(neighbors)) {
        queue.push(neighbors)
        visited.set(neighbors, true)
        depth.set(neighbors, depth.get(v) + 1)
        parent.set(neighbors, v)
      }
    }
    index++
  }
  console.info(visited.keys())
  const printPathFromSource = (v) => {
    if (!visited.has(v)) {
      console.error('No Path!!')
    }
    const path = []
    for (let u = v; u !== -1; u = parent.get(u)) {
      path.push(u)
    }
    console.info(`Path from source ${start} to vertex ${v} :=> \t`, path.reverse())
  }
  for (const v of visited.keys()) {
    printPathFromSource(v)
  }
}

// Driver code
const main = function () {
  const fn = bfs
  const input = [
    [4, [[0, 1], [0, 2], [1, 2], [2, 3], [3, 3]]]
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
