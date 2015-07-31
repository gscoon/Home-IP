var socket = require("socket.io-client");

var ip = "http://localhost:997";
console.log("trying this ip:" + ip);
var socket = require('socket.io-client')(ip);
socket.on('connect', function(){});
socket.on('event', function(data){
    console.log(data);
});
socket.on('event', function(data){
    console.log(data);
});
socket.on('gs', function(data){
    console.log(data);
});
socket.on('disconnect', function(){});
