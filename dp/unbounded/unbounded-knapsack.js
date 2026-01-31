/**
Suppose you have a list of weights and corresponding values for n
items. Each item will have a weight and a certain value associated with it.
You have a knapsack that can carry items up to a specific maximum weight, known as the capacity of the knapsack.

You want to maximize the sum of values of the items in your knapsack while ensuring that the sum of the weights of the items
remains less than or equal to the knapsack’s capacity. If all the combinations exceed the given knapsack’s capacity, return 0

*/

/**
 * @param {Array} weights : weights array
 * @param {Array} values  : values array
 * @param {Number} n      : number of items
 * @param {Number} capacity : capacity of the knapsack
 */
function unboundedKnapsack (weights, values, n, capacity) {
  const items = []
  const memo = [...Array(n + 1)].map(() => Array(capacity + 1).fill(-1))
  // const result = unboundedKnapsackRecRev(weights, values, n, capacity, 0, 0);
  // const result = unboundedKnapsackRec2D(weights, values, n, capacity, memo);
  const result = unboundedKnapsack2DBottomUp(weights, values, n, capacity, memo)
  // print2DMatrix(memo);
  return result
}

const print2DMatrix = (matrix) => {
  console.info('__'.repeat(20))
  for (let i = 0; i < matrix.length; i++) {
    console.info(matrix[i].join(' | '))
  }
  console.info('__'.repeat(20))
}
// recursively pick an item and reduce it from knapsack capacity check if the we are under capacity
function unboundedKnapsackRecRev (weights, values, n, capacity) {
  // console.info(`Index: ${n} and capacity is ${capacity}`)
  if (n === 0 || capacity === 0) {
    const value = 0
    console.info(`value is when n = ${n} capacity = ${capacity}`, value)
    return value
  }
  if (weights[n - 1] <= capacity) {
    // [NOTE:]: include the current element but do not increase the index as there is no limit on number of times an item can be taken or  skip the element
    // include the item but do not update the index as it can be taken multiple times
    const taken = values[n - 1] + unboundedKnapsackRecRev(weights, values, n, capacity - weights[n - 1])
    const notTaken = unboundedKnapsackRecRev(weights, values, n - 1, capacity)
    return Math.max(taken, notTaken)
  } else {
    return unboundedKnapsackRecRev(weights, values, n - 1, capacity)
  }
}

// recursively add an item and check if the we are under capacity
function unboundedKnapsackRec (weights, values, n, capacity, index, sum) {
  // console.info(`Index: ${n} and capacity is ${capacity}`)
  if (n === index || sum >= capacity) {
    return 0
  }
  if (weights[index] <= capacity - sum) {
    // include the item but do not update the index as it can be taken multiple times
    const taken = values[index] + unboundedKnapsackRec(weights, values, n, capacity, index, sum + weights[index])
    const notTaken = unboundedKnapsackRec(weights, values, n, capacity, index + 1, sum)
    return Math.max(taken, notTaken)
  } else {
    return unboundedKnapsackRec(weights, values, n, capacity, index + 1, sum)
  }
}

/**
 *
  TOP down approach using memoization by storing the computation in an array
 */
function unboundedKnapsackRec2D (weights, values, n, capacity, memo) {
  // base case when the n ie: index = 0 as we are moving from last element to first
  if (n === 0 || capacity === 0) {
    const value = 0 // Math.floor(capacity / weights[0]) * values[0]; the formula returns the value of the item included repeatedly
    console.info(`value is when n = ${n} capacity = ${capacity}`, value)
    return value
  }
  if (memo[n][capacity] !== -1) {
    return memo[n][capacity]
  }
  // check if the element is under capacity, else skip the element
  if (weights[n - 1] <= capacity) {
    // include or exclude
    const include = values[n - 1] + unboundedKnapsackRec2D(weights, values, n, capacity - weights[n - 1], memo)
    const doNotInclude = 0 + unboundedKnapsackRec2D(weights, values, n - 1, capacity, memo)
    memo[n][capacity] = Math.max(include, doNotInclude)
    return memo[n][capacity]
  } else {
    memo[n][capacity] = unboundedKnapsackRec2D(weights, values, n - 1, capacity, memo)
    return memo[n][capacity]
  }
}

