# Monotonic Queue & Stack Explained

## 🎯 Core Concept
A **monotonic data structure** maintains elements in **strictly increasing or decreasing order**. This guarantees the **front/top always contains the optimal value** (max/min) for your current problem context.

---

## 📊 Monotonic Queue (Deque) - Sliding Window Maximum

### How It Works
For `nums = [1,3,-1,-3,5,3,6,7]`, `k = 3`:

```javascript
// Deque stores INDICES, not values
// Maintains DECREASING order of VALUES
```

### Step-by-Step Visualization

```
Window: [1,3,-1] → Max = 3
Deque state: [1] → [3] → [3,-1]
Indices:     0     1      2
Values:      1     3     -1

Window: [3,-1,-3] → Max = 3  
Deque state: [3,-1,-3]
Indices:      1  2   3
Values:       3 -1  -3

Window: [-1,-3,5] → Max = 5
Deque state: [5]  // Removed 3,-1,-3 (all ≤ 5)
Indices:      4
Values:       5
```

### Algorithm Logic
1. **Remove outdated indices** from front (outside window)
2. **Remove smaller elements** from back (they're useless now)
3. **Add current index** to back
4. **Front = current maximum**

### Time Complexity: **O(n)**  
*(Each element added/removed once)*

---

## 🧱 Monotonic Stack - Next Greater Element

### How It Works
For `nums = [2,1,2,4,3]`:

```
Process 2: Stack = [2]
Process 1: Stack = [2,1]  // 1 < 2, keep both
Process 2: Stack = [2,2]  // Remove 1 (found greater), add 2
Process 4: Stack = [4]    // Remove both 2s (found greater)
Process 3: Stack = [4,3]  // 3 < 4, keep both
```

### Key Difference from Queue
- **Stack**: Only remove from **top** (LIFO)
- **Queue**: Remove from **both ends** (sliding window needs this)

---

## 🎨 Visual Comparison

### Monotonic Decreasing Queue (Sliding Window Max)
```
Window slides → 
[1,3,-1] → deque: [3,-1] → max=3
  [3,-1,-3] → deque: [3,-1,-3] → max=3  
    [-1,-3,5] → deque: [5] → max=5
```

### Monotonic Decreasing Stack (Next Greater)
```
Input: [2,1,2,4,3]
Stack evolution:
[2] → [2,1] → [2,2] → [4] → [4,3]
```

---

## 💡 When to Use Which?

| Data Structure | Use Case | Removal Pattern |
|----------------|----------|-----------------|
| **Monotonic Queue** | Sliding window problems | Both ends (front for window, back for monotonicity) |
| **Monotonic Stack** | "Next Greater/Smaller" problems | Top only (LIFO processing) |

Both achieve **O(n)** time by ensuring each element is processed at most twice (once in, once out).

Would you like me to walk through the complete sliding window maximum code with this visualization?

==========



A **monotonic deque** (double-ended queue) is a powerful data structure used to maintain elements in **strictly increasing or decreasing order** while efficiently supporting insertions and deletions from both ends. It's commonly used in sliding window problems and optimization tasks.

---

### 🔑 **Core Idea**
Maintain a deque where elements follow a **monotonic property** (e.g., decreasing order). This ensures the **front of the deque always holds the optimal value** (max/min) for the current context.

---

### 📌 **Common Use Cases**
1. **Sliding Window Maximum/Minimum**  
2. **Largest Rectangle in Histogram**  
3. **Jump Game VI** (constrained max subarray)  
4. **Shortest Subarray with Sum ≥ K**

---

### ⚙️ **How It Works (Decreasing Deque Example)**
For a **sliding window maximum** problem:

#### **Insertion Logic**:
1. Remove indices from the **back** of the deque if their values are **≤ current element**  
   *(they’re useless since current element is larger and newer)*
2. Add current index to the **back**

#### **Validity Check**:
Remove indices from the **front** if they’re **outside the current window**

#### **Result Extraction**:
Front of deque always holds the **maximum** for the current window

---

### 💻 **JavaScript Template (Sliding Window Max)**
```javascript
function slidingWindowMax(nums, k) {
    const deque = []; // stores indices
    const result = [];
    
    for (let i = 0; i < nums.length; i++) {
        // Remove out-of-window indices from front
        if (deque.length > 0 && deque[0] <= i - k) {
            deque.shift();
        }
        
        // Maintain decreasing order (remove smaller elements from back)
        while (deque.length > 0 && nums[deque[deque.length - 1]] <= nums[i]) {
            deque.pop();
        }
        
        deque.push(i);
        
        // Add result once window is full
        if (i >= k - 1) {
            result.push(nums[deque[0]]);
        }
    }
    return result;
}
```

---

### 📊 **Key Properties**
| Operation          | Time Complexity | Purpose                          |
|--------------------|-----------------|----------------------------------|
| Remove from back   | O(1) amortized  | Maintain monotonicity           |
| Remove from front  | O(1)            | Handle window boundaries        |
| Access front       | O(1)            | Get current optimal value        |

---

### 💡 **Why It’s Efficient**
- Each element is **added and removed at most once** → **O(n)** total time
- Avoids recalculating max/min for every window

Would you like a visual example or explanation for a specific problem?