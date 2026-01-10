/**
Suppose you have a list of weights and corresponding values for n items. You have a knapsack that can carry items up to a specific maximum weight, known as the capacity of the knapsack.

You want to maximize the sum of values of the items in your knapsack while ensuring that the sum of the weights of the items remains less than or equal to the knapsack’s capacity.

If all the combinations exceed the given knapsack’s capacity, then return 00.

    Note: While adding items in the knapsack, we either add the complete item or don’t add it. Moreover, we can’t add an item again that is already in the bag.

Let’s say you have a knapsack capacity of 5 and a list of items with weights and values as follows:

weights = [1, 2, 3, 5]

values = [10, 5, 4, 8]

There are four ways of storing items in the knapsack, such that the combined weight of stored items is less than or equal to the knapsack’s capacity.

    Item of weight 1 and weight 2, with a total value of 15.
    Item of weight 1 and weight 3, with a total value of 14.
    Item of weight 2 and weight 3, with a total value of 9.
    Item of weight 5, with a value of 8.

Though all of the combinations described above are valid, we need to select the one with the maximum value. Hence, we will select items with weights 1 and 2, as they give us the maximum value of 15.

Constraints:

    1≤1≤ capacity ≤104≤104
    1≤1≤ values.length ≤103≤103
    weights.length ==== values.length
    1≤1≤ values[i] ≤104≤104
    1≤1≤ weights[i] ≤≤ capacity
n = number of items
Examples

No.	capacity	 weights	      Values	      n	  Maximum Value
1	   30	     [10, 20, 30]	 [22, 33, 44]	  3	   55
2	   5	     [1, 2, 3, 5]	 [10, 5, 4, 8]	  4	   15
 */

function findKnapsackRec (capacity, weights, values, n) {
	// base case when no items are left or capacity is zero
	if (n === 0 || capacity == 0 ) return 0
	
	if(weights[n-1] <= capacity) {
		Math.max(values[n-1] + findKnapsack(capacity - weights[n-1], weights, values, n-1), findKnapsack(capacity, weights, values, n-1))

	} else  {
		return findKnapsack(capacity, weights, values, n-1)
	}
}

function findKnapsack(capacity, weights, values, n) {
	// Write your code here

	// your code will replace the placeholder return statement below

	// Base case
	if (n == 0 || capacity == 0) return 0;

	const dp = [...Array(n + 1)].map(() => Array(capacity + 1).fill(0));
	// i refers to items column
	// j refers to weight row f capacity
	for (let i = 0; i < dp.length; ++i) {
		for (let j = 0; j < dp[0].length; ++j) {
			// if i or j = 0 initialize to 0
			if (i === 0 || j === 0) dp[i][j] = 0;
			else if (weights[i - 1] <= j) {
				// check if the weight is less than the current capacity ie: j
				// if so we have two option
				// 1. include the item
				// 2. include the item and previous item
				// get the max of the above two options

				const including = values[i - 1] + dp[i - 1][j - weights[i - 1]];
				const previous = dp[i - 1][j];
				dp[i][j] = Math.max(including, previous);
			} else {
				// we do not choose the item ie: the value remains of the previous column for the same i
				dp[i][j] = dp[i - 1][j];
			}
		}
	}
	return dp[n][capacity];
}

// function findKnapsack(capacity, weights, values, n) {
//   // initialize a lookup table
//   const dp = [...Array(n + 1)].map(() => Array(capacity + 1).fill(0));

//   for (var i = 0; i < dp.length; ++i)
//     for (var j = 0; j < dp[0].length; ++j)
//       // initialize the table with 0 when either the row or column is 0
//       if (i == 0 || j == 0) dp[i][j] = 0;
//       // check if the weight of an item is less than the capacity
//       else if (weights[i - 1] <= j)
//         dp[i][j] = Math.max(
//           values[i - 1] + dp[i - 1][j - weights[i - 1]],
//           dp[i - 1][j]
//         );
//       // we don't include the item if the weight is greater than the capacity.
//       else dp[i][j] = dp[i - 1][j];

//   return dp[n][capacity];
// }
function findKnapsack1D(capacity, weights, values, n) {
	const dp = Array(capacity + 1).fill(0);
	for (let i = 1; i < n + 1; i++) {
		for (let j = capacity; j >= 0; j--) {
			if (weights[i - 1] <= j) {
				// dp[w] = Math.max(dp[w], dp[w - wt[i - 1]] + val[i - 1]);
				const previous = dp[j];
				const including = values[i - 1] + dp[j - weights[i - 1]];
				dp[j] = Math.max(including, previous);
			}
		}
	}
	return dp[capacity];
}

function main() {
	let weights = [[1, 2, 3, 5], [4], [2], [3, 6, 10, 7, 2], [3, 6, 10, 7, 2, 12, 15, 10, 13, 20]];
	let values = [[1, 5, 4, 8], [2], [3], [12, 10, 15, 17, 13], [12, 10, 15, 17, 13, 12, 30, 15, 18, 20]];
	let capacity = [6, 3, 3, 10, 20];
	let n = [4, 1, 1, 5, 10];

	// You can uncomment the lines below and check how this recursive solution causes a time-out

	weights.push([
		63, 55, 47, 83, 61, 82, 6, 34, 9, 38, 6, 69, 17, 50, 7, 100, 101, 4, 41, 28, 119, 78, 98, 38, 75, 35, 8, 10, 16, 93, 34, 23, 51, 79, 118, 86, 85,
		109, 88, 72, 99, 36, 21, 80, 42, 44, 62, 7, 54, 7, 6, 0, 65, 25, 44, 86, 76, 18, 11, 10, 104, 17, 36, 91, 78, 88, 79, 103, 1, 4, 34, 94, 73, 21,
		8, 9, 79, 25, 106, 76, 39, 78, 1, 92, 104, 84, 40, 100, 116, 84, 23, 79, 109, 79, 71, 72, 116, 90, 79, 26,
	]);
	values.push([
		35, 47, 8, 103, 83, 71, 11, 107, 9, 34, 41, 54, 73, 72, 108, 100, 46, 27, 79, 98, 49, 63, 41, 116, 57, 86, 51, 47, 88, 118, 65, 0, 64, 11, 45, 47,
		36, 50, 114, 90, 105, 55, 93, 12, 73, 96, 50, 27, 36, 97, 12, 21, 107, 34, 106, 37, 84, 38, 110, 60, 34, 104, 92, 56, 94, 109, 81, 17, 24, 106,
		50, 68, 90, 73, 46, 99, 5, 5, 22, 27, 58, 24, 20, 80, 37, 1, 16, 39, 26, 32, 12, 47, 22, 28, 50, 95, 6, 105, 101, 20,
	]);
	capacity.push(1000);
	n.push(100);

	for (var i = 0; i < values.length; ++i) {
		console.log(i + 1 + ". We have a knapsack of capacity " + capacity[i] + " and we are given the following list of item values and weights:");
		console.log("-".repeat(30));
		console.log("Weights   |     Values");
		console.log("-".repeat(30));
		for (var j = 0; j < values[i].length; ++j) console.log(weights[i][j].toString().padEnd(9), "|    ", values[i][j].toString());
		let result = findKnapsack(capacity[i], weights[i], values[i], n[i]);
		let result1 = findKnapsack1D(capacity[i], weights[i], values[i], n[i]);
		let result2 = findKnapsackRec(capacity[i], weights[i], values[i], n[i]);
		console.log("\nThe maximum we can earn is: " + result);
		console.log("\nThe maximum we can earn is: " + result1);
		console.log("-".repeat(100));
		console.log();
	}
}

main();
