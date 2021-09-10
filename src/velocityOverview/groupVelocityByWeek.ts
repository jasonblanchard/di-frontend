interface Velocity {
  day: Date
  score: number
}

// Assumptions:
//  - starts on arbitrary days
//  - days are consecutive
//  - total days not necessarily divisible by 7
export default function groupVelocityByWeek(velocities: Velocity[]): Velocity[][] {
  // 6, 0, 1, 2, 3, 4, 5
  const output = velocities.reduce((memo: Velocity[][], velocity: Velocity) => {
    if (velocity.day.getDay() === 6) {
      memo.push([velocity])
      return memo;
    }

    if (memo.length === 0) {
      memo.push([])
    }

    memo[memo.length - 1].push(velocity)

    return memo;
  }, [])

  return output;
}
