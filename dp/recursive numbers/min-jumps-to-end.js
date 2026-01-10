const findMinJumps = (jumps) => {
  return findMinJump(jumps, 0)
}
const findMinJumpsBrute = (nums, index) => {
  const n = nums.length
  if(index >= n -1) { // we have reached the end of our iteration
    return 0
  }
  let jumps = Infinity

  for(let i = index+1; i <= index + nums[index] ; i++ ) {

    jumps = Math.min(jumps, findMinJumpsBrute(nums, i) + 1)
  }
  return jumps
}


findMinJumpsBottomUp = (nums) => {
  // build a dp array of size of nums array
  const dp = Array(nums.length).fill(Infinity)
  // Basic idea is to count the minimum number of steps required to reach at a given index in the nums array
  // as we start form 0 and we are already at index = 0 we require zero jumps
  // base case
  dp[0] = 0

  // iterate over the nums for all possible combination and update the array
  // Outer loop traversing the whole array
  for(let i = 1; i < nums.length; i++) {
    // If the value is not stored in the table and index i is
    // less than equal to the value at jth index + j index
    for(let j = 0; j < i; j++) {
       // check if the outer index is less than the current index + jumps at the index ie: i is less than the max index we can reach using the number at j
      if(i <= nums[j] + j && dp[j] !== Infinity) {
        dp[i] = Math.min(dp[i], dp[j] +1 )
        break;
      }
    }
  }
  return dp[nums.length-1]
}

const findMinJump = (nums) => {
  let jumps = 0
  let currentJump = 0
  let farthestJump = 0

  for(let i = 0; i < nums.length; i++) {
    farthestJump = Math.max(farthestJump, i + nums[i])
    // when we reach an index that is equal to current jump we can jump further
    if(i == currentJump) {
      jumps++
      currentJump = farthestJump
    }
  }
  return jumps
}


// Driver code
var main = function() {
  let inputs = [ [2, 3, 1, 1, 4], [2, 1, 1, 1, 4], [1, 1, 3, 6, 9, 3, 0, 1, 3]]

  // You can uncomment the line below and check how this recursive solution causes a time-out
  // inputs.push([2, 9, 4, 6, 1, 4, 7, 10, 0, 3, 9, 7, 4, 10, 5, 9, 3, 9, 7, 7, 10, 1, 8, 5, 9, 3, 1, 5, 9, 7, 7, 6, 3, 9, 7, 0, 1, 9, 9, 0, 9, 4, 9, 6, 2, 9, 3, 7, 6, 4]);

  for (let i = 0; i < inputs.length; i++) {
    console.log(i + 1 + ".  [" + inputs[i] + "]");
    console.log("Minimum jumps to reach the end: " + findMinJumps(inputs[i]));
    console.log("-".repeat(100) + "\n");
  }
};

main();