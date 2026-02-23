/*
Problem link : https://leetcode.com/problems/linked-list-cycle/
------------------------------------------------------------------------------------
Description: 141. Linked List Cycle
Given head, the head of a linked list, determine if the linked list has a cycle in it.

There is a cycle in a linked list if there is some node in the list that can be reached again by continuously following the next pointer. Internally, pos is used to denote the index of the node that tail's next pointer is connected to. Note that pos is not passed as a parameter.

Return true if there is a cycle in the linked list. Otherwise, return false.

------------------------------------------------------------------------------------
Example:
Example 1:

Input: head = [3,2,0,-4], pos = 1
Output: true
Explanation: There is a cycle in the linked list, where the tail connects to the 1st node (0-indexed).

Example 2:

Input: head = [1,2], pos = 0
Output: true
Explanation: There is a cycle in the linked list, where the tail connects to the 0th node.

Example 3:

Input: head = [1], pos = -1
Output: false
Explanation: There is no cycle in the linked list.

------------------------------------------------------------------------------------
Input:

------------------------------------------------------------------------------------
Constraints:

    The number of the nodes in the list is in the range [0, 104].
    -105 <= Node.val <= 105
    pos is -1 or a valid index in the linked-list.


------------------------------------------------------------------------------------

*/

/**
 Intuition: use fast and slow pointer to track if fast and slow meets that means there is a loop
 Time Complexity: 
 Space Complexity:
 Notes: 
 */
/**
 * @param {ListNode} head
 * @return {boolean}
 */
var hasCycle = function(head) {
    if (head == null) return false
    let slow = head
    let fast = head.next
    while(slow!=fast)  {
        if(fast==null || fast.next == null) {
            return false
        }
        slow = slow.next
        fast = fast.next.next
    }
    return true
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
  const fn = hasCycle
  const input = []
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