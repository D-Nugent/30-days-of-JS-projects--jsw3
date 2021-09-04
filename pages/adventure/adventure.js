// Element Selectors
const documentRoot = document.documentElement;
const heroSprite = document.querySelector('.hero-sprite');
const map = document.querySelector('.map');
const mapBlocks = document.querySelectorAll('.map__block');


// Control Variables
const getMapBoundaries = () => {
  return map.getBoundingClientRect()
}
const getBlockBoundaries = () => {
  return [...mapBlocks].map(block => block.getBoundingClientRect());
}
const getHeroPos = () => heroSprite.getBoundingClientRect();
const getYAxis = () => window.getComputedStyle(documentRoot).getPropertyValue('--spriteY').trim();
const getXAxis = () => window.getComputedStyle(documentRoot).getPropertyValue('--spriteX').trim();
const getSprite = () => window.getComputedStyle(documentRoot).getPropertyValue('--spriteImage').trim();
const getBrightness = () => window.getComputedStyle(documentRoot).getPropertyValue('--mapBrightness').trim();

let moving = false;
let inBattle = false;
let audioManuallyPaused = false;
let currentMap = 'entrance';

// Previous method for tracking blocked coordinates
// const blockedCoord = {
//   entrance: {
//     up:[],
//     right:[],
//     down:[],
//     left:[
//       // ['1%','83%'],['1%','78%'],['56%','68%'],['51%','73%'],['76%','63%'],
//     ]
//   },  
//   cave: {
//     up:[['0%','65%'],['5%','65%'],['10%','65%'],['15%','40%'],['20%','40%'],['25%','40%'],['30%','55%'],['35%','65%'],['55%','65%'],['60%','55%'],['65%','40%'],['70%','40%'],['75%','40%'],['80%','65%'],['85%','65%'],['90%','65%'],['0%','10%'],['5%','10%'],['10%','10%'],['15%','10%'],['20%','10%'],['25%','10%'],['30%','10%'],['35%','10%'],['40%','10%'],['45%','10%'],['50%','10%'],['55%','10%'],['60%','10%'],['65%','10%'],['70%','10%'],['75%','10%'],['80%','10%'],['85%','10%'],['90%','10%']],
//     right:[['90%','75%'],['90%','70%'],['90%','65%'],['75%','60%'],['75%','55%'],['75%','50%'],['75%','45%'],['75%','40%'],['50%','60%'],['50%','55%'],['50%','50%'],['50%','45%'],['50%','40%'],['50%','35%'],,['50%','30%'],['50%','25%'],['50%','20%'],['90%','10%'],['90%','15%'],['90%','20%'],['90%','25%'],['90%','30%'],['90%','35%'],['90%','35%'],['5%','35%'],['5%','30%'],['5%','25%'],['5%','20%'],['25%','40%'],['25%','45%'],['25%','50%'],['30%','50%'],['30%','55%'],['30%','60%'],['50%','80%']],
//     down:[['0%','75%'],['5%','75%'],['10%','75%'],['15%','75%'],['20%','75%'],['25%','75%'],['30%','75%'],['35%','75%'],['40%','80%'],['45%','80%'],['50%','80%'],['55%','75%'],['60%','75%'],['65%','75%'],['70%','75%'],['75%','75%'],['80%','75%'],['85%','75%'],['90%','75%'],['90%','35%'],['85%','35%'],['0%','35%'],['5%','35%'],['10%','15%'],['15%','15%'],['20%','15%'],['25%','15%'],['30%','15%'],['35%','15%'],['55%','15%'],['60%','15%'],['65%','15%'],['70%','15%'],['75%','15%'],['80%','15%']],
//     left:[['40%','80%'],['0%','75%'],['0%','70%'],['0%','65%'],['15%','60%'],['15%','55%'],['15%','50%'],['15%','45%'],['15%','40%'],['40%','60%'],['40%','55%'],['40%','50%'],['40%','45%'],['40%','40%'],['40%','35%'],['40%','30%'],['40%','25%'],['40%','20%'],['60%','60%'],['60%','55%'],['65%','50%'],['65%','45%'],['65%','40%'],['85%','20%'],['85%','25%'],['85%','30%'],['85%','35%'],['0%','10%'],['0%','15%'],['0%','20%'],['0%','25%'],['0%','30%'],['0%','35%']]
//   },
//   dungeon: {
//     up:[['0%','65%'],['5%','65%'],['10%','65%'],['15%','40%'],['20%','40%'],['25%','40%'],['30%','55%'],['35%','65%'],['55%','65%'],['60%','55%'],['65%','40%'],['70%','40%'],['75%','40%'],['80%','65%'],['85%','65%'],['90%','65%'],['0%','10%'],['5%','10%'],['10%','10%'],['15%','10%'],['20%','10%'],['25%','10%'],['30%','10%'],['35%','10%'],['40%','10%'],['45%','10%'],['50%','10%'],['55%','10%'],['60%','10%'],['65%','10%'],['70%','10%'],['75%','10%'],['80%','10%'],['85%','10%'],['90%','10%']],
//     right:[['90%','75%'],['90%','70%'],['90%','65%'],['75%','60%'],['75%','55%'],['75%','50%'],['75%','45%'],['75%','40%'],['50%','60%'],['50%','55%'],['50%','50%'],['50%','45%'],['50%','40%'],['50%','35%'],,['50%','30%'],['50%','25%'],['50%','20%'],['90%','10%'],['90%','15%'],['90%','20%'],['90%','25%'],['90%','30%'],['90%','35%'],['90%','35%'],['5%','35%'],['5%','30%'],['5%','25%'],['5%','20%'],['25%','40%'],['25%','45%'],['25%','50%'],['30%','50%'],['30%','55%'],['30%','60%'],['50%','80%']],
//     down:[['0%','75%'],['5%','75%'],['10%','75%'],['15%','75%'],['20%','75%'],['25%','75%'],['30%','75%'],['35%','75%'],['40%','80%'],['45%','80%'],['50%','80%'],['55%','75%'],['60%','75%'],['65%','75%'],['70%','75%'],['75%','75%'],['80%','75%'],['85%','75%'],['90%','75%'],['90%','35%'],['85%','35%'],['0%','35%'],['5%','35%'],['10%','15%'],['15%','15%'],['20%','15%'],['25%','15%'],['30%','15%'],['35%','15%'],['55%','15%'],['60%','15%'],['65%','15%'],['70%','15%'],['75%','15%'],['80%','15%']],
//     left:[['40%','80%'],['0%','75%'],['0%','70%'],['0%','65%'],['15%','60%'],['15%','55%'],['15%','50%'],['15%','45%'],['15%','40%'],['40%','60%'],['40%','55%'],['40%','50%'],['40%','45%'],['40%','40%'],['40%','35%'],['40%','30%'],['40%','25%'],['40%','20%'],['60%','60%'],['60%','55%'],['65%','50%'],['65%','45%'],['65%','40%'],['85%','20%'],['85%','25%'],['85%','30%'],['85%','35%'],['0%','10%'],['0%','15%'],['0%','20%'],['0%','25%'],['0%','30%'],['0%','35%']]
//   }
// }

