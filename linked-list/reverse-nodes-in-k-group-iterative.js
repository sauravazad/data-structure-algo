/*
Problem link : https://leetcode.com/problems/reverse-nodes-in-k-group
------------------------------------------------------------------------------------
Description: 25. Reverse Nodes in k-Group
Given the head of a linked list, reverse the nodes of the list k at a time, and return the modified list.

k is a positive integer and is less than or equal to the length of the linked list. If the number of nodes is not a multiple of k then left-out nodes, in the end, should remain as it is.

You may not alter the values in the list's nodes, only nodes themselves may be changed.

------------------------------------------------------------------------------------
Example:
Example 1:

Input: head = [1,2,3,4,5], k = 2
Output: [2,1,4,3,5]

Example 2:

Input: head = [1,2,3,4,5], k = 3
Output: [3,2,1,4,5]

------------------------------------------------------------------------------------
Input:

------------------------------------------------------------------------------------
Constraints:
The number of nodes in the list is n.
1 <= k <= n <= 5000
0 <= Node.val <= 1000
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
 */
function ListNode(val, next) {
    this.val = (val===undefined ? 0 : val)
    this.next = (next===undefined ? null : next)
}
/**
 * @param {ListNode} head
 * @param {number} k
 * @return {ListNode}
 */
var reverseKGroup = function (head, k) {
  /**
   Intuition:
    - iterate over the list
    - find the kth node
      - if not kth node leave as it is.
    - reverse the nodes 
    - re attach to the correct position
   */
   const dummy = new ListNode(0, head)
   let groupPrev = dummy
   
   while(true) {
    // get the kth node
    const kth = getKthNode(groupPrev, k)
    if(kth === null) break; // less than k nodes are left

    const groupNext = kth.next // node after the current group
    
    // reverse the group
    let prev = groupNext
    let current = groupPrev.next
    
    while(current !== groupNext) {
      const tmp = current.next
      current.next = prev
      prev = current
      current = tmp
    }
    
    // reconnect the reversed group
    const tmp = groupPrev.next // current tail of the reversed group
    // connect the new head node of reversed  group to grouprev
    groupPrev.next = kth
    // re assign the groupPrev to tail of the current group
    groupPrev = tmp
   }
   return dummy.next;
};

const getKthNode = (head, k) => {
  while(head && k > 0) {
    head = head.next
    k--
  }
  return head
}
const reverseLinkedList = (head, n) => {
  let previous = null
  let current = head
  while(current && n > 0) {
    let tmp = current.next
    // assign current .next to previous node
    current.next = previous
    // update previous to current node
    previous = current
    // move the current node to next node using tmp
    current = tmp
    n--
  }
  return previous
}
// Driver code
 
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
  const fn = reverseKGroup
  const input = [
    [[1,2,3,4,5, 7, 9, 10, 42, 67], 2],
    [[1,2,3,4,5], 3]
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