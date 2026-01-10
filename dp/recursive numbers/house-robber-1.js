/**
https://leetcode.com/problems/house-robber/
*/
const robHouse = (houses, index, dp) => {
	if (index >= houses.length) {
		return 0;
	}
	if (dp[index] === -1) {
		const first = robHouse(houses, index + 1, dp);
		const second = houses[index] + robHouse(houses, index + 2, dp);
		dp[index] = Math.max(first, second);
	}
	return dp[index];
};

const roHouseBottomUp = (houses) => {
	const memo = Array(houses.length);
	// base case fill the 1st
	memo[0] = houses[0];

	for (let i = 1; i < houses.length; i++) {
		// for 2 , max(we can rob with 2 and 0 or we can rob 1)
		const robCurrent = houses[i] + (memo[i - 2] || 0);
		const doNotRobCurrent = memo[i - 1];
		memo[i] = Math.max(robCurrent, doNotRobCurrent);
	}
	return memo[houses.length - 1];
};

const robHouseOpt = (houses) => {
  let previous = houses[0]
  let secondPrevious = 0
  for(let i = 1; i < houses.length; i++) {
    const current = Math.max(previous, houses[i] + secondPrevious)
    secondPrevious = previous
    previous = current
  }
  return previous
}

const rob = (houses) => {
	const dp = new Array(houses.length).fill(-1);
	const result = roHouseBottomUp(houses, 0, dp);
	return result;
};

// Driver code
var main = function () {
	const input = [
		[1, 2, 3, 1],
		[ 5, 2, 3, 2 ],
		[2, 7, 9, 3, 1],
	];
	/**
	 *  Fill the time complexity for each function
	 */

	for (var i = 0; i < input.length; i++) {
		console.log(i + 1 + ".\t Input array:", input[i]);
		var result = rob(input[i]);
		console.log("\t Result is", result);
		console.log("-".repeat(100));
	}
};

main();
