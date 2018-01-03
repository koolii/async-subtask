# [WIP] async-subtask
This module offers interface which execs async function(and promise) in child_process which Node.js has already.

## environment
Node.js(x < 8.3.9)

## model-case

```javascript
const fetch = require('node-fetch')
const fork = require('async-subtask')

const expression = async (url) => {
  const response = await fetch(url)
  const text = await response.json()
  return text
}

const main = async () => {
  const responseText = await fork({
    expression,
    argument: ['http://example.com/'],
    dependencies: ['node-fetch'],
  })

  console.log(responseText)
}

main()
```