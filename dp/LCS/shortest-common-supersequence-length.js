/**
  https://leetcode.com/problems/shortest-common-supersequence/description/
 */

  const shortestCommonSupersequence = (s1, s2) => {
    const dp = [...Array(s1.length)].map(() => Array(s2.length).fill(-1))
    return shortestCommonSupersequenceBottomUp(s1, s2, 0, 0, dp)
  }

  const shortestCommonSupersequenceRec = (s1, s2, index1, index2) => {
    // if one of the string has reached the end return the remaining length of other string
    if(index1 >= s1.length) {
      return s2.length - index2
    }
    if(index2 >= s2.length) {
      return s1.length - index1
    }
    /**
     * Algo
     * There can be two scenario
     * 1. the character matches : call the method recursively by incrementing both the indices
     * 2. get the max of the recursive call with fixing one index and increasing other index for both the strings
     */
    let min
    if(s1[index1] === s2[index2]) {
      min = 1 + shortestCommonSupersequenceRec(s1, s2, index1+1 , index2+1)
    } else {
      let s1Fixes = shortestCommonSupersequenceRec(s1, s2, index1 , index2+1)
      let s2Fixes = shortestCommonSupersequenceRec(s1, s2, index1 + 1 , index2)
      min = 1 + Math.min(s1Fixes, s2Fixes)
    }
    return min
  }

  const shortestCommonSupersequenceTopDown = (s1, s2, index1, index2, dp) => {
    if(index1 >= s1.length) {
      return s2.length - index2
    }
    if(index2 >= s2.length) {
      return s1.length - index1
    }
    if(dp[index1][index2] === -1) {
      // if character matches
      let min
      if(s1[index1] === s2[index2]) {
        min = shortestCommonSupersequenceTopDown(s1, s2, index1 +1 , index2 + 1, dp)
      } else {
        min = Math.min(
          shortestCommonSupersequenceTopDown(s1, s2, index1 +1 , index2, dp),
          shortestCommonSupersequenceTopDown(s1, s2, index1 , index2 + 1, dp)
        )
      }
      dp[index1][index2] = 1 + min
    }
    return dp[index1][index2]
  }

const shortestCommonSupersequenceBottomUp = (s1, s2) => {
  const dp = [...Array(s1.length+1)].map(() => Array(s2.length+1).fill(0))
  // fill the 0th row and column to cater for base case where one of the string is small
  for(let i = 0 ; i < s1.length + 1; i++) {
    dp[i][0] = i
  }
  for(let j = 0 ; j < s2.length + 1; j++) {
    dp[0][j] = j
  }

  for(let i = 1; i <= s1.length; i++) {
    for(let j = 1; j <= s2.length; j++) {
      if(s1[i -1]=== s2[j-1]) {
        dp[i][j] = 1 + dp[i-1][j-1]
      } else {
        dp[i][j] = 1 + Math.min(dp[i-1][j],dp[i][j -1])
      }
    }
  }
  return dp[s1.length][s2.length]
}

  // Driver code
  var main = function () {
    const input = [
      ['abac', 'cab'],
      // ['dynamic', "programming"],
      // ['abcd', "efgh"],
      // ['educativeisfun', "algorithmsarefun"],
      // ['cpprocks', "cppisfun"],
      // ['abcf', "bdcf"],
    ]
    // input.push(["iloveprogrammingbutprogrammingdoesnotloveme", "computersarefastprogrammerskeepthemslow"])
    /**
     *  Fill the time complexity for each function
     */

    for (var i = 0; i < input.length; i++) {
        console.log(i + 1 + ".\t Input array:", input[i]);
        var result = shortestCommonSupersequence(input[i][0], input[i][1]);
        console.log("\t Result is",result);
        console.log("-".repeat(100));
    }
  }

  main();