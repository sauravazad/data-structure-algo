/**
https://leetcode.com/problems/perfect-squares/description/

Given an integer n, return the least number of perfect square numbers that sum to n.
A perfect square is an integer that is the square of an integer; in other words, it is the product of some integer with itself. 
For example, 1, 4, 9, and 16 are perfect squares while 3 and 11 are not.

Example 1:

Input: n = 12
Output: 3
Explanation: 12 = 4 + 4 + 4.

Example 2:

Input: n = 13
Output: 2
Explanation: 13 = 4 + 9.

 */

const numberSquareRec = (n, squares) => {
  // we are solving in top down order
  if(n === 0) return 0
  let min = Infinity
  for(let i = 0; i < squares.length; i++) {
    // the value of current perfect square could be greater than target if so ignore those numbers
    if(n >= squares[i]) {
      const currentMin = 1 + numberSquareRec(n-squares[i], squares)
      min = Math.min(min, currentMin)
    }
  }
  return min
}

const numberSquareTab = (n, squares) => {
  // think of recursive top down solution . So in order to solve for n you would need to solve n-1 
  const dp = Array(n+1).fill(Infinity)
  /**
   Intution:
    to solve 
    F(0) = 0
    F(1) = Min(F(1- squares[I])) + 1 (we consumed one square)
    F(2) = Min(F(2- squares[I])) + 1 (we consumed one square)
    so the problem recurance is
    F(N) = Min(F(N-k)) + 1
    where k = squares
          N = n to reach

    Time complexity = n(outer loop) * √n (square of n) so max = O(n*√n)
    Space complexity = O(n)
   */
  // since we know the answer for base case we can fill it 
  dp[0] = 0
  dp[1] = 1
  for(let i = 2; i <= n; i++) {
    for(let j = 0; j < squares.length ; j++ ) {
      const square = squares[j]
      if (i-square >= 0) {
        dp[i] = Math.min(dp[i-square] + 1, dp[i])
      }
    }
  }
  // console.info("dp\n", dp)
  return dp[n]
}

const findPerfectSquares = (n) => {
  /**
    lets start from 
    (i = 1) 1* 1 = 1
    (i = 2) 2* 2 = 4
    (i = 3) 3* 3 = 9
    (i = 4) 4* 4 = 16
    ie: we know for the given integer the multiplication by itself leads to perfect square
   */
  let squares = []
  for(let i =1; i <= n;i++) {
    squares.push(i*i)
  }
  return squares
}

/**
 * @param {number} n
 * @return {number}
 */
var numSquares = function(n) {
  // find the perfect squares up till the number/2 : Note: think why n/2
  const squares = findPerfectSquares(parseInt(n/2 + 1))
  // now to solve the problem we just need to think these squares as coin that can lead to change
    // const result = numberSquareRec(n, squares)
    const result = numberSquareTab(n, squares)
    return result
};

// Driver code
var main = function () {
  const fn = numSquares
  const input = [12, 13]
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