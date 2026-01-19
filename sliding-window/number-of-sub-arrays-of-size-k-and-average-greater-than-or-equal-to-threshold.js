/*
Problem link : https://leetcode.com/problems/number-of-sub-arrays-of-size-k-and-average-greater-than-or-equal-to-threshold/description/
------------------------------------------------------------------------------------
Description: 
Given an array of integers arr and two integers k and threshold, return the number of sub-arrays of size k and average greater than or equal to threshold.

------------------------------------------------------------------------------------
Example:

Example 1:
  Input: arr = [2,2,2,2,5,5,5,8], k = 3, threshold = 4
  Output: 3
  Explanation: Sub-arrays [2,5,5],[5,5,5] and [5,5,8] have averages 4, 5 and 6 respectively. 
  All other sub-arrays of size 3 have averages less than 4 (the threshold).

Example 2:

  Input: arr = [11,13,17,23,29,31,7,5,2,3], k = 3, threshold = 5
  Output: 6
  Explanation: The first 6 sub-arrays of size 3 have averages greater than 5. Note that averages are not integers.



------------------------------------------------------------------------------------
Input:

------------------------------------------------------------------------------------
Constraints:

------------------------------------------------------------------------------------

*/

/**
 Intuition: 
 Time Complexity: 
 Space Complexity:
 Notes: 
 */

 /**
 * @param {number[]} arr
 * @param {number} k
 * @param {number} threshold
 * @return {number}
 */
var numOfSubarrays = function(arr, k, threshold) {
  let left = 0
  let sum = 0
  let count = 0

  for(let right = 0 ; right < arr.length; right++) {
    sum += arr[right]
    if(right - left + 1 === k) {
      if(sum/k >= threshold) count++
      sum-=arr[left]
      left++
    }
  }
  return count
    
};

// Driver code
 

var main = function () {
  const fn = numOfSubarrays
  const input = [
    [[2,2,2,2,5,5,5,8], 3,4],
    [[11,13,17,23,29,31,7,5,2,3], 3, 5]
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