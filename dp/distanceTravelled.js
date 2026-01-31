/**
https://leetcode.com/problems/total-distance-traveled/
*/

const distanceTraveled = (mainTank, additionalTank) => {
  return distanceTraveledRec(mainTank, additionalTank)
}

const distanceTraveledRec = (mainTank, additionalTank) => {
  // console.log(mainTank, additionalTank)
  const mileage = 10
  if (mainTank < 5) return mainTank * mileage

  let distance = 0
  const updatedMainTank = additionalTank - 1 >= 0 ? mainTank - 5 + 1 : mainTank - 5
  const updatedAdd = additionalTank - 1 >= 0 ? additionalTank - 1 : 0
  distance += 5 * mileage + distanceTraveledRec(updatedMainTank, updatedAdd)
  return distance
}
// Driver code
const main = function () {
  const input = [
    [5, 10],
    [1, 2],
    [3, 2],
    [9, 1], // 100
    [10, 1] // 110
  ]
  /**
	 *  Fill the time complexity for each function
	 */

  for (let i = 0; i < input.length; i++) {
    console.log(i + 1 + '.\t Input array:', input[i])
    const result = distanceTraveled(input[i][0], input[i][1])
    console.log('\t Result is', result)
    console.log('-'.repeat(100))
  }
}

main()
