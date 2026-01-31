/*
Problem link : https://leetcode.com/problems/permutation-in-string/
------------------------------------------------------------------------------------
Description: 567. Permutation in String

Given two strings s1 and s2, return true if s2 contains a of s1, or false otherwise.

In other words, return true if one of s1's permutations is the substring of s2.
------------------------------------------------------------------------------------
Example:

Example 1:

Input: s1 = "ab", s2 = "eidbaooo"
Output: true
Explanation: s2 contains one permutation of s1 ("ba").

Example 2:

Input: s1 = "ab", s2 = "eidboaoo"
Output: false

------------------------------------------------------------------------------------
Input:

------------------------------------------------------------------------------------
Constraints:

    1 <= s1.length, s2.length <= 104
    s1 and s2 consist of lowercase English letters.

------------------------------------------------------------------------------------

*/

/**
 Intuition:
  irrespective of the string combination, the character frequency would remain same
 Time Complexity:
 Space Complexity:
 Notes:
 */

const getIndex = (s) => s.charCodeAt() - 97 // for lowercase letter
const solution = function checkInclusion (s1, s2) {
  // create an array to hold
  const winLen = s1.length
  const s1Freq = Array(26).fill(0) // 26 character fill all zero initially
  const windowFreq = Array(26).fill(0) // 26 character fill all zero initially
  // fill the freq
  for (let i = 0; i < s1.length; i++) {
    s1Freq[getIndex(s1[i])]++
  }
  // now iterate through the second string , while maintaining the window size of s1.length
  let left = 0
  let ans = false
  // console.info(`s1Freq`, s1Freq)
  for (let right = 0; right < s2.length; right++) {
    // set the current elements freq
    windowFreq[getIndex(s2[right])] += 1
    // if window size is valid check if the current window elements are in the s1 string frequency
    if (right - left + 1 === winLen) {
      // console.info(`windowFre`, windowFreq)
      // compare booth frequency array. they should be same
      let isEq = true
      for (let i = 0; i < 26; i++) {
        if (s1Freq[i] != windowFreq[i]) { isEq = false; break }
      }
      if (isEq) {
        ans = isEq
        break
      }
      // move the left pointer
      // decrease the counter
      windowFreq[getIndex(s2[left])] -= 1
      left++
    }
  }
  return ans
}

// Driver code

const main = function () {
  const fn = solution
  const input = [
    ['ab', 'eidbaooo'],
    ['ab', 'eidboaoo']
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

/**
 *
 * @param {*} str
 * @returns
 */
/*
function generatePermutations(str) {
  // Base case: if string is empty or has one character
  if (str.length <= 1) {
    return [str]
  }

  const permutations = []

  // Iterate through each character in the string
  for (let i = 0; i < str.length; i++) {
    // Get the current character
    const currentChar = str[i];
    // get the remainder string
    const rem = str.slice(0,i) + str.slice(i+1)
    console.info("curr: ", currentChar, "remainder", rem)
    // get combination for the remainder
    const combinations = generatePermutations(rem)
    console.info(combinations)
    for(let com of combinations) {
      permutations.push(currentChar + com)
    }

  }

  return permutations;
}
  */
