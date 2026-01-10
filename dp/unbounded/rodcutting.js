/**
You are given a rod of length n meters. You can cut the rod into smaller pieces, and each piece has a price based on its length. Your task is to earn the maximum revenue that can be obtained by cutting up the rod into smaller pieces.

Let’s say you have a rod of length  4 meters and you have two lists:
  -  one that defines the lengths,
  -  the other that defines the price of each length.
  length = [1,3,4]
  prices = [2,7,8]

  You can cut the rod into the pieces of varying lengths and earn the following revenues:

  - Four pieces of length 1 meters  = 2+2+2+2 = 8
  - One piece of length 1 and another piece of length 3  = 2 + 7 = 11
  - One single piece of length 4 = 8
Therefore, the maximum revenue you can generate by cutting the rod and selling the pieces is 9, by cutting the rod into two pieces
One piece of length 1 and another piece of length 3

Constraints:
- 1<= n <= 5000
- 1 <= prices[i] <= 10^6
- 1 < lengths[i] <= n
prices.length = lengths.length

Examples

Sl No.	N	    lengths	            prices	               Revenue
  1	    4	  [1, 2, 3, 4]  	    [2, 3, 7, 8]	            9
  2	    6	  [1, 2, 3, 4, 5, 6]	[2, 5, 8, 9, 10, 11]	    16
  3	    5	  [1, 2, 3, 4, 5]	    [2, 6, 7, 10, 13]	        14

 */

function rodCutting (lengths, prices, rodLength) {
  const dp = [...Array(lengths.length)].map(() => Array(rodLength+1).fill(-1))
  // const result = rodCuttingRec(lengths, prices, rodLength, 0)
  const print2DMatrix = (matrix) => {
    console.info('__'.repeat(20))
    for(let i = 0; i < matrix.length; i++) {
      console.info(matrix[i].join(" | "))
    }
    console.info('__'.repeat(20))
  }
  // const result = rodCuttingRecMemo(lengths, prices, rodLength, 0, dp)
  const result = rodCuttingBottomUp(lengths, prices, rodLength)
  // print2DMatrix(dp)
  return result
}



function rodCuttingRec (lengths, prices, rodLength, index) {
  if(rodLength === 0 || index === lengths.length) {
    return 0
  }
  let taken = -1
  // cue the rod only if the current piece length <= rodLength
  if(lengths[index] <= rodLength) {
    // do not increase the index as we can cut the rod with same pieces again
    taken = prices[index] + rodCuttingRec(lengths, prices, rodLength - lengths[index], index)
  }

  const notTaken = rodCuttingRec(lengths, prices, rodLength , index + 1)
  return Math.max(taken, notTaken)
}

function rodCuttingRecMemo (lengths, prices, rodLength, index, dp) {

  if(rodLength === 0 || index === lengths.length) {
    return 0
  }
  if(dp[index][rodLength] === -1) {
    let taken = -1
    // cue the rod only if the current piece length <= rodLength
    if(lengths[index] <= rodLength) {
      // do not increase the index as we can cut the rod with same pieces again
      taken = prices[index] + rodCuttingRecMemo(lengths, prices, rodLength - lengths[index], index, dp)
    }

    const notTaken = rodCuttingRecMemo(lengths, prices, rodLength , index + 1, dp)
    dp[index][rodLength] = Math.max(taken, notTaken)
  }

  return dp[index][rodLength]
}


function rodCuttingBottomUp (lengths, prices, totalRodLength) {
  //  build a 2D Array where number of columns == rodLength + 1 and number of row = number of pieces in Array
  // but the base case should be zero as if we do not cut the rod we do not earn anything
  const dp = [...Array(prices.length)].map(() => Array(totalRodLength+1).fill(0))

  for(let i = 0 ; i < lengths.length; i++) {
    for (let rodLength = 1; rodLength < totalRodLength + 1; rodLength++ ) {
      // take the current length and remaining  length from  dp
      // Fetch the maximum revenue obtained by selling the rod
      // of size rodLength - lengths[curr]
      let included = -1
      let notIncluded = -1
      if(lengths[i] <= rodLength) {
        included = prices[i] + dp[i] [rodLength - lengths[i]]
      }

      // Fetch the maximum revenue without cutting the rod
      if(i > 0) {
        notIncluded = dp[i-1] [rodLength]
      }

      dp[i][rodLength] = Math.max(included, notIncluded)
    }
  }

  const maxRevenue = dp[prices.length - 1][totalRodLength]
  return maxRevenue

}
// Driver code
function main() {
  let n = [3, 4, 8, 4, 6],
      lengths = [
          [1, 2, 3],
          [2, 3, 4],
          [2, 1],
          [4, 3, 2, 1],
          [1, 2, 5, 4, 6],
      ],
      prices = [
          [7, 3, 8],
          [2, 7, 8],
          [20, 10],
          [1, 1, 1, 6],
          [2, 8, 9, 10, 11],
      ];

  // You can uncomment the lines below and check how this recursive solution causes a time-out

  n.push(100);
  lengths.push([...Array(100).keys()].map((x) => x + 1));
  prices.push([...Array(200).keys()].map((x) => x + 1).filter((x) => x % 2 === 1));

  for (let i = 0; i < n.length; i++) {
      console.log(`${i + 1}.\trod length: `, n[i]);
      console.log("\tlengths: [" + lengths[i].join(", ") + "]");
      console.log("\tprices: [" + prices[i].join(", ") + "]");
      const result = rodCutting(lengths[i], prices[i], n[i]);
      console.log("\tThe maximum profit found: ", result);
      console.log("-".repeat(100));
  }
}

main();