'''
Problem link : https://leetcode.com/problems/valid-anagram/

------------------------------------------------------------------------------------
Description:242. Valid Anagram
Given two strings s and t, return true if t is an anagram of s, and false otherwise.

------------------------------------------------------------------------------------
Examples:
Example 1:

Input: s = "anagram", t = "nagaram"

Output: true

Example 2:

Input: s = "rat", t = "car"

Output: false

 

------------------------------------------------------------------------------------
Constraints:

    1 <= s.length, t.length <= 5 * 104
    s and t consist of lowercase English letters.


------------------------------------------------------------------------------------
'''
from typing import List
from collections import defaultdict
class Solution:
  '''
   Time Complexity: 
   Space Complexity:
   Intuition: 
  '''
  def isAnagram(self, s: str, t: str) -> bool:
    ans = True
    sFreqMap = defaultdict(lambda: 0)
    tFreqMap = defaultdict(lambda: 0)
    N = len(s)
    if len(t) != N:
      return False
    for i in range(N):
      sFreqMap[s[i]] += 1
      tFreqMap[t[i]] += 1
    if sFreqMap != tFreqMap: 
      ans = False
    return ans

if __name__ == '__main__':
  '''
    Driver function to execute the function with inputs
  '''
  solution = Solution()
  fn = solution.isAnagram
  input = [
    ["anagram", "nagaram"],
    ["rat", "car"],
  ]
  for i in input:
    print( ".\t Input array: \t", *i)
    result = fn(i[0], i[1])
    print('\t Result is \t: ', result)
    print("-" * 100)
  