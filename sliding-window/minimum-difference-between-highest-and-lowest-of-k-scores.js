/**
https://leetcode.com/problems/minimum-difference-between-highest-and-lowest-of-k-scores/
 */

/**
  Intuition : Problems says to get the  difference between highest and lowest item in the window
  - sort the array in descending order
  - use sliding window to always check the difference between first and last element
 */
const minimumDifference = function (nums, k) {
  const sorted = nums.sort((a, b) => b - a)
  // console.info(`sorted `, sorted)
  let ans = Number.MAX_SAFE_INTEGER
  let left = 0

  for (let right = 0; right < nums.length; right++) {
    // if window achieved do the comparison
    if (right - left + 1 == k) {
      ans = Math.min(ans, sorted[left] - sorted[right])
      left++
    }
  }
  return ans
}

// Driver code
const main = function () {
  const fn = minimumDifference
  const input = [
    [[90], 1],
    [[9, 4, 1, 7], 2]
  ]

  const expected = [0, 2]
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
