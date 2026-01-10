/**
https://leetcode.com/problems/interleaving-string/
 */

const print2DMatrix = (matrix) => {
  const length = matrix[0].length -1
  console.info('_____'.repeat(length))
  for(let i = 0; i < matrix.length; i++) {
    console.info('| ' +matrix[i].join(" | ") + ' |')
  }
  console.info('-----'.repeat(length))
}
const isInterleaving = (s1, s2, t) => {
  const hashMap = new Map()
  const result = isInterleavingBottomUp(s1, s2, t, 0, 0, 0, hashMap)
  // console.info(hashMap)
  return result
}

const isInterleavingRec = (s1, s2, t, i1, i2, i, map) => {
  /**
   * Time Complexity = O(s1.length) * (s2.length)
   * Space Complexity = O(s1.length) * (s2.length)
   */

  /**
  Basic idea is to compare each character  from the target string to either of the strings ,
  if it matches then recursively call with incremented pointer for the target string
   */
  // base cases
  if(i1>= s1.length && i2 >= s2.length && i >= t.length) {
    // we have reach to the end of all the string that means we  found a match hence return true
    return true
  }
  if(i >= t.length) {
    // if we have reached the end of target string and not found a match return false
    return false
  }
  const hashKey = `(${i1},${i2},${i})`
  if(!map.has(hashKey)) {
    let s1result = false
    let s2result = false
    if(i1 < s1.length && s1[i1] === t[i]) {
      s1result = isInterleavingRec(s1, s2, t, i1 +1, i2, i+1, map)
    }
    if (i2 < s2.length && s2[i2] === t[i]) {
      s2result = isInterleavingRec(s1, s2, t, i1, i2+1, i+1, map)
    }
    // else  {
    //   // no match from either of the string hence we return false
    // }
    const result = s1result || s2result
    map.set(hashKey, result)
  }
  return map.get(hashKey)
}


const isInterleavingBottomUp = (s1, s2, t) => {
  const dp = [...Array(s1.length+1)].map(() => Array(s2.length+1).fill(false))
  // base case  if the length of s1 + s2 !== length of t return false

  if(s1.length + s2.length !== t.length) return false
  // Base case empty string is true for all the 3 strings
  dp[0][0] = true
  for(let i =0; i <= s1.length; i++) {
    for(let j = 0; j <= s2.length; j++) {
       // # If 's1' and 's2' are empty, then 's3' must have been empty too.
      if (i === 0 && j === 0) {
        dp[i][j] = true;
      }
      // check for only one string when other is empty
      // for s1 only ans s2 is empty
      else if(i ===0 && s2[j-1] === t[i+j -1]) {// string index start with zero hence -1
        dp[i][j] = dp[i][j-1]  // fill from previous column of the same row to retain the value
      }
      // for s2 only ans s1 is empty
      else if(j ===0 && s1[i-1] === t[i+j-1]) {
        dp[i][j] = dp[i-1][j]  // copy the value from previous row of the same column
      }

      else {
        // we have to fill non base cases
        // letter of s1 and t match take the matched value until i-1
        if(i > 0 && s1[i - 1] === t[i+j -1]) {
          dp[i][j] = dp[i - 1][j] // take previous row of the same column
        }
        // letter of s2 and t match take the matched value until j-1
        if(j >0 && s2[j-1] === t[i+j -1]) {
          dp[i][j] |= dp[i][j-1] // take previous column of the same row
        }
      }
    }
  }
  // print2DMatrix(dp)
  return dp[s1.length][s2.length] ? true: false

}

// Driver Code

function main() {
  let s1, s2, s3;
  s1 = ["ab", "abc", "abcdef", "", "xyz", "abcdefghijklmnopqrstuvwxyz"];
  s2 = ["ce", "def", "mnop", "", "abc", "abcdefghijklmnopqrstuvwxyz"];
  s3 = ["acbe", "abcccf", "mnaobcdepf", "", "abc", "abcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyz"];

  // You can uncomment the three lines below and check how this recursive solution causes a time-out
  s1.push("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");
  s2.push("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");
  s3.push("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");

  for (var i = 0; i < s1.length; i++) {
      console.log("Test Case #", i + 1);
      console.log("The strings are:\ns1 = '" + s1[i] + "'\ns2 = '" + s2[i] + "'\ns3 = '" + s3[i] + "'");
      console.log("Is s3 a product of interleaving s1 and s2?");
      console.log(isInterleaving(s1[i], s2[i], s3[i]));
      console.log("-".repeat(100), "\n");;
  }
}


main();