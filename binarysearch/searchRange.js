/**
 Given an array of integers nums sorted in non-decreasing order, find the starting and ending position of a given target value.

If target is not found in the array, return [-1, -1].

You must write an algorithm with O(log n) runtime complexity.

Example 1:

Input: nums = [5,7,7,8,8,10], target = 8
Output: [3,4]

Example 2:

Input: nums = [5,7,7,8,8,10], target = 6
Output: [-1,-1]

Example 3:

Input: nums = [], target = 0
Output: [-1,-1]

Constraints:

    0 <= nums.length <= 105
    -109 <= nums[i] <= 109
    nums is a non-decreasing array.
    -109 <= target <= 109

 */

const findLeftBound = (nums, target, left, right) => {
  let startIndex = -1
  while (left < right) {
    const mid = Math.floor(left + (right - left) / 2)
    if (target === nums[mid]) {
      startIndex = mid
      console.log('Found at ' + mid)
      if (nums[mid] === nums[mid - 1]) {
        right = mid - 1
      } else {
        break
      }
    } else if (target < nums[mid]) {
      right = mid - 1
    } else {
      left = mid + 1
    }
  }
  if (nums[left] === target) startIndex = left
  return startIndex
}

const findRightBound = (nums, target, left, right) => {
  let startIndex = -1
  while (left < right) {
    const mid = Math.floor(left + (right - left) / 2)
    if (target === nums[mid]) {
      console.log('Found at ' + mid)
      startIndex = mid
      if (nums[mid] === nums[mid + 1]) {
        left = mid + 1
      } else {
        break
      }
    } else if (target < nums[mid]) {
      right = mid - 1
    } else {
      left = mid + 1
    }
  }
  if (nums[right] === target) startIndex = right
  return startIndex
}
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var searchRange = function (nums, target) {
  // Hint: Array is sorted in Ascending order
  const left = 0
  const right = nums.length - 1
  let startIndex = -1
  let endIndex = -1
  startIndex = findLeftBound(nums, target, left, right)
  if (startIndex !== -1) endIndex = findRightBound(nums, target, startIndex, right)
  if (endIndex < startIndex) endIndex = startIndex
  return [startIndex, endIndex]
}

var searchRange = function (nums, target) {
  const ans = [-1, -1]
  ans[0] = searchHelper(nums, target, true)

  if (ans[0] !== -1) ans[1] = searchHelper(nums, target, false)

  return ans
}

var searchHelper = (nums, target, isSearchStart) => {
  let ans = -1
  let start = 0
  let end = nums.length - 1

  while (start <= end) {
    const mid = Math.floor((start + end) / 2)

    if (target < nums[mid]) {
      end = mid - 1
    } else if (target > nums[mid]) {
      start = mid + 1
    } else {
      ans = mid
      if (isSearchStart) {
        end = mid - 1
      } else {
        start = mid + 1
      }
    }
  }

  return ans
}
// console.log(searchRange([1,2,2,3,3,3,8,10,15,15,15], 15))
console.log(searchRange([5, 7, 7, 8, 8, 10], 8))
console.log(searchRange([2, 2], 2))