function unboundedKnapsack2DBottomUp (weights, values, n, capacity, memo) {
  /* base case
    j represent columns ie: capacity
    i represent rows ie: items in the knapsack
    when capacity is zero ie: j = 0 then all the values on memo[0][i] = 0 as we cannot fill any item
    when capacity is j ie: j > 0 for i = 0 ie:  the item can be picked and filled  multiple times till the w[0] * (n times) <= capacity (j)
    can be stated as capacity /weight[i] * value[i] ie: j / weight[i] * value [i]
  */
  // all element are initialized with zero hence first base case is covered
  for (let c = 0; c < memo[0].length; c++) {
    memo[0][c] = (c / weights[0]) * values[0]
  }

  for (let i = 1; i < memo.length; i++) {
    for (let c = 0; c <= capacity; c++) {
      /* check if the current weight is less then current capacity
      if yes
        then we have two option
          include
          not to include
      else
        fill the last value
      */
      if (weights[i] <= c) {
        const include = values[i] + memo[i][c - weights[i]]
        const notIncluded = 0 + memo[i - 1][c]
        memo[i][c] = Math.max(include, notIncluded)
      } else {
        memo[i][c] = memo[i - 1][c]
      }
    }
  }
  return memo[n - 1][capacity]
}
// Driver code
function main () {
  const weights = [[1, 2], [2, 4, 6], [1, 2, 3, 5], [4], [2], [3, 6, 10, 7, 2], [3, 6, 10, 7, 2, 12, 15, 10, 13, 20]]
  const values = [[10, 20], [5, 11, 13], [1, 5, 4, 8], [2], [3], [12, 10, 15, 17, 13], [12, 10, 15, 17, 13, 12, 30, 15, 18, 20]]
  const capacity = [5, 10, 6, 3, 3, 10, 20]
  const n = [2, 3, 4, 1, 1, 5, 10]

  // You can uncomment the lines below and check how this recursive solution causes a time-out

  weights.push([2943, 4199, 9482, 2544, 9001, 2445, 7315, 5767, 8748, 6675, 8191, 306, 5626, 608, 1099, 1755, 1174, 7235, 5849, 6472, 2125, 5595, 7152, 2845, 5830, 8753, 7720, 5027, 6053, 310, 3754, 3351, 3873, 8223, 2805, 3677, 751, 2638, 2887, 7324, 7094, 557, 1903, 230, 2007, 7080, 8215, 8018, 1171, 760, 9125, 1609, 7758, 2467, 7977, 5906, 3947, 2205, 4043, 4030, 1241, 6184, 9265, 3368, 2968, 1830, 5474, 8253, 8526, 2702, 5599, 9224, 5888, 5802, 855, 4829, 7883, 4993, 6348, 4931, 7023, 6971, 7288, 1953, 501, 5384, 7127, 2475, 8168, 1843, 809, 2113, 1257, 6754, 2778, 7139, 8052, 755, 2826, 8641, 6339])
  values.push([2325, 3611, 7090, 4909, 3134, 9212, 6052, 1970, 7965, 3274, 362, 22, 6459, 5211, 7638, 4329, 1387, 3735, 6458, 393, 3674, 2663, 2666, 1711, 5705, 7294, 2010, 4846, 572, 2169, 803, 6650, 3709, 423, 8519, 2904, 5340, 8299, 4559, 8764, 4368, 1210, 1885, 481, 5993, 3076, 5188, 399, 3273, 4158, 9934, 1951, 51, 8861, 4858, 9157, 395, 1463, 8179, 3265, 1922, 933, 6539, 2681, 485, 2754, 1653, 9199, 5016, 9621, 4616, 6114, 1061, 5278, 4875, 9788, 2352, 558, 1829, 7875, 9644, 1747, 684, 394, 3823, 2315, 2219, 8637, 7652, 6341, 5236, 1014, 1799, 702, 7261, 6283, 6205, 4901, 3866, 1116, 6156])
  capacity.push(10000)
  n.push(100)

  for (let i = 0; i < n.length; ++i) {
    console.log(i + 1 + '. We have a knapsack of capacity ' + capacity[i] + ' and we are given the following list of item values and weights:')
    console.log('-'.repeat(30))
    console.log('Weights   |     Values')
    console.log('-'.repeat(30))
    for (let j = 0; j < values[i].length; ++j) console.log(weights[i][j].toString().padEnd(9), '|    ', values[i][j].toString())
    const result = unboundedKnapsack(weights[i], values[i], n[i], capacity[i])
    console.log('\nThe maximum we can earn is: ' + result)
    console.log('-'.repeat(100))
    console.log()
  }
}

main()
