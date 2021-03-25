const socket = io("http://localhost:4000");

// Homepage Elements 
const header = document.getElementById('header');
const signUpNav = document.getElementById('signUpNav');
const logInNav = document.getElementById('logInNav');
const gamePlayNav = document.getElementById('logInNav');
const topnav = document.getElementById('topnav');

// LogIn and SignUp Elements
const signDiv = document.getElementById('signDiv');
const loginContainer = document.getElementById('loginContainer');
const signUpContainer = document.getElementById('signUpContainer');
const signInBtn = document.getElementById('signInBtn');
const signUpBtn = document.getElementById('signUpBtn');
const loginHeader = document.getElementById('loginHeader');
const signUpHeader = document.getElementById('signUpHeader');
let username = document.getElementById('username');
let password = document.getElementById('password');

// Host And Guest variables





// New Game Elements 
const createSquad = document.getElementById('createSquad');
const joinSquad = document.getElementById('joinSquad');
const createBtn = document.getElementById('createBtn');
const joinBtn = document.getElementById('joinBtn');
const messageScreen = document.getElementById('messageScreen');
const createParty = document.getElementById('createParty');
const newGameHeader = document.getElementById('newGameHeader');
const joinGameHeader = document.getElementById('newGameHeader');
let hostName = document.getElementById('hostName');
let guestName = document.getElementById("guestName");
let roomID = document.getElementById('roomID');
const btnContainer = document.getElementById('btnContainer');
const goToRoomBtn = document.getElementById('goToRoomBtn');
const launchGameBtn = document.getElementById('launchGameBtn');

//const gamecreate = document.getElementById('gamecreate');

// Character Selection Elements
const boxContainer = document.getElementById('boxContainer');
const divAerith = document.getElementById('Aerith');
const divCloud = document.getElementById('Cloud');
const divRedXIII = document.getElementById('RedXIII');
const divTifa = document.getElementById('Tifa');
const divVincent = document.getElementById('Vincent');
const divBarret = document.getElementById('Barret');
const divSephitoth = document.getElementById('Sephitoth');
const divYuffie = document.getElementById('Yuffie');
const divCait_Sith = document.getElementById('Cait_Sith');


// Locker Room Elements
const lockerRoom = document.getElementById('lockerRoom');
const user1 = document.getElementById('user1');
const user2 = document.getElementById('user2');
const usersContainer = document.getElementById('usersContainter');

// Fight Arena Elements
    // General Elements
const arena = document.getElementById('arena');
const inBattleMessage = document.getElementById('inBattleMessage');
const fightMenu = document.getElementById('fightMenu');
    // Entities 
const playersDiv = document.getElementById('players');
const player1Div = document.getElementById('player1');
const player2Div = document.getElementById('player2');
const opponentsDiv = document.getElementById('opponents');
const opponent1Div = document.getElementById('opponent1');
const opponent2Div = document.getElementById('opponent2');
const opponent3Div = document.getElementById('opponent3');

// Player Status 
const status = document.getElementById('status');
const avatar = document.getElementById('avatar');
let playerName = document.getElementById('playerName');
const hpBar = document.getElementById('hpBar');
const mpBar = document.getElementById('mpBar');
const lbBar = document.getElementById('lbBar');
let atbGauge = document.getElementById('atbGauge');


// Player Commands 
const commands = document.getElementById('commands');
const attackBtn = document.getElementById('attack');
const magicBtn = document.getElementById('magic');
const guardBtn = document.getElementById('guard');
const summonBtn = document.getElementById('summon');
const statusBox = document.getElementById('statusBox');

let isGameOver = false;
let userRole = '';
let playerNumber = 0;
let playerNum = '';
let maxPlayer = 2;
let ready = false;
let enemyReady = false;
let last = 0;
let num = 0;
let speed = 2;
let atb;
let sockets = [];
let players = [];
let select = 1;


let Aerisimg = new Image();
    Aerisimg.src = "../images/characters/Barret/Barret4/unit_magic_standby_207000204.png";


// player slots constructors
function PlayerSlot(username, playerNum, userRole) {
    this.username = username;
    this.playerNum = playerNum;
    this.userRole = userRole;
}

// Display Login Modal
const showLogIn = function(){
    loginContainer.style.display = "flex";

    loginHeader.style.display = "flex";
    signInBtn.style.display = "flex";

    signUpHeader.style.display = "none";
    signUpBtn.style.display = "none";

    boxContainer.style.display = "none";
}

