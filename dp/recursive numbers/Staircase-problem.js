// Driver code
const countWaysMemo = (n, dp) => {
  // base case
  if (n == 0) return 1
  if (n < 0) return 0
  if (dp.has(n)) return dp.get(n)
  const ans = countWays(n - 1) + countWays(n - 2) + countWays(n - 3)
  dp.set(n, ans)
  return ans
}

const countWaysBottomUp = (n) => {
  const dp = new Array(n + 1).fill(0)
  dp[0] = 1
  dp[1] = 1
  dp[2] = 2

  for (let i = 3; i <= n; i++) {
    dp[i] = dp[i - 1] + dp[i - 2] + dp[i - 3]
  }
  return dp[n]
}

const countWaysBottomUpOpt = (n) => {
  const map = [1, 1, 2]
  for (let i = 3; i <= n; i++) {
    const tmp2 = map[2]
    const tmp1 = map[1]
    map[2] = map[2] + map[1] + map[0]
    map[1] = tmp2
    map[0] = tmp1
  }
  return map[2]
}

const countWays = (n) => {
  const dp = new Map()
  return countWaysBottomUp(n)
}

const main = function () {
  const input = [0, 4, 3, 5, 6]
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
