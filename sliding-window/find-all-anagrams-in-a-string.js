/*
Problem link : https://leetcode.com/problems/find-all-anagrams-in-a-string
------------------------------------------------------------------------------------
Description: 438. Find All Anagrams in a String

anagrams = An anagram is a word or phrase formed by rearranging the letters of a different word or phrase, using all the original letters exactly once.
Given two strings s and p, return an array of all the start indices of p's anagrams in s. You may return the answer in any order.
------------------------------------------------------------------------------------
Example:
Example 1:

Input: s = "cbaebabacd", p = "abc"
Output: [0,6]
Explanation:
The substring with start index = 0 is "cba", which is an anagram of "abc".
The substring with start index = 6 is "bac", which is an anagram of "abc".

Example 2:

Input: s = "abab", p = "ab"
Output: [0,1,2]
Explanation:
The substring with start index = 0 is "ab", which is an anagram of "ab".
The substring with start index = 1 is "ba", which is an anagram of "ab".
The substring with start index = 2 is "ab", which is an anagram of "ab".

------------------------------------------------------------------------------------
Input:

------------------------------------------------------------------------------------
Constraints:
1 <= s.length, p.length <= 3 * 104
s and p consist of lowercase English letters

------------------------------------------------------------------------------------


*/
const isObjectEqual = (a, b) => {
  let result = true
  const lenA = Object.keys(a).length
  const lenB = Object.keys(a).length
  if(lenA === lenB) {
    Object.keys(a).forEach((key) => {
      // check if the key exist in both object and its value are equal
      if(a[key] !== b[key]) result = false
    })
  } else {
    result = false
  }
  return result
}

/**
 Intuition: 
 Time Complexity: 
 Space Complexity:
 Notes: 
 */
var findAnagrams = function(s, p) {
  let ans = []
  const windowSize = p.length
  // create a frequency map of character for p
  const findMap = {}
  for (let i = 0 ; i < p.length; i++) {
    if(findMap[p[i]] === undefined) findMap[p[i]] = 0
    findMap[p[i]] += 1
  }
  
  let windowMap = {}
  let left = 0
  for(let right = 0; right < s.length; right++) {
    // set the frequency of the current window element
    if(windowMap[s[right]] === undefined) windowMap[s[right]] = 0
    windowMap[s[right]] += 1
    // we have the correct size
    if (right - left  + 1 === windowSize) {
      // check the current window elements have the same frequency as the p hash map
      if(isObjectEqual(findMap, windowMap)) ans.push(left)
      // move the left pointer and decrease the frequency
      windowMap[s[left]] -= 1
      if(windowMap[s[left]] == 0) delete windowMap[s[left]]
      left++
    }
  } 
    return ans
};

// Driver code
 

var main = function () {
  const fn = findAnagrams
  const input = [
    ["cbaebabacd", "abc"],
    ["abab", "ab"]
  ]
  /**
   *  Fill the time complexity for each function
   */

  for (var i = 0; i < input.length; i++) {
      console.log(i + 1 + ".\t Input array: \t", input[i]);
      var result = fn(...input[i]);
      console.log("\t Result is \t: ",result);
      console.log("-".repeat(100));
  }
}

main();