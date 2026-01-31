const binaryInsert = (nums, item) => {
  let left = 0
  let right = nums.length - 1
  while (right >= left) {
    const insertIndex = Math.floor(left + (right - left) / 2)
    if (item === nums[insertIndex]) {
      left = insertIndex
      break
    } else if (item < nums[insertIndex]) {
      left = insertIndex + 1
    } else {
      right = insertIndex - 1
    }
  }
  // console.log(`Inserting at index ${left}`)
  nums.splice(left, 0, item)
  return nums
}

const search = (nums, target) => {

}
const binaryDelete = (nums, target) => {
  let left = 0
  let right = nums.length - 1
  let mid
  while (left < right) {
    mid = left + Math.floor((right - left) / 2)
    if (target === nums[mid]) {
      return nums.splice(mid, 1)
    } else if (target > nums[left]) {
      left = mid + 1
    } else {
      right = mid
    }
  }
}

// Driver code
const main = function () {
  const input = []
  /**
   *  Fill the time complexity for each function
   */
  binaryInsert(input, 2)
  binaryInsert(input, 1)
  binaryInsert(input, 2)
  binaryInsert(input, 4)
  binaryInsert(input, 3)
  console.info(input)

  binaryDelete(input, 2)
  console.info(input)
}

main()
