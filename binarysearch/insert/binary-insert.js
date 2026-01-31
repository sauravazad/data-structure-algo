const binaryInsert = (nums, item) => {
  let left = 0
  let right = nums.length
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
}

main()
