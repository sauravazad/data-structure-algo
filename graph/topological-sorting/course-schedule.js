// https://leetcode.com/problems/course-schedule/

const canFinish = function (numCourses, prerequisites) {
  const graph = Array(numCourses).fill().map(() => Array().fill([]))
  const inDegree = Array(numCourses).fill(0)

  for (const e of prerequisites) {
    graph[e[0]].push(e[1])
    inDegree[e[1]] += 1 // record the in-degree
  }

  // console.info('graph\n', graph, inDegree)
  // perform topological short as there is a dependent order
  //  Algo
  // add the nodes to the queue with in- degree = 0
  // iterate through the queue until it is empty
  // within the queue visit the nodes of the current node and decrease the in degree for every visited neighbor
  // if a neighbor's in-degree is zero add it to the queue
  const queue = []
  const topSortedList = []

  // find the nodes with in-degree = 0

  for (let i = 0; i < inDegree.length; i++) {
    if (inDegree[i] === 0) queue.push(i)
  }

  // process the queue
  while (queue.length) {
    const current = queue.shift()
    topSortedList.push(current) // push to sorted list
    for (const e of graph[current]) {
      if (--inDegree[e] === 0) { // decrement the in degree and compare to zero
        queue.push(e)
      }
    }
  }
  // console.info(topSortedList)
  return topSortedList.length === numCourses
}
// Driver code
const main = function () {
  const fn = canFinish
  const input = [
    [2, [[1, 0]]],
    [2, [[1, 0], [0, 1]]]
  ]
  /**
   *  Fill the time complexity for each function
   */

  for (let i = 0; i < input.length; i++) {
    console.log(i + 1 + '.\t Input array: \t', input[i])
    const result = fn(...input[i])
    console.log('\t Result is \t: ', result)
    console.log('-'.repeat(100))
  }
}

main()
