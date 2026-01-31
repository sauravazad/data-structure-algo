/**
https://leetcode.com/problems/course-schedule/
https://leetcode.com/problems/course-schedule-ii => topological sorting
 */

const canFinish = function (numCourses, prerequisites) {
  const visited = []
  const g = Array(numCourses).fill().map(() => Array().fill([]))

  // it is a directed graph
  for (const e of prerequisites) {
    g[e[0]].push(e[1])
  }

  const detectCycle = (source, parent) => {
    visited[source] = 1
    let ans = 0
    for (const n of g[source]) {
      if (!visited[n]) {
        ans |= detectCycle(n, source)
      } else if (visited[n] == 1) {
        return 1
      }
    }
    visited[source] = 2
    return ans
  }
  let ans = 0
  for (let i = 0; i < numCourses; i++) {
    if (!visited[i]) {
      const result = detectCycle(i, -1)
      ans |= result
    }
  }

  return ans != 1
}
// Driver code
const main = function () {
  fn = canFinish
  const input = [
    [2, [[1, 0]]],
    [2, [[1, 0], [0, 1]]]
  ]
  /**
  Input: numCourses = 2, prerequisites = [[1,0]]
  Output: true
  Explanation: There are a total of 2 courses to take.
  To take course 1 you should have finished course 0. So it is possible.

   */

  for (let i = 0; i < input.length; i++) {
    console.log(i + 1 + '.\t Input array:', input[i])
    const result = fn(...input[i])
    console.log('\t Result is', result)
    console.log('-'.repeat(100))
  }
}

main()
