/*
Problem link : https://leetcode.com/problems/minimum-deletions-to-make-string-balanced/
------------------------------------------------------------------------------------
Description: 1653. Minimum Deletions to Make String Balanced
You are given a string s consisting only of characters 'a' and 'b'​​​​.

You can delete any number of characters in s to make s balanced. s is balanced if there is no pair of indices (i,j) such that i < j and s[i] = 'b' and s[j]= 'a'.

Return the minimum number of deletions needed to make s balanced.

------------------------------------------------------------------------------------
Example:
Example 1:

Input: s = "aababbab"
Output: 2
Explanation: You can either:
Delete the characters at 0-indexed positions 2 and 6 ("aababbab" -> "aaabbb"), or
Delete the characters at 0-indexed positions 3 and 6 ("aababbab" -> "aabbbb").

Example 2:

Input: s = "bbaaaaabb"
Output: 2
Explanation: The only solution is to delete the first two characters.

------------------------------------------------------------------------------------
Input:

------------------------------------------------------------------------------------
Constraints:

    1 <= s.length <= 105
    s[i] is 'a' or 'b'​​.


------------------------------------------------------------------------------------

*/

/**
 Intuition: to make a string balanced , think about splitting it at a position so that there are all `a` before and including it and all `b` after it
 Now we can simply count the number of `b` in the left side and number of a in the right side sum it up and get the minimum of all the index splits.

 Now in order to do an efficient count we can use prefix and postfix c count for a : prefix and b
 Time Complexity: O(N)
 Space Complexity: O(N)
 Notes: 
 */
var minimumDeletions = function(s) {
  const N = s.length -1
  const prefix = Array(N+1).fill(0)
  const postfix = Array(N+1).fill(0)
  let prefixb = 0
  let postfixa = 0
  
  for(let i = 0; i <=N; i++) {
    prefix[i] = prefixb
    if(s[i]=== 'b') prefixb++
  }
  for (let j=N; j>=0;j--) {
    postfix[j] = postfixa
    if(s[j] === 'a') postfixa++
    
  }
  let min = Number.MAX_SAFE_INTEGER
  for(let i = 0; i <= N;i++) {
    min = Math.min(min, prefix[i] + postfix[i])
  }

    // console.info(`prefixB`, prefix)
    // console.info(`postFixA`, postfix)
    return min
};


/**
  Intuition: we can use DP as there is a re occurring problem of using previous deletion to current deletion count
  dp[i+1] = Min(b_count, DP[i] + 1) // either we take 'a' or remove 'a'
  take 'a': that means the count of b's that has to be removed up until now
  don't take 'a' : that means deletions propr to current index + 1
  dp[i + 1] = min(dp[i] + 1, b_count)
 Time Complexity: O(N)
 Space Complexity: O(N)
 */
var minimumDeletionsDP = (s) => {
  const N = s.length
  const dp = Array(N+1).fill(0)
  let bCount = 0
  for(let i = 0 ; i < N; i++) {
    if(s[i] === 'b') {
      dp[i+1] = dp[i]
      bCount++
    } else  {
      dp[i+1] = Math.min(bCount, dp[i] + 1)
    }
  }
  return dp[N]
}
// Driver code
 

var main = function () {
  const fn = minimumDeletionsDP
  const input = [
    "aababbab",
    "bbaaaaabb",
    "aaaaaabbbbabaaaabbabaaabbabbbaaabababaaaaaaabbaaabaaababaaabababa"
  ]
  const expected = [2,2]
  /**
   *  Fill the time complexity for each function
   */

  for (var i = 0; i < input.length; i++) {
      console.log(i + 1 + ".\t Input array: \t", input[i]);
      var result = fn(input[i]);
      console.log("\t Result is \t: ",result);
      console.log("-".repeat(100));
  }
}

main();