from typing import List


class Solution:
  def maximumSubarraySum(self, nums: List[int], k: int) -> int:
      ans = 0
      current_sum = 0
      begin = 0
      end = 0
      num_to_index = {}

      while end < len(nums):
          curr_num = nums[end]
          last_occurrence = num_to_index.get(curr_num, -1)
          # if current window already has number or if window is too big, adjust window
          while begin <= last_occurrence or end - begin + 1 > k:
              current_sum -= nums[begin]
              begin += 1
          num_to_index[curr_num] = end
          current_sum += nums[end]
          if end - begin + 1 == k:
              ans = max(ans, current_sum)
          end += 1
      return ans

if __name__ == '__main__':
    '''
      Driver function to execute the function with inputs
    '''
    solution = Solution()
    fn = solution.maximumSubarraySum
    input = [
      [[1,2,2,2,9,9,9], 3],
      [[1,5,4,2,9,9,9], 3],
      [[4,4,4,4], 3],
      [[1,1,1,7,8,9], 3]
    ]
    for i in input:
      print( ".\t Input array: \t", *i)
      result = fn(i[0], i[1])
      print('\t Result is \t: ', result)
      print("-" * 100)
  