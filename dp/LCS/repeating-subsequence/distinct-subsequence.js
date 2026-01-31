/**
https://leetcode.com/problems/distinct-subsequences/
 */

const print2DMatrix = (matrix) => {
  const length = matrix[0].length - 1
  console.info('_____'.repeat(length))
  for (let i = 0; i < matrix.length; i++) {
    console.info('| ' + matrix[i].join(' | ') + ' |')
  }
  console.info('-----'.repeat(length))
}
const numberOfSubsequences = (s1, s2) => {
  const dp = [...Array(s1.length)].map(() => Array(s2.length).fill(-1))
  const result = numberOfSubSequencesBottomUp(s1, s2, 0, 0, dp)
  return result
}

const numberOfSubsequencesRec = (s1, s2, i1, i2, dp) => {
  // base case if we have exceeded the index of s2 that means we have found a match
  if (i2 >= s2.length) return 1
  // if we have exceeded the s1 strings bound then we did not find a match hence return zero
  if (i1 >= s1.length) return 0
  if (dp[i1][i2] === -1) {
    let result = 0

    if (s1[i1] === s2[i2]) {
      result += numberOfSubsequencesRec(s1, s2, i1 + 1, i2 + 1, dp) // increment both pointer
      result += numberOfSubsequencesRec(s1, s2, i1 + 1, i2, dp) // increment s1 pointer as we want to check if there are other subsequences
    } else {
      result += numberOfSubsequencesRec(s1, s2, i1 + 1, i2, dp)
    }
    dp[i1][i2] = result
  }
  return dp[i1][i2]
}

const numberOfSubSequencesBottomUp = (s, t) => {
  // for visualization of DP matrix check this https://www.educative.io/courses/grokking-dynamic-programming-a-deep-dive-using-javascript/g79PVVPEPyZ
  const dp = [...Array(t.length + 1)].map(() => Array(s.length + 1).fill(0))
  // fill the base cases
  // a character from the s can always be converted to "" hence the row 1 is set to 1
  for (let i = 0; i <= s.length; i++) {
    dp[0][i] = 1
  }
  // similarly  col 0  represents empty string and it can never be converted to match the target
  // for(let j = 1; j <= t.length; j++) {
  //   dp[j][0] = 0
  // }
  for (let i = 1; i <= t.length; i++) {
    for (let j = 1; j <= s.length; j++) {
      if (s[j - 1] === t[i - 1]) {
        dp[i][j] = dp[i - 1][j - 1] + dp[i][j - 1]
      } else {
        dp[i][j] = dp[i][j - 1]
      }
    }
  }
  return dp[t.length][s.length]
}
// Driver code
const main = function () {
  input1Strings = ['babgbag', '', 'a', 'caat', 'a', '', 'rabbbit', 'dawawg', 'programming', 'googlegoogle', 'wowowl']
  input2Strings = ['bag', '', 'a', 'cat', '', 'a', 'rabbit', 'aw', 'ram', 'gogl', 'owl']

  // you can uncomment the lines below and check how this recursive solution causes a time-out

  // input1Strings.push("ababababababababababababababababababababababababababababababababababababababababababab")
  // input2Strings.push("abababababababababababababababab")

  for (let i = 0; i < 4; i++) {
    console.log(i + 1 + '.\tString 1: ' + input1Strings[i])
    console.log('\tString 2: ' + input2Strings[i])
    const result = numberOfSubsequences(input1Strings[i], input2Strings[i])
    console.log('\tNumber of distinct subsequences: ' + result)
    console.log('-'.repeat(100) + '\n')
  }
}

main()
