/*
Problem link : https://leetcode.com/problems/trionic-array-i
------------------------------------------------------------------------------------
Description: 3637. Trionic Array I

You are given an integer array nums of length n.

An array is trionic if there exist indices 0 < p < q < n − 1 such that:

    nums[0...p] is strictly increasing,
    nums[p...q] is strictly decreasing,
    nums[q...n − 1] is strictly increasing.

Return true if nums is trionic, otherwise return false.
------------------------------------------------------------------------------------
Example:
Example 1:

Input: nums = [1,3,5,4,2,6]

Output: true

Explanation:

Pick p = 2, q = 4:

    nums[0...2] = [1, 3, 5] is strictly increasing (1 < 3 < 5).
    nums[2...4] = [5, 4, 2] is strictly decreasing (5 > 4 > 2).
    nums[4...5] = [2, 6] is strictly increasing (2 < 6).

Example 2:

Input: nums = [2,1,3]

Output: false

Explanation:

There is no way to pick p and q to form the required three segments.

------------------------------------------------------------------------------------
Input:

------------------------------------------------------------------------------------
Constraints:


    3 <= n <= 100
    -1000 <= nums[i] <= 1000

------------------------------------------------------------------------------------

*/

/**
 Intuition: 
  If you check carefully by drawing the value of the element it is to ensure that there should be a peak followed by a valley.
  run through the element and first look for if the elements are increasing ie: forming a valley
  track it when found by the next decreasing element 
  and followed by another increasing sequence



    Find p , the point of first descent
    Find q, the point of first ascent from back
    Check for required condition and handle equal case
    if 0<p<q<n-1 and strict decreasing nums[p...q] return true

 Time Complexity: 
 Space Complexity:
 Notes: 
 */
var isTrionic = function(nums) {
  // represent it with zero so that we can also check if the peak was found before valley   
  const N = nums.length
  let peak = -1, valley = -1, nextPeak = -1
  let i = 1
  // find the first peak
  while(i < N && nums[i-1] < nums[i]) {
    i++
  }
  peak = i -1

  // find the first valley

  while(i < N && nums[i-1] > nums[i]) {
    i++
  }
  valley = i -1

  // find the next peak
  while(i < N && nums[i-1] < nums[i]) {
    i++
  }
  nextPeak = i -1

  return(peak !== 0 && valley !== peak && nextPeak == N-1 && nextPeak !== valley) 

};


// Driver code
 

var main = function () {
  const fn = isTrionic
  const input = [
    [1,3,5,4,2,6],
    [2,1,3],
    [1,2,3],
    [4,1,5,2,3],
    [8,9,4,6,1]
  ]
  /**
   *  Fill the time complexity for each function
   */

  for (var i = 0; i < input.length; i++) {
      console.log(i + 1 + ".\t Input array: \t", input[i]);
      var result = fn(input[i]);
      console.log("\t Result is \t: ",result);
      console.log("-".repeat(100));
  }
}

main();