// Display Sign up Modal 
const showSignUp = function(){
    loginContainer.style.display = "flex";

    signUpHeader.style.display = "flex";
    signUpBtn.style.display = "flex";

    loginHeader.style.display = "none";
    signInBtn.style.display = "none";

    boxContainer.style.display = "none";
}

const attackalert = function (){
    alert('attacking');
}

playerSelect = function(){
    document.body.style.backgroundImage ="url('/images/arenas/Backgrounds/battle_bg_0162_01.jpg')";
    document.body.style.backgroundColor = "black";
    loginContainer.style.display = "none";
    header.style.display = "none";
    createParty.style.display = "none";
    btnContainer.style.display ="none";
    messageScreen.style.display = "none";
    launchGameBtn.style.display ="none";
    arena.style.display = "block";
    //arena.style.backgroundImage = "url('/images/arenas/Backgrounds/battle_bg_0162_01.jpg')";
    inBattleMessage.style.display = "block"
    fightMenu.style.display = "flex";

    // Load players info // 
    // let avatar = set avatar
    //playerName = data.username
    //console.log(playerName)
    //alert('arenaloaded');
  
}

//////// REAL TIME PROCESSES 

signInBtn.onclick = function(){
    socket.emit('signIn',{
        username:username.value, 
        password:password.value});
}

signUpBtn.onclick = function(){
    socket.emit('signUp',{
        username:username.value, 
        password:password.value});
}

socket.on('signInResponse',function(data){
    if(data.success){
        alert('success');
        loginContainer.style.display = "none";
        header.style.display = "none";
        createParty.style.display = "flex";
        //usersContainer.style.display = "flex";
       
    }else{
        alert("Sign in unsuccessul.");
    }
});

socket.on('signUpResponse',function(data){
    if(data.success){
        alert("Sign up successul.");
        loginContainer.style.display = "none";
        header.style.display = "none";
        createParty.style.display = "flex";
    } else{
        alert("Sign up unsuccessul.");
    }
});

// HOST EVENTS 

createBtn.onclick = function(){
    hostName = document.getElementById('hostName').value;
    userName = hostName;
    if (!hostName) {
        alert("Please enter your name.");
        return;
    } else {

      // Page Layout Management
        loginContainer.style.display = "none";

      // users Management 
        userRole = "host";

      // player management
        playerNum = 'player1';

      // Event Management
        socket.emit('createSquad',{name:hostName}); // GamePlay Emitter 
        // User Management Emitter

    }
};

socket.on('newGame', function(data){
    roomID = data.roomID;
    playerNumber ++;
    playerInfos = new PlayerSlot(playerNum, userRole); // attribute a slot to player
    

    // Game Layout Management
    createParty.style.display = "none";
    messageScreen.style.display = "flex";
    messageScreen.innerHTML = "Squad ID is "+ roomID;
    btnContainer.style.display ="flex";
    goToRoomBtn.style.display ="flex";

    // Event Management
    socket.emit('join',{name:hostName, room:roomID, role:userRole, playerNumber:playerNum}); 
    socket.emit('checkUpRoom');
    

    // Check ups 
    console.log(roomID);
    alert('newGame' + ' with ' + hostName + ' in room: ' + roomID );
    console.log(player1);
    return (roomID);
});


goToRoomBtn.onclick = function(){
  socket.emit('squadIdSent');
    btnContainer.style.display ="none";
}

socket.on('waitingForGuest',function(data){
    createParty.style.display = "none";
    btnContainer.style.display ="none";
    goToRoomBtn.style.display ="none";
    messageScreen.style.display = "flex";
    messageScreen.innerHTML = "Waiting for player 2 to join the Squad";
});

// GUEST EVENTS

joinBtn.onclick = function(userName, data){
    guestName = document.getElementById('guestName').value;
    userName = guestName
    roomID = document.getElementById('roomID').value;
    userRole = "guest"
    playerNum = 'player2'
    playerNumber ++;
    playerInfos = new PlayerSlot(playerNum, userRole); // attribute a slot to  player 
  
    if (!guestName || !roomID) {
        alert("Please enter your name and game ID.");
        return;
    } else {
        socket.emit('joined',{name:guestName, room:roomID, role:userRole, playerNumber: playerNum}); 
        console.log(player2);
        console.log('joining as ' + userName + ' in '+ roomID);
      }
};

// ROOM EVENTS LISTENER

socket.on('roomIsFull', function(data){
  alert(' no more space in room soldier');
})


