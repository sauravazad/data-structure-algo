/*
Problem link : https://leetcode.com/problems/min-stack/description/
------------------------------------------------------------------------------------
Description: 
155. Min Stack

Design a stack that supports push, pop, top, and retrieving the minimum element in constant time.

Implement the MinStack class:

    MinStack() initializes the stack object.
    void push(int val) pushes the element val onto the stack.
    void pop() removes the element on the top of the stack.
    int top() gets the top element of the stack.
    int getMin() retrieves the minimum element in the stack.

You must implement a solution with O(1) time complexity for each function.

------------------------------------------------------------------------------------
Example:

Example 1:

Input
["MinStack","push","push","push","getMin","pop","top","getMin"]
[[],[-2],[0],[-3],[],[],[],[]]

Output
[null,null,null,null,-3,null,0,-2]

Explanation
MinStack minStack = new MinStack();
minStack.push(-2);
minStack.push(0);
minStack.push(-3);
minStack.getMin(); // return -3
minStack.pop();
minStack.top();    // return 0
minStack.getMin(); // return -2


------------------------------------------------------------------------------------
Input:

------------------------------------------------------------------------------------
Constraints:


    -231 <= val <= 231 - 1
    Methods pop, top and getMin operations will always be called on non-empty stacks.
    At most 3 * 104 calls will be made to push, pop, top, and getMin.


------------------------------------------------------------------------------------

*/

/**
 Intuition: 
 Time Complexity: 
 Space Complexity:
 Notes: 
 */
class MinStack {
    constructor() {
        // push value and current min {val: val, min}
        this.stack = []
    }

    /**
     * @param {number} val
     * @return {void}
     */
    push(val) {
        let min = this.stack.length ? Math.min(val, this.getMin()) : val;
        this.stack.push({value: val, min: min})
    }

    /**
     * @return {void}
     */
    pop() {
        this.stack.pop()
    }

    /**
     * @return {number}
     */
    top() {
        return this.stack[this.stack.length - 1].value
    }

    /**
     * @return {number}
     */
    getMin() {
        return this.stack[this.stack.length - 1].min
    }
}
// Driver code
 

var main = function () {
  const fn = MinStack
  const input = [
    ["MinStack","push","push","push","getMin","pop","top","getMin"],
    [[],[-2],[0],[-3],[],[],[],[]]
  ]
  /**
   *  Fill the time complexity for each function
   */

  for (var i = 1; i < input[0].length; i++) {
      console.log(i + 1 + ".\t Input array: \t", input[i]);
      const min = new MinStack()
      var result = min[input[0][i]](input[1][i]);
      console.log("\t Result is \t: ",result);
      console.log("-".repeat(100));
  }
}

main();