/**
https://leetcode.com/problems/word-break/

Given a string s and a dictionary of strings wordDict, return true if s can be segmented into a space-separated sequence of one or more dictionary words.
Note that the same word in the dictionary may be reused multiple times in the segmentation.
*/

const wordBreak = (s, wordDict) => {
  let dp = new Array(s.length +1).fill(-1)
  if(s.length === 0) return []
  const result = wordBreakBottomUp(s, wordDict)
  return result
}

const wordBreakRec = (str, words, index, dp) => {
  if(index === str.length) return true // we have reach to the end of the string hence return true
  if(dp[index] === -1) {
    let result = false
    for (let i = 0 ; i < words.length; i++) {
      const word = words[i]
      const endIndex = index + word.length
      const prefix = str.slice(index, endIndex)
      // console.log(`i: ${index} Prefix : ${prefix} , word: ${word} `)
      if(prefix === word) {
        //[NOTE] or is a short circuit operator , hence it will lead to stopping of recursion as soon as first true cases is encountered
        result ||= wordBreakRec(str, words, endIndex, dp)
      }
    }
    dp[index] = result
  }

  return dp[index]
}

const wordBreakBottomUp = (str, words) => {
  const dp = new Array(str.length + 1).fill(false)
  // idea start from the end of string and try to match each word from the prefix at that point
  dp[str.length] = true // if we have reached to the end of string that means we can break the word

  for(let i = str.length; i >=0; i--) {
    // iterate through each word , compute the suffix and compare with word for equality
    let result = false
    for(let j = 0; j < words.length; j++) {
      const word = words[j]
      const endIndex = i + word.length
      if(endIndex <= str.length) {
        const suffix = str.substring(i, endIndex)
        if(suffix === word) {
          // console.log(`i: ${i} suffix : ${suffix} , word: ${word}, endIndex: ${endIndex} `, dp[endIndex])
          result = dp[endIndex]
          dp[i] = result
        }
      }
      if(dp[i] === true) break
    }
  }
  // console.log(dp)
  return dp[0]
}
function printList(lst){
    output = "["
    var i = 0
    for (i = 0; i < lst.length - 1; i++){
        output += lst[i] + ", "
    }
    output += lst[i] + "]"
    return output
}

var main = function () {
  // let s = ['leetcode', "neetcode", "neetcodes"]
  // let wordDict = [
  //   "leet", "code", "neet"
  // ]
let s = ['leetcode', "neetcode", "neetcodes", "vegancookbook", "catsanddog", "highwaycrash",
      "screamicecream", "educativecourse"];
  let wordDict = ["leet", "code", "neet", 'v', 'vegan', 'cookbook', 'vegancookbook', 'veg', 'gan', 'eg', 'eganc', 'ookboo',
      'kc', 'ats', 'an', 'ddog', 'ddogh', 'cookb', 'cook', 'b', 'anco', 'ancoo', 'ook', 'book',
      'kbook', 'kbookc', 'books', 'cats', 'cat', 'and', 'andd', 'sand', 'sanddoghigh', 'catsanddog',
      'doghigh', 'sandd', 'og', 'dog', 'hi', 'gh', 'ghway', 'ghw', 'ayc', 'rash', 'ra', 'sh', 'highways',
      'highway', 'high', 'doghigh', 'way', 'cra', 'c', 'waycrash', 'crash', 'crashp', 'crashpineapple',
      'vegancookbookcats', 'anddoghighwaycrashpineapplepenapplescrea', 'anddoghighwaycrashpineapplepenapple',
      'vegancookbookcatsanddog', 'vegancookbookcatsanddoghighway', 'catsanddoghighway', 'crashpineapplepenapplescrea',
      'crashpineapplepenapple', 'applepenapple', 'pineapplepenapplescre', 'pineapplepenapple', 'a', 'crashpine', 'inea',
      'app', 'pena', 'en', 'ine', 'plep', 'pe', 'na', 'napplesc', 'ena', 'ple', 'le', 'penap', 'lepe', 'ppl', 'pples', 'pple',
      'pine', 'pin', 'nap', 'napp', 'eapple', 'apple', 'apples', 'pen', 'penapple', 'penapples', 'vegancookbookcatsanddoghighway',
      'vegancookbookcatsanddoghighwaycrashpineapplepenapplescrea', 'vegancookbookcatsanddoghighwaycrashpineapplepenapplescream'];

  // You can uncomment the line below and check how this recursive solution causes a time-out.
  s.push("vegancookbookcatsanddoghighwaycrashpineapplepenapplescream");

  console.log("The list of words we can use to break down the strings are: \n\n" + printList(wordDict));
  console.log("-".repeat(100));

  for (let i = 0; i < s.length; i++) {
      console.log(
          `Test Case #${i + 1}`,
          `\n\nIs it possible to form sentence for the string ${s[i]}:`
      );
      console.log("\n" +wordBreak(s[i], wordDict));
      console.log("-".repeat(100));
  }
}

main();