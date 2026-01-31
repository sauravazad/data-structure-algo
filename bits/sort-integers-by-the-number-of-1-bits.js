// https://leetcode.com/problems/sort-integers-by-the-number-of-1-bits

const sortByBits = function (arr) {
  arr.sort((n1, n2) => {
    const n1SetBits = countBits(n1)
    const n2SetBits = countBits(n2)
    if (n1SetBits === n2SetBits) {
      return n1 - n2
    } else {
      return n1SetBits - n2SetBits
    }
  })
  return arr
}

// Brian Kernighan algo
var countBits = (n) => {
  let bits = 0
  while (n > 0) {
    bits++
    n = n & n - 1 // clear the least significant bit https://graphics.stanford.edu/~seander/bithacks.html#CountBitsSetKernighan
  }
  return bits
}

// Driver code
const main = function () {
  const fn = sortByBits
  const input = [
    [0, 1, 2, 3, 4, 5, 6, 7, 8],
    [1024, 512, 256, 128, 64, 32, 16, 8, 4, 2, 1]
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
