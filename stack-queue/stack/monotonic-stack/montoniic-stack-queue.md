# Complete Guide to Monotonic Stack & Queue

A comprehensive guide covering monotonic stack and queue data structures with detailed explanations, patterns, and implementations in C++, Python, and JavaScript.

## Table of Contents

- [Introduction](#introduction)
- [Monotonic Stack](#monotonic-stack)
  - [What is a Monotonic Stack?](#what-is-a-monotonic-stack)
  - [Types of Monotonic Stack](#types-of-monotonic-stack)
  - [Common Patterns](#common-patterns)
  - [Implementation](#implementation)
- [Monotonic Queue](#monotonic-queue)
  - [What is a Monotonic Queue?](#what-is-a-monotonic-queue)
  - [Implementation](#implementation-1)
  - [Sliding Window Maximum](#sliding-window-maximum)
- [Classic Problems](#classic-problems)
- [Problem-Solving Templates](#problem-solving-templates)
- [Practice Problems](#practice-problems)

-----

## Introduction

**Monotonic data structures** maintain elements in a specific order (either increasing or decreasing). They are powerful tools for solving problems that require finding:

- Next/Previous Greater Element
- Next/Previous Smaller Element
- Sliding Window Maximum/Minimum
- Rectangle Area Problems

**Key Characteristics:**

- Maintain order while processing elements
- O(n) time complexity for most problems
- Elements are pushed/popped at most once
- Very efficient for range queries

-----

## Monotonic Stack

### What is a Monotonic Stack?

A **monotonic stack** is a stack that maintains its elements in a monotonic order (either strictly increasing or strictly decreasing).

**Visual Example:**

```
Regular Stack:    [5, 2, 8, 1, 9]  (no order)
Increasing Stack: [1, 2, 5, 8, 9]  (bottom → top)
Decreasing Stack: [9, 8, 5, 2, 1]  (bottom → top)
```

### Types of Monotonic Stack

#### 1. Monotonic Increasing Stack

Elements increase from **bottom to top**.

```
Process array: [3, 1, 4, 1, 5]

Step 1: Push 3
Stack: [3]

Step 2: Push 1 (1 < 3, so pop 3, then push 1)
Stack: [1]

Step 3: Push 4 (4 > 1, ok)
Stack: [1, 4]

Step 4: Push 1 (1 < 4, so pop 4, 1 ≤ 1, so pop 1, then push 1)
Stack: [1]

Step 5: Push 5 (5 > 1, ok)
Stack: [1, 5]
```

#### 2. Monotonic Decreasing Stack

Elements decrease from **bottom to top**.

```
Process array: [3, 1, 4, 1, 5]

Step 1: Push 3
Stack: [3]

Step 2: Push 1 (1 < 3, ok)
Stack: [3, 1]

Step 3: Push 4 (4 > 1, so pop 1, 4 > 3, so pop 3, then push 4)
Stack: [4]

Step 4: Push 1 (1 < 4, ok)
Stack: [4, 1]

Step 5: Push 5 (5 > 1, so pop 1, 5 > 4, so pop 4, then push 5)
Stack: [5]
```

-----

### Common Patterns

#### Pattern 1: Next Greater Element

**Problem:** For each element, find the next greater element to its right.

```
Input:  [2, 1, 2, 4, 3]
Output: [4, 2, 4, -1, -1]

Explanation:
2 → next greater is 4
1 → next greater is 2
2 → next greater is 4
4 → no greater element (-1)
3 → no greater element (-1)
```

**Algorithm:** Use monotonic **decreasing** stack

**C++ Implementation:**

```cpp
#include <vector>
#include <stack>
using namespace std;

vector<int> nextGreaterElement(vector<int>& nums) {
    int n = nums.size();
    vector<int> result(n, -1);
    stack<int> st;  // Store indices
    
    for (int i = 0; i < n; i++) {
        // Pop elements smaller than current
        while (!st.empty() && nums[st.top()] < nums[i]) {
            result[st.top()] = nums[i];
            st.pop();
        }
        st.push(i);
    }
    
    return result;
}

// Example usage:
// vector<int> nums = {2, 1, 2, 4, 3};
// vector<int> result = nextGreaterElement(nums);
// Output: [4, 2, 4, -1, -1]
```

**Python Implementation:**

```python
def next_greater_element(nums):
    """
    Find next greater element for each element
    Time: O(n), Space: O(n)
    """
    n = len(nums)
    result = [-1] * n
    stack = []  # Store indices
    
    for i in range(n):
        # Pop elements smaller than current
        while stack and nums[stack[-1]] < nums[i]:
            result[stack.pop()] = nums[i]
        stack.append(i)
    
    return result

# Example usage:
# nums = [2, 1, 2, 4, 3]
# result = next_greater_element(nums)
# Output: [4, 2, 4, -1, -1]
```

**JavaScript Implementation:**

```javascript
function nextGreaterElement(nums) {
    const n = nums.length;
    const result = new Array(n).fill(-1);
    const stack = [];  // Store indices
    
    for (let i = 0; i < n; i++) {
        // Pop elements smaller than current
        while (stack.length > 0 && nums[stack[stack.length - 1]] < nums[i]) {
            result[stack.pop()] = nums[i];
        }
        stack.push(i);
    }
    
    return result;
}

// Example usage:
// const nums = [2, 1, 2, 4, 3];
// const result = nextGreaterElement(nums);
// Output: [4, 2, 4, -1, -1]
```

-----

#### Pattern 2: Previous Greater Element

**Problem:** For each element, find the previous greater element to its left.

```
Input:  [4, 5, 2, 10, 8]
Output: [-1, -1, 5, -1, 10]

Explanation:
4 → no previous greater (-1)
5 → no previous greater (-1)
2 → previous greater is 5
10 → no previous greater (-1)
8 → previous greater is 10
```

**C++ Implementation:**

```cpp
vector<int> previousGreaterElement(vector<int>& nums) {
    int n = nums.size();
    vector<int> result(n, -1);
    stack<int> st;  // Monotonic decreasing stack
    
    for (int i = 0; i < n; i++) {
        // Pop elements smaller or equal to current
        while (!st.empty() && st.top() <= nums[i]) {
            st.pop();
        }
        
        // Top of stack is the previous greater element
        if (!st.empty()) {
            result[i] = st.top();
        }
        
        st.push(nums[i]);
    }
    
    return result;
}
```

**Python Implementation:**

```python
def previous_greater_element(nums):
    """Find previous greater element for each element"""
    n = len(nums)
    result = [-1] * n
    stack = []  # Monotonic decreasing stack
    
    for i in range(n):
        # Pop elements smaller or equal to current
        while stack and stack[-1] <= nums[i]:
            stack.pop()
        
        # Top of stack is the previous greater element
        if stack:
            result[i] = stack[-1]
        
        stack.append(nums[i])
    
    return result
```

**JavaScript Implementation:**

```javascript
function previousGreaterElement(nums) {
    const n = nums.length;
    const result = new Array(n).fill(-1);
    const stack = [];  // Monotonic decreasing stack
    
    for (let i = 0; i < n; i++) {
        // Pop elements smaller or equal to current
        while (stack.length > 0 && stack[stack.length - 1] <= nums[i]) {
            stack.pop();
        }
        
        // Top of stack is the previous greater element
        if (stack.length > 0) {
            result[i] = stack[stack.length - 1];
        }
        
        stack.push(nums[i]);
    }
    
    return result;
}
```

-----

#### Pattern 3: Next Smaller Element

**Problem:** For each element, find the next smaller element to its right.

```
Input:  [4, 5, 2, 10, 8]
Output: [2, 2, -1, 8, -1]
```

**Algorithm:** Use monotonic **increasing** stack

**C++ Implementation:**

```cpp
vector<int> nextSmallerElement(vector<int>& nums) {
    int n = nums.size();
    vector<int> result(n, -1);
    stack<int> st;  // Store indices
    
    for (int i = 0; i < n; i++) {
        // Pop elements greater than current
        while (!st.empty() && nums[st.top()] > nums[i]) {
            result[st.top()] = nums[i];
            st.pop();
        }
        st.push(i);
    }
    
    return result;
}
```

**Python Implementation:**

```python
def next_smaller_element(nums):
    """Find next smaller element for each element"""
    n = len(nums)
    result = [-1] * n
    stack = []  # Store indices
    
    for i in range(n):
        # Pop elements greater than current
        while stack and nums[stack[-1]] > nums[i]:
            result[stack.pop()] = nums[i]
        stack.append(i)
    
    return result
```

**JavaScript Implementation:**

```javascript
function nextSmallerElement(nums) {
    const n = nums.length;
    const result = new Array(n).fill(-1);
    const stack = [];
    
    for (let i = 0; i < n; i++) {
        while (stack.length > 0 && nums[stack[stack.length - 1]] > nums[i]) {
            result[stack.pop()] = nums[i];
        }
        stack.push(i);
    }
    
    return result;
}
```

-----

#### Pattern 4: Previous Smaller Element

**C++ Implementation:**

```cpp
vector<int> previousSmallerElement(vector<int>& nums) {
    int n = nums.size();
    vector<int> result(n, -1);
    stack<int> st;  // Monotonic increasing stack
    
    for (int i = 0; i < n; i++) {
        while (!st.empty() && st.top() >= nums[i]) {
            st.pop();
        }
        
        if (!st.empty()) {
            result[i] = st.top();
        }
        
        st.push(nums[i]);
    }
    
    return result;
}
```

**Python Implementation:**

```python
def previous_smaller_element(nums):
    """Find previous smaller element for each element"""
    n = len(nums)
    result = [-1] * n
    stack = []
    
    for i in range(n):
        while stack and stack[-1] >= nums[i]:
            stack.pop()
        
        if stack:
            result[i] = stack[-1]
        
        stack.append(nums[i])
    
    return result
```

**JavaScript Implementation:**

```javascript
function previousSmallerElement(nums) {
    const n = nums.length;
    const result = new Array(n).fill(-1);
    const stack = [];
    
    for (let i = 0; i < n; i++) {
        while (stack.length > 0 && stack[stack.length - 1] >= nums[i]) {
            stack.pop();
        }
        
        if (stack.length > 0) {
            result[i] = stack[stack.length - 1];
        }
        
        stack.push(nums[i]);
    }
    
    return result;
}
```

-----

### Implementation

#### Generic Monotonic Stack Template

**C++:**

```cpp
template<typename T>
class MonotonicStack {
private:
    stack<T> st;
    bool increasing;  // true for increasing, false for decreasing
    
public:
    MonotonicStack(bool isIncreasing = true) : increasing(isIncreasing) {}
    
    void push(T val) {
        if (increasing) {
            // Maintain increasing order (bottom to top)
            while (!st.empty() && st.top() >= val) {
                st.pop();
            }
        } else {
            // Maintain decreasing order (bottom to top)
            while (!st.empty() && st.top() <= val) {
                st.pop();
            }
        }
        st.push(val);
    }
    
    T top() {
        return st.top();
    }
    
    void pop() {
        st.pop();
    }
    
    bool empty() {
        return st.empty();
    }
    
    int size() {
        return st.size();
    }
};
```

**Python:**

```python
class MonotonicStack:
    def __init__(self, increasing=True):
        self.stack = []
        self.increasing = increasing
    
    def push(self, val):
        if self.increasing:
            # Maintain increasing order (bottom to top)
            while self.stack and self.stack[-1] >= val:
                self.stack.pop()
        else:
            # Maintain decreasing order (bottom to top)
            while self.stack and self.stack[-1] <= val:
                self.stack.pop()
        self.stack.append(val)
    
    def top(self):
        return self.stack[-1] if self.stack else None
    
    def pop(self):
        return self.stack.pop() if self.stack else None
    
    def is_empty(self):
        return len(self.stack) == 0
    
    def size(self):
        return len(self.stack)
```

**JavaScript:**

```javascript
class MonotonicStack {
    constructor(increasing = true) {
        this.stack = [];
        this.increasing = increasing;
    }
    
    push(val) {
        if (this.increasing) {
            // Maintain increasing order (bottom to top)
            while (this.stack.length > 0 && 
                   this.stack[this.stack.length - 1] >= val) {
                this.stack.pop();
            }
        } else {
            // Maintain decreasing order (bottom to top)
            while (this.stack.length > 0 && 
                   this.stack[this.stack.length - 1] <= val) {
                this.stack.pop();
            }
        }
        this.stack.push(val);
    }
    
    top() {
        return this.stack.length > 0 ? 
               this.stack[this.stack.length - 1] : null;
    }
    
    pop() {
        return this.stack.pop();
    }
    
    isEmpty() {
        return this.stack.length === 0;
    }
    
    size() {
        return this.stack.length;
    }
}
```

-----

## Monotonic Queue

### What is a Monotonic Queue?

A **monotonic queue** is a deque that maintains elements in monotonic order while supporting efficient insertion and deletion from both ends.

**Key Use Case:** Sliding window maximum/minimum problems

```
Array: [1, 3, -1, -3, 5, 3, 6, 7]
Window size: 3

Sliding windows:
[1  3  -1] → max = 3
 1 [3  -1  -3] → max = 3
 1  3 [-1  -3  5] → max = 5
 1  3  -1 [-3  5  3] → max = 5
...
```

-----

### Implementation

#### Monotonic Queue for Maximum

**C++:**

```cpp
#include <deque>
using namespace std;

class MonotonicQueue {
private:
    deque<int> dq;  // Store values in decreasing order
    
public:
    // Add element (remove smaller elements)
    void push(int val) {
        while (!dq.empty() && dq.back() < val) {
            dq.pop_back();
        }
        dq.push_back(val);
    }
    
    // Remove element if it's at front
    void pop(int val) {
        if (!dq.empty() && dq.front() == val) {
            dq.pop_front();
        }
    }
    
    // Get maximum element
    int max() {
        return dq.front();
    }
};
```

**Python:**

```python
from collections import deque

class MonotonicQueue:
    def __init__(self):
        self.dq = deque()  # Store values in decreasing order
    
    def push(self, val):
        """Add element (remove smaller elements)"""
        while self.dq and self.dq[-1] < val:
            self.dq.pop()
        self.dq.append(val)
    
    def pop(self, val):
        """Remove element if it's at front"""
        if self.dq and self.dq[0] == val:
            self.dq.popleft()
    
    def max(self):
        """Get maximum element"""
        return self.dq[0] if self.dq else None
```

**JavaScript:**

```javascript
class MonotonicQueue {
    constructor() {
        this.dq = [];  // Store values in decreasing order
    }
    
    push(val) {
        // Add element (remove smaller elements)
        while (this.dq.length > 0 && this.dq[this.dq.length - 1] < val) {
            this.dq.pop();
        }
        this.dq.push(val);
    }
    
    pop(val) {
        // Remove element if it's at front
        if (this.dq.length > 0 && this.dq[0] === val) {
            this.dq.shift();
        }
    }
    
    max() {
        // Get maximum element
        return this.dq.length > 0 ? this.dq[0] : null;
    }
}
```

-----

### Sliding Window Maximum

**Problem:** Find maximum in each sliding window of size k.

```
Input: nums = [1,3,-1,-3,5,3,6,7], k = 3
Output: [3,3,5,5,6,7]

Windows:
[1  3  -1] → max = 3
 1 [3  -1  -3] → max = 3
 1  3 [-1  -3  5] → max = 5
...
```

**C++ Implementation:**

```cpp
vector<int> maxSlidingWindow(vector<int>& nums, int k) {
    vector<int> result;
    deque<int> dq;  // Store indices in decreasing order of values
    
    for (int i = 0; i < nums.size(); i++) {
        // Remove elements outside window
        while (!dq.empty() && dq.front() <= i - k) {
            dq.pop_front();
        }
        
        // Remove smaller elements
        while (!dq.empty() && nums[dq.back()] < nums[i]) {
            dq.pop_back();
        }
        
        dq.push_back(i);
        
        // Add to result when window is complete
        if (i >= k - 1) {
            result.push_back(nums[dq.front()]);
        }
    }
    
    return result;
}
```

**Python Implementation:**

```python
from collections import deque

def max_sliding_window(nums, k):
    """
    Find maximum in each sliding window
    Time: O(n), Space: O(k)
    """
    result = []
    dq = deque()  # Store indices in decreasing order of values
    
    for i in range(len(nums)):
        # Remove elements outside window
        while dq and dq[0] <= i - k:
            dq.popleft()
        
        # Remove smaller elements
        while dq and nums[dq[-1]] < nums[i]:
            dq.pop()
        
        dq.append(i)
        
        # Add to result when window is complete
        if i >= k - 1:
            result.append(nums[dq[0]])
    
    return result

# Example:
# nums = [1,3,-1,-3,5,3,6,7]
# k = 3
# print(max_sliding_window(nums, k))
# Output: [3, 3, 5, 5, 6, 7]
```

**JavaScript Implementation:**

```javascript
function maxSlidingWindow(nums, k) {
    const result = [];
    const dq = [];  // Store indices in decreasing order of values
    
    for (let i = 0; i < nums.length; i++) {
        // Remove elements outside window
        while (dq.length > 0 && dq[0] <= i - k) {
            dq.shift();
        }
        
        // Remove smaller elements
        while (dq.length > 0 && nums[dq[dq.length - 1]] < nums[i]) {
            dq.pop();
        }
        
        dq.push(i);
        
        // Add to result when window is complete
        if (i >= k - 1) {
            result.push(nums[dq[0]]);
        }
    }
    
    return result;
}
```

-----

## Classic Problems

### Problem 1: Largest Rectangle in Histogram

**Problem:** Find the largest rectangle area in a histogram.

```
Input: heights = [2,1,5,6,2,3]
Output: 10

Visualization:
    █
    █
█   █ █
█ █ █ █
█ █ █ █ █
█ █ █ █ █ █

Largest rectangle: height=5, width=2 → area=10
```

**C++ Implementation:**

```cpp
int largestRectangleArea(vector<int>& heights) {
    stack<int> st;  // Monotonic increasing stack (store indices)
    int maxArea = 0;
    int n = heights.size();
    
    for (int i = 0; i <= n; i++) {
        int h = (i == n) ? 0 : heights[i];
        
        // Pop taller bars and calculate area
        while (!st.empty() && heights[st.top()] > h) {
            int height = heights[st.top()];
            st.pop();
            
            // Width = current position - previous position - 1
            int width = st.empty() ? i : i - st.top() - 1;
            maxArea = max(maxArea, height * width);
        }
        
        st.push(i);
    }
    
    return maxArea;
}
```

**Python Implementation:**

```python
def largest_rectangle_area(heights):
    """
    Find largest rectangle in histogram
    Time: O(n), Space: O(n)
    """
    stack = []  # Monotonic increasing stack (store indices)
    max_area = 0
    n = len(heights)
    
    for i in range(n + 1):
        h = 0 if i == n else heights[i]
        
        # Pop taller bars and calculate area
        while stack and heights[stack[-1]] > h:
            height = heights[stack.pop()]
            
            # Width = current position - previous position - 1
            width = i if not stack else i - stack[-1] - 1
            max_area = max(max_area, height * width)
        
        stack.append(i)
    
    return max_area

# Example:
# heights = [2,1,5,6,2,3]
# print(largest_rectangle_area(heights))
# Output: 10
```

**JavaScript Implementation:**

```javascript
function largestRectangleArea(heights) {
    const stack = [];
    let maxArea = 0;
    const n = heights.length;
    
    for (let i = 0; i <= n; i++) {
        const h = (i === n) ? 0 : heights[i];
        
        while (stack.length > 0 && heights[stack[stack.length - 1]] > h) {
            const height = heights[stack.pop()];
            const width = stack.length === 0 ? i : i - stack[stack.length - 1] - 1;
            maxArea = Math.max(maxArea, height * width);
        }
        
        stack.push(i);
    }
    
    return maxArea;
}
```

-----

### Problem 2: Daily Temperatures

**Problem:** Find how many days until a warmer temperature.

```
Input: temperatures = [73,74,75,71,69,72,76,73]
Output: [1,1,4,2,1,1,0,0]

Explanation:
73 → next warmer at index 1 (74) → 1 day
74 → next warmer at index 2 (75) → 1 day
75 → next warmer at index 6 (76) → 4 days
71 → next warmer at index 5 (72) → 2 days
...
```

**C++ Implementation:**

```cpp
vector<int> dailyTemperatures(vector<int>& temperatures) {
    int n = temperatures.size();
    vector<int> result(n, 0);
    stack<int> st;  // Monotonic decreasing stack (store indices)
    
    for (int i = 0; i < n; i++) {
        // Pop cooler days
        while (!st.empty() && temperatures[st.top()] < temperatures[i]) {
            int prevDay = st.top();
            st.pop();
            result[prevDay] = i - prevDay;
        }
        st.push(i);
    }
    
    return result;
}
```

**Python Implementation:**

```python
def daily_temperatures(temperatures):
    """
    Find days until warmer temperature
    Time: O(n), Space: O(n)
    """
    n = len(temperatures)
    result = [0] * n
    stack = []  # Monotonic decreasing stack (store indices)
    
    for i in range(n):
        # Pop cooler days
        while stack and temperatures[stack[-1]] < temperatures[i]:
            prev_day = stack.pop()
            result[prev_day] = i - prev_day
        stack.append(i)
    
    return result
```

**JavaScript Implementation:**

```javascript
function dailyTemperatures(temperatures) {
    const n = temperatures.length;
    const result = new Array(n).fill(0);
    const stack = [];
    
    for (let i = 0; i < n; i++) {
        while (stack.length > 0 && 
               temperatures[stack[stack.length - 1]] < temperatures[i]) {
            const prevDay = stack.pop();
            result[prevDay] = i - prevDay;
        }
        stack.push(i);
    }
    
    return result;
}
```

-----

### Problem 3: Trapping Rain Water

**Problem:** Calculate how much water can be trapped after rain.

```
Input: height = [0,1,0,2,1,0,1,3,2,1,2,1]
Output: 6

Visualization:
       █
   █   ██ █
 █ ██ ███████

Water trapped (marked with ~):
       █
   █~~~██~█
 █~██~███████
```

**C++ Implementation:**

```cpp
int trap(vector<int>& height) {
    int n = height.size();
    if (n == 0) return 0;
    
    int left = 0, right = n - 1;
    int leftMax = 0, rightMax = 0;
    int water = 0;
    
    while (left < right) {
        if (height[left] < height[right]) {
            if (height[left] >= leftMax) {
                leftMax = height[left];
            } else {
                water += leftMax - height[left];
            }
            left++;
        } else {
            if (height[right] >= rightMax) {
                rightMax = height[right];
            } else {
                water += rightMax - height[right];
            }
            right--;
        }
    }
    
    return water;
}

// Alternative: Using monotonic stack
int trapWithStack(vector<int>& height) {
    stack<int> st;
    int water = 0;
    
    for (int i = 0; i < height.size(); i++) {
        while (!st.empty() && height[i] > height[st.top()]) {
            int bottom = st.top();
            st.pop();
            
            if (st.empty()) break;
            
            int distance = i - st.top() - 1;
            int boundedHeight = min(height[i], height[st.top()]) - height[bottom];
            water += distance * boundedHeight;
        }
        st.push(i);
    }
    
    return water;
}
```

**Python Implementation:**

```python
def trap(height):
    """
    Trapping rain water - Two pointer approach
    Time: O(n), Space: O(1)
    """
    if not height:
        return 0
    
    left, right = 0, len(height) - 1
    left_max, right_max = 0, 0
    water = 0
    
    while left < right:
        if height[left] < height[right]:
            if height[left] >= left_max:
                left_max = height[left]
            else:
                water += left_max - height[left]
            left += 1
        else:
            if height[right] >= right_max:
                right_max = height[right]
            else:
                water += right_max - height[right]
            right -= 1
    
    return water

# Alternative: Using monotonic stack
def trap_with_stack(height):
    """Trapping rain water - Monotonic stack approach"""
    stack = []
    water = 0
    
    for i in range(len(height)):
        while stack and height[i] > height[stack[-1]]:
            bottom = stack.pop()
            
            if not stack:
                break
            
            distance = i - stack[-1] - 1
            bounded_height = min(height[i], height[stack[-1]]) - height[bottom]
            water += distance * bounded_height
        
        stack.append(i)
    
    return water
```

**JavaScript Implementation:**

```javascript
function trap(height) {
    if (height.length === 0) return 0;
    
    let left = 0, right = height.length - 1;
    let leftMax = 0, rightMax = 0;
    let water = 0;
    
    while (left < right) {
        if (height[left] < height[right]) {
            if (height[left] >= leftMax) {
                leftMax = height[left];
            } else {
                water += leftMax - height[left];
            }
            left++;
        } else {
            if (height[right] >= rightMax) {
                rightMax = height[right];
            } else {
                water += rightMax - height[right];
            }
            right--;
        }
    }
    
    return water;
}
```

-----

### Problem 4: Remove K Digits

**Problem:** Remove k digits to form smallest number.

```
Input: num = "1432219", k = 3
Output: "1219"

Explanation:
Remove 4, 3, 2 → "1219" is the smallest
```

**C++ Implementation:**

```cpp
string removeKdigits(string num, int k) {
    string result = "";
    
    for (char digit : num) {
        // Remove larger digits
        while (!result.empty() && result.back() > digit && k > 0) {
            result.pop_back();
            k--;
        }
        result.push_back(digit);
    }
    
    // Remove remaining k digits from end
    while (k > 0) {
        result.pop_back();
        k--;
    }
    
    // Remove leading zeros
    int start = 0;
    while (start < result.size() && result[start] == '0') {
        start++;
    }
    
    result = result.substr(start);
    return result.empty() ? "0" : result;
}
```

**Python Implementation:**

```python
def remove_k_digits(num, k):
    """
    Remove k digits to form smallest number
    Time: O(n), Space: O(n)
    """
    stack = []
    
    for digit in num:
        # Remove larger digits
        while stack and stack[-1] > digit and k > 0:
            stack.pop()
            k -= 1
        stack.append(digit)
    
    # Remove remaining k digits from end
    while k > 0:
        stack.pop()
        k -= 1
    
    # Convert to string and remove leading zeros
    result = ''.join(stack).lstrip('0')
    return result if result else '0'
```

**JavaScript Implementation:**

```javascript
function removeKdigits(num, k) {
    const stack = [];
    
    for (let digit of num) {
        // Remove larger digits
        while (stack.length > 0 && stack[stack.length - 1] > digit && k > 0) {
            stack.pop();
            k--;
        }
        stack.push(digit);
    }
    
    // Remove remaining k digits from end
    while (k > 0) {
        stack.pop();
        k--;
    }
    
    // Convert to string and remove leading zeros
    let result = stack.join('').replace(/^0+/, '');
    return result || '0';
}
```

-----

## Problem-Solving Templates

### Template 1: Next Greater/Smaller Element

```
Pattern Recognition:
- "Find next greater/smaller element"
- "Find how many days/steps until..."
- "Find the first element that..."

Stack Type:
- Next Greater → Monotonic Decreasing
- Next Smaller → Monotonic Increasing

Template (C++):
vector<int> nextGreater(vector<int>& arr) {
    int n = arr.size();
    vector<int> result(n, -1);
    stack<int> st;
    
    for (int i = 0; i < n; i++) {
        while (!st.empty() && arr[st.top()] < arr[i]) {
            result[st.top()] = arr[i];
            st.pop();
        }
        st.push(i);
    }
    return result;
}
```

### Template 2: Sliding Window Maximum/Minimum

```
Pattern Recognition:
- "Find maximum/minimum in sliding window"
- "Find the best value in each subarray of size k"

Data Structure: Monotonic Deque

Template (Python):
def sliding_window_max(arr, k):
    from collections import deque
    dq = deque()
    result = []
    
    for i in range(len(arr)):
        # Remove outside window
        while dq and dq[0] <= i - k:
            dq.popleft()
        
        # Maintain order
        while dq and arr[dq[-1]] < arr[i]:
            dq.pop()
        
        dq.append(i)
        
        if i >= k - 1:
            result.append(arr[dq[0]])
    
    return result
```

### Template 3: Rectangle Problems

```
Pattern Recognition:
- "Largest rectangle"
- "Maximal rectangle"
- "Count rectangles"

Stack Type: Monotonic Increasing

Template (JavaScript):
function largestRectangle(heights) {
    const stack = [];
    let maxArea = 0;
    
    for (let i = 0; i <= heights.length; i++) {
        const h = i === heights.length ? 0 : heights[i];
        
        while (stack.length > 0 && heights[stack[stack.length - 1]] > h) {
            const height = heights[stack.pop()];
            const width = stack.length === 0 ? i : i - stack[stack.length - 1] - 1;
            maxArea = Math.max(maxArea, height * width);
        }
        
        stack.push(i);
    }
    
    return maxArea;
}
```

-----

## Quick Reference Guide

### When to Use Monotonic Stack

|Problem Type            |Stack Order|Example           |
|------------------------|-----------|------------------|
|Next Greater Element    |Decreasing |Daily Temperatures|
|Previous Greater Element|Decreasing |Stock Span        |
|Next Smaller Element    |Increasing |Next Smaller      |
|Previous Smaller Element|Increasing |-                 |
|Largest Rectangle       |Increasing |Histogram Area    |

### When to Use Monotonic Queue

|Problem Type           |Queue Order|Example                |
|-----------------------|-----------|-----------------------|
|Sliding Window Max     |Decreasing |Max in Window          |
|Sliding Window Min     |Increasing |Min in Window          |
|Constrained Subsequence|Decreasing |Max Sum with Constraint|

-----

## Practice Problems

### Easy

1. [Next Greater Element I](https://leetcode.com/problems/next-greater-element-i/)
1. [Final Prices With Special Discount](https://leetcode.com/problems/final-prices-with-a-special-discount-in-a-shop/)
1. [Crawler Log Folder](https://leetcode.com/problems/crawler-log-folder/)

### Medium

1. [Daily Temperatures](https://leetcode.com/problems/daily-temperatures/)
1. [Online Stock Span](https://leetcode.com/problems/online-stock-span/)
1. [Next Greater Element II](https://leetcode.com/problems/next-greater-element-ii/)
1. [Sliding Window Maximum](https://leetcode.com/problems/sliding-window-maximum/)
1. [Largest Rectangle in Histogram](https://leetcode.com/problems/largest-rectangle-in-histogram/)
1. [Remove K Digits](https://leetcode.com/problems/remove-k-digits/)
1. [Sum of Subarray Minimums](https://leetcode.com/problems/sum-of-subarray-minimums/)
1. [132 Pattern](https://leetcode.com/problems/132-pattern/)

### Hard

1. [Trapping Rain Water](https://leetcode.com/problems/trapping-rain-water/)
1. [Maximal Rectangle](https://leetcode.com/problems/maximal-rectangle/)
1. [Largest Rectangle in Histogram](https://leetcode.com/problems/largest-rectangle-in-histogram/)
1. [Maximum Score of Good Subarray](https://leetcode.com/problems/maximum-score-of-a-good-subarray/)

-----

## Time Complexity Analysis

### Monotonic Stack Operations

|Operation|Time Complexity|Explanation              |
|---------|---------------|-------------------------|
|Push     |O(1) amortized |Each element pushed once |
|Pop      |O(1) amortized |Each element popped once |
|Overall  |O(n)           |n pushes + n pops maximum|

### Monotonic Queue Operations

|Operation  |Time Complexity|Explanation   |
|-----------|---------------|--------------|
|Push back  |O(1) amortized |Maintain order|
|Pop front  |O(1)           |Direct access |
|Get max/min|O(1)           |Front element |
|Overall    |O(n)           |For n elements|

-----

## Key Takeaways

1. **Monotonic Stack** maintains order (increasing/decreasing) while processing elements
1. **Use Cases:**
- Next/Previous Greater/Smaller Element
- Rectangle problems
- Histogram problems
1. **Monotonic Queue** is perfect for sliding window problems
1. **Time Complexity:** Almost always O(n) for processing n elements
1. **Space Complexity:** O(n) in worst case
1. **Pattern Recognition:**
- “Next/Previous” → Monotonic Stack
- “Sliding Window” → Monotonic Queue
- “Largest Rectangle” → Monotonic Increasing Stack
- “Greater Element” → Monotonic Decreasing Stack

-----

## Resources

- [LeetCode - Monotonic Stack](https://leetcode.com/tag/monotonic-stack/)
- [GeeksforGeeks - Monotonic Stack](https://www.geeksforgeeks.org/introduction-to-monotonic-stack/)
- [CP-Algorithms - Stack Queue Modification](https://cp-algorithms.com/data_structures/stack_queue_modification.html)

-----

**Happy Coding! 📚**