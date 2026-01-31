'''
Problem link : https://leetcode.com/problems/duplicate-integer/

------------------------------------------------------------------------------------
Description:217. Contains Duplicate
Given an integer array nums, return true if any value appears at least twice in the array, and return false if every element is distinct.

------------------------------------------------------------------------------------
Input:
Example 1:

Input: nums = [1,2,3,1]

Output: true

Explanation:

The element 1 occurs at the indices 0 and 3.

Example 2:

Input: nums = [1,2,3,4]

Output: false

Explanation:

All elements are distinct.

Example 3:

Input: nums = [1,1,1,3,3,4,3,2,4,2]

Output: true

 
------------------------------------------------------------------------------------
Constraints:

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
  def containsDuplicate(self, nums: List[int]) -> bool:
    hashMap = defaultdict(lambda: False)
    hasDuplicates = False
    for num in nums:
      if hashMap[num] == True:
        hasDuplicates = True
        break
      else:
        hashMap[num] = True
    return hasDuplicates
        

if __name__ == '__main__':
  '''
    Driver function to execute the function with inputs
  '''
  solution = Solution()
  fn = solution.containsDuplicate
  input = [
    [1,2,3,1],
    [1,2,3,4]
  ]
  for i in input:
    print( ".\t Input array: \t", *i)
    result = fn(i)
    print('\t Result is \t: ', result)
    print("-" * 100)
  