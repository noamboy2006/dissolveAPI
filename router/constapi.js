const { readFileSync } = require('fs')
const path = require('path').resolve()

const dataRoot = path + '/data/'
const consts = require(dataRoot + 'consts.json')

function route (req, res) {
  let { type, start, end } = req.query

  // Parameter Check
  if (!type) return res.send('ERROR: type parameter does not exist')
  if (start < 0 || end < 0) return res.send('ERROR: start & end parameter cant be a negative integer')

  type = type.toUpperCase()
  start = parseInt(start || 0)
  end = parseInt(end || start)

  // Search
  const target = consts.find((c) => c.name.toUpperCase() === type)
  if (!target) return res.send('Error: not found that type')

  if (start > end) return res.send('ERROR: start is bigger than end')
  if (end > target.end) return res.send('ERROR: request length is too big')
  if (end - start > Math.pow(10, 6)) return res.send('ERROR: request size is too big')

  if (start) start += target.int
  if (end) end += target.int

  // Data Read & Send
  const data = readFileSync(dataRoot + target.filename).toString('utf-8')
  if (!data) return res.send('ERROR: server file read fail')

  res.send(data.substring(start, end + 1))
}

module.exports = route
