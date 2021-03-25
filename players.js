class Player {
    constructor (name, lvl, hp, mp, strgh, mana, vlty, luck){
            //this.username = '', // to add to game logoic.addplayer
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
            this.image = new Image;
                 image.src = ('./public/images/characters/' + name + '.png');
    }

    attack(opponent) {
            // get Attack button Div
        attackBtn.onclick = function(){
            alert('WASHHUUUUU');
            
        }
         let hitchance = Math.round(Math.random()* this.luck); 
          if (hitchance <= (this.luck * opponent.luckRedux)){
              let damages = this.strenght * (opponent.vitality * opponent.dmgRedux);
              this.hp -= damages;
            if (this.healthPoints < 0){
                this.healthPoints = 0;
            }
    
        // reduce the hp bar size according to hp level loss 
              let hpBarRedux = (this.healthPoints/100) * hpBarSize; // hpBarSize is to be modified following the CSS pixel width of HP bars that we'll build. 
              hpBar.style.width = hpBarRedux = 'px';
              let lbIncrease = damages / 10; // formula to define the limit break level increasement
    
        // increasing limitbreak bar according to damages + reduction 
              this.limitBreak += lbIncrease;
    
          } else {
            battleInfos.innerHTML = this.name + ' missed his target';
              // prévoir son spécifique  
          }
    }

    dealDamages(opponent){};
}

module.exports = Player;


