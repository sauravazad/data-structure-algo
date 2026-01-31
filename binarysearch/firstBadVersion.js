/**
 You are a product manager and currently leading a team to develop a new product. Unfortunately, the latest version of your product fails the quality check. Since each version is developed based on the previous version, all the versions after a bad version are also bad.

Suppose you have n versions [1, 2, ..., n] and you want to find out the first bad one, which causes all the following ones to be bad.

You are given an API bool isBadVersion(version) which returns whether version is bad. Implement a function to find the first bad version. You should minimize the number of calls to the API.

Input: n = 5, bad = 4
Output: 4
Explanation:
call isBadVersion(3) -> false
call isBadVersion(5) -> true
call isBadVersion(4) -> true
Then 4 is the first bad version.

Input: n = 1, bad = 1
Output: 1

Constraints:

    1 <= bad <= n <= 231 - 1

 */

/**
 * Definition for isBadVersion()
 *
 * @param {integer} version number
 * @return {boolean} whether the version is bad
 * isBadVersion = function(version) {
 *     ...
 * };
 */

/**
 * @param {function} isBadVersion()
 * @return {function}
 */
const isBadVersion = (x) => {
  console.log(`${x} is ${x >= 1}`)
  return x >= 101
}
const solution = function (isBadVersion) {
  /**
   * @param {integer} n Total versions
   * @return {integer} The first bad version
   */
  return function (n) {
    let left = 1
    let right = n
    while (left < right) {
      mid = Math.floor(left + (right - left) / 2)
      if (isBadVersion(mid)) {
        right = mid
      } else {
        left = mid + 1
      }
    };
    if (isBadVersion(left)) {
      return left
    } else {
      return -1
    }
  }
}

console.log(solution(isBadVersion)(100))
