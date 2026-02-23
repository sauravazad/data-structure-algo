/*
Problem link : https://leetcode.com/problems/reverse-linked-list
------------------------------------------------------------------------------------
Description: 206. Reverse Linked List
Given the head of a singly linked list, reverse the list, and return the reversed list.

------------------------------------------------------------------------------------
Example:
Example 1:

Input: head = [1,2,3,4,5]
Output: [5,4,3,2,1]

Example 2:
Input: head = [1,2]
Output: [2,1]

Example 3:

Input: head = []
Output: []

------------------------------------------------------------------------------------
Input:

------------------------------------------------------------------------------------
Constraints:

    The number of nodes in the list is the range [0, 5000].
    -5000 <= Node.val <= 5000


------------------------------------------------------------------------------------

*/

/**
 Intuition: 
 Time Complexity: 
 Space Complexity:
 Notes: 
 */

/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var reverseList = function(head) {
    let previous = null
    let current = head
    while(current) {
        let tmp = current.next
        current.next = previous
        previous = current
        current = tmp
    }
    return previous
};

/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
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
// Driver code
 

var main = function () {
  const fn = reverseList
  const input = [
    [1,2,3,4,5],
    [1,2],
    []
  ]
  /**
   *  Fill the time complexity for each function
   */

  for (var i = 0; i < input.length; i++) {
      console.log(i + 1 + ".\t Input array: \t", input[i]);
      var result = fn(buildLinkedList(input[i]));
      console.log("\t Result is \t: ",result);
      console.log("-".repeat(100));
  }
}

main();