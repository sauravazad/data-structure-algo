/*
Problem link : https://leetcode.com/problems/substrings-of-size-three-with-distinct-characters
------------------------------------------------------------------------------------
Description: 1876. Substrings of Size Three with Distinct Characters

A string is good if there are no repeated characters.
Given a string's return the number of good substrings of length three in s.
Note that if there are multiple occurrences of the same substring, every occurrence should be counted.
A substring is a contiguous sequence of characters in a string.

------------------------------------------------------------------------------------
Example:

Example 1:

Input: s = "xyzzaz"
Output: 1
Explanation: There are 4 substrings of size 3: "xyz", "yzz", "zza", and "zaz".
The only good substring of length 3 is "xyz".

Example 2:

Input: s = "aababcabc"
Output: 4
Explanation: There are 7 substrings of size 3: "aab", "aba", "bab", "abc", "bca", "cab", and "abc".
The good substrings are "abc", "bca", "cab", and "abc".

------------------------------------------------------------------------------------
Input:

------------------------------------------------------------------------------------
Constraints:

    1 <= s.length <= 100
    s​​​​​​ consists of lowercase English letters.

------------------------------------------------------------------------------------

*/

/**
 Intuition:
 Time Complexity:
 Space Complexity:
 Notes:
 */
const countGoodSubstrings = function (s) {
  const size = 3
  let goodCount = 0
  let l = 0
  const windowSet = {}
  for (let r = 0; r < s.length; r++) {
    // add the element to set
    if (windowSet[s[r]]) {
      windowSet[s[r]] += 1
    } else {
      windowSet[s[r]] = 1
    }

    if (r - l + 1 == size) {
      // check if the current window has duplicates by checking the set size
      if (Object.keys(windowSet).length === size) goodCount += 1
      // move the left pointer and reduce the count of the removed element
      if (windowSet[s[l]] > 1) {
        windowSet[s[l]] -= 1
      } else {
        delete windowSet[s[l]]
      }
      l++
    }
  }
  return goodCount
}
// Driver code

const main = function () {
  const fn = countGoodSubstrings
  const input = [
    'xyzzaz', 'aababcabc'
  ]
  const expected = [1, 4]
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