const cors = require('cors')
const path = require('path').resolve()
const express = require('express')
const fallback = require('./router/fallback.js')
const constRouter = require('./router/constapi.js')
const memeRouter = require('./router/memeapi.js')
const Discord = require('discord.js')
const env = require('./data/readerEnv.json')
const fs = require('fs')
const memelist = require('./data/memelist.json')

const client = new Discord.Client()
const app = express()

app.use(cors())
app.use('/docs', express.static(path + '/docs'))

app.get('/api/const', constRouter)
app.get('/api/meme', memeRouter)

app.use(fallback)

app.listen(8080)

client.on('ready', () => {
  console.log('I am ready!')
})
client.on('message', message => {
  if (message.channel.id !== env.channel) return
  memelist.url.push(message.attachments.first().url)
  fs.writeFileSync('./data/memelist.json', JSON.stringify(memelist))
})
