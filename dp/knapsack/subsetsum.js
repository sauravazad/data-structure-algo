/**
Given a set of positive numbers arr and a value total, determine if there exists a subset in 
the given set whose sum is equal to total. A subset can be an empty set, or it can either 
consist of some elements of the set or all the elements of the set.

Let’s say you are given a set = {1, 2, 3, 7} and a total = 6. 
The output will be TRUE as the subset = {1, 2, 3} adds up to make the desired total (1+2+3) = 6.
Constraints:
1<= arr.length <= 1000
0 <= total <= 10^5
1 <= arr[i] <= 10^4
*/

function subsetSum(arr, total) {
  const length = arr.length;
  const index = 0;
  const target = total;
  const memo = [];
  const dp = [...Array(arr.length + 1)].map(() => Array(total + 1).fill(-1));
  // const result = subsetSumRec(arr, length, target, 0, index, memo)
  // const result = subSetSumRevRec(arr, 0, target)
  // const result = subSetSumRevRecMemo(arr, 0, target, dp)
  const result = subSetSum2DMemo(arr, 0, target);
  // console.info('-'.repeat(20))
  // console.info(dp)
  // console.info('-'.repeat(20))
  return result;
}

function subsetSumRec(arr, count, target, sum, index, memo) {
  if (sum === target) {
    return true;
  }
  if (index === count) {
    return sum === target;
  }
  // if(arr[index] > sum ) {
  //   return subsetSumRec(arr, count, target, sum + arr[index + 1], index + 1)
  // }
  const nextIndex = index + 1;
  const include = subsetSumRec(
    arr,
    count,
    target,
    sum + arr[index],
    nextIndex,
    memo
  );
  const exclude = subsetSumRec(arr, count, target, sum, nextIndex, memo);
  const result = include || exclude;
  const hashKey = `index-${index}-sum-${sum}`;
  memo.push({ [hashKey]: result });
  return result;
}

// recursively call the function with the reduced sum when the element is included
/*
Approach 1 :
- Process the array from 0 to arr.length - 1
- we are processing the array from index 0 hence the check for base condition that if we exceed the number of index terminate and return
Approach 2 :
  - Process the array from arr.length to 0
  - we are processing the array from back hence we have to check for bse case when the index has exceeded the length of array return false
*/
function subSetSumRevRec(arr, index, total) {
  if (total === 0) return true;

  if (index > arr.length) return false;
  const nextIndex = index + 1;
  // if the next element is larger than  the target total we can safely ignore it

  if (arr[index] > total) {
    return subSetSumRevRec(arr, nextIndex, total);
  }
  const include = subSetSumRevRec(arr, nextIndex, total - arr[index]);
  const exclude = subSetSumRevRec(arr, nextIndex, total);
  return include || exclude;
}

function subSetSumRevRecMemo(arr, index, total, dp) {
  if (total === 0) return true;

  if (index >= arr.length) return false;
  const nextIndex = index + 1;
  // if the next element is larger than  the target total we can safely ignore it
  if (dp[index][total] !== -1) {
    return dp[index][total];
  }
  if (arr[index] > total) {
    dp[nextIndex][total] = subSetSumRevRecMemo(arr, nextIndex, total, dp);
    return dp[nextIndex][total];
  }
  const include = subSetSumRevRecMemo(arr, nextIndex, total - arr[index], dp);
  const exclude = subSetSumRevRecMemo(arr, nextIndex, total, dp);
  dp[nextIndex][total] = include || exclude;
  return dp[nextIndex][total];
}

function subSetSum2DMemo(arr, index, total) {
  const dp = [...Array(arr.length + 1)].map(() => Array(total + 1).fill(false));
  //
  for (let i = 0; i < arr.length + 1; i++) {
    for (let j = 0; j < total + 1; j++) {
      // all the sets have an empty set so we can achieve this for sum = 0
      // if(i == 0) {
      //   dp[i][j] = false
      // }
      if (j == 0) {
        dp[i][j] = true;
      }
    }
  }

  for (let i = 1; i <= arr.length; ++i) {
    for (let j = 1; j <= total; ++j) {
      // if current element is larger than j we will ignore it and fill the previous value
      const elem = arr[i - 1];
      if (elem > j) {
        dp[i][j] = dp[i - 1][j];
      }
      // else include the element
      else {
        dp[i][j] = dp[i - 1][j - elem];
      }
    }
  }
  // console.info('-'.repeat(20))
  console.info(dp);
  // console.info('-'.repeat(20))
  return dp[arr.length][total];
}
// Driver Code
function main() {
  let input_arr = [
    [3, 5, 8],
    [2, 4, 7],
    [2, 3, 5],
    [1, 2, 3, 7],
    [10, 20, 23, 34],
  ];
  let total = [13, 8, 5, 6, 57];

  // You can uncomment the lines below and check how this recursive solution causes a time-out

  // input_arr.push([0, 1, 4, 6, 7, 8, 9, 10, 11, 16, 17, 18, 21, 23, 25, 26, 28, 34,
  //   35, 36, 38, 39, 40, 41, 42, 44, 47, 50, 51, 54, 55, 61, 62, 63, 65, 69, 71, 72,
  //   73, 75, 76, 78, 79, 80, 82, 83, 84, 85, 86, 88, 90, 91, 92, 93, 94, 98, 99, 100,
  //   101, 103, 104, 106, 109, 116, 118, 119]);
  // total.push(2593);

  let result;
  for (let i = 0; i < total.length; i++) {
    let result = subsetSum(input_arr[i], total[i]);
    if (result === true) {
      result = "Yes.";
    } else {
      result = "No.";
    }
    console.log(i +1 +".\tDoes a subset of [" +input_arr[i].join(", ") +"] sum up to " +total[i] +"?   ",result);
    console.log("-".repeat(100));
  }
}

main();
