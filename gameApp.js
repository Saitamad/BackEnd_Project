console.log('gameApp ready to rumble');

let entities = [];
let characters = [];
let cName = '';
let level = '';
let healthPoints = '';
let magicPoints = '';
let strenght = '';
let mana = '';
let vitality = ''; // between 0 and 100. 
let luck = '';
let limitBreak = 0;
let luckRedux = luck * (Math.floor(Math.random()));// find formula
let dmgRedux = vitality * (Math.floor(Math.random()));;// find formula
let playerCount = 0;


exports.startGame = function(io, socket){

    socket.on('gameOver', function(data){
        io.emit('gameOverAlert', {looserName:data.looserName, winnerName:data.winnerName});
    });
    
    socket.on('healthPointChecker', function(data){
        socket.broadcast.emit('gameOver', {name:data.name});
    } )

    socket.on('sendDamages',function(data){
        console.log(data.dmg)
        socket.broadcast.emit('updateGauges',{player:data.player, opponent:data.opponent,dmg:data.dmg })
        console.log(data.dmg)
        console.log(data.player)
        console.log(data.opponent)
    });

    socket.on('sendName', function(data){
        playerCount++;

        if(playerCount >= 2){
            io.emit('shareNames', {pName:data.pName, opName:data.opName});
            playerCount = 0;
            console.log(data.pName)
            console.log(data.opName)
        }
        
    })

    socket.on('playerStats', function(data){
        
        characters.push(data);

        socket.broadcast.emit('getPlayer', {role:data.userRole, name: data.name, level: data.level, healthPoints: data.healthPoints, magicPoints: data.magicPoints, strength: data.strength, mana: data.mana, vitality: data.vitality, luck: data.luck, limitBreak: data.limitBreak, luckRedux: data.luckRedux, dmgRedux: data.dmgRedux});
    
        console.log(characters);
        console.log(data.name);
        console.log(data.vitality);
        console.log(data.mana);
    });

    socket.on('opponentStats', function(data){
        
        characters.push(data);

        socket.broadcast.emit('getOpponent', {role:data.userRole, name: data.name, level: data.level, healthPoints: data.healthPoints, magicPoints: data.magicPoints, strength: data.strength, mana: data.mana, vitality: data.vitality, luck: data.luck, limitBreak: data.limitBreak, luckRedux: data.luckRedux, dmgRedux: data.dmgRedux});
    
        console.log(characters);
        console.log(data.name);
        console.log(data.vitality);
        console.log(data.mana);
    });

    socket.on('playerCall', function(data){
        if (data.name == 'Aerith'){ 
            //data.name = new Player(data.name, 99, 8809, 999, 78, 58, 76, 28); // create new player from player constructor
            entities.push(data)
        console.log('Aerith has been chosen by ' + data.playerNumber);
        socket.emit("playerInfos", {name:data.name, playerNumber: data.playerNum});
        console.log(data.name);
        }
        else if (data.name == 'Cloud')
        { //data.name = new Player(data.name, 99, 9508, 905, 100, 62, 96, 29);
        entities.push(data)
        console.log('Cloud has been chosen by ' + data.playerNumber);
        socket.emit("playerInfos", {name:data.name, playerNumber: data.playerNum});
        }
        else if (data.name == 'RedXIII')
        { //data.name = new Player(data.name, 999, 9552, 866, 91, 78, 92, 28);
        console.log('RedXIII has been chosen by ' + data.playerNumber);
        socket.emit("playerInfos", {name:data.name, playerNumber: data.playerNum});
        }
        else if (data.name == 'Tifa')
        { //data.name = new Player(data.name, 999, 9033, 850, 96, 71, 85, 30);
        console.log('Tifa has been chosen by ' + data.playerNumber);
        socket.emit("playerInfos", {name:data.name, playerNumber: data.playerNum});
        }
        else if (data.name == 'Vincent')
        { //data.name = new Player(data.name, 99, 8771, 915, 81, 58, 81, 30);
        console.log('Vincent has been chosen by ' + data.playerNumber);
        socket.emit("playerInfos", {name:data.name, playerNumber: data.playerNum});
        }
        else if (data.name == 'Barret')
        { //data.name = new Player(data.name, 99, 8771, 915, 81, 58, 81, 30);
        console.log('Barret has been chosen by ' + data.playerNumber);
        socket.emit("playerInfos", {name:data.name, playerNumber: data.playerNum});
        }
        else if (data.name == 'Sephitoth')
        { //data.name = new Player(data.name, 99, 8773, 915, 85, 65, 81, 46);
        console.log('Sephitoth has been chosen by ' + data.playerNumber);
        socket.emit("playerInfos", {name:data.name, playerNumber: data.playerNum});
        }
        else if (data.name == 'Yuffie')
        { //data.name = new Player(data.name, 9, 8989, 841, 89, 77, 85, 31);
        console.log('Yuffie has been chosen by ' + data.playerNumber);
        socket.emit("playerInfos", {name:data.name, playerNumber: data.playerNum});
        } 
        else if (data.name == 'Cait-Sith')
        { //data.name = new Player(data.name, 99, 9132, 869, 85, 57, 81, 30);
        console.log('Cait-Sith has been chosen by ' + data.playerNumber);
        socket.emit("playerInfos", {name:data.name, playerNumber: data.playerNum});
        }
        else {
            console.log('error');
        }
        console.log(data.name)
    });

};

