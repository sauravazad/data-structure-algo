/*
Problem link : https://leetcode.com/problems/daily-temperatures/
------------------------------------------------------------------------------------
Description: 739. Daily Temperatures

Given an array of integers temperatures represents the daily temperatures, return an array answer such that answer[i] is the number of days
 you have to wait after the ith day to get a warmer temperature. If there is no future day for which this is possible, keep answer[i] == 0 instead.
------------------------------------------------------------------------------------
Example:
Example 1:

Input: temperatures = [73,74,75,71,69,72,76,73]
Output: [1,1,4,2,1,1,0,0]

Example 2:

Input: temperatures = [30,40,50,60]
Output: [1,1,1,0]

Example 3:

Input: temperatures = [30,60,90]
Output: [1,1,0]

------------------------------------------------------------------------------------
Input:

------------------------------------------------------------------------------------
Constraints:

------------------------------------------------------------------------------------

*/

/**
 Intuition: Can you consider a reverse approach? For example, in [2, 1, 1, 3], the next greater element for the numbers [2, 1, 1] is 3.
  Instead of checking for each element individually, can you think of a way where, by standing at the element 3, you compute the result for the elements [2, 1, 1]
  Use Monotonic Stack in decreasing order to maintain the indexes 
 Time Complexity: 
 Space Complexity:
 Notes: 
 */
var dailyTemperatures = function(temperatures) {
    const stack = [0]
    const N = temperatures.length
    const ans = Array(N).fill(0)
    
    for(let i = 1; i < N; i++) {
      const current = temperatures[i]
      while(stack.length > 0 && current > temperatures[stack[stack.length -1]]) {
        // pop the stack and calculate the index difference from current index
        const prevIndex = stack.pop()
        ans[prevIndex] = i - prevIndex
      }
      //push the current index
      stack.push(i)
    }
    return ans
};
// Driver code
 

var main = function () {
  const fn = dailyTemperatures
  const input = [
    [73,74,75,71,69,72,76,73],
    [30,40,50,60],
    [30,60,90]
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