# Complete Guide to Binary Trees

A comprehensive guide covering binary tree representations, algorithms, traversals, and implementations in Python and JavaScript.

## Table of Contents

- [Introduction to Binary Trees](#introduction-to-binary-trees)
- [Binary Tree Representations](#binary-tree-representations)
  - [Array Representation](#array-representation)
  - [Linked List Representation](#linked-list-representation)
- [Types of Binary Trees](#types-of-binary-trees)
- [Tree Traversal Algorithms](#tree-traversal-algorithms)
- [Common Binary Tree Operations](#common-binary-tree-operations)
- [Binary Search Tree (BST)](#binary-search-tree-bst)
- [Advanced Algorithms](#advanced-algorithms)
- [Real-World Applications](#real-world-applications)
- [Practice Problems](#practice-problems)

---

## Introduction to Binary Trees

A **binary tree** is a hierarchical data structure where each node has at most **two children**, referred to as the **left child** and **right child**.

### Visual Representation

    Tree Structure:
    
           1
          / \
         2   3
        / \   \
       4   5   6
    
    Nodes: 1, 2, 3, 4, 5, 6
    Root: 1
    Leaves: 4, 5, 6
    Height: 2

### Key Properties

- **Maximum nodes at level L**: 2^L (root is level 0)
- **Maximum nodes in tree of height H**: 2^(H+1) - 1
- **Minimum height for N nodes**: ⌈log₂(N+1)⌉ - 1
- **Each node has 0, 1, or 2 children**

### Terminology

    Tree:
           A          ← Root
          / \
         B   C        ← Internal nodes
        / \   \
       D   E   F      ← Leaf nodes
    
    - Root: A (topmost node)
    - Parent: A is parent of B and C
    - Children: B and C are children of A
    - Siblings: B and C are siblings
    - Leaf: D, E, F (no children)
    - Internal Node: A, B, C (have children)
    - Height: 2 (longest path from root to leaf)
    - Depth of E: 2 (distance from root)

---

## Binary Tree Representations

### Array Representation

In array representation, nodes are stored in a level-order sequence.

#### Indexing Formula

    For a node at index i:
    - Left child: 2*i + 1
    - Right child: 2*i + 2
    - Parent: (i-1) / 2

#### Visual Example

    Tree:
           1
          / \
         2   3
        / \
       4   5
    
    Array: [1, 2, 3, 4, 5]
    Index:  0  1  2  3  4
    
    Node 1 (index 0):
      - Left child: 2*0+1 = 1 (value 2)
      - Right child: 2*0+2 = 2 (value 3)
    
    Node 2 (index 1):
      - Left child: 2*1+1 = 3 (value 4)
      - Right child: 2*1+2 = 4 (value 5)
      - Parent: (1-1)/2 = 0 (value 1)

#### Python Implementation

    class BinaryTreeArray:
        def __init__(self, capacity=100):
            """Initialize binary tree with array representation"""
            self.tree = [None] * capacity
            self.capacity = capacity
        
        def insert_root(self, value):
            """Insert root node"""
            self.tree[0] = value
        
        def insert_left(self, parent_index, value):
            """Insert left child of parent at parent_index"""
            left_index = 2 * parent_index + 1
            if left_index < self.capacity:
                self.tree[left_index] = value
                return left_index
            return -1
        
        def insert_right(self, parent_index, value):
            """Insert right child of parent at parent_index"""
            right_index = 2 * parent_index + 2
            if right_index < self.capacity:
                self.tree[right_index] = value
                return right_index
            return -1
        
        def get_left_child(self, index):
            """Get left child of node at index"""
            left_index = 2 * index + 1
            if left_index < self.capacity and self.tree[left_index] is not None:
                return self.tree[left_index]
            return None
        
        def get_right_child(self, index):
            """Get right child of node at index"""
            right_index = 2 * index + 2
            if right_index < self.capacity and self.tree[right_index] is not None:
                return self.tree[right_index]
            return None
        
        def get_parent(self, index):
            """Get parent of node at index"""
            if index == 0:
                return None
            parent_index = (index - 1) // 2
            return self.tree[parent_index]
        
        def level_order(self):
            """Return level-order traversal"""
            return [val for val in self.tree if val is not None]
    
    # Example usage:
    # tree = BinaryTreeArray()
    # tree.insert_root(1)
    # tree.insert_left(0, 2)
    # tree.insert_right(0, 3)
    # tree.insert_left(1, 4)
    # tree.insert_right(1, 5)
    # print(tree.level_order())  # [1, 2, 3, 4, 5]

#### JavaScript Implementation

    class BinaryTreeArray {
        constructor(capacity = 100) {
            this.tree = new Array(capacity).fill(null);
            this.capacity = capacity;
        }
        
        insertRoot(value) {
            // Insert root node
            this.tree[0] = value;
        }
        
        insertLeft(parentIndex, value) {
            // Insert left child of parent at parentIndex
            const leftIndex = 2 * parentIndex + 1;
            if (leftIndex < this.capacity) {
                this.tree[leftIndex] = value;
                return leftIndex;
            }
            return -1;
        }
        
        insertRight(parentIndex, value) {
            // Insert right child of parent at parentIndex
            const rightIndex = 2 * parentIndex + 2;
            if (rightIndex < this.capacity) {
                this.tree[rightIndex] = value;
                return rightIndex;
            }
            return -1;
        }
        
        getLeftChild(index) {
            // Get left child of node at index
            const leftIndex = 2 * index + 1;
            if (leftIndex < this.capacity && this.tree[leftIndex] !== null) {
                return this.tree[leftIndex];
            }
            return null;
        }
        
        getRightChild(index) {
            // Get right child of node at index
            const rightIndex = 2 * index + 2;
            if (rightIndex < this.capacity && this.tree[rightIndex] !== null) {
                return this.tree[rightIndex];
            }
            return null;
        }
        
        getParent(index) {
            // Get parent of node at index
            if (index === 0) return null;
            const parentIndex = Math.floor((index - 1) / 2);
            return this.tree[parentIndex];
        }
        
        levelOrder() {
            // Return level-order traversal
            return this.tree.filter(val => val !== null);
        }
    }
    
    // Example usage:
    // const tree = new BinaryTreeArray();
    // tree.insertRoot(1);
    // tree.insertLeft(0, 2);
    // tree.insertRight(0, 3);
    // tree.insertLeft(1, 4);
    // tree.insertRight(1, 5);
    // console.log(tree.levelOrder());  // [1, 2, 3, 4, 5]

#### Advantages and Disadvantages

**Advantages:**
- Simple to implement
- Fast access using indices
- Good for complete binary trees
- Cache-friendly (contiguous memory)

**Disadvantages:**
- Wastes space for sparse trees
- Fixed size (need to know maximum nodes)
- Expensive to insert/delete in middle

---

### Linked List Representation

In linked representation, each node is an object with data and pointers to left and right children.

#### Node Structure

    Node Structure:
    
    ┌─────────────────┐
    │  data: value    │
    │  left: pointer  │
    │  right: pointer │
    └─────────────────┘

#### Visual Example

    Tree:
           1
          / \
         2   3
        / \
       4   5
    
    Linked Structure:
    
    [1] ──┬─→ [2] ──┬─→ [4]
          │         │
          │         └─→ [5]
          │
          └─→ [3]

#### Python Implementation

    class TreeNode:
        def __init__(self, value=0, left=None, right=None):
            """
            Initialize a tree node
            value: node data
            left: reference to left child
            right: reference to right child
            """
            self.value = value
            self.left = left
            self.right = right
        
        def __repr__(self):
            return f"TreeNode({self.value})"
    
    class BinaryTree:
        def __init__(self, root=None):
            """Initialize binary tree with optional root"""
            self.root = root
        
        def insert_level_order(self, values):
            """
            Insert nodes in level-order from a list
            None represents missing nodes
            """
            if not values:
                return
            
            self.root = TreeNode(values[0])
            queue = [self.root]
            i = 1
            
            while queue and i < len(values):
                node = queue.pop(0)
                
                # Insert left child
                if i < len(values) and values[i] is not None:
                    node.left = TreeNode(values[i])
                    queue.append(node.left)
                i += 1
                
                # Insert right child
                if i < len(values) and values[i] is not None:
                    node.right = TreeNode(values[i])
                    queue.append(node.right)
                i += 1
        
        def get_height(self, node=None):
            """Calculate height of tree"""
            if node is None:
                node = self.root
            
            if node is None:
                return -1
            
            left_height = self.get_height(node.left)
            right_height = self.get_height(node.right)
            
            return 1 + max(left_height, right_height)
        
        def count_nodes(self, node=None):
            """Count total nodes in tree"""
            if node is None:
                node = self.root
            
            if node is None:
                return 0
            
            return 1 + self.count_nodes(node.left) + self.count_nodes(node.right)
        
        def count_leaf_nodes(self, node=None):
            """Count leaf nodes (nodes with no children)"""
            if node is None:
                node = self.root
            
            if node is None:
                return 0
            
            if node.left is None and node.right is None:
                return 1
            
            return self.count_leaf_nodes(node.left) + self.count_leaf_nodes(node.right)
    
    # Example usage:
    # tree = BinaryTree()
    # tree.insert_level_order([1, 2, 3, 4, 5])
    # print(f"Height: {tree.get_height()}")  # 2
    # print(f"Nodes: {tree.count_nodes()}")  # 5
    # print(f"Leaves: {tree.count_leaf_nodes()}")  # 3

#### JavaScript Implementation

    class TreeNode {
        constructor(value = 0, left = null, right = null) {
            this.value = value;
            this.left = left;
            this.right = right;
        }
    }
    
    class BinaryTree {
        constructor(root = null) {
            this.root = root;
        }
        
        insertLevelOrder(values) {
            // Insert nodes in level-order from array
            // null represents missing nodes
            if (!values || values.length === 0) return;
            
            this.root = new TreeNode(values[0]);
            const queue = [this.root];
            let i = 1;
            
            while (queue.length > 0 && i < values.length) {
                const node = queue.shift();
                
                // Insert left child
                if (i < values.length && values[i] !== null) {
                    node.left = new TreeNode(values[i]);
                    queue.push(node.left);
                }
                i++;
                
                // Insert right child
                if (i < values.length && values[i] !== null) {
                    node.right = new TreeNode(values[i]);
                    queue.push(node.right);
                }
                i++;
            }
        }
        
        getHeight(node = this.root) {
            // Calculate height of tree
            if (node === null) return -1;
            
            const leftHeight = this.getHeight(node.left);
            const rightHeight = this.getHeight(node.right);
            
            return 1 + Math.max(leftHeight, rightHeight);
        }
        
        countNodes(node = this.root) {
            // Count total nodes in tree
            if (node === null) return 0;
            
            return 1 + this.countNodes(node.left) + this.countNodes(node.right);
        }
        
        countLeafNodes(node = this.root) {
            // Count leaf nodes (nodes with no children)
            if (node === null) return 0;
            
            if (node.left === null && node.right === null) {
                return 1;
            }
            
            return this.countLeafNodes(node.left) + this.countLeafNodes(node.right);
        }
    }
    
    // Example usage:
    // const tree = new BinaryTree();
    // tree.insertLevelOrder([1, 2, 3, 4, 5]);
    // console.log(`Height: ${tree.getHeight()}`);  // 2
    // console.log(`Nodes: ${tree.countNodes()}`);  // 5
    // console.log(`Leaves: ${tree.countLeafNodes()}`);  // 3

#### Advantages and Disadvantages

**Advantages:**
- Dynamic size (no wasted space)
- Easy insertion and deletion
- Flexible structure
- Natural representation

**Disadvantages:**
- Extra memory for pointers
- No random access
- Cache unfriendly (scattered memory)
- Slightly more complex implementation

---

## Types of Binary Trees

### 1. Full Binary Tree

Every node has either 0 or 2 children.

    Example:
           1
          / \
         2   3
        / \
       4   5
    
    Properties:
    - All nodes have 0 or 2 children
    - If height = h, max nodes = 2^(h+1) - 1

### 2. Complete Binary Tree

All levels are completely filled except possibly the last, which is filled left to right.

    Example:
           1
          / \
         2   3
        / \  /
       4  5 6
    
    Properties:
    - Used in heaps
    - Efficient array representation
    - Height = ⌊log₂(n)⌋

### 3. Perfect Binary Tree

All internal nodes have 2 children and all leaves are at the same level.

    Example:
           1
          / \
         2   3
        / \ / \
       4  5 6  7
    
    Properties:
    - Total nodes = 2^(h+1) - 1
    - Leaf nodes = 2^h
    - Most balanced structure

### 4. Balanced Binary Tree

Height difference between left and right subtrees is at most 1 for every node.

    Balanced:              Unbalanced:
         1                      1
        / \                    /
       2   3                  2
      / \                    /
     4   5                  3
                           /
                          4

### 5. Degenerate (Pathological) Tree

Each parent has only one child - essentially a linked list.

    Example:
    1
     \
      2
       \
        3
         \
          4

---

## Tree Traversal Algorithms

### Overview

    Tree for examples:
           1
          / \
         2   3
        / \
       4   5

### 1. Inorder Traversal (Left → Root → Right)

**Order:** 4, 2, 5, 1, 3

**Use Case:** BST gives sorted order

#### Python Implementation

    def inorder_recursive(node):
        """Inorder traversal - recursive"""
        if node is None:
            return []
        
        result = []
        result.extend(inorder_recursive(node.left))   # Left
        result.append(node.value)                      # Root
        result.extend(inorder_recursive(node.right))  # Right
        
        return result
    
    def inorder_iterative(root):
        """Inorder traversal - iterative using stack"""
        result = []
        stack = []
        current = root
        
        while current or stack:
            # Go to leftmost node
            while current:
                stack.append(current)
                current = current.left
            
            # Process current node
            current = stack.pop()
            result.append(current.value)
            
            # Move to right subtree
            current = current.right
        
        return result
    
    # Example:
    # tree = BinaryTree()
    # tree.insert_level_order([1, 2, 3, 4, 5])
    # print(inorder_recursive(tree.root))  # [4, 2, 5, 1, 3]

#### JavaScript Implementation

    function inorderRecursive(node) {
        // Inorder traversal - recursive
        if (node === null) return [];
        
        const result = [];
        result.push(...inorderRecursive(node.left));   // Left
        result.push(node.value);                        // Root
        result.push(...inorderRecursive(node.right));  // Right
        
        return result;
    }
    
    function inorderIterative(root) {
        // Inorder traversal - iterative using stack
        const result = [];
        const stack = [];
        let current = root;
        
        while (current !== null || stack.length > 0) {
            // Go to leftmost node
            while (current !== null) {
                stack.push(current);
                current = current.left;
            }
            
            // Process current node
            current = stack.pop();
            result.push(current.value);
            
            // Move to right subtree
            current = current.right;
        }
        
        return result;
    }

---

### 2. Preorder Traversal (Root → Left → Right)

**Order:** 1, 2, 4, 5, 3

**Use Case:** Create copy of tree, prefix expression

#### Python Implementation

    def preorder_recursive(node):
        """Preorder traversal - recursive"""
        if node is None:
            return []
        
        result = []
        result.append(node.value)                      # Root
        result.extend(preorder_recursive(node.left))   # Left
        result.extend(preorder_recursive(node.right))  # Right
        
        return result
    
    def preorder_iterative(root):
        """Preorder traversal - iterative using stack"""
        if root is None:
            return []
        
        result = []
        stack = [root]
        
        while stack:
            current = stack.pop()
            result.append(current.value)
            
            # Push right first so left is processed first
            if current.right:
                stack.append(current.right)
            if current.left:
                stack.append(current.left)
        
        return result

#### JavaScript Implementation

    function preorderRecursive(node) {
        // Preorder traversal - recursive
        if (node === null) return [];
        
        const result = [];
        result.push(node.value);                        // Root
        result.push(...preorderRecursive(node.left));   // Left
        result.push(...preorderRecursive(node.right));  // Right
        
        return result;
    }
    
    function preorderIterative(root) {
        // Preorder traversal - iterative using stack
        if (root === null) return [];
        
        const result = [];
        const stack = [root];
        
        while (stack.length > 0) {
            const current = stack.pop();
            result.push(current.value);
            
            // Push right first so left is processed first
            if (current.right !== null) {
                stack.push(current.right);
            }
            if (current.left !== null) {
                stack.push(current.left);
            }
        }
        
        return result;
    }

---

### 3. Postorder Traversal (Left → Right → Root)

**Order:** 4, 5, 2, 3, 1

**Use Case:** Delete tree, postfix expression

#### Python Implementation

    def postorder_recursive(node):
        """Postorder traversal - recursive"""
        if node is None:
            return []
        
        result = []
        result.extend(postorder_recursive(node.left))   # Left
        result.extend(postorder_recursive(node.right))  # Right
        result.append(node.value)                       # Root
        
        return result
    
    def postorder_iterative(root):
        """Postorder traversal - iterative using two stacks"""
        if root is None:
            return []
        
        stack1 = [root]
        stack2 = []
        
        while stack1:
            current = stack1.pop()
            stack2.append(current)
            
            if current.left:
                stack1.append(current.left)
            if current.right:
                stack1.append(current.right)
        
        result = []
        while stack2:
            result.append(stack2.pop().value)
        
        return result

#### JavaScript Implementation

    function postorderRecursive(node) {
        // Postorder traversal - recursive
        if (node === null) return [];
        
        const result = [];
        result.push(...postorderRecursive(node.left));   // Left
        result.push(...postorderRecursive(node.right));  // Right
        result.push(node.value);                         // Root
        
        return result;
    }
    
    function postorderIterative(root) {
        // Postorder traversal - iterative using two stacks
        if (root === null) return [];
        
        const stack1 = [root];
        const stack2 = [];
        
        while (stack1.length > 0) {
            const current = stack1.pop();
            stack2.push(current);
            
            if (current.left !== null) {
                stack1.push(current.left);
            }
            if (current.right !== null) {
                stack1.push(current.right);
            }
        }
        
        const result = [];
        while (stack2.length > 0) {
            result.push(stack2.pop().value);
        }
        
        return result;
    }

---

### 4. Level Order Traversal (BFS)

**Order:** 1, 2, 3, 4, 5

**Use Case:** Shortest path, level-wise processing

#### Python Implementation

    from collections import deque
    
    def level_order(root):
        """Level order traversal using queue"""
        if root is None:
            return []
        
        result = []
        queue = deque([root])
        
        while queue:
            level_size = len(queue)
            level = []
            
            for i in range(level_size):
                node = queue.popleft()
                level.append(node.value)
                
                if node.left:
                    queue.append(node.left)
                if node.right:
                    queue.append(node.right)
            
            result.append(level)
        
        return result
    
    def level_order_flat(root):
        """Level order traversal - flat list"""
        if root is None:
            return []
        
        result = []
        queue = deque([root])
        
        while queue:
            node = queue.popleft()
            result.append(node.value)
            
            if node.left:
                queue.append(node.left)
            if node.right:
                queue.append(node.right)
        
        return result
    
    # Example:
    # tree.insert_level_order([1, 2, 3, 4, 5])
    # print(level_order(tree.root))  # [[1], [2, 3], [4, 5]]

#### JavaScript Implementation

    function levelOrder(root) {
        // Level order traversal - returns array of levels
        if (root === null) return [];
        
        const result = [];
        const queue = [root];
        
        while (queue.length > 0) {
            const levelSize = queue.length;
            const level = [];
            
            for (let i = 0; i < levelSize; i++) {
                const node = queue.shift();
                level.push(node.value);
                
                if (node.left !== null) {
                    queue.push(node.left);
                }
                if (node.right !== null) {
                    queue.push(node.right);
                }
            }
            
            result.push(level);
        }
        
        return result;
    }
    
    function levelOrderFlat(root) {
        // Level order traversal - flat array
        if (root === null) return [];
        
        const result = [];
        const queue = [root];
        
        while (queue.length > 0) {
            const node = queue.shift();
            result.push(node.value);
            
            if (node.left !== null) {
                queue.push(node.left);
            }
            if (node.right !== null) {
                queue.push(node.right);
            }
        }
        
        return result;
    }

---

## Common Binary Tree Operations

### 1. Find Maximum Element

#### Python Implementation

    def find_max(node):
        """Find maximum value in binary tree"""
        if node is None:
            return float('-inf')
        
        # Check current node
        max_val = node.value
        
        # Check left subtree
        left_max = find_max(node.left)
        
        # Check right subtree
        right_max = find_max(node.right)
        
        return max(max_val, left_max, right_max)

#### JavaScript Implementation

    function findMax(node) {
        // Find maximum value in binary tree
        if (node === null) return -Infinity;
        
        // Check current node
        let maxVal = node.value;
        
        // Check left subtree
        const leftMax = findMax(node.left);
        
        // Check right subtree
        const rightMax = findMax(node.right);
        
        return Math.max(maxVal, leftMax, rightMax);
    }

---

### 2. Search for Element

#### Python Implementation

    def search(node, target):
        """Search for target value in tree"""
        if node is None:
            return False
        
        if node.value == target:
            return True
        
        # Search in left and right subtrees
        return search(node.left, target) or search(node.right, target)
    
    def search_level_order(root, target):
        """Search using level order traversal"""
        if root is None:
            return False
        
        queue = deque([root])
        
        while queue:
            node = queue.popleft()
            
            if node.value == target:
                return True
            
            if node.left:
                queue.append(node.left)
            if node.right:
                queue.append(node.right)
        
        return False

#### JavaScript Implementation

    function search(node, target) {
        // Search for target value in tree
        if (node === null) return false;
        
        if (node.value === target) return true;
        
        // Search in left and right subtrees
        return search(node.left, target) || search(node.right, target);
    }
    
    function searchLevelOrder(root, target) {
        // Search using level order traversal
        if (root === null) return false;
        
        const queue = [root];
        
        while (queue.length > 0) {
            const node = queue.shift();
            
            if (node.value === target) return true;
            
            if (node.left !== null) queue.push(node.left);
            if (node.right !== null) queue.push(node.right);
        }
        
        return false;
    }

---

### 3. Mirror (Invert) Binary Tree

    Original:        Mirror:
         1              1
        / \            / \
       2   3          3   2
      / \            / \
     4   5          5   4

#### Python Implementation

    def mirror_tree(node):
        """Mirror/invert the binary tree"""
        if node is None:
            return None
        
        # Swap left and right children
        node.left, node.right = node.right, node.left
        
        # Recursively mirror subtrees
        mirror_tree(node.left)
        mirror_tree(node.right)
        
        return node

#### JavaScript Implementation

    function mirrorTree(node) {
        // Mirror/invert the binary tree
        if (node === null) return null;
        
        // Swap left and right children
        [node.left, node.right] = [node.right, node.left];
        
        // Recursively mirror subtrees
        mirrorTree(node.left);
        mirrorTree(node.right);
        
        return node;
    }

---

### 4. Diameter of Tree

The diameter is the longest path between any two nodes.

    Example:
           1
          / \
         2   3
        / \
       4   5
    
    Diameter = 3 (path: 4-2-1-3 or 5-2-1-3)

#### Python Implementation

    def diameter_of_tree(root):
        """Find diameter of binary tree"""
        diameter = [0]  # Use list to allow modification in nested function
        
        def height(node):
            if node is None:
                return 0
            
            left_height = height(node.left)
            right_height = height(node.right)
            
            # Update diameter if path through current node is longer
            diameter[0] = max(diameter[0], left_height + right_height)
            
            return 1 + max(left_height, right_height)
        
        height(root)
        return diameter[0]

#### JavaScript Implementation

    function diameterOfTree(root) {
        // Find diameter of binary tree
        let diameter = 0;
        
        function height(node) {
            if (node === null) return 0;
            
            const leftHeight = height(node.left);
            const rightHeight = height(node.right);
            
            // Update diameter if path through current node is longer
            diameter = Math.max(diameter, leftHeight + rightHeight);
            
            return 1 + Math.max(leftHeight, rightHeight);
        }
        
        height(root);
        return diameter;
    }

---

### 5. Lowest Common Ancestor (LCA)

#### Python Implementation

    def lowest_common_ancestor(root, p, q):
        """
        Find lowest common ancestor of nodes p and q
        """
        if root is None or root == p or root == q:
            return root
        
        left = lowest_common_ancestor(root.left, p, q)
        right = lowest_common_ancestor(root.right, p, q)
        
        if left and right:
            return root  # Current node is LCA
        
        return left if left else right

#### JavaScript Implementation

    function lowestCommonAncestor(root, p, q) {
        // Find lowest common ancestor of nodes p and q
        if (root === null || root === p || root === q) {
            return root;
        }
        
        const left = lowestCommonAncestor(root.left, p, q);
        const right = lowestCommonAncestor(root.right, p, q);
        
        if (left !== null && right !== null) {
            return root;  // Current node is LCA
        }
        
        return left !== null ? left : right;
    }

---

### 6. Check if Balanced

#### Python Implementation

    def is_balanced(root):
        """Check if tree is height-balanced"""
        def check_height(node):
            if node is None:
                return 0
            
            left_height = check_height(node.left)
            if left_height == -1:
                return -1  # Left subtree unbalanced
            
            right_height = check_height(node.right)
            if right_height == -1:
                return -1  # Right subtree unbalanced
            
            if abs(left_height - right_height) > 1:
                return -1  # Current node unbalanced
            
            return 1 + max(left_height, right_height)
        
        return check_height(root) != -1

#### JavaScript Implementation

    function isBalanced(root) {
        // Check if tree is height-balanced
        function checkHeight(node) {
            if (node === null) return 0;
            
            const leftHeight = checkHeight(node.left);
            if (leftHeight === -1) return -1;
            
            const rightHeight = checkHeight(node.right);
            if (rightHeight === -1) return -1;
            
            if (Math.abs(leftHeight - rightHeight) > 1) {
                return -1;
            }
            
            return 1 + Math.max(leftHeight, rightHeight);
        }
        
        return checkHeight(root) !== -1;
    }

---

## Binary Search Tree (BST)

A Binary Search Tree is a binary tree with the property:
- **Left subtree** values < node value
- **Right subtree** values > node value

    BST Example:
           8
          / \
         3   10
        / \    \
       1   6    14
          / \   /
         4   7 13

### BST Operations

#### Insert

#### Python Implementation

    class BST:
        def __init__(self):
            self.root = None
        
        def insert(self, value):
            """Insert value into BST"""
            self.root = self._insert_helper(self.root, value)
        
        def _insert_helper(self, node, value):
            if node is None:
                return TreeNode(value)
            
            if value < node.value:
                node.left = self._insert_helper(node.left, value)
            elif value > node.value:
                node.right = self._insert_helper(node.right, value)
            
            return node

#### JavaScript Implementation

    class BST {
        constructor() {
            this.root = null;
        }
        
        insert(value) {
            // Insert value into BST
            this.root = this._insertHelper(this.root, value);
        }
        
        _insertHelper(node, value) {
            if (node === null) {
                return new TreeNode(value);
            }
            
            if (value < node.value) {
                node.left = this._insertHelper(node.left, value);
            } else if (value > node.value) {
                node.right = this._insertHelper(node.right, value);
            }
            
            return node;
        }
    }

---

#### Search

#### Python Implementation

    def search_bst(self, value):
        """Search for value in BST"""
        return self._search_helper(self.root, value)
    
    def _search_helper(self, node, value):
        if node is None:
            return False
        
        if node.value == value:
            return True
        elif value < node.value:
            return self._search_helper(node.left, value)
        else:
            return self._search_helper(node.right, value)

#### JavaScript Implementation

    searchBST(value) {
        // Search for value in BST
        return this._searchHelper(this.root, value);
    }
    
    _searchHelper(node, value) {
        if (node === null) return false;
        
        if (node.value === value) {
            return true;
        } else if (value < node.value) {
            return this._searchHelper(node.left, value);
        } else {
            return this._searchHelper(node.right, value);
        }
    }

---

#### Delete

#### Python Implementation

    def delete(self, value):
        """Delete value from BST"""
        self.root = self._delete_helper(self.root, value)
    
    def _delete_helper(self, node, value):
        if node is None:
            return None
        
        if value < node.value:
            node.left = self._delete_helper(node.left, value)
        elif value > node.value:
            node.right = self._delete_helper(node.right, value)
        else:
            # Node found - handle three cases
            
            # Case 1: Leaf or one child
            if node.left is None:
                return node.right
            elif node.right is None:
                return node.left
            
            # Case 2: Two children - find inorder successor
            successor = self._find_min(node.right)
            node.value = successor.value
            node.right = self._delete_helper(node.right, successor.value)
        
        return node
    
    def _find_min(self, node):
        """Find minimum value node"""
        while node.left is not None:
            node = node.left
        return node

#### JavaScript Implementation

    delete(value) {
        // Delete value from BST
        this.root = this._deleteHelper(this.root, value);
    }
    
    _deleteHelper(node, value) {
        if (node === null) return null;
        
        if (value < node.value) {
            node.left = this._deleteHelper(node.left, value);
        } else if (value > node.value) {
            node.right = this._deleteHelper(node.right, value);
        } else {
            // Node found - handle three cases
            
            // Case 1: Leaf or one child
            if (node.left === null) {
                return node.right;
            } else if (node.right === null) {
                return node.left;
            }
            
            // Case 2: Two children - find inorder successor
            const successor = this._findMin(node.right);
            node.value = successor.value;
            node.right = this._deleteHelper(node.right, successor.value);
        }
        
        return node;
    }
    
    _findMin(node) {
        // Find minimum value node
        while (node.left !== null) {
            node = node.left;
        }
        return node;
    }

---

## Advanced Algorithms

### 1. Serialize and Deserialize Binary Tree

#### Python Implementation

    class Codec:
        def serialize(self, root):
            """Serialize tree to string"""
            if root is None:
                return "null"
            
            left = self.serialize(root.left)
            right = self.serialize(root.right)
            
            return f"{root.value},{left},{right}"
        
        def deserialize(self, data):
            """Deserialize string to tree"""
            def helper(values):
                val = next(values)
                if val == "null":
                    return None
                
                node = TreeNode(int(val))
                node.left = helper(values)
                node.right = helper(values)
                return node
            
            values = iter(data.split(','))
            return helper(values)

#### JavaScript Implementation

    class Codec {
        serialize(root) {
            // Serialize tree to string
            if (root === null) return "null";
            
            const left = this.serialize(root.left);
            const right = this.serialize(root.right);
            
            return `${root.value},${left},${right}`;
        }
        
        deserialize(data) {
            // Deserialize string to tree
            const values = data.split(',');
            let index = 0;
            
            const helper = () => {
                if (values[index] === "null") {
                    index++;
                    return null;
                }
                
                const node = new TreeNode(parseInt(values[index++]));
                node.left = helper();
                node.right = helper();
                return node;
            };
            
            return helper();
        }
    }

---

### 2. Path Sum

#### Python Implementation

    def has_path_sum(root, target_sum):
        """Check if tree has root-to-leaf path with given sum"""
        if root is None:
            return False
        
        # Leaf node - check if sum matches
        if root.left is None and root.right is None:
            return root.value == target_sum
        
        # Check both subtrees
        remaining = target_sum - root.value
        return (has_path_sum(root.left, remaining) or 
                has_path_sum(root.right, remaining))
    
    def find_all_paths(root, target_sum):
        """Find all root-to-leaf paths with given sum"""
        result = []
        
        def dfs(node, remaining, path):
            if node is None:
                return
            
            path.append(node.value)
            
            # Leaf node - check sum
            if node.left is None and node.right is None:
                if node.value == remaining:
                    result.append(path[:])
            else:
                # Explore both subtrees
                dfs(node.left, remaining - node.value, path)
                dfs(node.right, remaining - node.value, path)
            
            path.pop()
        
        dfs(root, target_sum, [])
        return result

#### JavaScript Implementation

    function hasPathSum(root, targetSum) {
        // Check if tree has root-to-leaf path with given sum
        if (root === null) return false;
        
        // Leaf node - check if sum matches
        if (root.left === null && root.right === null) {
            return root.value === targetSum;
        }
        
        // Check both subtrees
        const remaining = targetSum - root.value;
        return hasPathSum(root.left, remaining) || 
               hasPathSum(root.right, remaining);
    }
    
    function findAllPaths(root, targetSum) {
        // Find all root-to-leaf paths with given sum
        const result = [];
        
        function dfs(node, remaining, path) {
            if (node === null) return;
            
            path.push(node.value);
            
            // Leaf node - check sum
            if (node.left === null && node.right === null) {
                if (node.value === remaining) {
                    result.push([...path]);
                }
            } else {
                // Explore both subtrees
                dfs(node.left, remaining - node.value, path);
                dfs(node.right, remaining - node.value, path);
            }
            
            path.pop();
        }
        
        dfs(root, targetSum, []);
        return result;
    }

---

### 3. Construct Tree from Traversals

#### Python Implementation

    def build_tree_from_inorder_preorder(preorder, inorder):
        """
        Construct binary tree from preorder and inorder traversals
        
        preorder = [3,9,20,15,7]
        inorder = [9,3,15,20,7]
        
        Tree:
            3
           / \
          9  20
            /  \
           15   7
        """
        if not preorder or not inorder:
            return None
        
        # First element in preorder is root
        root_val = preorder[0]
        root = TreeNode(root_val)
        
        # Find root in inorder
        mid = inorder.index(root_val)
        
        # Recursively build left and right subtrees
        root.left = build_tree_from_inorder_preorder(
            preorder[1:mid+1], 
            inorder[:mid]
        )
        root.right = build_tree_from_inorder_preorder(
            preorder[mid+1:], 
            inorder[mid+1:]
        )
        
        return root

#### JavaScript Implementation

    function buildTreeFromInorderPreorder(preorder, inorder) {
        // Construct binary tree from preorder and inorder traversals
        if (preorder.length === 0 || inorder.length === 0) {
            return null;
        }
        
        // First element in preorder is root
        const rootVal = preorder[0];
        const root = new TreeNode(rootVal);
        
        // Find root in inorder
        const mid = inorder.indexOf(rootVal);
        
        // Recursively build left and right subtrees
        root.left = buildTreeFromInorderPreorder(
            preorder.slice(1, mid + 1),
            inorder.slice(0, mid)
        );
        root.right = buildTreeFromInorderPreorder(
            preorder.slice(mid + 1),
            inorder.slice(mid + 1)
        );
        
        return root;
    }

---

## Real-World Applications

### 1. Expression Trees

Represent mathematical expressions.

    Expression: (a + b) * (c - d)
    
    Tree:
           *
          / \
         +   -
        / \ / \
       a  b c  d

### 2. File System Hierarchy

    Root
    ├── Documents
    │   ├── resume.pdf
    │   └── letter.doc
    ├── Pictures
    │   └── vacation.jpg
    └── Music

### 3. HTML DOM

    <html>
    ├── <head>
    │   └── <title>
    └── <body>
        ├── <div>
        └── <p>

### 4. Decision Trees (AI/ML)

    Is Age > 30?
    ├── Yes → Is Income > 50K?
    │   ├── Yes → Approve
    │   └── No → Reject
    └── No → Reject

### 5. Database Indexing

B-trees and B+ trees used in database systems for efficient searching.

---

## Time Complexity Summary

| Operation | Average | Worst Case |
|-----------|---------|------------|
| **Binary Tree** |||
| Search | O(n) | O(n) |
| Insert | O(n) | O(n) |
| Delete | O(n) | O(n) |
| **BST** |||
| Search | O(log n) | O(n) |
| Insert | O(log n) | O(n) |
| Delete | O(log n) | O(n) |
| **Traversal** | O(n) | O(n) |

---

## Practice Problems

### Easy
1. [Maximum Depth of Binary Tree](https://leetcode.com/problems/maximum-depth-of-binary-tree/)
2. [Same Tree](https://leetcode.com/problems/same-tree/)
3. [Invert Binary Tree](https://leetcode.com/problems/invert-binary-tree/)
4. [Symmetric Tree](https://leetcode.com/problems/symmetric-tree/)
5. [Path Sum](https://leetcode.com/problems/path-sum/)

### Medium
1. [Binary Tree Level Order Traversal](https://leetcode.com/problems/binary-tree-level-order-traversal/)
2. [Validate Binary Search Tree](https://leetcode.com/problems/validate-binary-search-tree/)
3. [Lowest Common Ancestor of BST](https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-search-tree/)
4. [Binary Tree Zigzag Level Order](https://leetcode.com/problems/binary-tree-zigzag-level-order-traversal/)
5. [Construct Tree from Preorder and Inorder](https://leetcode.com/problems/construct-binary-tree-from-preorder-and-inorder-traversal/)

### Hard
1. [Binary Tree Maximum Path Sum](https://leetcode.com/problems/binary-tree-maximum-path-sum/)
2. [Serialize and Deserialize Binary Tree](https://leetcode.com/problems/serialize-and-deserialize-binary-tree/)
3. [Binary Tree Cameras](https://leetcode.com/problems/binary-tree-cameras/)
4. [Recover Binary Search Tree](https://leetcode.com/problems/recover-binary-search-tree/)

---

## Resources

- [Visualgo - Binary Tree Visualization](https://visualgo.net/en/bst)
- [GeeksforGeeks - Binary Tree](https://www.geeksforgeeks.org/binary-tree-data-structure/)
- [LeetCode - Tree Problems](https://leetcode.com/tag/tree/)

---

**Happy Coding! 🌳**
