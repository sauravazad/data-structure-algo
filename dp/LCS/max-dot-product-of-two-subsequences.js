// https://leetcode.com/problems/max-dot-product-of-two-subsequences

const maxDotProduct = function (nums1, nums2) {
  return maxDotProductDP(nums1, nums2, 0, 0)
}

const maxDotProductRec = (nums1, nums2, i, j) => {
  if (i >= nums1.length || j >= nums2.length) return 0
  // calculate dot product
  // three options move both th pointer or move one of the pointer
  const option1 = nums1[i] * nums2[j] + maxDotProductRec(nums1, nums2, i + 1, j + 1)
  const option2 = maxDotProductRec(nums1, nums2, i, j + 1)
  const option3 = maxDotProductRec(nums1, nums2, i + 1, j)
  const max = Math.max(option1, option2, option3)
  return max
}

const maxDotProductDP = (nums1, nums2) => {
  const rows = nums1.length
  const cols = nums2.length
  // set up DP Array
  const dp = Array(rows + 1).fill().map(() => Array(cols + 1).fill(-Infinity))
  let product
  for (let i = 1; i <= rows; i++) {
    for (let j = 1; j <= cols; j++) {
      product = nums1[i - 1] * nums2[j - 1]
      dp[i][j] = Math.max(dp[i][j], product, dp[i - 1][j], dp[i][j - 1], product + dp[i - 1][j - 1])
    }
  }
  return dp[rows][cols]
}

// Driver code
const main = function () {
  const fn = maxDotProduct
  const input = [
    [
      [2, 1, -2, 5], [3, 0, -6]
    ],
    [
      [3, -2], [2, -6, 7]
    ],
    [
      [-1, -1], [1, 2]
    ]
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
