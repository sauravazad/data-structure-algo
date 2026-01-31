/*
Problem link : https://leetcode.com/problems/count-the-number-of-good-subarrays
------------------------------------------------------------------------------------
Description: 2537. Count the Number of Good Subarrays
Given an integer array nums and an integer k, return the number of good subarrays of nums.

A subarray arr is good if there are at least k pairs of indices (i, j) such that i < j and arr[i] == arr[j].

A subarray is a contiguous non-empty sequence of elements within an array.

------------------------------------------------------------------------------------
Example:

Example 1:

Input: nums = [1,1,1,1,1], k = 10
Output: 1
Explanation: The only good subarray is the array nums itself.

Example 2:

Input: nums = [3,1,4,3,2,2,4], k = 2
Output: 4
Explanation: There are 4 different good subarrays:
- [3,1,4,3,2,2] that has 2 pairs.
- [3,1,4,3,2,2,4] that has 3 pairs.
- [1,4,3,2,2,4] that has 2 pairs.
- [4,3,2,2,4] that has 2 pairs.

------------------------------------------------------------------------------------
Input:

------------------------------------------------------------------------------------
Constraints:

    1 <= nums.length <= 105
    1 <= nums[i], k <= 109

------------------------------------------------------------------------------------

*/

/**
 Intuition:
  Approach using sliding window , but since we are required to find all possible subarray .
  fix the left pointer and just move the right pointer and count the number of good sub array ,
  if it is >=K ; then increase the answer
 Time Complexity:
 Space Complexity:
 Notes:
 */
const countGood = function (nums, k) {
  const N = nums.length
  let goodSubArr = 0
  let right = 0
  let sameElem = 0
  const windowCount = new Map()
  // for every left pointer iterate over the array till end to find all sub arrays
  for (let left = 0; left < nums.length; left++) {
    while (sameElem < k && right < N) {
      const currentElemCount = (windowCount.get(nums[right]) ?? 0)
      sameElem += currentElemCount // increment the Same Element count on each move of right, the while loop will exit once it has found the next same element
      windowCount.set(nums[right], currentElemCount + 1)
      right++
    }
    if (sameElem >= k) {
      /**
       The idea is to recognize that as soon as your subarray has k pairs, each of the subarrays
       that append elements nums[right] through nums[n - 1] will also be a "good" subarray as they are guaranteed to have at LEAST k pairs.
       i.e.
        nums = [1, 2, 2, 4, 1, 9 10, 11, 12, 13, 14] with k = 2
        [1, 2, 2, 4, 1] will be the first valid subarray you encounter.
        But
        [1, 2, 2, 4, 1, 9], [1, 2, 2, 4, 1, 9, 10] ... [1, 2, 2, 4, 1, 9, 10, 11, 12, 13, 14] are all also valid as well.
       */
      goodSubArr += N - right + 1 // [NOTE] since we are using post increment , the pointer will have already moved even when the condition is not valid
    }
    console.info('windowCount', windowCount)
    console.info(`left: ${left} right ${right}`, `count : ${goodSubArr}`)
    // reduce the count of the current element pointed by left pointer
    windowCount.set(nums[left], windowCount.get(nums[left]) - 1)
    sameElem -= windowCount.get(nums[left])
  }
  return goodSubArr
}

// var countGood = function (nums, k) {
//     const n = nums.length;
//     let same = 0,
//         right = -1;
//     const cnt = new Map();
//     let ans = 0;
//     for (let left = 0; left < n; ++left) {
//         while (same < k && right + 1 < n) {
//             ++right;
//             same += cnt.get(nums[right]) || 0;
//             cnt.set(nums[right], (cnt.get(nums[right]) || 0) + 1);
//         }
//         if (same >= k) {
//             ans += n - right;
//         }
//         cnt.set(nums[left], cnt.get(nums[left]) - 1);
//         same -= cnt.get(nums[left]);
//     }
//     return ans;
// };

// Driver code

const main = function () {
  const fn = countGood
  const input = [
    // [[1,1,1,1,1], 10],
    [[3, 1, 4, 3, 2, 2, 4], 2]
  ]

  expected = [1, 4]
  /**
   *  Fill the time complexity for each function
   */

  for (let i = 0; i < input.length; i++) {
    console.log(i + 1 + '.\t Input array: \t', input[i])
    const result = fn(...input[i])
    console.log('\t Result is \t: ', result)
    console.log('-'.repeat(100))
  }
}

main()
