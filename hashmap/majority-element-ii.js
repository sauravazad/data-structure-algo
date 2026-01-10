/**
https://leetcode.com/problems/majority-element-ii/description/
 */

/**
 * @param {number[]} nums
 * @return {number[]}
 */
var majorityElement = function(nums) {
  const limit = nums.length / 3

};

// Driver code
var main = function () {
  const fn = majorityElement
  const input = [
    [3,2,3],
    [1],
    [1,2]
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