class PriorityQueue {
  constructor(comparator= (a, b) => a <= b) {
    this.heap = []
    this.count = 0
    this.comparator = comparator
  }

  size () {
    return this.heap.length -1
  }

  push(element) {
    /**
     - push the element to the end of the array
     
     */
    const insertIndex = this.heap.push(element) -1
    // need to heapify down only when 
    if(this.heap.length > 1) {
      this.heapifyUp(insertIndex)
    }
    // console.info(this.heap)
  }

  buildHeap(elements = []) {
    for(let elem of elements) {
      this.push(elem)
    }
  }
  pop() {
    /**
     - pop the top element
     - assign the last element from the array to the rot node
     - call heapifyDown on root node
     */
    const element = this.heap[0]
    if (this.heap.length > 1) {
      this.heap[0] = this.heap[this.heap.length -1] // assign the last element from the array to root node
    }
    this.heap.pop()
    // call the heapify down
    this.heapifyDown(0)
    return element
  }
  heapifyUp(nodeIndex) {
    /**
      - check the heap condition using comparator : ie: min/max parent vs child
      - true : do nothing
      - false :
        - find the min/max of the child node and swap it with parent node
        - call heapifyUp(switched_child_node) 
     */
    // console.info(`heapifyUp: childIndex: ${nodeIndex}`)
    if (nodeIndex == 0) return
    const parentIndex = Math.floor((nodeIndex -1) / 2)
    // if the heap condition fails 
    if (this.comparator(this.heap[parentIndex] , this.heap[nodeIndex]) == false) {
      // then : swap the node with the parent and heapify on the parent
      [this.heap[parentIndex], this.heap[nodeIndex]] = [ this.heap[nodeIndex], this.heap[parentIndex]]
      this.heapifyUp(parentIndex)
    }
    
  }
  heapifyDown(nodeIndex) {
    /**
      check the parent node satisfies the heap property suing comparator
      if true : do nothing
      else :
       swap the parent node with the child node 
       call heapifyDown(swapped childNode)
     */
    const leftChild = (2 * nodeIndex) + 1
    const rightChild = (2 * nodeIndex) + 2
    const parent = this.heap[nodeIndex]
    let swapIndex = nodeIndex
    // check the condition that parent is min/max from the child

    if(leftChild < this.heap.length && this.comparator(this.heap[leftChild], parent)) {
      swapIndex = leftChild
    }
    if(rightChild < this.heap.length && this.comparator(this.heap[rightChild], this.heap[swapIndex])) {
      // additionally check if right is still greater/smaller according to heap
      // if (this.comparator(this.heap[rightChild], this.heap[leftChild])) {
        swapIndex = rightChild
      // }
      
    }
    // if heap condition is not valid 
    // swap the parent and invalid condition child node
    // console.info(`swapIndex: ${swapIndex} : value ${this.heap[swapIndex]}, nodeIndex: ${nodeIndex} : value ${this.heap[nodeIndex]}`)
    if(swapIndex != nodeIndex) {
      // swap the parent and child
      [this.heap[nodeIndex], this.heap[swapIndex]] = [ this.heap[swapIndex], this.heap[nodeIndex]]
      this.heapifyDown(swapIndex)
    }
  }

  buildKItemsPriority(elements, k) {

  }

  sort() {
    const sorted = []
    while(this.heap.length) {
      sorted.push(this.pop())
    }
    return sorted
  }
}

function main() {
  const minHeap = new PriorityQueue()
  const items  = [2, 7, 26, 25, 19, 17, 1, 90, 3, 36]
  minHeap.buildHeap(items)
  // minHeap.push(2)
  // minHeap.push(7)
  // minHeap.push(26)
  // minHeap.push(25)
  // minHeap.push(19)
  // minHeap.buildHeap(items)  
  console.info('Heap array structure \n')
  console.info(minHeap.heap)
  // console.info("sorted- \n", minHeap.sort())
}

main()