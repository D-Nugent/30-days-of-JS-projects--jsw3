const documentRoot = document.documentElement;
const getYAxis = () => window.getComputedStyle(documentRoot).getPropertyValue('--spriteY').trim();
const getXAxis = () => window.getComputedStyle(documentRoot).getPropertyValue('--spriteX').trim();
const getSprite = () => window.getComputedStyle(documentRoot).getPropertyValue('--spriteImage').trim();
const getBrightness = () => window.getComputedStyle(documentRoot).getPropertyValue('--mapBrightness').trim();
const heroIcon = document.querySelector('.hero-icon');
const heroMsg = document.querySelector('.messages__detail');


let moving = false;
let firstAudioCheck = true;

const scriptMove = {
  up:({x,y}) => {
    documentRoot.style.setProperty('--spriteImage',characterConfig.back);
    characterConfig.direction = 'up';
    if (moving == true) return;
    moving = true;
    documentRoot.style.setProperty('--spriteY',`${Number(y.slice(0,y.indexOf('%')))-5}%`); // up arrow
    setTimeout(() => moving = false, 150);
  },
  right:({x,y}) => { // right arrow
    if(characterConfig.direction!=='right') documentRoot.style.setProperty('--spriteImage',characterConfig.right);
    characterConfig.direction = 'right';
    if (moving == true) return;
    moving = true;
    documentRoot.style.setProperty('--spriteX',`${Number(x.slice(0,x.indexOf('%')))+5}%`);
    setTimeout(() => documentRoot.style.setProperty('--spriteImage',characterConfig.rightStep), 50);
    setTimeout(() => documentRoot.style.setProperty('--spriteImage',characterConfig.rightStep1), 100);
    setTimeout(() => {
      documentRoot.style.setProperty('--spriteImage',characterConfig.rightStep2);
      moving=false
    }, 150);
  },
  down:({x,y}) => { // down arrow
    if (getSprite() !== characterConfig.front) documentRoot.style.setProperty('--spriteImage',characterConfig.front)
    characterConfig.direction = 'down'
    if (moving == true) return;
    moving = true;
    documentRoot.style.setProperty('--spriteY',`${Number(y.slice(0,y.indexOf('%')))+5}%`); 
    setTimeout(() => documentRoot.style.setProperty('--spriteImage',characterConfig.frontStep1), 75);
    setTimeout(() => {
      documentRoot.style.setProperty('--spriteImage',characterConfig.frontStep2)
      moving=false;
    }, 150);
  },
  left:({x,y}) => {
    if(characterConfig.direction!=='left') documentRoot.style.setProperty('--spriteImage',characterConfig.left);
    characterConfig.direction = 'left';
    if (moving == true) return;
    moving = true;
    documentRoot.style.setProperty('--spriteX',`${Number(x.slice(0,x.indexOf('%')))-5}%`); // left arrow
    setTimeout(() => documentRoot.style.setProperty('--spriteImage',characterConfig.leftStep), 50);
    setTimeout(() => documentRoot.style.setProperty('--spriteImage',characterConfig.leftStep1), 100);
    setTimeout(() => {
      documentRoot.style.setProperty('--spriteImage',characterConfig.leftStep2)
      moving = false
    }, 150);
  }
}


function moveCharacter(direction){
  let axis = {
    y: getYAxis(),
    x: getXAxis()
  }
  scriptMove[direction](axis);
  console.log('x',axis.x,'y',axis.y);
}

const initialScene = () =>{
  setTimeout(() => {
    moveCharacter('down');
  }, 100);
  setTimeout(() => repeat(() => moveCharacter('right'),4), timeOut);
  setTimeout(() => repeat(() => moveCharacter('up'),5), timeOut);
  setTimeout(() => documentRoot.style.setProperty('--spriteVillainImage',villainConfig.turnLeft), timeOut+800);
  setTimeout(() => documentRoot.style.setProperty('--spriteVillainImage',villainConfig.left), timeOut+900);
  setTimeout(() => documentRoot.style.setProperty('--spriteVillainImage',villainConfig.turnFront), timeOut+1000);
  setTimeout(() => documentRoot.style.setProperty('--spriteVillainImage',villainConfig.front), timeOut+1100);
  setTimeout(() => {
    heroIcon.classList.add('--active');
    heroIcon.innerText = '!'
  }, timeOut+1200);
  setTimeout(() => {
    heroMsg.innerHTML = bossDialog[0].description;
    const advanceDialogBtn = document.querySelector('.dialog-advance');
    advanceDialogBtn.addEventListener('click',advanceStory)
  }, timeOut+1500);
}

