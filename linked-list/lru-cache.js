/*
Problem link : https://leetcode.com/problems/lru-cache/
------------------------------------------------------------------------------------
Description: 146. LRU Cache

Design a data structure that follows the constraints of a Least Recently Used (LRU) cache.

Implement the LRUCache class:

    LRUCache(int capacity) Initialize the LRU cache with positive size capacity.
    int get(int key) Return the value of the key if the key exists, otherwise return -1.
    void put(int key, int value) Update the value of the key if the key exists. Otherwise, add the key-value pair to the cache. If the number of keys exceeds the capacity from this operation, evict the least recently used key.

The functions get and put must each run in O(1) average time complexity.

------------------------------------------------------------------------------------
Example:
Example 1:

Input
["LRUCache", "put", "put", "get", "put", "get", "put", "get", "get", "get"]
[[2], [1, 1], [2, 2], [1], [3, 3], [2], [4, 4], [1], [3], [4]]
Output
[null, null, null, 1, null, -1, null, -1, 3, 4]

Explanation
LRUCache lRUCache = new LRUCache(2);
lRUCache.put(1, 1); // cache is {1=1}
lRUCache.put(2, 2); // cache is {1=1, 2=2}
lRUCache.get(1);    // return 1
lRUCache.put(3, 3); // LRU key was 2, evicts key 2, cache is {1=1, 3=3}
lRUCache.get(2);    // returns -1 (not found)
lRUCache.put(4, 4); // LRU key was 1, evicts key 1, cache is {4=4, 3=3}
lRUCache.get(1);    // return -1 (not found)
lRUCache.get(3);    // return 3
lRUCache.get(4);    // return 4


------------------------------------------------------------------------------------
Input:

------------------------------------------------------------------------------------
Constraints:

------------------------------------------------------------------------------------

*/

/**
 Intuition: 
 Time Complexity: 
 Space Complexity:
 Notes: 
 */
/**
 * @param {number} capacity
 */

 
class Node {
    constructor(key, value) {
        this.key = key;
        this.value = value;
        this.next = null;
        this.prev = null;
    }
}
class LRUCache {
    constructor(capacity) {
        this.capacity = capacity;
        this.dic = new Map();
        this.head = new Node(-1, -1);
        this.tail = new Node(-1, -1);
        this.head.next = this.tail;
        this.tail.prev = this.head;
    }
    get(key) {
        if (!this.dic.has(key)) {
            return -1;
        }
        let node = this.dic.get(key);
        this.remove(node);
        this.add(node);
        return node.value;
    }
    put(key, value) {
        if (this.dic.has(key)) {
            this.remove(this.dic.get(key));
        }
        let node = new Node(key, value);
        this.add(node);
        this.dic.set(key, node);
        if (this.dic.size > this.capacity) {
            let nodeToDelete = this.head.next;
            this.remove(nodeToDelete);
            this.dic.delete(nodeToDelete.key);
        }
    }
    add(node) {
        let pre = this.tail.prev;
        pre.next = node;
        node.prev = pre;
        node.next = this.tail;
        this.tail.prev = node;
    }
    remove(node) {
        let pre = node.prev;
        let nxt = node.next;
        pre.next = nxt;
        nxt.prev = pre;
    }
}
// For initiating and calling
// let obj = new LRUCache(capacity);
// let param_1 = obj.get(key);
// obj.put(key,value);

/** 
 * Your LRUCache object will be instantiated and called as such:
 * var obj = new LRUCache(capacity)
 * var param_1 = obj.get(key)
 * obj.put(key,value)
 */
// Driver code
 

var main = function () {
  const fn = LRUCache
  const input = []
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