/**
https://leetcode.com/problems/maximum-sum-of-distinct-subarrays-with-length-k/description/

You are given an integer array nums and an integer k. Find the maximum subarray sum of all the subarrays of nums that meet the following conditions:

    The length of the subarray is k, and
    All the elements of the subarray are distinct.

Return the maximum subarray sum of all the subarrays that meet the conditions. If no subarray meets the conditions, return 0.

A subarray is a contiguous non-empty sequence of elements within an array.
 */

/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var maximumSubarraySum = function(nums, k) {
  let ans = 0
  let start = 0
  let end = 0
  let currentSum = 0
  let num_to_index = {} // <element, index>
  while(end < nums.length) {
    const current = nums[end]
    // check if the current element is in the Set
    let lastSeen = num_to_index[current] ?? -1
    // # if current window already has number or if window is too big, adjust window
    while (start <= lastSeen || end - start + 1 > k) {
      currentSum -= nums[start]
      start += 1
    }
    num_to_index[current] = end
    currentSum += current
    if (end - start + 1 == k) {
      ans = Math.max(ans, currentSum)
    }
    end += 1
  }
  return ans 
};

const maxSubArraySum = (nums, k) => {
  let start = 0
  let end = 0
  let currentSum = 0
  
}

// Driver code
var main = function () {
  const fn = maximumSubarraySum
  const input = [
    // [[1,2,2,2,9,9,9], 3],
    [[1,5,4,2,9,9,9], 3],
    // [[4,4,4,4], 3],
    [[1,1,1,7,8,9], 3]
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