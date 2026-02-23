/*
Problem link : https://leetcode.com/problems/car-fleet/
------------------------------------------------------------------------------------
Description: 853. Car Fleet

There are n cars at given miles away from the starting mile 0, traveling to reach the mile target.

You are given two integer arrays position and speed, both of length n, where position[i] is the starting mile of the ith car and speed[i] is the speed of the ith car in miles per hour.

A car cannot pass another car, but it can catch up and then travel next to it at the speed of the slower car.

A car fleet is a single car or a group of cars driving next to each other. The speed of the car fleet is the minimum speed of any car in the fleet.

If a car catches up to a car fleet at the mile target, it will still be considered as part of the car fleet.

Return the number of car fleets that will arrive at the destination.
------------------------------------------------------------------------------------
Example:

Example 1:

Input: target = 12, position = [10,8,0,5,3], speed = [2,4,1,1,3]

Output: 3

Explanation:

    The cars starting at 10 (speed 2) and 8 (speed 4) become a fleet, meeting each other at 12. The fleet forms at target.
    The car starting at 0 (speed 1) does not catch up to any other car, so it is a fleet by itself.
    The cars starting at 5 (speed 1) and 3 (speed 3) become a fleet, meeting each other at 6. The fleet moves at speed 1 until it reaches target.

Example 2:

Input: target = 10, position = [3], speed = [3]

Output: 1

Explanation:
There is only one car, hence there is only one fleet.

Example 3:

Input: target = 100, position = [0,2,4], speed = [4,2,1]

Output: 1

Explanation:

    The cars starting at 0 (speed 4) and 2 (speed 2) become a fleet, meeting each other at 4. The car starting at 4 (speed 1) travels to 5.
    Then, the fleet at 4 (speed 2) and the car at position 5 (speed 1) become one fleet, meeting each other at 6. The fleet moves at speed 1 until it reaches target.


------------------------------------------------------------------------------------
Input:

------------------------------------------------------------------------------------
Constraints:

------------------------------------------------------------------------------------

*/

/**
 Intuition: 
   A car can cath up to another car only if its speed is higher and has time to catch up
   first sort the cars according to its start position in descending order ? Why think..., so that we can reason about final speed for each fleet.
   Calculate the speed of each car by (target - position[i])/ speed[i] ; now since the cars are sorted in descending order of their current position
   we can simply use a stack to check if the current time taken by the top element in the stack again time taken by current car , 
   if it is less or equal to then it can join the current fleet  : ie if the current fleet leader is ahead from the current car we are looking at and has a speed higher than the fleet leader than it will catch up and maintain speed.
   else if the time for current car is higher than the current fleet leader , it can never catch up to it.
 Time Complexity: 
 Space Complexity:
 Notes: 
 */
var carFleet = function(target, position, speed) {
    const cars = []
    const N = position.length
    const stack = []
    const time = []
    for (let i =0 ; i <N; i++ ) {
      cars.push([position[i], speed[i]])
    }
    cars.sort((a, b) => b[0] - a[0])
    // console.info(`cars\n`, cars)
    for(let i = 0 ; i < N; i++) {
      time[i] = parseInt((target - cars[i][0]) / cars[i][1])
      if(stack.length == 0) {
        stack.push(time[i])
      } else  {
        // check if the current time is less than top of the stack , if so than the current car can catch it and maintain speed to form a fleet
        if(time[i] <= stack[stack.length -1]) {
          // it joins the fleet
          continue;
        } else {
          // start a new fleet 
          stack.push(time[i])
        }
      }

    }
    // console.info(`time`, time)
    return stack.length
};

// Driver code
 

var main = function () {
  const fn = carFleet
  const input = [
    [12, [10,8,0,5,3], [2,4,1,1,3]],
    [10, [3], [3]],
    [100, [0,2,4], [4,2,1]]
  ]
  /**
   *  Fill the time complexity for each function
   */

  for (var i = 0; i < input.length; i++) {
      console.log(i + 1 + ".\t Input array: \t", input[i]);
      var result = fn(...input[i]);
      console.log("\t Result is \t: ",result);
      console.log("-".repeat(100));
  }
}

main();