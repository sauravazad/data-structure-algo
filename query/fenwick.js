
class Fenwick {
  constructor(n) {
    this.size = n
    this.fn = Array(n + 1).fill(0)
  }

  add(i, val) {
    i++
    while (i < this.fn.length) {
      this.fn[i] += val
      i += (i & -i)
    }
  }

  sum (i) {
    i++
    let ans = 0
    while (i) {
      ans += this.fn[i]
      i -= (i & -i)
    }
    return ans
  }

  query (l, r) {
    return this.sum(r) - this.sum(l - 1)
  }
}


// Driver code
var main = function () {
  const input = [1, 2, 3, 4, 5, 6]
  const fenwick = new Fenwick(input.length)
  for (let [i, n] of input.entries()) {
    fenwick.add(i, n)
    console.log(fenwick)
  }

  console.log(fenwick.query(0, 5))
}

main();