/**
 * @param {number} x
 * @return {number}
 */
var mySqrt = function(x) {
  let left = 0
  let right = x
  let sqrt = 0
  while(left <= right) {
      let mid = parseInt((left + right ) / 2)
      // console.log(`mid is ${mid}`)
      const tmp = mid * mid
      if(tmp === x) {
        sqrt = mid
        return sqrt
      } else if (tmp < x) {
        // shift left
        sqrt = mid
        left = mid + 1

      } else if (tmp > x) {
        //shift right
        right = mid - 1
      }
  }
  return sqrt

};
// console.log(mySqrt(625))


/**
 *
There is an integer array nums sorted in ascending order (with distinct values).

Prior to being passed to your function, nums is possibly rotated at an unknown pivot index k (1 <= k < nums.length) such that the resulting array is [nums[k], nums[k+1], ..., nums[n-1], nums[0], nums[1], ..., nums[k-1]] (0-indexed). For example, [0,1,2,4,5,6,7] might be rotated at pivot index 3 and become [4,5,6,7,0,1,2].

Given the array nums after the possible rotation and an integer target, return the index of target if it is in nums, or -1 if it is not in nums.
Input: nums = [4,5,6,7,0,1,2], target = 0
Output: 4
*/
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var search = function(nums, target) {
  let left = 0
  let right = nums.length - 1
  let mid

  while(left <= right) {

    /* check if the values are in ascending order
    ie: if Arr[left] < target < Arr [right]
    if not the array is pivoted find the correct side and move the left or right pointer
    if(Arr[left] > Arr [right]) {
      if(target > Arr[right]) {
        // move right to mid
      } else  {
        mode left to mid
      }
    } else {
      if(mid === target)
      if(mid > target) {
        move right
      } else if ( mid < target) {
        move left
      }
    }
    */
    mid = parseInt((left + right) / 2)
    console.log(`Mid is ${mid}`)
    if(nums[left] < nums[right]) {
      console.log(`${nums[left]} < ${nums[right]}`)
      if(nums[mid] === target) {
        break;
      }
      if(target > nums[mid]) {
        left = mid  +1
      } else {
        right = mid  -1
      }
    } else  {
      // find the pivot side first
      if(target > nums[right]) {
        // all values in the pivoted sub array are small
        console.log(`Pivoted: target ${target}  right ${right}=> ${nums[right]}`)
        right = mid - 1
      } else  {
        console.log(`Pivoted: target ${target} left ${left}=> ${nums[left]}`)
        left = mid + 1
      }
    }
  }
  console.log(` target is : ${target} left ${left}: ${nums[left]} , right ${right}: ${nums[right]}`)
  console.log(`Found at ${mid}`)
};

// search([4,5,6,7,1,2,3], 4)


const pivoted = [4,5,6,7,8,1,2]
const findPivotIndex = (arr) => {
  let i, j
  for(i =0, j = 1; i < arr.length - 1 && j < arr.length -1; i++, j++) {
    if(arr[j] < arr[i]) {
      break;
    }
  }
  return j
}
function countRotations(arr, ) {
      let  n = arr.length
      let low =0 , high = n-1;
      while(low<=high){
          let mid = Math.floor((high+low)/2) ;
          let prev = (mid-1 + n)  %n , next = (mid+1)%n;//if first element is mid or
        //last element is mid then simply use modulo so it never goes out of bound.
          if(arr[mid]<=arr[prev] && arr[mid]<=arr[next])
            return mid;
          else if (arr[mid]<=arr[high])
            high = mid-1 ;
          else if (arr[mid]>=arr[low])
            low=mid+1;
      }
      return 0;
}
const index = findPivotIndex(pivoted)
console.log(`Index of rotation is `, index, 'with value ', pivoted[index])

const bIndex = countRotations(pivoted)
console.log(`Index of rotation is `, bIndex, 'with value ', pivoted[bIndex])