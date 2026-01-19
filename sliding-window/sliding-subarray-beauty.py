'''
Problem link : https://leetcode.com/problems/

------------------------------------------------------------------------------------
Description:

Given an integer array nums containing n integers, find the beauty of each subarray of size k.

The beauty of a subarray is the xth smallest integer in the subarray if it is negative, or 0 if there are fewer than x negative integers.

Return an integer array containing n - k + 1 integers, which denote the beauty of the subarrays in order from the first index in the array.

 A subarray is a contiguous non-empty sequence of elements within an array.


------------------------------------------------------------------------------------
Example:
Example 1:

Input: nums = [1,-1,-3,-2,3], k = 3, x = 2
Output: [-1,-2,-2]
Explanation: There are 3 subarrays with size k = 3. 
The first subarray is [1, -1, -3] and the 2nd smallest negative integer is -1. 
The second subarray is [-1, -3, -2] and the 2nd smallest negative integer is -2. 
The third subarray is [-3, -2, 3] and the 2nd smallest negative integer is -2.

Example 2:

Input: nums = [-1,-2,-3,-4,-5], k = 2, x = 2
Output: [-1,-2,-3,-4]
Explanation: There are 4 subarrays with size k = 2.
For [-1, -2], the 2nd smallest negative integer is -1.
For [-2, -3], the 2nd smallest negative integer is -2.
For [-3, -4], the 2nd smallest negative integer is -3.
For [-4, -5], the 2nd smallest negative integer is -4. 

Example 3:

Input: nums = [-3,1,2,-3,0,-3], k = 2, x = 1
Output: [-3,0,-3,-3,-3]
Explanation: There are 5 subarrays with size k = 2.
For [-3, 1], the 1st smallest negative integer is -3.
For [1, 2], there is no negative integer so the beauty is 0.
For [2, -3], the 1st smallest negative integer is -3.
For [-3, 0], the 1st smallest negative integer is -3.
For [0, -3], the 1st smallest negative integer is -3.

------------------------------------------------------------------------------------
Constraints:


    n == nums.length 
    1 <= n <= 105
    1 <= k <= n
    1 <= x <= k 
    -50 <= nums[i] <= 50 


------------------------------------------------------------------------------------
'''
from collections import defaultdict
from typing import List
class Solution:
  '''
   Time Complexity: 
   Space Complexity:
   Intuition: 
  '''
  def getSubarrayBeauty(self, nums: List[int], k: int, x: int) -> List[int]:
    # 
    left: int = 0
    ans: List[int] = []
    frequency = defaultdict(lambda: 0) # return 0 if the key is not found
    for right, elem in enumerate(nums):
      # print("right", right, elem)
      #  increment the value of element if < 0 for beauty 
      if elem < 0 : frequency[elem] += 1
      
      #  if the window is achieved find beauty element
      if right - left + 1 == k:
        # print('window achieved',k , left , right)
        beauty: int = 0
        count: int = 0
        # iterate through 50 to 1 to find the beauty element
        for index in range(50, 0, -1):
          # print("index is ", -index, "freq is", frequency[-index])
          count += frequency[-index]
          #  if the count of freq is >= x the then we have found the element , break
          if count >= x:
            beauty = -index
            # print('found at index ', -index)
            break
        
        # print('beauty is ', beauty)
        ans.append(beauty)
        # reduce the left pointer element frequency and move the left pointer 
        if nums[left] < 0 : 
          frequency[nums[left]] -= 1
        left+=1
    # print(frequency)    
    return ans
    
        

if __name__ == '__main__':
  '''
    Driver function to execute the function with inputs
  '''
  solution = Solution()
  fn = solution.getSubarrayBeauty
  input = [
    [[1,-1,-3,-2,3], 3, 2],
    [[-1,-2,-3,-4,-5], 2, 2],
    [[-3,1,2,-3,0,-3], 2, 1],
  ]
  for i in input:
    print( ".\t Input array: \t", *i)
    result = fn(i[0], i[1], i[2])
    print('\t Result is \t: ', result)
    print("-" * 100)
  