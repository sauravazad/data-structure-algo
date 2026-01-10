/**
https://leetcode.com/problems/maximal-rectangle/description/

Given a rows x cols binary matrix filled with 0's and 1's, find the largest rectangle containing only 1's and return its area.
[HINT:] Think of it as a histogram and calculate the area after building up the histogram array
 */

const print2DMatrix = (matrix) => {
  const length = matrix[0].length -1
  console.info('_____'.repeat(length))
  for(let i = 0; i < matrix.length; i++) {
    console.info('| ' +matrix[i].join(" | ") + ' |')
  }
  console.info('-----'.repeat(length))
}

const calculateMaxAreaHistogram = (heights) => {
  let maxArea = -Infinity
  let index = 0
  let stack = [] // stack holds the  element index in heights array
  while(index < heights.length) {
    // if stack is empty or element is larger than then peak element push to stack
    if(stack.length === 0 ||heights[index] > heights[stack[stack.length -1]]) {
      stack.push(index)
      index++
    } else {
      // pop from  stack and calculate the area
      const popped = stack.pop()
      let width = 0
      if(stack.length === 0) {
        width = index // we have reached to the end hence we can take the whole width
      } else {
        width = index - stack[stack.length -1] - 1
      }
      maxArea = Math.max(maxArea, width * heights[popped])
    }
  }

  // if we have reached to the end and there are elements in the stack pop and compute the area
    while(stack.length) {
      const popped = stack.pop()
      let width = 0
      if(stack.length === 0 ) {
        width = index
      } else {
        width = index - stack[stack.length -1] - 1 // right index - left index(peak element left in the stack)
      }
      maxArea = Math.max(maxArea, width * heights[popped])
    }
    return maxArea
}

const maximalRectangle = (matrix) =>  {
  // for each row of the matrix treat it like a histogram and compute the max Area
  let maxArea = -Infinity
  let histogram = new Array(matrix[0].length).fill(0)
  for(let row = 0; row < matrix.length; row++) {
    for(let column = 0 ; column < matrix[row].length; column++) {
      const element = parseInt(matrix[row][column])
      histogram[column] = element === 0 ? element : histogram[column] + element
    }
    // console.log(histogram)
    maxArea = Math.max(maxArea, calculateMaxAreaHistogram(histogram))
    // console.log(histogram, maxArea )
  }
  return maxArea

};

// Driver code


var main = function () {
  const input = [
    [
			[0, 1, 0, 1],
			[1, 0, 0, 0],
			[1, 1, 0, 0],
		],
		[[0,1,1,0],[0,1,1,1],[1,1,1,0]],
    [["1","0","1","0","0"],["1","0","1","1","1"],["1","1","1","1","1"],["1","0","0","1","0"]],
    [["0"]],
    [["1"]]
  ]
  /**
   *  Fill the time complexity for each function
   */

  for (var i = 0; i < input.length; i++) {
      console.log(i + 1 + ".\t Input array: \n");
      print2DMatrix(input[i])
      var result = maximalRectangle(input[i]);
      console.log("\t Result is", result);
      console.log("-".repeat(100));
  }
}

main();