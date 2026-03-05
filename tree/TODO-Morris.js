// https://leetcode.com/articles/delete-node-in-a-bst/
The idea of Morris preorder traversal is simple: to use no space but to traverse the tree.

    How that could be even possible? At each node one has to decide where to go: to the left or to the right, traverse the left subtree or traverse the right subtree. How one could know that the left subtree is already done if no additional memory is allowed?

The idea of Morris algorithm is to set the temporary link between the node and its
predecessor: