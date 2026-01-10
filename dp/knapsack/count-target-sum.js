/**
Given a set of positive numbers num's and a value targetSum, count the total number of subsets of the given set whose sum is equal to the targetSum.

Let’s say you are given a set =   {1, 2, 3, 4} and a target sum = 4 .
The output will be 2 as the following subsets:
  {1, 3}
  {4}
will add up to make the desired sum.

Constraints:

  1 <=  nums.length <= 1000
  0 <= targetSum <= 10^5
  0 <= nums[i] <= 10^4

Examples:

No.	   nums	       targetSum	Output
1	  {1, 2, 3, 4}	    4	       2
2	  {1, 2, 7, 4, 5}	  9	       2
3	  {1, 2, 3, 7}	    6	       1
*/
function countSubsetSum(input, target) {
  let sum = 0;
  // const dp = [...Array(input.length)].map(() => Array(target + 1).fill(-1));
  // const result = countSubsetSumRec(input, target, 0, sum)
  // const result = countSubsetSumRec2(input, target, input.length)

  // const result = countSubsetSumRecMemo(input, target, 0, dp);
  const dp = [...Array(input.length)].map(() => Array(target + 1).fill(0));
  const result = countSubsetSum2D(input, target, dp);

  // console.info(dp)
  return result;
}

/**
  recurse through all the element until
  start counting from 0  to n index , by including and excluding the element on each iteration to sum up
  if sum  === target return 1
  else return 0
  if index === input.length // as we have reached the last element but have not found the sum
    return 0
 */
function countSubsetSumRec(input, target, index, sum) {
  if (sum === target) return 1;
  if (index === input.length) return 0;

  const nextIndex = index + 1;
  // include the current element
  const included = countSubsetSumRec(
    input,
    target,
    nextIndex,
    sum + input[index]
  );
  // exclude the element
  const excluded = countSubsetSumRec(input, target, nextIndex, sum);
  return included + excluded;
}

/**
  recurse through all the element until
  start counting from n  to 0 index , by including and excluding the element on each iteration to diff up
  if sum  === 0 return 1
  else return 0
  if index === -1 // as we have reached the last element but have not found the sum
    return 0
 */
function countSubsetSumRec2(input, target, index) {
  if (target === 0) return 1;
  if (index < 0) return 0;

  const nextIndex = index - 1;
  // include the current element
  const included = countSubsetSumRec2(input, target - input[index], nextIndex);
  // exclude the element
  const excluded = countSubsetSumRec2(input, target, nextIndex);
  return included + excluded;
}

function countSubsetSumRecMemo(input, target, index, dp) {
  if (target === 0) return 1;
  if (index >= input.length) return 0;

  if(dp[index][target] == -1) {
    const nextIndex = index + 1;
    // include the current element
    let included = 0
    if(input[index] <= target) included = countSubsetSumRecMemo(input, target - input[index], nextIndex, dp);

    // exclude the element
    const excluded = countSubsetSumRecMemo(input, target, nextIndex, dp);
    const result = included + excluded;
    dp[index][target] = result
  }

  return dp[index][target]
}



function countSubsetSum2D (input, target, dp) {
  // base case
  // empty set will result in zero
  // also if the element is zero then also the sum will result in zero
  // ie:  if num[0] === 0 then fill (1 (empty set) + 1 (because 0)) =2
  if(input[0] === 0) dp[0][0] = 2

  else {
    dp[0][0] = 1
    if(input[0] <= target) {
      dp[0][input[0]] = 1
    }
  }

  for(let i = 1; i < input.length; i++) {
      for(let currentTarget = 0; currentTarget <= target ; currentTarget++) {
        let included = 0
        if(input[i] <= currentTarget) {
          included = dp[i-1][currentTarget - input[i]]
        }
        excluded = dp[i-1][currentTarget]
        dp[i][currentTarget] = included + excluded
      }
  }
  return dp[input.length -1][target]

}
var main = function () {
  let inputNums = [
      [1],
      [11, 33],
      [4, 2, 3],
      [1, 4, 2, 3],
      [1, 2, 7, 4, 5],
      [1, 2, 3, 7],
    ],
    targetSums = [10, 11, 6, 4, 9, 6];

  // You can uncomment the lines below and check how this recursive solution causes a time-out

  inputNums.push([
      1, 4, 6, 7, 8, 9, 10, 11, 16, 17, 18, 21, 23, 25, 26, 28, 34, 35, 36,
      38, 39, 40, 41, 42, 44, 47, 50, 51, 54, 55, 61, 62, 63, 65, 69, 71, 72,
      73, 75, 76, 78, 79, 80, 82, 83, 84, 85, 86, 88, 90, 91, 92, 93, 94, 98,
      99, 100, 101, 103, 104, 106, 109, 116, 118, 119,
  ]);
  targetSums.push(2593);

  for (let i = 0; i < inputNums.length; i++) {
    console.log(`${i + 1}.\tnums = [` + inputNums[i].join(", ") + "]");
    console.log("\ttarget sum = ", targetSums[i]);
    console.log(
      "\tTotal number of subsets whose sum is equal to the target sum = ",
      countSubsetSum(inputNums[i], targetSums[i])
    );
    console.log("-".repeat(100));
  }
};

main();
