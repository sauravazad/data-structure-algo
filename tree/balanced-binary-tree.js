/*
Problem link : https://leetcode.com/problems//balanced-binary-tree
------------------------------------------------------------------------------------
Description: 110. Balanced Binary Tree
Given a binary tree, determine if it is height balanced: A height-balanced binary tree is a binary tree in which the depth of the two subtrees of every node never differs by more than one..

------------------------------------------------------------------------------------
Example:
Input is formatted in pre order traversal format

Example 1:

Input: root = [3,9,20,null,null,15,7]
Output: true

Example 2:

Input: root = [1,2,2,3,3,null,null,4,4]
Output: false

Input: root = []
Output: true


------------------------------------------------------------------------------------
Input:

------------------------------------------------------------------------------------
Constraints:

    The number of nodes in the tree is in the range [0, 5000].
    -104 <= Node.val <= 104

------------------------------------------------------------------------------------

*/

/**
 Intuition: 
 Time Complexity: 
 Space Complexity:
 Notes: 
 */
function TreeNode(val, left, right) {
    this.val = (val===undefined ? 0 : val)
    this.left = (left===undefined ? null : left)
    this.right = (right===undefined ? null : right)
}
// Compute the tree's height via recursion
var height = function (root) {
    // An empty tree has height -1
    if (root == null) {
        return -1;
    }
    return 1 + Math.max(height(root.left), height(root.right));
};
var isBalanced = function (root) {
    // An empty tree satisfies the definition of a balanced tree
    if (root == null) {
        return true;
    }
    // Check if subtrees have height within 1. If they do, check if the
    // subtrees are balanced
    return (
        Math.abs(height(root.left) - height(root.right)) < 2 &&
        isBalanced(root.left) &&
        isBalanced(root.right)
    );
};
// Driver code
/**
  Nodes : Binary Tree representation in Array structure 
  where for a given i , 
     left child is stored at 2*i + 1
     right child is stored at 2*i + 2
  if a child does not exists it value is filled as null
  */
const buildTree = (nodes, i = 0) => {
    if (nodes.length && i<nodes.length) {
      // create a Node
      if(nodes[i] !== null) {
        // create child node recursively
        let left = buildTree(nodes, (2*i)+1)
        let right = buildTree(nodes, (2*i)+2)
        const node = new TreeNode(nodes[i], left, right)
        return node
      } else  {
        return undefined
      }
    } else { 
      return null
    }
}

var main = function () {
  const fn = buildTree
  const input = [
    [3,9,20,null,null,15,7],
    [1,2,2,3,3,null,null,4,4],
    []
  ]
  /**
   *  Fill the time complexity for each function
   */

  for (var i = 0; i < input.length; i++) {
      console.log(i + 1 + ".\t Input array: \t", input[i]);
      var result = fn(input[i]);
      console.info(result)
      console.log("\t Result is \t: ",result);
      console.log("-".repeat(100));
  }
}

main();