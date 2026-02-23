https://leetcode.com/problems/binary-search/solutions/423162/Binary-Search-101-The-Ultimate-Binary-Search-Handbook/

# Binary Search 101 - The Ultimate Binary Search Handbook

**Author:** Nick Zhang  
**Source:** [LeetCode Discussion](https://leetcode.com/problems/binary-search/solutions/423162/Binary-Search-101-The-Ultimate-Binary-Search-Handbook/)

---

## Introduction

Binary search is often a topic that's easy to be explained on the abstract level, but when it comes to writing bug-free implementations, it's rather difficult.

Some of the most common problems include:

1. **Infinite loop**
2. **Can't decide where to shrink**
3. **Do I use `lo` or `hi`**
4. **When to exit the loop**
5. **...**

In this article, I will be sharing my insights on how to write bug-free binary search with just a little pattern.

*If you are familiar with binary search and just want to see the pattern, you can go directly to the part: **The Pattern**.*

---

## What is Binary Search?

Normally, to find the target in a group, such as an array of numbers, the worst case scenario is we need to go through every single element `O(n)`. However, when these elements are **sorted**, we are able to take the privilege of this extra information to bring down the search time to `O(log n)`, that is if we have 100 elements, the worst case scenario would be 10 searches. That is a huge performance improvement.

The Gif below demonstrates the power of binary search:

![Binary Search vs Sequential Search](https://assets.leetcode.com/static_assets/posts/1EYkSkQaoduFBhpCVx7nyEA.gif)

The reason behind this huge performance increase is because for each search iterations, we are able to cut the elements we will be looking at in half. Fewer elements to look at = faster search time. And this all comes from the simple fact that in a sorted list, everything to the right of `n` will be greater or equal to it, and vice versa.

---

## Before We Look at the Abstract Ideas

Let's see the code first:

```javascript
var search = function(nums, target) {
    let lo = 0, hi = nums.length-1;
    while (lo < hi) {
        let mid = lo + Math.floor((hi-lo+1)/2);
        if (target < nums[mid]) {
            hi = mid - 1
        } else {
            lo = mid;
        }
    }
    return nums[lo]==target?lo:-1;
}
```

---

## 3 Parts to Consider

Looking at the code above, we can separate them into 3 parts:

### 1. Pre-processing
This is the step where we set up our initial conditions. In binary search, we typically initialize two pointers:
- `lo` (or `left`) pointing to the start of the search space
- `hi` (or `right`) pointing to the end of the search space

```javascript
let lo = 0, hi = nums.length - 1;
```

### 2. Binary Search
This is the core logic where we repeatedly divide the search space in half:

```javascript
while (lo < hi) {
    let mid = lo + Math.floor((hi-lo+1)/2);
    if (target < nums[mid]) {
        hi = mid - 1
    } else {
        lo = mid;
    }
}
```

### 3. Post-processing
After the loop exits, we need to verify if we found the target:

```javascript
return nums[lo]==target ? lo : -1;
```

---

## The Pattern

Now, let's talk about the pattern that can help us write bug-free binary search code.

### Understanding the Loop Condition

The most important thing to understand is **what does the loop condition represent?**

```javascript
while (lo < hi)
```

This means: **"While there are still elements to search"**

When `lo == hi`, we have narrowed down to exactly one element, and the loop exits.

### The Mid Calculation

There are two common ways to calculate `mid`:

#### 1. Lower Mid (Biased towards left)
```javascript
let mid = lo + Math.floor((hi - lo) / 2);
```
This gives us the lower middle element when we have an even number of elements.

#### 2. Upper Mid (Biased towards right)
```javascript
let mid = lo + Math.floor((hi - lo + 1) / 2);
```
This gives us the upper middle element when we have an even number of elements.

**Important:** The choice between these two depends on how you update your pointers!

---

## The Two Templates

### Template 1: Finding Exact Value

Use this when you want to find an exact match.

```javascript
function binarySearch(nums, target) {
    let lo = 0, hi = nums.length - 1;
    
    while (lo <= hi) {
        let mid = lo + Math.floor((hi - lo) / 2);
        
        if (nums[mid] == target) {
            return mid;
        } else if (nums[mid] < target) {
            lo = mid + 1;
        } else {
            hi = mid - 1;
        }
    }
    
    return -1;
}
```

**Key Points:**
- Loop condition: `lo <= hi`
- Return immediately when found
- Update: `lo = mid + 1` or `hi = mid - 1`
- Post-processing: Check if element exists

### Template 2: Finding Boundary (Advanced)

Use this when you want to find the leftmost or rightmost position.

#### Finding Leftmost Position (First Occurrence)

```javascript
function findFirst(nums, target) {
    let lo = 0, hi = nums.length - 1;
    
    while (lo < hi) {
        let mid = lo + Math.floor((hi - lo) / 2);
        
        if (nums[mid] < target) {
            lo = mid + 1;
        } else {
            hi = mid;
        }
    }
    
    return nums[lo] == target ? lo : -1;
}
```

**Key Points:**
- Loop condition: `lo < hi`
- Use lower mid: `Math.floor((hi - lo) / 2)`
- When `nums[mid] >= target`, set `hi = mid` (not `mid - 1`)
- Post-processing: Check `nums[lo] == target`

#### Finding Rightmost Position (Last Occurrence)

```javascript
function findLast(nums, target) {
    let lo = 0, hi = nums.length - 1;
    
    while (lo < hi) {
        let mid = lo + Math.floor((hi - lo + 1) / 2);
        
        if (nums[mid] > target) {
            hi = mid - 1;
        } else {
            lo = mid;
        }
    }
    
    return nums[lo] == target ? lo : -1;
}
```

**Key Points:**
- Loop condition: `lo < hi`
- Use upper mid: `Math.floor((hi - lo + 1) / 2)`
- When `nums[mid] <= target`, set `lo = mid` (not `mid + 1`)
- Post-processing: Check `nums[lo] == target`

---

## Why Upper Mid vs Lower Mid?

This is crucial to avoid infinite loops!

### Rule of Thumb:

**If you set `lo = mid`, use upper mid:**
```javascript
let mid = lo + Math.floor((hi - lo + 1) / 2);
```

**If you set `hi = mid`, use lower mid:**
```javascript
let mid = lo + Math.floor((hi - lo) / 2);
```

### Why?

Consider `lo = 0, hi = 1`:

**With lower mid:**
- `mid = 0 + Math.floor((1 - 0) / 2) = 0`
- If we set `lo = mid`, then `lo = 0` (no progress → infinite loop!)

**With upper mid:**
- `mid = 0 + Math.floor((1 - 0 + 1) / 2) = 1`
- If we set `lo = mid`, then `lo = 1` (progress made!)

---

## Common Pitfalls and How to Avoid Them

### 1. Infinite Loop

**Problem:** Loop never terminates

**Solution:** 
- Match your mid calculation with your pointer update
- If `lo = mid`, use upper mid
- If `hi = mid`, use lower mid

### 2. Off-by-One Errors

**Problem:** Missing the target by one position

**Solution:**
- Be consistent with your boundary updates
- Understand whether you want inclusive or exclusive boundaries

### 3. Integer Overflow

**Problem:** `(lo + hi) / 2` can overflow for large values

**Solution:**
- Use `lo + Math.floor((hi - lo) / 2)` instead
- This is mathematically equivalent but avoids overflow

---

## Practical Examples

### Example 1: Find First Bad Version

**Problem:** You are a product manager and currently leading a team to develop a new product. Unfortunately, the latest version of your product fails the quality check. Since each version is developed based on the previous version, all the versions after a bad version are also bad. Suppose you have `n` versions `[1, 2, ..., n]` and you want to find out the first bad one.

```javascript
function firstBadVersion(n) {
    let lo = 1, hi = n;
    
    while (lo < hi) {
        let mid = lo + Math.floor((hi - lo) / 2);
        
        if (isBadVersion(mid)) {
            hi = mid;  // First bad version is at mid or before
        } else {
            lo = mid + 1;  // First bad version is after mid
        }
    }
    
    return lo;
}
```

### Example 2: Search in Rotated Sorted Array

**Problem:** Suppose an array sorted in ascending order is rotated at some pivot unknown to you beforehand. You are given a target value to search. If found return its index, otherwise return -1.

```javascript
function search(nums, target) {
    let lo = 0, hi = nums.length - 1;
    
    while (lo <= hi) {
        let mid = lo + Math.floor((hi - lo) / 2);
        
        if (nums[mid] == target) return mid;
        
        // Determine which half is sorted
        if (nums[lo] <= nums[mid]) {
            // Left half is sorted
            if (nums[lo] <= target && target < nums[mid]) {
                hi = mid - 1;
            } else {
                lo = mid + 1;
            }
        } else {
            // Right half is sorted
            if (nums[mid] < target && target <= nums[hi]) {
                lo = mid + 1;
            } else {
                hi = mid - 1;
            }
        }
    }
    
    return -1;
}
```

### Example 3: Find Peak Element

**Problem:** A peak element is an element that is strictly greater than its neighbors. Find a peak element and return its index.

```javascript
function findPeakElement(nums) {
    let lo = 0, hi = nums.length - 1;
    
    while (lo < hi) {
        let mid = lo + Math.floor((hi - lo) / 2);
        
        if (nums[mid] < nums[mid + 1]) {
            lo = mid + 1;  // Peak is on the right
        } else {
            hi = mid;  // Peak is on the left or at mid
        }
    }
    
    return lo;
}
```

### Example 4: Find Minimum in Rotated Sorted Array

**Problem:** Suppose an array of length n sorted in ascending order is rotated between 1 and n times. Find the minimum element.

```javascript
function findMin(nums) {
    let lo = 0, hi = nums.length - 1;
    
    while (lo < hi) {
        let mid = lo + Math.floor((hi - lo) / 2);
        
        if (nums[mid] > nums[hi]) {
            lo = mid + 1;  // Minimum is on the right
        } else {
            hi = mid;  // Minimum is on the left or at mid
        }
    }
    
    return nums[lo];
}
```

---

## Advanced: Binary Search on Answer Space

Sometimes, binary search isn't applied directly on the input array, but on the **answer space**.

### Example: Capacity To Ship Packages Within D Days

**Problem:** A conveyor belt has packages that must be shipped within D days. Find the least weight capacity of the ship that will result in all packages being shipped within D days.

```javascript
function shipWithinDays(weights, days) {
    // Binary search on capacity
    let lo = Math.max(...weights);  // Minimum capacity
    let hi = weights.reduce((a, b) => a + b, 0);  // Maximum capacity
    
    while (lo < hi) {
        let mid = lo + Math.floor((hi - lo) / 2);
        
        if (canShip(weights, days, mid)) {
            hi = mid;  // Try smaller capacity
        } else {
            lo = mid + 1;  // Need larger capacity
        }
    }
    
    return lo;
}

function canShip(weights, days, capacity) {
    let daysNeeded = 1;
    let currentLoad = 0;
    
    for (let weight of weights) {
        if (currentLoad + weight > capacity) {
            daysNeeded++;
            currentLoad = 0;
        }
        currentLoad += weight;
    }
    
    return daysNeeded <= days;
}
```

---

## Time and Space Complexity

### Time Complexity: O(log n)
- Each iteration cuts the search space in half
- For n elements, we need at most log₂(n) iterations

### Space Complexity: O(1)
- Only using a constant amount of extra space for pointers
- Iterative implementation uses O(1) space
- Recursive implementation uses O(log n) space for call stack

---

## Summary and Key Takeaways

1. **Understand the loop condition:** `lo < hi` vs `lo <= hi`

2. **Match mid calculation with pointer update:**
   - If `lo = mid`, use upper mid: `lo + Math.floor((hi - lo + 1) / 2)`
   - If `hi = mid`, use lower mid: `lo + Math.floor((hi - lo) / 2)`

3. **Three main templates:**
   - Exact match (return immediately)
   - Find first occurrence (leftmost)
   - Find last occurrence (rightmost)

4. **Avoid common pitfalls:**
   - Infinite loops (wrong mid calculation)
   - Integer overflow (use `lo + (hi - lo) / 2`)
   - Off-by-one errors (be consistent with boundaries)

5. **Binary search can be applied to:**
   - Sorted arrays
   - Rotated sorted arrays
   - Answer spaces (when you can verify a candidate answer)
   - Any monotonic function

6. **Always ask yourself:**
   - What am I searching for?
   - How do I know which half to discard?
   - What should I return after the loop?

---

## Practice Problems

To master binary search, practice these problems:

1. **Easy:**
   - Binary Search (LeetCode 704)
   - First Bad Version (LeetCode 278)
   - Search Insert Position (LeetCode 35)
   - Sqrt(x) (LeetCode 69)

2. **Medium:**
   - Find First and Last Position of Element in Sorted Array (LeetCode 34)
   - Search in Rotated Sorted Array (LeetCode 33)
   - Find Peak Element (LeetCode 162)
   - Find Minimum in Rotated Sorted Array (LeetCode 153)
   - Capacity To Ship Packages Within D Days (LeetCode 1011)
   - Koko Eating Bananas (LeetCode 875)

3. **Hard:**
   - Median of Two Sorted Arrays (LeetCode 4)
   - Find Minimum in Rotated Sorted Array II (LeetCode 154)
   - Split Array Largest Sum (LeetCode 410)

---

## Conclusion

Binary search is a fundamental algorithm that every programmer should master. While the concept is simple, writing bug-free implementations requires understanding the subtle details of loop conditions, mid calculations, and pointer updates.

By following the patterns and guidelines in this handbook, you should be able to confidently implement binary search for any problem. Remember:

- **Start with the template that fits your problem**
- **Be consistent with your choices**
- **Test with small examples**
- **Think about edge cases**

Happy coding! 🚀

---

## Additional Resources

- [Binary Search Visualization](https://www.cs.usfca.edu/~galles/visualization/Search.html)
- [LeetCode Binary Search Problems](https://leetcode.com/tag/binary-search/)
- [Binary Search Tutorial on GeeksforGeeks](https://www.geeksforgeeks.org/binary-search/)

---

*This guide is based on the original article by Nick Zhang on LeetCode. All code examples have been adapted and expanded for clarity and completeness.*
