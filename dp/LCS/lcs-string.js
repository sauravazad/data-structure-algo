/**
Given two strings s1 and s2, you have to find the length of the Longest Common Substring (LCS) in both these strings.

Let’s say we have two strings,
“helloworld” and “yelloword”,
there are multiple common substrings, such as “llo”, “ello”, “ellowor”, “low”, and “d”. The longest common substring is “ellowor”, with length 7.
 */


const lcsLength  = (str1, str2) => {
  const  hash = new Map()
  // const result =  lcsLengthRecMemo(str1, str2, 0, 0, 0, hash)
  const result =  lcsLengthBottomUP(str1, str2, 0, 0, 0, hash)
  // const result =  lcsLengthRec(str1, str2, 0, 0, 0, hash)
  // console.info(hash)
  return result
}

const lcsLengthRec = (string1, string2, index1, index2, count) => {
  if(index1 >= string1.length || index2 >= string2.length) {
    return count
  }
  // There are three scenarios
  /**
    1. element at current index matches , ie: str1[index1] === str2[index2] , then increase the counter and move to next index
    It does not matches then there can be two scenarios
    2. str1[index1] might match with any other character in str2
    2. str2[index2] might match with any other character in str1
   */
  let matchCount = count
  if(string1[index1] === string2[index2]) {

    matchCount = lcsLengthRec(string1, string2, index1+1, index2 +1, count + 1)
  }
  // increment the index for string2
  const lCount = lcsLengthRec(string1, string2, index1 + 1, index2, 0)
  // increment the index for string1
  const rCount = lcsLengthRec(string1, string2, index1, index2 + 1, 0)
  return Math.max(matchCount, Math.max(lCount, rCount))
}

const lcsLengthRecMemo = (s1, s2, index1, index2, count, hash) => {
  /**
   * Time Complexity = O(mn2)
   * Space Complexity = O(mn2)
   */
  if(index1 >= s1.length || index2 >= s2.length) return count
  const hashKey = `${index1}${index2}${count}`
  if(!hash.has(hashKey)) {
    let match = count
    if(s1[index1] === s2[index2]) {
      match = lcsLengthRecMemo(s1, s2, index1 + 1, index2 + 1, count + 1, hash)
    }
    const left = lcsLengthRecMemo(s1, s2, index1 + 1, index2, 0, hash)
    const right = lcsLengthRecMemo(s1, s2, index1, index2 + 1, 0, hash)
    hash.set(hashKey, Math.max(match, left, right))
  }
  return hash.get(hashKey)
}


const lcsLengthBottomUP = (s1, s2) => {
  const dp = [...Array(s1.length + 1)].map(() => Array(s2.length+1).fill(0))

  let maxLen = 0
  for(let i = 1; i <= s1.length ; i++) {
    for(let j =1; j <= s2.length; j++) {
      // string array start with zero not 1
      // if characters are same then fill the dp matrix
      if(s1[i-1] === s2[j-1]) {
        dp[i][j] = dp[i -1][j-1] + 1
        maxLen = Math.max(maxLen, dp[i][j])
      } else {
        // since this is a string we cannot include the character if it does not matches
        dp[i][j] = 0
      }
    }
  }
  return maxLen
}

// Driver code
function main() {
  var s1 = ["hel","educative", "bcdcdcd", "arefun", "yourocks", "abc"];
  var s2 = ["elf", "education", "aacdcdcd", "isfun", "youawesome", "def"];

  // You can uncomment the lines below and check how this recursive solution causes a time-out
  s1.push("ypzrvyigwdiqrnbglvviozqzruvmwivgvqvrfhqi");
  s2.push("wdiqrnbglvviozqzruvmwivgvqvrfhqiypzrvyigwdiqrn");

  for (var i = 0; i <s1.length; i++) {
      console.log(i + 1 + ".\tInput string 1: \"" + s1[i] + "\"");
      console.log("\tInput string 2: \"" + s2[i] + "\"");
      console.log("\n\tThe Length of Longest Common Substring is: " + lcsLength(s1[i], s2[i]));
      console.log("-".repeat(100));
  }
}

main();