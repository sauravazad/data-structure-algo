/**
Given a sorted integer array arr, two integers k and x, return the k closest integers to x in the array. The result should also be sorted in ascending order.

An integer a is closer to x than an integer b if:

    |a - x| < |b - x|, or
    |a - x| == |b - x| and a < b



Example 1:

Input: arr = [1,2,3,4,5], k = 4, x = 3
Output: [1,2,3,4]

Example 2:

Input: arr = [1,2,3,4,5], k = 4, x = -1
Output: [1,2,3,4]



Constraints:

    1 <= k <= arr.length
    1 <= arr.length <= 104
    arr is sorted in ascending order.
    -104 <= arr[i], x <= 104

Explanation for algo: https://leetcode.com/problems/find-k-closest-elements/solutions/1689368/Come-on-in!-Give-the-best-binary-search-rule-explanation-without-magic/
 */


const find = (arr, target) => {
  let left = 0
  let right = arr.length - 1

  while(left <= right) {
    const mid = Math.floor(left + (right - left ) / 2)
    if(arr[mid] === target){ return mid }
    else if(arr[mid] < target) {
      left = mid + 1
    } else  {
      right = mid - 1
    }
  }
  return -1
}
/**
 * @param {number[]} arr
 * @param {number} k
 * @param {number} x
 * @return {number[]}
 */

var findClosestElements = function(arr, k, x) {
  let left = 0
  let right = arr.length - k // left < right so we can safely use array.length

  while(left < right) {
    const mid = Math.floor(left + (right - left ) / 2)
    if(x - arr[mid] > arr[mid+k] -x) {
      left = mid + 1
    } else  {
      right = mid
    }
  }
  return arr.slice(left, left+k)
};


console.info(findClosestElements([1,2,3,4,5], 4, -1))
console.info(findClosestElements([1,1,1,10,10,10], 1, 9))
console.info(findClosestElements([0,1,2,2,2,3,6,8,8,9],5 ,9))