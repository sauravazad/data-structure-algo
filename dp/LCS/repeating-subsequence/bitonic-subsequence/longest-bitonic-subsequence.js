/**
https://practice.geeksforgeeks.org/problems/longest-bitonic-subsequence0824/1
Given an array of positive integers. Find the maximum length of Bitonic subsequence.
A subsequence of array is called Bitonic if it is first strictly increasing, then strictly decreasing.

Input: nums = [1, 2, 5, 3, 2]
Output: 5
Explanation: The sequence {1, 2, 5} is
increasing and the sequence {3, 2} is
decreasing so merging both we will get
length 5.

Similar Problem:
- https://leetcode.com/problems/longest-mountain-in-array/
- https://leetcode.com/problems/peak-index-in-a-mountain-array/
- https://leetcode.com/problems/minimum-number-of-removals-to-make-mountain-array/
- https://leetcode.com/problems/valid-mountain-array/

 */

const lbsLength = (numbers) => {
  const dpStart = new Array(numbers.length).fill(1)
  const dpEnd = new Array(numbers.length).fill(1)
  const bitonicDP = new Array(numbers.length).fill(0)

  // calculate LIS DP Array from the start
  for (let i = 0; i < numbers.length; i++) {
    for (let j = 0; j < i; j++) {
      // If we find that numbers[j] < numbers[i], we may have found a longer increasing subsequence at index i.
      if (numbers[j] < numbers[i]) {
        dpStart[i] = Math.max(dpStart[i], dpStart[j] + 1)
      }
    }
  }

  // calculate LIS DP Array  from the end

  for (let i = numbers.length - 1; i >= 0; i--) {
    for (let j = numbers.length - 1; j > i; j--) {
      // If we find that numbers[j] < numbers[i], we may have found a longer increasing subsequence at index i.
      if (numbers[j] < numbers[i]) {
        dpEnd[i] = Math.max(dpEnd[i], dpEnd[j] + 1)
      }
    }
  }
  // calculate the bitonic array
  let max = -Infinity
  for (let i = 0; i < numbers.length; i++) {
    bitonicDP[i] = dpStart[i] + dpEnd[i] - 1 // -1 as the current element will be included in both the LIS DP array
    max = Math.max(max, bitonicDP[i])
  }
  return max
}

// Driver code
function main () {
  inputs = [
    // [1,11,2,10,4,5,2,1],
    [10], [1, 8], [2, 4, 1], [6, 5, 3, 7, 10, 1, 2], [1, 4, 9, 2, 16, 20]]

  // You can uncomment the lines below and check how this recursive solution causes a time-out
  inputs.push([23, 11, 12, 10, 15, 12, 6, 15, 18, 4, 14, 2, 13, 25,
    27, 21, 2, 17, 18, 30, 22, 25, 10, 27, 10, 22, 21,
    24, 26, 12, 26, 12, 3, 16, 4, 20, 18, 1, 5, 12, 10,
    1, 14, 21, 15, 17, 21, 18, 13, 30, 20, 10, 5, 16, 9,
    4, 25, 10, 8, 15, 2, 1, 13, 9, 12, 13, 6, 28, 6, 26,
    8, 20, 29, 9, 5, 14, 13, 30, 7, 3, 2, 24, 28, 21, 7,
    19, 14, 22, 28, 2, 20, 8, 6, 27, 12, 8, 27, 2, 27,
    30, 8, 23, 16, 27, 25, 3, 1, 3, 5, 18, 2, 13, 18, 28,
    2, 25, 20, 5, 11, 2, 28, 15, 15, 12, 25, 24, 17, 30,
    17, 7, 18, 23, 13, 4, 4, 23, 23, 18, 16, 18, 14, 11,
    26, 26, 22, 21, 23, 24, 24, 25, 20, 28, 18, 17, 21,
    14, 16, 8, 19, 23, 26, 24, 28, 18, 26, 9, 22, 14, 15,
    1, 11, 23, 20, 16, 4, 16, 5, 30, 19, 18, 6, 14, 23,
    2, 1, 22, 29, 3, 29, 22, 30, 10, 30, 12, 17, 3, 12,
    22, 8, 22])

  for (let i = 0; i < inputs.length; i++) {
    console.log(i + 1 + '.\tnums:', inputs[i], '\n\n\tThe length of the longest bitonic subsequence is:', lbsLength(inputs[i]))
    console.log('-'.repeat(100))
  }
}

main()
