const assert = require('node:assert')
// https://leetcode.com/problems/swim-in-rising-water/

/**
 * @param {number[][]} grid
 * @return {number}
 */
const swimInWater = function (grid) {
  const rows = grid.length
  const cols = grid[0].length
  let visited = Array(rows).fill().map(() => Array(cols).fill(0))
  const paths = [
    [0, 1],
    [0, -1],
    [1, 0],
    [-1, 0]
  ]
  const isValid = (x, y) => {
    if (x < 0 || y < 0 || x >= rows || y >= cols) return false
    return true
  }
  const bfsHelper = (_x, _y, time) => {
    const queue = []
    let qIndex = 0
    if (grid[_x][_y] <= time) {
      queue.push([_x, _y])
    }

    while (qIndex < queue.length) {
      const [x, y] = queue[qIndex++]
      if (!visited[x][y]) {
        visited[x][y] = 1
        for (const p of paths) {
          const new_x = x + p[0]
          const new_y = y + p[1]
          if (isValid(new_x, new_y)) {
            if (grid[new_x][new_y] <= time) queue.push([new_x, new_y])
          }
        }
      }
    }
  }

  let l = 0; let r = 50 * 50
  while (l < r) {
    // reset the visited Matrix
    visited = Array(rows).fill().map(() => Array(cols).fill(0))
    const mid = Math.floor((l + r) / 2)
    bfsHelper(0, 0, mid)
    if (visited[rows - 1][cols - 1] === 1) {
      r = mid
    } else l = mid + 1
  }
  return l
}
const main = function () {
  const fn = swimInWater
  const input = [
    [[3, 2], [0, 1]],
    [[0, 2], [1, 3]],
    [[0, 1, 2, 3, 4], [24, 23, 22, 21, 5], [12, 13, 14, 15, 16], [11, 17, 18, 19, 20], [10, 9, 8, 7, 6]]
  ]
  const output = [
    3, 3, 16
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
