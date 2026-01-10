/**
You’re given an integer total and a list of integers called coins. The integers inside the coins represent the coin denominations,
and total is the total amount of money.

You have to return the minimum number of coins that can make up the total amount by using any combination of the available coins.
If the amount can’t be made up, return -1. If the total amount is 0, return 0.
 */

function coinChange(coins, total) {

  // write your code here
  let result = -1
  const dp = Array(total).fill(parseFloat(Number.MAX_VALUE))
  // result = coinChangeRec(coins, total, dp)
  // result = coinChangeRecMemo(coins, total, dp)
  result = coinChangeBottomUp(coins, total)
  console.info("result is ", result)
  return result;
}

function coinChangeRec(coins, total) {
  if(total === 0) {
    return 0
  }
  if(total <= 0) {
    return -1
  }

  let minimum = parseFloat(Number.MAX_VALUE);
  // iterate over all the coins and reduce from total
  coins.forEach(coin => {
      const result = coinChangeRec(coins, total - coin)
      if(result >= 0 && result < minimum) {
        minimum = 1 + result
      }
  });

  if(minimum !== parseFloat(Number.MAX_VALUE)) {
    return minimum
  } else  {
    return -1
  }

}

function coinChangeRecMemo (coins, total, dp) {
  if(total === 0) {
    return 0
  }
  if(total <= 0) {
    return -1
  }
  if(dp[total - 1] != parseFloat(Number.MAX_VALUE)) {
    return dp[total -1 ]
  }
  let minimum = parseFloat(Number.MAX_VALUE);
  // iterate over all the coins and reduce the total
  coins.forEach(coin => {
    const result = coinChangeRec(coins, total - coin)
    if(result >= 0 && result < minimum) {
      minimum = 1 + result
    }
  })

if(minimum !== parseFloat(Number.MAX_VALUE)) {
  dp[total -1] = minimum
} else  {
  dp[total -1] = -1
}
return dp[total -1 ]
}

function coinChangeBottomUp(coins, total) {
  // as we are only dealing with 1 value we only require 1D array of length of total
  // fill the value with Infinity as we will be taking Math.min
  const dp = Array(total+ 1).fill(total + 1)
  // base case ie: we cannot achieve zero under any circumstances
  dp[0] = 0
  for(let i = 1 ; i <= total; i++) {
    for (let j = 0 ; j < coins.length; j++) {
      // min between when picked , when not picked
      if(i- coins[j] >= 0) {
        dp[i] = Math.min(dp[i] , 1 + dp[i - coins[j]])
      }// check if it is not negative
    }
  }
  console.info(dp)
  if(dp[total] !== total +1) {
    return dp[total]
  } else {
    return -1
  }
}

// Driver Code
function main(){
  let coins = [[1, 2], [1, 3, 4, 5],[1, 2, 3],[2, 3, 7],[1, 3, 9],[1, 4, 6, 9], [186, 419, 83, 408]];
  let total = [3, 7, 5, 1, 4, 11, 6249];

  // You can uncomment the lines below and check how this recursive solution causes a time-out

  // coins.push([34, 10, 200, 415]);
  // total.push(610);

  for (let i = 0; i < coins.length; i++) {
      console.log((i + 1).toString() + ".\tThe minimum number of coins required to find " + total[i].toString() +
          " from", coins[i], "is: " + (coinChange(coins[i], total[i])).toString())
      console.log('-'.repeat(100));
  }
}

main()