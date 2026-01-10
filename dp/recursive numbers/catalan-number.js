/**
https://mathworld.wolfram.com/CatalanNumber.html
https://leetcode.com/problems/unique-binary-search-trees/description/
https://brilliant.org/wiki/catalan-numbers/
https://codeforces.com/blog/entry/87585

Application
  - Dyk's path
  - The number of valid parenthesis expressions that consist of  n right parentheses and n left parentheses is equal to the n'th Catalan number.
  - Restricted random walks:

Note: The Catalan numbers readily appear in many interesting counting problems.

- The number of ways to put parentheses around n numbers for multiplication.
- The number of paths to climb up a 2n x 2n grid without going above the diagonal.
- The number of possible binary trees with n leaf nodes.

𝐶𝑛+1 = ∑𝑖=0𝑛 𝐶𝑖𝐶𝑛−𝑖,  𝑛≥0;  𝐶0=1

C(0)*C(n-1) + C(1)*C(n-2) ... + C(n-1)*C(0)
*/


const compute = (n) => {
  // 3^n
  if(n === 0) return 1
  let sum = 0
  for(let i = 0 ; i < n; i++) {
    sum += compute(i) * compute(n -i -1)
  }
  return sum
}

const computeBottomUp = (n) => {
  const dp = new Array(n +1).fill(0)
  // base case
  dp[0] = 1
  for(let i = 1; i <= n ; i++) {
     // iterate from 0 to i; according to formula of catalan i.e.
    // C0*Ci + C1*Ci-1 + ... Ci*C0
    for(let j = 0; j < i; j++) {
      dp[i] += dp[j] * dp[i - j -1]
    }
  }
  return dp[n]
}

// Driver code
var main = function () {
  const input = [4,6]
  /**
   *  Fill the time complexity for each function
   */

  for (var i = 0; i < input.length; i++) {
      console.log(i + 1 + ".\t Input array:", input[i]);
      var result = computeBottomUp(input[i]);
      console.log("\t Result is",result);
      console.log("-".repeat(100));
  }
}

main();