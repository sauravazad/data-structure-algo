const assert = require('node:assert')
/*
Problem link : https://leetcode.com/problems/minimum-window-substring
------------------------------------------------------------------------------------
Description: 76. Minimum Window Substring
Given two strings s and t of lengths m and n respectively, return the minimum window of s such
that every character in t (including duplicates) is included in the window. If there is no such substring, return the empty string "".

The testcases will be generated such that the answer is unique.

------------------------------------------------------------------------------------
Example:

Example 1:

Input: s = "ADOBECODEBANC", t = "ABC"
Output: "BANC"
Explanation: The minimum window substring "BANC" includes 'A', 'B', and 'C' from string t.

Example 2:

Input: s = "a", t = "a"
Output: "a"
Explanation: The entire string s is the minimum window.

Example 3:

Input: s = "a", t = "aa"
Output: ""
Explanation: Both 'a's from t must be included in the window.
Since the largest window of s only has one 'a', return empty string.

------------------------------------------------------------------------------------
Input:

------------------------------------------------------------------------------------
Constraints:

    m == s.length
    n == t.length
    1 <= m, n <= 105
    s and t consist of uppercase and lowercase English letters.

------------------------------------------------------------------------------------

*/

/**
 Intuition:

 Time Complexity:
 Space Complexity:
 Notes:
 */
const minWindow = function (s, t) {
  const subMap = {}
  let required = 0 // number of unique character required // excluding duplicates
  for (let i = 0; i < t.length; i++) {
    if (subMap[t[i]] == undefined) {
      required++
      subMap[t[i]] = 0
    }
    subMap[t[i]]++
  }
  const windowSize = t.length
  let left = 0
  let ans = [-1, 0, 0] // [length, start, end]
  const windowHash = {}
  let formed = 0 // to track the current window unique character
  console.info('subMap:-', subMap)
  for (let right = 0; right < s.length; right++) {
    const current = s[right]
    if (windowHash[current] == undefined) windowHash[current] = 0
    windowHash[current] += 1 // increment the character count in the current window hash

    /// If the frequency of the current character added equals to the
    // desired count in t then increment the formed count by 1.
    if (windowHash[current] === subMap[current]) formed += 1

    // if we are in window >= size we should check the condition on the current substring
    // shrink the window until the condition are valid
    console.info('windowHash:-', windowHash)
    while (left <= right && formed === required) {
      // fill the current found window
      // if the current length is less than stored length of substring update
      if (ans[0] == -1 || ans[0] > right - left + 1) {
        ans = [right - left + 1, left, right]
      }

      console.info(`right : ${right} left: ${left} ans: ${ans}`)
      windowHash[s[left]] -= 1
      // if(windowHash[s[left]] == 0) delete windowHash[s[left]] // if frequency is zero delete the character from the window
      // check if the left pointer character is part of the required , if not then we can increment the left pointer
      if (subMap[s[left]] != undefined && windowHash[s[left]] < subMap[s[left]]) {
        formed--
      }
      left++
    }
  }
  return ans[0] === -1 ? '' : s.substring(ans[1], ans[2] + 1) // end is not included in substring
}

// Driver code

const main = function () {
  const fn = minWindow
  const input = [
    ['ADOBECODEBANC', 'ABC'],
    ['a', 'a'],
    ['a', 'aa']
  ]
  const expected = ['BANC', 'a', '']
  /**
   *  Fill the time complexity for each function
   */

  for (let i = 0; i < input.length; i++) {
    console.log(i + 1 + '.\t Input array: \t', input[i])
    const result = fn(...input[i])
    console.log('\t Result is \t: ', result)
    // assert.deepStrictEqual(result, expected[i], 'Failed !')
    console.log('-'.repeat(100))
  }
}

main()