socket.on('wrongRoomId', function(data){
  alert(' Room does not exist');
})


socket.on('onReady',function(data){
    alert('Squad Is Ready');
    createParty.style.display = "none";
    btnContainer.style.display ="flex";
    goToRoomBtn.style.display ="none";
    launchGameBtn.style.display ="flex";
    messageScreen.style.display = "flex";
    messageScreen.innerHTML = "Choose player the click Start Battle button";
    boxContainer.style.display = "flex";
    
    game = new gameLogic();
    console.log(game);
});

launchGameBtn.addEventListener('click', function(data){
  socket.emit('playerReadyToBattle', {name:data.name,role:userRole, playerNumber:data.playerNum, room:roomID,});
  launchGameBtn.style.display = "none";
});


socket.on('drawPlayer', function(data){
//alert('Player Drawn for' + data.name);
messageScreen.style.display = "flex";
messageScreen.innerHTML = 'player Chosen by ' + playerNum; //data.playerNum + " has selected " + data.name
//game.addUsers(hostName)
    //game.addUsers(guestName)

});

socket.on('loadArena', function(data){
  game.loadArena(data);
  game.launchTimer();
  game.drawPlayers(data);
})

function stopSelect(){
  if (select <= 0){
    alert('player already selected');
  }
}



/*
:::::::::::::::::::
:                 :
:/ GAME LOGIC  /:
:                 :
:::::::::::::::::::
*/



/*
let ioEvents = {
  bindEvents : function(socket) {
    socket.on('drawPlayer', game.drawPlayer());
    socket.on('beginNewGame', IO.beginNewGame );
    IO.socket.on('newWordData', IO.onNewWordData);
    IO.socket.on('hostCheckAnswer', IO.hostCheckAnswer);
    IO.socket.on('gameOver', IO.gameOver);
    IO.socket.on('error', IO.error );
},
}
*/

class gameLogic{
  constructor(){
    //this.addUsers();
    //this.loadArena();
    //this.players = drawPlayer();

  }

  addUsers(socket){
    //this.sockets[socket.id] = socket;
    //this.players[socket.id];
  }

  loadArena(data){

    // Load Layout //
    document.body.style.backgroundImage ="url('')";
    document.body.style.backgroundColor = "black";
    
    boxContainer.style.display = "none";
    btnContainer.style.display ="none";
    messageScreen.style.display = "none";
    launchGameBtn.style.display ="none";
    arena.style.display = "block";
    //arena.style.backgroundImage = "url('/images/arenas/Backgrounds/battle_bg_0162_01.jpg')";
    inBattleMessage.style.display = "block"
    fightMenu.style.display = "flex";

    // Load players info // 
    // let avatar = set avatar
    
    //playerName.innerHTML = userName;
    console.log(userName);
    alert('arenaloaded');

  }

  callCharacter(characterName, characterImg) {
    // call playerImage with case for player1 or player 2
    socket.emit('playerCall', {name:characterName, role:userRole, playerNumber:playerNum});
    select -= 1;
    boxContainer.style.display = "none";
    if (select >=0){
      alert('wait for' + playerNum);
    }
  }

  drawPlayers(socket, username){
      alert('players to be drawn here');
  }       

  launchTimer(){
    goActiveTimeBattle();
    if (atbGauge.value == 100) {
      atbGauge = document.getElementById('atbGauge').value = 0;
      }
  }


  /*update() {
    // Calculate time elapsed
    const now = Date.now();
    const dt = (now - this.lastUpdateTime) / 1000;
    this.lastUpdateTime = now;


    // Update each player
    Object.keys(this.sockets).forEach(playerID => {
      const player = this.players[playerID];
      const newBullet = player.update(dt);
      if (newBullet) {
        this.bullets.push(newBullet);
      }
    });

    // Check if any players are dead
    Object.keys(this.sockets).forEach(function (playerID)  {
      const socket = this.sockets[playerID];
      const player = this.players[playerID];
      if (player.healthPoints <= 0) {
        socket.emit(Constants.MSG_TYPES.GAME_OVER);
        this.removePlayer(socket); // remplacer remove player par un pause de la jauge ATB.
      }
    });
  }*/


}


function goActiveTimeBattle(timeStamp){
  let timeInSecond = timeStamp / 1000;

  if (timeInSecond - last >= speed) {
  last = timeInSecond;

  atbGauge = document.getElementById('atbGauge').value += 10;
  }
  requestAnimationFrame(goActiveTimeBattle);
}



