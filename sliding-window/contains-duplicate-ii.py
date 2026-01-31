'''
Problem link : https://leetcode.com/problems/contains-duplicate-ii/

------------------------------------------------------------------------------------
Description:219. Contains Duplicate II
Given an integer array nums and an integer k, return true if there are two distinct indices i and j in the array such that nums[i] == nums[j] and abs(i - j) <= k.

------------------------------------------------------------------------------------
Input:
Example 1:

Input: nums = [1,2,3,1], k = 3
Output: true

Example 2:

Input: nums = [1,0,1,1], k = 1
Output: true

Example 3:

Input: nums = [1,2,3,1,2,3], k = 2
Output: false

 
------------------------------------------------------------------------------------
Constraints:


    1 <= nums.length <= 105
    -109 <= nums[i] <= 109
    0 <= k <= 105


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
  def containsNearbyDuplicate(self, nums: List[int], k: int) -> bool:
    '''
      k : window size ,
      for the window find if there are any duplicates
    '''
    left = 0
    right = 0
    frequency = defaultdict(lambda: False)
    for index, num in enumerate(nums):
      print("Num ", num,"index", index)
      ''' 
      window is <k: ie 2 to k
      so for once the window is 2 and less than equals to k check if there are duplicates
      '''
      if frequency[num] == True: 
        return True
      frequency[num] = True
      if frequency.__len__() > k: # type: ignore
        frequency.pop(nums[index - k]) # type: ignore

    return False

        

if __name__ == '__main__':
  '''
    Driver function to execute the function with inputs
  '''
  solution = Solution()
  fn = solution.containsNearbyDuplicate
  input = [
    [[1,2,3,1], 3],
    [[1,0,1,1], 1],
    [[1,2,3,1,2,3], 2]
  ]
  expected = [
    True, True, False
  ]
  for i in input:
    print( ".\t Input array: \t", *i)
    result = fn(i[0], i[1])
    print('\t Result is \t: ', result)
    print("-" * 100)
  