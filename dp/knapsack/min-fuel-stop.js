/**
Minimum Number of Refueling Stops
You need to find the minimum number of refueling stops that a car needs to make to cover a distance,target
For simplicity, assume that the car has to travel from west to east in a straight line. There are various
fuel stations on the way, that are represented as a 2-D array of stations, i.e.,
stations[i] = [di, fi]
where
di'th  is the distance in miles of the i'th gas station from the starting position
fi is the amount of fuel in liters that it stores.

Initially, the car starts with K liters of fuel.

The car consumes one liter of fuel for every mile traveled.
Upon reaching a gas station, the car can stop and refuel using all the petrol stored at the station
In case it cannot reach the target, the program simply returns -1

eg:
target: 15
start fuel: 2
stations: [[1,2],[2,8],[4,10],[6,7],[7,2],[8,1]]

If we want to reach the target of 15 miles,
we have to refuel from a minimum of 2 stations to reach the target.
First, we will refuel our car with 8 liters from the second station and then refuel 10 liters from the third station.

Constraints:

1 <= target, K <= 10^9
0 <= stations.length <= 5500
1<= di < d(i+1) < target
1 <= f(i) < 10^9
*/

function minRefuelStops (target, startFuel, stations) {
  // const result = minRefuelStopsRec(target, startFuel, stations)
  const result = minRefuelStopsBottomUp(target, startFuel, stations)
  return result
}

const cacMaxDistanceForStop = (N, stops, curFuel, stations) => {
  if (stops == 0) {
    return curFuel
  }
  //
  if (stops > N) return Number.MIN_VALUE
  // 1. Don't make a refuelling stop at the current fuel station.
  const result1Distance = cacMaxDistanceForStop(N - 1, stops, curFuel, stations)
  // 2.  make a refuelling stop at the current fuel station.
  const result2 = cacMaxDistanceForStop(N - 1, stops - 1, curFuel, stations)
  let result2Distance = Number.MIN_VALUE
  // check if the current fuel is enough to reach the next stop when the stop is take
  // [distance from origin, fuel at the stop]
  if (!(result2 < stations[N - 1][0])) {
    // distance from the stop + fuel at the station
    result2Distance = result2 + stations[N - 1][1] // fuel at the station
  }
  const maxDistance = Math.max(result1Distance, result2Distance)
  // console.info(`Stops used ${stops} : Max Distance : ${maxDistance}`)
  return maxDistance
}

const cacMaxDistanceForStopMemo = (N, stops, curFuel, stations, memo) => {
  if (stops == 0) {
    return curFuel
  }
  if (stops > N) return Number.MIN_VALUE
  if (memo[N][stops] == -1) {
    // 1. Don't make a refuelling stop at the current fuel station.
    const result1Distance = cacMaxDistanceForStop(N - 1, stops, curFuel, stations)
    // 2.  make a refuelling stop at the current fuel station.
    const result2 = cacMaxDistanceForStop(N - 1, stops - 1, curFuel, stations)
    let result2Distance = Number.MIN_VALUE
    // check if the current fuel is enough to reach the next stop when the stop is take
    // [distance from origin, fuel at the stop]
    if (!(result2 < stations[N - 1][0])) {
    // distance from the stop + fuel at the station
      result2Distance = result2 + stations[N - 1][1] // fuel at the station
    }
    const maxDistance = Math.max(result1Distance, result2Distance)
    memo[N][stops] = maxDistance
  }

  // console.info(`Stops used ${stops} : Max Distance : ${maxDistance}`)
  return memo[N][stops]
}
const minRefuelStopsRec = (target, startFuel, stations) => {
  const N = stations.length
  const maxDistance = Array(N + 1).fill(-1)
  const memo = [...Array(N + 1)].map(() => Array(target + 1).fill(-1))
  for (let s = 0; s <= N; s++) {
    // calculate the max distance that can be traveled for each refuelling station and store it it in an array
    maxDistance[s] = cacMaxDistanceForStop(N, s, startFuel, stations, memo)
  }
  let minStops = -1

  // iterate through the stops
  for (let s = 0; s <= N; s++) {
    if (maxDistance[s] >= target) {
      minStops = s
      break
    }
  }
  return minStops
}

