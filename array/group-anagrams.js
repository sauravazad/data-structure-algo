/*
Problem link : https://leetcode.com/problems/group-anagrams/description/
------------------------------------------------------------------------------------
Description:
Given an array of strings strs, group the anagrams together. You can return the answer in any order.

------------------------------------------------------------------------------------
Example:

Example 1:

Input: strs = ["eat","tea","tan","ate","nat","bat"]

Output: [["bat"],["nat","tan"],["ate","eat","tea"]]

Explanation:

    There is no string in strs that can be rearranged to form "bat".
    The strings "nat" and "tan" are anagrams as they can be rearranged to form each other.
    The strings "ate", "eat", and "tea" are anagrams as they can be rearranged to form each other.

Example 2:

Input: strs = [""]

Output: [[""]]

Example 3:

Input: strs = ["a"]

Output: [["a"]]

------------------------------------------------------------------------------------
Input:

------------------------------------------------------------------------------------
Constraints:

    1 <= strs.length <= 104
    0 <= strs[i].length <= 100
    strs[i] consists of lowercase English letters.

------------------------------------------------------------------------------------

*/

/**
 Intuition:
 Time Complexity:
 Space Complexity:
 Notes:
 */
const groupAnagrams = function (strs) {
  /**
    fix the first word and then look for its anagram in the array , if found push it and its anagram to an array and remove from the actual array
    iterate over util all the elements of the array has been processes
   */
  const queue = strs.slice(0)
  const ans = []
  while (queue.length > 0) {
    const current = queue[0]
    const currentAnagrams = [current]
    const indexes = [0]

    // build a hash map for all the characters
    const charHash = new Map()
    for (let i = 0; i < current.length; i++) {
      const char = current[i]
      let freq = 1
      if (charHash.get(char)) {
        freq += charHash.get(char)
      }
      charHash.set(char, freq)
    }

    // iterate over the remaining elements // if only 1 element is left in the queue at the end that means there are no anagrams for it
    for (let i = 1; i < queue.length; i++) {
      const curr = queue[i]
      let isAnagram = true
      for (let i = 0; i < curr.length; i++) {
        const cha = curr[i]
        if (charHash.has(cha) === false) {
          isAnagram = false
        }
      }
      if (isAnagram === true && curr.length === current.length) {
        // is an anagram
        // push the index and element
        indexes.push(i)
        currentAnagrams.push(curr)
      }
    }
  }
}
// Driver code

const main = function () {
  const fn = groupAnagrams
  const input = [
    ['eat', 'tea', 'tan', 'ate', 'nat', 'bat'],
    [''],
    ['a']
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
