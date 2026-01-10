/**
 * https://www.geeksforgeeks.org/cycle-sort/
 * https://leetcode.com/problems/first-missing-positive
 * https://blog.stackademic.com/coding-pattern-cyclic-sort-96511b0f60ac
Cyclic Sort:

  -  Start with an unsorted array of n elements.
  -  Initialize a variable, cycleStart, to 0.
  -  For each element in the array, compare it with every other element to its right. If there are any elements that are smaller than the current element, increment cycleStart.
  -  If cycleStart is still 0 after comparing the first element with all other elements, move to the next element and repeat step 3.
  -  Once a smaller element is found, swap the current element with the first element in its cycle. The cycle is then continued until the current element returns to its original position.

 */
const cycleSort = (arr) => {

  for(let cycleIndex = 0 ; cycleIndex < arr.length; cycleIndex++) {
    let cycle = cycleIndex
    let current = arr[cycleIndex]
    // count all smaller elements on right side of item.
    for(let j = cycleIndex+1 ; j < arr.length; j++) {
      if(arr[j] < current) {
        cycle++
      }
    }

    // if it is already in correct position move on
    if(cycle === cycleIndex) {
      continue
    }

    // check for duplicates and ignore them
    while(current === arr[cycle]) {
      cycle++
    }

    // move the current element to the correct position in the array by swapping
    if(cycle != cycleIndex) {
      const tmp = current
      current = arr[cycle]
      arr[cycle] = tmp
      // swap(arr, i, cycle)
    }

    // check for the swapped to find its correct position

    while(cycle != cycleIndex) {
      cycle = cycleIndex
      // count all smaller elements on right side of item.
    for(let j = cycle+1 ; j < arr.length; j++) {
      if(arr[j] < current) {
        cycle++
      }
    }
      // check for duplicates and ignore them
      while(current === arr[cycle]) {
        cycle++
      }

      if(current != arr[cycle])  {
        let tmp = current
        current = arr[cycle]
        arr[cycle] = tmp
      }
    }
  }

  const swap  = (arr, a, b) => {
    const temp = arr[b]
    arr[b] = a
    arr[a] = temp
  }
  return arr
}

// Driver code
var main = function () {
  const fn = cycleSort
  const input = [
    [2, 4, 5, 1, 3],
    [3,5,-100,-150,30,2,1,2,6]
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