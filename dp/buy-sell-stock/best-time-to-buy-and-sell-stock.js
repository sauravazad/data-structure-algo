/**
https://leetcode.com/problems/best-time-to-buy-and-sell-stock/
 */

const maxProfit = (prices) => {
  // use
  const result = maxProfitRec(prices, 0)
  return result
}

const maxProfitRec = (prices, index) => {
  if (index >= prices.length) return 0 // we have exceeded the array bounds
}

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
