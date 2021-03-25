console.log('server ready !');

// Modules requirements//
    const createError = require('http-errors');
    const express = require('express');
    const path = require('path');
    const ejs = require('ejs');
    const gameApp = require('./gameApp');
const { Socket } = require('dgram');
    const app = express();
    const server = require('http').createServer(app);
    const io = require("socket.io")(server);   


// Routes Setup  
    // view engine setup
    app.set('views', path.join(__dirname, 'views'));
    app.set('view engine', 'ejs');
    app.engine('ejs', require('ejs').__express);

    // set routes for EJS templates 
    app.get("/", function(req, res) {
    res.render("index");
    });

    app.get("/", function(req, res) {
    res.render("header");
    });

    app.get("/", function(req, res) {
    res.render("form");
    });

    app.get("/", function(req, res) {
        res.render("arena");
        });

    app.get("/", function(req, res) {
            res.render("room");
            });

    // route for client files 
    app.use(express.static('public'));
    //app.use(express.favicon(__dirname + '/public/favicon.ico'))
    app.use('/images', express.static('images'));

    // catch 404 and forward to error handler
    app.use(function(req, res, next) {
    next(createError(404));
    });

    // in Dev error handler
    app.use(function(err, req, res, next) {
        // set locals, only providing error in development
        res.locals.message = err.message;
        res.locals.error = req.app.get('env') === 'development' ? err : {};
    
    // render the error page
        res.status(err.status || 500);
        res.render('error');
    });

server.listen(4000, function(){
    console.log('app listening on port 4000!');
});



//////////// Start -- MongoDB set up -- Start ////////////////////


const USE_DB = true;
const mongoose = USE_DB ? require("mongoose") : null;
const db = USE_DB ? mongoose.connection : null;

mongoose.connect('mongodb+srv://garnesj:garnesj@exviuscollections.faibn.mongodb.net/ExviusGame?retryWrites=true&w=majority"', {
	useNewUrlParser: true, 
	useUnifiedTopology: true,
    authSource:"admin",
    ssl: true,
    
});

//const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
console.log('connected to database');
});


//  User Schema and Model definition 
const userSchema = new mongoose.Schema({ 
    username: {type: String, required: true, unique: true},
    password: {type:String, required: true},
});

//userSchema.plugin(uniqueValidator);

const User = mongoose.model('User', userSchema);

//////////// End -- MongoDB set up -- End  ////////////////////


//////////// Start -- Database call on registration -- Start /////////

const isValidPassword = function(data,cb){
	User.find({username:data.username,password:data.password},function(err,res){
		if(res.length > 0)
			cb(true);
		else
			cb(false);
	});
}

const isUserNameTaken = function(data,cb){
	User.find({username:data.username},function(err,res){
		if(res.length > 0)
			cb(true);
		else
			cb(false);
	});
}

const addUser = function(data,cb){
	User.create({username:data.username,password:data.password, level:0, exp:0},function(err){
		cb();
	});
}

// END //



//////////// Start -- WebSockets Events Listeners and Emitters  -- Start /////////

// variables and constants declaration 

// receive a socket connection request from web client
let userNum = 0;
let users = [];
let sockets = [];
let players=[];
let arenas = ['Midgar', 'Kalm', 'Cosmo Canyon'];
let roomID = arenas[Math.floor(Math.random()* arenas.length)];
let ready = 0;
let gameState = {};
let userRooms = {};
let numUser = 0;

    // launch Socket.io //

io.sockets.on('connection', function(socket){
    // Attribute an ID to session
    sockets[socket.id];
    players[socket.id];
    console.log('socket ' + socket.id +' new connection');
    gameApp.startGame(io, socket);
        

        //listen to sign in events
    socket.on('signIn',function(data){ 
		isValidPassword(data,function(res){
		if(res){

		    socket.emit('signInResponse',{success:true});
		} else {
		    socket.emit('signInResponse',{success:false});			
		}
		});
	});

         // Listen on Sign up events
    socket.on('signUp',function(data){
        isUserNameTaken(data,function(res){
        if(res){
            socket.emit('signUpResponse',{success:false});		
        } else {
            addUser(data,function(){
            socket.emit('signUpResponse',{success:true});					
        });
		}
		});		
	});

    //////// Party and Users Management ////////

    // Create a new Room  and a random room ID
    socket.on("createSquad",function(data){
        userRooms[socket.id] = roomID;
        socket.emit('newGame', {roomID:roomID});
        socket.number = 1;
        console.log(roomID);
        
    });

/*
    socket.on("join", function(roomID){
    const room = io.sockets.adapter.rooms[roomID];

    let users;
    if (room) {
      users = room.sockets; 
    }

    
    if (users) {
        numUser = Object.keys(users).length;
    }

    if (numUser === 0) {
      socket.emit('wrongID');
    } else if (numUser > 1) {
      socket.emit('roomIsFull');
    }

    userRooms[socket.id] = roomID;

    socket.join(roomID);
    socket.number = 2;
    io.in(roomID).emit('onReady', 2);
  });
  */



    // Users Management 
    socket.on('join',function(data){
        // reject 3rd player
        socket.join(roomID);
        users.push(data);
        userNum ++;
        console.log(userNum);
        console.log(roomID);
        //socket.emit('checkPlayers');
    });

    socket.on('squadIdSent', function(){
        socket.emit('waitingForGuest');
    })

    socket.on('joined',function(data){
        // reject 3rd player

        if(userNum >2) {
            socket.emit('roomIsFull',{name:data.name, room:roomID}); 
            console.log('Room is Full');
        } else 
        if (userNum <=2){
            socket.join(roomID);
            users.push(data);
            userNum ++;
            io.in(roomID).emit('onReady',{name:data.name, room:roomID});
            console.log('player added')
            console.log(roomID);
        } 

        console.log(userNum); 
        console.log(users);
    });

    socket.on('playerReadyToBattle', function(data){
        ready++
        if (ready == 2){
            io.emit('loadArena',{name:data.name, room:roomID});
        }
    })

    // socket.on('launchATB', function(timestamp){

   //x@x@ })

    socket.on('disconnect',function(){
        delete sockets[socket.id];
        delete players[socket.id];
        delete users[socket.id];
        if (userNum > 0) {
            userNum --;
        } 
            
            console.log('Disconnected');
        });
});

// END //