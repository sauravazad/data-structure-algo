// https://leetcode.com/problems/buy-two-chocolates/
/**
 * @param {number[]} prices
 * @param {number} money
 * @return {number}
 */
// brute force Time complexity N^2
var buyChoco = function(prices, money) {
  let min = Infinity

  for(let i = 0  ; i < prices.length ; i++) {
    for(let j = i + 1; j < prices.length; j++) {
      const cost =  prices[i] + prices[j]  
      // console.info(`pick(${prices[i]}, ${prices[j]} )`)
      if(cost < min) min = cost
    }
  }
   if(min <= money) {
    return money - min
   } else  {
    return money
   }
};

var buyChocoGreedy = (prices, money) => {
  // Intuition: we have buy two items with the minimum amount, 
  // So if we pick the two cheapest chocolates and if we can buy it using the provided money that would be the min
  
  // sort the prices in increasing order
  prices.sort((a,b) => a-b)
  // min cost
  const minCost = prices[0] + prices[1]
  if(minCost <= money) return money - minCost
  else return money
}

// Driver code
var main = function () {
  const fn = buyChocoGreedy
  const input = [
    [[1,2,2], 3],
    [[3,2,3], 3],
    [[98,54,6,34,66,63,52,39], 62]
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