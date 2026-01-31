/**
https://mathworld.wolfram.com/PascalsTriangle.html
https://leetcode.com/problems/pascals-triangle/

Given an integer numRows, return the first numRows of Pascal's triangle.
 */

const generateLine = (n) => {
  if (n == 1) return [1]
  const lines = [1]
  const previous = generateLine(n - 1)
  for (let i = 0; i < previous.length - 1; i++) {
    lines[i + 1] = previous[i] + previous[i + 1]
  }
  lines[lines.length] = 1
  return lines
}

const generate = (n) => {
  // return generateLine(n)
  const pyramid = []
  for (let l = 1; l <= n; l++) {
    pyramid.push(generateLine(l))
  }
  // console.info(pyramid)
  return pyramid
}

const generateTopDown = (n) => {
  const dp = [...Array(n)].map((v, i) => {
    const a = Array(i)
    a[0] = 1
    return a
  })

  for (let i = 1; i < n; i++) {
    for (let j = 1; j < dp[i].length; j++) {
      dp[i][j] = dp[i - 1][j - 1] + dp[i - 1][j]
    }
    dp[i].push(1)
  }
  return dp
}

// Driver code
const main = function () {
  const input = [7]
  /**
   *  Fill the time complexity for each function
   */

  for (let i = 0; i < input.length; i++) {
    console.log(i + 1 + '.\t Input array:', input[i])
    const result = generateTopDown(input[i])
    console.log('\t Result is', result)
    console.log('-'.repeat(100))
  }
}

main()
