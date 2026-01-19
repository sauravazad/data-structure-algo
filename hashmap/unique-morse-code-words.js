/**
https://leetcode.com/problems/unique-morse-code-words/description/
 */
/**
 * @param {string[]} words
 * @return {number}
 */
var uniqueMorseRepresentations = function(words) {
  const alphabet= "abcdefghijklmnopqrstuvwxyz"
  const morseCode = [".-","-...","-.-.","-..",".","..-.","--.","....","..",".---","-.-",".-..","--","-.","---",".--.","--.-",".-.","...","-","..-","...-",".--","-..-","-.--","--.."]
  const morseEq = {}
  const morseMap = {}
  for(let i = 0 ; i < alphabet.length; i++) {
    morseEq[alphabet[i]] = morseCode[i]
  }
  for(let word of words) {
    let morseWord = ''
    for(let i = 0 ; i < word.length; i++) {
      const moresValue = morseEq[word[i]]
      morseWord += moresValue
    }
    if (morseMap[morseWord] == undefined)  morseMap[morseWord] = 0
    morseMap[morseWord]+= 1
  }
  return Object.keys(morseMap).length
};

// Driver code
var main = function () {
  const fn = uniqueMorseRepresentations
  const input = [
    ["gin","zen","gig","msg"],
    ["a"]
  ]
  /**
   *  Fill the time complexity for each function
   */

  for (var i = 0; i < input.length; i++) {
      console.log(i + 1 + ".\t Input array: \t", input[i]);
      var result = fn(input[i]);
      console.log("\t Result is \t: ",result);
      console.log("-".repeat(100));
  }
}

main();