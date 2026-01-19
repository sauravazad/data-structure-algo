'''
Problem link : https://leetcode.com/problems/unique-morse-code-words/description/

------------------------------------------------------------------------------------
Description:
International Morse Code defines a standard encoding where each letter is mapped to a series of dots and dashes, as follows:

    'a' maps to ".-",
    'b' maps to "-...",
    'c' maps to "-.-.", and so on.

For convenience, the full table for the 26 letters of the English alphabet is given below:

[".-","-...","-.-.","-..",".","..-.","--.","....","..",".---","-.-",".-..","--","-.","---",".--.","--.-",".-.","...","-","..-","...-",".--","-..-","-.--","--.."]

Given an array of strings words where each word can be written as a concatenation of the Morse code of each letter.

    For example, "cab" can be written as "-.-..--...", which is the concatenation of "-.-.", ".-", and "-...". We will call such a concatenation the transformation of a word.

Return the number of different transformations among all words we have.

------------------------------------------------------------------------------------
Input:

Input: words = ["gin","zen","gig","msg"]
Output: 2
Explanation: The transformation of each word is:
"gin" -> "--...-."
"zen" -> "--...-."
"gig" -> "--...--."
"msg" -> "--...--."
There are 2 different transformations: "--...-." and "--...--.".

Example 2:

Input: words = ["a"]
Output: 1


------------------------------------------------------------------------------------
Constraints:


    1 <= words.length <= 100
    1 <= words[i].length <= 12
    words[i] consists of lowercase English letters.

------------------------------------------------------------------------------------
'''
from collections import defaultdict
from typing import List
class Solution:
  '''
   Time Complexity: 
   Space Complexity:
   Intuition: 
  '''
  def uniqueMorseRepresentations(self, words: List[str]) -> int:
    alphabet= "abcdefghijklmnopqrstuvwxyz"
    morseCode = [".-","-...","-.-.","-..",".","..-.","--.","....","..",".---","-.-",".-..","--","-.","---",".--.","--.-",".-.","...","-","..-","...-",".--","-..-","-.--","--.."]
    morseEq = {}
    morseMap = defaultdict(lambda: 0)
    for index, value in enumerate(alphabet):
      morseEq[value] = morseCode[index]
    for word in words:
      morseWord = ''
      for index, alph in enumerate(word):
        morseWord += morseEq[alph]
      morseMap[morseWord]+=1
    uniqueMorse = morseMap.__len__()
    return uniqueMorse

        

if __name__ == '__main__':
  '''
    Driver function to execute the function with inputs
  '''
  solution = Solution()
  fn = solution.uniqueMorseRepresentations
  input = [
    ["gin","zen","gig","msg"],
    ["a"]
  ]
  for i in input:
    print( ".\t Input array: \t", *i)
    result = fn(i)
    print('\t Result is \t: ', result)
    print("-" * 100)
  