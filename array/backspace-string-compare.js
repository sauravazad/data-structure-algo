// https://leetcode.com/problems/backspace-string-compare/

const assert = require('assert')

const backspaceCompare = function (s, t) {
  // iterate through the string
  // keep to pointer both starting at 0
  // if we encounter # decrement the pointer by 1
  const hash = '#'
  let i = s.length - 1; let j = t.length - 1
  for (; i >= 0 || j >= 0; i--, j--) {
    let k = 0; let l = 0
    while (i >= 0) {
      if (s[i] == hash) k++, i--
      else if (k > 0) k--, i--
      else break
    }

    while (j >= 0) {
      if (t[j] == hash) l++, j--
      else if (l > 0) l--, j--
      else break
    }

    console.info(`Comparing s[${i}] == t[${j}]`, s[i], t[j])
    if (s[i] != t[j]) return false
  }
  if (i != j) return false
  return true
}
// Driver code
const main = function () {
  const fn = backspaceCompare
  const input = [
    ['ab#c', 'ad#c'],
    ['ab##', 'c#d#'],
    ['a#c', 'b'],
    ['xywrrmp', 'xywrrmu#p'],
    ['##ab', '#ab'],
    ['bbbextm', 'bbb#extm'],
    ['c#a#c', 'c']
  ]

  const output = [
    true,
    true,
    false,
    true,
    true,
    false,
    true
  ]

  /**
   *  Fill the time complexity for each function
   */

  for (let i = 0; i < input.length; i++) {
    console.log(i + 1 + '.\t Input array: \t', input[i])
    const result = fn(...input[i])
    console.log('\t Result is \t: ', result)
    console.log('-'.repeat(100))
    assert.equal(result, output[i])
  }
}

main()
