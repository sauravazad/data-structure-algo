/**
https://leetcode.com/problems/edit-distance/
*/
const minEditDist = (s1, s2) => {
  // const dp = [...Array(s1.length)].map(() => Array(s2.length).fill(-1))
  const dp = Array.from({ length: s1.length }, e => Array.from({ length: s2.length }, e => -1))
  const result = minEditDistRecBottomUp(s1, s2, 0, 0, dp)

  return result
}

const minEditDistRec = (s1, s2, index1, index2) => {
  /**
    Time complexity = O(3^N)
    Space complexity = O(N)
   */

  // base cases
  // if either of s1 or s2 is zero then return the other string as we need to insert those characters
  if (index1 >= s1.length) return s2.length - index2
  if (index2 >= s2.length) return s1.length - index1

  // if character at the index are equal we need to call the method by moving up the indexes
  if (s1[index1] === s2[index2]) {
    return minEditDistRec(s1, s2, index1 + 1, index2 + 1)
  } else {
    // we have three scenario to call recursively
    /**
      1. insert
      2. delete
      3. replace
     */
    const m1 = minEditDistRec(s1, s2, index1, index2 + 1) // insert
    const m2 = minEditDistRec(s1, s2, index1 + 1, index2) // delete
    const m3 = minEditDistRec(s1, s2, index1 + 1, index2 + 1) // replace
    return 1 + Math.min(m1, m2, m3)
  }
}

const minEditDistRecTopDown = (s1, s2, index1, index2, dp) => {
  if (index1 >= s1.length) return s2.length - index2
  if (index2 >= s2.length) return s1.length - index1

  // if the solution is not present in the dp matrix then calculate and fill
  if (dp[index1][index2] === -1) {
    let min = 0
    if (s1[index1] === s2[index2]) {
      min = minEditDistRecTopDown(s1, s2, index1 + 1, index2 + 1, dp)
      dp[index1][index2] = min
      return dp[index1][index2]
    } else {
      const m1 = minEditDistRecTopDown(s1, s2, index1, index2 + 1, dp) // insert
      const m2 = minEditDistRecTopDown(s1, s2, index1 + 1, index2, dp) // delete
      const m3 = minEditDistRecTopDown(s1, s2, index1 + 1, index2 + 1, dp) // replace
      min = 1 + Math.min(m1, m2, m3)
      dp[index1][index2] = min
    }
  }
  return dp[index1][index2]
}

const minEditDistRecBottomUp = (s1, s2) => {
  const dp = [...Array(s1.length + 1)].map(() => Array(s2.length + 1).fill(0))
  // base case  when the other string is smaller or empty
  dp[0][0] = 0
  // If second string is empty, only option is to
  // remove all characters of first string
  for (let i = 1; i <= s1.length; i++) {
    dp[i][0] = i // Min. operations = i
  }
  for (let j = 1; j <= s2.length; j++) {
    dp[0][j] = j // Min. operations = j
  }
  for (let i = 1; i <= s1.length; i++) {
    for (let j = 1; j <= s2.length; j++) {
      if (s1[i - 1] === s2[j - 1]) { // matches then fill zero
        dp[i][j] = 0 + dp[i - 1][j - 1] // take the previous value
      } else {
        const insert = dp[i][j - 1]
        const remove = dp[i - 1][j]
        const replace = dp[i - 1][j - 1]
        dp[i][j] = 1 + Math.min(insert, remove, replace)
      }
    }
  }
  return dp[s1.length][s2.length]
}

// Driver code
const main = function () {
  const input = [
    // ["sunday","saturday"],
    // ["sam","samson"],
    // ["110011010110001","1100101111110010"],
    ['cat', 'cut'],
    ['ball', 'baller']
  ]
  input.push(['iaetnxijfofxwnzfitssulvepiengehcaibfaorvraugndnurjfgixjljuibiaetnxijfofxwnzfitssulvepiengehcaibfaorvraugndnurjfgixjljuib', 'raetnsijfoyxwnzcitssolveppengeqcaibnaorveaugnvnurjmgixjljuibabcdraetnsijfoyxwnzcitssolveppengeqcaibnaorveaugnvnurjmgixjljuib'])
  /**
   *  Fill the time complexity for each function
   */

  for (let i = 0; i < input.length; i++) {
    console.log(i + 1 + '.\t Input array:', input[i])
    const result = minEditDist(input[i][0], input[i][1])
    console.log('\t Result is', result)
    console.log('-'.repeat(100))
  }
}

main()
