/**
https://www.geeksforgeeks.org/prefix-sum-array-implementation-applications-competitive-programming/
https://leetcode.com/problems/running-sum-of-1d-array/
 * Given an array arr[] of size N, find the prefix sum of the array.
 * A prefix sum array is another array prefixSum[] of the same size, such that the value of prefixSum[i] is arr[0] + arr[1] + arr[2] . . . arr[i].

Input: arr[] = {10, 20, 10, 5, 15}
Output: prefixSum[] = {10, 30, 40, 45, 60}
Explanation: While traversing the array, update the element by adding it with its previous element.
prefixSum[0] = 10,
prefixSum[1] = prefixSum[0] + arr[1] = 30,
prefixSum[2] = prefixSum[1] + arr[2] = 40 and so on.

*/


/**
Sum of an array between indexes L and R using Prefix Sum:

Given an array arr[] of size N. Given Q queries and in each query given L and R, Print the sum of array elements from index L to R.
*/

const runningSum = (numbers) => {
  const prefix = []
  const n = numbers.length
  for(let i = 0; i < n ; i++ ) {
    prefix[i] =  (prefix[i -1] || 0)  + numbers[i]
  }
  return prefix
}


// Driver code
var main = function () {
  const input = [
    [1,2,3,4],
    [1,1,1,1,1]
  ]
  /**
   *  Fill the time complexity for each function
   */

  for (var i = 0; i < input.length; i++) {
      console.log(i + 1 + ".\t Input array:", input[i]);
      var result = runningSum(input[i]);
      console.log("\t Result is",result);
      console.log("-".repeat(100));
  }
}

main();