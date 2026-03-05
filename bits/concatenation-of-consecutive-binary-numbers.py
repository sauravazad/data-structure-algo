'''
Problem link : https://leetcode.com/problems/concatenation-of-consecutive-binary-numbers

------------------------------------------------------------------------------------
Description:1680. Concatenation of Consecutive Binary Numbers
Given an integer n, return the decimal value of the binary string formed by concatenating the binary representations of 1 to n in order, modulo 109 + 7.

------------------------------------------------------------------------------------
Example 1:

Input: n = 1
Output: 1
Explanation: "1" in binary corresponds to the decimal value 1. 

Example 2:

Input: n = 3
Output: 27
Explanation: In binary, 1, 2, and 3 corresponds to "1", "10", and "11".
After concatenating them, we have "11011", which corresponds to the decimal value 27.

Example 3:

Input: n = 12
Output: 505379714
Explanation: The concatenation results in "1101110010111011110001001101010111100".
The decimal value of that is 118505380540.
After modulo 109 + 7, the result is 505379714.

------------------------------------------------------------------------------------
Constraints:
1 <= n <= 105
------------------------------------------------------------------------------------
'''
from typing import List
class Solution:
  '''
   Time Complexity: 
   Space Complexity:
   Intuition: 
    contamination of number can simulated using binary operation << and |
    eg: concatenate binary of 4 to 3 
    3 = 11
    4 = 100
    result = 11100
    using binary left shift we can move the bits to left by number of character in binary of 4 and perform and bi or | to get the result
    ie: 
    3(11)<<(binary string length of 4 = 3) | 4
    (11 << 3) | 4 = 11000 | 100 = 11100

    Note: how to count the max number of bits required to represent a decimal number in binary ?
    ans : A new bit is required when with every power of 2 
    ie:
    number  bits required for representation 
      1   =    2^0 = 1 bit
      3   =    2^1 = 2 bits
      4   =    2^2 = 3 bits

      
    track power of 2 : (n & (n - 1)) == 0

    Maths: Division and multiplication can be performed on individual value  or sum of values it will still be the same
    ie: (2+3+4) / 99 or 2/99 + 3 /99 + 4/99 are equal


  '''
  def concatenatedBinaryMath(self, n: int) -> int:
    mod = 10**9 + 7
    ans = 0
    bit_req = 1
    for i in range(n+1):
      #  for every number convert  to binary and add the binary represent to the current ans either using maths ort bit
      binStr = bin(i)[2:]
      for ch in binStr:
        #  for each char add it ot the ans 
        ans = ((ans * 2) + int(ch)) % mod
    return ans
  
  def concatenatedBinary(self, n: int) -> int:
    '''
    Time Complexity: O(N)
    Space Complexity: O(1)
    '''
    mod = 10**9 + 7
    ans = 0
    bit_req = 0
    for i in range(1, n+1):
    #   # using binary left shift we can move the bits to left by number of character in binary of 4 and perform and bi or | to get the result
    # ie: 
    # 3(11)<<(binary string length of 4 = 3) | 4
    # (11 << 3) | 4 = 11000 | 100 = 11100
      # when poser of 2 increment the bit required 
      if (i & i -1 == 0): 
        bit_req+=1
      ans =  (ans << bit_req | i )% mod
    return ans

if __name__ == '__main__':
  '''
    Driver function to execute the function with inputs
  '''
  solution = Solution()
  fn = solution.concatenatedBinary
  input = [1, 3, 12]
  for i in input:
    print( ".\t Input array: \t", i)
    result = fn(i)
    print('\t Result is \t: ', result)
    print("-" * 100)
  