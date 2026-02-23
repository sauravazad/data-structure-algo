/*
Problem link : https://leetcode.com/problems/valid-parentheses/description/
------------------------------------------------------------------------------------
Description: 20. Valid Parentheses
Given a string s containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.

An input string is valid if:

    Open brackets must be closed by the same type of brackets.
    Open brackets must be closed in the correct order.
    Every close bracket has a corresponding open bracket of the same type.


------------------------------------------------------------------------------------
Example:

Example 1:

Input: s = "()"

Output: true

Example 2:

Input: s = "()[]{}"

Output: true

Example 3:

Input: s = "(]"

Output: false

Example 4:

Input: s = "([])"

Output: true

Example 5:

Input: s = "([)]"

Output: false


------------------------------------------------------------------------------------
Input:

------------------------------------------------------------------------------------
Constraints:


    1 <= s.length <= 104
    s consists of parentheses only '()[]{}'.


------------------------------------------------------------------------------------

*/

/**
 Intuition: 
 Time Complexity: 
 Space Complexity:
 Notes: 
 */
var isValid = function(s) {
  const hash = {
    ")": "(",
    "]":"[",
    "}": "{"
  }
  let stack = []
  for(let i = 0 ; i < s.length; i++) {
    const last = stack[stack.length -1]
    if(stack.length && last && hash[s[i]] == last) { stack.pop() }
    else {
      stack.push(s[i])
    }
    // console.info(stack)
  }
  return stack.length === 0
};

// Driver code
 

var main = function () {
  const fn = isValid
  const input = [
    "()",
    "()[]{}",
    "(]",
    "([])",
    "([)]"
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

main();