/*
Problem link : https://leetcode.com/problems/reorder-list
------------------------------------------------------------------------------------
Description: 143. Reorder List
You are given the head of a singly linked-list.

The positions of a linked list of length = 7 for example, can initially be represented as:

[0, 1, 2, 3, 4, 5, 6]

Reorder the nodes of the linked list to be in the following order:

[0, 6, 1, 5, 2, 4, 3]

Notice that in the general case for a list of length = n the nodes are reordered to be in the following order:

[0, n-1, 1, n-2, 2, n-3, ...]

You may not modify the values in the list's nodes, but instead you must reorder the nodes themselves.

------------------------------------------------------------------------------------
Example:
Example 1:

Input: head = [1,2,3,4]
Output: [1,4,2,3]

Example 2:

Input: head = [1,2,3,4,5]
Output: [1,5,2,4,3]

------------------------------------------------------------------------------------
Input:

------------------------------------------------------------------------------------
Constraints:

    The number of nodes in the list is in the range [1, 5 * 104].
    1 <= Node.val <= 1000

------------------------------------------------------------------------------------

*/

/**
 Intuition: 
 Time Complexity: 
 Space Complexity:
 Notes: 
 */
var reorderList = function(head) {
  // Find the middle of the list using slow and fast pointers
  let slow = head
  let fast = head.next
  while(fast && fast.next) {
    slow = slow.next
    fast = fast.next.next
  }

  // Reverse the second half
  let second = slow.next
  slow.next = null  // Split the list
  let previous = null
  while(second) {
    let tmp = second.next  //  Store next before modifying
    second.next = previous
    previous = second
    second = tmp  //  Move to next node
  }

  // Merge the two halves
  let first = head
  let second_new = previous
  while(second_new) {
    let tmp1 = first.next
    let tmp2 = second_new.next  //  Use second_new, not undefined 'second'
    first.next = second_new
    second_new.next = tmp1
    first = tmp1
    second_new = tmp2  //  Update second_new
  }
    
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
  const fn = reorderList
  const input = [[1,2,3,4], [1,2,3,4,5]]
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