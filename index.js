function ListNode(val, next) {
  this.val = val === undefined ? 0 : val;
  this.next = next === undefined ? null : next;
}

class linkedList {
  constructor() {
    this.head = null
  }

  insert(data) {
    const node = new ListNode(data)
    let temp = this.head
    if (temp === null) {
      this.head = node
    } else {
      while(temp.next) {
        temp = temp.next
      }
      temp.next = node
    }
    console.info(`inserted node with value `, node.val)
  }
  print() {
    let head = this.head
    while(head) {
      console.info(head.val)
      head = head.next
    }
  }
  pop() {
    let head = this.head
    while(head.next) {
      if(head.next.next) {
        head = head.next
      } else {
        console.info(`popped node with value `, head.next.val)
        head.next = null
      }
    }
  }
}
const l1 = new linkedList()
l1.insert(1)
l1.insert(2)
l1.insert(3)
l1.insert(4)
l1.insert(5)
l1.print()

l1.pop()
l1.pop()
l1.print()