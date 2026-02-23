class PriorityQueue {
  constructor (comparator = (parent, node) => parent <= node) {
    this.heap = []
    this.count = 0
    this.comparator = comparator
  }

  buildHeap (list) {
    list.forEach(item => {
      this.push(item)
    })
  }

  sort () {
    const list = []
    while (this.heap.length > 0) {
      list.push(this.pop())
    }
    return list
  }

  push (element) {
    const pushIndex = this.heap.push(element) - 1
    this.count++
    if (this.count > 1) {
      // heapify up
      this.heapifyUp(pushIndex)
    }
  }

  heapifyUp (nodeIndex) {
    const parentIndex = Math.floor((nodeIndex - 1) / 2)
    if (nodeIndex > 0 && this.comparator(this.heap[parentIndex], this.heap[nodeIndex]) === false) {
      // swap
      [this.heap[parentIndex], this.heap[nodeIndex]] = [this.heap[nodeIndex], this.heap[parentIndex]]
      // further check if parent are following heap condition
      this.heapifyUp(parentIndex)
    }
  }

  pop () {
    const element = this.heap[0]
    if (this.heap.length > 1) {
      this.heap[0] = this.heap[this.heap.length - 1]
    }
    this.heap.pop()
    // heapify down starting from root node
    this.heapifyDown(0)
    return element
  }

  heapifyDown (nodeIndex) {
    let swapIndex = nodeIndex
    const leftIndex = (swapIndex * 2) + 1
    const rightIndex = (swapIndex * 2) + 2

    // compare the parent with left and the right
    if (leftIndex < this.heap.length && this.comparator(this.heap[swapIndex], this.heap[leftIndex]) === false) {
      swapIndex = leftIndex
    }
    if (rightIndex < this.heap.length && this.comparator(this.heap[swapIndex], this.heap[rightIndex]) === false) {
      swapIndex = rightIndex
    }

    if (swapIndex !== nodeIndex) {
      // swap and heapify down
      [this.heap[swapIndex], this.heap[nodeIndex]] = [this.heap[nodeIndex], this.heap[swapIndex]]
      this.heapifyDown(swapIndex)
    }
  }
}

/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number[]}
 */
const topKFrequent = function (nums, k) {
  /**
   Intuition:
    think of numbers frequency as its priority order
    So we need to build a heap that holds top k frequent number
   */

  // 1. create a hash map of number and their frequency
  const frequencyMap = {}
  nums.forEach((num) => {
    if (frequencyMap[num] === undefined) { frequencyMap[num] = 0 }
    frequencyMap[num]++
  })
  // 2. Build the heap of top k elements
  // 3. return the result in form of array
  const minHeap = new PriorityQueue()
  minHeap.buildHeap(nums)
  console.info(minHeap.sort())
}


// Driver code
const main = function () {
  const fn = topKFrequent
  const input = [
    [[1, 1, 1, 2, 2, 3], 2],
    [[1], 1],
    [[1, 2, 1, 2, 1, 2, 3, 1, 3, 2], 2]
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
