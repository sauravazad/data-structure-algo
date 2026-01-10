/**
https://leetcode.com/problems/course-schedule-ii
 */

/**
 * @param {number} numCourses
 * @param {number[][]} prerequisites
 * @return {number[]}
 */
var findOrderDFS = function(numCourses, prerequisites) {
  const visited = []
  const sortedOrder = []
  const g = Array(numCourses).fill().map(() => Array().fill([]))
  for (let e of prerequisites) {
    g[e[0]].push(e[1])
  }
  const detectCycle = (source, parent) => {
    let ans = 0
    visited[source] = 1
    for (let neighbor of g[source]) {
      if(!visited[neighbor]) {
        ans  |= detectCycle(neighbor, source)
      } else if (visited[neighbor] == 1) {
        return 1
      }
    }
    sortedOrder.push(source)
    visited[source] = 2
    return ans
  }
  let ans = 0

  for( let i = 0 ; i < numCourses; i++) {
    if(!visited[i]) {
      ans |= detectCycle(i, -1)
    }
  }
  return ans != 1 ? sortedOrder : []

};


const findOrder = (numCourses, prerequisites) => {
  const graph = Array(numCourses).fill().map(() => Array().fill([]))
  const inDegree = Array(numCourses).fill(0)
  for(let e of prerequisites) {
    graph[e[0]].push(e[1])
    inDegree[e[1]]++ // count the in-degree of the pushed node
  }
  const queue = []
  const sortedList =[]
  let qIndex = 0

  for(let i = 0 ; i < inDegree.length; i++) {
    if(inDegree[i] === 0) queue.push(i)
  }

  // process the queue
  while(qIndex < queue.length) {
    const current = queue[qIndex++]
    sortedList.push(current)
    for(let e of graph[current]) {
      if(--inDegree[e] === 0) queue.push(e)
    }
  }
  return sortedList.length === numCourses ? sortedList.reverse() : []
}
// Driver code
var main = function () {
  const fn = findOrder
  const input = [
    [2, [[1,0]]],
    [4, [[1,0],[2,0],[3,1],[3,2]]],
    [1, []],
    [3, [[0,2],[1,2],[2,0]]]
  ]
  /**
   *  Fill the time complexity for each function
   */

  for (var i = 0; i < input.length; i++) {
      console.log(i + 1 + ".\t Input array:", input[i]);
      var result = fn(...input[i]);
      console.log("\t Result is",result);
      console.log("-".repeat(100));
  }
}

main();