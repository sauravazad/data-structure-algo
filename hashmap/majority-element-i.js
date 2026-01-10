// https://leetcode.com/problems/majority-element-i/


/**
 * @param {number[]} nums
 * @return {number}
 */
var majorityElement = function(nums) {
  /**
    - use Hashmap and identify
    - use Boyer-Moore Voting Algorithm
    - declare two variables ans = undefined count = 0
    iterate over the elements and check if the count === 0 then set the current element as the ans
    if the current element is same as the ans increment the count
    else decrement
    - once the loop has exited verify if the ans  indeed satisfies the condition
   */
  let ans
  let count = 0

  for ( let i = 0 ; i < nums.length; i++) {
    let current = nums[i]
    if(count === 0 ) ans = current
    if(ans === current) {
      count++
    } else  {
      count--
    }
  }
  let c = 0
  for(let i = 0 ;i < nums.length; i++) {
    if(nums[i] == ans) c++
    if(c > nums.length /2 ) return ans
  }

  return -1
};
// Driver code
var main = function () {
  const fn = majorityElement
  const input = [
    [3,2,3],
    [2,2,1,1,1,2,2]
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