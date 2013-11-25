$(function() {
  console.log('started')
  var socket = io.connect()
    , volume = 0.1

  socket.emit('command', { cmd: 'getTrack', payload: {}})
  socket.emit('command', { cmd: 'getStatus', payload: {}})

  socket.on('status', function (data) {
    console.log(data)
    $('.js-status').text(data.playing ? 'Playing' : 'Paused')
  })

  socket.on('play/pause', function (data) {
    console.log(data)
  })

  // function volumeChange(amount) {
  //   volume = volume + amount
  //   if (volume > 0.99) {
  //     volume = 0.99
  //   } else if (volume < 0.01) {
  //     volume = 0.01
  //   }
  //   return volume
  // }

  // $('.js-vol-up').on('click', function () {
  //   socket.emit('command', { cmd: 'volume', payload: { playing: volumeChange(0.1) }})
  // })

  // $('.js-vol-down').on('click', function () {
  //   socket.emit('command', { cmd: 'volume', payload: { volume: volumeChange(-0.1) }})
  // })

  $('.js-play').on('click', function () {
    socket.emit('command', { cmd: 'play', payload: { playing: true } })
  })

  $('.js-pause').on('click', function () {
    socket.emit('command', { cmd: 'pause', payload: { playing: false }})
  })

  $('.js-next').on('click', function () {
    socket.emit('command', { cmd: 'next', payload: {}})
  })

  $('.js-previous').on('click', function () {
    socket.emit('command', { cmd: 'previous', payload: {}})
  })

  socket.on('event', function (event) {
    console.log(event)
    socket.emit('command', { cmd: 'getTrack', payload: {}})
    socket.emit('command', { cmd: 'getStatus', payload: {}})
  })

  socket.on('track', function (event) {
    var track = event.track.data.name + ' - ' + event.track.data.artists[0].name
    if ($('.js-now-playing').html() !== track) {
      $('.js-now-playing').html(track)
    }
  })
})