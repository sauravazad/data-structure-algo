/*
Problem link : https://leetcode.com/problems/merge-two-sorted-lists
------------------------------------------------------------------------------------
Description: 21. Merge Two Sorted Lists

You are given the heads of two sorted linked lists list1 and list2.

Merge the two lists into one sorted list. The list should be made by splicing together the nodes of the first two lists.

Return the head of the merged linked list.
------------------------------------------------------------------------------------
Example:
Input: list1 = [1,2,4], list2 = [1,3,4]
Output: [1,1,2,3,4,4]

Example 2:

Input: list1 = [], list2 = []
Output: []

Example 3:

Input: list1 = [], list2 = [0]
Output: [0]


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
 * @param {ListNode} list1
 * @param {ListNode} list2
 * @return {ListNode}
 */
var mergeTwoListsIter = function(list1, list2) {

  // create a dummy head to track 
  let pre = new ListNode(-1, null)
  let previous = pre
  
  while(list1 !== null && list2 !== null) {
    if(list1.val > list2.val) {
      previous.next = list2
      list2 = list2.next
    } else  {
      previous.next = list1
      list1 = list1.next
    }
    previous = previous.next
  }
  // check the scenario where now either of them are null or were null
  if(list1 !== null) {
    previous.next = list1
  } else {
    previous.next = list2
  }
  return pre.next
};

var mergeTwoLists = (l1, l2) => {
  // first check for nulls
  if(l1 == null) {
    return l2
  } else if (l2 == null) {
    return l1
  } else if(l1.val < l2.val) {
    l1.next = mergeTwoLists(l1.next, l2)
    return l1
  } else  {
    l2.next = mergeTwoLists(l2.next, l1)
    return l2
  }
}
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
  const fn = mergeTwoLists
  const input = [
    [[1,2,4], [1,3,4]],
    [[], []],
    [[], [0]]
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