process.on('uncaughtException', (err) => {
  process.send(Promise.reject(err))
})

process.on('unhandledException', (err) => {
  process.send(Promise.reject(err))
})

// VMモジュールを使ってglobal変数を動的に生成できないか？ただし、
// ここはchild_processということは考えなければならない
// const dependencies = []
const delimiter = ':'

process.on('message', (arg) => {
  const { expression, argument } = JSON.parse(arg, (k, v) => {
    if (k === 'dependencies') {
      Object.values(v).forEach((d) => {
        // dependencies[d] = require(d)
        if (d.includes(delimiter)) {
          const arr = d.split(delimiter)
          global[arr[1]] = require(arr[0])
        } else {
          global[d] = require(d)
        }
      })
    }

    return k === 'expression' ? Function.call(null, `return ${v}`)() : v
  })

  console.log(`[child] process.pid: ${process.pid}`)

  Promise.resolve()
    .then(() => expression(...argument))
    .then((result) => {
      process.send({ result })
    })
    .catch((err) => {
      console.log(`err: ${err}, ${JSON.stringify(err)}`)
    })
})
