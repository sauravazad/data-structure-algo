/*
Astronaut Pairs

̉̉̉̉̉The member states of the UN are planning to send people to the moon. They want them to be from different countries.
You will be given a list of pairs of astronaut ID's. Each pair is made of astronauts from the same country.
Determine how many pairs of astronauts from different countries they can choose from.

Example
n = 4
astronauts = [1,2] [2,3]

There are 4 astronauts numbered 0 through 3. Astonauts grouped by country are [0] and [1,2,3]. There are 3 pairs to choose from [0,1], [0,2] and [0,3].
Input
Input contains the number N : denoting number of astronauts and and list L denoting the pairs of astronauts from the same country.

  N = 5
  vector<pair<int,int> > astronauts = {{0,1}, {2,3} , {0,4}};

Output
6
There are 6 ways to choose a pair (0,2) (0,3) (1,2) (1,3) (4,2) and (4,3) as astronauts (0,1,4) belong to country 1 and (2,3) belong to another.

*/

const countPairs = (n, pairs) => {
  const graph = Array(n).fill().map(() => Array().fill([]))

  for(let e of pairs) {
    graph[e[0]].push(e[1])
    graph[e[1]].push(e[0])
  }

  const islandSizes = []
  const visited = []
  const DFS = (v, count = 0) => {
    visited[v] = true
    count = 1
    for (let neigh of graph[v]) {
      if(!visited[neigh]) {
        count += DFS(neigh)
      }
    }
    return count
  }

  for( let v in graph ) {
    const size = DFS(v)
    islandSizes.push(size)
  }
  console.info("islandSizes", islandSizes)
  let result = 1

  for(let i = 0; i < islandSizes.length; i++) {
    result *= islandSizes[i]
  }
  return result
}

// Driver code
var main = function () {
  const fn = countPairs
  const input = [
    [4, [[1,2],[2,3]]],
    [5, [[0, 1], [2, 3], [0, 4]]],
    [6, [[0, 1], [0, 2], [2, 5]]]
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