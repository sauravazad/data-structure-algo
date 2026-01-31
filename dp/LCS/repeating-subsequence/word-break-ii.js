/**
https://leetcode.com/problems/word-break-ii/
Given a string s and a dictionary of strings wordDict, add spaces in s to construct a sentence where each word is a valid dictionary word. Return all such possible sentences in any order.

Note that the same word in the dictionary may be reused multiple times in the segmentation.
Input: s = "catsanddog", wordDict = ["cat","cats","and","sand","dog"]
Output: ["cats and dog","cat sand dog"]
 */
const wordBreak = (s, wordDict) => {
  const dp = new Map()
  // const result = wordTopDown(s, wordDict, dp)
  const result = wordBottomUp(s, wordDict)
  // console.info(dp)
  return result
}

const wordBreakRec = (str, words) => {
  // if the length of the str is zero that means we have no string to match return empty array
  // base case
  if (str.length === 0) return []
  const result = []
  // iterate through all the words and if a match is found  recursively call by reducing the str
  for (let i = 0; i < words.length; i++) {
    const word = words[i]
    const prefix = str.slice(0, word.length)
    // console.info(`${str} word: ${word} , prefix: ${prefix}`)
    if (word === str) {
      // base case for when the last word is itself the string
      result.push(word)
    } else if (word === prefix) {
      // call recursively
      const res = wordBreakRec(str.slice(word.length), words)
      res.forEach((_res) => {
        result.push(`${word} ${_res}`)
      })
    }
  }
  return result
}

const wordTopDown = (str, words, dp) => {
  // base case , when the str is empty
  if (str.length === 0) return []
  if (dp.has(str) === false) {
    const result = []
    for (const word of words) {
      const prefix = str.slice(0, word.length)
      if (word === str) {
        result.push(word)
      } else if (prefix === word) {
        const res = wordTopDown(str.slice(word.length), words, dp)
        res.forEach((_res) => {
          result.push(`${word} ${_res}`)
        })
      }
    }
    dp.set(str, result)
  }
  return dp.get(str) || []
}

const wordBottomUp = (str, words) => {
  const dp = [...Array(str.length + 1)].map(() => [])
  // const dp = Array(str.length + 1).fill(Array(0)) DO not use fill as it shares the reference for the same array
  // Setting base case
  dp[0] = ['']
  console.info(dp)
  for (let i = 1; i < str.length + 1; i++) {
    for (let j = 0; j < i; j++) {
      const prefix = str.slice(j, i)
      if (words.includes(prefix)) {
        dp[j].forEach((substr) => {
          // add  the string to the solution of the base
          // Merge the prefix with the already calculated results ie: for  index i
          dp[i].push(`${substr} ${prefix}`)
        })
      }
    }
  }
  return dp[str.length]
}

const wordBreaksol = function (s, wordDict) {
  // Initializing a table of size s.length + 1
  const dpSolutions = [...Array(s.length + 1)].map(() => [])
  console.info(dpSolutions)
  // Setting base case
  dpSolutions[0] = ['']

  // For each substring in the input string, repeat the process.
  for (let i = 1; i < s.length + 1; i++) {
    // Iterate over the current substring and break it down into all possible prefixes.
    for (let j = 0; j < i; j++) {
      // Extract substring s[j:i]
      const prefix = s.slice(j, i)
      // Check if the current prefix exists in word_dict. If it does, we know that it is a valid word
      // and can be used as part of the solution.
      if (wordDict.includes(prefix)) {
        // Check if any part of the current substring already exists in the dpSolutions array.
        dpSolutions[j].forEach(substrings => {
          // Merge the prefix with the already calculated results
          dpSolutions[i].push((substrings + ' ' + prefix).trim())
        })
      }
    }
  }
  // Returning all the sentences formed using a complete string s.
  console.info(dpSolutions)
  return dpSolutions[s.length]
}
function printList (lst) {
  output = '['
  let i = 0
  for (i = 0; i < lst.length - 1; i++) {
    output += lst[i] + ', '
  }
  output += lst[i] + ']'
  return output
}

const main = function () {
  const s = ['catsanddog']
  const wordDict = ['cat', 'cats', 'and', 'sand', 'dog']
  // let s = ["vegancookbook", "catsanddog", "highwaycrash",
  //     "screamicecream", "educativecourse"];

  // let wordDict = ['v', 'vegan', 'cookbook', 'vegancookbook', 'veg', 'gan', 'eg', 'eganc', 'ookboo',
  //     'kc', 'ats', 'an', 'ddog', 'ddogh', 'cookb', 'cook', 'b', 'anco', 'ancoo', 'ook', 'book',
  //     'kbook', 'kbookc', 'books', 'cats', 'cat', 'and', 'andd', 'sand', 'sanddoghigh', 'catsanddog',
  //     'doghigh', 'sandd', 'og', 'dog', 'hi', 'gh', 'ghway', 'ghw', 'ayc', 'rash', 'ra', 'sh', 'highways',
  //     'highway', 'high', 'doghigh', 'way', 'cra', 'c', 'waycrash', 'crash', 'crashp', 'crashpineapple',
  //     'vegancookbookcats', 'anddoghighwaycrashpineapplepenapplescrea', 'anddoghighwaycrashpineapplepenapple',
  //     'vegancookbookcatsanddog', 'vegancookbookcatsanddoghighway', 'catsanddoghighway', 'crashpineapplepenapplescrea',
  //     'crashpineapplepenapple', 'applepenapple', 'pineapplepenapplescre', 'pineapplepenapple', 'a', 'crashpine', 'inea',
  //     'app', 'pena', 'en', 'ine', 'plep', 'pe', 'na', 'napplesc', 'ena', 'ple', 'le', 'penap', 'lepe', 'ppl', 'pples', 'pple',
  //     'pine', 'pin', 'nap', 'napp', 'eapple', 'apple', 'apples', 'pen', 'penapple', 'penapples', 'vegancookbookcatsanddoghighway',
  //     'vegancookbookcatsanddoghighwaycrashpineapplepenapplescrea', 'vegancookbookcatsanddoghighwaycrashpineapplepenapplescream'];

  // You can uncomment the line below and check how this recursive solution causes a time-out.
  // s.push("vegancookbookcatsanddoghighwaycrashpineapplepenapplescream");

  console.log('The list of words we can use to break down the strings are: \n\n' + printList(wordDict))
  console.log('-'.repeat(100))

  for (let i = 0; i < s.length; i++) {
    console.log(`Test Case #${i + 1}`, `\n\nThe possible strings from the string '${s[i]}' are the following combinations:`)
    console.log('\n' + wordBreak(s[i], wordDict))
    console.log('-'.repeat(100))
  }
}

main()
