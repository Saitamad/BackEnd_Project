console.log('gameApp ready to rumble');

let entities = [];


let last = 0;
let num = 0;
let speed = 2;
let playerNumber



exports.startGame = function(sio, socket){


    //socket.on("joinGame", goActiveTimeBattle);

    // selectable player version 
    socket.on('playerCall', function(data){
        if (data.name == 'Aerith'){ 
            data.name = new Player(data.name, 99, 8809, 999, 78, 58, 76, 28); // create new player from player constructor
            entities.push(data)
        console.log('Aerith has been chosen by ' + data.playerNumber);
        socket.emit("playerInfos", {name:data.name, playerNumber: data.playerNum});
        }
        else if (data.name == 'Cloud')
        { data.name = new Player(data.name, Aeris, 99, 9508, 905, 100, 62, 96, 29);
        }
        else if (data.name == 'RedXIII')
        { data.name = new Player(data.name, 999, 9552, 866, 91, 78, 92, 28);
        }
        else if (data.name == 'Tifa')
        { data.name = new Player(data.name, 999, 9033, 850, 96, 71, 85, 30);
        }
        else if (data.name == 'Vincent')
        { data.name = new Player(data.name, 99, 8771, 915, 81, 58, 81, 30);
        }
        else if (data.name == 'Barret')
        { data.name = new Player(data.name, 99, 8771, 915, 81, 58, 81, 30);
        }
        else if (data.name == 'Sephitoth')
        { data.name = new Player(data.name, 99, 8773, 915, 85, 65, 81, 46);
        }
        else if (data.name == 'Yuffie')
        { data.name = new Player(data.name, 9, 8989, 841, 89, 77, 85, 31);
        } 
        else if (data.name == 'Cait-Sith')
        { data.name = new Player(data.name, 99, 9132, 869, 85, 57, 81, 30);
        }
        else {
            console.log('error');
        }
        console.log(data.name)
    });


};

class Player {
    constructor (name, lvl, hp, mp, strgh, mana, vlty, luck){
            //this.username = '', // to add to game logoic.addplayer
            //this.xPos = x;
            //this.yPos = y;
            //this.width = width;
            //this.height = height;
            this.name = name;
            this.level = lvl;
            this.healthPoints = hp;
            this.magicPoints = mp;
            this.strenght = strgh;
            this.mana = mana;
            this.vitality = vlty; // between 0 and 100. 
            this.luck = luck;
            //this.image = image;
            this.limibreak = 0;
            this.luckRedux = this.luck * (Math.floor(Math.random()));// find formula
            this.dmgRedux = this.vitality * (Math.floor(Math.random()));;// find formula
            //this.image = new Image();
                 //image.src = ('./public/images/characters/' + name + '.png');
    }
}
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




