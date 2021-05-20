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

// New Game Elements 
const createSquad = document.getElementById('createSquad');
const joinSquad = document.getElementById('joinSquad');
const createBtn = document.getElementById('createBtn');
const joinBtn = document.getElementById('joinBtn');
let messageScreen = document.getElementById('messageScreen');
const createParty = document.getElementById('createParty');
const newGameHeader = document.getElementById('newGameHeader');
const joinGameHeader = document.getElementById('newGameHeader');
let hostName = document.getElementById('hostName');
let guestName = document.getElementById("guestName");
let joinRoomID = document.getElementById('roomID');
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


// Fight Arena Elements
    // General Elements
const arena = document.getElementById('arena');
let inBattleMessage = document.getElementById('inBattleMessage');
const fightBtn = document.getElementById('fightBtn')
const fightMenu = document.getElementById('fightMenu');
    // Entities 
let playersDiv = document.getElementById('players');
let player1Div = document.getElementById('player1');
let player2Div = document.getElementById('player2');
let opponentsDiv = document.getElementById('opponents');
let opponent1Div = document.getElementById('opponent1');
let opponent2Div = document.getElementById('opponent2');
let opponent3Div = document.getElementById('opponent3');
let playerNameHolder = document.getElementById('playerNameHolder');
let opponentNameHolder = document.getElementById('opponentNameHolder');

// Player Status    
let status = document.getElementById('status');
let userAvatar = document.getElementById('userAvatar');
let hostNameHolder = document.getElementById('hostNameHolder');
let guestNameHolder = document.getElementById('guestNameHolder');
let userNameHolder = document.getElementById('userNameHolder');
let hpBar = document.getElementById('hpBar');
let mpBar = document.getElementById('mpBar');
let lbBar = document.getElementById('lbBar');
let atbGauge = document.getElementById('atbGauge');
let healthPoints = document.getElementById('healthPoints');
let limitBar = document.getElementById('limitBar');

// Player Commands 
let commands = document.getElementById('commands');
let attackBtn = document.getElementById('attack');
let magicBtn = document.getElementById('magic');
let guardBtn = document.getElementById('guard');
let healBtn = document.getElementById('heal');
let statusBox = document.getElementById('statusBox');

let isGameOver = false;
let userRole = '';
let character = '';
let player1;
let player2;
let playerName = '';
let opponentName = '';
let attacker ='';
let opponent ='';
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
let frame = 0;
let playerSprites;

//Load Images


let Barret = new Image();
    Barret.src = "../images/characters/Barret/idle.png";

let Caith_Sith = new Image();
    Caith_Sith.src = "../images/characters/Caith_Sith/idle.png";

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

const attackalert = function (data){

  if (userRole == 'host'){
    game.attack(playerName,opponent);
      
  } else {
    game.attack(opponentName, attacker)
  }
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
    //return (hostName);
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
  
    // Check ups 
    console.log(roomID);
    alert('newGame' + ' with ' + hostName + ' in room: ' + roomID );
    return (roomID);
});


