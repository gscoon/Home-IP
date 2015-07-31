// note, io(<port>) will create a http server for you
var io = require('socket.io')();
console.log('Server running');
var port = 8080;

io.on('connection', function (socket) {

    console.log('connection');

    io.emit('gs', { will: 'be received by everyone'});

    socket.on('private message', function (from, msg) {
        console.log('I received a private message by ', from, ' saying ', msg);
    });

    socket.on('disconnect', function () {
        io.emit('user disconnected');
    });
});

io.listen(port, function () {
  console.log('Server listening at port %d', port);
});

io.sockets.emit('an event sent to all connected clients');
io.emit('an event sent to all connected clients');