setTimeout(() => {
  initialScene()
}, 300);

const monster = document.querySelector('.monster-sprite');

const storyAnimations = {
  1:() => documentRoot.style.setProperty('--spriteVillainImage',villainConfig.frontArmsOpen),
  2:() => heroIcon.classList.remove('--active'),
  3:() => documentRoot.style.setProperty('--spriteVillainImage',villainConfig.front),
  4:() => {
    documentRoot.style.setProperty('--mapInversion',1)
    const villain = document.querySelector('.villain-sprite');
    villain.style.top = '0%';
    villain.style.opacity = 0;
    setTimeout(() => {
      documentRoot.style.setProperty('--mapInversion',0)
      monster.style.opacity = 1;
    }, 400);
  },
  5:() => repeat(() => moveCharacter('up'),4),
  12:() => {
    const finalAttack = document.querySelector('.final-attack');
    const randomXCoord = () => Math.floor(Math.random()*(54-38)+38);
    const randomYCoord = () => Math.floor(Math.random()*(8));
    function runAttack(){
      console.log(`bossData.level`, bossData.level)
      documentRoot.style.setProperty('--finalAttackX',`${randomXCoord()}%`)
      documentRoot.style.setProperty('--finalAttackY',`${randomYCoord()}%`)
      finalAttack.style.opacity = 1;
      setTimeout(() => documentRoot.style.setProperty('--finalAttackImage',`url('../../assets/sprites/stage/finalAttack-2.png')`), 200);
      setTimeout(() => documentRoot.style.setProperty('--finalAttackImage',`url('../../assets/sprites/stage/finalAttack-3.png')`), 400);
      setTimeout(() => {
        finalAttack.style.opacity = 0;
        bossData.level = bossData.level - randomYCoord();
        getEnemyHealth();
        if(bossData.level > 0){
          runAttack();
        } else{
          monster.style.transition = `all 5s cubic-bezier(0.79, 1.41, 0.14,-0.67)`;
          monster.style.opacity = 0;
          setTimeout(() => window.location.href = '../victory/victory.html', 6000);
        }
      }, 500);
    }
    runAttack();
    
  }
}

let currentHealth = ['💖','💖','💖','💖','💖']

function gameOver() {
  document.querySelector('.game-over').style.display = 'flex';
}

function lowerHealth(){
  // this.addEventListener('transitionend',function(){this.classList.remove('--error')})
  // this.classList.add('--error');
  const enemyAttack = document.querySelector('.enemy-attack');
  enemyAttack.addEventListener('transitionend',function(){this.classList.remove('--active')});
  enemyAttack.classList.add('--active');
  const heartIndex = currentHealth.lastIndexOf('💖');
  heartIndex > 0 ? currentHealth.splice(currentHealth.lastIndexOf('💖'),1,'🖤'):gameOver();
  battleElements.health.innerText = currentHealth.join('');
  return;
}

function getEnemyHealth(){
  let bossHealth = bossData.level;
  let healthColor = bossHealth>70?'green':bossHealth>30?'orange':'red';
  document.documentElement.style.setProperty(`--health-val`, `${bossHealth}%`);
  document.documentElement.style.setProperty(`--health-color`, healthColor);
}

const battleElements = {
  health: document.querySelector('.battle-log__health'),
  enemyHealth: document.querySelector('.enemy__health'),
  bossData: document.querySelector('.enemy-data'),
  challenge: document.querySelector('.battle-log__challenge')
}

