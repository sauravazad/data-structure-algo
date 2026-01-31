/*

A school is trying to take an annual photo of all the students. The students are asked to stand in a single file line in
non-decreasing order by height. Let this ordering be represented by the integer array expected where expected[i] is the
expected height of the ith student in line.
You are given an integer array heights representing the current order that the students are standing in.
Each heights[i] is the height of the ith student in line (0-indexed).

Return the number of indices where heights[i] != expected[i].
Input: heights = [1,1,4,2,1,3]
Output: 3
Explanation:
heights:  [1,1,4,2,1,3]
expected: [1,1,1,2,3,4]
Indices 2, 4, and 5 do not match.
*/

const heightChecker = function (heights) {
  let wrongOrderCount = 0
  const original = heights.slice()
  heights.sort((a, b) => a - b)
  heights.forEach((h, i) => {
    if (h !== original[i]) wrongOrderCount++
  })

  return wrongOrderCount
}

// console.log(`Wrong order count is `, heightChecker([1,2,4,6,  3]))

/**
 * @param {number[]} nums
 * @return {number}
 */
const thirdMax = function (nums) {
  let max1 = -Infinity; let max2 = -Infinity; let max3 = -Infinity

  for (let i = 0; i < nums.length; i++) {
    const value = nums[i]
    if (value >= max1) {
      if (value === max1) continue
      console.log('swap', value, i)
      // swap all maxes
      max3 = max2
      max2 = max1
      max1 = value
    } else if (value >= max2 && i > 0) {
      if (value === max2) continue
      max3 = max2
      max2 = value
    } else if (value >= max3 && i > 1) {
      if (value === max3) continue
      max3 = value
    }
  }
  console.log(`max1 : ${max1}, max2 : ${max2}, max3 : ${max3}`)
  const returnval = max3 === -Infinity ? max1 : max3

  return returnval
}

// console.log(`Third max is `, thirdMax([5,2,2]))

const findDisappearedNumbers1 = function (nums) {
  const hash = {}
  const missing = []
  nums.forEach((num, i) => {
    if (!hash[i + 1]) hash[i + 1] = false
    hash[num] = true
  })
  Object.keys(hash).forEach((k) => {
    if (hash[k] === false) missing.push(k)
  })
  return missing
}

const nums = [4, 3, 2, 7, 8, 2, 3, 1]

const findDisappearedNumbers = function (nums) {
  const missing = []
  for (let i = 0; i < nums.length; i++) {
    const value = nums[i]
    const index = Math.abs([value]) - 1
    // console.log(`Value is ${value} Index is `, index, i)
    if (nums[index] > -1) {
      nums[index] *= -1 // change the sign of the value but preserve the value for
    }

    // console.info(nums)
  }
  for (let j = 0; j < nums.length; j++) {
    if (nums[j] > 0) missing.push(j + 1)
  }
  // console.log(nums)
  return missing
}

// console.log(findDisappearedNumbers(nums))

const sortedSquares = function (nums) {
  let left = 0
  let right = nums.length - 1
  const list = []
  while (left <= right) {
    const lefts = Math.pow(nums[left], 2)
    const rights = Math.pow(nums[right], 2)
    // push the pointer whose value is greater and accordingly decrement or increment the pointer
    if (lefts < rights) {
      list.push(rights)
      right--
    } else {
      list.push(lefts)
      left++
    }
    console.log(list)
  }
  return list.reverse()
}

// console.log(sortedSquares([-2,-1,0,2,3]))

const search = function (nums, target) {
  let left = 0
  let right = nums.length - 1

  while (left <= right) {
    const mid = parseInt((left + right) / 2, 10)

    const midvalue = nums[mid]
    console.log(`mid is ${mid}, right ${right} left ${left}, midValue ${midvalue}, target ${target}`)
    if (target === midvalue) {
      return mid
    } else if (target > midvalue) {
      console.log('target > mid, update left')
      left = mid + 1
    } else if (target < midvalue) {
      console.log('target < mid, update right')
      right = mid - 1
    }
  }
  return -1
}

console.log(search([5], 5))
