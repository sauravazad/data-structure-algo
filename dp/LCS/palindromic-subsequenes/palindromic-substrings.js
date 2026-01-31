/**
https://leetcode.com/problems/palindromic-substrings/
 */
const countPalindromicSubstring = (str) => {
  const result = countSubstring(str)
  return result
}

const countSubstring = (str) => {
  const N = str.length
  const dp = [...Array(N)].map(() => Array(N).fill(false))

  let counter = 0

  for (let i = N - 1; i >= 0; i--) {
    for (let j = i; j < N; j++) {
      // check the string at the position
      if (str[i] === str[j]) {
        // value in table as True if we have not checked it before
        if (i + 1 >= j) dp[i][j] = true
        // otherwise fill it with the previously stored value
        else dp[i][j] = dp[i + 1][j - 1]
      }
      // update the counter
      if (dp[i][j]) counter++
    }
  }
  return counter
}
// Driver code to test the above function
function main () {
  const str1List = ['abc', 'abdbca', 'cddpd', 'pqr', 'abaab', 'aaa']
  // You can uncomment the lines below and check how this recursive solution causes a time-out
  // str1List.push("xkjkqlajprjwefilxgpdpebieswu");

  for (let i = 0; i < str1List.length; i++) {
    console.log(i + 1 + '.\tstr1: ' + str1List[i])
    console.log('\n\tCount of palindromic substrings:' + countPalindromicSubstring(str1List[i]))
    console.log('-'.repeat(100))
  }
}

main()
