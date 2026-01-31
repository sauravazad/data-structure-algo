'''
Problem link : https://leetcode.com/problems/two-sum

------------------------------------------------------------------------------------
Description:Two Sum
Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.

You may assume that each input would have exactly one solution, and you may not use the same element twice.

You can return the answer in any order.

------------------------------------------------------------------------------------
Example:

Example 1:

Input: nums = [2,7,11,15], target = 9
Output: [0,1]
Explanation: Because nums[0] + nums[1] == 9, we return [0, 1].

Example 2:

Input: nums = [3,2,4], target = 6
Output: [1,2]

Example 3:

Input: nums = [3,3], target = 6
Output: [0,1]


------------------------------------------------------------------------------------
Constraints:

    2 <= nums.length <= 104
    -109 <= nums[i] <= 109
    -109 <= target <= 109
    Only one valid answer exists.


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
  def twoSum(self, nums: List[int], target: int) -> List[int]:
    '''
    Build a Hash map of the value corresponding to its index
    '''
    ans = []
    hash = defaultdict(lambda: -1)
      
    for index in range(len(nums)):
      num = nums[index]
      other = target - num
      if hash[other] != -1:
        return[index, hash[other]]
      hash[nums[index]] = index
		

if __name__ == '__main__':
  '''
	Driver function to execute the function with inputs
  '''
  solution = Solution()
  fn = solution.twoSum
  input = [
	  [[2,7,11,15], 9],
    [[3,2,4], 6],
    [[3,3,], 6]
  ]
  for i in input:
    print( ".\t Input array: \t", *i)
    result = fn(i[0], i[1])
    print('\t Result is \t: ', result)
    print("-" * 100)
  