const loadFightData = {
  5:() =>{
    const challenge = documentRoot.querySelector('.battle-log__challenge')
    challenge.innerHTML = bossChallengeData[storyPos-5];
  },
  6:() =>{
    const challenge = documentRoot.querySelector('.battle-log__challenge')
    bossData = Object.entries(bossData);
    battleElements.bossData.innerHTML = JSON.stringify(bossData,null)
    console.log(bossChallengeData[storyPos-5]);
    challenge.innerHTML = bossChallengeData[storyPos-5];
  },
  7:() =>{
    bossData = Object.fromEntries(bossData.map(keypair => {
      if (keypair[0] === 'hasBarrier') keypair[1] = false;
      return keypair
    }))
    battleElements.bossData.innerHTML = JSON.stringify(bossData,null,'<br>');
    battleElements.challenge.innerHTML = bossChallengeData[storyPos-5];
  },
  8:() =>{
    bossData.level -= 20;
    getEnemyHealth();
    bossData.status = ['poisoned','charging attack']
    battleElements.bossData.innerHTML = JSON.stringify(bossData,null,'<br>');
    let powerCharge = setInterval(() => {
      if (bossData.powerLevel >= 100 || typeof bossData.powerLevel === 'undefined') {
        if (bossData.powerLevel >= 100) lowerHealth()
        clearInterval(powerCharge);
        bossData.powerLevel = 0;
        battleElements.bossData.innerHTML = JSON.stringify(bossData,null,'<br>');
      }
      bossData.powerLevel += Math.floor(Math.random()*8);
      battleElements.bossData.innerHTML = JSON.stringify(bossData,null,'<br>');
    }, 2000);
    battleElements.challenge.innerHTML = bossChallengeData[storyPos-5];
  },
  9:() =>{
    let powerCharge = setInterval(() => {
      if (bossData.powerLevel >= 100 || typeof bossData.powerLevel === 'undefined') {
        if (bossData.powerLevel >= 100) lowerHealth()
        clearInterval(powerCharge);
        bossData.powerLevel = 0;
        battleElements.bossData.innerHTML = JSON.stringify(bossData,null,'<br>');
      }
      bossData.powerLevel += Math.floor(Math.random()*8);
      battleElements.bossData.innerHTML = JSON.stringify(bossData,null,'<br>');
    }, 2000);
    battleElements.challenge.innerHTML = bossChallengeData[storyPos-5];
  },
  10:() =>{
    bossData.level -= 20;
    getEnemyHealth();
    bossData.status = ['poisoned','flying overhead']
    delete bossData.powerLevel
    battleElements.bossData.innerHTML = JSON.stringify(bossData,null,'<br>');
    battleElements.challenge.innerHTML = bossChallengeData[storyPos-5];
    setTimeout(() => {
      monster.style.top = '-300%'
    }, 2500);
  },
  11:() =>{
    bossData.level -= 20;
    getEnemyHealth();
    bossData.status = 'poisoned';
    setTimeout(() => {
      monster.style.top = '-2%'
    }, 500);
    battleElements.bossData.innerHTML = JSON.stringify(bossData,null,'<br>');
    battleElements.challenge.innerHTML = bossChallengeData[storyPos-5];
  },
  12:() => {
    battleElements.challenge.innerHTML = bossChallengeData[storyPos-5];
  }
}

let storyPos = 0;
function advanceStory(){
  storyPos += 1;
  charName.innerHTML = bossDialog[storyPos].speaking;
  heroMsg.innerHTML = bossDialog[storyPos].description;
  if (storyPos===5) {
    if (firstAudioCheck && audioTrack.paused) {
      audioTrack.play();
      audioBtn.innerText = "🔊"
      firstAudioCheck = false;
    }
    battleElements.bossData.style.opacity = 1;
    battleElements.enemyHealth.style.opacity = 1;
  }
  if (storyPos > 4) {
    battleElements.bossData.innerHTML = JSON.stringify(bossData,null,'<br>');
    loadFightData[storyPos]();
    const failAdvanceBtns = document.querySelectorAll('.fail-advance');
    failAdvanceBtns.forEach(btn => btn.addEventListener('click',lowerHealth))
  }
  if (storyPos < 12) {
    const advanceDialogBtn = document.querySelector('.dialog-advance');
    advanceDialogBtn.addEventListener('click',advanceStory);
  }
  if (typeof storyAnimations[storyPos] !== 'undefined') storyAnimations[storyPos]()
}

const charName = document.querySelector('.messages__header')