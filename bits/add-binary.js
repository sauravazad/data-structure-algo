/*
Problem link : https://leetcode.com/problems/add-binary
------------------------------------------------------------------------------------
Description: 67. Add Binary

Given two binary strings a and b, return their sum as a binary string.
------------------------------------------------------------------------------------
Example:
Example 1:

Input: a = "11", b = "1"
Output: "100"

Example 2:

Input: a = "1010", b = "1011"
Output: "10101"


------------------------------------------------------------------------------------
Input:

------------------------------------------------------------------------------------
Constraints:

    1 <= a.length, b.length <= 104
    a and b consist only of '0' or '1' characters.
    Each string does not contain leading zeros except for the zero itself.

------------------------------------------------------------------------------------

*/

/**
 Intuition: 
 Time Complexity: O(N+M)
 Space Complexity:
 Notes: 
 */
// using language feature 
var addBinary = function (a, b) {
    // Convert binary strings to BigInt
    let numA = BigInt("0b" + a);
    let numB = BigInt("0b" + b);

    // Sum the BigInt numbers
    let sum = numA + numB;

    // Convert the sum back to a binary string
    return sum.toString(2);
};

/**
 Intuition: use carry to track the carry over bit and add each bit from right ot left
 Time Complexity: O(Max(N,M))
 Space Complexity: O(Max(N,M)
 Notes: 
 */
var addBinarySum = (a, b) => {
  let x = a
  let y = b
  if(b.length > a.length) {
    // swap
    x = b
    y = b
  }
  let carry = 0
  let result = ''
  // iterate through the bits from right to left
  for(let i = x.length -1; i>=0; i--) {
    //
    if(x[i]=='1') {
      carry++
    }
    if(y[i]=='1') {
      carry++
    }
    // now get the sum bit and carry bit 
    let ans = parseInt(carry /2)
    result = `${ans}${result}`
    carry = carry % 2 // only take the overflow

  }
  return result
}

/**
 * constraint : Don't use arithmetic operation : So the hit is to use bit manipulation
 Intuition: 
 ^(XOR) : is used to simulate values for binary addition without carry 
 && (AND): will retain 1 for position where carry is generated
 but we add carry bit to the next bit so shift by 1
 Now the problem becomes  sum_without_carry and carry bits
 so we can simply do xor and update the bits until carry is zero
 NOTE: we need to do multiple XOR because upon doing XOR of sum of A, B and carry bits . it can result in further carry as XOR is addition without carry 

 Time Complexity: O(N+M) : conversion from binary string to number O(N+M)+ O(max(N,M)) = O(N+M)
 Space Complexity: 
 Notes: 
 */
var addBinary = (a, b) => {
  let x = BigInt('0b' + a) // 0b for binary string
  let y = BigInt('0b' + b)
  let zero = BigInt(0)
  while(y != zero) {
    let sum =  x ^ y
    let carry = (x && y) << BigInt(1)
    x = sum
    y = carry
  }
  return x.toString(2)
}



// Driver code
 

var main = function () {
  const fn = addBinary
  const input = [
    ['11', '1'],
    ['1010', '1011']
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