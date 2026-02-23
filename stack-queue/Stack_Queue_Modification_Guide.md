# Minimum Stack / Minimum Queue

A comprehensive guide to modifying stack and queue data structures to support finding the minimum element in O(1) time.

## Table of Contents
- [Overview](#overview)
- [Stack Modification](#stack-modification)
- [Queue Modification Method 1](#queue-modification-method-1)
- [Queue Modification Method 2](#queue-modification-method-2)
- [Queue Modification Method 3](#queue-modification-method-3)
- [Finding Minimum in Subarrays](#finding-minimum-in-subarrays)
- [Practice Problems](#practice-problems)

---

## Overview

This article explores three key problems:
1. **Modify a stack** to find the smallest element in O(1) time
2. **Modify a queue** to find the smallest element in O(1) time
3. **Find the minimum in all subarrays** of a fixed length in an array in O(n) time

---

## Stack Modification

### Concept

We modify the stack to store pairs: `(element, minimum)` where the minimum is the smallest element from this position down to the bottom of the stack.

### Visual Representation

```
Stack with pairs (element, minimum):

Push 5:  [(5, 5)]
Push 3:  [(5, 5), (3, 3)]
Push 7:  [(5, 5), (3, 3), (7, 3)]
Push 2:  [(5, 5), (3, 3), (7, 3), (2, 2)]
         
         Top → (2, 2)  ← Current minimum is 2
               (7, 3)
               (3, 3)
         Bottom → (5, 5)
```

### Operations

- **Finding minimum**: O(1) - Just look at `stack.top().second`
- **Adding element**: O(1) - Compare with current minimum
- **Removing element**: O(1) - Just pop

### Implementation

#### C++

```cpp
#include <iostream>
#include <stack>
#include <algorithm>
using namespace std;

class MinStack {
private:
    stack<pair<int, int>> st; // pair<element, minimum>
    
public:
    // Add an element to the stack
    void push(int new_elem) {
        int new_min = st.empty() ? new_elem : min(new_elem, st.top().second);
        st.push({new_elem, new_min});
    }
    
    // Remove the top element
    void pop() {
        if (!st.empty()) {
            st.pop();
        }
    }
    
    // Get the minimum element
    int getMin() {
        if (st.empty()) {
            throw runtime_error("Stack is empty");
        }
        return st.top().second;
    }
    
    // Get the top element
    int top() {
        if (st.empty()) {
            throw runtime_error("Stack is empty");
        }
        return st.top().first;
    }
    
    // Check if stack is empty
    bool empty() {
        return st.empty();
    }
};

// Example usage
int main() {
    MinStack minStack;
    
    minStack.push(5);
    cout << "Pushed 5, Min: " << minStack.getMin() << endl;
    
    minStack.push(3);
    cout << "Pushed 3, Min: " << minStack.getMin() << endl;
    
    minStack.push(7);
    cout << "Pushed 7, Min: " << minStack.getMin() << endl;
    
    minStack.push(2);
    cout << "Pushed 2, Min: " << minStack.getMin() << endl;
    
    minStack.pop();
    cout << "Popped, Min: " << minStack.getMin() << endl;
    
    return 0;
}
```

#### Python

```python
class MinStack:
    def __init__(self):
        self.stack = []  # List of tuples (element, minimum)
    
    def push(self, new_elem):
        """Add an element to the stack"""
        if not self.stack:
            new_min = new_elem
        else:
            new_min = min(new_elem, self.stack[-1][1])
        self.stack.append((new_elem, new_min))
    
    def pop(self):
        """Remove the top element"""
        if self.stack:
            removed = self.stack.pop()
            return removed[0]
        return None
    
    def get_min(self):
        """Get the minimum element in O(1)"""
        if not self.stack:
            raise IndexError("Stack is empty")
        return self.stack[-1][1]
    
    def top(self):
        """Get the top element"""
        if not self.stack:
            raise IndexError("Stack is empty")
        return self.stack[-1][0]
    
    def is_empty(self):
        """Check if stack is empty"""
        return len(self.stack) == 0

# Example usage
if __name__ == "__main__":
    min_stack = MinStack()
    
    min_stack.push(5)
    print(f"Pushed 5, Min: {min_stack.get_min()}")
    
    min_stack.push(3)
    print(f"Pushed 3, Min: {min_stack.get_min()}")
    
    min_stack.push(7)
    print(f"Pushed 7, Min: {min_stack.get_min()}")
    
    min_stack.push(2)
    print(f"Pushed 2, Min: {min_stack.get_min()}")
    
    min_stack.pop()
    print(f"Popped, Min: {min_stack.get_min()}")
```

#### JavaScript

```javascript
class MinStack {
    constructor() {
        this.stack = []; // Array of objects {element, minimum}
    }
    
    // Add an element to the stack
    push(newElem) {
        const newMin = this.stack.length === 0 
            ? newElem 
            : Math.min(newElem, this.stack[this.stack.length - 1].minimum);
        this.stack.push({ element: newElem, minimum: newMin });
    }
    
    // Remove the top element
    pop() {
        if (this.stack.length > 0) {
            return this.stack.pop().element;
        }
        return null;
    }
    
    // Get the minimum element in O(1)
    getMin() {
        if (this.stack.length === 0) {
            throw new Error("Stack is empty");
        }
        return this.stack[this.stack.length - 1].minimum;
    }
    
    // Get the top element
    top() {
        if (this.stack.length === 0) {
            throw new Error("Stack is empty");
        }
        return this.stack[this.stack.length - 1].element;
    }
    
    // Check if stack is empty
    isEmpty() {
        return this.stack.length === 0;
    }
}

// Example usage
const minStack = new MinStack();

minStack.push(5);
console.log(`Pushed 5, Min: ${minStack.getMin()}`);

minStack.push(3);
console.log(`Pushed 3, Min: ${minStack.getMin()}`);

minStack.push(7);
console.log(`Pushed 7, Min: ${minStack.getMin()}`);

minStack.push(2);
console.log(`Pushed 2, Min: ${minStack.getMin()}`);

minStack.pop();
console.log(`Popped, Min: ${minStack.getMin()}`);
```

---

## Queue Modification (Method 1)

### Concept

Store elements in **non-decreasing order** (smallest at head). Before adding a new element, remove all trailing elements larger than the new element.

### Visual Representation

```
Adding elements: 5, 3, 7, 2

Step 1: Add 5
Queue: [5]

Step 2: Add 3 (remove 5 since 5 > 3)
Queue: [3]

Step 3: Add 7 (7 > 3, so just add)
Queue: [3, 7]

Step 4: Add 2 (remove 7 and 3 since both > 2)
Queue: [2]

Minimum is always at the front!
```

### Key Points

- **Disadvantage**: Doesn't store all elements
- **Advantage**: Simple implementation
- **Time Complexity**: O(1) amortized for all operations

### Implementation

#### C++

```cpp
#include <iostream>
#include <deque>
using namespace std;

class MinQueue {
private:
    deque<int> q;
    
public:
    // Find minimum in O(1)
    int getMin() {
        if (q.empty()) {
            throw runtime_error("Queue is empty");
        }
        return q.front();
    }
    
    // Add element
    void push(int new_element) {
        while (!q.empty() && q.back() > new_element) {
            q.pop_back();
        }
        q.push_back(new_element);
    }
    
    // Remove element (only if it matches the value)
    void pop(int remove_element) {
        if (!q.empty() && q.front() == remove_element) {
            q.pop_front();
        }
    }
    
    bool empty() {
        return q.empty();
    }
};

// Example usage
int main() {
    MinQueue mq;
    
    mq.push(5);
    cout << "Pushed 5, Min: " << mq.getMin() << endl;
    
    mq.push(3);
    cout << "Pushed 3, Min: " << mq.getMin() << endl;
    
    mq.push(7);
    cout << "Pushed 7, Min: " << mq.getMin() << endl;
    
    mq.pop(5);
    cout << "Tried to pop 5, Min: " << mq.getMin() << endl;
    
    mq.pop(3);
    cout << "Popped 3, Min: " << mq.getMin() << endl;
    
    return 0;
}
```

#### Python

```python
from collections import deque

class MinQueue:
    def __init__(self):
        self.q = deque()
    
    def get_min(self):
        """Get minimum in O(1)"""
        if not self.q:
            raise IndexError("Queue is empty")
        return self.q[0]
    
    def push(self, new_element):
        """Add element"""
        while self.q and self.q[-1] > new_element:
            self.q.pop()
        self.q.append(new_element)
    
    def pop(self, remove_element):
        """Remove element (only if it matches)"""
        if self.q and self.q[0] == remove_element:
            self.q.popleft()
    
    def is_empty(self):
        return len(self.q) == 0

# Example usage
if __name__ == "__main__":
    mq = MinQueue()
    
    mq.push(5)
    print(f"Pushed 5, Min: {mq.get_min()}")
    
    mq.push(3)
    print(f"Pushed 3, Min: {mq.get_min()}")
    
    mq.push(7)
    print(f"Pushed 7, Min: {mq.get_min()}")
    
    mq.pop(5)
    print(f"Tried to pop 5, Min: {mq.get_min()}")
    
    mq.pop(3)
    print(f"Popped 3, Min: {mq.get_min()}")
```

#### JavaScript

```javascript
class MinQueue {
    constructor() {
        this.q = [];
    }
    
    // Get minimum in O(1)
    getMin() {
        if (this.q.length === 0) {
            throw new Error("Queue is empty");
        }
        return this.q[0];
    }
    
    // Add element
    push(newElement) {
        while (this.q.length > 0 && this.q[this.q.length - 1] > newElement) {
            this.q.pop();
        }
        this.q.push(newElement);
    }
    
    // Remove element (only if it matches)
    pop(removeElement) {
        if (this.q.length > 0 && this.q[0] === removeElement) {
            this.q.shift();
        }
    }
    
    isEmpty() {
        return this.q.length === 0;
    }
}

// Example usage
const mq = new MinQueue();

mq.push(5);
console.log(`Pushed 5, Min: ${mq.getMin()}`);

mq.push(3);
console.log(`Pushed 3, Min: ${mq.getMin()}`);

mq.push(7);
console.log(`Pushed 7, Min: ${mq.getMin()}`);

mq.pop(5);
console.log(`Tried to pop 5, Min: ${mq.getMin()}`);

mq.pop(3);
console.log(`Popped 3, Min: ${mq.getMin()}`);
```

---

## Queue Modification (Method 2)

### Concept

Store elements with their **index** and track counts of added/removed elements. This allows removal without knowing the element value.

### Visual Representation

```
Queue with indices:

Add 5 (index 0): [(5, 0)]  cnt_added=1, cnt_removed=0
Add 3 (index 1): [(3, 1)]  cnt_added=2, cnt_removed=0
Add 7 (index 2): [(3, 1), (7, 2)]  cnt_added=3, cnt_removed=0

Remove: Check if front index == cnt_removed
        If yes, remove it
        cnt_removed++
```

### Implementation

#### C++

```cpp
#include <iostream>
#include <deque>
using namespace std;

class MinQueueWithIndex {
private:
    deque<pair<int, int>> q; // pair<value, index>
    int cnt_added = 0;
    int cnt_removed = 0;
    
public:
    int getMin() {
        if (q.empty()) {
            throw runtime_error("Queue is empty");
        }
        return q.front().first;
    }
    
    void push(int new_element) {
        while (!q.empty() && q.back().first > new_element) {
            q.pop_back();
        }
        q.push_back({new_element, cnt_added});
        cnt_added++;
    }
    
    void pop() {
        if (!q.empty() && q.front().second == cnt_removed) {
            q.pop_front();
        }
        cnt_removed++;
    }
    
    bool empty() {
        return cnt_added == cnt_removed;
    }
};

// Example usage
int main() {
    MinQueueWithIndex mq;
    
    mq.push(5);
    cout << "Pushed 5, Min: " << mq.getMin() << endl;
    
    mq.push(3);
    cout << "Pushed 3, Min: " << mq.getMin() << endl;
    
    mq.push(7);
    cout << "Pushed 7, Min: " << mq.getMin() << endl;
    
    mq.pop();
    cout << "Popped, Min: " << mq.getMin() << endl;
    
    return 0;
}
```

#### Python

```python
from collections import deque

class MinQueueWithIndex:
    def __init__(self):
        self.q = deque()  # deque of tuples (value, index)
        self.cnt_added = 0
        self.cnt_removed = 0
    
    def get_min(self):
        if not self.q:
            raise IndexError("Queue is empty")
        return self.q[0][0]
    
    def push(self, new_element):
        while self.q and self.q[-1][0] > new_element:
            self.q.pop()
        self.q.append((new_element, self.cnt_added))
        self.cnt_added += 1
    
    def pop(self):
        if self.q and self.q[0][1] == self.cnt_removed:
            self.q.popleft()
        self.cnt_removed += 1
    
    def is_empty(self):
        return self.cnt_added == self.cnt_removed

# Example usage
if __name__ == "__main__":
    mq = MinQueueWithIndex()
    
    mq.push(5)
    print(f"Pushed 5, Min: {mq.get_min()}")
    
    mq.push(3)
    print(f"Pushed 3, Min: {mq.get_min()}")
    
    mq.push(7)
    print(f"Pushed 7, Min: {mq.get_min()}")
    
    mq.pop()
    print(f"Popped, Min: {mq.get_min()}")
```

#### JavaScript

```javascript
class MinQueueWithIndex {
    constructor() {
        this.q = [];  // Array of objects {value, index}
        this.cntAdded = 0;
        this.cntRemoved = 0;
    }
    
    getMin() {
        if (this.q.length === 0) {
            throw new Error("Queue is empty");
        }
        return this.q[0].value;
    }
    
    push(newElement) {
        while (this.q.length > 0 && this.q[this.q.length - 1].value > newElement) {
            this.q.pop();
        }
        this.q.push({ value: newElement, index: this.cntAdded });
        this.cntAdded++;
    }
    
    pop() {
        if (this.q.length > 0 && this.q[0].index === this.cntRemoved) {
            this.q.shift();
        }
        this.cntRemoved++;
    }
    
    isEmpty() {
        return this.cntAdded === this.cntRemoved;
    }
}

// Example usage
const mq = new MinQueueWithIndex();

mq.push(5);
console.log(`Pushed 5, Min: ${mq.getMin()}`);

mq.push(3);
console.log(`Pushed 3, Min: ${mq.getMin()}`);

mq.push(7);
console.log(`Pushed 7, Min: ${mq.getMin()}`);

mq.pop();
console.log(`Popped, Min: ${mq.getMin()}`);
```

---

## Queue Modification (Method 3)

### Concept

Use **two modified stacks** (s1 and s2) to simulate a queue. Elements are added to s1 and removed from s2. When s2 is empty, transfer all elements from s1 to s2.

### Visual Representation

```
Two-Stack Queue:

Initial: s1=[], s2=[]

Add 5: s1=[5], s2=[]
Add 3: s1=[5,3], s2=[]
Add 7: s1=[5,3,7], s2=[]

Remove: s2 is empty, transfer from s1
        s1=[], s2=[7,3,5]
        Remove from s2: 5
        s1=[], s2=[7,3]

Add 2: s1=[2], s2=[7,3]

Minimum = min(s1.min, s2.min) = min(2, 3) = 2
```

### Time Complexity

Each element is pushed once to s1 and popped once from s1, then pushed once to s2 and popped once from s2. Therefore, **O(1) amortized** for all operations.

### Implementation

#### C++

```cpp
#include <iostream>
#include <stack>
#include <algorithm>
using namespace std;

class MinQueueTwoStacks {
private:
    stack<pair<int, int>> s1, s2; // pair<element, minimum>
    
    int getStackMin(stack<pair<int, int>>& s) {
        return s.empty() ? INT_MAX : s.top().second;
    }
    
public:
    int getMin() {
        if (s1.empty() && s2.empty()) {
            throw runtime_error("Queue is empty");
        }
        return min(getStackMin(s1), getStackMin(s2));
    }
    
    void push(int new_element) {
        int new_min = s1.empty() ? new_element : min(new_element, s1.top().second);
        s1.push({new_element, new_min});
    }
    
    void pop() {
        if (s2.empty()) {
            // Transfer all elements from s1 to s2
            while (!s1.empty()) {
                int element = s1.top().first;
                s1.pop();
                int new_min = s2.empty() ? element : min(element, s2.top().second);
                s2.push({element, new_min});
            }
        }
        if (!s2.empty()) {
            s2.pop();
        }
    }
    
    bool empty() {
        return s1.empty() && s2.empty();
    }
};

// Example usage
int main() {
    MinQueueTwoStacks mq;
    
    mq.push(5);
    cout << "Pushed 5, Min: " << mq.getMin() << endl;
    
    mq.push(3);
    cout << "Pushed 3, Min: " << mq.getMin() << endl;
    
    mq.push(7);
    cout << "Pushed 7, Min: " << mq.getMin() << endl;
    
    mq.pop();
    cout << "Popped, Min: " << mq.getMin() << endl;
    
    mq.push(2);
    cout << "Pushed 2, Min: " << mq.getMin() << endl;
    
    return 0;
}
```

#### Python

```python
class MinQueueTwoStacks:
    def __init__(self):
        self.s1 = []  # List of tuples (element, minimum)
        self.s2 = []
    
    def _get_stack_min(self, stack):
        return float('inf') if not stack else stack[-1][1]
    
    def get_min(self):
        if not self.s1 and not self.s2:
            raise IndexError("Queue is empty")
        return min(self._get_stack_min(self.s1), self._get_stack_min(self.s2))
    
    def push(self, new_element):
        new_min = new_element if not self.s1 else min(new_element, self.s1[-1][1])
        self.s1.append((new_element, new_min))
    
    def pop(self):
        if not self.s2:
            # Transfer all elements from s1 to s2
            while self.s1:
                element = self.s1.pop()[0]
                new_min = element if not self.s2 else min(element, self.s2[-1][1])
                self.s2.append((element, new_min))
        
        if self.s2:
            return self.s2.pop()[0]
        return None
    
    def is_empty(self):
        return len(self.s1) == 0 and len(self.s2) == 0

# Example usage
if __name__ == "__main__":
    mq = MinQueueTwoStacks()
    
    mq.push(5)
    print(f"Pushed 5, Min: {mq.get_min()}")
    
    mq.push(3)
    print(f"Pushed 3, Min: {mq.get_min()}")
    
    mq.push(7)
    print(f"Pushed 7, Min: {mq.get_min()}")
    
    mq.pop()
    print(f"Popped, Min: {mq.get_min()}")
    
    mq.push(2)
    print(f"Pushed 2, Min: {mq.get_min()}")
```

#### JavaScript

```javascript
class MinQueueTwoStacks {
    constructor() {
        this.s1 = [];  // Array of objects {element, minimum}
        this.s2 = [];
    }
    
    _getStackMin(stack) {
        return stack.length === 0 ? Infinity : stack[stack.length - 1].minimum;
    }
    
    getMin() {
        if (this.s1.length === 0 && this.s2.length === 0) {
            throw new Error("Queue is empty");
        }
        return Math.min(this._getStackMin(this.s1), this._getStackMin(this.s2));
    }
    
    push(newElement) {
        const newMin = this.s1.length === 0 
            ? newElement 
            : Math.min(newElement, this.s1[this.s1.length - 1].minimum);
        this.s1.push({ element: newElement, minimum: newMin });
    }
    
    pop() {
        if (this.s2.length === 0) {
            // Transfer all elements from s1 to s2
            while (this.s1.length > 0) {
                const element = this.s1.pop().element;
                const newMin = this.s2.length === 0 
                    ? element 
                    : Math.min(element, this.s2[this.s2.length - 1].minimum);
                this.s2.push({ element: element, minimum: newMin });
            }
        }
        
        if (this.s2.length > 0) {
            return this.s2.pop().element;
        }
        return null;
    }
    
    isEmpty() {
        return this.s1.length === 0 && this.s2.length === 0;
    }
}

// Example usage
const mq = new MinQueueTwoStacks();

mq.push(5);
console.log(`Pushed 5, Min: ${mq.getMin()}`);

mq.push(3);
console.log(`Pushed 3, Min: ${mq.getMin()}`);

mq.push(7);
console.log(`Pushed 7, Min: ${mq.getMin()}`);

mq.pop();
console.log(`Popped, Min: ${mq.getMin()}`);

mq.push(2);
console.log(`Pushed 2, Min: ${mq.getMin()}`);
```

---

## Finding Minimum in Subarrays

### Problem

Given an array A of length N and a value M ≤ N, find the minimum of each subarray of length M.

```
Example:
Array: [3, 5, 1, 8, 2, 7, 4]
M = 3

Subarrays and their minimums:
[3, 5, 1] → min = 1
[5, 1, 8] → min = 1
[1, 8, 2] → min = 1
[8, 2, 7] → min = 2
[2, 7, 4] → min = 2
```

### Solution

Use any of the three modified queue methods. Add the first M elements, output minimum, then slide the window: remove first element, add next element, output minimum.

### Visual Representation

```
Sliding Window:

Array: [3, 5, 1, 8, 2, 7, 4], M=3

Window 1: [3, 5, 1] → min = 1
          -------

Window 2:    [5, 1, 8] → min = 1
             -------

Window 3:       [1, 8, 2] → min = 1
                -------

Window 4:          [8, 2, 7] → min = 2
                   -------

Window 5:             [2, 7, 4] → min = 2
                      -------
```

### Implementation

#### C++

```cpp
#include <iostream>
#include <vector>
#include <deque>
using namespace std;

vector<int> findMinInSubarrays(vector<int>& arr, int M) {
    vector<int> result;
    deque<pair<int, int>> q; // pair<value, index>
    int cnt_added = 0, cnt_removed = 0;
    
    // Add first M elements
    for (int i = 0; i < M && i < arr.size(); i++) {
        while (!q.empty() && q.back().first > arr[i]) {
            q.pop_back();
        }
        q.push_back({arr[i], cnt_added});
        cnt_added++;
    }
    result.push_back(q.front().first);
    
    // Slide the window
    for (int i = M; i < arr.size(); i++) {
        // Remove first element of previous window
        if (!q.empty() && q.front().second == cnt_removed) {
            q.pop_front();
        }
        cnt_removed++;
        
        // Add new element
        while (!q.empty() && q.back().first > arr[i]) {
            q.pop_back();
        }
        q.push_back({arr[i], cnt_added});
        cnt_added++;
        
        result.push_back(q.front().first);
    }
    
    return result;
}

// Example usage
int main() {
    vector<int> arr = {3, 5, 1, 8, 2, 7, 4};
    int M = 3;
    
    vector<int> minimums = findMinInSubarrays(arr, M);
    
    cout << "Minimums of subarrays of length " << M << ":" << endl;
    for (int min_val : minimums) {
        cout << min_val << " ";
    }
    cout << endl;
    
    return 0;
}
```

#### Python

```python
from collections import deque

def find_min_in_subarrays(arr, M):
    """Find minimum in all subarrays of length M"""
    result = []
    q = deque()  # deque of tuples (value, index)
    cnt_added = 0
    cnt_removed = 0
    
    # Add first M elements
    for i in range(min(M, len(arr))):
        while q and q[-1][0] > arr[i]:
            q.pop()
        q.append((arr[i], cnt_added))
        cnt_added += 1
    
    result.append(q[0][0])
    
    # Slide the window
    for i in range(M, len(arr)):
        # Remove first element of previous window
        if q and q[0][1] == cnt_removed:
            q.popleft()
        cnt_removed += 1
        
        # Add new element
        while q and q[-1][0] > arr[i]:
            q.pop()
        q.append((arr[i], cnt_added))
        cnt_added += 1
        
        result.append(q[0][0])
    
    return result

# Example usage
if __name__ == "__main__":
    arr = [3, 5, 1, 8, 2, 7, 4]
    M = 3
    
    minimums = find_min_in_subarrays(arr, M)
    
    print(f"Minimums of subarrays of length {M}:")
    print(minimums)
```

#### JavaScript

```javascript
function findMinInSubarrays(arr, M) {
    const result = [];
    const q = [];  // Array of objects {value, index}
    let cntAdded = 0;
    let cntRemoved = 0;
    
    // Add first M elements
    for (let i = 0; i < Math.min(M, arr.length); i++) {
        while (q.length > 0 && q[q.length - 1].value > arr[i]) {
            q.pop();
        }
        q.push({ value: arr[i], index: cntAdded });
        cntAdded++;
    }
    result.push(q[0].value);
    
    // Slide the window
    for (let i = M; i < arr.length; i++) {
        // Remove first element of previous window
        if (q.length > 0 && q[0].index === cntRemoved) {
            q.shift();
        }
        cntRemoved++;
        
        // Add new element
        while (q.length > 0 && q[q.length - 1].value > arr[i]) {
            q.pop();
        }
        q.push({ value: arr[i], index: cntAdded });
        cntAdded++;
        
        result.push(q[0].value);
    }
    
    return result;
}

// Example usage
const arr = [3, 5, 1, 8, 2, 7, 4];
const M = 3;

const minimums = findMinInSubarrays(arr, M);

console.log(`Minimums of subarrays of length ${M}:`);
console.log(minimums);
```

---

## Complexity Analysis

| Operation | Stack Modification | Queue Method 1 | Queue Method 2 | Queue Method 3 |
|-----------|-------------------|----------------|----------------|----------------|
| Find Min  | O(1)              | O(1)           | O(1)           | O(1)           |
| Add       | O(1)              | O(1) amortized | O(1) amortized | O(1) amortized |
| Remove    | O(1)              | O(1)           | O(1)           | O(1) amortized |
| Space     | O(n)              | O(n)           | O(n)           | O(n)           |

---

## Practice Problems

1. **[Queries with Fixed Length](https://www.hackerrank.com/challenges/queries-with-fixed-length)** - Apply sliding window minimum
2. **[Sliding Window Minimum](https://leetcode.com/problems/sliding-window-minimum/)** - Classic problem
3. **[Binary Land](https://codeforces.com/problemset/problem/1069/B)** - Advanced application

---

## Key Takeaways

1. **Stack Modification**: Store pairs (element, minimum) for O(1) minimum queries
2. **Queue Method 1**: Simple but doesn't store all elements
3. **Queue Method 2**: Stores indices for removal without knowing values
4. **Queue Method 3**: Uses two stacks, stores all elements
5. **Sliding Window**: All methods achieve O(n) for finding minimums in all subarrays

---

## References

- [CP-Algorithms: Stack Queue Modification](https://cp-algorithms.com/data_structures/stack_queue_modification.html)
- Time Complexity: O(1) for all operations (amortized for some)
- Space Complexity: O(n) where n is the number of elements

---

*Last Updated: 2026*
