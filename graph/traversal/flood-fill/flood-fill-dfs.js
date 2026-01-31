/**
https://leetcode.com/problems/flood-fill/description/
 */

const DFSHelper = (image, i, j, color) => {
  const originalColor = image[i][j]
  const stack = []
  stack.push([i, j])
  visited[i][j] = true

  while (stack.length) {
    const current = stack.pop()
    const [x, y] = current
    image[x][y] = color
    // iterate through the paths and look for neighbors
    for (const p of paths) {
      const new_x = x + p[0]
      const new_y = y + p[1]
      if (isValid(new_x, new_y, originalColor) && !visited[new_x][new_y]) {
        // console.info('In here', new_x, new_y)

        visited[new_x][new_y] = true
        stack.push([new_x, new_y])
      }
    }
  }
}

const floodFill = function (image, row, col, color) {
  const r = image.length
  const c = col.length
  const visited = Array(r).fill().map(() => Array(c).fill(false))
  const paths = [
    [1, 0],
    [-1, 0],
    [0, 1],
    [0, -1]
  ]
  const isValid = (x, y, color) => {
    if (x < 0 || y < 0 || x >= r || y >= c) return false
    return (image[x][y] == color)
  }

  const DFSHelperRec = (image, row, col, color, visited, actualColor) => {
    if (isValid(row, col, actualColor) && !visited[row][col]) {
      visited[row][col] = true
      image[row][col] = color
      DFSHelperRec(image, row + 1, col + 0, color, visited, actualColor)
      DFSHelperRec(image, row - 1, col + 0, color, visited, actualColor)
      DFSHelperRec(image, row + 0, col + 1, color, visited, actualColor)
      DFSHelperRec(image, row + 0, col - 1, color, visited, actualColor)
    }
  }

  // console.info('calling DFS with param', row, col, color)
  // DFSHelper(image,row, col, color)
  const actualColor = image[row][col]
  DFSHelperRec(image, row, col, color, visited, actualColor)
  return image
}
// Driver code
const main = function () {
  const fn = floodFill
  const input = [
    [[[1, 1, 1], [1, 1, 0], [1, 0, 1]], 1, 1, 2],
    [[[0, 0, 0], [0, 0, 0]], 0, 0, 0]
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