const controls = {
    up: document.querySelector('.controls__key.--up'),
    right:document.querySelector('.controls__key.--right'),
    down:document.querySelector('.controls__key.--down'),
    left:document.querySelector('.controls__key.--left'),
    space:document.querySelector('.controls__key.--space')
}

const checkIfPathBlocked = (direction, heroPos) => {
    let isBlocked;
    const mapBoundaries = getMapBoundaries();
    const blockBoundaries = getBlockBoundaries();
    if(direction == 'up') direction = 'top';
    if(direction == 'down') direction = 'bottom';
    if (direction === 'left' || direction === 'top') {
      isBlocked = Math.floor(heroPos[direction]*.95) <= mapBoundaries[direction];
    } else {
      isBlocked = Math.floor(heroPos[direction]*1.02) >= mapBoundaries[direction];
    }
    if (!isBlocked) {
      let nextPos = Math.floor(heroPos[direction]);
      for (const block of blockBoundaries) {
        const boundaryCheck = {
          top: () => {
            isBlocked = 
            (nextPos * 1.02 <= block.bottom && nextPos * .98 >= block.top) &&
            (heroPos.right >= block.left && heroPos.left <= block.right );
          },
          bottom: () => {
            isBlocked =
            (nextPos*1.03 >= block.top && nextPos <= block.bottom) &&
            (heroPos.right >= block.left && heroPos.left <= block.right );
          },
          right: () => {
            isBlocked =
            (nextPos*1.02 >= block.left && nextPos <= block.right) &&
            (heroPos.bottom >= block.top && heroPos.bottom <= block.bottom );
          },
          left: () => {
            isBlocked =
            (nextPos*.97 <= block.right && nextPos >= block.left) &&
            (heroPos.bottom <= block.bottom && heroPos.bottom >= block.top );
          }
        }[direction]();
        if(isBlocked) return isBlocked;
      }
    }
    console.log(heroPos);
    return isBlocked;
    // Previous code for checking hard-coded blocked coordinates
  // return blockedCoord[currentMap][direction].some(axis => {
  //   return axis[0] === x && axis[1] === y
  // })
};

