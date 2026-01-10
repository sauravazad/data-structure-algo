/**
https://leetcode.com/problems/word-ladder-ii
 */
const assert = require('node:assert');

/**
 * @param {string} beginWord
 * @param {string} endWord
 * @param {string[]} wordList
 * @return {number}
 */

var findLadders = function(beginWord, endWord, wordList) {
  let res = []
  // check if the word exists in the wordList else return []
  if(wordList.indexOf(endWord) === -1) {
    return res
  }
  let graph = {}
  let distance = {}
  let parents = {} // will store an array of parent for each node
  const getKey = (word, i) =>  word.slice(0, i) + '#' + word.slice(i+ 1)
  const buildWordEdges = (word, graph) => {
    for( let i = 0 ; i < word.length; i++) {
      const key = getKey(word, i)
      graph[key] ??= []
      graph[key].push(word)
    }
  }
  // build a graph of word for each position of alphabet

  for(let word of wordList) {
    buildWordEdges(word, graph)
  }


  // prepare for BFS
  // if the word is at the same level then push it the current parents list else construct a new parent array

  let queue = []
  queue.push(beginWord)
  distance[beginWord] = 0
  parents[beginWord] = [-1]

  // iterate over the queue

  while(queue.length) {
    const current = queue.shift()

    // got through the word at visit

    for(let i = 0 ; i < current.length; i++) {
      const linkWord = getKey(current, i)
      // iterate through its neighbors
      if(graph[linkWord]) {
        for(let v of graph[linkWord]) {
          // set the default value for the distance for a vertex
          distance[v] ??= Number.MAX_SAFE_INTEGER
          // if they are children then create a new node in distance

          if(distance[v] > distance[current] + 1) {
            distance[v] = distance[current] + 1
            parents[v] = [current]
            queue.push(v) // push the child for processing
          } else if (distance[v] === distance[current] + 1) { // they are on the same level append it
            parents[v].push(current)
          }
        }
      }
    }
  }

  // console.info("parents\n", parents)

  // find all the combinations
  const combination = (word, paths) => {
    if(word === -1) {
      // base case
      res.push(paths.slice(0,paths.length -1).reverse()) // remove the extra -1 from the start  node
      return
    }
    for (let p of parents[word]) {
      const path = paths.slice()
      path.push(p)
      combination(p, path)
    }
  }
  combination(endWord, [endWord])
  return res
};

// Driver code
var main = function () {
  const fn = findLadders
  const input = [
    [
      "a", "c", ["a","b","c"]
    ],
    [
      "hit", "cog", ["hot","dot","dog","lot","log","cog"]
    ],
    [
      "hit", "cog", ["hot","dot","dog","lot","log"]
    ],
  ]
  const output = [
    5, 0
  ]
  /**
   *  Fill the time complexity for each function
   */

  for (var i = 0; i < input.length; i++) {
      console.log(i + 1 + ".\t Input array: \t", input[i]);
      var result = fn(...input[i]);
      console.log("\t Result is \t: ",result);
      console.log("-".repeat(100));
      // assert.equal(result.length, output[i])
  }
}

main();