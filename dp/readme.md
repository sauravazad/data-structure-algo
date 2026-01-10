https://leetcode.com/discuss/post/662866/dp-for-beginners-problems-patterns-sampl-atdb/

### Dynamic Programming

https://leetcode.com/discuss/post/458695/dynamic-programming-patterns-by-aatalyk-pmgr/

#### 1. Minimum (Maximum) Path to Reach a Target
**Statement**: 
    Given a target find minimum (maximum) cost / path / sum to reach the target.
**Approach**: 
    Choose minimum (maximum) path among all possible paths before the current state, then add value for the current state.

    ```js
    routes[i] = min(routes[i-1], routes[i-2], ... , routes[i-k]) + cost[i]
    ```
