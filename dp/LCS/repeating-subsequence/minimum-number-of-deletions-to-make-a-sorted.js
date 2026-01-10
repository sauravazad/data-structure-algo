/**
https://practice.geeksforgeeks.org/problems/minimum-number-of-deletions-to-make-a-sorted-sequence3248/1
Given an array arr of size N, the task is to remove or delete the minimum number of elements from the array so
that when the remaining elements are placed in the same sequence order form an increasing sorted sequence.

Input: N = 5, arr[] = {5, 6, 1, 7, 4}
Output: 2
Explanation: Removing 1 and 4
leaves the remaining sequence order as
5 6 7 which is a sorted sequence.
 */

const minDeletions = (nums) => {
  const result = nums.length - getLIS(nums)
  return result
}

const getLIS = (nums) => {
  let dp = new Array(nums.length).fill(1);
    let longest = 1;
    for(let i = 1; i < nums.length; i++) {
      for(let j = 0; j < i; j++) {
        //If we find that nums[j] < nums[i], we may have found a longer increasing subsequence at index i.
        if(nums[j] < nums[i]) {
          dp[i] = Math.max(dp[i], dp[j] + 1)
          longest = Math.max(dp[i])
        }
      }
    }
    return longest
}

// Driver code
var main = function() {
  var lists = [
      [1,1,2],
      [1, 3, 6, 7, 9, 4, 10, 5, 6],
      [10, 9, 2, 5, 3, 7, 101, 18],
      [30, 40, 2, 5, 1, 7, 45, 50, 8],
      [0, 1, 0, 3, 2, 3],
      [3, 2],
      [6, 9, 8, 2, 3, 5, 1, 4, 7],
      [0, 8, 4, 12, 2, 10, 6, 14, 1, 9, 5, 13, 3, 11, 7, 15],
      [9, 2, 5, 3, 6, 14, 11, 7, 9, 5, 13, 3, 15, 0, 8, 4, 1, 9, 5, 13, 3, 11, 7, 15, 0, 10, 6, 14, 9, 2, 5, 3, 2, 10, 6, 10, 6, 5, 13, 3, 11, 7, 15, 3, 11, 7, 15]
  ];


  // You can uncomment the line below and check how this recursive solution causes a time-out

  // lists.push([72, 56, 13, 33, 4, 5, 53, 14, 71, 42, 5, 74, 60, 15, 68, 42,
  //    56, 58, 67, 32, 65, 75, 47, 29, 86, 32, 77, 39, 19, 54, 54, 18, 49, 34,
  //    89, 85, 63, 86, 90, 53, 35, 2, 65, 63, 90, 26, 39, 41, 38, 32, 21, 35, 51,
  //    34, 50, 27, 51, 94, 70, 94, 18, 89, 45, 40, 13, 56, 25, 59, 51, 6, 59, 56,
  //    41, 44, 23, 26, 83, 8, 0, 33, 59, 43, 83, 40, 24, 86, 28, 2, 23, 87, 11,
  //    23, 13, 48, 20, 64, 21, 93, 8, 70, 33, 48, 10, 29, 24, 59, 92, 23, 67, 79,
  //    54, 7, 56, 5, 2, 63, 88, 58, 60, 95, 54, 7, 56, 5, 2, 63, 88, 58, 60, 95, 54, 7,
  //    56, 5, 2, 63, 88, 58, 60, 95]);


  for (var i = 0; i < lists.length; i++) {
      console.log((i + 1) + ". Input array: [" + lists[i].join(", ") + "]");
      console.log("Minimum deletions required: " + minDeletions(lists[i]));
      console.log("-".repeat(100));
  }
}

main();