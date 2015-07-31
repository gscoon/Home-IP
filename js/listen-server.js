var net = require('net');

// This server listens on TCP/IP port 1234
var tcpServer = net.createServer(function(client) {
    console.log('CONNECTED: ' + client.remoteAddress +':'+ client.remotePort)
    // Do something with the client connection
});
tcpServer.listen(997);
