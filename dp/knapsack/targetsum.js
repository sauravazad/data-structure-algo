/**
Given an array of positive integers arr and a target T, build an expression using these numbers by inserting a +
or a - before each integer, and evaluating this expression. Find the total number of different expressions that evaluate to T.

For example, consider an array [1, 1] and a target 0, we can build the following expressions:

Expression	Sum
+ 1 + 1	    2
+ 1 – 1	    0
– 1 + 1	    0
– 1 – 1	    –2

The total number of expressions that evaluate to the target are 2.
Constraints:
  -  1 <= arr.length <= 40
  -  0 <= arr[i] <= 1000
  -  0 <= sum(arr[i]) <= 1000
  -  1000 <= T <= 1000
 */

function findTargetSumWays(arr, T) {
	// Write your code here
	// zero is passed to start the expression build up from oth index
	// return targetSumRecurse(arr, 0, T)
	var total = 0;
	arr.forEach((num) => {
		total += num;
	});
	// initialize a lookup table
	// allocate twice the space to counter for negative indexes and the reason to pass total for hash key is to counter for negative sum values
	// ie: if the current sum is positive store it at total + sum
	// if current sum is negative  store it at total + (- sum) . so that we do not have to deal with negative indexes
	// as max total sum can never exceed total of all the numbers
	const dp = [...Array(arr.length)].map(() => Array(2 * total + 1).fill(-1));
	// const result = targetSumRecurse2D(arr, T, total, 0, 0, dp);
	const result = targetSumRecurse2D(arr, T, total);
	console.info(dp);
	return result;
}

function targetSumRecurse(arr, index, T, expression = "") {
	console.info(`targetSumRecurse:  index: ${index} T: ${T}, expression: ${expression}`);
	if (index === arr.length) {
		if (T === 0) return 1;
		return 0;
	}
	// Return total count of the following cases:
	//       1. Add current element to the target
	//       2. Subtract current element from the target
	const addResult = targetSumRecurse(arr, index + 1, T + arr[index], `${T} + ${arr[index]}`);
	const subtractResult = targetSumRecurse(arr, index + 1, T - arr[index], `${T} - ${arr[index]}`);

	return addResult + subtractResult;
}

function targetSumRecurseMemo(arr, T, total, i, sum, dp) {
	// If all integers are processed
	if (i == arr.length) {
		// If target is reached
		if (sum == T) return 1;
		// If target is not reached
		return 0;
	}
	// sum + total : to counter for negative sum as we only have positive indexes
	// If we have solved it earlier, then return the result from memory
	if (dp[i][sum + total] != -1) return dp[i][sum + total];

	// Calculate both sub-problems and save the results in the memory
	dp[i][sum + total] = targetSumRecurseMemo(arr, T, total, i + 1, sum - arr[i], dp) + targetSumRecurseMemo(arr, T, total, i + 1, sum + arr[i], dp);

	return dp[i][sum + total];
}

function targetSumRecurse2D(arr, T, total) {
	const dp = [...Array(arr.length)].map(() => Array(2 * total + 1).fill(0));
	// initialize the dp [0] row for the value of arr[0] on the corresponding index
	dp[0][total + arr[0]] = 1;
	dp[0][total - arr[0]] += 1;

	for (let i = 1; i < arr.length; i++) {
		for (let j = -total; j < total + 1; j++) {
			if (dp[i - 1][j + total] > 0) {
				// then
				dp[i][j + total + arr[i]] += dp[i - 1][j + total];
				dp[i][j + total - arr[i]] += dp[i - 1][j + total];
			}
		}
	}
	return dp[arr.length - 1][T + total];
}

function main() {
	const array = [3, 3, 3, 3];
	const target = 6;
	const ways = findTargetSumWays(array, target);
	console.info(`ways to target sum of ${target} is `, ways);
}

main();
