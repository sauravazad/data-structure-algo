/**
https://www.educative.io/courses/grokking-dynamic-programming-a-deep-dive-using-javascript/qVvPx88w047
 */

const longestCommonSubsequence = (s1, s2) => {
	const result = longestCommonSubsequenceRecStr(s1, s2, 0, 0);
	return result;
};

const longestCommonSubsequenceRec = (s1, s2, index1, index2) => {
	if (index1 >= s1.length || index2 >= s2.length) return 0;
  else if(s1[index1] === s2[index2]) {
    return 1 + longestCommonSubsequenceRec(s1, s2, index1 +1, index2 + 1)
  }
  return Math.max(longestCommonSubsequenceRec(s1, s2, index1 +1, index2), longestCommonSubsequenceRec(s1, s2, index1, index2 + 1))
};

const longestCommonSubsequenceRecStr = (s1, s2, index1, index2) => {
	if (index1 >= s1.length || index2 >= s2.length) return '';
  else if(s1[index1] === s2[index2]) {
    const _str = longestCommonSubsequenceRecStr(s1, s2, index1 +1, index2 + 1)
    return  s1[index1] + _str
  }
  let strs1 = longestCommonSubsequenceRecStr(s1, s2, index1 +1, index2)
  let strs2  = longestCommonSubsequenceRecStr(s1, s2, index1, index2 + 1)
  if(strs1.length > strs2.length) {
    return strs1
  } else  {
    return strs2
  }
};

const longestCommonSubsequenceBottomUp = (s1, s2) => {
  const dp = [...Array(s1.length + 1)].map(() => Array(s2.length+1).fill(0))

  for(let i = 1; i <= s1.length; i++) {
    for(let j = 1; j <= s2.length; j++) {
      // if it matches
      if(s1[i-1] === s2[j-1]) {
        dp[i][j] = dp[i-1][j-1] + 1
      } else {
        dp[i][j] = Math.max(dp[i-1][j], dp[i][j-1])
      }
    }
  }
  return dp[s1.length][s2.length]
}
// Driver code
function main() {
	firstStrings = ["qstw", "setter", "abcde", "partner", "freedom", "sea", "delete"];
	secondStrings = ["gofvn", "bat", "apple", "park", "redeem", "eat", "leet"];

	// You can uncomment the lines below and check how this recursive solution causes a time-out
	// firstStrings.push("sjcneiurutvmpdkapbrcapjru");
	// secondStrings.push("oidhfwepkxwebyurtunvidqlscmjbg");

	for (let i = 0; i < firstStrings.length; i++) {
		console.log(
			i + 1 + ".\tstr1:",
			firstStrings[i],
			"\n\tstr2:",
			secondStrings[i],
			"\n\n\tThe length of the longest common subsequence is:",
			longestCommonSubsequence(firstStrings[i], secondStrings[i])
		);

		console.log("-".repeat(100));
	}
}

main();
