/**
Calculate nth fibonacci number
 */

const fibonacciRec = (n, hash) => {
  if (n < 2) return n
  if (hash.has(n)) hash.get(n)
  const ans = fibonacci(n - 1) + fibonacci(n - 2)
  hash.set(n, ans)
  return ans
}

const fibonacciBottomUp = (n) => {
  const memo = Array(n + 1)
  // base cases
  memo[0] = 0
  memo[1] = 1
  for (let i = 2; i <= n; i++) {
    memo[i] = memo[i - 1] + memo[i - 2]
  }
  return memo[n]
}

const fibonacciBottomUpSpace = (n) => {
  // base cases
  let first = 0
  let second = 1
  for (let i = 2; i <= n; i++) {
    const temp = second
    second = second + first
    first = temp
  }
  return second
}

const fibonacci = (n) => {
  const hash = new Map()

  return fibonacciBottomUpSpace(n, hash)
}

// Driver code
const main = function () {
  const input = [0, 5, 7, 10, 14]
  /**
   *  Fill the time complexity for each function
   */

  for (let i = 0; i < input.length; i++) {
    console.log(i + 1 + '.\t Input array:', input[i])
    const result = fibonacci(input[i])
    console.log('\t Result is', result)
    console.log('-'.repeat(100))
  }
}

main()
