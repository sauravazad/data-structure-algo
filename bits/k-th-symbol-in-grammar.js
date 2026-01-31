const assert = require('assert')
// https://leetcode.com/problems/k-th-symbol-in-grammar

const kthGrammar = function (n, k) {
/**
  0                 row 1 (i=0)
  01                row 2 (i=1)
  0110              row 3 (i=2)
  01101001          row 4 (i=3)
  01101001 10010110  row 5 (i=4)
*/

  let ans = 0 // first position n any row is zero
  // Calculate the total number of elements in the nth row, which is 2^(n-1).
  let total = Math.pow(2, n - 1)

  while (total != 1) {
    total = parseInt(total / 2)

    // if k > n the it lies in the right half flip the ans

    if (k > total) {
      k -= total // move the k to left half at the mirror position
      ans = 1 - ans
    }
  }

  return ans
}

// Driver code
const main = function () {
  const fn = kthGrammar
  const input = [
    [1, 1],
    [2, 1],
    [2, 2]
  ]

  const output = [
    0, 0, 1
  ]
  /**
   *  Fill the time complexity for each function
   */

  for (let i = 0; i < input.length; i++) {
    console.log(i + 1 + '.\t Input array: \t', input[i])
    const result = fn(...input[i])
    console.log('\t Result is \t: ', result)
    console.log('-'.repeat(100))
    assert.equal(result, output[i])
  }
}

main()
