/*
Problem link : https://leetcode.com/problems/minimum-pair-removal-to-sort-array-i
------------------------------------------------------------------------------------
Description: 3507. Minimum Pair Removal to Sort Array I

Given an array nums, you can perform the following operation any number of times:

    Select the adjacent pair with the minimum sum in nums. If multiple such pairs exist, choose the leftmost one.
    Replace the pair with their sum.

Return the minimum number of operations needed to make the array non-decreasing.

An array is said to be non-decreasing if each element is greater than or equal to its previous element (if it exists).
------------------------------------------------------------------------------------
Example:

Example 1:

Input: nums = [5,2,3,1]

Output: 2

Explanation:

    The pair (3,1) has the minimum sum of 4. After replacement, nums = [5,2,4].
    The pair (2,4) has the minimum sum of 6. After replacement, nums = [5,6].

The array nums became non-decreasing in two operations.

Example 2:

Input: nums = [1,2,2]

Output: 0

Explanation:

The array nums is already sorted.

------------------------------------------------------------------------------------
Input:

------------------------------------------------------------------------------------
Constraints:

    1 <= nums.length <= 50
    -1000 <= nums[i] <= 1000

------------------------------------------------------------------------------------

*/

/**
 Intuition:  the no of element in the array is at most 50,
 so we can simply run a loop while the numbers are not in ascending order and find the pair on each iteration to replace with its sum
 Time Complexity:
 Space Complexity:
 Notes:
 */
const minimumPairRemoval = function (nums) {
  let count = 0
  while (nums.length) { // infinite loop
    let isAscending = true
    let minSum = Number.MAX_SAFE_INTEGER
    let targetIndex = -1
    for (let i = 0; i < nums.length - 1; i++) {
      const sum = nums[i] + nums[i + 1]
      if (nums[i] > nums[i + 1]) isAscending = false

      // check if the current sum is min
      if (sum < minSum) {
        minSum = sum
        targetIndex = i
      }
    }
    if (isAscending) break
    // increment the counter on every inner loop completion and replace the pair with the min
    count++
    nums[targetIndex] = minSum
    nums.splice(targetIndex + 1, 1) // remove the next element of target index
  }
  return count
}

// Driver code

const main = function () {
  const fn = minimumPairRemoval
  const input = [
    [5, 2, 3, 1],
    [1, 2, 2]
  ]
  /**
   *  Fill the time complexity for each function
   */

  for (let i = 0; i < input.length; i++) {
    console.log(i + 1 + '.\t Input array: \t', input[i])
    const result = fn(input[i])
    console.log('\t Result is \t: ', result)
    console.log('-'.repeat(100))
  }
}

main()
