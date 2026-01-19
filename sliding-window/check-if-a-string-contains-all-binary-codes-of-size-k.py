'''
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
Constraints:

  1 <= s.length <= 5 * 105
  s[i] is either '0' or '1'.
  1 <= k <= 20


------------------------------------------------------------------------------------
'''
from typing import List
class Solution:
  '''
   Time Complexity: O(N)
   Space Complexity: O(1)
   Intuition: 
  '''
  def hasAllCodes(self, s: str, k: int) -> bool:
    need = 1 << k # set the kth bit eq = 2^k
    got = [False]*need
    all_one = need - 1  # subtracting from 2^k which has only 1 bit set , will lead to all bits after it to set to 1 due to binary arithmetic
    hash_val = 0

    for i in range(len(s)):
        # calculate hash for s[i-k+1:i+1]
        '''
        eg: s="11010110" k = 3
          first substr = 110 = hash(110) = 4+2+0 = 6
          next string =   101: hash(101) = 4+0+1 = 5
          
          How to get the next string : 
            1. shift left 1 bit : 110 << 1 = 1100
            2. & with all one bits(111) check the all_one variable:   1100 && 111 = 100 (left most bit is ignored)
            3. or with the current element 100 | s[4] = 1 = 100 | 1 = 101 : that is the next substring
          
          (hash_val << 1) : << left shift will shift the bit by 1
          all_one : all bits are set
          binary & with all_one will 
        '''
        hash_val = ((hash_val << 1) & all_one) | (int(s[i]))
        # hash only available when i-k+1 > 0
        # check the window size is satisfied and if not in hash map, set it and decrease the counter
        if i >= k-1 and got[hash_val] is False:
            got[hash_val] = True
            need -= 1
            if need == 0:
                return True
    return False
        

if __name__ == '__main__':
  '''
    Driver function to execute the function with inputs
  '''
  solution = Solution()
  fn = solution.hasAllCodes
  input = [
    ["00110110", 3],
  ]
  for i in input:
    print( ".\t Input array: \t", *i)
    result = fn(i[0], i[1])
    print('\t Result is \t: ', result)
    print("-" * 100)
  