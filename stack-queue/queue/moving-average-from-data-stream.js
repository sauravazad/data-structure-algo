/**
https://leetcode.com/problems/moving-average-from-data-stream/description/

Given a stream of integers and a window size, calculate the moving average of all integers in the sliding window.

Implement the MovingAverage class:

    MovingAverage(int size) Initializes the object with the size of the window size.
    double next(int val) Returns the moving average of the last size values of the stream.

 

Example 1:

Input
["MovingAverage", "next", "next", "next", "next"]
[[3], [1], [10], [3], [5]]
Output
[null, 1.0, 5.5, 4.66667, 6.0]

Explanation
MovingAverage movingAverage = new MovingAverage(3);
movingAverage.next(1); // return 1.0 = 1 / 1
movingAverage.next(10); // return 5.5 = (1 + 10) / 2
movingAverage.next(3); // return 4.66667 = (1 + 10 + 3) / 3
movingAverage.next(5); // return 6.0 = (10 + 3 + 5) / 3

 */
/**
 * @param {number} size
 */
 class MovingAverage {
 constructor(size) {
        this.size = size
        this.vector = []
    }

    next(val) {
        // append the element 
        this.vector.push(val)
        // sum up the elements for the window and divide by element count
        // console.info('element', val)
        // console.info(this.vector)
        let sum = 0
        let count = 0
        let average = 0
        let lastElementIndex = this.vector.length - 1
        while(count < this.size) {
          if(this.vector[lastElementIndex] !== undefined) {
            console.info(this.vector[lastElementIndex])
            sum += this.vector[lastElementIndex]
            --lastElementIndex
            ++count
          } else  {
            break;
          }
        }
        average =  (sum / count)
        // console.info(average)
        return average
    }
 }
/** 
 * Your MovingAverage object will be instantiated and called as such:
 * var obj = new MovingAverage(size)
 * var param_1 = obj.next(val)
 */

// Driver code
var main = function () {
  // const movingAverage = new MovingAverage(3);
  // movingAverage.next(1); // return 1.0 = 1 / 1
  // movingAverage.next(10); // return 5.5 = (1 + 10) / 2
  // movingAverage.next(3); // return 4.66667 = (1 + 10 + 3) / 3
  // movingAverage.next(5); // return 6.0 = (10 + 3 + 5) / 3

  const movingAverage = new MovingAverage(4);
  movingAverage.next(100); // return 100
  movingAverage.next(-10); // return 100 + (-10)/ 2 = 45
  movingAverage.next(-300); // return 100 -10 -300 / 3 = -70 
  movingAverage.next(50); // return 100 -10 -300  + 50/ 4 = -40 
  movingAverage.next(0); // return (-10 -300  + 50 + 0)/ 4 = -65

}

main();