const heroIcon = document.querySelector('.hero-icon');
const heroMsg = document.querySelector('.messages__detail');

let loadedInteraction;
let instantEvent;

const interactions ={
  entrance:[
    ['57%','70%','left',()=>itemEvent('Potion',[0,1]),false],
    ['61%','70%','left',()=>itemEvent('Potion',[0,1]),false],
    ['81%','22%','right',()=>itemEvent('Restore',[2,3,4,5]),false],
    ['85%','22%','right',()=>itemEvent('Restore',[2,3,4,5]),false],
    ['93%','14%','down',()=>itemEvent('Restore',[2,3,4,5]),false],
    ['93%','18%','down',()=>itemEvent('Restore',[2,3,4,5]),false],
  ],
  depths:[
    ['6.5%','85%','left',()=>itemEvent('Restore',[0,1]),false],
    ['2.5%','85%','left',()=>itemEvent('Restore',[0,1]),false],
    ['74.5%','29%','right',()=>scriptEvent(['Hmm... I bet I could jump this...then again... better not.'],true),false],
    ['54.5%','9%','right',()=>scriptEvent(['Woah, what is this? A dungeon?'],true),true],
  ],
  dungeon:[
    ['66%','46%','right',()=>itemEvent('Restore',[0]),false],
    ['18%','58%','right',()=>ladderEvent('down'),false],
    ['30%','66%','left',()=>ladderEvent('up'),false],
    ['46%','42%','up',()=>bossWarningEvent(),false,],
    ['50%','42%','up',()=>bossWarningEvent(),false,],
    ['46%','46%','up',()=>bossWarningEvent(),false,],
    ['50%','46%','up',()=>bossWarningEvent(),false,],
    ['46%','34%','up',()=>bossFightEvent(),true],
    ['50%','34%','up',()=>bossFightEvent(),true],
  ]
} 

const scriptEvent = (msgArr,reset) => {
  heroMsg.innerHTML = msgArr.map(msg => {
    return `
    <p>${msg}</p>
    `
  }).join('');
  if (reset) {
    setTimeout(() => {
      heroMsg.innerHTML = `
      <p>Let's continue on.</p>
      `
    }, 3000);
  }
}

const itemEvent = (itemType,arrofIndexes) => {
  playerItems.push(itemType);
  soundEffects.confirm.play();
  scriptEvent([`Huh? What's this?`,`Nice a '${itemType}' item, this will help!`],true)
  arrofIndexes.forEach(index => {
    interactions[currentMap][index] = [];
  })
}

const ladderEvent = (direction) => {
  sceneChange(1000)
  setTimeout(() =>  {
    if (direction==='down') {
      documentRoot.style.setProperty('--spriteX','30%'); 
      documentRoot.style.setProperty('--spriteY','66%');
    } else {
      documentRoot.style.setProperty('--spriteX','18%'); 
      documentRoot.style.setProperty('--spriteY','58%');
    }
  }
  , 1000);
}

const bossWarningEvent = () => {
  const bossMapBlock = document.querySelector('.map__block--1.--dungeon');
  scriptEvent([
    `Wait a minute, is that... it's the sword of [arr]gus!`,
     `But... what's this feeling? I better proceed with caution, or at least make sure I'm ready for whatever comes at me.`
    ],false)
  bossMapBlock.style.top = '0%';
  interactions[currentMap][3] = [];
  interactions[currentMap][4] = [];
  interactions[currentMap][5] = [];
  interactions[currentMap][6] = [];
}

const bossFightEvent = () => {
  startBattle(true);
}

function checkForInteractions({x,y}){
  let indexOfInteraction;
  const locationHasInteraction = interactions[currentMap].some((axis,i) => {
    if (axis[0] === x && axis[1] === y && axis[2] === characterConfig.direction) {
      indexOfInteraction = i
      return true;
    }
  })
  if(!locationHasInteraction) {
    heroIcon.classList.remove('--active');
    loadedInteraction = null;
    return;
  } 
  heroIcon.classList.add('--active');
  heroIcon.innerText = '?'
  loadedInteraction = interactions[currentMap][indexOfInteraction][3];
  instantEvent = interactions[currentMap][indexOfInteraction][4];
  if (instantEvent) loadedInteraction();
}