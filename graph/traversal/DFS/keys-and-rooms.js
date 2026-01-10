// https://leetcode.com/problems/keys-and-rooms/
const assert = require("assert")

const canVisitAllRooms = function(rooms) {
  const g = Array(rooms.length).fill().map(() => Array().fill([]))
  for( let i = 0; i < rooms.length; i++) {
    g[i] = rooms[i]
  }
  // console.info(g)
  const visited = {}
  const path = []
  // do a DFS from 0 to n , if there is only one island , then we can visit all
  const DFS = (curr, parent) => {
    visited[curr] = true
    path.push(curr)
    for(let n of g[curr]) {
      if(!visited[n]) {
        DFS(n, curr)
      }
    }
  }

  DFS(0, -1)
  const result = path.length == rooms.length
  return result

};

// Driver code
var main = function () {
  const fn = canVisitAllRooms
  const input = [
    [[1],[2],[3],[]],
    [[1,3],[3,0,1],[2],[0]]
  ]
  /**
   *  Fill the time complexity for each function
   */
  const output = [true, false]
  for (var i = 0; i < input.length; i++) {
      console.log(i + 1 + ".\t Input array: \t", input[i]);
      var result = fn(input[i]);
      console.log("\t Result is \t: ",result);
      console.log("-".repeat(100));
      assert.equal(result, output[i])
  }
}

main();