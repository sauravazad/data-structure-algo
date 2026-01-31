const countWays = (n) => {
  const dp = new Array(n + 1)
  // ways we can get to 0 is only 1
  // can reduce Space complexity to O(1) if we use fixed number of variables
  dp[0] = 1
  for (let i = 1; i <= n; i++) {
    dp[i] = dp[i - 1] + (dp[i - 3] || 0) + (dp[i - 4] || 0)
  }
  return dp[n]
}

// Driver code
const main = function () {
  const input = [3, 5, 10, 25, 0]
  /**
   *  Fill the time complexity for each function
   */

  for (let i = 0; i < input.length; i++) {
    console.log(i + 1 + '.\t Input array:', input[i])
    const result = countWays(input[i])
    console.log('\t Result is', result)
    console.log('-'.repeat(100))
  }
}

main()
