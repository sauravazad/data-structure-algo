'''
Problem link : https://leetcode.com/problems/special-binary-string

------------------------------------------------------------------------------------
Description: 761. Special Binary String

Special binary strings are binary strings with the following two properties:

    The number of 0's is equal to the number of 1's.
    Every prefix of the binary string has at least as many 1's as 0's.

You are given a special binary string s.

A move consists of choosing two consecutive, non-empty, special substrings of s, and swapping them. Two strings are consecutive if the last character of the first string is exactly one index before the first character of the second string.

Return the lexicographically largest resulting string possible after applying the mentioned operations on the string.

------------------------------------------------------------------------------------
Example:

Example 1:

Input: s = "11011000"
Output: "11100100"
Explanation: The strings "10" [occurring at s[1]] and "1100" [at s[3]] are swapped.
This is the lexicographically largest string possible after some number of swaps.

Example 2:

Input: s = "10"
Output: "10"

 

------------------------------------------------------------------------------------
Constraints:


    1 <= s.length <= 50
    s[i] is either '0' or '1'.
    s is a special binary string.


------------------------------------------------------------------------------------
'''
class Solution:
    '''
    explanation :  what is a special Binary string 
    Condition 1: Equal Counts
        Number of '1's = Number of '0's
    condition 2: Valid Prefix Property
        Every prefix has at least as many '1's as '0's

    String	1s=0s?	Prefix Check	                            Special?
    "10"	✓ (1=1)	"1"→1≥0, "10"→1≥1	                        ✅ Yes
    "1100"	✓ (2=2)	"1"→1≥0, "11"→2≥0, "110"→2≥1, "1100"→2≥2	✅ Yes
    "1010"	✓ (2=2)	"1"→1≥0, "10"→1≥1, "101"→2≥1, "1010"→2≥2	✅ Yes
    "1001"	✓ (2=2)	"1"→1≥0, "10"→1≥1, "100"→1≥2 ✗	            ❌ No
    "01"	✓ (1=1)	"0"→0≥1 ✗	                                ❌ No
    "110"	✗ (2≠1)	  -	                                        ❌ No
    
    The Operation: Swapping Consecutive Special Substrings
        You can :
            1. choose two consecutive , non-empty special substring
            2. swap them
    
    goal: Lexicographically Largest String
        Lexicographic order for binary strings:
            '1' > '0'
        Compare character by character from left to right
        So we want to maximize the leftmost characters (put '1's as early as possible).
    
    Time Complexity: 
    Space Complexity:
    Intuition: 
    
    

    1. Decompose the string into primitive special substrings
        A primitive substring cannot be split into smaller special substrings
        Example: "1100" is primitive, but "1010" = "10"+"10" is not

    2. Recursively process each primitive substring
        any Primitive substring Must start with '1' and end with '0' (otherwise violates prefix condition)
        Remove outer '1' and '0'
        
        Process the inner part
        add the removed outer 1, 0 before pushing
    3. Sort the processed substrings in descending order
        To get lexicographically largest result
    4. Reconstruct the final string
    
    '''
    def makeLargestSpecial(self, s:str) -> str:
        # base case : empty string or single 10 pair
        if len(s) <= 2:
            return s
        
        # create variable to store primitives and count the 0 and 1 and start position
        primitives = []
        start = 0 # tracks index of current primitive substring
        count = 0 # track the balance of 1 and 0
        
        # step 1 :Decompose
        for i , char in enumerate(s):
            if char == '1':
                count+=1
            else: # char == 0 
                count -=1
            # when count == 0 we have found a primitive substring 
            if count == 0:
                # process the inner string  by removing outer 1 and 0
                inner = self.makeLargestSpecial(s[start + 1: i])
                primitives.append('1' + inner + '0')
                start = i+1
        # Step 3 : Sort
        primitives.sort(reverse=True)
        # step 4 : reconstruct by contamination
        return ''.join(primitives)
        

if __name__ == '__main__':
  '''
    Driver function to execute the function with inputs
  '''
  solution = Solution()
  fn = solution.makeLargestSpecial
  input = [
    ["11011000", "10"],
  ]
  for i in input:
    print( ".\t Input array: \t", *i)
    result = fn(i[0])
    print('\t Result is \t: ', result)
    print("-" * 100)
  