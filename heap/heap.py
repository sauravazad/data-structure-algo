from typing import List
from enum import Enum

class HeapType(Enum):
  MAX = 1
  MIN = 2
  CUSTOM = 3



class PriorityQueue:
  '''
    Represents the heap and preserves the heap property during adding/removing elements
    Further reading : https://github.com/python/cpython/blob/3.14/Lib/heapq.py
  '''
  items: List[int]
  heap_type: HeapType
  # comparator: function
  elements: int
  def __init__(self, type: HeapType, comparator = lambda a, b: a<=b ):
    self.items = []
    # self.build_heap(items)
    self.heap_type = type
    self.comparator = comparator 
    self.elements = 0
  
  def size(self) -> int:
    return self.elements
  
  def build_heap(self, items: List[int]) ->List[int] :
    print(" Populating the heap")
    for item in items :
      self.insert(item)

  def insert(self, item: int):
    '''
    Steps: 
      1. insert the item to the end of the array or list
      2. increment the element counter
      3. call heapify_up(index)
    '''
    print("inserting ", item)
    self.items.append(item)
    self.elements += 1
    self.heapify_up(len(self.items) - 1)
    
  
  def pop(self) -> int:
    count = len(self.items)
    if count > 0 :
      item = self.items[0]
      print("pop the element:\t", item)
      # check if the items are more than 1 only the we need to do heapify else simply pop the elements
      if count > 1:
        #  assign the last element form array to root
        self.items[0] = self.items[count -1]
        self.elements -= 1
        count -= 1
      # remove the last element form the list/array
      self.items.pop()
      #  call heapify down : only required if there is more than 1 element in the heap
      if count > 1:
        self.heapify_down(0)
      return item

  def heapify_down(self, element_index: int) -> None :
    # calculate left and right node index
    leftNode = (element_index * 2) + 1
    rightNode = (element_index * 2) + 2
    #  check if the heap property is not violated
    swap_index = element_index
    parent = self.items[element_index]
    # largest = element_index # for brevity suing largest for max-heap
    # print("parentIndex ", element_index, "leftNodeIndex:", leftNode ,"rightIndex", rightNode)
    # print("parent ", parent, "leftNode:", self.items[leftNode] ,"rightNode", self.items[rightNode])
    if leftNode < len(self.items) and self.comparator(self.items[leftNode], parent):
      swap_index = leftNode
    
    if rightNode < len(self.items) and self.comparator(self.items[rightNode], self.items[swap_index]):
      # if(self.comparator(self.items[largest], self.items[rightNode]) == False):
      swap_index = rightNode
    # swap the parent and the largest or smallest
    if swap_index !=  element_index:
      [self.items[element_index], self.items[swap_index]] = [self.items[swap_index], self.items[element_index]]
      self.heapify_down(swap_index)
      

    
  def heapify_up(self, node_index: int) -> None :
    # if we have reached the root node return
    if node_index == 0: return
    parent = (node_index - 1) // 2 # -1 as the array index is 0 to compensate
    #  check if the condition that parent is less/greater than the inserted child accordingly
    # print("compare parent", self.items[parent] , "child", self.items[node_index])
    if node_index > 0 and self.comparator(self.items[parent], self.items[node_index]) == False:
      # swap the element with its parent  and call heapify_up
      [self.items[node_index], self.items[parent]] = [self.items[parent], self.items[node_index]]
      self.heapify_up(parent)

      

def heap_sort(heap: PriorityQueue) -> List[int]:
    n = heap.size()

    result = []
    for i in range(n):
        result.append(heap.pop())
    return result
 
if __name__ == "__main__":
  minHeap = PriorityQueue(HeapType.MIN)
  minHeap.build_heap([2, 7, 26, 25, 19, 17, 1, 90, 3, 36])
  print(minHeap.items)
  print(heap_sort(minHeap))
  print("=="*20)
  maxHeap = PriorityQueue(HeapType.MAX, lambda a, b: a>=b)
  maxHeap.build_heap([2, 7, 26, 25, 19, 17, 1, 90, 3, 36])
  # heap.insert(2)
  # heap.insert(7)
  # heap.insert(26)
  # heap.insert(25)
  # heap.insert(19)
  print(maxHeap.items)
  print(heap_sort(maxHeap))

  # heap = PriorityQueue([2, 7, 26, 25, 19, 17, 1, 90, 3, 36])
  # print(heap.reverse_sort())

  # heap = PriorityQueue([2, 7, 26, 25, 19, 17, 1, 90, 3, 36])
  # print(heap.sort())