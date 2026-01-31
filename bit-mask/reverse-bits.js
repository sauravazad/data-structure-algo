/*
Problem link : https://leetcode.com/problems/reverse-bits
------------------------------------------------------------------------------------
Description: 190. Reverse Bits
Reverse bits of a given 32 bits signed integer.

------------------------------------------------------------------------------------
Example:

Example 1:

Input: n = 43261596

Output: 964176192

Explanation:
Integer	Binary
43261596	00000010100101000001111010011100
964176192	00111001011110000010100101000000

Example 2:

Input: n = 2147483644

Output: 1073741822

Explanation:
Integer	Binary
2147483644	01111111111111111111111111111100
1073741822	00111111111111111111111111111110

------------------------------------------------------------------------------------
Input:

------------------------------------------------------------------------------------
Constraints:

    0 <= n <= 231 - 2
    n is even.

------------------------------------------------------------------------------------

*/

/**
 Intuition: use  module and division to set the bits in reverse order in new string
 Time Complexity:
 Space Complexity:
 Notes:
 */

function get32BitBinary (n) {
  /* JS stores any number as signed integer , which will cause problems with binary arithmetics .
   So always convert the signed integer (negative) to unsigned (2's complement= reverse the bits and add 1) .
   Now the number is in unsigned 32 bit representation
   */
  return (n >>> 0).toString(2).padStart(32, '0')
}
const reverseBitsSimple = function (n) {
  let x = ''
  // console.info(`number: ${(n).toString(2)}`)
  while (n) {
    x += n % 2
    n = parseInt(n / 2)
  }

  // console.info(`reversed: ${x}`)
  return parseInt(x.padEnd(32, 0), 2)
}

const reverseBits = function (n) {
  /**
   Intuition: the number is 32 bit , so we have to take the bit value from i position
   set to the N - i on the reverse string
   */
  let rev = 0
  let bit = 31

  while (n) {
    // get the ith bit and use << to set the reverse position : for 0 set it to 31
    rev |= (n & 1) << bit
    n = n >> 1 // move to right to clear the bit at 0
    bit--
  }
  return rev
}
// Driver code

const main = function () {
  const fn = reverseBits
  const input = [43261596, 2147483644]
  const expectedOutput = [964176192, 1073741822]
  /**
   *  Fill the time complexity for each function
   */

  for (let i = 0; i < input.length; i++) {
    console.log(i + 1 + '.\t Input array: \t', input[i])
    const result = fn(input[i])
    console.log('\t Result is \t: ', result)
    console.log('-'.repeat(100))
  }
}

main()