// https://github.com/Juriy/gamedev/blob/master/rps/server/rps-game.js 

/*
class BvExGame{
    constructor(P1, P2){
        this.players = [P1, P2];
        this.turns = [null, null];
        this.sendAllPlayers('Fight Begins');
        this.players.forEach(function (player, Pid) {
            socket.on('turn', function(turn) {
                this.onTurn(Pid, turn);
            });
        });
    }

    sendToPlayer(Pindex, txt){
        this.players[Pindex].emit('message', txt);
    }

    sendAllPlayers(txt){
        this.players.forEach(function(player){
            player.emit('message', txt);
        });
    }

    onTurn(Pindex, turn){
        this.turns[Pindex] = turn;
        this.sendToPlayer
    }
}
*/


//let playerChoice = prompt("Earth, Water, or Fire");
// Fire beats Earth - Earth beats Water - Water beats Fire





/*
goActiveTimeBattle = function (timeStamp){
    let timeInSecond = timeStamp / 10;
    let atbGauge = document.querySelectorAll('.atbGauge');
    let commands = document.getElementById('commands');

    for(var i=0; i<atbGauge.length; i++) { 
        if (timeInSecond - last >= speed) {
            last = timeInSecond;
            frame ++
            console.log(frame);
            atbGauge[i].value += player1.vitality/100;
        } else if (atbGauge[i].value === atbGauge[i].max){
            commands.style.display = "flex";
            atbGauge[i].value = 0;
            return
        }  
    }

   

    requestAnimationFrame(goActiveTimeBattle);
}

requestAnimationFrame(goActiveTimeBattle);
*/



/*
:::::::::::::::::::
:                 :
:/ GAME SOCKETS  /:
:                 :
:::::::::::::::::::

Game logic:

Battle Begins : 
 - load arena 
 - load players 
Battlers punch each other until one side wins
Battle Ends


*/

/*
// function qui envoie l'état des joeurs 60 fois par secondes 

function update() {
    io.volatile.emit('players list', Object.values(players));
  }
  
  setInterval(update, 1000/60);
*/

// Implémenter la logique de tour par tour et donner l'ordre de choisir son action avec un emit

/*
function goActiveTimeBattle(timeStamp){
    let timeInSecond = timeStamp / 1000;

    if (timeInSecond - last >= speed) {
      last = timeInSecond;

      console.log(++num);
    }
    requestAnimationFrame(goActiveTimeBattle);
} 
*/




