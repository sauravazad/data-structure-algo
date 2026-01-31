/**
Suppose you are given a list of coins and a certain amount of money. Each coin in the list is unique and of a different denomination. You are required to count the number of ways the provided coins can sum up to represent the given amount.
If there is no possible way to represent that amount, then return 0;
*/

function countWays (coins, amount) {
  if (amount === 0) return 0
  const max = Math.max.apply(Math, coins)
  // const result = countChangeRecursive(coins, amount, max)
  const memo = {}
  // const result = countChangeRecursive1(coins, amount, 0, memo, "");
  const result = countChangeBottomUp(coins, amount, 0, memo, '')
  // console.info(memo)
  return result
}

function countChangeRecursive (coins, amount, maximum, changes) {
  // base case amount can be split using provided coin denominations
  if (amount === 0) {
    return 1
  }
  if (amount < 0) {
    return 0
  }
  let ways = 0

  for (let i = 0; i < coins.length; i++) {
    // check if the current coin denomination is smaller than the maximum denomination
    if (coins[i] <= maximum && amount - coins[i] >= 0) {
      ways += countChangeRecursive(coins, amount - coins[i], coins[i])
    }
  }

  return ways
}

function countChangeRecursive1 (coins, amount, index, memo, str = '') {
  // base case amount can be split using provided coin denominations
  if (amount === 0) {
    console.info('Coin combination is ', str)
    return 1
  }
  if (amount < 0) {
    return 0
  }
  if (index >= coins.length) {
    return 0
  }
  if (`${amount}-${index}` in memo) {
    // console.info("Found in cache");
    return memo[`${amount}-${index}`]
  } else {
    let takeways = 0
    let nottakeways = 0
    // take the coin or do not take the coin
    if (coins[index] <= amount) {
      takeways = countChangeRecursive1(coins, amount - coins[index], index, memo, `${str} - ${coins[index]}`)
    }

    nottakeways = countChangeRecursive1(coins, amount, index + 1, memo, `${str}`)

    const ways = takeways + nottakeways
    memo[`${amount}-${index}`] = ways
    return ways
  }
}

const countChangeBottomUp = (coins, amount) => {
  const print2DMatrix = (matrix) => {
    console.info('__'.repeat(20))
    for (let i = 0; i < matrix.length; i++) {
      console.info(matrix[i].join(' | '))
    }
    console.info('__'.repeat(20))
  }
  const dp = [...Array(coins.length)].map(() => Array(amount + 1).fill(0))

  // iterate through the coins and then for each amount compute the combination
  // base case is 0 ie: we can have only 1 way of getting to zero irrespective of the coins available to us
  for (let c = 0; c < coins.length; c++) {
    dp[c][0] = 1
  }

  // iterate through the coins
  for (let c = 0; c < coins.length; c++) {
    // iterate through the possible amounts to compute the ways it can be formed
    for (let a = 1; a <= amount; a++) {
      // take the coin
      const coin = coins[c]
      let count1 = 0
      let count2 = 0
      if (coin <= a) {
        if (dp[c][a - coin]) count1 = dp[c][a - coin]
      }
      // check if there is a way with previous coins
      if (c - 1 >= 0) {
        if (dp[c - 1][a]) count2 = dp[c - 1][a]
      }
      dp[c][a] = count1 + count2
    }
  }
  // print2DMatrix(dp)
  return dp[coins.length - 1][amount]

  // iterate through the coins
}
// Driver code
function main () {
  const coinsLists = [
    [7],
    [1, 2, 5],
    [10],
    [49, 233, 96, 132, 188],
    [310, 278, 99, 326, 5, 575, 569, 15, 141, 54],
    [2823, 4551, 1750, 49, 3256, 405, 380, 4785, 3893, 874],
    [17, 1422, 30, 1153, 1275],
    [1460],
    [9, 10, 11]
  ]

  const amounts = [
    9,
    5,
    10,
    225,
    350,
    3200,
    700,
    2000,
    0
  ]

  // You can uncomment the lines below and check how this top-down solution executes without a timeout

  coinsLists.push([
    1310, 3198, 2445, 4157, 2691, 1315, 2272, 1683, 2096, 317, 2288, 3914, 3758, 1114, 2137, 1087, 790, 1761, 3372, 4592, 2032, 3235, 4585, 868, 3556, 1124, 2899, 4714, 2833, 1792, 4832, 674, 4918,
    1829, 1020, 412, 633, 1771, 1989, 4977, 4976, 1937, 3999, 2660, 3484, 352, 2695, 65, 1073, 323, 3332, 4777, 2979, 3493, 3940, 350, 2791, 861, 4558, 1689, 421, 4988, 1040, 4931, 2090, 2727, 1433,
    301, 3883, 570, 1657, 820, 1746, 2642, 292, 3780, 3497, 3363, 2469, 2631, 1497, 4451, 1234, 2211, 4661, 1448, 4391, 310, 4878, 2213, 2497, 2626, 232, 2581, 2604, 688, 518, 2636, 2882, 1850
  ])
  amounts.push(5000)

  for (let i = 0; i < coinsLists.length; i++) {
    const numWays = countWays(coinsLists[i], amounts[i])
    console.log(i + 1 + '.\tCoins:', printList(coinsLists[i]), '\n\tAmount:', amounts[i], '\n\n\tNumber of Ways:', numWays)

    console.log('-'.repeat(100))
  }
}

function printList (lst) {
  output = '['
  let i = 0
  for (i = 0; i < lst.length - 1; i++) {
    output += lst[i] + ', '
  }
  output += lst[i] + ']'
  return output
}

main()
