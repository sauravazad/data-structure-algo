/*
Problem link : https://leetcode.com/problems/find-the-longest-semi-repetitive-substring/description/
------------------------------------------------------------------------------------
Description: 
You are given a digit string s that consists of digits from 0 to 9.

A string is called semi-repetitive if there is at most one adjacent pair of the same digit.
For example, "0010", "002020", "0123", "2002", and "54944" are semi-repetitive while the following are not: "00101022" (adjacent same digit pairs are 00 and 22), and "1101234883" (adjacent same digit pairs are 11 and 88).

Return the length of the longest semi-repetitive of s.
------------------------------------------------------------------------------------
Example:
Example 1:

Input: s = "52233"

Output: 4

Explanation:

The longest semi-repetitive substring is "5223". Picking the whole string "52233" has two adjacent same digit pairs 22 and 33, but at most one is allowed.

Example 2:

Input: s = "5494"

Output: 4

Explanation:

s is a semi-repetitive string. as there are no adjacent pair

Example 3:

Input: s = "1111111"

Output: 2

Explanation:

The longest semi-repetitive substring is "11". Picking the substring "111" has two adjacent same digit pairs, but at most one is allowed.

------------------------------------------------------------------------------------
Input:

------------------------------------------------------------------------------------
Constraints:

    1 <= s.length <= 50
    '0' <= s[i] <= '9'

------------------------------------------------------------------------------------

*/

/**
 Intuition: 
 -NOTE: the problems states at most 1 adjacent pair . which means a substring can have no pairs .

 Algo:
  for the current window , we need to track that there is at most 1 pair 
  and update the substring while the condition is valid 
  ie: keep expanding the window , until the condition is no longer valid
  once th condition is no longer valid  adjust the window size by first reducing it from the left 



 Time Complexity: O(N)
 Space Complexity: O(1)
 Notes: 
 */
var longestSemiRepetitiveSubstringUsingCount = function(s) {
  const N =  s.length
  let left = 0
  let pairCount = 0
  let substring = ''
  let maxSubstrLen = 0
    // 1. Expand the window
    for(let right = 0 ; right < N; right++) {
      // 2. check for condition as the minimum window size can be 1
      // check if it is a pair
      if (s[right-1] && s[right-1] === s[right]) {
        // increment the pair count 
        ++pairCount
        // console.info(`Found pair (${s[right-1]}, ${s[right-1]}), pairCount: ${pairCount}`)
      }
      // if the pair is less than 1 then increment the maxSubLen
      if (pairCount <= 1) {
        maxSubstrLen = Math.max(maxSubstrLen, right-left + 1)
        // console.info(`pair count is: ${pairCount} <= 1; Current max String length : ${maxSubstrLen}`)
      } else  {
        // shrink the window , until the pair count is 1
        // left++
        while(pairCount > 1) {
          if(s[left] == s[left+1]) pairCount--
          left++
        }
        maxSubstrLen = Math.max(maxSubstrLen, right-left + 1)
      }

    }
    return maxSubstrLen
};


  function longestSemiRepetitiveSubstring(s) {
      let ans = 1, left = 0, right = 1, last = 0;
      while(right < s.size()){
          if(s[right] == s[right-1]) {
              if (last) left = last; //This is needed only for the first duplicate found, as we don't want to update the value of left for the first duplicate. As one duplicate is allowed.
              last = right;
          }
          ans = max(ans, right - left+1);
          right++;
      }
      return ans;
    }
// Driver code
 

var main = function () {
  const fn = longestSemiRepetitiveSubstring
  const input = [
    // "52233",
    // "5494",
    // "111111",
    "0001",
    "524446"
  ]

  const expected = [4,4,2,3,4]
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

main();