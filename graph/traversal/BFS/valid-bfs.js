// https://codeforces.com/problemset/problem/1037/D
// https://www.codingninjas.com/studio/library/check-if-the-given-permutation-is-a-valid-bfs-of-a-given-tree
const createGraph = (N, edges, isDirected) => {
  // N + 1 because te nodes start from 1 rather than zero
  const g = Array(N + 1).fill().map(() => Array().fill([]))
  for (const e of edges) {
    g[e[0]].push(e[1])
    g[e[1]].push(e[0])
  }
  return g
}

/**
@Explanation
  Let us assume that a node has two children, 1 and 2. We can visit either of them first.
  Suppose we visit 1 first, now we'll push the children of 1 to the front of the queue, and we can’t visit the children of 2 before the children of 1.
  eg: let edges = [[1, 2], [1, 3], [2, 4], [3,5]]
    BFS 12345 or 13254
    12345 -> 2 is visited first so its children will always be visited before 3's children
    12345 -> 3 is visited first so its children will always be visited before 2's children

  Approach:
  - traverse the given sequence
  - get the child of the current node and push it in an child = Array[]
  - check if the current element is on top of the queue , if not then return false
  - mark the node as visited
  - append the child to the queue
*/

const validBfs = (N, edges, bfsOrder) => {
  const g = createGraph(N, edges)
  let index = 0
  const queue = []
  const visited = []
  const set = [bfsOrder[0]]
  // push the first node
  queue.push(set)
  // :NOTE : the queue element represent nodes for the level. ie: it will have all the nodes present on the same level
  while (queue.length > 0 && index < N) {
    const current = bfsOrder[index]
    // if the node has already been visited return false
    if (visited[current]) return false
    visited[current] = 1

    // if all the elements of a level are visited, pop it out of the queue
    if (queue[0].length === 0) queue.shift()

    // the current should be at the top of the queue & within the set
    const position = queue[0].indexOf(current)
    if (position < 0) {
      return false
    }
    const level = []
    for (const n of g[current]) {
      if (!visited[n]) level.push(n)
    }
    if (level.length) queue.push(level)
    // remove the current element from the queue
    queue[0].splice(position, 1)
    // increment the index
    index++
  }
  return true
}

const main = () => {
  let v = 4
  let edges = [[1, 2], [1, 3], [2, 4]]
  let order = [1, 2, 3, 4]

  console.log('Is BFS Valid ? ', validBfs(v, edges, order))

  v = 4
  edges = [[1, 2], [1, 3], [2, 4]]
  order = [1, 2, 4, 3]

  console.log('Is BFS Valid ? ', validBfs(v, edges, order))

  v = 5
  edges = [[1, 2], [1, 3], [2, 4], [3, 5]]
  order = [1, 2, 3, 5, 4]

  console.log('Is BFS Valid ? ', validBfs(v, edges, order))
}

main()
