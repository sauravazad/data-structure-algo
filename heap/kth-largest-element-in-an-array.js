/**
  https://leetcode.com/problems/kth-largest-element-in-an-array/description/
 */
// Driver code
class Heap {
  constructor (comparator = (parent, node) => parent <= node) {
    this.comparator = comparator
    this.heap = []
    this.count = 0
  }

  push (element) {
    this.heap.push(element)
    this.count++
    this.heapifyUp(this.heap.length - 1)
  }

  findKthLargest (nums, k) {
    /**
     Intuition:
      when you construct a min/max heap the smallest/largest element is the root node.
      So if if you are to find the k largest think do you need min or max heap in order to find the kth element
      Note : you need to restrict the heap size to k(no of element you want to find) and construct a opposite heap
      what will happen that you will have kth smallest element at the top and that is all you need
     */
    let i = 0

    // push the k elements to the heap as usual
    while (i < k) {
      this.push(nums[i])
      i++
    }
    /*
     once we have the k elements in the heap ,
     check if the current element is larger than root  node since we are trying to find kth largest
      if YES :
        then drop the root node and insert the new node at the top
        else skip the element
     */
    while (i < nums.length) {
      const root = this.heap[0]
      const current = nums[i]
      if (current > root) {
        this.pop()
        this.push(current)
      }
      i++
    }
    console.info(this.heap)
  }

  pop () {
    this.heap[0] = this.heap[this.heap.length - 1]
    this.heap.pop()
    this.count--
    this.heapifyDown(0)
  }

  heapifyDown (nodeIndex) {
    const leftIndex = (nodeIndex * 2) + 1
    const rightIndex = (nodeIndex * 2) + 2
    let swapIndex = nodeIndex

    // check if the comparison parent and left child condition is valid
    if (leftIndex < this.heap.length && this.comparator(this.heap[swapIndex], this.heap[leftIndex]) == false) {
      swapIndex = leftIndex
    }
    if (rightIndex < this.heap.length && this.comparator(this.heap[swapIndex], this.heap[rightIndex]) == false) {
      swapIndex = rightIndex
    }
    if (swapIndex !== nodeIndex) {
      // swap the elements
      [this.heap[swapIndex], this.heap[nodeIndex]] = [this.heap[nodeIndex], this.heap[swapIndex]]
      this.heapifyDown(swapIndex)
    }
  }

  heapifyUp (nodeIndex) {
    // check if the nodes parent is greater
    const parentIndex = Math.floor((nodeIndex - 1) / 2)
    const child = this.heap[nodeIndex]
    const parent = this.heap[parentIndex]
    if (nodeIndex > 0 && this.comparator(parent, child) == false) {
      // swap the parent and child
      [this.heap[parentIndex], this.heap[nodeIndex]] = [this.heap[nodeIndex], this.heap[parentIndex]]
      this.heapifyUp(parentIndex)
    }
  }
}

const findKthLargest = function (nums, k) {
  const minHeap = new Heap()
  minHeap.findKthLargest(nums, k)
  return minHeap.heap[0]
}

const main = function () {
  const fn = findKthLargest
  const input = [
    [[2, 1], 2]
    // [[3,2,1,5,6,4], 2],
    // [[3,2,3,1,2,4,5,5,6], 4],
  ]
  /**
   *  Fill the time complexity for each function
   */

  for (let i = 0; i < input.length; i++) {
    console.log(i + 1 + '.\t Input array: \t', input[i])
    const result = fn(...input[i])
    console.log('\t Result is \t: ', result)
    console.log('-'.repeat(100))
  }
}

main()
