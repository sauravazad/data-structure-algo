/*
Problem link : https://leetcode.com/problems/valid-palindrome/description/
------------------------------------------------------------------------------------
Description: 125. Valid Palindrome
A phrase is a palindrome if, after converting all uppercase letters into lowercase letters and removing all non-alphanumeric characters,
 it reads the same forward and backward. Alphanumeric characters include letters and numbers.

Given a string s, return true if it is a palindrome, or false otherwise.

------------------------------------------------------------------------------------
Example:
Example 1:

Input: s = "A man, a plan, a canal: Panama"
Output: true
Explanation: "amanaplanacanalpanama" is a palindrome.

Example 2:

Input: s = "race a car"
Output: false
Explanation: "raceacar" is not a palindrome.

Example 3:

Input: s = " "
Output: true
Explanation: s is an empty string "" after removing non-alphanumeric characters.
Since an empty string reads the same forward and backward, it is a palindrome.

------------------------------------------------------------------------------------
Input:

------------------------------------------------------------------------------------
Constraints:

    1 <= s.length <= 2 * 105
    s consists only of printable ASCII characters.

------------------------------------------------------------------------------------

*/

/**
 Intuition: 
 Time Complexity: 
 Space Complexity:
 Notes: 
 */
var isPalindrome = function(s) {
  let left = 0
  let right = s.length -1

  while(left<=right) {
    // check if the current pointer elements are alphanumeric else increment
    if(isAlphanumeric(s[left]) && isAlphanumeric(s[right]))  {
      console.info(`left : ${s[left]} right : ${s[right]}`)
      if(s[left].toLowerCase() != s[right].toLowerCase()) return false
      left++
      right--
    } else {
      // there is a non alphanumeric character , move its pointer
      if(isAlphanumeric(s[left])== false) {
        left++
      }
      if(isAlphanumeric(s[right])== false) {
        right--
      }
    }
  }
  return true
    
};

const isAlphanumeric = (c) => {
  const ascii = c.charCodeAt(0)
  return((ascii >= 48 && ascii <= 57) || (ascii >= 97 && ascii <= 122) || (ascii >=65 && ascii <=90))
}
// Driver code
 

var main = function () {
  const fn = isPalindrome
  const input = ["A man, a plan, a canal: Panama", "race a car"]
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