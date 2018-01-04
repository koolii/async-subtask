const fork = require('../')
// const request = require('request-promise')

const url = 'https://qiita.com/koolii/items/1823a977c0a2878051e2.json'
const subtask = async (targetUrl) => {
  const response = await global['request-promise'].get(targetUrl)
  const json = JSON.parse(response)
  return `pid: ${process.pid} => ${json.title}`
}

const main = async () => {
  const tasks = []
  for (let i = 0; i < 10; i += 1) {
    tasks.push(fork({
      expression: subtask,
      argument: [url],
      dependencies: ['request-promise'],
    }))
  }

  const result = await Promise.all(tasks)
  console.log(result)
}

main()

