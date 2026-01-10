/**
 * https://practice.geeksforgeeks.org/problems/longest-alternating-subsequence5951/1
 * https://leetcode.com/problems/wiggle-subsequence/
 *
A sequence {x1, x2, .. xn} is alternating sequence if its elements satisfy one of the following relations :
x1 < x2 > x3 < x4 > x5..... or  x1 >x2 < x3 > x4 < x5.....
Your task is to find the longest such sequence.
Input: nums = {1,5,4}
Output: 3
Explanation: The entire sequence is a
alternating sequence.
 */

const LAS = (numbers) => {
	const dp = new Map();
	// recursive call for ascending and descending
	// const result = Math.max(
	//   LASRecMemo(numbers, 0, 1, true, dp),
	//   LASRecMemo(numbers, 0, 1, false, dp)) + 1 // as we are staring the current from index 1 instead of zero and the first number is a base case
	//   console.info(dp)
	const result = LASRecBottomUp(numbers);
	return result;
};

const LASRec = (numbers, previous, current, isAscending) => {
	/*
  Time Complexity = O(2^N) as we have 2 choices for every element
  Space complexity = O(N) as the maximum stack length can be N
  */

	// base case  if we have exceeded the bound then return zero
	if (current === numbers.length) return 0;
	let count = 0;
	// Case 1 : when taking the current element
	//if current is greater than previous the increment and flip the order
	if (numbers[current] > numbers[previous] && isAscending) {
		count = 1 + LASRec(numbers, current, current + 1, !isAscending);
	} else if (numbers[current] < numbers[previous] && !isAscending) {
		count = 1 + LASRec(numbers, current, current + 1, !isAscending);
	}
	// Case 2 : when skipping the  current element
	let count2 = LASRec(numbers, previous, current + 1, isAscending);
	return Math.max(count, count2);
};

const LASRecMemo = (numbers, previous, current, isAscending, dp) => {
	// base case
	if (current === numbers.length) return 0;
	let hash = `${previous}-${current}-${isAscending ? 1 : -1}`;
	if (dp.has(hash) === false) {
		let count = 0;
		//  include the current element
		if (numbers[current] > numbers[previous] && isAscending) {
			count = 1 + LASRecMemo(numbers, current, current + 1, !isAscending, dp);
		} else if (numbers[current] < numbers[previous] && !isAscending) {
			count = 1 + LASRecMemo(numbers, current, current + 1, !isAscending, dp);
		}
		// do not include
		let count2 = LASRecMemo(numbers, previous, current + 1, isAscending, dp);
		dp.set(hash, Math.max(count, count2));
	}
	return dp.get(hash);
};

const LASRecBottomUp = (nums) => {
	var n = nums.length;
    if (n == 0)
        return 0;

    // initialize dp with 1s as any sequence of length one is always the LAS
    var dp = Array.from({
        length: 2
    }, e => Array.from({
        length: n
    }, e => 1));

    // iterate over all elements of nums
    for (var current = 1; current < n; current++) {
        var previous = current - 1;

        // if the current element is greater than the previous element
        if (nums[current] > nums[previous]) {
            // current element can contribute to an ascending ordering
            // the ascending dp row value is updated by adding 1 to the length of the
            // longest descending subsequence till previous index
            dp[0][current] = 1 + dp[1][previous];
            // length of the longest descending subsequence is carried forward as it is
            dp[1][current] = dp[1][previous];
        }

        // if the current element is less than the previous element
        else if (nums[current] < nums[previous]) {
            // current element can contribute to a descending ordering
            // the descending dp row value is updated by adding 1 to the length of the
            // longest ascending subsequence till previous index
            dp[1][current] = 1 + dp[0][previous];
            // length of the longest ascending subsequence is carried forward as it is
            dp[0][current] = dp[0][previous];
        }

        // if the current and previous elements are equal
        else if (nums[current] == nums[previous]) {
            // carry forward the previous values
            dp[1][current] = dp[1][previous];
            dp[0][current] = dp[0][previous];
        }
    }

    // return maximum of the two final values
    return Math.max(dp[1][n - 1], dp[0][n - 1]);
};
// Driver code
function main() {
	var nums = [
    [17 ,4, 9, 7, 5],
		[1, 5, 4],
		[1, 3, 2, 5],
		[1, 2, 3, 4],
		[4, 3, 2, 1],
		[5, 5, 5, 5, 5],
		[9, 6, 4, 5, 6, 3],
	];

	// You can uncomment the lines below and check how this recursive solution causes a time-out
	// nums.push([1, 6, 4, 8, 2, 9, 4, 1, 7, 11, 23, 65, 34, 23, 45, 34, 34, 32, 32, 21, 67, 89, 76, 77, 66, 44, 89, 0, 1, 2, 3, 5, 4, 2, 5, 6, 43, 2, 4, 5, 2, 55, 66, 1, 6, 4, 8, 2, 9, 4, 1, 7, 11, 23, 65, 34, 23, 45, 34, 34, 32, 32, 21, 67, 89, 76, 77, 66, 44, 89, 0, 1, 2, 3, 5, 4, 2, 5, 6, 43, 2, 4, 5, 2, 55, 66]);

	for (var i = 0; i < nums.length; i++) {
		console.log(i + 1 + ".\tNums:  [" + nums[i] + "]");
		console.log("\n\tThe Length of Longest Alternating Subsequence is " + LAS(nums[i]));
		console.log("-".repeat(100));
	}
}

main();
