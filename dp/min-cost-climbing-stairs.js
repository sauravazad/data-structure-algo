// https://leetcode.com/problems/min-cost-climbing-stairs/description/

/**
    You are given an integer array cost where cost[i] is the cost of ith step on a staircase. Once you pay the cost, you can either climb one or two steps.
    You can either start from the step with index 0, or the step with index 1.
    Return the minimum cost to reach the top of the floor.
*/


const minRecStairBottomUp = (cost, index, dp) => {
  // bottom up Dynamic programming as we are starting from bottom and solving to the top
  if(index >= cost.length) return 0
  if(dp[index]!== -1) {
    console.info('already solved for index=', index)
    return dp[index]
  }

  else {
    console.info('solving for index=', index)
    dp[index] = Math.min(
      cost[index]  + minRecStair(cost, index+ 1,  dp),
      cost[index]  + minRecStair(cost, index+ 2, dp),
    )
    return dp[index]
  }
  
}

const minRecStairTopDownRec = (cost, dp, stepIndex) => {
  // base case 
  // cost of index 0, 1 is zero as we can start on either of those in the beginning  
  // ie if we start from top of the stair and reach either 1 or 0 step we don't have to pay the cost
  if(stepIndex <=1) return 0
  if(dp[stepIndex] !== -1) return dp[stepIndex]
  // else find the minimum  of taking one Step or two step
  // ie : cost of the step we will land upon after either taking 1 or two step and solve the remainder
  const oneStep = cost[stepIndex -1] + minRecStairTopDownRec(cost,dp,  stepIndex -1)
  const twoStep = cost[stepIndex -2] + minRecStairTopDownRec(cost,dp, stepIndex -2)
  dp[stepIndex] = Math.min(oneStep, twoStep)
  return dp[stepIndex]
}

const minRecStairBottomUpTabular = (cost) => {
  // create an array of n dimension based on the number of variables that needs to be tracked
  const minCost = Array(cost.length + 1).fill(0)
  // we start from bottom and fill the cost for each step index with 1 or 2 step taken
  for(let i = 2 ; i < minCost.length; i++) {
      // we do not need to solve for 0 and 1 as we are allowed to start from index 0 or 1 without incurring any extra cost
      // ie cost incurred at the step = cost incurred until now on the index - step and cost to be incurred when taking the step
      const oneStep = minCost[i -1] + cost[i -1]
      const twoStep = minCost[i -2] + cost[i -2]
      minCost[i] = Math.min(oneStep, twoStep)
  }
  return minCost[cost.length]

}
/**
 * @param {number[]} cost
 * @return {number}
 */
const minCostClimbingStairs = function(cost) {
  const dp = Array(cost.length + 1).fill(-1)
  // return Math.min(minRecStair(cost, 0, dp), minRecStair(cost, 1, dp))
  // for the top down solution stepIndex = is the length of the costs as we want to reach the top array.length return 1 more as it is zero based
  // const minCost = minRecStairTopDownRec(cost, dp, cost.length)
  const minCost = minRecStairBottomUpTabular(cost)
  return minCost
    // We can memoize the problem to save the computation for visited paths
    // since there are Two options available on each steps we wil need a 2D matrix to store and track the value
  //  const dp = [...Array(cost.length)].map(() => Array(2).fill(0));
};

function main() {
	const costs = [
      [10,15,20],
      [1,100,1,1,1,100,1,1,100,1],
      [0,0,0,0],
      [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
    ]
	for (var i = 0; i < costs.length; ++i) {
		console.log(i + 1 + ". We have a cost per stair of " + costs[i] + " : find the minimum cost to reach the top of stair");
		console.log("-".repeat(30));
    const minCost = minCostClimbingStairs(costs[i])
    console.info('Cost is : ', minCost)
		console.log("-".repeat(100));
		console.log();
	}
}

main();
