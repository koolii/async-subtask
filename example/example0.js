const fetch = require('node-fetch')
const fork = require('../')

const expression = async (url) => {
  const response = await fetch(url)
  const text = await response.json()
  return text
}

const url = 'https://qiita.com/koolii/items/1823a977c0a2878051e2.json'
const main = async () => {
  const responseText = await fork({
    expression,
    argument: [url],
    dependencies: ['node-fetch:fetch'],
  })
  console.log(responseText)
}

main()

