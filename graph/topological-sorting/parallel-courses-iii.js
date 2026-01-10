// https://leetcode.com/problems/parallel-courses-iii/

var minimumTime = function(n, relations, time) {
  const g = Array(n).fill().map(() => Array().fill([]))
  for (let e of relations) {
    g[e[0] - 1].push(e[1] - 1)
  }
  console.info("Graph is \n", g)

};

// Driver code
var main = function () {
  const fn = minimumTime
  const input = [
    [3, [[1,3],[2,3]], [3,2,5]],
    [5, [[1,5],[2,5],[3,5],[3,4],[4,5]], [1,2,3,4,5]]
  ]
  /**
   *  Fill the time complexity for each function
   */

  for (var i = 0; i < input.length; i++) {
      console.log(i + 1 + ".\t Input array: \t", input[i]);
      var result = fn(...input[i]);
      console.log("\t Result is \t: ",result);
      console.log("-".repeat(100));
  }
}

main();