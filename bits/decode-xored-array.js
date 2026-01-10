// https://leetcode.com/problems/decode-xored-array/
var decode = function(encoded, first) {
  const result = [first]
  for(let i = 0; i < encoded.length; i++) {
    result[i+1] = result[i] ^ encoded[i]
  }
  return result
};

// Driver code
var main = function () {
  const fn = decode
  const input = [
    [[1,2,3], 1],
    [[6,2,7,3], 4],
  ]
  /**
   *  Fill the time complexity for each function
   */

  for (var i = 0; i < input.length; i++) {
      console.log(i + 1 + ".\t Input array: \t", input[i]);
      var result = fn(...input[i]);
      console.log("\t Result is \t: ",result);
      console.log("-".repeat(100));
  }
}

main();