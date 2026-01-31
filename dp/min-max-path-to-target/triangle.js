/**
https://leetcode.com/problems/triangle/description/
 */

/**
 * @param {number[][]} triangle
 * @return {number}
 */
const minimumTotalBottomUp = function (triangle) {
  for (let row = 1; row < triangle.length; row++) {
    for (let col = 0; col <= row; col++) {
      // for every position , it can contribute to currentIndex or currentINdex + 1 of next row
      // think about if instead flip it around for any given position , it can be min of either the element above it or right to it :
      //  because last element in the row can only the element before it from previous row as each subsequent row moving up will have one less element
      // draw to visualize

      // take the element from [previous-row][col] or [previous-row][col -1]
      const previousRow = row - 1
      // when you are checking for last element in the current row, the column position does not exists in previous row
      const previousSame = col == triangle[row - 1].length ? Infinity : triangle[previousRow][col]
      // when you are checking for 0th element in the current row, the column position does not exists in previous row
      const previousMinus = col - 1 < 0 ? Infinity : triangle[previousRow][col - 1]
      // console.info(`for index(${col}, ${row}):`, `[${previousRow}][${col -1}]: ${previousMinus}`, `[${previousRow}][${col}]: ${previousSame}`)
      const min = Math.min(previousSame, previousMinus)
      triangle[row][col] += min
    }
  }
  return Math.min(...triangle[triangle.length - 1])
}

const minimumTotalTopDown = (triangle) => {
  console.info('solving => minimumTotalTopDown')
  // iterate through the rows in triangle from 1 to n -1
  for (let row = 0; row < triangle.length; row++) {
    console.log(`Current row: ${triangle[row]}`)
    for (let col = 0; col < row + 1; col++) {
      console.info(`Current: [${row}][${col}]`, triangle[row][col])
      console.info('Add the value to below column in next row', `triangle[${row + 1}][${col}]`, `triangle[${row + 1}][${col + 1}]}`)
      // items in the next row would be col or col + 1
      // triangle[row+1][col] += triangle[row][col]
      // triangle[row+1][col + 1] += triangle[row][col]
    }
  }
}

// Driver code
const main = function () {
  const fn = minimumTotalBottomUp
  const input = [
    [[2], [3, 4], [6, 5, 7], [4, 1, 8, 3]],
    [[-10]]
  ]
  const expectedOutput = [
    11, -10
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
