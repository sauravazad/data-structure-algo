/*
Problem link : https://leetcode.com/problems/product-of-array-except-self
------------------------------------------------------------------------------------
Description: 238. Product of Array Except Self
Given an integer array nums, return an array answer such that answer[i] is equal to the product of all the elements of nums except nums[i].

The product of any prefix or suffix of nums is guaranteed to fit in a 32-bit integer.

You must write an algorithm that runs in O(n) time and without using the division operation.

------------------------------------------------------------------------------------
Example:

Example 1:

Input: nums = [1,2,3,4]
Output: [24,12,8,6]

Example 2:

Input: nums = [-1,1,0,-3,3]
Output: [0,0,9,0,0]

 
------------------------------------------------------------------------------------
Input:

------------------------------------------------------------------------------------
Constraints:

    2 <= nums.length <= 105
    -30 <= nums[i] <= 30
    The input is generated such that answer[i] is guaranteed to fit in a 32-bit integer.


------------------------------------------------------------------------------------

*/

/**
 Intuition: Note Division is not allowed and would not work if one of the element is zero
 So , lets use prefix and post fix computation excluding the element to build two array and the multiply them to get the desired result
 Time Complexity: O(N)
 Space Complexity: O(N)
 Notes: 
 */
var productExceptSelf = function(nums) {
  const N = nums.length  
  const prefixProduct = Array(N)
  const postfixProduct = Array(N)
  prefixProduct[0] = 1 // as there are no elements before it and 1  is Multiplicative Identity.
  postfixProduct[N -1] = 1

  for(let i = 1 ; i < nums.length; i++) {
    prefixProduct[i] = prefixProduct[i-1] * nums[i-1]
  }
  for(let j = N-2 ; j >=0; j--) {
    postfixProduct[j] = postfixProduct[j+1] * nums[j+1]
  }
  let ans  = Array(N)
  for(let i = 0 ; i < N; i++) {
    ans [i] = prefixProduct[i] * postfixProduct[i]
  }
  return ans
};

/**
 Intuition: Note Division is not allowed and would not work if one of the element is zero
 So , lets use prefix and post fix computation excluding the element to build two array and the multiply them to get the desired result
 In order to reduce the space complexity , lets use the output array as the place holder for pre product and then use a variable to store the post product and multiply
 Time Complexity: O(N)
 Space Complexity: O(1)
 Notes: 
 */
var productExceptSelf1 = function(nums) {
  const N = nums.length  
  let ans  = Array(N)
  ans[0] = 1 // multiplicative identity

  for(let i = 1 ; i < nums.length; i++) {
    ans[i] = ans[i-1] * nums[i-1]
  }
  let k = 1
  for(let j = N-1 ; j >=0; j--) {
    ans[j] = ans[j] * k
    k *= nums[j]
  }
  
  return ans
};
// Driver code
 

var main = function () {
  const fn = productExceptSelf1
  const input = [
    [1,2,3,4],
    [-1,1,0,-3,3]
  ]
  const expected = [
    [24,12,8,6],
    [0,0,9,0,0]
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