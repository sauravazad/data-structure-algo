const getLRS = (str) => {
  const N = str.length
  const dp = [...Array(N + 1)].map(() => Array(N + 1).fill(0))
  // base case 0th row and 0th column will be zero as there is no common sequence between "" and any other string
  /**
    LCS of a string is always the string itself, so to find out any repeating sub sequences , we need to consider that when the
    characters are same they should not be at the same index( if indexes are same that means it is the original string)
   */
  for (let i = 1; i <= N; i++) {
    for (let j = 1; j <= N; j++) {
      if (str[i - 1] === str[j - 1] && i !== j) { // extra condition to check for same index
        dp[i][j] = 1 + dp[i - 1][j - 1]
      } else {
        dp[i][j] = Math.max(dp[i][j - 1], dp[i - 1][j])
      }
    }
  }
  return dp[N][N]
}
const getLCS = (str) => {
  const N = str.length
  const dp = [...Array(N + 1)].map(() => Array(N + 1).fill(0))
  // base case 0th row and 0th column will be zero as there is no common sequence between "" and any other string
  for (let i = 1; i <= N; i++) {
    for (let j = 1; j <= N; j++) {
      if (str[i - 1] === str[j - 1]) {
        dp[i][j] = 1 + dp[i - 1][j - 1] // 1 + previous match
      } else {
      // get the max of previous row and previous column
        dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1])
      }
    }
  }
  return dp[N][N]
}
// Driver code
const main = function () {
  const fn = getLRS
  const input = [
    'abcd',
    'aaaaba',
    'abddccd'
  ]
  /**
   *  Fill the time complexity for each function
   */

  for (let i = 0; i < input.length; i++) {
    console.log(i + 1 + '.\t Input array:', input[i])
    const result = fn(input[i])
    console.log('\t Result is', result)
    // assert(input[i].length === result)
    console.log('-'.repeat(100))
  }
}

main()
