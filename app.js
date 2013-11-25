
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , http = require('http')
  , path = require('path')
  , app = express()
  , server = http.createServer(app)

app.configure(function(){
  app.set('port', process.env.PORT || 80)
  app.set('views', __dirname + '/views')
  app.set('view engine', 'jade')
  app.use(express.favicon())
  app.use(express.logger('dev'))
  app.use(express.bodyParser())
  app.use(express.methodOverride())
  app.use(app.router)
  app.use(express.static(path.join(__dirname, 'public')))
})

app.configure('development', function(){
  app.use(express.errorHandler())
})

app.get('/', routes.index)

server.listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'))
})
, io = require('socket.io').listen(server)

io.set('transports', [
    'websocket'
  ])

io.sockets.on('connection', function (socket) {
  socket.broadcast.emit('play/pause', { playing: true })
  socket.on('event', function (data) {
    socket.broadcast.emit('event', data)
  })

  socket.on('command', function (data) {
    socket.broadcast.emit(data.cmd, data.payload)
  })
})