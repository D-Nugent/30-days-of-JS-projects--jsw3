// Element Selectors
const battleWindow = document.querySelector('.battle-window');
const battleMessages = battleWindow.querySelector('.battle-window__messages');
const enemySprite = document.querySelector('.enemy__sprite');
const gameOverModal = document.querySelector('.game-over');
const battleBtns = battleWindow.querySelectorAll('[data-type="battle"]');
const primaryMenu = battleWindow.querySelector('.battle-menu__primary');
const secondaryMenu = battleWindow.querySelector('.battle-menu__secondary');
const enemyData = battleWindow.querySelector('.enemy-data');
const battleDetails ={
  container: battleWindow.querySelector('.battle-menu__details'),
  name: battleWindow.querySelector('.battle-menu__effect-name'),
  ap: battleWindow.querySelector('.battle-menu__effect-ap'),
  description: battleWindow.querySelector('.battle-menu__effect-description'),
  details: battleWindow.querySelector('.battle-menu__effect-details'),
} 
const attackBtn = battleBtns[0];

// Event Listeners
battleBtns.forEach(btn => btn.addEventListener('click',battleAction))

// Control Variables
const monsterTypes = ['ghoul','vulture','leech','werewolf'];
let currentMonster;
let isPlayerturn = true;
let isGameOver = false;
const playerItems = ['Potion','Restore'];
let braveryMode = false;
// Functions

// Function Objects

