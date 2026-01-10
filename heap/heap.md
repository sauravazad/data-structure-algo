## Heap  Data Structure

**Visualization Tool**: https://visualgo.net/en/heap

--- 

### Binary tree:

*A binary tree is made of nodes, where each node contains a "left" pointer, a "right" pointer, and a data element.*

The "root" pointer points to the topmost node in the tree. 
The left and right pointers recursively point to smaller "subtrees" on either side.

A null pointer represents a binary tree with no elements -- the empty tree. 
The formal recursive definition is: a binary tree is either empty (represented by a null pointer), or is made of a single node, where the left and right pointers (recursive definition ahead) each point to a binary tree. 
Ref: 
- http://cslibrary.stanford.edu/110/BinaryTrees.html
- https://www.enjoyalgorithms.com/blog/introduction-to-binary-tree
<HR/>

### Heap is a special type of binary tree. A heap is a binary tree that meets the following criteria:

  - Is a complete binary tree; (Complete Binary Tree: All levels, except possibly the last, are completely full.)
  - Nodes in the last level are filled from left to right without gaps.
  - **Heap Property**: 
    - The value of each node must be no greater than (or no less than) the value of its child nodes
    - Insertion and deletion of an element has a time complexity of O(logN)
    - the max/min value in heap can be obtained with O(1) time complexity
  - **Classification**:
    - Max Heap: each node in the Heap has a value no less than the its child nodes
    - Min Heap: each node in the Heap has a value no larger than the its child nodes
  
  - **Operation**
    - Insertion : Insert the new node to the right most node (left to right node filling) and heapify
    - Deletion  : Delete the root node and assign right most node as root node and heapify
    - Heapify
  
  - Implementation : usually uses Array as the base data structure 
    - NOTE: assumption that the element are filled in the array from index 1 to make the Math simpler 
    - 1 based index: element in the array are filled from 1 index , index 0 can be utilized to store the number of nodes
    - 0 based index : element in the array are filled from 0 index 
    - element_index // 2 (Integer division or Math.floor) : is the elements parent nodes index
    - left child: 
      - (2 * element_index): 1 based index
      -  2 * (element_index - root_index(0)) + 1 + root_index(0) : 0 based index (simplified : 2* element_index + 1)
    - right child: 
      - (2 * element_index) + 1 : 1 based index
      -  2 * (element_index - root_index(0)) + 2 + root_index(0) : 0 based index (simplified : 2* element_index + 2)
  To preserve the heap property we need to perform distinct operation while insertion or deleting from the heap
  - heapify-up: (Insertion): 
      - check the heap condition
      - if the parent node value is (greater/less) depending upon the max-min heap 
        - true : do nothing 
        - false :  need to rebalance : ie: swap the node with its parent and move the parent node index to its parent 
         call **heapify-up** recursively or util we have reached the root node
  - heapify-down (Deletion): 
    - Replace the root element with the last element in the heap
    - Remove the last element from the heap
    - check the heap condition
      - true : do nothing
      - false :
        - swap the parent node with the smaller/larger child node according to min/max-heap 
        - repeat the process for swapped child node until the heap condition is satisfied or we reach the leaf node 
  - Insertion(elem):
    - add the elem to the end of the array
    - call heapify-up with the inserted index
  - Deletion():
    - pop the root element
    - remove the last element form the heap and assign it to root
    - call heapify-down