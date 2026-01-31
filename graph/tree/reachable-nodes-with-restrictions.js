/**
https://leetcode.com/problems/reachable-nodes-with-restrictions/
 */

const assert = require('node:assert')

/**
 * @param {number} n
 * @param {number[][]} edges
 * @param {number[]} restricted
 * @return {number}
 */
const reachableNodes = function (n, edges, restricted) {
  const graph = Array(n).fill().map(() => [])
  const visited = new Map()
  let count = 0
  const set = (i) => {
    visited.set(i, true)
  }
  const has = (i) => {
    return visited.get(i)
  }
  for (const e of edges) {
    graph[e[0]].push(e[1])
    graph[e[1]].push(e[0])
  }
  // console.info(`Graph\n`, graph)
  // mark the restricted node as visited
  for (const r of restricted) {
    set(r)
  }

  const bfsHelper = (source) => {
    const q = []
    let qIndex = 0
    q.push(source)
    while (qIndex < q.length) {
      const current = q[qIndex++] // post increment the counter
      // console.info(`Processing Node ${current}`)
      if (!has(current)) count++
      set(current) // mark visited
      for (const neigh of graph[current]) {
        if (!has(neigh)) {
          // console.info(`Processing Node's neighbor  ${neigh}`)
          q.push(neigh) // enqueue
        }
      }
    }
  }
  const source = 0
  bfsHelper(source)
  // console.info( visited)
  return count
}
// Driver code
const main = function () {
  const fn = reachableNodes
  const input = [
    [7, [[0, 1], [1, 2], [3, 1], [4, 0], [0, 5], [5, 6]], [4, 5]],
    [7, [[0, 1], [0, 2], [0, 5], [0, 4], [3, 2], [6, 5]], [4, 2, 1]]
  ]
  const output = [
    4, 3
  ]
  /**
   *  Fill the time complexity for each function
   */

  for (let i = 0; i < input.length; i++) {
    console.log(i + 1 + '.\t Input array: \t', input[i])
    const result = fn(...input[i])
    console.log('\t Result is \t: ', result)
    console.log('-'.repeat(100))
    assert.equal(result, output[i], `Incorrect answer, expected ${output[i]}`)
  }
}

main()
