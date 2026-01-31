// https://leetcode.com/problems/decode-xored-permutation/
// https://leetcode.com/problems/decode-xored-permutation/solutions/1031840/explanations-xor-and-1st-element-java-kotlin-python/

const decode = function (encoded) {
  /**
      XOR properties and tips
      1. XOR is commutative, a xor b = b xor a
      2. XOR to the same number is always zero a xor a = 0
      3. a xor b = c you can write b = a xor c or a = c xor b // xor is associative too
     */
  // find the first element
  /**
      *Note the point in the question
        integer array perm that is a permutation of the first n positive integers, where n is always odd.
        that implies the perm array is an array of values from 1 to n [1,2,3,4..n] the position are permuted
        [NOTE:] order does not matter in xor operations

        How to find the first element ??
        lest do some xor maths
        XOR all the numbers from 1 to n
        ie:
        totalXor = 1 XOR 2 XOR 3 XOR ... n  ; in term of perm : totalXor = perm[0] XOR perm[1] XOR perm[2] ... XOR perm[n]

        this can be written as
        1 = totalXor XOR 2 XOR 3 ... n
        hence we can do the same using perm array
        perm[0] = totalXor XOR perm[1] XOR perm[2] ... XOR perm[n]

        how to find out the perm[1] XOR perm[2] ... perm[n] using the encode array

        encode[1] = perm[1] XOR perm[2]
        encode[2] = perm[2] XOR perm[3]
        encode[3] = perm[3] XOR perm[4]

        encode[n-2] = perm[n-2] XOR perm[n-1]

        [NOTE:] if you observer the expression , if you xor only the odd positions of encode array we can get the desired XOR's of perm[1] to perm[n]
        ie: encode[1] XOR encode[3] =  perm[1] XOR perm[2] XOR perm[3] XOR perm[4]

     */
  let first = 0
  let totalXor = 0
  let xor1toN = 0
  const n = encoded.length + 1
  for (let i = 0; i <= n; i++) {
    totalXor ^= i
    // compute the XOR of perm[1] to perm[N]
    if (i % 2 === 1) {
      xor1toN ^= encoded[i]
    }
  }
  first = totalXor ^ xor1toN

  // now compute the
  const result = [first]
  for (let i = 0; i < encoded.length; i++) {
    result[i + 1] = result[i] ^ encoded[i]
  }
  return result
}
// Driver code
const main = function () {
  const fn = decode
  const input = [
    [3, 1],
    [6, 5, 4, 6]
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
