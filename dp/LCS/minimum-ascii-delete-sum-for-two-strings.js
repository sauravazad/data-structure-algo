/**
https://leetcode.com/problems/minimum-ascii-delete-sum-for-two-strings/description/
Given two strings s1 and s2, return the lowest ASCII sum of deleted characters to make two strings equal.
 */

const minimumDeleteSum = (s1, s2) => {
  // build a 2d matrix for lookup
  const rows = s1.length
  const columns = s2.length
  const dp = [...Array(rows + 1)].map(() => Array(columns + 1).fill(0))
  /**
  since 0th row / column represent how to make a string empty , we will have to sum up the string's ascii value up to the index
   */
  dp[0][0] = 0 // there is no way to change empty string
  for (let i = 1; i <= rows; i++) {
    dp[i][0] = dp[i - 1][0] + s1[i - 1].charCodeAt(0)
  }
  for (let j = 1; j <= columns; j++) {
    dp[0][j] = dp[0][j - 1] + s2[j - 1].charCodeAt(0)
  }
  for (let i = 1; i <= rows; i++) {
    for (let j = 1; j <= columns; j++) {
      if (s1[i - 1] === s2[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1] // take the previous matching places value
      } else {
        const prevCol = dp[i - 1][j] + s1[i - 1].charCodeAt(0) // previous column  + current character at the s1
        const prevRow = dp[i][j - 1] + s2[j - 1].charCodeAt(0) // previous row  + current character at the s2
        dp[i][j] = Math.min(prevRow, prevCol)
      }
    }
  }
  return dp[rows][columns]
}
// Driver code
const main = function () {
  const input = [
    ['sea', 'eat'],
    ['delete', 'leet']
  ]
  /**
   *  Fill the time complexity for each function
   * O(N^M)
   * O(N*M)
   */
  const fn = minimumDeleteSum
  for (let i = 0; i < input.length; i++) {
    console.log(i + 1 + '.\t Input array:', input[i])
    const result = fn(input[i][0], input[i][1])
    console.log('\t Result is', result)
    console.log('-'.repeat(100))
  }
}

main()
