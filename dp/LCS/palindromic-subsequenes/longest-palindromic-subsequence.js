/**
https://leetcode.com/problems/longest-palindromic-subsequence/
 */
const longestPalindromicSubsequence =(str) =>{
  const result = longestPalindromicSubsequenceDp2DArray(str)
  return result
}

const longestPalindromicSubsequenceDpMatrix = (str) => {
  /**
   * Basic idea is to calculate the largest common subsequence between the actual string and reverse of the string
   */
  const actual = str
  const reverse = str.split("").reverse().join("")
  const dp = [...Array(actual.length+1)].map(() => Array(reverse.length+1).fill(""))
  for(let i = 1; i <= actual.length; i++) {
    for(let j =1; j <= reverse.length; j++) {
      if(actual[i-1] === reverse[j-1]) {
        dp[i][j] = dp[i -1][j-1] + reverse[j-1]
      } else {
        dp[i][j] = dp[i-1][j].length  > dp[i][j-1].length ? dp[i-1][j] : dp[i][j-1]
      }
    }
  }
  return dp[str.length][str.length]
}


const longestPalindromicSubsequenceDp2DArray = (str) => {
  /**
   * Basic idea is to calculate the largest common subsequence between the actual string and reverse of the string
   */
  const actual = str
  const reverse = str.split("").reverse().join("")
  const dp = [...Array(2)].map(() => Array(str.length + 1).fill(""))

  for(let i = 1; i <= actual.length; i++) {
    for(let j =1; j <= reverse.length; j++) {
      if(actual[i-1] === reverse[j-1]) {
        dp[1][j] = dp[0][j-1] + reverse[j-1]
      } else {
        dp[1][j] = dp[0][j].length  > dp[1][j-1].length ? dp[0][j] : dp[1][j-1]
      }
    }
    dp[0] = dp[1]
    dp[1] = Array(str.length + 1).fill("")
  }
  return dp[0][str.length]
}
// Driver code
var main = function () {
  let strings = ['cddpd', 'abdbca','racecar','pqr'];

  // You can uncomment the lines below and check how this recursive solution causes a time-out

  strings.push('aeqirradarqwruifdfgdtrrrraaadddaqweraarrr')

  for (let i = 0; i < strings.length; i++) {
      console.log(
          `${i + 1}. The length of the longest palindromic subsequence in '${
              strings[i]
          }' is: `,
          longestPalindromicSubsequence(strings[i])
      );
      console.log("-".repeat(100));
  }
}

main();