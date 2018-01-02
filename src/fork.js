const path = require('path')
const childProcess = require('child_process')

const replacer = (k, v) => (typeof v === 'function' ? v.toString() : v)
const fork = argument => (
  new Promise((resolve, reject) => {
    try {
      const child = childProcess.fork('./child', [], {
        cwd: path.resolve(__dirname),
        // stdio: 'inherit',
        // silent: true,
      })

      if (!child.connected) {
        reject(new Error('Not Connected to child process'))
      }

      child.on('message', (result) => {
        if (child.connected) {
          child.disconnect()
        }
        resolve(result)
      })

      child.on('disconnect', () => {
        process.kill(child.pid)
      })

      console.log(`[parent] process.pid: ${process.pid}`)

      child.send(JSON.stringify(argument, replacer))
    } catch (err) {
      reject(new Error(`too much requests: ${argument}`))
    }
  })
)

process.on('unhandledRejection', (err) => {
  console.log(`unhandledRejection: ${JSON.stringify(err)}`)
})
process.on('uncaughtException', (err) => {
  console.log(`uncaughtException: ${JSON.stringify(err)}`)
})


module.exports = fork
