/*
https://www.interviewbit.com/blog/graph-coloring-problem/
https://www.geeksforgeeks.org/graph-coloring-applications/
*/

const colorIslands = (grid) => {
  const r = grid.length
  const c = grid[0].length
  const visited = Array(r).fill().map(() => Array(c).fill(0))
  const paths = [[0, 1], [0, -1], [1, 0], [-1, 0]]
  const isValid = (i, j, val) => {
    if (i < 0 || j < 0 || i >= r || j >= c) return false
    return (grid[i][j] == 1)
  }
  const bfs = (i, j, color) => {
    const queue = []
    queue.push([i, j])

    while (queue.length) {
      const curr = queue.shift()
      const [x, y] = curr
      visited[x][y] = 1
      colorCount[color] = (colorCount[color] || 0) + 1
      grid[x][y] = color
      for (const p of paths) {
        const x_new = x + p[0]
        const y_new = y + p[1]
        if (isValid(x_new, y_new) && !visited[x_new][y_new]) {
          queue.push([x_new, y_new])
        }
      }
    }
  }

  let color = 0
  const colorCount = {}

  for (let i = 0; i < r; i++) {
    for (let j = 0; j < c; j++) {
      if (!visited[i][j] && grid[i][j] == 1) {
        bfs(i, j, ++color)
      }
    }
  }
  return colorCount
}

const main = () => {
  const g = [
    [0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0],
    [0, 1, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 1, 0, 0, 1, 1, 0, 0, 1, 0, 1, 0, 0],
    [0, 1, 0, 0, 1, 1, 0, 0, 1, 1, 1, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0]]
  console.log(colorIslands(g))
  console.log(colorIslands([[1, 0], [0, 1]]))
}

main()
