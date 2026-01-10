// https://leetcode.com/problems/snakes-and-ladders

const assert = require('node:assert');

var snakesAndLadders = function(board) {
  let n = board.length
  let label = 1
  let cells = new Array(n*n+1)
  for (let i = n-1; i >= 0; i--) {
      for (let j = 0; j < n && (n-i)% 2 == 1; j++) {
          cells[label++] = [i,j]
      }
      for (let j = n-1; j >= 0 && (n-i)% 2 == 0; j--) {
          cells[label++] = [i,j]
      }
  }

  let minMoves = new Array(n*n+1).fill(-1)
  minMoves[1] = 0
  let queue = [1]

  while (queue.length) {
      let curr = queue.shift()
      if (curr == n*n) return minMoves[curr]
      for (let next = curr + 1; next <= Math.min(curr+6, n*n); next++) {
          let [i,j] = cells[next]
          let destination = next
          if (board[i][j] != -1) destination = board[i][j]
          if (minMoves[destination]  == -1) {
              queue.push(destination)
              minMoves[destination] = minMoves[curr] + 1
          }
      }
  }
  return -1
};
// Driver code
var main = function () {
  const fn = snakesAndLadders
  const input = [
    [[[-1,-1,-1,-1,-1,-1],[-1,-1,-1,-1,-1,-1],[-1,-1,-1,-1,-1,-1],[-1,35,-1,-1,13,-1],[-1,-1,-1,-1,-1,-1],[-1,15,-1,-1,-1,-1]]],
    [[[-1,-1],[-1,3]]],
    [[[-1,-1,-1],[-1,9,8],[-1,8,9]]]
  ]
  const output = [4, 1, 1]
  /**
   *  Fill the time complexity for each function
   */

  for (var i = 0; i < input.length; i++) {
      console.log(i + 1 + ".\t Input array: \t", input[i]);
      var result = fn(...input[i]);
      console.log("\t Result is \t: ",result);
      console.log("-".repeat(100));
      assert.equal(result, output[i])
  }
}

main();