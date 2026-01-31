/**
https://leetcode.com/problems/number-of-islands
 */

const print2DMatrix = (matrix) => {
  const length = matrix[0].length - 1
  console.info('_____'.repeat(length))
  for (let i = 0; i < matrix.length; i++) {
    console.info('| ' + matrix[i].join(' | ') + ' |')
  }
  console.info('-----'.repeat(length))
}
const numIslands = (grid) => {
  let islands = 0
  const r = grid.length
  const c = grid[0].length
  const visited = new Array(r).fill().map(() => Array(c).fill(false))
  const paths = [[1, 0], [-1, 0], [0, 1], [0, -1]]
  const isValid = (i, j) => {
    if (i < 0 || j < 0 || i >= r || j >= c) return false
    return grid[i][j] == 1
  }
  const countIsland = (i, j) => {
    let count = 0
    const queue = []
    visited[i][j] = true
    queue.push([i, j])

    while (queue.length) {
      const current = queue.shift()
      count++
      const [x, y] = current
      for (const p of paths) {
        const new_x = x + p[0]
        const new_y = y + p[1]
        if (isValid(new_x, new_y) && !visited[new_x][new_y]) {
          queue.push([new_x, new_y])
          visited[new_x][new_y] = true
        }
      }
    }
    return count
  }
  for (let i = 0; i < r; i++) {
    for (let j = 0; j < c; j++) {
      const val = grid[i][j]
      if (val == 1 && !visited[i][j]) {
        const ans = countIsland(i, j)
        if (ans) islands++
      }
    }
  }
  return islands
}

// Driver code
const main = function () {
  const fn = numIslands
  const input = [
    [
      ['1', '1', '1', '1', '0'],
      ['1', '1', '0', '1', '0'],
      ['1', '1', '0', '0', '0'],
      ['0', '0', '0', '0', '0']],
    [
      ['1', '1', '0', '0', '0'],
      ['1', '1', '0', '0', '0'],
      ['0', '0', '1', '0', '0'],
      ['0', '0', '0', '1', '1']],
    [['1', '1', '1', '1', '1', '0', '1', '1', '1', '1'], ['1', '0', '1', '0', '1', '1', '1', '1', '1', '1'], ['0', '1', '1', '1', '0', '1', '1', '1', '1', '1'], ['1', '1', '0', '1', '1', '0', '0', '0', '0', '1'], ['1', '0', '1', '0', '1', '0', '0', '1', '0', '1'], ['1', '0', '0', '1', '1', '1', '0', '1', '0', '0'], ['0', '0', '1', '0', '0', '1', '1', '1', '1', '0'], ['1', '0', '1', '1', '1', '0', '0', '1', '1', '1'], ['1', '1', '1', '1', '1', '1', '1', '1', '0', '1'], ['1', '0', '1', '1', '1', '1', '1', '1', '1', '0']]
  ]
  /**
   *  Fill the time complexity for each function
   */

  for (let i = 0; i < input.length; i++) {
    console.log(i + 1 + '.\t Input array:')
    print2DMatrix(input[i])
    const result = fn(input[i])
    console.log('\t Result is', result)
    console.log('-'.repeat(100))
  }
}

main()
