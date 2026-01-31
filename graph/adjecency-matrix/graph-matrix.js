class Graph {
  constructor (size) {
    this.vertices = [...Array(size)].map(() => new Array(size).fill(0))
    this.maxDegree = 0
  }

  addEdge (v1, v2) {
    this.vertices[v1][v2] = 1
    this.vertices[v2][v1] = 1
  }

  removeEdge (v1, v2) {
    this.vertices[v1][v2] = 0
    this.vertices[v2][v1] = 0
  }
}

const insertInGraph = (size, edges) => {
  const g = new Graph(size)
  for (e of edges) {
    g.addEdge(...e)
  }
  // console.info(g.vertices)
}

// Driver code
const main = function () {
  const fn = insertInGraph
  const input = [
    5
  ]
  const edges = [
    [[0, 1], [0, 2], [1, 2], [2, 0], [2, 3]]
  ]
  /**
   *  Fill the time complexity for each function
   */

  for (let i = 0; i < input.length; i++) {
    console.log(i + 1 + '.\t Input array:', input[i])
    const result = fn(input[i], edges[i])
    console.log('\t Result is', result)
    console.log('-'.repeat(100))
  }
}

main()