goToRoomBtn.onclick = function(data){
  socket.emit('squadIdSent', {name:hostName, room:roomID});
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

joinBtn.onclick = function(){
    guestName = document.getElementById('guestName').value;
    joinRoomID = document.getElementById('roomID').value;
    userRole = "guest"
    playerNum = 'player2'
    playerNumber ++;
    playerInfos = new PlayerSlot(playerNum, userRole); // attribute a slot to  player 
  
    if (!guestName || !roomID) {
        alert("Please enter your name and game ID.");
        return;
    } else {
        socket.emit('joined',{name:guestName, room:joinRoomID, role:userRole, playerNumber: playerNum});
      }
      //return(guestName);
};

// ROOM EVENTS LISTENER

socket.on('roomIsFull', function(data){
  alert('sorry' + data.name + ' there is no more space in room soldier');
})


socket.on('wrongRoomId', function(data){
  alert('sorry ' + data.name + ' Room does not exist');
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


socket.on('playerInfos', function(data){
    character = data.name;
    //alert('to play attack it is good !' + character)
});

launchGameBtn.addEventListener('click', function(data){
  socket.emit('playerReadyToBattle', {name:data.name, role:userRole, playerNumber:data.playerNum, room:roomID});
  launchGameBtn.style.display = "none";
});

socket.on('loadArena', function(data){
  game.loadArena();
  //game.launchTimer();
  //game.drawPlayers();
})

socket.on('loadCommands', function(){
  fightMenu.style.display = "flex";
})

socket.on('updateGauges', function(data){

  //alert('updating damages')

  //player = data.player
  //alert(data.player);

  //opponent = data.opponent;
  //alert(data.opponent);

  let damg = data.dmg;
  game.updateDamages(damg);
  
})


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

  loadArena(){

    // Load Layout //
    document.body.style.backgroundImage ="url('../images/scenes/10029.jpg')";
    document.body.style.backgroundColor = "black";
    
    boxContainer.style.display = "none";
    btnContainer.style.display ="none";
    messageScreen.style.display = "none";
    launchGameBtn.style.display ="none";
    arena.style.display = "block";
    //arena.style.backgroundImage = "url('/images/arenas/Backgrounds/battle_bg_0162_01.jpg')";
    inBattleMessage.style.display = "block"

    if(userRole == 'host'){
      playerNameHolder.innerHTML = playerName;
      opponentNameHolder.innerHTML = opponent;
    } else {
      playerNameHolder.innerHTML = attacker;
      opponentNameHolder.innerHTML = opponentName;
    }
    
    // Load players info // 

     // Get and Set Names, Load Avatars and Sprites
    let hName = hostName;
    let gName = guestName;
    
    if (userRole == 'host'){
      console.log('you are Host');
      userNameHolder.innerHTML = hName;
      userNameHolder.style.textTransform = "capitalize";
      userAvatar = userAvatar.src;
    } else {
      console.log('you are guest');
      userNameHolder.innerHTML = gName;
      userNameHolder.style.textTransform = "capitalize";
      userAvatar = userAvatar.src;
    }

      // check up 
      console.log(hName);
      console.log('hname is ' + hName);
      console.log(gName);
      alert('Loading Arena');
  }

  callCharacter(characterName){
    // call playerImage with case for player1 or player 2
    socket.emit('playerCall', {name:characterName, role:userRole, playerNumber:playerNum});
    select -= 1;
    boxContainer.style.display = "none";
    console.log(playerNum);

    playerLoader(characterName);
    setFighterName(characterName); // set fighters name
    avatarSelector(characterName); // set player avatar
    spritesLoader(characterName); // set player sprites
    console.log(characterName);
  }

  drawPlayers(characterImg, stance){
  }       
  /*
  launchTimer(){
    goActiveTimeBattle();
  }
  */

  attack(player, opponent) {
      // get Attack button Div
    alert('it workssss');
    commands.style.display = "none";

    let luck = Math.round(Math.random());
    let vitality = Math.round(Math.random());
    let luckRedux = Math.round(Math.random());
    let dmgRedux = Math.round(Math.random());
    let hitChance = Math.round(Math.random())*luck; 
    let strength = Math.round(Math.random());
    let damages = Math.round(Math.random())*strength*100;
    let hpBarSize = 100;
    let limitBreak = 0;
    let totalHp = 100;
    alert(damages);
    socket.emit('sendDamages', {player:player, opponent: opponent, dmg:damages});
    inBattleMessage.innerHTML = 'your attacks has a damage power of ' + damages;
    goActiveTimeBattle(fpsInterval);
  }

  updateDamages(dmg){
    alert('updating');
    alert('you lost ' + dmg);
    
    let damageRedux = dmg; 
    alert(damageRedux);

    let hpBarRedux = damageRedux;
    alert(hpBarRedux);
    healthPoints.value -= hpBarRedux;

    if(userRole == 'host'){
      inBattleMessage.innerHTML =  opponent + ' attacks, you lost ' + damageRedux + ' HP';
    } else {
      inBattleMessage.innerHTML = attacker + ' attacks, you lost ' + damageRedux + ' HP';
    }
  }
}


/*
attackBtn.addEventListener('click', function(player, opponent){
  fightername = function ()
  socket.emit
}



let magicBtn = document.getElementById('magic');
let guardBtn = document.getElementById('guard');
let healBtn = document.getElementById('heal');
*/

let fps, fpsInterval, startTime, now, then, elapsed;  

fightBtn.addEventListener('click', function(data){

  //set update timer 
    fpsInterval= 1000/fps;
    then = Date.now();
    startTime = then;

  // launch update timer
    goActiveTimeBattle(fpsInterval);
    fightBtn.style.display = 'none';
    socket.emit('startBattle', {name:data.name, role:userRole, playerNumber:data.playerNum, room:roomID})
});


function goActiveTimeBattle(timeStamp){

  gameOver(attacker, playerName, opponentName, opponent);

  // ATB gauge increment 
  let timeInSecond = timeStamp / 10;
  let atbGauge = document.getElementById('atbGauge');
  let commands = document.getElementById('commands');

  for(var i=0; i<atbGauge.max; i++) { 
      if (timeInSecond - last >= speed) {
          last = timeInSecond;
          atbGauge.value += 1//player1.vitality/100;
      } else if (atbGauge.value === atbGauge.max){
          commands.style.display = "flex";
          atbGauge.value = 0;
          return
        }  
    }
  requestAnimationFrame(goActiveTimeBattle);
}

function spritesLoader(sprite, data){

  //function playerRender()
  playerSprites = sprite;
      if (userRole == 'host'){
        // loadsprites for Host
        player1Div.style.backgroundImage = 'url(/images/characters/'+playerSprites+ '/'+ playerSprites+'/ills.png)';
    } else {
        // load sprites for Guest
        opponent1Div.style.backgroundImage = 'url(/images/characters/'+playerSprites+'/'+ playerSprites+'/ills.png)';
    }
    console.log(sprite)
}

socket.on ('getPlayer', function(data){
  if (userRole == 'guest'){
    attacker = data.name;
    opponent = opponentName;
    alert (attacker + ' host player is in the place opponent is' + opponent);
  }
    socket.emit('sendName', {pName:data.name})
});

socket.on ('getOpponent', function(data){
  if (userRole == 'host'){
    opponent = data.name;
    attacker = playerName;
    alert (opponent + ' guest player is in the place opponent is' + attacker);
  } 
    socket.emit('sendName', {opName:data.name})
});

socket.on('shareNames', function(data){
  if (userRole == 'host'){
  alert('you are playing with ' + playerName + ' and guest with ' + data.opName);
 } else{
  alert('you are playing with ' + opponentName + ' and guest with ' + data.pName );
 }
});

socket.on('gameOverAlert', function(data){
  endGame(data);
});


function setFighterName(data){
  if (userRole == 'host'){
    playerName = data;
    alert (playerName + ' is ready to fight');
  } else {
    opponentName = data;
    alert (opponentName + ' is ready to fight');
  }
  //return {playerName, opponentName};
}


function avatarSelector(type){
  userAvatar = new Image();

    switch (type) {
      case 'Aerith':     
        userAvatar = document.getElementById('userAvatar').src = "../images/characters/thumbs/Aerith.png";
        break;

      case 'Cloud':
        userAvatar = document.getElementById('userAvatar').src = "../images/characters/thumbs/Cloud.png";
        break;

      case 'RedXIII':
        userAvatar = document.getElementById('userAvatar').src = "../images/characters/thumbs/RedXIII.png";
        break;      
       
      case 'Tifa':
        userAvatar = document.getElementById('userAvatar').src = "../images/characters/thumbs/Tifa.png";
        break;     
          
      case 'Vincent':
        userAvatar = document.getElementById('userAvatar').src = "../images/characters/thumbs/Vincent.png";
        break; 
          
      case 'Barret':
        userAvatar = document.getElementById('userAvatar').src = "../images/characters/thumbs/Barret.png";
        break;   
      
      case 'Sephitoth':
        userAvatar = document.getElementById('userAvatar').src = "../images/characters/thumbs/Sephiroth.png";
        break;      
              
      case 'Yuffie':
        userAvatar = document.getElementById('userAvatar').src = "../images/characters/thumbs/Yuffie.png";
        break;  

      case 'Cait-Sith':
        userAvatar = document.getElementById('userAvatar').src = "../images/characters/thumbs/Caith-Sith.png";
        break;    
  }
}


function playerLoader (data){

  if(userRole == 'host'){

    if (data == 'Aerith'){ 
        console.log( data + ' has been chosen by');
        data = new Player(data, 99, 8809, 999, 78, 58, 76, 28); // create new player from player constructor
        socket.emit('playerStats', {role:userRole, name: data.name, level: data.level, healthPoints: data.healthPoints, magicPoints: data.magicPoints, strength: data.strength, mana: data.mana, vitality: data.vitality, luck: data.luck, limitBreak: data.limitBreak, luckRedux: data.luckRedux, dmgRedux: data.dmgRedux })
        alert(data.healthPoints);
    }
    else if (data == 'Cloud'){ 
        data = new Player(data, 99, 9508, 905, 100, 62, 96, 29);

      socket.emit('playerStats', {role:userRole, name: data.name, level: data.level, healthPoints: data.healthPoints, magicPoints: data.magicPoints, strength: data.strength, mana: data.mana, vitality: data.vitality, luck: data.luck, limitBreak: data.limitBreak, luckRedux: data.luckRedux, dmgRedux: data.dmgRedux })
    }
    else if (data == 'RedXIII'){ 
      data = new Player(data, 999, 9552, 866, 91, 78, 92, 28);

      socket.emit('playerStats', {role:userRole, name: data.name, level: data.level, healthPoints: data.healthPoints, magicPoints: data.magicPoints, strength: data.strength, mana: data.mana, vitality: data.vitality, luck: data.luck, limitBreak: data.limitBreak, luckRedux: data.luckRedux, dmgRedux: data.dmgRedux })
    }
    else if (data == 'Tifa'){ 
      data = new Player(data, 999, 9033, 850, 96, 71, 85, 30);

      socket.emit('playerStats', {role:userRole, name: data.name, level: data.level, healthPoints: data.healthPoints, magicPoints: data.magicPoints, strength: data.strength, mana: data.mana, vitality: data.vitality, luck: data.luck, limitBreak: data.limitBreak, luckRedux: data.luckRedux, dmgRedux: data.dmgRedux })
    }
    else if (data == 'Vincent'){ 
      data = new Player(data, 99, 8771, 915, 81, 58, 81, 30);

      socket.emit('playerStats', {role:userRole, name: data.name, level: data.level, healthPoints: data.healthPoints, magicPoints: data.magicPoints, strength: data.strength, mana: data.mana, vitality: data.vitality, luck: data.luck, limitBreak: data.limitBreak, luckRedux: data.luckRedux, dmgRedux: data.dmgRedux })
    }
    else if (data == 'Barret'){ 
      data = new Player(data, 99, 8771, 915, 81, 58, 81, 30);

      socket.emit('playerStats', {role:userRole, name: data.name, level: data.level, healthPoints: data.healthPoints, magicPoints: data.magicPoints, strength: data.strength, mana: data.mana, vitality: data.vitality, luck: data.luck, limitBreak: data.limitBreak, luckRedux: data.luckRedux, dmgRedux: data.dmgRedux })
    }
    else if (data.name == 'Sephitoth'){ 
      data.name = new Player(data.name, 99, 8773, 915, 85, 65, 81, 46);

      socket.emit('playerStats', {role:userRole, name: data.name, level: data.level, healthPoints: data.healthPoints, magicPoints: data.magicPoints, strength: data.strength, mana: data.mana, vitality: data.vitality, luck: data.luck, limitBreak: data.limitBreak, luckRedux: data.luckRedux, dmgRedux: data.dmgRedux })
    }
    else if (data == 'Yuffie'){ 
      data = new Player(data, 9, 8989, 841, 89, 77, 85, 31);

      socket.emit('playerStats', {role:userRole, name: data.name, level: data.level, healthPoints: data.healthPoints, magicPoints: data.magicPoints, strength: data.strength, mana: data.mana, vitality: data.vitality, luck: data.luck, limitBreak: data.limitBreak, luckRedux: data.luckRedux, dmgRedux: data.dmgRedux })
    } 
    else if (data == 'Cait-Sith'){ 
      data = new Player(data, 99, 9132, 869, 85, 57, 81, 30);

      socket.emit('playerStats', {role:userRole, name: data.pName, level: data.level, healthPoints: data.healthPoints, magicPoints: data.magicPoints, strength: data.strength, mana: data.mana, vitality: data.vitality, luck: data.luck, limitBreak: data.limitBreak, luckRedux: data.luckRedux, dmgRedux: data.dmgRedux })
    }
    else {
        console.log('error');
    } 
  }

  if(userRole == 'guest'){

    if (data == 'Aerith'){ 
        console.log( data + ' has been chosen by');
        data = new Player(data, 99, 8809, 999, 78, 58, 76, 28); // create new player from player constructor
        socket.emit('opponentStats', {role:userRole, name: data.name, level: data.level, healthPoints: data.healthPoints, magicPoints: data.magicPoints, strength: data.strength, mana: data.mana, vitality: data.vitality, luck: data.luck, limitBreak: data.limitBreak, luckRedux: data.luckRedux, dmgRedux: data.dmgRedux })
        alert(data.healthPoints);
    }
    else if (data == 'Cloud'){ 
        data = new Player(data, 99, 9508, 905, 100, 62, 96, 29);

      socket.emit('opponentStats', {role:userRole, name: data.name, level: data.level, healthPoints: data.healthPoints, magicPoints: data.magicPoints, strength: data.strength, mana: data.mana, vitality: data.vitality, luck: data.luck, limitBreak: data.limitBreak, luckRedux: data.luckRedux, dmgRedux: data.dmgRedux })
    }
    else if (data == 'RedXIII'){ 
      data = new Player(data, 999, 9552, 866, 91, 78, 92, 28);

      socket.emit('opponentStats', {role:userRole, opName: data.name, level: data.level, healthPoints: data.healthPoints, magicPoints: data.magicPoints, strength: data.strength, mana: data.mana, vitality: data.vitality, luck: data.luck, limitBreak: data.limitBreak, luckRedux: data.luckRedux, dmgRedux: data.dmgRedux })
    }
    else if (data == 'Tifa'){ 
      data = new Player(data, 999, 9033, 850, 96, 71, 85, 30);

      socket.emit('opponentStats', {role:userRole, name: data.name, level: data.level, healthPoints: data.healthPoints, magicPoints: data.magicPoints, strength: data.strength, mana: data.mana, vitality: data.vitality, luck: data.luck, limitBreak: data.limitBreak, luckRedux: data.luckRedux, dmgRedux: data.dmgRedux })
    }
    else if (data == 'Vincent'){ 
      data = new Player(data, 99, 8771, 915, 81, 58, 81, 30);

      socket.emit('opponentStats', {role:userRole, name: data.name, level: data.level, healthPoints: data.healthPoints, magicPoints: data.magicPoints, strength: data.strength, mana: data.mana, vitality: data.vitality, luck: data.luck, limitBreak: data.limitBreak, luckRedux: data.luckRedux, dmgRedux: data.dmgRedux })
    }
    else if (data == 'Barret'){ 
      data = new Player(data, 99, 8771, 915, 81, 58, 81, 30);

      socket.emit('opponentStats', {role:userRole, name: data.name, level: data.level, healthPoints: data.healthPoints, magicPoints: data.magicPoints, strength: data.strength, mana: data.mana, vitality: data.vitality, luck: data.luck, limitBreak: data.limitBreak, luckRedux: data.luckRedux, dmgRedux: data.dmgRedux })
    }
    else if (data.name == 'Sephitoth'){ 
      data.name = new Player(data.name, 99, 8773, 915, 85, 65, 81, 46);

      socket.emit('opponentStats', {role:userRole, name: data.name, level: data.level, healthPoints: data.healthPoints, magicPoints: data.magicPoints, strength: data.strength, mana: data.mana, vitality: data.vitality, luck: data.luck, limitBreak: data.limitBreak, luckRedux: data.luckRedux, dmgRedux: data.dmgRedux })
    }
    else if (data == 'Yuffie'){ 
      data = new Player(data, 9, 8989, 841, 89, 77, 85, 31);

      socket.emit('opponentStats', {role:userRole, name: data.opName, level: data.level, healthPoints: data.healthPoints, magicPoints: data.magicPoints, strength: data.strength, mana: data.mana, vitality: data.vitality, luck: data.luck, limitBreak: data.limitBreak, luckRedux: data.luckRedux, dmgRedux: data.dmgRedux })
    } 
    else if (data == 'Cait-Sith'){ 
      data = new Player(data, 99, 9132, 869, 85, 57, 81, 30);

      socket.emit('opponentStats', {role:userRole, name: data.name, level: data.level, healthPoints: data.healthPoints, magicPoints: data.magicPoints, strength: data.strength, mana: data.mana, vitality: data.vitality, luck: data.luck, limitBreak: data.limitBreak, luckRedux: data.luckRedux, dmgRedux: data.dmgRedux })
    }
    else {
        console.log('error');
    } 
  }
};

class Player {
  constructor (name, lvl, hp, mp, strgh, mana, vlty, luck){
          //this.width = width;
          //this.height = height;
          this.name = name;
          this.level = lvl;
          this.healthPoints = hp;
          this.magicPoints = mp;
          this.strength = strgh;
          this.mana = mana;
          this.vitality = vlty; // between 0 and 100. 
          this.luck = luck;
          //this.image = image;
          this.limitBreak = 0;
          this.luckRedux = this.luck * (Math.floor(Math.random()));// find formula
          this.dmgRedux = this.vitality * (Math.floor(Math.random()));;// find formula
  }
}

function gameOver(){
  if (healthPoints.value <= 0) {
    if(userRole == 'host'){
      socket.emit('gameOver', {looserName:hostName, winnerName:guestName});
    } else {
      socket.emit('gameOver', {looserName:guestName, winnerName:hostName});
    }   
  }
}

function endGame(data){
  commands.style.display = 'none'
  if (healthPoints.value <= 0) {
    if(userRole == 'host'){
      //remplacer par KO
      player1Div.style.backgroundImage = 'url(/images/characters/'+playerSprites+'/dead.png)';
    } else {
      opponent1Div.style.backgroundImage = 'url(/images/characters/'+playerSprites+'/dead.png)';
    }
    inBattleMessage.innerHTML = 'GAME OVER' + data.winnerName + ' won the battle'
    return
  } else {
    if(userRole == 'host'){
      //remplacer par Victory
      player1Div.style.backgroundImage = 'url(/images/characters/'+playerSprites+'/ills.png)';
    } else {
      opponent1Div.style.backgroundImage = 'url(/images/characters/'+playerSprites+'/ills.png)';
    }
    inBattleMessage.innerHTML = 'GAME OVER you won the battle !! '
    return
  }
};


