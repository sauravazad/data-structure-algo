'''
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

'''
import heapq
from typing import List, Optional
# Definition for singly-linked list.
class ListNode:
  def __init__(self, val=0, next=None):
    self.val = val
    self.next = next

class HeapNode:
  def __init__(self, node):
    self.node = node

  def __lt__(self, other):
    # Define comparison based on ListNode's value
    return self.node.val < other.node.val

class Solution:
    def mergeKLists(self, lists: List[Optional[ListNode]]) -> Optional[ListNode]:
      dummy = HeapNode(0)
      current = dummy
      heap = []
      # Initialize the heap
      for l in lists:
        if l :
          heapq.heappush(heap, HeapNode(l))
      #  extract the min node and add it's next node to the heap
      
      while heap:
        heap_node = heapq.heappop(heap)
        node = heap_node.node
        current.next = node
        current = current.next
        if node.next:
          heapq.heappush(heap, HeapNode(node.next))

      return dummy.next

if __name__ == '__main__':
  '''
    Driver function to execute the function with inputs
  '''
  solution = Solution()
  fn = solution.problemFn
  input = [
    [[1,2,2,2,9,9,9], 3],
  ]
  for i in input:
    print( ".\t Input array: \t", *i)
    result = fn(i[0], i[1])
    print('\t Result is \t: ', result)
    print("-" * 100)
  