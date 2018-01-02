const fork = require('./fork')

const candidateList = []
for (let i = 0; i < 1000; i += 1) {
  candidateList.push({
    id: i,
  })
}

const expression = (target, candidates) => {
  console.log(`[child] process.pid: ${process.pid}`)
  return candidates.some(c => c.id === target.id)
}
const target1 = { id: 999 }
const target2 = { id: 9999 }
const main = async () => {
  try {
    let result = false

    result = await fork({
      expression,
      argument: [target1, candidateList],
    })
    console.log(result)

    result = await fork({
      expression,
      argument: [target2, candidateList],
    })
    console.log(result)
  } catch (err) {
    console.log(err)
  }
}


main()
