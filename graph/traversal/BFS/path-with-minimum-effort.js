const assert = require('node:assert')
// https://leetcode.com/problems/path-with-minimum-effort/

/**
 * @param {number[][]} heights
 * @return {number}
 */
const minimumEffortPath = function (heights) {
  const rows = heights.length
  const cols = heights[0].length
  let visited = Array(rows).fill().map(() => Array(cols).fill(0))
  const paths = [
    [1, 0],
    [-1, 0],
    [0, 1],
    [0, -1]
  ]
  const isValid = (x, y) => {
    if (x < 0 || y < 0 || x > rows - 1 || y > cols - 1) return false
    return true
  }

  const getEffort = (source, destination) => {
    const effort = Math.abs(heights[source[0]][source[1]] - heights[destination[0]][destination[1]])
    return effort
  }

  bfsHelper = (_x, _y, mid) => {
    const queue = []
    let qIndex = 0
    queue.push([_x, _y])
    while (qIndex < queue.length) {
      const [x, y] = queue[qIndex++]
      if (!visited[x][y]) {
        visited[x][y] = 1
        for (const p of paths) {
          const new_x = x + p[0]
          const new_y = y + p[1]
          if (isValid(new_x, new_y)) {
            if (getEffort([x, y], [new_x, new_y]) <= mid) {
              queue.push([new_x, new_y])
            }
          }
        }
      }
    }
  }

  let l = 0; let r = Number.MAX_SAFE_INTEGER
  // binary search if a path exist between the points for a given mid and adjust the left or right bound accordingly
  // [TODO:] Solve using Dijkstra's Algorithm
  while (l < r) {
    visited = Array(rows).fill().map(() => Array(cols).fill(0))
    mid = Math.floor((l + r) / 2)
    bfsHelper(0, 0, mid)
    if (visited[rows - 1][cols - 1] === 1) {
      r = mid
    } else l = mid + 1
  }
  return l
}
// Driver code
const main = function () {
  const fn = minimumEffortPath
  const input = [
    [[1, 1, 1, 1], [1, 1, 1, 1]],
    [[1, 10, 6, 7, 9, 10, 4, 9]],
    [[1, 2, 2], [3, 8, 2], [5, 3, 5]],
    [[1, 2, 3], [3, 8, 4], [5, 3, 5]],
    [
      [1, 2, 1, 1, 1],
      [1, 2, 1, 2, 1],
      [1, 2, 1, 2, 1],
      [1, 2, 1, 2, 1],
      [1, 1, 1, 2, 1]]
  ]
  const output = [
    0, 9, 2, 1, 0
  ]
  /**
   *  Fill the time complexity for each function
   */

  for (let i = 0; i < input.length; i++) {
    console.log(i + 1 + '.\t Input array: \t', input[i])
    const result = fn(input[i])
    console.log('\t Result is \t: ', result)
    console.log('-'.repeat(100))
    assert.equal(result, output[i])
  }
}

main()
