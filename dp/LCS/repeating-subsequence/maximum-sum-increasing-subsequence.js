/**
https://practice.geeksforgeeks.org/problems/maximum-sum-increasing-subsequence4749/1

Given an array of n positive integers. Find the sum of the maximum sum subsequence of the given array such that the integers in the subsequence are sorted in strictly
increasing order i.e. a strictly increasing subsequence.

Input: N = 5, arr[] = {1, 101, 2, 3, 100}
Output: 106
Explanation:The maximum sum of a
increasing sequence is obtained from
{1, 2, 3, 100}

Input: N = 3, arr[] = {1, 2, 3}
Output: 6
Explanation:The maximum sum of a
increasing sequence is obtained from
{1, 2, 3}
 */
const msIsSum = (numbers) => {
	const dp = numbers.map((n) =>  n) // base case fill with the value of number as we need to sum up to get the max sum
  let max = Math.max(...numbers) // get the base max
  for(let i =1; i < numbers.length ; i++) {
    for(let j= 0; j < i; j++) {
      if(numbers[j] < numbers[i]) {
        //If we find that numbers[j] < numbers[i], we may have found a longer increasing subsequence at index i.
        dp[i] = Math.max(dp[i], dp[j] + numbers[i])
        max = Math.max(max, dp[i])
      }
    }
  }
  return max
};

// Driver code
var main = function () {
	var lists = [
		[4, 1, 2, 6, 10, 1, 12],
		[-4, 10, 3, 7, 15],
		[4, 2, 3, 6, 10, 1, 12],
		[3, 2, 6, 4, 5, 1],
		[3, 2],
		[1, 2, 3, 4, 5, 6, 7],
		[1, 101, 2, 3, 100, 4, 5],
		[1, 5, 2, 3, 9, 5],
	];

	// Let's uncomment this and check the effect of dynamic programming using memoization

	// lists.push([20, 46, 6, 82, 88, 34, 85, 86, 58, 29, 71, 74, 6, 71, 14, 60, 97, 19, 76, 63,
	// 39, 100, 16, 69, 99, 95, 55, 41, 23, 57, 90, 65, 39, 93, 4, 25, 73, 96, 81, 92, 38, 74, 2,
	// 43, 38, 47, 48, 34, 44, 19, 48, 4, 41, 70, 86, 16, 92, 3, 9, 83, 72, 39, 72, 61, 73, 16, 53,
	// 17, 94, 77, 17, 70, 56, 11, 40, 81, 22, 5, 21, 34, 0, 88, 72, 6, 69, 67, 0, 97, 45, 97, 0, 32,
	// 85, 70, 30, 95, 89, 3, 9, 77, 67, 0, 97, 45, 97, 0, 32, 85, 70, 30, 95, 89, 3, 9, 77, 70, 30,
	// 95, 89, 3, 9, 77, 67, 0, 97, 45, 97, 0, 32, 85, 9, 77, 66, 30, 77, 49, 97, 80, 32, 85, 9, 77, 66, 30, 77, 49, 97, 80, 32, 85]);

	for (var i = 0; i < lists.length; i++) {
		console.log(i + 1 + ". Input array: [" + lists[i].join(", ") + "]");
		console.log("Maximum sum of increasing subsequence is: " + msIsSum(lists[i]));
		console.log("-".repeat(100));
	}
};

main();
