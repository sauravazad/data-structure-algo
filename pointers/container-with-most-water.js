/*
Problem link : https://leetcode.com/problems/container-with-most-water/description/
------------------------------------------------------------------------------------
Description: 11. Container With Most Water

You are given an integer array height of length n. There are n vertical lines drawn such that the two endpoints of the ith line are (i, 0) and (i, height[i]).

Find two lines that together with the x-axis form a container, such that the container contains the most water.

Return the maximum amount of water a container can store.

Notice that you may not slant the container.


------------------------------------------------------------------------------------
Example:
Input: height = [1,8,6,2,5,4,8,3,7]
Output: 49
Explanation: The above vertical lines are represented by array [1,8,6,2,5,4,8,3,7]. In this case, the max area of water (blue section) the container can contain is 49.

Example 2:

Input: height = [1,1]
Output: 1

 
------------------------------------------------------------------------------------
Input:

------------------------------------------------------------------------------------
Constraints:

------------------------------------------------------------------------------------

*/

/**
 Intuition: 
  We can use the two pointer algorithm. One pointer is at the start and the other at the end.
   At each step, we calculate the amount of water using the formula (j - i) * min(heights[i], heights[j])
   We move the pointer by 1 which ever is smaller , so that we can decrease the height difference to trap more area
 Time Complexity: 
 Space Complexity:
 Notes: 
 */
var maxArea = function(height) {
    let l = 0
    let r = height.length -1
    let area = Number.MIN_SAFE_INTEGER

    while(l < r) {
      const curr = (r-l) * Math.min(height[l], height[r])
      area = Math.max(area, curr)
      if(height[l]< height[r]) {
        l++
      } else  {
        r--
      }
    }
    return area
};

// Driver code
 

var main = function () {
  const fn = maxArea
  const input = [
    [1,8,6,2,5,4,8,3,7],
    [1,1]
  ]
  const expected = [49, 1]
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