/**
https://leetcode.com/problems/best-time-to-buy-and-sell-stock/
 */

var maxProfit = function (prices) {
  let minprice = Number.MAX_VALUE;
  let maxprofit = 0;
  for (let i = 0; i < prices.length; i++) {
      if (prices[i] < minprice) minprice = prices[i];
      else if (prices[i] - minprice > maxprofit)
          maxprofit = prices[i] - minprice;
  }
  return maxprofit;
};
// Driver code
const main = function () {
  const input = [
    [7, 1, 5, 3, 6, 4],
    [7, 6, 4, 3, 1]
  ]
  /**
   *  Fill the time complexity for each function
   */

  for (let i = 0; i < input.length; i++) {
    console.log(i + 1 + '.\t Input array:', input[i])
    const result = maxProfit(input[i])
    console.log('\t Result is', result)
    console.log('-'.repeat(100))
  }
}

main()
