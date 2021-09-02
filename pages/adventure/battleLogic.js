// Element Selectors
const battleWindow = document.querySelector('.battle-window');
const battleMessages = battleWindow.querySelector('.battle-window__messages');
const enemySprite = document.querySelector('.enemy__sprite');
const gameOverModal = document.querySelector('.game-over');
const battleBtns = battleWindow.querySelectorAll('[data-type="battle"]');
const secondaryMenu = battleWindow.querySelector('.battle-menu__secondary');
const battleDetails ={
  container: battleWindow.querySelector('.battle-menu__details'),
  name: battleWindow.querySelector('.battle-menu__effect-name'),
  description: battleWindow.querySelector('.battle-menu__effect-description'),
  details: battleWindow.querySelector('.battle-menu__effect-details'),
} 
// Event Listeners
battleBtns.forEach(btn => btn.addEventListener('click',battleAction))

// Control Variables
const monsterTypes = ['ghoul','vulture','leech','werewolf'];
let currentMonster;
let isPlayerturn = true;
const playerItems = ['Potion','Potion']
// Functions

// Function Objects

const heroData = () => {
  return ({
    _heroHealth: 300,
    _heroAP: 80,
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
    },
    useAttack(target){
      setPlayerSprite(characterConfig.attackBasic);
      setSFX(attackSFX.attackBasic,'--enemySFX');
      newBattleMessage('Player used a regular attack');
      target.reduceMonsterHealth(40);
    },
    useFiarr(target){
      setPlayerSprite(characterConfig.attackMagic);
      setSFX(attackSFX.attackFiarr,'--enemySFX');
      newBattleMessage('Player used fi[arr]!');
      if(target.monsterWeakness === 'fire') {
        target.reduceMonsterHealth(80);
        newBattleMessage(`It's super effective!`);
      } else {
        target.reduceMonsterHealth(30);
        newBattleMessage(`It's not very effective.`);
      }
    },
    useBlizaard(target){
      setPlayerSprite(characterConfig.attackMagic);
      setSFX(attackSFX.attackBlizarrd,'--enemySFX',2);
      newBattleMessage('Player used bliz[arr]d!')
      if(target.monsterWeakness === 'ice') {
        target.reduceMonsterHealth(80);
        newBattleMessage(`It's super effective!`)
      } else {
        target.reduceMonsterHealth(30);
        newBattleMessage(`It's not very effective.`)
      }
    },
    useSparrk(target){
      setPlayerSprite(characterConfig.attackMagic);
      setSFX(attackSFX.attackSparrk,'--enemySFX');
      newBattleMessage('Player used sp[arr]k!')
      if(target.monsterWeakness === 'lightning') {
        target.reduceMonsterHealth(80);
        newBattleMessage(`It's super effective!`)
      } else {
        target.reduceMonsterHealth(30);
        newBattleMessage(`It's not very effective.`)
      }
    },
    useDisableBarrier(target) {
      setPlayerSprite(characterConfig.attackMagic);
      setSFX(attackSFX.attackDisable,'--enemySFX',2);
      if (target.hasBarrier) {
        target.hasBarrier = false;
        newBattleMessage(`Enemy barrier removed!`)
      } else {
        newBattleMessage(`Enemy doesn't have a barrier.`)
      }
    },
    useScarrletBlade(target) {
      setPlayerSprite(characterConfig.attackScarlet);
      setSFX(attackSFX.attackScarlet,'--enemySFX',2);
      newBattleMessage('Player used Sc[arr]let Blade!');
      target.reduceMonsterHealth(100);
    },
    useHarrmony() {
      setPlayerSprite(characterConfig.attackMagic);
      setSFX(attackSFX.attackHarrmony,'--playerSFX',1);
      newBattleMessage(`Player used H[arr]mony`);
      const newHealth = this._heroHealth + 150;
      this._heroHealth = newHealth>300?300:newHealth;
      const healthPerc = (this._heroHealth / 300) * 100;
      document.documentElement.style.setProperty('--playerHealth', `${healthPerc}%`);
      document.documentElement.style.setProperty('--playerHealthColor', `${healthPerc>70?'green':healthPerc>40?'orange':'red'}`);
    },
    usePotion(){
      setPlayerSprite(characterConfig.attackMagic)
      setSFX(attackSFX.attackHarrmony,'--playerSFX',1);
      newBattleMessage(`Player used a Potion`);
      let potionIndex = playerItems.indexOf('Potion');
      playerItems.splice(potionIndex,1);
      const newHealth = this._heroHealth + 120;
      this._heroHealth = newHealth>300?300:newHealth;
      const healthPerc = (this._heroHealth / 300) * 100;
      document.documentElement.style.setProperty('--playerHealth', `${healthPerc}%`);
      document.documentElement.style.setProperty('--playerHealthColor', `${healthPerc>70?'green':healthPerc>40?'orange':'red'}`);
    },
    useRagnarrok(target){
      setPlayerSprite(characterConfig.attackRagnarok)
      newBattleMessage('Ultimate Attack! Ragn[arr]ok!');
      const targetHasBarrier = target.hasBarrier;
      if (targetHasBarrier) {
        target.hasBarrier = false;
        target.reduceMonsterHealth(200);
        targetHasBarrier = true;
      } else {
        target.reduceMonsterHealth(200);
      }
    },
    heroDefeated(){
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
    hydra:'../../assets/sprites/monster/hyrdra.png'
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
  get hasBarrier(){
    return this._hasBarrier;
  },
  set hasBarrier(boolean){
    this._hasBarrier = boolean;
  },
  get monsterName(){
    return this._monsterName;
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
  },
  useAttack(target){
    const isSpecialAttack = Math.random() < .2;
    if(!isSpecialAttack) {
      newBattleMessage('Enemy used a regular attack');
      setSFX(attackSFX.attackBasic,'--playerSFX');
      target.reduceHeroHealth(this._standardAttackPower);
    } else {
      newBattleMessage(`Enemy used ${this._specialAttackName}`);
      setSFX(attackSFX[type],'--playerSFX',2);
      target.reduceHeroHealth(this._specialAttackPower);
    }
  },
  monsterDefeated(){
    newBattleMessage(`${this._monsterName} defeated!`);
    setTimeout(() => {
      battleWindow.classList.remove('--active');
      inBattle = false;
      isPlayerturn = true;
      document.documentElement.style.setProperty('--enemyHealth',`100%`);
      document.documentElement.style.setProperty('--enemyHealthColor', `green`);
    }, 2000);
  }
})

// Logic Functions

const newBattleMessage = (msg) => {
  battleMessages.classList.add('--active');
  battleMessages.textContent = msg;
  setTimeout(() => {
    battleMessages.classList.remove('--active');
  }, 2000);
}

const startBattle = () => {
  battleWindow.classList.add('--active');
  sceneChange(200,0);
  sceneChange(1000,10);
  inBattle = true;
  const randomMonster = monsterTypes[Math.floor(Math.random()*4)]
  currentMonster = createMonster(randomMonster);
  enemySprite.setAttribute('src',currentMonster.monsterSprite);
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
        battleDetails.description.textContent = '[arr]cane Magic: Unleashes a fury of flames damaging the enemy'
      },
      blizarrd:() => {
        battleDetails.name.textContent = 'Bliz[arr]d';
        battleDetails.description.textContent = '[arr]cane Magic: Slices with blades of crystal ice damaging the enemy'
      },
      sparrk:() => {
        battleDetails.name.textContent = 'Sp[arr]k';
        battleDetails.description.textContent = '[arr]cane Magic: Calls forth a powerful bolt of lightning damaging the enemy'
      },
      disable:() => {
        battleDetails.name.textContent = 'Disable';
        battleDetails.description.textContent = 'Secret [arr]t: Crushes any barriers that an enemy might have. Increasing the potency of other attacks'
      },
      scarrlet:() => {
        battleDetails.name.textContent = 'Sc[arr]let Blade';
        battleDetails.description.textContent = 'Secret [arr]t: Channels the full power of [arr]ay methods into a single sword swing'
      },
      harrmony:() => {
        battleDetails.name.textContent = 'H[arr]mony';
        battleDetails.description.textContent = 'Secret [arr]t: Draws power from nature to restore health by 50%'
      },
      potion:() => {
        battleDetails.name.textContent = 'Potion';
        battleDetails.description.textContent = 'Restores 120HP'
      },
    }[this.dataset.method]()
  }
}

