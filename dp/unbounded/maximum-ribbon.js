/**
Given a ribbon of length n and a set of possible sizes, cut the ribbon in sizes such that n is
achieved with the maximum number of pieces.
You have to return the maximum number of pieces that can make up n by using any
combination of the available sizes. If the n can’t be made up, return -1, and if n is 0, return
0.
Let’s say, we have a ribbon of length and possible sizes as . The ribbon length can
be obtained by cutting it into one piece of length and another of length (as ),
or, into one piece of length and two pieces of length (as ). As we wish to
maximize the number of pieces, we choose the second option, cutting the ribbon into
pieces.


No.	n(length)	    sizes	    Count of Pieces
1	  5	  [1, 2, 3]	  5
2	  13	[3, 5, 8]	  3
3	  3	  [5]	       -1
*/

function countRibbonPieces(l, sizes) {
	const dp = [...Array(sizes.length)].map(() => Array(l + 1).fill(-1));
	// const result = countRibbonPiecesRecMemo(sizes, l, 0, dp);
	const result = countRibbonPiecesBottomUp(sizes, l);
	return result;
}

function countRibbonPiecesRec(sizes, length, index) {
	if (length === 0) {
		return 0;
	}

	if (index >= sizes.length || sizes.length === 0) {
		return -1;
	}

	let includingPieces = -1;
	let notIncludingPieces = 0;
	if (sizes[index] <= length) {
		// include or not include
		const pieces = countRibbonPiecesRec(sizes, length - sizes[index], index);
		if (pieces !== -1) {
			includingPieces = pieces + 1;
		}
	}
	notIncludingPieces = countRibbonPiecesRec(sizes, length, index + 1);

	return Math.max(includingPieces, notIncludingPieces);
}

function countRibbonPiecesRecMemo(sizes, length, index, dp) {
	if (length === 0) {
		return 0;
	}
	if (index >= sizes.length || sizes.length === 0) {
		return -1;
	}
	let includingPieces = -1;
	let notIncludingPieces = 0;
	if (dp[index][length] === -1) {
		if (sizes[index] <= length) {
			//include the
			const pieces = countRibbonPiecesRecMemo(sizes, length - sizes[index], index, dp);
			if (pieces !== -1) {
				includingPieces = pieces + 1;
			}
		}
		notIncludingPieces = countRibbonPiecesRecMemo(sizes, length, index + 1, dp);
		dp[index][length] = Math.max(includingPieces, notIncludingPieces);
	}
	return dp[index][length];
}

function countRibbonPiecesBottomUp (sizes, length) {
  const dp = Array(length + 1).fill(-1)
  // base case cannot cut a ribbon in zero ways
  dp[0] = 0

  // iterate through the length of ribbon from 0 to n
  for(let i = 1; i <= length ; i ++) {
   // iterate through all the sizes to get the max among them
    for (let c = 0 ;  c < sizes.length; c++) {
      // check if the index is valid and the value is not -1
      // check if the index position for the cut exists and has a valid value in dp
      // ie; eg [2,3,5] then check if i - c >= 0  only then a cut can be made  then check if the value is not -1 as it result in -1
      if(i-sizes[c] >= 0) {
        dp[i] = Math.max(dp[i], 1 + dp[i - sizes[c]])
      }
    }
  }
  if(dp[length]) {
    return dp[length]
  } else  {
    return -1
  }
}
// Driver code
var main = function () {
	var sizes = [
		[1, 2, 3],
		[2, 3, 5],
		[2, 3],
		[3, 5, 7],
		[3, 5],
	];

	var n = [5, 5, 7, 13, 7];

	// You can uncomment the line below and check how this recursive solution causes a time-out

	// sizes.push([2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13]);
	// n.push(1500);

	for (var i = 0; i < sizes.length; i++) {
		console.log(i + 1 + ".\tThe maximum number of sizes that can make up the n of " + n[i] + " from " + "[" + sizes[i].join(", ") + "]" + " is " + countRibbonPieces(n[i], sizes[i]));
		console.log("-".repeat(100));
	}
};

main();
