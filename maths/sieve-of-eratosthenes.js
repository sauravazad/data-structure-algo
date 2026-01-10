/**
  Sieve of Eratosthenes : Efficient algorithm to find all the prime numbers up to a limit
  Algorithm:
  1. create a list of integers 2 through the limit N
  2. Initially set p = 2, the smallest prime number
  3. Enumerate the multiples of p by counting in increments of p from 2p to N,
    and mark them in the list (these will be 2p, 3p, 4p, ...; the p itself should not be marked).
  4.Find the smallest number in the list greater than p that is not marked. If there was no such number, stop.
    Otherwise, let p now equal this new number (which is the next prime), and repeat from step 3.
  5. When the algorithm terminates, the numbers remaining not marked in the list are all the primes below N
 */

const getPrimes = (N) => {
  const primes = Array.from({length: N+1}, (_, i) => true)

  for(let p = 2; p <= N; p++) {
    if(primes[p]) {
      for(i = p*p ; i <=N; i+=p) {
        primes[i] = false
      }
    }
  }
  const list = []
  for(let i = 2; i <= N; i++) {

    if (primes[i]) list.push(i)
  }
  return list
}
  // Driver code
  var main = function () {
    const fn = getPrimes
    const input = [
      100, 200000
    ]
    /**
     *  Fill the time complexity for each function
     *  Time complexity : N * (log log N)
     *  O(N)
     */

    for (var i = 0; i < input.length; i++) {
        console.log(i + 1 + ".\t Input array: \t", input[i]);
        var result = fn(input[i]);
        console.log("\t Result is \t: ",result);
        console.log("-".repeat(100));
    }
  }

  main();