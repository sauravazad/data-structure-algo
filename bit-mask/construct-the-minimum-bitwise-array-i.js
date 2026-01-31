/*
Problem link : https://leetcode.com/problems/construct-the-minimum-bitwise-array-i
------------------------------------------------------------------------------------
Description:  3314. Construct the Minimum Bitwise Array I

You are given an array nums consisting of n prime integers.

You need to construct an array ans of length n, such that, for each index i, the bitwise OR of ans[i] and ans[i] + 1 is equal to nums[i],
i.e. ans[i] OR (ans[i] + 1) == nums[i].

Additionally, you must minimize each value of ans[i] in the resulting array.

If it is not possible to find such a value for ans[i] that satisfies the condition, then set ans[i] = -1.

------------------------------------------------------------------------------------
Example:

Example 1:

Input: nums = [2,3,5,7]

Output: [-1,1,4,3]

Explanation:

    For i = 0, as there is no value for ans[0] that satisfies ans[0] OR (ans[0] + 1) = 2, so ans[0] = -1.
    For i = 1, the smallest ans[1] that satisfies ans[1] OR (ans[1] + 1) = 3 is 1, because 1 OR (1 + 1) = 3.
    For i = 2, the smallest ans[2] that satisfies ans[2] OR (ans[2] + 1) = 5 is 4, because 4 OR (4 + 1) = 5.
    For i = 3, the smallest ans[3] that satisfies ans[3] OR (ans[3] + 1) = 7 is 3, because 3 OR (3 + 1) = 7.

Example 2:

Input: nums = [11,13,31]

Output: [9,12,15]

Explanation:

    For i = 0, the smallest ans[0] that satisfies ans[0] OR (ans[0] + 1) = 11 is 9, because 9 OR (9 + 1) = 11.
    For i = 1, the smallest ans[1] that satisfies ans[1] OR (ans[1] + 1) = 13 is 12, because 12 OR (12 + 1) = 13.
    For i = 2, the smallest ans[2] that satisfies ans[2] OR (ans[2] + 1) = 31 is 15, because 15 OR (15 + 1) = 31.

------------------------------------------------------------------------------------
Input:

------------------------------------------------------------------------------------
Constraints:

Constraints:

    1 <= nums.length <= 100
    2 <= nums[i] <= 1000
    nums[i] is a prime number.

------------------------------------------------------------------------------------

*/

/**
 Intuition:
  Observation : you cannot satisfy the condition x | (x+ 1) = n ; where n is a event number
  ie: 4 = 100 in order to satisfy x | (x+ 1) = n ; x  | x+ 1 has to be a even number but that is not mathematically possible even +1 is always odd
  Also the x cannot be greater than n it self . because binary OR on x and x+1  has to be equal to n.

  when n is odd :
  n = 3 = 011
  n = 5 = 101
  n = 7 = 111
  n = 9 = 1001
  n = 11 = 1011
  n = 13 = 1101
  n = 17 = 10001
  n = 19 = 10011
  n = 21 = 10101
  n = 23 = 11001

 NOTE: the least significant bit is always 1 for odd number.

 n = 3  lets try to find the optimal x :  x | ( x+ 1) = n

 x = 1 = 01  x+1 = 2 = 10

       01
    OR 10
    =  11

lets another n = 19  = 10011

x = 17 =  10001 x+1 = 18 = 10010
        10001
    OR  10010
    =   10011 (17)

Observation : the x is a number whose binary representation is of pattern which always ends in 1 ie: ...0111.
another observation is when we add 1 , it would only affect the characters at LSB to the first 0 , flipping it
and when performing Binary OR , the bits before first 0 suffix  bit leading to 1 are unchanged .
So in order to the possible x we only need to look at the bits after first zero bit from left to right

ie: xxx011 : we are interested in > 011
Now to get the minimum we can minimize these bits . Simple way of doing so would be right shift(divides by 2) converting it to 001

 Observe the pattern of bits when you do x+1 OR x  to get the number

 Time Complexity: O(nlogm).
 Space Complexity: O(1)
 Notes:
 */
const minBitwiseArray = function (nums) {
  const result = []

  for (let i = 0; i < nums.length; i++) {
    let num = nums[i]
    // check if the number is even if so fill -1
    if (num % 2 === 0) {
      result.push(-1)
    } else {
      let mask = 0
      while (((num >> mask) & 1) != 0) { // until we encounter the 0 bit
      // increase the bit position
        mask++
      }
      // move the d-1 th bit to right by 1 and subtract to get the flipped bit at the position
      // essentially we are subtracting 2^bit_count -1 so that the bit is flipped
      num = num - (1 << mask - 1)
      result.push(num)
    }
  }
  return result
}
// Driver code

const main = function () {
  const fn = minBitwiseArray
  const input = [
    [2, 3, 5, 7],
    [11, 13, 31]
  ]
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
