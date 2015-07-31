// note, io(<port>) will create a http server for you
app = {};
app.io = require('socket.io')();


console.log('Server running');
var port = 8080;

app.io.on('connection', function (socket) {

    console.log('connection');

    app.io.emit('gs', { will: 'be received by everyone'});

    socket.on('private message', function (from, msg) {
        console.log('I received a private message by ', from, ' saying ', msg);
    });

    socket.on('disconnect', function () {
        app.io.emit('user disconnected');
    });
});

app.io.listen(port, function () {
  console.log('Server listening at port %d', port);
});

app.io.sockets.emit('an event sent to all connected clients');
app.io.emit('an event sent to all connected clients');
