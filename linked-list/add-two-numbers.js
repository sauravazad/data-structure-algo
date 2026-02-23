/*
Problem link : https://leetcode.com/problems/add-two-numbers
------------------------------------------------------------------------------------
Description: 2. Add Two Numbers

You are given two non-empty linked lists representing two non-negative integers. The digits are stored in reverse order, and each of their nodes contains a single digit. Add the two numbers and return the sum as a linked list.

You may assume the two numbers do not contain any leading zero, except the number 0 itself.
------------------------------------------------------------------------------------
Example:

Example 1:

Input: l1 = [2,4,3], l2 = [5,6,4]
Output: [7,0,8]
Explanation: 342 + 465 = 807.

Example 2:

Input: l1 = [0], l2 = [0]
Output: [0]

Example 3:

Input: l1 = [9,9,9,9,9,9,9], l2 = [9,9,9,9]
Output: [8,9,9,9,0,0,0,1]

------------------------------------------------------------------------------------
Input:

------------------------------------------------------------------------------------
Constraints:

------------------------------------------------------------------------------------

*/

/**
 Intuition: 
 Time Complexity: 
 Space Complexity:
 Notes: 
 */
/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
var addTwoNumbers = function(l1, l2) {
  // iterate through the node and if the sum is more than 9 carry over to the next node
  let head = new ListNode(null)
  let dummyHead = head
  let l1head = l1
  let l2head = l2
  let carry = 0
  // if either of the node is not null we can keep adding
  while(l1head !== null || l2head !== null) {
    let d1 = l1head !== null ? l1head.val : 0
    let d2 = l2head !== null ? l2head.val : 0
    const sum = d1 + d2 + carry
    carry = parseInt(sum / 10)
    const d = sum % 10
    const node = new ListNode(d)
    dummyHead.next = node
    dummyHead = dummyHead.next
    l1head = l1head?.next ?? null
    l2head = l2head?.next ?? null
  }
  // check if the carry is non zero then we need to add a new node for the value at the end
  if (carry !== 0) {
    const node = new ListNode(carry)
    dummyHead.next = node
  }
  return head.next
};
// Driver code
 
function ListNode(val, next) {
    this.val = (val===undefined ? 0 : val)
    this.next = (next===undefined ? null : next)
}
const buildLinkedList = (list) => {
  if(list.length == 0) return null
  let llHead = new ListNode(list[0], null)
  let current = llHead
  for(let i = 1 ; i < list.length; i++) {
    // build new node
    const node = new ListNode(list[i], null)
    current.next = node
    current = current.next
  }
  return llHead
}

var main = function () {
  const fn = addTwoNumbers
  const input = [
    [[2,4,3],[5,6,4]],
    [[0], [0]]
  ]
  /**
   *  Fill the time complexity for each function
   */

  for (var i = 0; i < input.length; i++) {
      console.log(i + 1 + ".\t Input array: \t", input[i]);
      var result = fn(buildLinkedList(input[i][0]), buildLinkedList(input[i][1]));
      console.log("\t Result is \t: ",result);
      console.log("-".repeat(100));
  }
}

main();