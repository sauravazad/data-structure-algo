/**
  https://leetcode.com/problems/delete-operation-for-two-strings
 */
const minDelIns= (s1, s2) => {
  const lcs = findLCS(s1, s2)
  const deletion = s1.length - lcs
  const additions = s2.length - lcs
  return [deletion, additions]
}

const findLCS = (s1, s2) => {
  const dp = [...Array(s1.length+1)].map(() => Array(s2.length+1).fill(0))
  for(let i =1; i <= s1.length ; i++) {
    for(let j = 1; j <= s2.length ; j++) {
      if(s1[i-1] ===s2[j-1]) {
        dp[i][j] = 1 + dp[i-1][j-1]
      } else  {
        dp[i][j] = Math.max(dp[i-1][j], dp[i][j-1])
      }
    }
  }
  return dp[s1.length][s2.length]
}


// Driver code
var main = function () {
	const input = [

			["pqr", "tqr"],
			["heap", "pea"],
			["passport", "ppsspt"],
			["baller", "ball"],
			["sam", "samson"],
			["bed", "read"],

	];
  input.push(["sjcneiurutvmpdkapbrcapjru", "oidhfwepkxwebyurtunvidqlscmjbg"])
	/**
	 *  Fill the time complexity for each function
	 */

	for (var i = 0; i < input.length; i++) {
		console.log(i + 1 + ".\t Input array:", input[i]);
		var result = minDelIns(input[i][0], input[i][1]);
		console.log("\t Result is", result);
    console.log("\n\tMinimum deletions required:  " + result[0]);
    console.log("\tMinimum insertions required: " + result[1]);
		console.log("-".repeat(100));
	}
};

main();
