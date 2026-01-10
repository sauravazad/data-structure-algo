//https://leetcode.com/problems/first-missing-positive/
var firstMissingPositive = function(arr) {
  arr.sort((a, b) => a-b) // sort the array O (n Log(n))
  let result = 1

  for(let i = 0; i < arr.length; i++) {
  if(result == arr[i]) {
    result++
  }
  }
  return result
};
// Driver code
var main = function () {
  const fn = firstMissingPositive
  const input = [
    [0, 1, 3],
    [3,4,-1,1]
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