/**
Given n friends, each one can remain single or can be paired up with some other friend. Each friend can be paired only once.
Find out the total number of ways in which friends can remain single or can be paired up.
Input  : n = 3
Output : 4
Explanation:
{1}, {2}, {3} : all single
{1}, {2, 3} : 2 and 3 paired but 1 is single.
{1, 2}, {3} : 1 and 2 are paired but 3 is single.
{1, 3}, {2} : 1 and 3 are paired but 2 is single.
Note that {1, 2} and {2, 1} are considered same.

 */

const findFriendsPair = (n) => {
  if (n <= 2) return 2 // case case there is only two ways possible
  // either a person remain single hence the number will be F(n-1) * 1
  // or let remaining persons can form pair with remaining n-1 person pair with other person
  return findFriendsPair(n - 1) * 1 + (n - 1) * findFriendsPair(n - 2)
}

// Driver code
const main = function () {
  const input = [
    1, 2, 3, 4, 5
  ]
  /**
   *  Fill the time complexity for each function
   */

  for (let i = 0; i < input.length; i++) {
    console.log(i + 1 + '.\t Input array:', input[i])
    const result = findFriendsPair(input[i])
    console.log('\t Result is', result)
    console.log('-'.repeat(100))
  }
}

main()
