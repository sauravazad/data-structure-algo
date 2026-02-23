/*
Problem link : https://leetcode.com/problems/remove-nth-node-from-end-of-list
------------------------------------------------------------------------------------
Description: 19. Remove Nth Node From End of List

Given the head of a linked list, remove the nth node from the end of the list and return its head.
------------------------------------------------------------------------------------
Example:

Example 1:

Input: head = [1,2,3,4,5], n = 2
Output: [1,2,3,5]

Example 2:

Input: head = [1], n = 1
Output: []

Example 3:

Input: head = [1,2], n = 1
Output: [1]

------------------------------------------------------------------------------------
Input:

------------------------------------------------------------------------------------
Constraints:


    The number of nodes in the list is sz.
    1 <= sz <= 30
    0 <= Node.val <= 100
    1 <= n <= sz


------------------------------------------------------------------------------------

*/

/**
 Intuition: 
  Approach 1: 
    Iterate through the list find the length
    move the pointer to the n-1 th node
    reassign the node
    return the head node

  Approach 2: 
    create two pointer to the head
      current
      next_current
    move the current pointer by n 
    now move both the pointers by 1 until current is at the end
    update the next_current to next.next

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
 * @param {ListNode} head
 * @param {number} n
 * @return {ListNode}
 */
var removeNthFromEnd = function(head, n) {
    let length = 0
    let dummy = new ListNode(0);
    dummy.next = head;
    let first = head
    while(first !== null) {
      length++
      first = first.next
    }
    // update the length  with node we need to remove
    length -= n

    first = dummy // re assign to a new node to preserve
    while(length > 0) {
      length--
      first = first.next
    }
    first.next = first.next?.next // re assign
    return dummy.next
};

var removeNthFromEndOnePass = function(head, n) {
    let dummy = new ListNode(0);
    dummy.next = head;
    let first = dummy;
    let second = dummy;
    // Advances first pointer so that the gap between first and second is n nodes apart
    for (let i = 1; i <= n + 1; i++) {
        first = first.next;
    }
    // Move first to the end, maintaining the gap
    while (first !== null) {
        first = first.next;
        second = second.next;
    }
    second.next = second.next.next;
    return dummy.next;
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
  const fn = removeNthFromEnd
  const input = [
    [[1,2,3,4,5], 2]
  ]
  /**
   *  Fill the time complexity for each function
   */

  for (var i = 0; i < input.length; i++) {
      console.log(i + 1 + ".\t Input array: \t", input[i]);
      var result = fn(buildLinkedList(input[i][0]), input[i][1]);
      console.log("\t Result is \t: ",result);
      console.log("-".repeat(100));
  }
}

main();