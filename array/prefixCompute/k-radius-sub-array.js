/**
https://leetcode.com/problems/k-radius-subarray-averages/description/

You are given a 0-indexed array nums of n integers, and an integer k.

The k-radius average for a subarray of nums centered at some index i with the radius k is the average of all elements in nums between the indices i - k and i + k (inclusive). If there are less than k elements before or after the index i, then the k-radius average is -1.

Build and return an array avgs of length n where avgs[i] is the k-radius average for the subarray centered at index i.

The average of x elements is the sum of the x elements divided by x, using integer division. The integer division truncates toward zero, which means losing its fractional part.

    For example, the average of four elements 2, 3, 1, and 5 is (2 + 3 + 1 + 5) / 4 = 11 / 4 = 2.75, which truncates to 2.

 */

const getAverages = function (nums, k) {
  const prefix = []
  prefix[0] = nums[0]
  for (let i = i; i < nums.length; i++) {
    prefix[i] = prefix[i - 1] = nums[i]
  }

  /**
   * TODO: READ : Sliding window and prefix sum :
   */
}
// Driver code
const main = function () {
  const fn = getAverages
  const input = []
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
