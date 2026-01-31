/*
Problem link : https://leetcode.com/problems/check-if-a-string-contains-all-binary-codes-of-size-k
------------------------------------------------------------------------------------
Description: 1461. Check If a String Contains All Binary Codes of Size K

Given a binary string s and an integer k, return true if every binary code of length k is a substring of s. Otherwise, return false.
------------------------------------------------------------------------------------
Example:

Example 1:

Input: s = "00110110", k = 2
Output: true
Explanation: The binary codes of length 2 are "00", "01", "10" and "11". They can be all found as substrings at indices 0, 1, 3 and 2 respectively.

Example 2:

Input: s = "0110", k = 1
Output: true
Explanation: The binary codes of length 1 are "0" and "1", it is clear that both exist as a substring.

Example 3:

Input: s = "0110", k = 2
Output: false
Explanation: The binary code "00" is of length 2 and does not exist in the array.

------------------------------------------------------------------------------------
Input:

------------------------------------------------------------------------------------
Constraints:

------------------------------------------------------------------------------------

*/

/**
 Intuition:
 We just need to check every substring with length k until we get all the possible binary codes.
 Since there are two possible char for each place: 0 or 1, there will be 2k possible binary code.
 1<<k = number 2^k:
 If we iterate over all the window of size k and the count == 0 that means we have all teh substring of the binary string
 Time Complexity:
 Space Complexity:
 Notes:
 */
/**
 * @param {string} s
 * @param {number} k
 * @return {boolean}
 */
const hasAllCodes = function (s, k) {
  let need = 1 << k // no of binary string of size k ie: 2^k
  const got = new Set()

  for (let i = 0; i <= s.length - k; i++) {
    const sub = s.substring(i, i + k)
    if (got.has(sub) == false) {
      got.add(sub)
      need -= 1
    }
    if (need === 0) {
      return true
    }
  }
  return false
}

// Driver code

const main = function () {
  const fn = hasAllCodes
  const input = [
    ['00110110', 2],
    ['0110', 1],
    ['0110', 2]
  ]
  /**
   *  Fill the time complexity for each function
   */

  for (let i = 0; i < input.length; i++) {
    console.log(i + 1 + '.\t Input array: \t', input[i])
    const result = fn(...input[i])
    console.log('\t Result is \t: ', result)
    console.log('-'.repeat(100))
  }
}

main()
