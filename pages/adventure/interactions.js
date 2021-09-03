const heroIcon = document.querySelector('.hero-icon');
const heroMsg = document.querySelector('.messages__detail');

let loadedInteraction;
let instantEvent;

const interactions ={
  entrance:[],
  depths:[],
  dungeon:[
    ['18%','58%','right',()=>ladderEvent('down'),false],
    ['30%','66%','left',()=>ladderEvent('up'),false],
    ['46%','58%','up',()=>bossWarningEvent(),false],
    ['50%','58%','up',()=>bossWarningEvent(),false],
    ['46%','54%','up',()=>bossWarningEvent(),false],
    ['50%','54%','up',()=>bossWarningEvent(),false],
    ['46%','34%','up',()=>bossFightEvent(),true],
    ['50%','34%','up',()=>bossFightEvent(),true],
  ]
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
  heroMsg.innerHTML = `
  <p>Wait a minute, is that... it's the sword of [arr]gus!</p>
  <p>But... what's this feeling? I better proceed with caution, or at least make sure I'm ready for whatever comes at me.</p>
  `
  bossMapBlock.style.top = '0%';
}

const bossFightEvent = () => {
  startBattle(true);
}

const knightEvent = () => {
  console.log('Yoohoo!');
  heroMsg.innerHTML = `
  <p>Wait a minute, there's something inside this visor... another scroll!</p>
  <p>It reads: Very impressive, that was quick. Perhaps you're not as idiotic as I thought. You might even be smart enough to quit while you're ahead.</p>
  <p>Next clue:</p>
  <em>"An emerald in a sea of crimson. The source of all knowledge lies within."</em>
  `
  interactions.push(['85%','30%','left',()=>bookEvent()],['90%','30%','left',()=>bookEvent()])
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