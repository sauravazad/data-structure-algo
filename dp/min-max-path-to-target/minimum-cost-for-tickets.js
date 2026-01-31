/**
https://leetcode.com/problems/minimum-cost-for-tickets/description/

You have planned some train traveling one year in advance. The days of the year in which you will travel are given as an integer array days. Each day is an integer from 1 to 365.

Train tickets are sold in three different ways:

    a 1-day pass is sold for costs[0] dollars,
    a 7-day pass is sold for costs[1] dollars, and
    a 30-day pass is sold for costs[2] dollars.

The passes allow that many days of consecutive travel.

    For example, if we get a 7-day pass on day 2, then we can travel for 7 days: 2, 3, 4, 5, 6, 7, and 8.

Return the minimum number of dollars you need to travel every day in the given list of days.
*/

const solve = (days, costs, dp, currentDay) => {
  /**
     Bottom-Up
     Time Complexity: O(K): K = last day we need to travel. becaues we have three recursive call for each day K*3 = K
     Space Complexity: O(K): DP array and max stack length is the last day
     */
  // base case when we have reach the end day
  if (currentDay > days[days.length - 1]) return 0 // since we have already travelled for all the required days

  // if we don notneed to travel on a given day move to the next day
  if (days.indexOf(currentDay) === -1) {
    // console.info(`Skipping day: ${currentDay} as it is not part of days: [${days}]`)
    return solve(days, costs, dp, currentDay + 1)
  }

  // chekc if the solution is already available for the day in DP array
  // console.info(`Solving for day : ${currentDay}`)
  if (dp[currentDay] !== -1) return dp[currentDay]

  // get the min of cost of each day pass and store in the dp array for the current date
  const oneDay = costs[0] + solve(days, costs, dp, currentDay + 1)
  const sevenDay = costs[1] + solve(days, costs, dp, currentDay + 7)
  const thirtyDay = costs[2] + solve(days, costs, dp, currentDay + 30)
  const minOnDay = Math.min(oneDay, sevenDay, thirtyDay)
  // console.info(`Min on day: ${currentDay}, [${oneDay},${sevenDay},${thirtyDay}]`)
  dp[currentDay] = minOnDay
  return dp[currentDay]
}

const solveTabBottomUp = (days, cost) => {
  /**
     Intution:  Follow the bottom up recursive solution to think how to build the condition
     1. DP: length of the array should be last day we need to travel
     2. iterate from day 1 to last day we need to travel
     3.  loop:
        - if the current day if less than then the day[i] ie: the day we do not need to travel then the cost is of the previous day
        else :
            compute the min(oneDay, seven day, thirty day
            dp[day -1] + cost[0])
            dp[Math.max(day -7), 0] + cost[0]) // the day is out of bound that means the cost to travel is already paid
            dp[Math.max(day -30, 0)] + cost[0])
     */
  const dp = Array(days[days.length - 1]).fill(0) /// /NOTE: do not fill with -1 as according to the condition we will never have answer for day 0 as we iterate from 1
  const lastDay = days[days.length - 1] // last day to travel
  let currentDayCostIndex = 0
  for (let day = 1; day <= lastDay; day++) {
    // we should check if we are within the base pass days then if we are not travelling on those days then the cost would be cost of the previous day
    // ie: if days = [2,6]
    // so to travel on day[1] : min cost would be pass cost for 1 day pass : day[0]
    // need to track the cost index corresponding to currentDay
    if (day < days[currentDayCostIndex]) {
      dp[day] = dp[day - 1]
    } else {
      currentDayCostIndex++ // else move the cost for the day index
      const oneDay = dp[day - 1] + cost[0] // cost of oneday before and cost of the 1 day
      const sevenDay = dp[Math.max(day - 7, 0)] + cost[1] // cost of oneday before and cost of the 1 day
      const thirtDay = dp[Math.max(day - 30, 0)] + cost[2] // cost of oneday before and cost of the 1 day
      dp[day] = Math.min(oneDay, sevenDay, thirtDay)
    }
  }
  console.info(dp)
  return dp[lastDay]
}
/**
 * @param {number[]} days
 * @param {number[]} costs
 * @return {number}
 */
const mincostTickets = function (days, costs) {
  console.info('Days:', days)
  console.info('Pass cost:', costs)
  /**
     Intution: We need buy tickets in such a way that we would be able to travel on any of the given dates
     the plan should cover all the days between the palnned days

     ie: the last day to travel would be the last element in the days array , since it is stated that the array is sorted and is in increasing order

     We need to apporach the problem by breaking it down in small problems : ie solve in the break of the days ie: 1,7,30 : similar to coin change problem
     but here the cost is specified
     */
  // build an dp array for memoization to store the value for the minimum cost of given day: think what would be the max number of days you need to travel
  const dp = Array(days[days.length - 1] + 1).fill(-1)
  // const result = solve(days, costs, dp, 1)
  const result = solveTabBottomUp(days, costs, dp, 1)
  return result
}

// Driver code
const main = function () {
  const fn = mincostTickets
  const input = [
    [[1, 4, 6, 7, 8, 20], [2, 7, 15]],
    [[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 30, 31], [2, 7, 15]]
  ]
  const expectedAns = [11, 17]
  /**
   *  Fill the time complexity for each function
   */

  for (let i = 0; i < input.length; i++) {
    console.log(i + 1 + '.\t Input array: \t', input[i])
    const result = fn(...input[i])
    console.log('\t Result is \t: ', result)
    console.log('-'.repeat(100))
  }
}

main()
