/**
https://leetcode.com/problems/jump-game/
 */
const canJump = (nums) => {
  return jumpRec(nums, 0)
}

const jumpRec = (nums, index) => {
  const n = nums.length -1
  if(index === n) return true  // we can reach the end of array
  if(index > n) return false // we have over jumped
  let canJump = false
  for(let i = index+1; i <= nums[index]; i++ ) {
    canJump ||= jumpRec(nums, index+1)
  }
  return canJump
}


const jumpGreedy = (nums) => {

  let goal = nums.length -1 // we are at the end right now

  for(let i = nums.length -1 ; i >=0; i--) {
    // if current index + jumps available at the current index can react the goal we can shift the goal back to the index
    if(i +nums[i] > goal) goal = i
  }
  return goal ===0
}

// Driver code
var main = function () {
  const input = [
    [2,2,1],
    [2,3,1,1,4],
    [3,2,1,0,4]
  ]
  /**
   *  Fill the time complexity for each function
   */

  for (var i = 0; i < input.length; i++) {
      console.log(i + 1 + ".\t Input array:", input[i]);
      var result = canJump(input[i]);
      console.log("\t Result is",result);
      console.log("-".repeat(100));
  }
}

main();