/*
Problem link : https://leetcode.com/problems/merge-k-sorted-lists
------------------------------------------------------------------------------------
Description: 23. Merge k Sorted Lists
You are given an array of k linked-lists lists, each linked-list is sorted in ascending order.

Merge all the linked-lists into one sorted linked-list and return it.

------------------------------------------------------------------------------------
Example:
Example 1:

Input: lists = [[1,4,5],[1,3,4],[2,6]]
Output: [1,1,2,3,4,4,5,6]
Explanation: The linked-lists are:
[
  1->4->5,
  1->3->4,
  2->6
]
merging them into one sorted linked list:
1->1->2->3->4->4->5->6

Example 2:

Input: lists = []
Output: []

Example 3:

Input: lists = [[]]
Output: []

 
------------------------------------------------------------------------------------
Input:

------------------------------------------------------------------------------------
Constraints:


    k == lists.length
    0 <= k <= 104
    0 <= lists[i].length <= 500
    -104 <= lists[i][j] <= 104
    lists[i] is sorted in ascending order.
    The sum of lists[i].length will not exceed 104.

------------------------------------------------------------------------------------

*/

/**
 Intuition: 
  1. iterate through all the list and collect the value in an array
      sort the array 
      build the linked list and return 
      Time complexity : O(N) + O(NlogN) + O(N) = O(NlogN)
      Space complexity : O(N) + O(N) = O(2N)
  2. Simply merge the two list and keep on doing until there is only one list left
  3. Merge with Divide and concur
    3.1 Pick k list and merge each pair
    3.2 after first pair , k list are merged to create k/2 list with length 2N/k then k/4 , k/8
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
 * @param {ListNode[]} lists
 * @return {ListNode}
 */
/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode[]} lists
 * @return {ListNode}
 */
var mergeKLists = function(lists) {
  let total = lists.length
  let interval = 1

  // while interval is less than the total length
  while(interval < total) {
    for(let i = 0; i + interval < total ; i += interval * 2) { // total - interval : is necessary because we don't want to overflow the bound of list while merging
      lists[i] = mergeTwoLists(lists[i], lists[i + interval])
    }
    interval *=2
  }
  return total > 0 ? lists[0] : null

};

/**
 * Time complexity O(N)
 * Space complexity O(1)
 * @param {ListNode} l1 
 * @param {ListNode} l2 
 * @returns 
 */
var mergeTwoLists = (list1, list2) => {
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
}

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
  const fn = mergeKLists
  const input = []
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