const heroData = () => {
  return ({
    _heroHealth: 300,
    _heroAP: 120,
    get heroHealth(){
      return this._heroHealth
    },
    get heroAP(){
      return this._heroAP
    },
    reduceHeroHealth(attackPower) {
      const newHealth = this._heroHealth - attackPower;
      this._heroHealth = newHealth;
      const healthPerc = (this._heroHealth / 300) * 100;
      document.documentElement.style.setProperty('--playerHealth', `${healthPerc}%`);
      document.documentElement.style.setProperty('--playerHealthColor', `${healthPerc>70?'green':healthPerc>40?'orange':'red'}`);
      if(this._heroHealth <= 0) this.heroDefeated();
      if(healthPerc < 40) toggleBravery();
    },
    reduceHeroAP(cost) {
      const newAP = this._heroAP - cost;
      this._heroAP = newAP;
      const apPerc = (this._heroAP / 120) * 100;
      document.documentElement.style.setProperty('--playerAP', `${apPerc}%`);
    },
    useAttack(target){
      setPlayerSprite(characterConfig.attackBasic);
      setSFX(attackSFX.attackBasic,'--enemySFX');
      soundEffects.slice.play();
      newBattleMessage('[arr]thur used a regular attack');
      target.reduceMonsterHealth(40);
    },
    useFiarr(target){
      setPlayerSprite(characterConfig.attackMagic);
      setSFX(attackSFX.attackFiarr,'--enemySFX');
      soundEffects.fire.play();
      newBattleMessage('[arr]thur used fi[arr]!');
      if(target.monsterWeakness === 'fire') {
        target.reduceMonsterHealth(80);
        newBattleMessage(`It's super effective!`);
      } else {
        target.reduceMonsterHealth(30);
        newBattleMessage(`It's not very effective.`);
      }
      this.reduceHeroAP(12);
    },
    useBlizaard(target){
      setPlayerSprite(characterConfig.attackMagic);
      setSFX(attackSFX.attackBlizarrd,'--enemySFX',2);
      soundEffects.ice.play();
      newBattleMessage('[arr]thur used bliz[arr]d!')
      if(target.monsterWeakness === 'ice') {
        target.reduceMonsterHealth(80);
        newBattleMessage(`It's super effective!`)
      } else {
        target.reduceMonsterHealth(30);
        newBattleMessage(`It's not very effective.`)
      }
      this.reduceHeroAP(12);
    },
    useSparrk(target){
      setPlayerSprite(characterConfig.attackMagic);
      setSFX(attackSFX.attackSparrk,'--enemySFX');
      soundEffects.lightning.play();
      newBattleMessage('[arr]thur used sp[arr]k!')
      if(target.monsterWeakness === 'lightning') {
        target.reduceMonsterHealth(80);
        newBattleMessage(`It's super effective!`)
      } else {
        target.reduceMonsterHealth(30);
        newBattleMessage(`It's not very effective.`)
      }
      this.reduceHeroAP(12);
    },
    useDisableBarrier(target) {
      setPlayerSprite(characterConfig.attackMagic);
      setSFX(attackSFX.attackDisable,'--enemySFX',2);
      soundEffects.break.play();
      if (target.hasBarrier) {
        target.hasBarrier = false;
        newBattleMessage(`Enemy barrier removed!`)
      } else {
        newBattleMessage(`Enemy doesn't have a barrier.`)
      }
      this.reduceHeroAP(8);
      enemyData.innerHTML = JSON.stringify(currentMonster.monsterData,null,'<br>');
    },
    useScarrletBlade(target) {
      setPlayerSprite(characterConfig.attackScarlet);
      soundEffects.swing.play();
      setSFX(attackSFX.attackScarlet,'--enemySFX',2);
      newBattleMessage('[arr]thur used Sc[arr]let Blade!');
      target.reduceMonsterHealth(100);
      this.reduceHeroAP(30);
    },
    useHarrmony() {
      if (this._heroAP<18){
        newBattleMessage('Not enough AP');
        return;
      }
      setPlayerSprite(characterConfig.attackMagic);
      soundEffects.heal.play();
      setSFX(attackSFX.attackHarrmony,'--playerSFX',1);
      newBattleMessage(`[arr]thur used H[arr]mony`);
      const newHealth = this._heroHealth + 150;
      this._heroHealth = newHealth>300?300:newHealth;
      const healthPerc = (this._heroHealth / 300) * 100;
      document.documentElement.style.setProperty('--playerHealth', `${healthPerc}%`);
      document.documentElement.style.setProperty('--playerHealthColor', `${healthPerc>70?'green':healthPerc>40?'orange':'red'}`);
      this.reduceHeroAP(18);
    },
    usePotion(){
      setPlayerSprite(characterConfig.attackMagic)
      soundEffects.heal.play();
      setSFX(attackSFX.attackHarrmony,'--playerSFX',1);
      newBattleMessage(`[arr]thur used a Potion`);
      let potionIndex = playerItems.indexOf('Potion');
      playerItems.splice(potionIndex,1);
      const newHealth = this._heroHealth + 120;
      this._heroHealth = newHealth>300?300:newHealth;
      const healthPerc = (this._heroHealth / 300) * 100;
      document.documentElement.style.setProperty('--playerHealth', `${healthPerc}%`);
      document.documentElement.style.setProperty('--playerHealthColor', `${healthPerc>70?'green':healthPerc>40?'orange':'red'}`);
    },
    useRestore(){
      setPlayerSprite(characterConfig.attackMagic)
      soundEffects.heal.play();
      setSFX(attackSFX.attackHarrmony,'--playerSFX',1);
      newBattleMessage(`[arr]thur used a Restore`);
      let restoreIndex = playerItems.indexOf('Restore');
      playerItems.splice(restoreIndex,1);
      const newAP = this._heroAP + 60;
      this._heroAP = newAP>120?120:newAP;
      const apPerc = (this._heroAP / 120) * 100;
      document.documentElement.style.setProperty('--playerAP', `${apPerc}%`);
    },
    useRagnarrok(target){
      setPlayerSprite(characterConfig.attackRagnarok)
      soundEffects.break.play();
      setTimeout(() => {soundEffects.fire.play()}, 200);
      setTimeout(() => {soundEffects.ice.play()}, 400);
      setTimeout(() => {soundEffects.lightning.play()}, 600);
      setTimeout(() => {soundEffects.swing.play()}, 800);
      setSFX(attackSFX.attackRagnarok,'--enemySFX',.5);
      newBattleMessage('Ultimate Attack! Ragn[arr]ok!');
      if (target.hasBarrier) {
        target.hasBarrier = false;
        target.reduceMonsterHealth(200);
        target.hasBarrier = true;
      } else {
        target.reduceMonsterHealth(200);
      }
      toggleBravery()
    },
    heroDefeated(){
      isGameOver = true;
      newBattleMessage('Hero defeated...');
      setTimeout(() => {
        gameOverModal.classList.add('--active');
      }, 2000);
    }
  })
}
const hero = heroData();


