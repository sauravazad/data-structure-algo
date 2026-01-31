/**
https://leetcode.com/problems/palindrome-partitioning/
 */

const minCuts = (str) => {
  const result = minCutsRec(str, 0, str.length - 1)
  return result
}

function isPalindrome (s, i, j) {
  while (i < j) {
    if (s.charAt(i) != s.charAt(j)) return false
    i += 1
    j -= 1
  }
  return true
}

const minCutsRec = (s, i, j) => {
  // Base case
  if (i == j || isPalindrome(s, i, j)) return 0

  // Variable to store the minimum number of cuts per iteration
  let result = j - i + 1

  // Loop to place a cut after each index
  for (let k = i; k < j; k++) {
    const totalCuts = 1 + minCutsRec(s, i, k) + minCutsRec(s, k + 1, j)
    result = Math.min(result, totalCuts)
  }

  // Return the minimum number of cuts
  return result
}

// Driver code
function main () {
  inputs = ['radar', 'abac', 'book', 'sleek', 'fours']

  // You can uncomment the lines below and check how this recursive solution causes a time-out
  // inputs.push("elwxubtrnarrrjguuqwwoopgwjaaeavczrdubcgfvnxeutcatt");

  for (let i = 0; i < inputs.length; i++) {
    console.log(i + 1 + '.\tInput string:', inputs[i], '\n\n\tThe minimum number of cuts are:', minCuts(inputs[i]))
    console.log('-'.repeat(100))
  }
}

main()
