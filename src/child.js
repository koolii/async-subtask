process.on('uncaughtException', (err) => {
  console.log(`uncaughtException: ${err}`)
})

process.on('unhandledException', (err) => {
  console.log(`unhandledException: ${err}`)
})

process.on('message', (arg) => {
  const { expression, argument } = JSON.parse(arg, (k, v) => (
    k === 'expression' ? Function.call(this, `return ${v}`)() : v
  ))
  const result = expression(...argument)
  process.send({ result })
})
