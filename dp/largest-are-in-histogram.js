// https://leetcode.com/problems/largest-rectangle-in-histogram/

/**
Given an array of integers heights representing the histogram's bar height where the width of each bar is 1,
return the area of the largest rectangle in the histogram.
*/

// brute force
const largestRectangleAreaB = function (heights) {
  let maxArea = 0
  // iterate through the bars in heights
  for (let i = 0; i < heights.length; i++) {
    // look until the current h so that we can calculate what is the min height until the given width in histogram
    for (let width = i; width < heights.length; width++) {
      // find the min height until this point
      let minHeight = Number.MAX_SAFE_INTEGER
      for (let k = i; k <= width; k++) {
        const elem = heights[k]
        minHeight = Math.min(minHeight, elem)
      }
      const breadth = width - i + 1 // ( current pointer for width  - element pointer  + 1)
      const area = minHeight * (breadth) // height * breadth
      maxArea = Math.max(maxArea, area)
      // console.info(`Min height for element ${heights[i]} index = ${i} width index = ${width} height = ${minHeight}  breadth= ${breadth} area =${area}`)
    }
  }
  return maxArea
}

const largestRectangleArea = (heights) => {
  let maxArea = 0
  const stack = [] // [height]
  let i = 0
  while (i < heights.length) {
    // let current = heights[i]
    // let peak = stack[stack.length -1] || []
    if (stack.length === 0 || heights[stack[stack.length - 1]] <= heights[i]) {
      stack.push(i++)
    } else { // pop the element from the stack and calculate the area
      const popped = stack.pop() // will return the height
      // find the width
      // current pointer - pointer of the peak element in the stack or if stack is empty then height * current pointer
      // const peak = stack[stack.length -1] || []
      // const leftIndex = (peak[1] ?? 0)
      // const width =  leftIndex ? i - leftIndex : i +1
      let width
      if (stack.length > 0) {
        width = i - stack[stack.length - 1] - 1
      } else {
        width = i
      }
      // console.log(i, width)
      console.info(`height: ${popped[0]} leftIndex = ${leftIndex}, rightIndex = ${i} Width = ${width}`)
      maxArea = Math.max(maxArea, width * heights[popped])
    }
  }

  console.log('stack', stack)
  // // console.info(stack)
  // let rightIndex = heights.length -1
  while (stack.length) {
    const popped = stack.pop() // will return the height
    // find the width
    // current pointer - pointer of the peak element in the stack or if stack is empty then height * current pointer
    // const peak = stack[stack.length -1] || []
    // const leftIndex = (peak[1] ?? 0)
    // const width =  leftIndex ? i - leftIndex : i +1
    let width
    if (stack.length > 0) {
      width = i - stack[stack.length - 1] - 1
    } else {
      width = i
    }
    console.log(i, width, width * heights[popped])
    // console.log(i, width)
    // console.info(`height: ${popped[0]} leftIndex = ${leftIndex}, rightIndex = ${i} Width = ${width}`)
    maxArea = Math.max(maxArea, width * heights[popped])
  }
  return maxArea
}

const largestAreaHistogram = (heights) => {
  // Build a monotonic stack to keep track of largest height
  const stack = [] // will kep track of the highest bar  index
  // iterate over the list of heights
  let maxArea = -Infinity
  let i = 0

  while (i < heights.length) {
    if (stack.length === 0 || heights[i] > heights[stack[stack.length - 1]]) {
      // push the index into stack and increment
      stack.push(i++)
    } else {
      // console.info(`right index i: ${i}`)
      // console.info(`Elements in the stack: ${stack}`)
      // pop from the stack
      const popped = stack.pop()
      let width = 0
      if (stack.length === 0) {
        width = i
      } else {
        // the width is calculated by i(right pointer) - last index in the stack(even tough the element might have been inserted later , 
        // by getting the top of the stack after it has been popped we are ensuring that we consider the full with from current top to the right pointer the popped element is not involved in the width calculation) ; 
        width = i - stack[stack.length - 1] - 1
      }
      // console.log(`Popped index`, popped)
      // console.log(`width`, width)
      maxArea = Math.max(maxArea, heights[popped] * width)
    }
  }
  // console.info(`right index i`, i)
  // console.info(`Stack: `,stack)
  while (stack.length) {
    // pop from the stack
    const popped = stack.pop()
    let width = 0
    if (stack.length === 0) {
      width = i
    } else {
      width = i - stack[stack.length - 1] - 1
    }
    maxArea = Math.max(maxArea, heights[popped] * width)
  }

  return maxArea
}
// Driver code
const main = function () {
  const input = [
    [7,1,7,2,2,4],
    [1,3,7],
    [2,1,5,6,2,3],
    [1, 1, 2],
    // [ 2, 1, 0, 1 ],
    [2, 1, 5, 5, 2, 3],
    // [2,4],
    // [1,1],
    // [1,2,1],
    [2, 1, 2],
    [3, 2, 2]
  ]
  /**
   *  Fill the time complexity for each function
   */

  for (let i = 0; i < input.length; i++) {
    console.log(i + 1 + '.\t Input array:', input[i])
    // var result = largestRectangleArea(input[i]);
    const result = largestAreaHistogram(input[i])
    console.log('\t Result is', result)
    console.log('-'.repeat(100))
  }
}

main()
