
var express = require('express');
var appExpress = express();

var http = require('http').Server(appExpress);
var io = require('socket.io')(http);

//appExpress.use(express.logger());
//appExpress.use(express.bodyParser());
//appExpress.use(express.methodOverride());

/*
* /public he que funciona
* use no html da seguinte maneira (jquery-3.1.1.min.js na pasta /public)
* <script src="jquery-3.1.1.min.js"></script>
*/
appExpress.use(express.static(__dirname + '/public'));


//appExpress.set('PORT', 3000);


appExpress.get('/', function(req, res){
    //res.send('<h1>Hello world</h1>');
    res.sendFile(__dirname + '/index.html');
});


var onChatMsg = function(msg){
    console.log(msg);
    io.emit('chatMsg', msg);
}

io.on('connection', function(socket){
    console.log('a user connected');
    
    //socket.on('chatMsg', onChatMsg);
    socket.on('chatMsg', function(msg){
        console.log(msg);
        io.emit('chatMsg', msg);
    });
    //socket.on('disconnect', function(){
    //    console.log('user disconnected');
    //});
});



http.listen(3000, function(){
  console.log('listening on *:3000');
});
