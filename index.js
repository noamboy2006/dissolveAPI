const cors = require('cors')
const path = require('path').resolve()
const express = require('express')
const fallback = require('./router/fallback.js')
const apiRouter = require('./router/api.js')

const app = express()
app.use(cors())
app.use('/docs', express.static(path + '/docs'))

app.get('/api', apiRouter)
app.use(fallback)

app.listen(8080)