const createMonster = (type) => ({
  _monsterName:{
    ghoul:'Ghoul',
    vulture:'Demon Feather',
    leech: 'Giant Leech',
    werewolf: 'Werewolf',
    hydra: 'Hydra'
  }[type],
  _totalMonsterHealth:{
    ghoul:90,
    vulture:100,
    leech:60,
    werewolf:80,
    hydra:200
  }[type],
  _monsterHealth:{
    ghoul:90,
    vulture:100,
    leech:60,
    werewolf:80,
    hydra:200
  }[type],
  _monsterSprite:{
    ghoul:'../../assets/sprites/monster/ghoul.png',
    vulture:'../../assets/sprites/monster/demon-feather.png',
    leech:'../../assets/sprites/monster/giant-leech.png',
    werewolf:'../../assets/sprites/monster/werewolf.png',
    hydra:'../../assets/sprites/monster/hydra.png'
  }[type],
  _standardAttackPower:{
    ghoul:35,
    vulture:40,
    leech:20,
    werewolf:25,
    hydra:50
  }[type],
  _specialAttackName:{
    ghoul: 'Consume Soul',
    vulture: 'Talon Slash',
    leech: 'Blood Suck',
    werewolf: 'Sharp Fang',
    hydra: 'Flamethrower',
  }[type],
  _specialAttackPower:{
    ghoul:50,
    vulture:60,
    leech:30,
    werewolf:35,
    hydra:100
  }[type],
  _specialAttackSoundEffect:{
    ghoul:soundEffects.ghoul,
    vulture:soundEffects.bird,
    leech:soundEffects.absorb,
    werewolf:soundEffects.crunch,
    hydra:soundEffects.inferno
  }[type],
  _monsterWeakness:{
    ghoul:'fire',
    vulture:'lightning',
    leech:'nothing',
    werewolf:'ice',
    hydra:'nothing'
  }[type],
  _hasBarrier:{
    ghoul:false,
    vulture:false,
    leech:true,
    werewolf:false,
    hydra:true
  }[type],
  _monsterType:type,
  get monsterType(){
    return this._monsterType;
  },
  get hasBarrier(){
    return this._hasBarrier;
  },
  set hasBarrier(boolean){
    this._hasBarrier = boolean;
  },
  get monsterName(){
    return this._monsterName;
  },
  get monsterData() {
    return {
      health: this.monsterHealth,
      name: this.monsterName,
      weakness: this.monsterWeakness,
      hasBarrier: this.hasBarrier,
    }
  },
  get monsterHealth(){
    return this._monsterHealth;
  },
  get monsterSprite(){
    return this._monsterSprite
  },
  get monsterWeakness(){
    return this._monsterWeakness;
  },
  reduceMonsterHealth(attackPower) {
    if(this._hasBarrier) attackPower = attackPower/2;
    const newHealth = this._monsterHealth - attackPower;
    this._monsterHealth = newHealth<0?0:newHealth;
    const healthPerc = (this._monsterHealth / this._totalMonsterHealth) * 100;
    document.documentElement.style.setProperty('--enemyHealth',`${healthPerc}%`);
    document.documentElement.style.setProperty('--enemyHealthColor', `${healthPerc>70?'green':healthPerc>40?'orange':'red'}`);
    if(this._monsterHealth <= 0) this.monsterDefeated();
    enemyData.innerHTML = JSON.stringify(currentMonster.monsterData,null,'<br>');
  },
  useAttack(target){
    const isSpecialAttack = Math.random() < .2;
    if(!isSpecialAttack) {
      newBattleMessage(`${this.monsterName} used a regular attack`);
      soundEffects.slice.play();
      setSFX(attackSFX.attackBasic,'--playerSFX');
      target.reduceHeroHealth(this._standardAttackPower);
    } else {
      newBattleMessage(`${this.monsterName} used ${this._specialAttackName}`);
      this._specialAttackSoundEffect.play();
      setSFX(attackSFX[type],'--playerSFX',2);
      target.reduceHeroHealth(this._specialAttackPower);
    }
  },
  monsterDefeated(){
    newBattleMessage(`${this._monsterName} defeated!`,3000);
    const conditionalTimeout = braveryMode? 4000 : 2200;
    setTimeout(() => {
      battleWindow.classList.remove('--active');
      inBattle = false;
      isPlayerturn = true;
      document.documentElement.style.setProperty('--enemyHealth',`100%`);
      document.documentElement.style.setProperty('--enemyHealthColor', `green`);
      audioTrack[1].pause();
      if (audioTrack[0].paused && !audioManuallyPaused) {
        audioTrack[0].play();
        audioBtn.innerText = "🔊"
      }
    }, conditionalTimeout);
    if (type === 'hydra') {
      heroMsg.innerHTML = `
      <p>Congratulations! You received The sword of [arr]gus!</p>
      `;
    setTimeout(() => window.location.href = '../victory/victory.html', 6000);
    }
  }
})

