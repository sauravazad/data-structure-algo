/**
 https://leetcode.com/problems/2-keys-keyboard/description/

 There is only one character 'A' on the screen of a notepad. You can perform one of two operations on this notepad for each step:

    Copy All: You can copy all the characters present on the screen (a partial copy is not allowed).
    Paste: You can paste the characters which are copied last time.

Given an integer n, return the minimum number of operations to get the character 'A' exactly n times on the screen.
 */

const minStepRec = (n, current, step, clipboard) => {
  // base case\
  if(n === 1) return 0
  if(current == n) return step
  if(current > n) return 1000 // problem statement
  

  // else two condition are there we can either copy or paste from the clipboard
  // ie: either we copy : then the current length stays the same but clipboard content changes to 
  const copyAllNPasteAction = minStepRec(n, 2 * current, step + 2,  current) // two steps copy all and paste
  const pasteAction = minStepRec(n, current + clipboard, step + 1, clipboard)
  return Math.min(copyAllNPasteAction, pasteAction)

}

const minStepRecTopDown = (n, currentLen, clipLen, dp) => {
  // base case 
  if(currentLen === n ) return 0
  if(currentLen > n) return 1000

  // check the dp
  if(dp[currentLen][clipLen] !== -1) return dp[currentLen][clipLen]
  // compute the min of copyAllPast and Paste
  const paste = 1 + minStepRecTopDown(n, currentLen + clipLen, clipLen, dp)
  const copyAllNPaste = 2 + minStepRecTopDown(n, currentLen * 2, currentLen, dp)
  
  const min = Math.min(copyAllNPaste, paste)
  dp[currentLen][clipLen] = min
  return dp[currentLen][clipLen]

}

/**
 * @param {number} n
 * @return {number}
 */
var minSteps = function(n) {
  // since we have 1 A on notepas pass one
  // first step has to be copy else we will not be able to proceed 
  // clipboard : current length of character in clipboard : 0
    const clipboard = 1
    /* const result = minStepRec(n, 1, 1, clipboard)
    
    // construct the DP array : think how many variables are we tracking : in this 2 so the dimention is 2;
    // each row represent the current length :
    // think what should be length of each column : 
      1. simply make it n ie: max length 
      2. if you think if we have reached half of the length of target then next operation would achieve the length
    */
   if(n ==1) return 0 // as this is already stisfied
    const dp = [...Array(n + 1)].map(() => Array(n + 1).fill(-1))
    console.info(dp)
    const result = 1 +  minStepRecTopDown(n, 1, clipboard, dp) // first operation is always copy
    return result
};

// Driver code
var main = function () {
  const fn = minSteps
  const input = [3,1]
  const expectedAns = [3, 0]
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