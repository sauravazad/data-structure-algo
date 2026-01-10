/**
https://leetcode.com/problems/open-the-lock/
 */
const N = 4 // there are 4 dials
  // slots can rotate in cycle
const change = (x, increment) => {
  let n = parseInt(x, 10)
  if(n == 9 && increment) return "0"
  if(n == 0 && !increment) return "9"
  const  result =  increment ?  n + 1: n - 1
  return result.toString()
}
const transform = (num) => {
  const result = []
  // for every dial increment and decrement
  for(let i = 0; i < 4 ; i++) {
    let n1 = num.slice(0,i) + change(num[i], true) + num.slice(i+1)
    let n2 = num.slice(0,i) + change(num[i], false) + num.slice(i+1)
    result.push(n1)
    result.push(n2)
    // console.info(`Push n1 : ${n1} n2: ${n2}`)
  }
  return result
}
/**
 * @param {string[]} deadends
 * @param {string} target
 * @return {number}
 */
var openLock = function(deadends, target) {

  const visited = new Map()
  const set = (i) => {
    visited.set(i, true)
  }
  let has = (i) => {
    return visited.has(i)
  }
  // set the deadEnds as visted
  for(let d of deadends) {
    set(d)
  }
  if (has("0000")) {
    return -1
  }


  let start = "0000"

  const bfsHelper = (source, target) => {
    const q = []
    q.push([source, 0])
    while(q.length) {
      const [current, turn] = q.shift()
      if(current == target) return turn
      for(let c of transform(current)) {
        if(!has(c)) {
          set(c)
          q.push([c, turn + 1])
        }
      }
    }
    return -1
  }
  const cost = bfsHelper(start, target)
  return cost
};
// Driver code
var main = function () {
  const fn = openLock
  const input = [
    [["0201","0101","0102","1212","2002"], "0202"],
    [["8888"], "0009"],
    [["8887","8889","8878","8898","8788","8988","7888","9888"], "8888"]
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

// transform("0000")
// transform("9021")