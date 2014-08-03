express = require 'express'
bodyParser = require 'body-parser'
engines = require 'consolidate'
compression = require 'compression'
favicon = require 'serve-favicon'
cookieParser = require 'cookie-parser'
errorHandler = require 'errorhandler'
socketio = require 'socket.io'

exports.startServer = (config, callback) ->
  app = express()

  # setup views and port
  app.set 'views', config.server.views.path
  app.engine config.server.views.extension, engines[config.server.views.compileWith]
  app.set 'view engine', config.server.views.extension
  app.set 'port', process.env.PORT || config.server.port || 3000

  # middleware
  app.use compression()
  # uncomment and point path at favicon if you have one
  # app.use favicon "path to fav icon"
  app.use bodyParser.json()
  app.use bodyParser.urlencoded {extended: true}
  app.use cookieParser()
  app.use express.static config.watch.compiledDir
  if app.get('env') is 'development'
    app.use errorHandler()

  # routes
  app.use '/', require('./routes/index').index(config)

  # start it up
  server = app.listen app.get('port'), ->
    console.log 'Express server listening on port ' + server.address().port

  io = socketio.listen server

  callback server, io