const sceneChange = (delay=2000,brightness=0) => {
  document.documentElement.style.setProperty('--mapBrightness',brightness)
  setTimeout(() => {
    document.documentElement.style.setProperty('--mapBrightness',1);
  }, delay);
}

const checkIfNewScene = (x,y) => {
  const [coordMatch,nextScene,nextSceneMap,charPos,charDirection] = {
    entrance: [x=='21%' && y=='6%','depths','../../assets/sprites/stage/dungeon/dungeon-2.png',['78.5%','85%'],characterConfig.back],
    depths: [
      (x=='70.5%' && y=='5%') || (x=='78.5%' && y=='89%'),
      x=='70.5%'?'dungeon':'entrance',
      `../../assets/sprites/stage/dungeon/dungeon-${x=='70.5%'?3:1}.png`,
      x=='70.5%'?['10%','58%']:['21%','10%'],
      x=='70.5%'?characterConfig.rightStep:characterConfig.front
  ],
    dungeon: [x=='6%' && y=='58%','depths','../../assets/sprites/stage/dungeon/dungeon-2.png',['70.5%','9%'],characterConfig.front]
  }[currentMap];
  if (coordMatch) {
    sceneChange()
    setTimeout(() => map.style.backgroundImage = `url(${nextSceneMap})`, 1000);
    setTimeout(() =>  {
      documentRoot.style.setProperty('--spriteX',charPos[0]); 
      documentRoot.style.setProperty('--spriteY',charPos[1]);
      documentRoot.style.setProperty('--spriteImage',charDirection);
      mapBlocks.forEach(block => block.classList.remove(`--${currentMap}`))
      currentMap = nextScene;
      mapBlocks.forEach(block => block.classList.add(`--${currentMap}`))
    }
    , 2000);
    currentMap === 'dungeon'?documentRoot.style.setProperty('--battleScene',battleScenes.dungeon):documentRoot.style.setProperty('--battleScene',battleScenes.cave);
  }
};

const checkForRandomEncounter = (e) => {
  if (e.keyCode === 32) return;
  if (inBattle) return;
  const encounterRate = .03;
  const encounterCheck = Math.random();
  const monsterAppears = encounterCheck < encounterRate
  console.log(`encounterRate`, encounterRate)
  console.log(`encounterCheck`, encounterCheck)
  console.log(`monsterAppears`, monsterAppears)
  if (monsterAppears) {
    startBattle();
  }
}

