/*
Problem link : https://leetcode.com/problems/minimize-maximum-pair-sum-in-array
------------------------------------------------------------------------------------
Description: 1877. Minimize Maximum Pair Sum in Array

The pair sum of a pair (a,b) is equal to a + b. The maximum pair sum is the largest pair sum in a list of pairs.

For example, if we have pairs (1,5), (2,3), and (4,4), the maximum pair sum would be max(1+5, 2+3, 4+4) = max(6, 5, 8) = 8.

Given an array nums of even length n, pair up the elements of nums into n / 2 pairs such that:

    Each element of nums is in exactly one pair, and
    The maximum pair sum is minimized.

Return the minimized maximum pair sum after optimally pairing up the elements.

------------------------------------------------------------------------------------
Example:

Example 1:

Input: nums = [3,5,2,3]
Output: 7
Explanation: The elements can be paired up into pairs (3,3) and (5,2).
The maximum pair sum is max(3+3, 5+2) = max(6, 7) = 7.

Example 2:

Input: nums = [3,5,4,2,4,6]
Output: 8
Explanation: The elements can be paired up into pairs (3,5), (4,4), and (6,2).
The maximum pair sum is max(3+5, 4+4, 6+2) = max(8, 8, 8) = 8.

------------------------------------------------------------------------------------
Input:

------------------------------------------------------------------------------------
Constraints:

    n == nums.length
    2 <= n <= 105
    n is even.
    1 <= nums[i] <= 105

------------------------------------------------------------------------------------

*/

/**
 Intuition:
 The problem is to find all possible pairs such that you select the pair with minimum sums .
 then get the max of sum of elements of the pair .

 Essentially if you think it is asking us to pick the combination of pair amongst all possible pairs that has the its sum as minimum.
 So , if you pair a large number with another large number , now the sum of the pair will be very large .
 another hint form this to take is we want to get the balanced pair , where we take a small number and pair it with the largest number and so forth .
 it would result in having a relatively even distribution .
 Time Complexity: O(NLogN): sorting : O(NLogN) + loop : O(N)
 Space Complexity: O(N) : if we do not mutate the input else O(LogN)
 Notes:
 */
const minPairSum = function (nums) {
  /**
    1. sort the number array
    2. create a copy which is sorted in reverse
    3. iterate from 1 to n/2
       sum the elements for current iteration
       while checking if the sum is max
    4. return max
   */

  const sorted = (nums.slice(0)).sort((a, b) => a - b) // slice is used because sort() is a in place and will mutate the original array
  // let reverse = (nums.slice(0)).sort((a,b) => b -a)
  const mid = nums.length / 2 // the length is even so we do not have to bother about over flow
  let max = Number.MIN_SAFE_INTEGER
  for (let i = 0; i <= mid; i++) {
    // console.info(`(${sorted[i]}, ${reverse[i]})`)
    // const sum = sorted[i] + reverse[i]
    const sum = sorted[i] + sorted[nums.length - 1 - i]
    max = Math.max(max, sum)
  }
  return max
}

// Driver code

const main = function () {
  const fn = minPairSum
  const input = [
    [3, 5, 2, 3],
    [2, 3, 4, 4, 5, 6]
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
