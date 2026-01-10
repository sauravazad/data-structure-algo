/**
  https://leetcode.com/problems/delete-operation-for-two-strings

  Given two strings word1 and word2, return the minimum number of steps required to make word1 and word2 the same.

  In one step, you can delete exactly one character in either string.
 */
const findLCS = (s1, s2) => {
  const dp = [...Array(s1.length+1)].map(() => Array(s2.length+1).fill(0))

  for(let i = 1; i <= s1.length; i++) {
    for(let j = 1; j <= s2.length; j++) {
      if(s1[i-1]=== s2[j-1]) {
        dp[i][j] = 1 + dp[i-1][j-1]
      }else {
        dp[i][j] = Math.max(dp[i][j-1], dp[i-1][j])
      }
    }
  }
  const lcs = dp[s1.length][s2.length]
  const total = s1.length - lcs + s2.length - lcs
  return total
}

  // Driver code
  var main = function () {
    const input = [
      ['sea', 'eat'],
      ['leetcode', 'etco']
    ]
    /**
     *  Fill the time complexity for each function
     */

    for (var i = 0; i < input.length; i++) {
        console.log(i + 1 + ".\t Input array:", input[i]);
        var result = findLCS(input[i][0], input[i][1]);
        console.log("\t Result is",result);
        console.log("-".repeat(100));
    }
  }

  main();