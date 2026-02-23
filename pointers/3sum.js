/*
Problem link : https://leetcode.com/problems/3sum/description/
------------------------------------------------------------------------------------
Description: 15. 3Sum
Given an integer array nums, return all the triplets [nums[i], nums[j], nums[k]] such that i != j, i != k, and j != k, and nums[i] + nums[j] + nums[k] == 0.

Notice that the solution set must not contain duplicate triplets.

------------------------------------------------------------------------------------
Example:

Example 1:

Input: nums = [-1,0,1,2,-1,-4]
Output: [[-1,-1,2],[-1,0,1]]
Explanation: 
nums[0] + nums[1] + nums[2] = (-1) + 0 + 1 = 0.
nums[1] + nums[2] + nums[4] = 0 + 1 + (-1) = 0.
nums[0] + nums[3] + nums[4] = (-1) + 2 + (-1) = 0.
The distinct triplets are [-1,0,1] and [-1,-1,2].
Notice that the order of the output and the order of the triplets does not matter.

Example 2:

Input: nums = [0,1,1]
Output: []
Explanation: The only possible triplet does not sum up to 0.

Example 3:

Input: nums = [0,0,0]
Output: [[0,0,0]]
Explanation: The only possible triplet sums up to 0.


------------------------------------------------------------------------------------
Input:

------------------------------------------------------------------------------------
Constraints:

    3 <= nums.length <= 3000
    -105 <= nums[i] <= 105


------------------------------------------------------------------------------------

*/

/**
 Intuition: O(N^2)
 sort the array so that binary search algo can be applied to inner loop
 fix the outer pointer and find the additive inverse in the rest of the elements 
 Time Complexity: 
 Space Complexity:
 Notes: 
 */
var threeSum = function (nums) {
    // sort the array in ascending  order 
    // pick element while iterating through the array and call the two sum algo ie: find the additive inverse of the current element in the array using binary search two pinter algo
    nums.sort((a, b) => a - b);
    console.info(`Sorted`, nums)
    let res = [];
    for (let i = 0; i < nums.length && nums[i] <= 0; ++i)
        if (i === 0 || nums[i - 1] !== nums[i]) {
            // console.info(`twoSum(${i})`)
            twoSumII(nums, i, res);
        }
    return res;
};

let twoSumII = function (nums, i, res) {
    let left = i + 1
    let right = nums.length -1
    while(left < right) {
        let sum = nums[i] + nums[left] + nums[right]
        if(sum < 0) { //move the left pointer to a larger number
            left++
        } else if(sum > 0) { // move the right pointer back to get a smaller number
            right--
        } else { // it is a additive inverse at the given left and right pointer , push the element
            res.push([nums[i], nums[left], nums[right]])
            // now we can potentially have duplicate number between the left and right pointer to avoid pushing it , 
            // since it is a sorted array need to move the left pointer until it is not equal to the previous left pointer
            // also move the right pointer back since we have picked the element
            --right
            left++
            while(left < right && nums[left] === nums[left-1]) ++left
        }
    }
};

// Driver code
 

var main = function () {
  const fn = threeSum
  const input = [
    [-2,0,0,2,2],
    [-1,0,1,2,-1,-4],
    [0,1,1],
    [0,0,0]
  ]
  const expected = [
    [[-1,-1,2],[-1,0,1]],
    [],
    [[0,0,0]]
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