// Logic Functions

const newBattleMessage = (msg,optionalTimeout = 2000) => {
  battleMessages.classList.add('--active');
  battleMessages.textContent = msg;
  setTimeout(() => {
    battleMessages.classList.remove('--active');
  }, optionalTimeout);
}

const startBattle = (isBoss = false) => {
  battleWindow.classList.add('--active');
  sceneChange(200,0);
  sceneChange(1000,10);
  inBattle = true;
  if (!isBoss) {
    const randomMonster = monsterTypes[Math.floor(Math.random()*4)]
    currentMonster = createMonster(randomMonster);
  } else {
    currentMonster = createMonster('hydra')
    audioTrack[0].volume = 0;
  }
  enemySprite.setAttribute('src',currentMonster.monsterSprite);
  primaryMenu.classList.remove('--inactive');
  enemyData.innerHTML = JSON.stringify(currentMonster.monsterData,null,'<br>');
  audioTrack[0].pause();
  if (audioTrack[1].paused && !audioManuallyPaused) {
    audioTrack[1].currentTime = 0;
    audioTrack[1].play();
    audioBtn.innerText = "🔊"
  }
}

function loadSkills(){
  secondaryMenu.innerHTML = `
  <button class="battle-menu__option" data-type="skill" data-method="fiarr">
    Fi[arr]
  </button>
  <button class="battle-menu__option" data-type="skill" data-method="blizarrd">
    Bliz[arr]d
  </button>
  <button class="battle-menu__option" data-type="skill" data-method="sparrk">
    Sp[arr]k
  </button>
  <button class="battle-menu__option" data-type="skill" data-method="disable">
    Disable
  </button>
  <button class="battle-menu__option" data-type="skill" data-method="scarrlet">
    Sc[arr]let Blade
  </button>
  <button class="battle-menu__option" data-type="skill" data-method="harrmony">
    H[arr]mony
  </button>
  `
}

function loadItems(){
  secondaryMenu.innerHTML = playerItems.map(item => {
    return `
    <button class="battle-menu__option" data-type="skill" data-method="${item.toLowerCase()}">
      ${item}
    </button>
  `
  }).join('');
}

const setUpActionBtns = () => {
  const actionBtns = secondaryMenu.querySelectorAll('button');
  actionBtns.forEach(btn => btn.addEventListener('click',battleAction))
  actionBtns.forEach(btn => btn.addEventListener('mouseenter',toggleBattleDetails))
  actionBtns.forEach(btn => btn.addEventListener('mouseleave',toggleBattleDetails))
}

