/**
https://leetcode.com/problems/range-sum-of-sorted-subarray-sums/description/
You are given the array nums consisting of n positive integers.
You computed the sum of all non-empty continuous subarrays from the array and then sorted them in non-decreasing order,
creating a new array of n * (n + 1) / 2 numbers.

Return the sum of the numbers from index left to index right (indexed from 1), inclusive, in the new array.
Since the answer can be a huge number return it modulo 109 + 7.

Input: nums = [1,2,3,4], n = 4, left = 1, right = 5
Output: 13
Explanation: All subarray sums are 1, 3, 6, 10, 2, 5, 9, 3, 7, 4. After sorting them in non-decreasing order we have the new array [1, 2, 3, 3, 4, 5, 6, 7, 9, 10].
The sum of the numbers from index le = 1 to ri = 5 is 1 + 2 + 3 + 3 + 4 = 13.
*/
const buildPrefixSumArray = (numbers) => {
  const prefix = []
  const n = numbers.length
  for (let i = 0; i < n; i++) {
    prefix[i] = (prefix[i - 1] || 0) + numbers[i]
  }
  return prefix
}

const rangeSum = function (nums, n, left, right) {
  const sums = []
  const prefix = buildPrefixSumArray(nums)
  // console.log(prefix)
  // Iterate over the nums array to compute the sub array sums
  let k = 0
  for (let i = 0; i < n; i++) {
    for (let j = i; j < n; j++) {
      sums[k++] = prefix[j] - (prefix[i - 1] || 0)
      // console.log(`Sub array, [${i},${j}]`, `sum is: ${sums[k-1]}`)
    }
  }
  sums.sort((a, b) => a - b) // sort the array
  // calculate prefixSum for the sums array

  const subarrayPrefixes = buildPrefixSumArray(sums)
  subarrayPrefixes.unshift(0)
  // process the query
  const ans = subarrayPrefixes[right] - (subarrayPrefixes[left - 1]) //
  return ans
}

// Driver code
const main = function () {
  const input = [
    [[1, 2, 3, 4], 4, 1, 5],
    [[1, 2, 3, 4], 4, 3, 4],
    [[1, 2, 3, 4], 4, 4, 1]
  ]
  /**
   *  Fill the time complexity for each function
   */

  for (let i = 0; i < input.length; i++) {
    console.log(i + 1 + '.\t Input array:', input[i])
    const result = rangeSum(...input[i])
    console.log('\t Result is',
      result)
    console.log('-'.repeat(100))
  }
}

main()
