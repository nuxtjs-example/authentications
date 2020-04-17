const express = require('express')
const consola = require('consola')
const { Nuxt, Builder } = require('nuxt')
const app = express()

const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const mongoOptions = {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true

}

// Import and Set Nuxt.js options
const config = require('../nuxt.config.js')
config.dev = process.env.NODE_ENV !== 'production'

async function start () {
  // Init Nuxt.js
  const nuxt = new Nuxt(config)

  const { host, port } = nuxt.options.server

  await nuxt.ready()
  // Build only in dev mode
  if (config.dev) {
    const builder = new Builder(nuxt)
    await builder.build()
  }

  mongoose.connect('mongodb://' + process.env.MONGO_HOST + ':' + process.env.MONGO_PORT + '/' + process.env.MONGO_DBNAME, mongoOptions)
  mongoose.connection.on('connected', function () {
    consola.success('Connected to Mongo')
  })
  mongoose.connection.on('error', function (err) {
    consola.error(new Error(err))
  })
  mongoose.connection.on('disconnected', function () {
    consola.error(new Error('Disconnected to Mongo'))
  })
  app.use(bodyParser.json())

  // Routes
  const auth = require('./routes/auth')
  app.use('/api/auth', auth)

  // Give nuxt middleware to express
  app.use(nuxt.render)

  // Listen the server
  app.listen(port, host)
  consola.ready({
    message: `Server listening on http://${host}:${port}`,
    badge: true
  })
}
start()
