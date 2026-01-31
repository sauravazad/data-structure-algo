// https://leetcode.com/problems/max-area-of-island

const maxAreaOfIsland = (grid) => {
  const r = grid.length
  const c = grid[0].length
  const visited = new Array(r).fill().map(() => Array(c).fill(false))
  let maxArea = 0
  const paths = [[0, 1], [0, -1], [1, 0], [-1, 0]]
  const isValid = (i, j, val) => {
    if (i < 0 || j < 0 || i >= r || j >= c) return false
    return grid[i][j] === 1
  }
  const getArea = (i, j, char) => {
    let area = 0
    const stack = []
    visited[i][j] = true
    stack.push([i, j])
    while (stack.length) {
      const curr = stack.pop()
      const [x, y] = curr
      area++
      for (const p of paths) {
        const new_x = x + p[0]
        const new_y = y + p[1]
        if (isValid(new_x, new_y, char) && !visited[new_x][new_y]) {
          stack.push([new_x, new_y])
          visited[new_x][new_y] = true
        }
      }
    }
    return area
  }

  for (let i = 0; i < r; i++) {
    for (let j = 0; j < c; j++) {
      const char = grid[i][j]
      if (char == 0) continue
      if (!visited[i][j] && char === 1) {
        const area = getArea(i, j, char)
        console.info(i, j, '-->>', area)
        maxArea = Math.max(maxArea, area)
      }
    }
  }
  return maxArea
}

const main = () => {
  const g = [[0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0], [0, 1, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0], [0, 1, 0, 0, 1, 1, 0, 0, 1, 0, 1, 0, 0], [0, 1, 0, 0, 1, 1, 0, 0, 1, 1, 1, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0], [0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0]]
  console.log(maxAreaOfIsland(g)) // 6
  console.log(maxAreaOfIsland([[0, 0, 0, 0, 0, 0, 0, 0]])) // 0
}

main()
