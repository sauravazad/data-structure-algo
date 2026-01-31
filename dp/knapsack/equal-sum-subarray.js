/**
For a given array nums, determine if the array can be divided into two subarrays such that the sum of both the subarrays is equal.
For example, we have an array [1,2,3]
The total length of this array can be denoted as n that is  3 .
An array can only be divided into two equal subarrays if the total sum of the array is even. In this case, the total sum of array elements is 1 +2 +3 = 6
so two equal sum subarrays can be obtained here, as [1,2] [3]
- In this case, TRUE will be returned as the array can be divided into two equal sum subarrays.
- In case, the sum of array elements is odd or the array can not be divided into two equal sum subarrays, FALSE will be returned.

Constraints:
  1 <= nums.length <= 200
  1 <=  nums[i] <= 100
 */

const print2DMatrix = (matrix) => {
  console.info('__'.repeat(20))
  for (let i = 0; i < matrix.length; i++) {
    console.info(matrix[i].join(' | '))
  }
  console.info('__'.repeat(20))
}
const canPartitionArray = (arr) => {
  // check if the sum of element of array is even or odd
  const arraySum = arr.reduce((prev, current) => { return prev + current }, 0)
  if (arraySum % 2 !== 0) {
    return false
  } else {
    const half = arraySum / 2
    // const dp = [...Array(arr.length)].map(() => Array(half + 1).fill(-1))
    // const result = canPartitionArrayRecMemo(arr, half, 0, dp)
    const result = canPartitionArrayBottomUp(arr, half)
    // print2DMatrix(dp)
    return result
  }
}

// check if we can reach to the provided sum using the given numbers in the array
const canPartitionArrayRec = (arr, sum, index) => {
  if (sum === 0) {
    return true
  }
  if (index >= arr.length) return false
  // include the element
  const include = canPartitionArrayRec(arr, sum - arr[index], index + 1)
  const doNotInclude = canPartitionArrayRec(arr, sum, index + 1)
  return include || doNotInclude
}

// check if we can reach to the provided sum using the given numbers in the array
const canPartitionArrayRecMemo = (arr, sum, index, dp) => {
  if (sum === 0) {
    return true
  }
  if (sum < 0 || index >= arr.length) return false
  if (dp[index][sum] === -1) {
    // include the element
    const include = canPartitionArrayRecMemo(arr, sum - arr[index], index + 1, dp)
    const doNotInclude = canPartitionArrayRecMemo(arr, sum, index + 1, dp)
    dp[index][sum] = include || doNotInclude
  }
  return dp[index][sum]
}

const canPartitionArrayBottomUp = (arr, targetSum) => {
  const dp = Array(targetSum + 1).fill(false)
  // base case 0 can be achieved by using any of the subset of array elements
  dp[0] = true
  for (let i = 1; i <= arr.length; i++) {
    // iterate in reverse order so that we do not override any previous computaion before we have had a chance to use it
    for (let sum = targetSum; sum >= i && arr[i - 1] <= sum; sum--) {
      dp[sum] = dp[sum] || dp[sum - arr[i - 1]]
    }
    // console.info(dp)
  }
  return dp[targetSum]
}

// Driver code
const main = function () {
  const arr1 = [3, 1, 1, 2, 2, 1]
  const arr2 = [1, 3, 7, 3]
  const arr3 = [1, 2, 3]
  const arr4 = [1, 2, 5]
  const arr5 = [1, 3, 4, 8]
  const arr6 = [1, 2, 3, 2, 3, 5]
  const arr7 = [1, 5, 3, 2, 3, 19, 3]
  const arr8 = [1, 2, 3, 5, 3, 2, 1]
  const arr = [arr1, arr2, arr3, arr4, arr5, arr6, arr7, arr8]
  // arr = [ [1,3,2 ]]

  // You can uncomment the lines below and check how this recursive solution causes a time-out

  arr.push([100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100,
    100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100,
    100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100,
    100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100,
    100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100,
    100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100,
    100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 99, 97])

  for (let i = 0; i < arr.length; i++) {
    console.log(i + 1 + '.\t Input array:', arr[i])
    const result = canPartitionArray(arr[i])
    console.log('\t Can we partition the array into equal sum subarrays?',
      result)
    console.log('-'.repeat(100))
  }
}

main()
