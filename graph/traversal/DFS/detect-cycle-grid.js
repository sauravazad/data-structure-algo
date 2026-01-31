// https://leetcode.com/problems/detect-cycles-in-2d-grid/

const containsCycle = (grid) => {
  const r = grid.length
  const c = grid[0].length
  const visited = new Array(r).fill().map(() => new Array(c).fill(false))
  const parents = {}
  const paths = [[-1, 0], [1, 0], [0, -1], [0, 1]]
  const isValid = (i, j, val) => {
    if (i < 0 || j < 0 || i >= r || j >= c) return false
    return val == grid[i][j]
  }
  const hasCycle = (i, j, char) => {
    const stack = []
    parents[`${i}-${j}`] = [-1, -1]
    stack.push([i, j])
    visited[i][j] = true
    while (stack.length) {
      const current = stack.pop()
      const [x, y] = current

      // iterate over the paths to generate all the paths
      for (p of paths) {
        const new_x = x + p[0]
        const new_y = y + p[1]
        if (isValid(new_x, new_y, char)) {
          if (!visited[new_x][new_y]) {
            visited[new_x][new_y] = true
            parents[`${new_x}-${new_y}`] = [x, y]
            stack.push([new_x, new_y])
          } else if (parents[`${x}-${y}`][0] != new_x && parents[`${x}-${y}`][1] != new_y) {
            return true
          }
        }
      }
    }
  }

  const hasCycleRec = (i, j, char, parent) => {
    visited[i][j] = true
    parents[`${i}-${j}`] = parent
    for (const p of paths) {
      const new_x = i + p[0]
      const new_y = j + p[1]
      if (isValid(new_x, new_y, char)) {
        if (!visited[new_x][new_y]) {
          const ans = hasCycleRec(new_x, new_y, char, [i, j])
          if (ans) return true
        } else if (new_x != parent[0] && new_y != parent[1]) {
          return true
        }
      }
    }
    return false
  }
  for (let i = 0; i < r; i++) {
    for (let j = 0; j < c; j++) {
      if (!visited[i][j]) {
        const and = hasCycle(i, j, grid[i][j], [-1, -1])
        if (and) return true
      }
    }
  }
  return false
}

const main = () => {
  grid = [
    ['c', 'c', 'c', 'a'],
    ['c', 'd', 'c', 'c'],
    ['c', 'c', 'e', 'c'],
    ['f', 'c', 'c', 'c']]
  console.log('is there a cycle ? ', containsCycle(grid))

  grid = [['a', 'b', 'b'],
    ['b', 'z', 'b'],
    ['b', 'b', 'a']]
  console.log('is there a cycle ? ', containsCycle(grid))

  grid = [['b', 'b'], ['b', 'b']]
  console.log('is there a cycle ? ', containsCycle(grid))

  grid = [['a', 'a', 'a', 'a'], ['a', 'b', 'b', 'a'], ['a', 'b', 'b', 'a'], ['a', 'a', 'a', 'a']]
  console.log('is there a cycle ? ', containsCycle(grid))

  grid = [['b', 'c', 'd', 'e', 'a', 'a', 'a'], ['a', 'a', 'a', 'f', 'a', 'g', 'a'], ['a', 'h', 'a', 'a', 'a', 'i', 'a'], ['a', 'j', 'k', 'l', 'm', 'n', 'a'], ['a', 'a', 'a', 'a', 'a', 'a', 'a']]
  console.log('is there a cycle ? ', containsCycle(grid))
  console.log('is there a cycle ? ', containsCycle(['1', '1', '0', '0', '0'], ['1', '1', '0', '0', '0'], ['0', '0', '1', '0', '0'], ['0', '0', '0', '1', '1']))

  grid = [
    ['b', 'a', 'c'],
    ['c', 'a', 'c'],
    ['d', 'd', 'c'],
    ['b', 'c', 'c']]
  console.log('is there a cycle ? ', containsCycle(grid))
}

main()