function toggleBattleDetails(){
  battleDetails.container.classList.toggle('--active');
  if(battleDetails.container.classList.contains('--active')) {
    return actionDetails = {
      fiarr:() => {
        battleDetails.name.textContent = 'Fi[arr]';
        battleDetails.ap.textContent = '12AP'
        battleDetails.description.textContent = '[arr]cane Magic: Unleashes a fury of flames damaging the enemy'
        battleDetails.details.innerHTML = `${currentMonster.monsterType}.weakness === 'fire'?${currentMonster.monsterType}.health -= 80:${currentMonster.monsterType}.health -= 30`
      },
      blizarrd:() => {
        battleDetails.name.textContent = 'Bliz[arr]d';
        battleDetails.ap.textContent = '12AP'
        battleDetails.description.textContent = '[arr]cane Magic: Slices with blades of crystal ice damaging the enemy'
        battleDetails.details.innerHTML = `${currentMonster.monsterType}.weakness === 'ice'?${currentMonster.monsterType}.health -= 80:${currentMonster.monsterType}.health -= 30`
      },
      sparrk:() => {
        battleDetails.name.textContent = 'Sp[arr]k';
        battleDetails.ap.textContent = '12AP'
        battleDetails.description.textContent = '[arr]cane Magic: Calls forth a powerful bolt of lightning damaging the enemy'
        battleDetails.details.innerHTML = `${currentMonster.monsterType}.weakness === 'lightning'?${currentMonster.monsterType}.health -= 80:${currentMonster.monsterType}.health -= 30`
      },
      disable:() => {
        battleDetails.name.textContent = 'Disable';
        battleDetails.ap.textContent = '8AP'
        battleDetails.description.textContent = 'Secret [arr]t: Crushes any barriers that an enemy might have. Increasing the potency of other attacks'
        battleDetails.details.innerHTML = `Object.assign(${currentMonster.monsterType},{hasBarrier:false})`
      },
      scarrlet:() => {
        battleDetails.name.textContent = 'Sc[arr]let Blade';
        battleDetails.ap.textContent = '30AP'
        battleDetails.description.textContent = 'Secret [arr]t: Channels the full power of [arr]ay methods into a single sword swing'
        battleDetails.details.innerHTML = `${currentMonster.monsterType}.health -= 100`
      },
      harrmony:() => {
        battleDetails.name.textContent = 'H[arr]mony';
        battleDetails.ap.textContent = '18AP'
        battleDetails.description.textContent = 'Secret [arr]t: Draws power from nature to restore health by 50%'
        battleDetails.details.innerHTML = `let newHealth = hero[health] + (hero.maxHealth * .5);<br><br>hero.health = newHealth>hero.maxHealth?hero.maxHealth:newHealth`
      },
      potion:() => {
        battleDetails.name.textContent = 'Potion';
        battleDetails.ap.textContent = '';
        battleDetails.description.textContent = 'Restores 120HP'
        battleDetails.details.innerHTML = `let newHealth = hero[health] + 120;<br><br>hero.health = newHealth>hero.maxHealth?hero.maxHealth:newHealth`
      },
      restore:() => {
        battleDetails.name.textContent = 'Restore';
        battleDetails.ap.textContent = '';
        battleDetails.description.textContent = 'Restores 60AP'
        battleDetails.details.innerHTML = `let newAP = hero[ap] + 60;<br><br>hero.ap = newAP>hero.maxAP?hero.maxAP:newAP`
      },
    }[this.dataset.method]()
  }
}

