// https://leetcode.com/problems/trapping-rain-water
// https://leetcode.com/problems/trapping-rain-water-ii/


/*
Problem link : https://leetcode.com/problems/
------------------------------------------------------------------------------------
Description: 
42. Trapping Rain Water

Given n non-negative integers representing an elevation map where the width of each bar is 1, compute how much water it can trap after raining.

------------------------------------------------------------------------------------
Example:

Example 1:

Input: height = [0,1,0,2,1,0,1,3,2,1,2,1]
Output: 6
Explanation: The above elevation map (black section) is represented by array [0,1,0,2,1,0,1,3,2,1,2,1]. 
In this case, 6 units of rain water (blue section) are being trapped.

Example 2:

Input: height = [4,2,0,3,2,5]
Output: 9



------------------------------------------------------------------------------------
Input:

------------------------------------------------------------------------------------
Constraints:


    n == height.length
    1 <= n <= 2 * 104
    0 <= height[i] <= 105


------------------------------------------------------------------------------------

*/

/**
 Intuition: 
 instead of computing the left and right parts separately, we may think of some way to do it in one iteration.
From the figure in dynamic programming approach, notice that as long as right_max[i]>left_max[i] (from element 0 to 6), the water trapped depends upon the left_max, and similar is the case when left_max[i]>right_max[i] (from element 8 to 11).
So, we can say that if there is a larger bar at one end (say right), we are assured that the water trapped would be dependant on height of bar in current direction (from left to right). As soon as we find the bar at other end (right) is smaller, we start iterating in opposite direction (from right to left).
We must maintain left_max and right_max during the iteration, but now we can do it in one iteration using 2 pointers, switching between the two.
 Time Complexity: 
 Space Complexity:
 Notes: 
 */
var trap = function(height) {
  let left = 0
  let right = height.length - 1
  let ans = 0
  let left_max = 0
  let right_max = 0
  while(left < right) {
    if(height[left] < height[right]) {
      left_max = Math.max(height[left], left_max)
      ans += left_max - height[left]
      left++
    } else {
      right_max = Math.max(height[right], right_max)
      ans += right_max - height[right]
      --right
    }
  }
  return ans
}; 

// Driver code
 

var main = function () {
  const fn = trap
  const input = [
    [1, 5, 2, 3, 4],
    [0,2,0,3,1,0,1,3,2,1],
    [0,1,0,2,1,0,1,3,2,1,2,1],
    [4,2,0,3,2,5]
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