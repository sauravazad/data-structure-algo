/*
Problem link : https://leetcode.com/problems/minimum-absolute-difference
------------------------------------------------------------------------------------
Description: 1200. Minimum Absolute Difference
Given an array of distinct integers arr, find all pairs of elements with the minimum absolute difference of any two elements.

Return a list of pairs in ascending order(with respect to pairs), each pair [a, b] follows

    a, b are from arr
    a < b
    b - a equals to the minimum absolute difference of any two elements in arr

------------------------------------------------------------------------------------
Example:
Example 1:

Input: arr = [4,2,1,3]
Output: [[1,2],[2,3],[3,4]]
Explanation: The minimum absolute difference is 1. List all pairs with difference equal to 1 in ascending order.

Example 2:

Input: arr = [1,3,6,10,15]
Output: [[1,3]]

Example 3:

Input: arr = [3,8,-10,23,19,-4,-14,27]
Output: [[-14,-10],[19,23],[23,27]]

------------------------------------------------------------------------------------
Input:

------------------------------------------------------------------------------------
Constraints:

    2 <= arr.length <= 105
    -106 <= arr[i] <= 106

------------------------------------------------------------------------------------

*/

/**
 Intuition:
  to get the minimum absolute difference ,
  sort the elements in ascending order
  minimum difference would be difference between adjacent elements
  loop through and find the minimum of all the adjacent elements
  again loop through the elements and pair up elements that matches the absolute difference
 Time Complexity: Sorting : O(NLogN) + O(N) + O(N) = O(NlogN)
 Space Complexity: O(logN)
 Notes:
 */
const minimumAbsDifference = function (arr) {
  const sorted = arr.sort((a, b) => a - b)
  // console.log(sorted)
  let minDiff = Number.MAX_SAFE_INTEGER
  const minPars = []
  for (let i = 0; i < arr.length - 1; i++) {
    minDiff = Math.min(minDiff, sorted[i + 1] - sorted[i])
  }
  // console.info(`Min Abs Difference is ${minDiff}`)

  for (let i = 0; i < arr.length - 1; i++) {
    if (sorted[i + 1] - sorted[i] == minDiff) {
      minPars.push([sorted[i], sorted[i + 1]])
    }
  }
  return minPars
}
// Driver code

const main = function () {
  const fn = minimumAbsDifference
  const input = [
    [4, 2, 1, 3],
    [1, 3, 6, 10, 15],
    [3, 8, -10, 23, 19, -4, -14, 27]
  ]
  const expected = [
    [[1, 2], [2, 3], [3, 4]],
    [[1, 3]],
    [[-14, -10], [19, 23], [23, 27]]
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
