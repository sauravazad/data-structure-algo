/**
  You are given a chain of matrices to be multiplied. You have to find the least number of primitive multiplications needed to evaluate the result.
  https://www.codingninjas.com/codestudio/problems/matrix-chain-multiplication_975344

  Note: Given two matrices A and B of dimensions (n x m) and ( m x l) the resulting matrix we get is AB, whose dimensions are (n x l).
  Further, when multiplying these two matrices, the number of primitive multiplications is ( n x m x l)
*/

const print2DMatrix = (matrix) => {
  const length = matrix[0].length -1
  console.info('_____'.repeat(length))
  for(let i = 0; i < matrix.length; i++) {
    console.info('| ' +matrix[i].join(" | ") + ' |')
  }
  console.info('-----'.repeat(length))
}
const minMultiplications = (dims) => {

  const matrices = []
  for(let i = 0; i < dims.length -1 ; i++) {
    const matrix = [dims[i], dims[i + 1]]
    matrices.push(matrix)
  }
  console.log(matrices)
  const dp = [...Array(matrices.length)].map(() => Array(matrices.length).fill(-1))
  // const result = multiplyRecursive2(matrices, 0 , matrices.length, dp)
  const result = multiplyBottomUp(dims)

  return result
}


const multiplyRecursive = ( matrices) => {
  // time complexity = 2^n (every problem is divided into two) * n * n(slicing the array)
  if(matrices.length <= 1) return 0 // base case

    let min = Infinity
  for(let i = 1; i < matrices.length; i++) {
    const  left = matrices.slice(0, i)
    const  right = matrices.slice(i, matrices.length)

    const primitiveCurrent = matrices[0][0] * matrices[i-1][1] * matrices[matrices.length -1][1]
    // console.info(matrices[0][0] , matrices[0][1] , matrices[matrices.length -1][1])
    console.log(`(L: ${left}) * R: (${right})`, `count = ${matrices[0][0]} x ${matrices[i][1]} x ${matrices[matrices.length -1][1]} =`, primitiveCurrent)
    min =  Math.min(min, multiplyRecursive(left) + multiplyRecursive(right) + primitiveCurrent)
  }


  return min
}

const multiplyRecursive2 = (matrices, start, end, dp) => {
  // console.log(`Start: ${start} End: ${end}`)
  if(end - start < 2) return 0 // base case we cannot multiply a single matrix
  if(dp[start][end -1] === -1) {
    let min = Infinity

    for(let i = start +1; i < end; i++) {
      const primitive = matrices[start][0] * matrices[i-1][1] * matrices[end - 1][1]
      // console.log(`(${matrices[start][0]} x ${matrices[start][1]} x ${matrices[end - 1][1]})`, primitive)
      const left = multiplyRecursive2(matrices, start, i, dp)
      const right = multiplyRecursive2(matrices, i, end, dp)

      min = Math.min(min, left+right+primitive)
    }
    dp[start][end -1] = min
  }

  return dp[start][end -1]
}


const multiplyBottomUp = (dims) => {
  // create a n * n matrix
  const dp = [...Array(dims.length)].map(() => Array(dims.length).fill(0))
  /*
  if you are paring up consecutive elements form an array of length N and mapping it to a matrix of N* N ,
  the value would end up as diagonal position
  ie: A = [2,3,4]
    M[0][1] , M[1][2] , A[2][3]

    use the above property to iterate through the diagonal where initially there would be only 1 matrix ,
    gradually increasing up to n-1 matrix
  */
  // fill with zeros when there is only one matrix
  const N = dims.length
  for(let len = 2; len < N; len++) {
    for(let row = 0, col = len ; row < N -len; row++, col++) {
      dp[row][col] = Infinity
      for(let k = row +1 ;  k < col; k++) {
        dp[row][col] = Math.min(dp[row][col],dp[row][k] + dp[k][col] + dims[row] * dims[k] * dims[col])
      }
    }
  }
  console.log(dp)
  return dp[0][N-1]
}
// Driver code
function main() {
  var dims = [
    // [3, 3, 2, 1, 2],
      [3, 3, 2, 1],
      // [4, 3, 2, 1],
      // [2, 2, 2],
      // [1, 1, 1],
      // [13, 16, 11, 99, 3]
  ];

  // You can uncomment the lines below and check how this recursive solution causes a time-out
  // dims.push([13, 16, 11, 99, 3, 13, 16, 11, 99, 3, 13, 16, 11, 99, 3, 13, 16, 11, 99, 3, 13, 16, 11, 99, 3, 13, 16, 11, 99, 3]);

  for (var i = 0; i < dims.length; i++) {
      console.log(i + 1 + ".\tInput dims:  [" + dims[i] + "]");
      console.log("\n\tThe least number of primitive multiplications possible: " + minMultiplications(dims[i]));
      console.log("-".repeat(100));
  }
}

main();