// time complexity = O(n^2) that can be further reduced to Nlog(N) is we use a max heap to pull out max element hence reducing the iterations
const minRefuelStopsBottomUp = (target, startFuel, stations) => {
  const N = stations.length
  // construct a array of size N  + 1 ie: number of fuel stops
  // we will fill the distance that can be traveled  by taking the stop for each stop
  const dp = Array(N + 1).fill(0)
  // base case as if we do not take any fuel stop ,  we can travel at max the start fuel distance
  dp[0] = startFuel

  // find out the max distance
  for (let s = 0; s < stations.length; s++) {
    for (let refill = s; refill >= 0 && dp[refill] >= stations[s][0]; refill--) { // only compute if the station is reachable dp[refill] >= stations[s][0]
      // since we are refuelling  we will increment the refuel by 1

      dp[refill + 1] = Math.max(dp[refill + 1], dp[refill] + stations[s][1])
    }
  }
  // once we have the dp array filled just find the first instance where the target is reached
  for (let i = 0; i < dp.length; i++) {
    if (dp[i] >= target) {
      return i
    }
  }
}

function main () {
  const target = [
    100,
    3,
    120,
    15,
    570,
    1360
  ]
  const startFuel = [
    10,
    3,
    10,
    3,
    140,
    380
  ]
  const stations = [
    [[10, 60], [20, 25], [30, 30]],
    [],
    [[10, 60], [20, 25], [30, 30], [60, 40]],
    [[2, 5], [3, 1], [6, 3], [12, 6]],
    [[140, 200], [160, 130], [310, 200], [330, 250]],
    [[310, 160], [380, 620], [700, 89], [850, 190], [990, 360]]
  ]
  // You can uncomment the lines below and check how this recursive solution causes a time-out

  target.push(1000000)
  startFuel.push(414538)
  stations.push([[17701, 258307], [21688, 120216], [25838, 188823], [26198, 37704], [28407, 39718], [31145, 278840], [45988, 57039], [47692, 29551], [50066, 74074], [68763, 290134], [75654, 319564], [108910, 149624], [142069, 96704], [150496, 373854], [155633, 381976], [161109, 233140], [171483, 222053], [198121, 90013], [198558, 50745], [210319, 361266], [261641, 320131], [268104, 196397], [277486, 181545], [279048, 87773], [284251, 109405], [284873, 194818], [299812, 44825], [312794, 212098], [330372, 150854], [334304, 16462], [341826, 355076], [354100, 121729], [357262, 99472], [373407, 246231], [380812, 391068], [381660, 58027], [389426, 16384], [395377, 184947], [400549, 61831], [401765, 19042], [402418, 342650], [408596, 88962], [409064, 58385], [412807, 242383], [419216, 114847], [427637, 193263], [432402, 162662], [447033, 73018], [448090, 220812], [485574, 177913], [493251, 273729], [530877, 156659], [542882, 246095], [545263, 265274], [554612, 139749], [555368, 283911], [574367, 13098], [577897, 59461], [622815, 266350], [626360, 73504], [632502, 399587], [634018, 30667], [668646, 349506], [669368, 33506], [670388, 147943], [673524, 12301], [675268, 205610], [681675, 187082], [685442, 260254], [707944, 400378], [712364, 355269], [712744, 343848], [726134, 145162], [751188, 18215], [752569, 82417], [752688, 138680], [778386, 288719], [799185, 339462], [801575, 187526], [802673, 370065], [808872, 17555], [811498, 117063], [818968, 17978], [828129, 176546], [841905, 363935], [850989, 161126], [857536, 211958], [860254, 321030], [865831, 102775], [893729, 69995], [903068, 19423], [905444, 290995], [914374, 171088], [919957, 97793], [929407, 307177], [933008, 235070], [935948, 115036], [944895, 74525], [970733, 55200], [995520, 316123]])

  for (let i = 0; i < stations.length; i++) {
    const a = '[' + stations[i].map(([d, f]) => `${d}-${f}`).join(',') + ']'
    console.log(i + 1 + '.\tStations: ' + a)
    console.log('\tTarget fuel: ' + target[i])
    console.log('\tStart fuel: ' + startFuel[i])
    console.log('\n\tMinimum number of Refueling stops: ' + minRefuelStops(target[i], startFuel[i], stations[i]))
    console.log('-'.repeat(100))
  }
}

main()
