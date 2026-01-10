class Queue {
  constructor(size) {
    this.vector = Array(size)
    this.size = size
    this.head = -1
    this.tail = -1
  }
  enqueue(element) {
    if(this.isFull()) return false
    if(this.isEmpty()) this.head = 0
    this.tail = parseInt((this.tail + 1) % this.size)
    this.vector[this.tail] = element
    return element
  }
  dequeue() {
    if(this.isEmpty()) return false
    if(this.head === this.tail) {
      this.head = this.tail = -1
      return true
    }
    this.head = parseInt((this.head + 1) % this.size)
    return true
  }
  front() {
   if(this.isEmpty()) return -1
   return this.vector[this.head] 
  }

  rear() {
    if(this.isEmpty()) return -1
    return this.vector[this.tail]
  }

  isEmpty () {
    return this.head === -1
  }

  isFull() {
    return this.tail + 1 % this.size === this.head
  }
}

// Driver code
var main = function () {
  const q = new Queue(10)
  q.enqueue(2)
  q.enqueue(3)
  
  q.dequeue()
  q.enqueue(4)
  // q.dequeue()
  // q.dequeue()
  console.info(q.vector)
  console.info(q)
  
}

main();
