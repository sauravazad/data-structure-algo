/**
https://leetcode.com/problems/coin-change/description/

You are given an integer array coins representing coins of different denominations and an integer amount representing a total amount of money.

Return the fewest number of coins that you need to make up that amount. If that amount of money cannot be made up by any combination of the coins, return -1.

You may assume that you have an infinite number of each kind of coin.
 */


/**
 Example 1:

Input: coins = [1,2,5], amount = 11
Output: 3
Explanation: 11 = 5 + 5 + 1

Example 2:

Input: coins = [2], amount = 3
Output: -1

Example 3:

Input: coins = [1], amount = 0
Output: 0

 */
const coinChangeRec = (coins, target, dp, count=0) => {
/**
    Base case : 
    1. coin value is greater than target then return 0
    
    Recurrence:
    - for every coin denomination iterate and recursively call coinChange and take the minimum and add to the target cost 
    
 */
  /**
    Time complexity : O(S^n). n = number of coins and S = amount. So for every Ci we could have S/ci values
    S/c1 * S/c2 ...S/cn = S^n/(c1* c2* ... cn) 
    Space complexity : O(n): we are using a recursive apporach without any extra space so to store the state of each recursive call at any point we will need O(n)
   */
console.log(`Solving for target: ${target}, count: ${count}`)
  if(target <= 0) return count
  // if( dp[target] != Infinity) return dp[target]
  let result = Infinity
    for(let i = 0 ; i < coins.length; i++) {
      const coin = coins[i]
      if(coin <= target) {
        result = Math.min(coinChangeRec(coins, target - coin, dp, count + 1), result)        
      }
    }
    dp[target-1] = result !== Infinity ? result : -1
    return  dp[target-1] 
}

const coinChangeRecTopDown = (coins, target, dp) => {
  /**
   * F(S) - minimum number of coins needed to make change for amount S using coin denominations [c0​…cn−1​]
   * Recurrance relation
    F(S) = F(S-C) + 1
    F(S) = min i=0 ...n-1 F(S-Ci) + 1
    where : S-Ci >=0
    F(S) = 0  S = 0
    F(S) = -1,, when n = 0 
    * 
    Time complexity :
      O(S*n): S = amount/traget, n : is the denomination count
    Space Complexity : 
      O(S): S : amount + space for memoization Table , whose size would also be S
   */
  // console.info("solving for target: ", target)
  if(target < 0) return -1
  if(target == 0) return 0
  if(dp[target] !== Infinity) return dp[target]
  let min = Infinity
  for(let i =0; i < coins.length ; i++) {
    const coin = coins[i]
    // check if the coin is less than target
    if(coin <=target) {
      const res = coinChangeRecTopDown(coins, target - coin, dp)
      if(res >=0 && res <= min) {
        min = 1 + res
      }
    }
  }
  dp[target] = min === Infinity ? -1 : min
  return dp[target]

}

const coinChangeBottomUp = (coins, amount) => {
  /**
   for iterative solution we need to start from bottom ie: before we approach an amount , we need to solve the previous amount.
   So we beging from F(0) = 0 since we cannot achieve this, F(1) = (1)
   so for every i we solve F(S) = min i=0 ...n-1 F(S-Ci) + 1 and fill the value in the dp array.
   NOTE: DP array should be able to hold all previous amount values , so it will of length ammount.
  and each value can never be more than the amount so we can use that as a default value
   */
  const dp = Array(amount+1).fill(amount+1)
  dp[0] = 0
  // iterate over the amount 
  for(let i = 1; i <= amount; i++) {
    //iterate over each coin and fill the value
    for(let j =0; j < coins.length; j++) {
      // check if the coin can be used
      if(i - coins[j] >=0) {
        dp[i] = Math.min(dp[i- coins[j]] + 1, dp[i])
      }
      
    }
  }
  console.info(dp)
  return dp[amount] > amount ? -1 : dp[amount]
}

var coinChange = function(coins, amount) {
    const dp = [ ...Array(amount+ 1).fill(Infinity)]
    const result = coinChangeBottomUp(coins, amount)
    // const result = coinChangeRecTopDown(coins, amount, dp)
    // const result = coinChangeRec(coins, amount, dp)
    return result
};

// Driver code
var main = function () {
  const fn = coinChange
  const input = [
    [[1,2,5], 11],
    [[2], 3],
    [[1], 0],
    [[186, 419, 83, 408], 6249],
  ]
  /**
   *  Fill the time complexity for each function
   */

  for (var i = 0; i < input.length; i++) {
      console.log(i + 1 + ".\t Input array: \t", input[i]);
      var result = fn(...input[i]);
      console.log("\t Result is \t: ",result);
      console.log("-".repeat(100));
  }
}

main();