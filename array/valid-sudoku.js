/*
Problem link : https://leetcode.com/problems/valid-sudoku
------------------------------------------------------------------------------------
Description: 36. Valid Sudoku
Determine if a 9 x 9 Sudoku board is valid. Only the filled cells need to be validated according to the following rules:

    Each row must contain the digits 1-9 without repetition.
    Each column must contain the digits 1-9 without repetition.
    Each of the nine 3 x 3 sub-boxes of the grid must contain the digits 1-9 without repetition.

Note:

    A Sudoku board (partially filled) could be valid but is not necessarily solvable.
    Only the filled cells need to be validated according to the mentioned rules.


------------------------------------------------------------------------------------
Example:
Example 1:

Input: board = 
[["5","3",".",".","7",".",".",".","."]
,["6",".",".","1","9","5",".",".","."]
,[".","9","8",".",".",".",".","6","."]
,["8",".",".",".","6",".",".",".","3"]
,["4",".",".","8",".","3",".",".","1"]
,["7",".",".",".","2",".",".",".","6"]
,[".","6",".",".",".",".","2","8","."]
,[".",".",".","4","1","9",".",".","5"]
,[".",".",".",".","8",".",".","7","9"]]
Output: true

Example 2:

Input: board = 
[["8","3",".",".","7",".",".",".","."]
,["6",".",".","1","9","5",".",".","."]
,[".","9","8",".",".",".",".","6","."]
,["8",".",".",".","6",".",".",".","3"]
,["4",".",".","8",".","3",".",".","1"]
,["7",".",".",".","2",".",".",".","6"]
,[".","6",".",".",".",".","2","8","."]
,[".",".",".","4","1","9",".",".","5"]
,[".",".",".",".","8",".",".","7","9"]]
Output: false
Explanation: Same as Example 1, except with the 5 in the top left corner being modified to 8. Since there are two 8's in the top left 3x3 sub-box, it is invalid.

------------------------------------------------------------------------------------
Input:

------------------------------------------------------------------------------------
Constraints:


    board.length == 9
    board[i].length == 9
    board[i][j] is a digit 1-9 or '.'.


------------------------------------------------------------------------------------

*/

/**
 Intuition: 
 Algorithm
 https://leetcode.com/problems/valid-sudoku/editorial/

    Initialize a list containing 9 hash sets, where the hash set at index r will be used to store previously seen numbers in row r of the sudoku. Likewise, initialize lists of 9 hash sets to track the columns and boxes too.

    Iterate over each position (r, c) in the sudoku. At each iteration, if there is a number at the current position:

        Check if the number exists in the hash set for the current row, column, or box. If it does, return false, because this is the second occurrence of the number in the current row, column, or box.

        Otherwise, update the set responsible for tracking previously seen numbers in the current row, column, and box. The index of the current box is (r / 3) * 3 + (c / 3) where / represents floor division.

    If no duplicates were found after every position on the sudoku board has been visited, then the sudoku is valid, so return true.

 Time Complexity: 
 Space Complexity:
 Notes: 
 */
var isValidSudoku = function(board) {
    let N = 9
    // use hash set to record teh value for row, column and 3*3 boxes
    let rows = new Array(N).fill().map(() => new Set());
    let cols = new Array(N).fill().map(() => new Set());
    let boxes = new Array(N).fill().map(() => new Set());
    for(let r = 0 ; r < N; r++)  {
      for(let c = 0 ; c< N ; c++) {
        let value = board[r][c]
        // check if the position is filled
        if(value == '.') {
          continue
        }
        // check the row
        if(rows[r].has(value)) {
          return false
        }
        rows[r].add(value)

        // check the cols

        if(cols[c].has(value)) {
          return false
        }
        cols[c].add(value)

        // Check the box
        let idx =  Math.floor(r / 3) * 3 + Math.floor(c / 3); // 
        if (boxes[idx].has(value)) {
                return false;
            }
            boxes[idx].add(value);
      }
    }
    return true
};
// Driver code
 

var main = function () {
  const fn = isValidSudoku
  const input = [
    [["5","3",".",".","7",".",".",".","."]
    ,["6",".",".","1","9","5",".",".","."]
    ,[".","9","8",".",".",".",".","6","."]
    ,["8",".",".",".","6",".",".",".","3"]
    ,["4",".",".","8",".","3",".",".","1"]
    ,["7",".",".",".","2",".",".",".","6"]
    ,[".","6",".",".",".",".","2","8","."]
    ,[".",".",".","4","1","9",".",".","5"]
    ,[".",".",".",".","8",".",".","7","9"]],
    
    [["8","3",".",".","7",".",".",".","."]
    ,["6",".",".","1","9","5",".",".","."]
    ,[".","9","8",".",".",".",".","6","."]
    ,["8",".",".",".","6",".",".",".","3"]
    ,["4",".",".","8",".","3",".",".","1"]
    ,["7",".",".",".","2",".",".",".","6"]
    ,[".","6",".",".",".",".","2","8","."]
    ,[".",".",".","4","1","9",".",".","5"]
    ,[".",".",".",".","8",".",".","7","9"]]
  ]
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