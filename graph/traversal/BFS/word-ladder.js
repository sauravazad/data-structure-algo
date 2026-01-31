// https://leetcode.com/problems/word-ladder/
const assert = require('node:assert')

/**
 * @param {string} beginWord
 * @param {string} endWord
 * @param {string[]} wordList
 * @return {number}
 */

const ladderLength = function (beginWord, endWord, wordList) {
  if (wordList.indexOf(endWord) === -1) {
    return 0
  }
  const graph = {}
  const getKey = (word, i) => word.slice(0, i) + '#' + word.slice(i + 1)
  const buildWordEdges = (word, graph) => {
    for (let i = 0; i < word.length; i++) {
      const key = getKey(word, i)
      graph[key] ??= []
      graph[key].push(word)
    }
  }
  // build a graph of word for each position of alphabet
  buildWordEdges(beginWord, graph)
  buildWordEdges(endWord, graph)

  for (const word of wordList) {
    buildWordEdges(word, graph)
  }
  // console.info("graph is \n", graph)
  // do a BFS on the graph from destination to source
  const visited = {}
  const queue = []
  const paths = 0
  queue.push([endWord, 1]) // [word, depth]
  visited[endWord] = true
  while (queue.length) {
    const current = queue.shift()
    const [word, depth] = current
    if (word === beginWord) return depth

    for (let i = 0; i < word.length; i++) {
      const key = getKey(word, i)
      // console.info("Visiting ", key)
      for (const neigh of graph[key] ?? []) {
        if (!visited[neigh]) {
          queue.push([neigh, depth + 1])
          visited[neigh] = true
        }
      }
    }
  }
  return 0
}

// Driver code
const main = function () {
  const fn = ladderLength
  const input = [
    [
      'hit', 'cog', ['hot', 'dot', 'dog', 'lot', 'log', 'cog']
    ],
    [
      'hit', 'cog', ['hot', 'dot', 'dog', 'lot', 'log']
    ]
  ]
  const output = [
    5, 0
  ]
  /**
   *  Fill the time complexity for each function
   */

  for (let i = 0; i < input.length; i++) {
    console.log(i + 1 + '.\t Input array: \t', input[i])
    const result = fn(...input[i])
    console.log('\t Result is \t: ', result)
    console.log('-'.repeat(100))
    assert.equal(result, output[i])
  }
}

main()
