// https://leetcode.com/problems/find-the-original-array-of-prefix-xor

const findArray = function (pref) {
  // XOR operation is both associative and commutative.
  // a⊕a=0
  // a⊕0=a
  const result = []
  result[0] = pref[0]
  for (let i = 1; i < pref.length; i++) {
    result[i] = pref[i] ^ pref[i - 1]
  }
  return result
}
// Driver code
const main = function () {
  const fn = findArray
  const input = [
    [5, 2, 0, 3, 1],
    [13]
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
