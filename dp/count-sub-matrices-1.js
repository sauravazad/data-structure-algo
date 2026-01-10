/**
1504. Count Submatrices With All Ones
https://leetcode.com/problems/count-submatrices-with-all-ones/
*/
const print2DMatrix = (matrix) => {
	console.info("__".repeat(20));
	for (let i = 0; i < matrix.length; i++) {
		console.info(matrix[i].join(" | "));
	}
	console.info("__".repeat(20));
};

const numSubmat = (mat) => {
	let count = 0;
	const rows = mat.length;
	const columns = mat[0].length;
	const oneCounts = [...Array(rows)].map(() => Array(columns).fill(0));
	// iterate through the matrix to build a lookup table which consists of number of consecutive ones to its right
	for (let r = 0; r < rows; r++) {
		for (let c = columns - 1; c >= 0; c--) {
			if (mat[r][c] === 1) {
				// 1 + ( previousCount  or if we have exceeded the bound then 0)
				const prevColumnIndex = c + 1; // we are iterate from right to left
				// check if the previous index exceeds the column length if so then the value is zero
				oneCounts[r][c] += 1 + (prevColumnIndex < columns ? oneCounts[r][prevColumnIndex] : 0);
			}
		}
	}
	// print2DMatrix(oneCounts);

	// fix the element position at a given  and try to expand the matrix width
	for (let r = 0; r < rows; r++) {
		for (let c = 0; c < columns; c++) {
			// try to expand grow  in the rows if the current element is = 1
      if (mat[r][c] === 1) {
        let min_width = Number.MAX_VALUE;
				for (let w = r; w < rows; w++) {
					min_width = Math.min(min_width, oneCounts[w][c]); // we can only expand the matrix width if all the element are 1
					count += min_width;
				}
			}
		}
	}
	return count;
};
// Driver code
var main = function () {
	const input = [
		[
			[1, 0, 1],
			[1, 1, 0],
			[1, 1, 0],
		],
		[[0,1,1,0],[0,1,1,1],[1,1,1,0]]
	];
	/**
	 *  Fill the time complexity for each function
	 */

	for (var i = 0; i < input.length; i++) {
		console.log(i + 1 + ".\t Input array:", input[i]);
		var result = numSubmat(input[i]);
		console.log("\t Result is", result);
		console.log("-".repeat(100));
	}
};

main();
