/*
Problem link : https://leetcode.com/problems/balance-a-binary-search-tree
------------------------------------------------------------------------------------
Description: 
1382. Balance a Binary Search Tree

Given the root of a binary search tree, return a balanced binary search tree with the same node values. If there is more than one answer, return any of them.

A binary search tree is balanced if the depth of the two subtrees of every node never differs by more than 1.
------------------------------------------------------------------------------------
Example:



Example 1:

Input: root = [1,null,2,null,3,null,4,null,null]
Output: [2,1,3,null,null,null,4]
Explanation: This is not the only correct answer, [3,1,4,null,2] is also correct.

Example 2:

Input: root = [2,1,3]
Output: [2,1,3]

------------------------------------------------------------------------------------
Input:

------------------------------------------------------------------------------------
Constraints:

    The number of nodes in the tree is in the range [1, 104].
    1 <= Node.val <= 105

------------------------------------------------------------------------------------

*/

/**
 Intuition: 
 Time Complexity: 
 Space Complexity:
 Notes: 
 */
/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {TreeNode}
 */
var balanceBST = function(root) {
    const sorted = []
    // traverse in -order and build the sorthed nodes
    traverseInOrder(root, sorted )
    // console.info(sorted )
    return createBST(sorted, 0 , sorted.length -1)
};

var traverseInOrder = function(node, sorted) {
    if (!(node && node.val)) return
    traverseInOrder(node?.left, sorted)
    sorted.push(node.val)
    traverseInOrder(node?.right, sorted)
}

var createBST = (nodes, start, end) => {
    if(start > end) return
    // get the mid point and build the left tree then the right tree
    const mid = parseInt((start + end) / 2)
    const leftTree= createBST(nodes, start, mid -1)
    const rightTree = createBST(nodes, mid + 1, end)

    const node = new TreeNode(nodes[mid], leftTree, rightTree)
    return node
}


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
// Driver code
 

var main = function () {
  const fn = balanceBST
  const input = [
    [1,null,2,null,3,null,4,null,null],
    [2,1,3]
  ]
  /**
   *  Fill the time complexity for each function
   */

  for (var i = 0; i < input.length; i++) {
      console.log(i + 1 + ".\t Input array: \t", input[i]);
      var result = fn(buildTree(input[i]));
      console.log("\t Result is \t: ",result);
      console.log("-".repeat(100));
  }
}

main();