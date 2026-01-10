/**

Suppose you are given an array, nums, containing positive numbers. You need to partition the array into two arrays such that the
absolute difference between their sums is minimized.

[NOTE:] : Each element of the nums array should be present in one of the partitioned arrays.

Let’s say you have the following array:

[2, 3, 1]

The two partitioned arrays with the minimum difference in their sums are:
[2,1] sum = 3
[3]   sum = 3
So, the minimum difference becomes ∣3−3∣ = 0 .

Constraints:
1<= nums.length <= 900
1 <= nums[i] <= 10^4

*/
function printList(input_arr) {
	return `[${input_arr.join(", ")}]`;
}
function minimumPartitionArraySumDifference(input) {
	const index = 0;
	const sumLeft = 0;
	const sumRight = 0;
	let totalSum = 0;
	input.forEach((v) => (totalSum += v));
	// memo 2D array where the max diff can be the sum of all the element hence the columns extends till sum of Array elements ie: arr1 = [] arr2[all the elements]
	const memo = [...Array(input.length)].map(() => Array(totalSum).fill(Infinity));
	// return minPartRecurse(input, index, sumLeft, sumRight, memo);
	// const result = minPartRecurseMemo(input, index, sumLeft, sumRight, memo);
	// printList(memo)
	// console.log(memo)
	const result = minPart2D(input);
	return result;
}

function minPartRecurse(input, index, sumLeft, sumRight) {
	// base case
	if (index === input.length) return Math.abs(sumLeft - sumRight);
	const nextIndex = index + 1;
	const left = minPartRecurse(input, nextIndex, sumLeft + input[index], sumRight);
	const right = minPartRecurse(input, nextIndex, sumLeft, sumRight + input[index]);
	return Math.min(left, right);
}

// Top-Down approach with memoization
function minPartRecurseMemo(input, index, sumLeft, sumRight, memo, leftArray = [], rightArray = []) {
	if (index === input.length) return Math.abs(sumLeft - sumRight);
	if (memo[index][sumLeft] !== Infinity) return memo[index][sumLeft];
	const nextIndex = index + 1;
	const current = input[index];
	// include the element in left array
	const leftPartSum = minPartRecurseMemo(input, nextIndex, sumLeft + input[index], sumRight, memo, leftArray.concat(current), rightArray);
	// include the element in right array
	const rightPartSum = minPartRecurseMemo(input, nextIndex, sumLeft, sumRight + input[index], memo, leftArray, rightArray.concat(current));
	// check the minimum of the partition when included in right , when included in left
	const min = Math.min(leftPartSum, rightPartSum);
	// index is the row , and since for a given index there can be combination of element ot include and exclude from array partitions
	// but for a given sum of one partition , other partition's sum will always be the same , we can safely store the value value on either of the partition's sum as column index
	// I have chosen left partition sum
	memo[index][sumLeft] = min;
	return memo[index][sumLeft];
}

// Bottom up approach using 2D matrix
function minPart2D(input) {
	let sum = 0;
	input.forEach((s) => (sum += s));
	const half = parseInt(sum / 2 + 1, 0);
	// we are calculating absolute difference which can be attained if sum of element in one of the array partition is close to half the sum
	// if sum = 6 then we calculate if the array element can sum up to 6/2 + 1 = 4
	// create a 2D array row = [input.length]  column = [sum / 2 + 1]
	// Base case  0 can always be obtained by empty array hence the value for all column index = 0 is set to 1 ie: sum of elements [] set = 0

	// for the first row the index will be set to 1 if the element is equal to the index
	// ie: [2,4,5] so dp[0][2] = 1 as sum = 2 can be obtained by only including 1
	const dp = [...Array(input.length)].map(() => {
		const row = Array(half).fill(0);
		row[0] = 1;
		return row;
	});
	for (let i = 0; i <= half; i++) {
		input[0] === i ? (dp[0][i] = 1) : (dp[0][i] = 0);
	}

	for (let i = 1; i < input.length; i++) {
		for (let s = 1; s < half; s++) {
			// exclude the element
			if (dp[i - 1][s]) dp[i][s] = dp[i - 1][s];
			// include the element
			else if (s >= input[i]) dp[i][s] = dp[i - 1][s - input[i - 1]];
			// else it 0 which is already set
		}
	}

	// Iterate through the last row and from right ot left and check if the element is equal to 1
	// if so then find the diff by total - element then do Math.min()
	for (let s = half; s >= 0; s--) {
		if (dp[input.length - 1][s] == 1) {
			let sum1 = s;
			let sum2 = sum - sum1;
			return Math.abs(sum2 - sum1);
		}
	}
}

// Driver code
function main() {
	inputs = [
		[2, 3, 1],
		[5, 4, 4, 7, 2, 9],
		[3, 25, 4, 12, 2],
		[3, 7, 4, 12, 2],
		[1, 1, 1, 1000, 1],
		[45, 2, 9, 87, 9, 12, 54, 56],
	];

	// You can uncomment the lines below and check how this recursive solution causes a time-out
	inputs.push([
		28, 20, 19, 39, 51, 92, 41, 9, 79, 46, 63, 77, 65, 10, 24, 5, 92, 2, 39, 68, 99, 60, 69, 88, 93, 99, 51, 44, 67, 2, 90, 8, 9, 89, 48, 76, 58, 87, 77, 62, 22, 92, 86, 86, 46, 13, 12, 75, 38, 77,
		99, 6, 57, 71, 9, 23, 97, 80, 97, 69, 68, 28, 46, 16, 25, 61, 80, 76, 35, 23, 8, 4, 19, 56, 58, 54, 77, 77, 41, 73, 95, 93, 35, 70, 74, 90, 96, 46, 63, 32, 40, 32, 50, 2, 60, 73, 87, 61, 60, 42,
	]);

	for (let i = 0; i < inputs.length; i++) {
		console.log(i + 1 + ".\tinput:", printList(inputs[i]), "\n\n\tThe minimum difference in sums between the partitioned arrays is:", minimumPartitionArraySumDifference(inputs[i]));

		console.log("-".repeat(100));
	}
}

main();
