/*
Problem link : https://leetcode.com/problems/find-smallest-letter-greater-than-target
------------------------------------------------------------------------------------
Description: 744. Find Smallest Letter Greater Than Target
You are given an array of characters letters that is sorted in non-decreasing order, and a character target. 
There are at least two different characters in letters.
Return the smallest character in letters that is lexicographically greater than target. 
If such a character does not exist, return the first character in letters.
------------------------------------------------------------------------------------
Example:

Example 1:

Input: letters = ["c","f","j"], target = "a"
Output: "c"
Explanation: The smallest character that is lexicographically greater than 'a' in letters is 'c'.

Example 2:

Input: letters = ["c","f","j"], target = "c"
Output: "f"
Explanation: The smallest character that is lexicographically greater than 'c' in letters is 'f'.

Example 3:

Input: letters = ["x","x","y","y"], target = "z"
Output: "x"
Explanation: There are no characters in letters that is lexicographically greater than 'z' so we return letters[0].


------------------------------------------------------------------------------------
Input:

------------------------------------------------------------------------------------
Constraints:


    2 <= letters.length <= 104
    letters[i] is a lowercase English letter.
    letters is sorted in non-decreasing order.
    letters contains at least two different characters.
    target is a lowercase English letter.

------------------------------------------------------------------------------------

*/

/**
 Intuition: It is a simple search , but if you check teh constraint , the elements are in non-decreasing order ie: ascending order.
 We can simply use binary search to find the closed element
 Time Complexity: 
 Space Complexity:
 Notes: 
 */
var nextGreatestLetter = function(letters, target) {
  let lo = 0
  let hi = letters.length -1

  while(lo <= hi) {
    let mid = lo + parseInt((hi - lo ) /2)
    console.info(`hi: ${hi} lo : ${lo} mid: ${mid}`)
    if (letters[mid].charCodeAt(0) <= target.charCodeAt(0)) {
      lo = mid + 1
    } else  {
      hi = mid - 1
    }
  }
  if (lo === letters.length) {
    return  letters[0]
  } else {
    return letters[lo]
  }
  
    
};
// Driver code
 

var main = function () {
  const fn = nextGreatestLetter
  const input = [
    [["c","f","j"], "a"],
    [["c","f","j"], "c"],
    [["x","x","y","y"], "z"]
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