function battleAction(){
  if (!isPlayerturn) return;
  return methods = {
    attack:() => {
      hero.useAttack(currentMonster);
      secondaryMenu.classList.remove('--active');
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
      secondaryMenu.classList.remove('--active');
    },
    fiarr:() => {
      hero.useFiarr(currentMonster);
      if(currentMonster.monsterHealth > 0) runEnemyTurn();
      secondaryMenu.classList.remove('--active');
    },
    blizarrd:() => {
      hero.useBlizaard(currentMonster);
      if(currentMonster.monsterHealth > 0) runEnemyTurn()
      secondaryMenu.classList.remove('--active');
    },
    sparrk:() => {
      hero.useSparrk(currentMonster);
      if(currentMonster.monsterHealth > 0) runEnemyTurn()
      secondaryMenu.classList.remove('--active');
    },
    disable:() => {
      hero.useDisableBarrier(currentMonster);
      if(currentMonster.monsterHealth > 0) runEnemyTurn()
      secondaryMenu.classList.remove('--active');
    },
    scarrlet:() => {
      hero.useScarrletBlade(currentMonster);
      if(currentMonster.monsterHealth > 0) runEnemyTurn()
      secondaryMenu.classList.remove('--active');
    },
    harrmony:() => {
      hero.useHarrmony(currentMonster);
      if(currentMonster.monsterHealth > 0) runEnemyTurn()
      secondaryMenu.classList.remove('--active');
    },
    potion:() => {
      hero.usePotion();
      if(currentMonster.monsterHealth > 0) runEnemyTurn()
      secondaryMenu.classList.remove('--active');
    }
  }[this.dataset.method]();
}

const runEnemyTurn = () => {
  isPlayerturn = false;
  setTimeout(() => {
    currentMonster.useAttack(hero);
    isPlayerturn = true;
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