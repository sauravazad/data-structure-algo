## Sliding Window Techniques
The sliding window technique is a common algorithmic approach used for solving various problems that involve processing or analyzing a sequential data structure, such as arrays, strings, or streams.

It involves creating a fixed-size window that moves through the data structure one step at a time, typically from left to right, to perform specific operations or computations on the elements within the window.

Problems : https://leetcode.com/problem-list/sliding-window/

- Fixed window
- Dynamic window

##  Technique
Both fixed and variable window sliding window problems can use the techniques of hashing, two pointers, and sliding window optimization.
   - **Hashing** is a common technique for tracking the elements in a sliding window. This is because a hash table can quickly and efficiently look up the presence of an element in the window.
  - **Two pointers** is another common technique for tracking the elements in a sliding window. This is because two pointers can easily track the start and end of the window.
  - **Sliding window optimization** is a technique that combines hashing and two pointers to improve the performance of the sliding window algorithm. This is done by using hashing to quickly look up the presence of an element in the window, and using two pointers to track the start and end of the window.

The choice of technique for solving a sliding window problem depends on the specific problem and the constraints of the problem. For example, if the sliding window is small, then hashing may be a good choice. However, if the sliding window is large, then two pointers may be a better choice.

## Fixed window

### Usage: 
  - Determine Window Size: Decide on a fixed window size that defines the number of elements to consider at each step.
  - Initialize and Process: Start with the initial elements within the window. Perform any initial calculations or operations.
  - Slide the Window: Iterate through the data, updating the window by adding the next element and removing the leftmost one.
  - Update and Evaluate: Adjust calculations or data structures based on the new element. Evaluate if the current window meets the problem’s conditions.
  - Continue Sliding: Repeat the sliding, updating, and evaluation steps until the end of the data is reached.
  - Return Result: Return the final result or outcome based on the processed windows.

Problems: 
- Given an array of integers, find the maximum sum of a sub array with a fixed window size.
   array: `[2, 1, 5, 1, 3, 2]` and a window size of `3`

Sample algo code 

```c
fixed_window()
{
    int low = 0, high = 0, windowsize = k;
    while (i < sizeofarray)
    {
        // Step 1: Create a window that is one element smaller than the desired window size
        if (high - low + 1 < windowsize)
        {
            // Generate the window by increasing the high index
            high++;
        }
        // Step 2: Process the window
        else
        {
            // Window size is now equal to the desired window size
            // Step 2a: Calculate the answer based on the elements in the window
            // Step 2b: Remove the oldest element (at low index) from the window for the next window

            // Proceed to the next window by incrementing the low and high indices
        }
    }
}
```

## Dynamic window

### Usage:
In a variable window problem,the window size is not fixed and can change dynamically based on certain conditions or criteria. The template for solving a variable window problem involves maintaining two pointers, start and end, which represent the indices of the current window.

**Initialize the window indices:** Start by initializing the start and end pointers to the first element of the sequence or array.

**Expand the window:** Check a condition to determine whether to expand the window. If the condition is satisfied, increment the end pointer to expand the window size.

**Process the window:** Once the window size meets the desired criteria or condition, perform the required computations or operations on the elements within the window.

**Adjust the window size:** If the window size exceeds the desired criteria, adjust the window by moving the start pointer. Iterate or loop until the window size matches the desired criteria, and update the window accordingly.


Sample Algo Code :

```c
variable_window()
{
    int start = 0, end = 0;
    while (end < n)
    {
        // Perform calculations or operations within the window

        /* Case 1: Expand the window
           If the window size is less than the desired value (k), increase the end index
        */
        if (end - start + 1 < k)
        {
            end++;
        }

        /* Case 2: Window of desired size
           If the window size is equal to the desired value (k), process the window and calculate the answer
        */
        else if (end - start + 1 == k)
        {
            // Perform the required calculations or operations to obtain the answer
            // Store the answer in a variable (ans)

            end++;
        }

        /* Case 3: Reduce the window size
           If the window size is greater than the desired value (k), adjust the window by moving the start index
        */
        else if (end - start + 1 > k)
        {
            while (end - start + 1 > k)
            {
                // Remove calculations or operations involving the element at the start index

                start++;
            }

            // Check if the window size becomes equal to the desired value (k) after adjustment
            if (end - start + 1 == k)
            {
                // Perform calculations or operations and store the answer if necessary
            }

            end++;
        }
    }

    // Return the final answer (ans)
}
```


