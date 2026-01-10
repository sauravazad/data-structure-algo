/*

Snakes and Ladder Game

You are playing a snakes & ladder game which is a famous ancient Indian game played on board with dice.
Given a Snakes & Ladders board of size N, which contains multiple Snakes & Ladders.
You are also given starting & ending point of each snake & ladder in a vector<pair<int,int> >. As per the rules -

    If you are bitten by snake (by standing at cell having snake head), you will reach the position where tail of the snake ends.

    If you reach a cell, which is also starting point of a ladder, then you will climb that ladder.

Give the board configuration, compute the minimum number of dice throws needed to reach the end of the game starting from cell 1.
In each turn you can throw any number from 1 to 6 on the dice to move ahead in the board.

Example
For example in the above example, 4 dice throws are needed.

    1 ---> 7 ---> 27 ---> 30 ---> 36

INPUT : n = 36

   ladders = {{2,15},{5,7},{9,27},{18,29},{25,35}};

   snakes = {{17,4},{20,6},{34,12},{24,16},{32,30}};

Explanation

Output : 4 turns

In the 1st turn you throw a 4 (to reach 5 and then climb ladder to reach 7)

In the 2nd turn you throw a 2 (to reach 9 and then climb ladder to reach 27)

In the 3rd turn you throw a 3 (to reach 30)

In the 4th turn you throw a 6 (to reach 36)

*/
class Graph {
  constructor() {
    this.vertices = {}
    this.maxDegreeIndex = 0
  }

  addEdge(i, j, isDirected) {
    if (isDirected) {
      this.vertices[i] = this.vertices[i] || []
      this.vertices[i].push(j)
    } else {
      this.vertices[i] = this.vertices[i] || []
      this.vertices[j] = this.vertices[j] || []
      this.vertices[i].push(j)
      this.vertices[j].push(i)
    }
  }
}

const minJumps = (n, ladder, snakes) => {
  const graph = new Graph()
  const board = Array(n+1).fill(0)
  // fill the board with cost ie: if it has a ladder positive else negative
  for(let l of ladder) {
    board[l[0]] = l[1] - l[0]
  }
  for(let s of snakes) {
    board[s[0]] = s[1] - s[0]
  }
  // build a graph with the edges for all possible combinations
  // iterate over all the cells on the board
  for( let i = 1; i <= n ; i++) {
    // for every dice value
    for(let d = 1; d <=6; d++) {
      const source = i
      let destination = d + source
      // adjust for snake or ladder
      destination += board[destination]
      if(destination <= n) graph.addEdge(source, destination)
    }
  }

  const BFS = (graph, origin, destination) => {
    const queue = []
    const visited = {}
    const depth = {}
    queue.push(origin)
    visited[origin] = true
    depth[origin] = 0

    while(queue.length) {
      const current = queue.shift()
      let e
      for(e of graph.vertices[current]) {
        if(!visited[e]) {
          queue.push(e)
          visited[e] = true
          depth[e] = depth[current] + 1
          if(e === destination) break
        }
      }
      if(e === destination) break
    }
    // console.info(depth)
    return depth[destination]
  }
  console.info(graph.vertices)
  const minMoves = BFS(graph, 1, n)
  return minMoves
}

// Driver code
var main = function () {
  const fn =minJumps

  const n = 36
  const ladders = [[2, 15], [5, 7], [9, 27], [18, 29], [25, 35]]
  const snakes = [[17, 4], [20, 6], [34, 12], [24, 16], [32, 30]]
  const input = [
    [n, ladders, snakes]
  ]
  /**
   *  Fill the time complexity for each function
   */

  for (var i = 0; i < input.length; i++) {
      console.log(i + 1 + ".\t Input array: \t", input[i]);
      var result = fn(...input[i]);
      console.log("\t Result is \t: ",result);
      console.log("-".repeat(100));
  }
}

main();