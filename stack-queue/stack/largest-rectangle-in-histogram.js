/*
Problem link : https://leetcode.com/problems/largest-rectangle-in-histogram/
------------------------------------------------------------------------------------
Description: 84. Largest Rectangle in Histogram
Given an array of integers heights representing the histogram's bar height where the width of each bar is 1, return the area of the largest rectangle in the histogram.

------------------------------------------------------------------------------------
Example:
Example 1:

Input: heights = [2,1,5,6,2,3]
Output: 10
Explanation: The above is a histogram where width of each bar is 1.
The largest rectangle is shown in the red area, which has an area = 10 units.

Example 2:

Input: heights = [2,4]
Output: 4

 
------------------------------------------------------------------------------------
Input:

------------------------------------------------------------------------------------
Constraints:

    1 <= heights.length <= 105
    0 <= heights[i] <= 104

------------------------------------------------------------------------------------


*/

/**
 Intuition: Brute force :
 fix the right index and find the minimum height for 0 to N 
 and moving the right pointer gradually
 on every right pointer move calculate the max area 
 Time Complexity: O(N^2)
 Space Complexity: O(1)
 Notes: 
 */
var largestRectangleArea = function(height) {
    const N = height.length
    let area = Number.MIN_SAFE_INTEGER

    for(let i = 0; i < N; i++) {
      let minHeight = Number.MAX_SAFE_INTEGER
      for (let j=i; j<N; j++) {
          minHeight = Math.min(minHeight, height[j])
          const currentArea = (j -i + 1) * minHeight
        area = Math.max(currentArea, area)
      }
    }
    return area
};

/**
  Time complexity : Avg: O(NLogN) worst case: O(N^2) if the array is already sorted : we don't gain divide and concur advantage
  Space Complexity : O(N)
 */
var largestRectangleAreaDivideNConcur = (height) => {
  function calculateArea(heights, start, end) {
    if(start > end) return 0
    let minIndex = start
    for(let i = start ; i <= end; i++) {
      if(heights[i] < heights[minIndex]) minIndex = i
      const currentArea = heights[minIndex] * (end - start + 1)
      return Math.max(currentArea, 
        calculateArea(heights, start, minIndex -1),
        calculateArea(heights, minIndex + 1, end),
      )
    }
  }
  return calculateArea(height, 0, height.length -1)
}

/**
 Intuition: Using monotonic min stack :
 Iterate over the heights in the array and try to extend each bar right ; which can only be done if the next element in the heights array is grater or equal to the current element.
 To Track the max height that can be extended till right pointer we can use a stack (monotonic increasing)
 Algo:
  for i = 0 to N
  Iterate over the heights
    left_index = i
    while stack.top > current_height
      pop the stack 
      compute the area and update the maxArea for the popped height
      width =  i - popped(left index)
      update the start left_index with the popped elements index
    push the current element to the stack (leftIndex, height)

  if at the end there are elements in the stack , we just need to calculate the area for each of them
 
 Time Complexity: O(N)
 Space Complexity: O()
 Notes: 
 */
var largestRectangleArea =(heights) => {
  const stack = [] // [left_index, height]
  const N = heights.length
  let maxArea = -1
  for(let i = 0 ; i < N; i++) {
    const height = heights[i]
    let start = i ; // update left index start with current right index
    while(stack.length && stack[stack.length-1][1] > height) {
      let [index, height_popped] = stack.pop()
      const width = i - index
      maxArea = Math.max(maxArea, height_popped * width)
      start = index
    }
    stack.push([start, height])
  }
  console.info("Stack", stack)
  // empty the stack
  while(stack.length) {
    let [index, height] = stack.pop()
    maxArea = Math.max(maxArea, height * (N - index)) // the current elements in the stack will extend till the end of the heights array
  }
  return maxArea
}

// Driver code
 

var main = function () {
  const fn = largestRectangleArea
  const input = [ 
    [7,1,7,2,2,4],
    [1,3,7],
    [2,1,5,6,2,3],
    [2,4]]
    const expected = [
      8, 7
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