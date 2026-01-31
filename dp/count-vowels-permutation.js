// https://leetcode.com/problems/count-vowels-permutation/

const MOD = 10 ** 9 + 7
const countVowelPermutation = function (n) {
  const a = 0; const e = 1; const i = 2; const o = 3; const u = 4
  let vowelsCount = Array(5).fill(1) // base case

  // for n > 1

  for (let j = 2; j <= n; j++) {
    dp = Array(5).fill(0)
    dp[a] = addVModulo(dp[a], vowelsCount[e])
    dp[e] = addVModulo(dp[e], vowelsCount[a], vowelsCount[i])
    dp[i] = addVModulo(dp[i], vowelsCount[a], vowelsCount[e], vowelsCount[o], vowelsCount[u])
    dp[o] = addVModulo(dp[o], vowelsCount[i], vowelsCount[u])
    dp[u] = addVModulo(dp[u], vowelsCount[a])
    vowelsCount = dp
  }

  return addVModulo(...vowelsCount)
}

const addVModulo = (...arr) => {
  let sum = 0
  for (const e of arr) {
    sum += e
    sum %= MOD
  }
  return sum
}
// Driver code
const main = function () {
  const fn = countVowelPermutation
  const input = [1, 2, 5]
  const output = [5, 10, 68]
  /**
   *  Fill the time complexity for each function
   */

  for (let i = 0; i < input.length; i++) {
    console.log(i + 1 + '.\t Input array: \t', input[i])
    const result = fn(input[i])
    console.log('\t Result is \t: ', result)
    console.log('-'.repeat(100))
  }
}

main()
