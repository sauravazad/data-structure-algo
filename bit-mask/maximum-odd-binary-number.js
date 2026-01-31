// https://leetcode.com/problems/maximum-odd-binary-number

const maximumOddBinaryNumber = function (s) {
  // count the number of 1 in the string
  const noOfBits = s.length
  const number = parseInt(s, 2)
  // let n = number
  let count = 0
  // while(n) {
  //   n = n & n-1
  //   count++
  // }
  for (let i = 0; i < noOfBits; i++) {
    if (s[i] == '1') ++count
  }
  let newStr = ''
  for (let i = 1; i <= noOfBits; i++) {
    let char = '0'
    if (i < count || i == noOfBits) char = '1'
    newStr = newStr + char
  }
  return newStr
}
// Driver code
const main = function () {
  const fn = maximumOddBinaryNumber
  const input = [
    '010',
    '0101',
    '100111001110111110010011111101111'
  ]
  /**
   *  Fill the time complexity for each function
   */

  for (let i = 0; i < input.length; i++) {
    console.log(i + 1 + '.\t Input array: \t', input[i])
    const result = fn(input[i])
    console.log('\t Result is \t: ', result)
    console.log('-'.repeat(100))
  }
}

main()
