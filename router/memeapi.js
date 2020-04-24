const path = require('path').resolve()

const dataRoot = path + '/data/'
const memes = require(dataRoot + 'memelist.json')

function route (req, res) {
  res.send(memes.url[Math.floor(Math.random() * memes.url.length)])
}

module.exports = route
