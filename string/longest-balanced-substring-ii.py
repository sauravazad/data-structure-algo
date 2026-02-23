'''
Problem link : https://leetcode.com/problems/longest-balanced-substring-ii

------------------------------------------------------------------------------------
Description: 3714. Longest Balanced Substring II

You are given a string s consisting only of the characters 'a', 'b', and 'c'.

A substring of s is called balanced if all distinct characters in the substring appear the same number of times.

Return the length of the longest balanced substring of s.
------------------------------------------------------------------------------------
Example 1:

Input: s = "abbac"

Output: 4

Explanation:

The longest balanced substring is "abba" because both distinct characters 'a' and 'b' each appear exactly 2 times.

Example 2:

Input: s = "aabcc"

Output: 3

Explanation:

The longest balanced substring is "abc" because all distinct characters 'a', 'b' and 'c' each appear exactly 1 time.

Example 3:

Input: s = "aba"

Output: 2

Explanation:

One of the longest balanced substrings is "ab" because both distinct characters 'a' and 'b' each appear exactly 1 time. Another longest balanced substring is "ba".


------------------------------------------------------------------------------------
Constraints:

Constraints:

    1 <= s.length <= 105
    s contains only the characters 'a', 'b', and 'c'.


------------------------------------------------------------------------------------
'''
from typing import List
class Solution:
    def longestBalanced(self, s: str) -> int:
        n = len(s)
        p = [[0, 0, 0]]
        for c in s:
            p.append(p[-1][:])
            p[-1]["abc".index(c)] += 1

        ans = 0
        m = {}
        for i, (a, b, c) in enumerate(p):
            for k in [
                (-1, a - b, a - c), # a,b,c
                (-2, a - b, c),     # a,b
                (-3, b - c, a),     # b,c
                (-4, c - a, b),     # a,c
                (-5, b, c),         # a
                (-6, c, a),         # b
                (-7, a, b),         # c
            ]:
                if not k in m: m[k] = i
                else: ans = max(ans, i - m[k])
        return ans

if __name__ == '__main__':
  '''
    Driver function to execute the function with inputs
  '''
  solution = Solution()
  fn = solution.longestBalanced
  input = [
    "aabbccabc","abbac", "aabcc", "abc"
  ]
  for i in input:
    print( ".\t Input array: \t", *i)
    result = fn(i)
    print('\t Result is \t: ', result)
    print("-" * 100)
  