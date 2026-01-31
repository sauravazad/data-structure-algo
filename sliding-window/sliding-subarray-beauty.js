/**
https://leetcode.com/problems/sliding-subarray-beauty/description/

Given an integer array nums containing n integers, find the beauty of each subarray of size k.
The beauty of a subarray is the xth smallest integer in the subarray if it is negative, or 0 if there are fewer than x negative integers.
Return an integer array containing n - k + 1 integers, which denote the beauty of the subarrays in order from the first index in the array.
A subarray is a contiguous non-empty sequence of elements within an array.

constraints:
  n == nums.length
  1 <= n <= 105
  1 <= k <= n
  1 <= x <= k
  -50 <= nums[i] <= 50

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

 */

/**
 * @param {number[]} nums
 * @param {number} k
 * @param {number} x
 * @return {number[]}
 */
const getSubarrayBeauty = function (nums, k, x) {
  /**
   Intuition:
   Since the problem provides us with the length of sub array to compute , it becomes clear it is a hint to utilize th sliding window approach.
   NOTE: finding the kth smallest element,
      - there are two approach , sort the array and get the kth element in the window : time complexity O(NLogN)
      - But there is a constraint : making the pretty only involves negative integers ., Also the element of teh array has a pretty small size
      -50 <= nums[i] <= 50
      Now this can be utilized to think mathematically . to just create an Map of size 50 ,
      that can hold the number fo times a negative element has occurred
   */
  console.info(`Window Size: ${k}, to Find ${x} smallest `)
  let left = 0
  const hash = {}
  const ans = []
  // fill the map with negative index for all possible values and assign the frequency to zero
  const freq = {}
  for (let i = 1; i < 51; i++) {
    freq[-i] = 0
  }
  // move the right pointer
  for (let right = 0; right < nums.length; right++) {
    // store the frequency of negative element and update the frequency of left element when ever you process the window . So that only k(window size) is set in the array
    if (nums[right] < 0) freq[nums[right]]++
    // fill the elements and increment end if the window size is not met
    if (right - left + 1 == k) {
      console.info(`Window size ${k} matched, left:${left} , right: ${right}`)
      // console.info(freq)
      // window size achieved
      // calculate the beauty
      let count = 0
      let beauty = 0

      // we iterate from -50 to -1 and
      for (let i = 50; i >= 1; i--) {
        count += freq[-i]
        if (count >= x) {
          beauty = -i
          break
        }
      }
      console.info(`beauty is ${beauty}`)
      ans.push(beauty)
      // decrease the frequency of processed element
      if (nums[left] < 0) freq[nums[left]]--
      left++
    }
    // console.log(`start : ${start} , end: ${right}`, hash)
  }
  return ans
}

// Driver code
const main = function () {
  const fn = getSubarrayBeauty
  const input = [
    [[1, -1, -3, -2, 3], 3, 2],
    [[-1, -2, -3, -4, -5], 2, 2],
    [[-3, 1, 2, -3, 0, -3], 2, 1]
  ]
  /**
   *  Fill the time complexity for each function
   */

  for (let i = 0; i < input.length; i++) {
    console.log(i + 1 + '.\t Input array: \t', input[i])
    const result = fn(...input[i])
    console.log('\t Result is \t: ', result)
    console.log('-'.repeat(100))
  }
}

main()
