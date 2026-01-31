// https://www.educative.io/courses/grokking-dynamic-programming-a-deep-dive-using-javascript/qVnKQNYoL6y

function printList (lst) {
  output = '['
  let i = 0
  for (i = 0; i < lst.length - 1; i++) {
    output += lst[i] + ', '
  }
  output += lst[i] + ']'
  return output
}

const minFee = (fees) => {
  // hps available are 1,2,3
  return minFeeRecursive(fees, 0)
}

const minFeeRecursive = (fees, index) => {
  if (index >= fees.length) return 0

  const step1 = (fees[index] || 0) + minFeeRecursive(fees, index + 1)
  const step2 = (fees[index + 1] || 0) + minFeeRecursive(fees, index + 2)
  const step3 = (fees[index + 2] || 0) + minFeeRecursive(fees, index + 3)

  return Math.min(step1, step2, step3)
}

const minFeeBottomUp = (fees) => {
  const dp = Array(fees.length + 1).fill(0)
  dp[0] = 0
  dp[1] = fees[0] // min would be always taking the fee for first step among three steps
  dp[2] = fees[0]
  for (let i = 3; i < fees.length; i++) {
    const one = fees[i - 1] + dp[i - 1]
    const two = fees[i - 2] + dp[i - 2]
    const three = fees[i - 3] + dp[i - 3]
    dp[i] = min(one, two, three)
  }
  return dp[fees.length]
}
// Driver code
const main = function () {
  const inputs = [
    [1, 2, 5, 2, 1, 2],
    [2, 3, 4, 5],
    [1, 100, 1, 1, 1, 100, 1, 1, 100, 1],
    [10, 15, 20],
    [0, 1, 2, 3, 4, 5, 6, 7, 8]
  ]

  // You can uncomment the lines below and check how this recursive solution causes a time-out
  //  inputs.push([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15,
  //               16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28,
  //               29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41,
  //               42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54,
  //               55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67,
  //               68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80,
  //               81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93,
  //               94, 95, 96, 97, 98, 99]);

  for (let i = 0; i < inputs.length; i++) {
    console.log(i + 1 + '.\tSteps:', inputs[i].length, '\n\tFee:', printList(inputs[i]), '\n\n\tMinimum fee:', minFee(inputs[i], inputs[i].length))

    console.log('-'.repeat(100))
  }
}

main()
