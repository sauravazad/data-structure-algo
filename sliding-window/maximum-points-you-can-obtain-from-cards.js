/*
Problem link : https://leetcode.com/problems/maximum-points-you-can-obtain-from-cards/
------------------------------------------------------------------------------------
Description: 1423. Maximum Points You Can Obtain from Cards

There are several cards arranged in a row, and each card has an associated number of points. 
The points are given in the integer array cardPoints.
In one step, you can take one card from the beginning or from the end of the row. You have to take exactly k cards.
Your score is the sum of the points of the cards you have taken.

Given the integer array cardPoints and the integer k, return the maximum score you can obtain.
------------------------------------------------------------------------------------
Example:

Example 1:

Input: cardPoints = [1,2,3,4,5,6,1], k = 3
Output: 12
Explanation: After the first step, your score will always be 1. However, choosing the rightmost card first will maximize your total score.
 The optimal strategy is to take the three cards on the right, giving a final score of 1 + 6 + 5 = 12.

Example 2:

Input: cardPoints = [2,2,2], k = 2
Output: 4
Explanation: Regardless of which two cards you take, your score will always be 4.

Example 3:

Input: cardPoints = [9,7,7,9,7,7,9], k = 7
Output: 55
Explanation: You have to take all the cards. Your score is the sum of points of all cards.

------------------------------------------------------------------------------------
Input:

------------------------------------------------------------------------------------
Constraints:

------------------------------------------------------------------------------------

*/

/**
 Intuition:  the problem says the cards are arranged in a row , on every turn you can only pick from start or end . 
 that means the if you have to pick k cards , it will always be left with a contiguous (n-k) cards on the table.
 You need to minimize the (n-k) contiguous array and subtract the min from sum of all the cards to get the maximum

 Time Complexity: O(N)
 Space Complexity:
 Notes: 
 */
var maxScore = function(cardPoints, k) {
    const N = cardPoints.length
    const totalCardPoints = cardPoints.reduce((prev, current) =>  prev +current, 0)
    // console.info(totalCardPoints)
    let min = Number.MAX_SAFE_INTEGER
    let windowSum = 0
    let left = 0
    for(let right = 0; right < N ; right++) {
      // if window is achieved  compare the current sum with min and assign
      windowSum += cardPoints[right]
      if(right - left + 1 === N-k) {
        min = Math.min(windowSum, min)
        windowSum -= cardPoints[left]
        left++
      }
    }
    // console.info(`Max window ${N-k}(N:${N}, k:${k}) sum `, min)
    return N-k <= 0 ? totalCardPoints: totalCardPoints - min
};
// Driver code
 

var main = function () {
  const fn = maxScore
  const input = [
    [[100,40,17,9,73,75], 3],
    [[1,2,3,4,5,6,1], 3],
    [[2,2,2], 2],
    [[9,7,7,9,7,7,9], 7]

  ]
  /**
   *  Fill the time complexity for each function
   */

  for (var i = 0; i < input.length; i++) {
      console.log(i + 1 + ".\t Input array: \t", input[i]);
      var result = fn(...input[i]);
      console.log("\t Result is \t: ",result);
      console.log("-".repeat(100));
  }
}

main();