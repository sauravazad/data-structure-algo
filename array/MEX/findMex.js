// https://cp-algorithms.com/sequences/mex.html

/**
 * Time complexity = O (N log(N))
  * Space complexity = O(1) // no extra space is consumed
 */
const mex = (arr) => {
  arr.sort((a, b) => a - b) // sort the array O (n Log(n))
  let result = 0

  for (let i = 0; i < arr.length; i++) {
    if (result == arr[i]) {
      result++
    }
  }
  return result
}

/**
  * Time complexity = O (N)
  * Space complexity = O(N) // extra space is consumed
 */
const mexO_N = (arr) => {
  const MAX_N = arr.length // because MEX can never be beyond the range of array.length
  const used = Array(MAX_N).fill(false)

  // mark the given numbers

  for (const v of arr) {
    used[v] = true
  }

  // find the mex
  let mex = 0
  while (used[mex]) {
    mex++
  }
  return mex
}
// Driver code
const main = function () {
  const fn = mexO_N
  const input = [
    [-1, 1, 2, 4, 5],
    [0, 1, 2, 4, 5],
    [0, 1, 2, 3, 4],
    [1, 2, 3, 4, 5]
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
