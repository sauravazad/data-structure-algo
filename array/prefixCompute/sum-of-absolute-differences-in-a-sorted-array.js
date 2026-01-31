/**
https://leetcode.com/problems/sum-of-absolute-differences-in-a-sorted-array/editorial/

You are given an integer array nums sorted in non-decreasing order.

Build and return an integer array result with the same length as nums such that result[i] is equal to the
summation of absolute differences between nums[i] and all the other elements in the array.

In other words, result[i] is equal to sum(|nums[i]-nums[j]|) where 0 <= j < nums.length and j != i (0-indexed).
 */

const getSumAbsoluteDifferences = function (nums) {
  /**
   Intuition: first write the brute force and then think can we some how offload the repeated calculation by doing prefix sum and utilizing it.

   for index i, the problem can be simply broken down into two part
    sum of the elements left  and right to it
    calculate the right prefix
    calculate the left prefix

    abs = (left-prefix - left count * num[i]) + ( right count * num[i] - right-prefix)

   */
  const prefix = []
  const N = nums.length
  prefix[0] = nums[0]
  for (let i = 1; i < N; i++) {
    prefix[i] = prefix[i - 1] + nums[i]
  }
  // console.info(`prefix Sum = ${prefix}`)
  const ans = []
  for (let i = 0; i < N; i++) {
    const leftSum = prefix[i] - nums[i]
    const rightSum = prefix[N - 1] - prefix[i]

    const leftCount = i
    const rightCount = N - i - 1 // 0 based array
    const leftTotal = (leftCount * nums[i]) - leftSum
    const rightTotal = rightSum - (rightCount * nums[i]) // array is sorted . so we can use it or else use Maths .abs
    // console.info(`leftTotal: ${leftTotal} , rightTotal: ${rightTotal}`)
    ans[i] = leftTotal + rightTotal
  }
  // console.info(ans)
  return ans
}

// Driver code
const main = function () {
  const fn = getSumAbsoluteDifferences
  const input = [
    [2, 3, 5],
    [1, 4, 6, 8, 10]
  ]
  const expectedOutput = [
    [4, 3, 5],
    [24, 15, 13, 15, 21]
  ]
  /**
   *  Fill the time complexity for each function
   */

  for (let i = 0; i < input.length; i++) {
    console.log(i + 1 + '.\t Input array: \t', input[i])
    const result = fn(input[i])
    console.log('\t Result is \t: ', result)
    console.log('-'.repeat(100))
  }
}

main()
