/*
Problem link : https://leetcode.com/problems/copy-list-with-random-pointer
------------------------------------------------------------------------------------
Description: 138. Copy List with Random Pointer
A linked list of length n is given such that each node contains an additional random pointer, which could point to any node in the list, or null.

Construct a deep copy of the list. The deep copy should consist of exactly n brand new nodes, where each new node has its value set to the value of its corresponding original node. Both the next and random pointer of the new nodes should point to new nodes in the copied list such that the pointers in the original list and copied list represent the same list state. None of the pointers in the new list should point to nodes in the original list.

For example, if there are two nodes X and Y in the original list, where X.random --> Y, then for the corresponding two nodes x and y in the copied list, x.random --> y.

Return the head of the copied linked list.

The linked list is represented in the input/output as a list of n nodes. Each node is represented as a pair of [val, random_index] where:

    val: an integer representing Node.val
    random_index: the index of the node (range from 0 to n-1) that the random pointer points to, or null if it does not point to any node.

Your code will only be given the head of the original linked list.

------------------------------------------------------------------------------------
Example:
Example 1:

Input: head = [[7,null],[13,0],[11,4],[10,2],[1,0]]
Output: [[7,null],[13,0],[11,4],[10,2],[1,0]]

Example 2:

Input: head = [[1,1],[2,1]]
Output: [[1,1],[2,1]]

Example 3:

Input: head = [[3,null],[3,0],[3,null]]
Output: [[3,null],[3,0],[3,null]]

------------------------------------------------------------------------------------
Input:

------------------------------------------------------------------------------------
Constraints:

    0 <= n <= 1000
    -104 <= Node.val <= 104
    Node.random is null or is pointing to some node in the linked list.

------------------------------------------------------------------------------------

*/

/**
 Intuition: 
 Time Complexity: 
 Space Complexity:
 Notes: 
 */
/**
 * // Definition for a ListNode.
 * function _Node(val, next, random) {
 *    this.val = val;
 *    this.next = next;
 *    this.random = random;
 * };
 */

/**
 * @param {_Node} head
 * @return {_Node}
 */
var copyRandomList = function(head) {
    if (!head) return null;
    
    const hash = new Map();
    let dummy = head;
    
    // Step 1: Create copies of all nodes and store mapping
    while (dummy !== null) {
        hash.set(dummy, new ListNode(dummy.val, null, null));
        dummy = dummy.next;
    }
    
    // Step 2: Reset and connect next and random pointers
    dummy = head;
    while (dummy !== null) {
        const copy = hash.get(dummy);
        copy.next = hash.get(dummy.next) || null;
        copy.random = hash.get(dummy.random) || null;
        dummy = dummy.next;
    }
    
    return hash.get(head);
};

// Driver code
 
function ListNode(val, next, random) {
    this.val = (val===undefined ? 0 : val)
    this.next = (next===undefined ? null : next)
    this.random = random;
}
const buildLinkedList = (list) => {
  if(list.length == 0) return null
  let llHead = new ListNode(list[0][0], null, list[0][1])
  let current = llHead
  for(let i = 1 ; i < list.length; i++) {
    // build new node
    const node = new ListNode(list[i][0], null, list[i][1])
    current.next = node
    current = current.next
  }
  return llHead
}

var main = function () {
  const fn = copyRandomList
  const input = [
    [[7,null],[13,0],[11,4],[10,2],[1,0]],
    [[1,1],[2,1]],
    [[3,null],[3,0],[3,null]]
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