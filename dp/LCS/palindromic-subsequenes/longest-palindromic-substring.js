/**
https://leetcode.com/problems/longest-palindromic-substring/
 */

const longestPalindrome = (str) => {
  /// Time complexity = O(n^2)
  const N = str.length
  let res = ''
  let resLength = 0
  // iterate through the string
  // expand from  position to left and right and update the res if it is a palindrome

  // when palindromes length is Odd
  for (let i = 0; i < N; i++) {
    // pointers
    let left = i
    let right = i
    while (left >= 0 && right < N && str[left] === str[right]) {
      // check if the length is greater than existing length
      const currLength = right - left + 1
      if (currLength > resLength) {
        res = str.substring(left, right + 1)
        resLength = currLength
      }
      left--
      right++
    }
  }

  // when palindromes length is Even
  for (let i = 0; i < N; i++) {
    // pointers
    let left = i
    let right = i + 1 // even
    while (left >= 0 && right < N && str[left] === str[right]) {
      // check if the length is greater than existing length
      const currLength = right - left + 1
      if (currLength > resLength) {
        res = str.substring(left, right + 1)
        resLength = currLength
      }
      left--
      right++
    }
  }
  return res
}

const longestpalindromeManacher = () => {
  // https://cp-algorithms.com/string/manacher.html
}
// Driver code
const main = function () {
  const input = ['adam', 'babad', 'cbbd', 'cat', '1213']
  /**
   *  Fill the time complexity for each function
   */
  const N = input.length
  const fn = longestPalindrome
  for (let i = 0; i < 1; i++) {
    console.log(i + 1 + '.\t Input array:', input[i])
    const result = fn(input[i])
    console.log('\t Result is', result)
    console.log('-'.repeat(100))
  }
}

main()