const moveControl = { // up arrow
  38:({x,y},heroPos) => {
    let pathBlocked = checkIfPathBlocked('up',heroPos);
    documentRoot.style.setProperty('--spriteImage',characterConfig.back);
    characterConfig.direction = 'up';
    controls.up.classList.add('--active');
    if (pathBlocked) console.log('path is blocked with coords:',x,y)
    if (pathBlocked) return;
    if (moving == true) return;
    moving = true;
    documentRoot.style.setProperty('--spriteY',`${Number(y.slice(0,y.indexOf('%')))-4}%`); // up arrow
    setTimeout(() => moving = false, 150);
    y = `${parseFloat(y)-4}%`;
    checkIfNewScene(x,y);
  },
  39:({x,y},heroPos) => { // right arrow
    let pathBlocked = checkIfPathBlocked('right',heroPos);
    if(characterConfig.direction!=='right') documentRoot.style.setProperty('--spriteImage',characterConfig.right);
    characterConfig.direction = 'right';
    controls.right.classList.add('--active');
    if (pathBlocked) console.log('path is blocked with coords:',x,y)
    if (pathBlocked) return;
    if (moving == true) return;
    moving = true;
    documentRoot.style.setProperty('--spriteX',`${Number(x.slice(0,x.indexOf('%')))+4}%`);
    setTimeout(() => documentRoot.style.setProperty('--spriteImage',characterConfig.rightStep), 50);
    setTimeout(() => documentRoot.style.setProperty('--spriteImage',characterConfig.rightStep1), 100);
    setTimeout(() => {
      documentRoot.style.setProperty('--spriteImage',characterConfig.rightStep2);
      moving=false
    }, 150);
    x = `${parseFloat(x)+4}%`
    checkIfNewScene(x,y);
  },
  40:({x,y},heroPos) => { // down arrow
    let pathBlocked = checkIfPathBlocked('down',heroPos);
    if (getSprite() !== characterConfig.front) documentRoot.style.setProperty('--spriteImage',characterConfig.front)
    characterConfig.direction = 'down'
    controls.down.classList.add('--active');
    if (pathBlocked) console.log('path is blocked with coords:',x,y)
    if (pathBlocked || moving == true) return;
    moving = true;
    documentRoot.style.setProperty('--spriteY',`${Number(y.slice(0,y.indexOf('%')))+4}%`); 
    setTimeout(() => documentRoot.style.setProperty('--spriteImage',characterConfig.frontStep1), 75);
    setTimeout(() => {
      documentRoot.style.setProperty('--spriteImage',characterConfig.frontStep2)
      moving=false;
    }, 150);
    y = `${parseFloat(y)+4}%`;
    checkIfNewScene(x,y);
  },
  37:({x,y},heroPos) => { // left arrow
    let pathBlocked = checkIfPathBlocked('left',heroPos);
    if(characterConfig.direction!=='left') documentRoot.style.setProperty('--spriteImage',characterConfig.left);
    characterConfig.direction = 'left';
    controls.left.classList.add('--active');
    if (pathBlocked) console.log('path is blocked with coords:',x,y)
    if (pathBlocked) return;
    if (moving == true) return;
    moving = true;
    documentRoot.style.setProperty('--spriteX',`${Number(x.slice(0,x.indexOf('%')))-4}%`); // left arrow
    setTimeout(() => documentRoot.style.setProperty('--spriteImage',characterConfig.leftStep), 50);
    setTimeout(() => documentRoot.style.setProperty('--spriteImage',characterConfig.leftStep1), 100);
    setTimeout(() => {
      documentRoot.style.setProperty('--spriteImage',characterConfig.leftStep2)
      moving = false
    }, 150);
    x = `${parseFloat(x)-4}%`
    checkIfNewScene(x,y);
  },
  32:({x,y}) => { // space bar
    controls.space.classList.add('--active');
    console.log(x,y);
    if (!!loadedInteraction) loadedInteraction(x.slice(0,2))
  }
}


function moveCharacter(e){
  if(inBattle) return;
  let axis = {
    y: getYAxis(),
    x: getXAxis()
  }
  e.preventDefault();
  if(typeof moveControl[e.keyCode] == 'undefined') return;
  moveControl[e.keyCode](axis, getHeroPos());
  checkForInteractions(axis);
  console.log('x',axis.x,'y',axis.y);
  if (audioTrack[0].paused && !audioManuallyPaused) {
    audioTrack[0].play();
    audioBtn.innerText = "🔊"
  }
}

const moveRelease = {
  38:() => controls.up.classList.remove('--active'),
  39:() => controls.right.classList.remove('--active'),
  40:() => controls.down.classList.remove('--active'),
  37:() => controls.left.classList.remove('--active'),
  32:() => controls.space.classList.remove('--active'),
}

function releaseControl(e){
  if(!!moveRelease[e.keyCode]) moveRelease[e.keyCode]()
}


// Event Listeners
document.addEventListener('keyup',releaseControl)
document.addEventListener('keydown',moveCharacter)
document.addEventListener('keydown',debounce(checkForRandomEncounter,31))