var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var hbs = require('express-handlebars');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
//var mqtt = require('mqtt');
//var client  = mqtt.connect('tcp://ec2-54-173-219-250.compute-1.amazonaws.com');


// view engine setup
app.engine('hbs',hbs({extname:'hbs'}));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

/*client.on('connect', function () {
  client.subscribe('harildrin');
});

client.on('message', function (topic, message) {
    if(topic == 'harildrin'){
        message;
    }
});
*/

server.listen(8000);
console.log('8000');

app.get('/',function(req,res){
 res.render('index');
});

io.sockets.on('connection', function (socket) {
    console.log('socket connected');
    socket.on('disconnect', function () {
        console.log('socket disconnected');
    });
    socket.on('onweb',function(msg){
    	io.emit('on',msg);
    	console.log(msg);
    });
    socket.on('offweb',function(msg){
    	io.emit('off',msg);
    	console.log(msg);
    });
    socket.on('playweb',function(msg){
        io.emit('play',msg);
        console.log(msg);
    });
});





