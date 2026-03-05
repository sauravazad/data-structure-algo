/*
Problem link : https://leetcode.com/problems/sum-of-root-to-leaf-binary-numbers/
------------------------------------------------------------------------------------
Description: 1022. Sum of Root To Leaf Binary Numbers
You are given the root of a binary tree where each node has a value 0 or 1. Each root-to-leaf path represents a binary number starting with the most significant bit.

    For example, if the path is 0 -> 1 -> 1 -> 0 -> 1, then this could represent 01101 in binary, which is 13.

For all leaves in the tree, consider the numbers represented by the path from the root to that leaf. Return the sum of these numbers.

The test cases are generated so that the answer fits in a 32-bits integer.

------------------------------------------------------------------------------------
Example:
Example 1:

Input: root = [1,0,1,0,1,0,1]
Output: 22
Explanation: (100) + (101) + (110) + (111) = 4 + 5 + 6 + 7 = 22

Example 2:

Input: root = [0]
Output: 0


------------------------------------------------------------------------------------
Input:

------------------------------------------------------------------------------------
Constraints:

    The number of nodes in the tree is in the range [1, 1000].
    Node.val is 0 or 1.

------------------------------------------------------------------------------------

*/
function TreeNode(val, left, right) {
    this.val = (val===undefined ? 0 : val)
    this.left = (left===undefined ? null : left)
    this.right = (right===undefined ? null : right)
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
/**
 Intuition: 
 Time Complexity: 
 Space Complexity:
 Notes: 
 */

const sumRootToLeaf = (root) => {
  let sumLeaf = 0
  let numbers = []
  const stack = []
  stack.push([root, ''])
  while(stack.length) {
    const [current, val] = stack.pop()
    if(current !== null) {
      // updated binary string 
    let updatedVal = val + current.val
    // if it is leaf node
    if(current.left == null && current.right == null) {
      sumLeaf += parseInt(updatedVal , 2)
      numbers.push(updatedVal)
    } else {
      // else push the child to the stack
      stack.push([current.left, updatedVal])
      stack.push([current.right, updatedVal])
    }
    }
    
  }
  return sumLeaf
}
// Driver code
 

var main = function () {
  const fn = sumRootToLeaf
  const input = [
     [1,0,1,0,1,0,1],
     [0],
     [1,1]
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