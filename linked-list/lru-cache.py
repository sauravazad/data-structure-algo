'''
Problem link : https://leetcode.com/problems/lru-cache

------------------------------------------------------------------------------------
Description:
Design a data structure that follows the constraints of a Least Recently Used (LRU) cache.

Implement the LRUCache class:

    LRUCache(int capacity) Initialize the LRU cache with positive size capacity.
    int get(int key) Return the value of the key if the key exists, otherwise return -1.
    void put(int key, int value) Update the value of the key if the key exists. Otherwise, add the key-value pair to the cache. If the number of keys exceeds the capacity from this operation, evict the least recently used key.

The functions get and put must each run in O(1) average time complexity.

------------------------------------------------------------------------------------
Example 1:

Input
["LRUCache", "put", "put", "get", "put", "get", "put", "get", "get", "get"]
[[2], [1, 1], [2, 2], [1], [3, 3], [2], [4, 4], [1], [3], [4]]
Output
[null, null, null, 1, null, -1, null, -1, 3, 4]

Explanation
LRUCache lRUCache = new LRUCache(2);
lRUCache.put(1, 1); // cache is {1=1}
lRUCache.put(2, 2); // cache is {1=1, 2=2}
lRUCache.get(1);    // return 1
lRUCache.put(3, 3); // LRU key was 2, evicts key 2, cache is {1=1, 3=3}
lRUCache.get(2);    // returns -1 (not found)
lRUCache.put(4, 4); // LRU key was 1, evicts key 1, cache is {4=4, 3=3}
lRUCache.get(1);    // return -1 (not found)
lRUCache.get(3);    // return 3
lRUCache.get(4);    // return 4

------------------------------------------------------------------------------------
Constraints:


    1 <= capacity <= 3000
    0 <= key <= 104
    0 <= value <= 105
    At most 2 * 105 calls will be made to get and put.

------------------------------------------------------------------------------------
'''
from typing import List

class ListNode:
    def __init__(self, key: int, value: int):
        self.key = key
        self.value = value
        self.next = None
        self.prev = None
  
class LRUCache:

  def __init__(self, capacity: int):
    self.capacity = capacity
    self.dict = {}
    self.head = ListNode(-1, -1)
    self.tail = ListNode(-1, -1)
    # set the next and previous
    self.head.next = self.tail
    self.tail.prev = self.head



  def get(self, key: int) -> int:
    # check if the key is not present in the hash
    if key not in self.dict:
       return -1
    node = self.dict[key]
    # remove first 
    self.remove(node)
    # add back to maintain latest access
    self.add(node)
    return node.val


  def put(self, key: int, value: int) -> None:
    # first remove if present
    # create new node
    # add to hash
    # add to the linked list
    # if the capacity has exceeded remove from front
    if key in self.dict:
      self.remove(self.dict[key])
    node = ListNode(key, value)
    self.add(node)
    self.dict[key] = node
    if self.dict.size > self.capacity:
      node_to_delete = self.head.next
      self.remove(node_to_delete)
      self.dict.delete(node_to_delete.key)
     
  def add(self, node: ListNode) -> None:
     # add it to the tail
     prev = self.tail.prev
     prev.next = node
     node.prev = self.tail
     # update the tail
     self.tail.prev = node

  def remove(self, node: ListNode) -> None:
    prev = node.prev
    next = node.next

    # re assign the next and previous
    prev.next = next
    next.prev = prev

        

if __name__ == '__main__':
  '''
    Driver function to execute the function with inputs
  '''
  fn = LRUCache()
  input = [
    [[1,2,2,2,9,9,9], 3],
  ]
  for i in input:
    print( ".\t Input array: \t", *i)
    result = fn(i[0], i[1])
    print('\t Result is \t: ', result)
    print("-" * 100)
  