function battleAction(){
  if (!isPlayerturn) return;
  if (isGameOver) return;
  soundEffects.all.forEach(sound => sound.currentTime = 0);
  return methods = {
    attack:() => {
      hero.useAttack(currentMonster);
      secondaryMenu.classList.remove('--active');
      primaryMenu.classList.add('--inactive');
      if(currentMonster.monsterHealth > 0) runEnemyTurn()
    },
    skill:() => {
      secondaryMenu.classList.add('--active');
      loadSkills();
      setUpActionBtns();
    },
    item:() => {
      secondaryMenu.classList.add('--active');
      loadItems();
      setUpActionBtns();
    },
    run:() => {
      const escapeChance = .4;
      const escaped = Math.random() <= escapeChance;
      if (escaped) {
        newBattleMessage('Player successfully escaped.');
        setTimeout(() => {
          battleWindow.classList.remove('--active');
          inBattle = false;
        }, 2000);
      }  else {
        newBattleMessage('Failed to escape.');
        if(currentMonster.monsterHealth > 0) runEnemyTurn()
      }
      primaryMenu.classList.add('--inactive');
      secondaryMenu.classList.remove('--active');
    },
    fiarr:() => {
      if (hero.heroAP<12){
        return newBattleMessage('Not enough AP');
      }
      hero.useFiarr(currentMonster);
      primaryMenu.classList.add('--inactive');
      if(currentMonster.monsterHealth > 0) runEnemyTurn();
      secondaryMenu.classList.remove('--active');
    },
    blizarrd:() => {
      if (hero.heroAP<12){
        return newBattleMessage('Not enough AP');
      }
      hero.useBlizaard(currentMonster);
      primaryMenu.classList.add('--inactive');
      if(currentMonster.monsterHealth > 0) runEnemyTurn()
      secondaryMenu.classList.remove('--active');
    },
    sparrk:() => {
      if (hero.heroAP<12){
        return newBattleMessage('Not enough AP');
      }
      hero.useSparrk(currentMonster);
      primaryMenu.classList.add('--inactive');
      if(currentMonster.monsterHealth > 0) runEnemyTurn()
      secondaryMenu.classList.remove('--active');
    },
    disable:() => {
      if (hero.heroAP<8){
        return newBattleMessage('Not enough AP');
      }
      hero.useDisableBarrier(currentMonster);
      primaryMenu.classList.add('--inactive');
      if(currentMonster.monsterHealth > 0) runEnemyTurn()
      secondaryMenu.classList.remove('--active');
    },
    scarrlet:() => {
      if (hero.heroAP<30){
        return newBattleMessage('Not enough AP');
      }
      hero.useScarrletBlade(currentMonster);
      primaryMenu.classList.add('--inactive');
      if(currentMonster.monsterHealth > 0) runEnemyTurn()
      secondaryMenu.classList.remove('--active');
    },
    harrmony:() => {
      if (hero.heroAP<18){
        return newBattleMessage('Not enough AP');
      }
      hero.useHarrmony(currentMonster);
      primaryMenu.classList.add('--inactive');
      if(currentMonster.monsterHealth > 0) runEnemyTurn()
      secondaryMenu.classList.remove('--active');
    },
    potion:() => {
      hero.usePotion();
      primaryMenu.classList.add('--inactive');
      if(currentMonster.monsterHealth > 0) runEnemyTurn()
      secondaryMenu.classList.remove('--active');
    },
    restore:() => {
      hero.useRestore();
      primaryMenu.classList.add('--inactive');
      if(currentMonster.monsterHealth > 0) runEnemyTurn()
      secondaryMenu.classList.remove('--active');
    },
    ragnarrok:() => {
      hero.useRagnarrok(currentMonster);
      primaryMenu.classList.add('--inactive');
      if(currentMonster.monsterHealth > 0) runEnemyTurn()
      secondaryMenu.classList.remove('--active')
    }
  }[this.dataset.method]();
}

const runEnemyTurn = () => {
  isPlayerturn = false;
  soundEffects.all.forEach(sound => sound.currentTime = 0);
  setTimeout(() => {
    currentMonster.useAttack(hero);
    isPlayerturn = true;
    primaryMenu.classList.remove('--inactive');
  }, 3000);
}

const setPlayerSprite = (spriteUrl,delay = 1000) => {
  document.documentElement.style.setProperty('--battleSprite', spriteUrl);
  setTimeout(() => {
    document.documentElement.style.setProperty('--battleSprite', characterConfig.leftTurn);
  }, delay);
}

const setSFX = (spriteUrl,targetProperty,fpsModifier=3) => {
const spriteArr = [...spriteUrl];
let fpsInterval = 1000 / (spriteArr.length * fpsModifier);
let then = window.performance.now();
let now,elapsed;

  function assignSprite(){
    now = window.performance.now();
    elapsed = now - then;
    if (elapsed > fpsInterval) {
      if (spriteArr.length===0) {
        document.documentElement.style.setProperty(targetProperty, null)
        return cancelAnimationFrame(assignSprite);
      };
      then = now - (elapsed % fpsInterval);
      document.documentElement.style.setProperty(targetProperty, spriteArr.shift());
    }
    requestAnimationFrame(assignSprite)
  }
  assignSprite()
}

const toggleBravery = () => {
  if(!braveryMode) {
    braveryMode = !braveryMode;
    newBattleMessage(`It's getting desparate, [arr]thur has enabled Bravery!`);
    attackBtn.textContent = 'Ragn[arr]ok';
    attackBtn.setAttribute('data-method','ragnarrok');
  } else {
    braveryMode = !braveryMode;
    attackBtn.textContent = 'Attack';
    attackBtn.setAttribute('data-method','attack');
  }
}