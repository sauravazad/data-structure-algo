/*
Problem link : https://leetcode.com/problems/evaluate-reverse-polish-notation/description/
------------------------------------------------------------------------------------
Description: 150. Evaluate Reverse Polish Notation

You are given an array of strings tokens that represents an arithmetic expression in a Reverse Polish Notation.

Evaluate the expression. Return an integer that represents the value of the expression.

Note that:

    The valid operators are '+', '-', '*', and '/'.
    Each operand may be an integer or another expression.
    The division between two integers always truncates toward zero.
    There will not be any division by zero.
    The input represents a valid arithmetic expression in a reverse polish notation.
    The answer and all the intermediate calculations can be represented in a 32-bit integer.


------------------------------------------------------------------------------------
Example:
Example 1:

Input: tokens = ["2","1","+","3","*"]
Output: 9
Explanation: ((2 + 1) * 3) = 9

Example 2:

Input: tokens = ["4","13","5","/","+"]
Output: 6
Explanation: (4 + (13 / 5)) = 6

Example 3:

Input: tokens = ["10","6","9","3","+","-11","*","/","*","17","+","5","+"]
Output: 22
Explanation: ((10 * (6 / ((9 + 3) * -11))) + 17) + 5
= ((10 * (6 / (12 * -11))) + 17) + 5
= ((10 * (6 / -132)) + 17) + 5
= ((10 * 0) + 17) + 5
= (0 + 17) + 5
= 17 + 5
= 22

 
------------------------------------------------------------------------------------
Input:

------------------------------------------------------------------------------------
Constraints:

    1 <= tokens.length <= 104
    tokens[i] is either an operator: "+", "-", "*", or "/", or an integer in the range [-200, 200].

------------------------------------------------------------------------------------

*/

/**
 Intuition: 
 Time Complexity: 
 Space Complexity:
 Notes: 
 */
var evalRPN = function(tokens) {
  let stack = []
  const operators = {
    "+": true,
    "-": true,
    "/": true,
    "*": true
  }

  for(let i = 0 ; i < tokens.length; i++) {
    const token = tokens[i]
    if(operators[token] && stack.length >= 2) {
      const second = parseInt(stack.pop()) 
      const first = parseInt(stack.pop()) 
      // console.info(`first: ${first}`, token, `second: ${second}`)
      switch(token) {
        case "+": stack.push(first + second);break
        case "-": stack.push(first - second);break
        case "*": stack.push(first * second);break
        case "/": stack.push(parseInt(first / second));break
        default: break
      }
    } else {
      stack.push(token)
    }
  }
    return parseInt(stack.pop())
};
// Driver code
 

var main = function () {
  const fn = evalRPN
  const input = [
    ["2","1","+","3","*"],
    ["4","13","5","/","+"],
    ["10","6","9","3","+","-11","*","/","*","17","+","5","+"]
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