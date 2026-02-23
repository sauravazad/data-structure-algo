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
  Outer look O(N) : N = number of strings in the input array
  we are sorting the string : if K is the length  time complexity of sorting and join is O(KlogK) + O(K) = O(KLogK)
  iterate over the anagram keys : work case there are no anagrams : O(N)
  total = O(N) * O(KLog(K)) + O(N) = O(N) * O(KLog(K)) = O(NKLogK) : log rule for multiplication
 Space Complexity: O(N) * O(K)  = O(NK): total space required to store the hash map and array
 Notes: 
 */
var groupAnagrams1 = function(strs) {
  /**
   * Approach 1 :
    sort the character of the string and create a hash Map if the key as sorted value and value as the actual string before sorting
   */
  const anagramHash = {}
  let ans = []
  for(let i = 0; i < strs.length; i++) {
    const str = strs[i]
    const chars = Array.from(str)
    const key = chars.sort().join() // .sort will sort according to unicode value if no callback is provided
    if (anagramHash[key]=== undefined) {
      anagramHash[key] = [str]
    } else {
      anagramHash[key].push(str)
    }
  }
  Object.keys(anagramHash).forEach((ana) => {
    ans.push(anagramHash[ana])
  })
  return ans
};

/**
 * 
 Intuition: 
  create a hash for each string by using its binary code representation followed by a special character and count of the character
 Time Complexity: 
  O(N) * O(K) = O(NK)
 Space Complexity: O(N) * O(K) = O(NK)
 Notes: 
 */
var groupAnagrams = (strs) => {
  const anagramHash = {}

  for(let i = 0 ; i < strs.length; i++) {
    let str = strs[i]
    let alpha = Array(26).fill(0)
    for(let j = 0 ; j < str.length; j++) {
      const char = str[j]
      const index = char.charCodeAt() -97
      alpha[index]++
    }
    const key = alpha.join("#")
    if(anagramHash[key] === undefined) {
      anagramHash[key] = []
    }
    anagramHash[key].push(str)
  }

  // iterate over the Hash and return the value
  return Object.values(anagramHash)

}
// Driver code
 

var main = function () {
  const fn = groupAnagrams
  const input = [
    ["eat","tea","tan","ate","nat","bat"],
    [""],
    ["a"]
  ]
  /**
   *  Fill the time complexity for each function
   */

  for (var i = 0; i < input.length; i++) {
    console.log(i + 1 + ".\t Input array: \t", input[i]);
    var result = fn(input[i]);
    console.log("\t Result is \t: ",result);
    console.log("-".repeat(100));
  }
}

main()
