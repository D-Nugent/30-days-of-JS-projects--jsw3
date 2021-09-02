const heroIcon = document.querySelector('.hero-icon');
const heroMsg = document.querySelector('.messages__detail')

let loadedInteraction;

const interactions ={
  entrance:[],
  depths:[],
  dungeon:[['18%','58%','right',()=>ladderEvent('down')],['30%','66%','left',()=>ladderEvent('up')]]
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

{/* <li>"While all else laced in cromson, this, a hue of emerald contains knowledge once lost"</li>
<li>"If you have come this far you're eager for wrath, it's only in darkness you find your path."</li> */}

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

const bookEvent = () => {
  console.log('HA! Nerd');
  heroMsg.innerHTML = `
  <p>Hmm... there's something inbetween these pages... another scroll...</p>
  <p>It reads: Remarkable, I took you for a bufoon with a sword - I'm surprised you even know what a book is. It means nothing, the final test will stump you.</p>
  <p>Final clue:</p>
  <em>"IF you have come this far you're eager for wrath, it's only in darkness you find your path."</em>
  `
  interactions.push(['75%','40%','up',(x)=>fireEvent(x)],['75%','45%','up',(x)=>fireEvent(x)],['15%','40%','up',(x)=>fireEvent(x)],['15%','45%','up',(x)=>fireEvent(x)],['70%','10%','up',(x)=>fireEvent(x)],['70%','15%','up',(x)=>fireEvent(x)],['30%','10%','up',(x)=>fireEvent(x)],['30%','15%','up',(x)=>fireEvent(x)])
}

const fireLocations = {
  30: document.querySelector('.candle__one'),
  70: document.querySelector('.candle__two'),
  15: document.querySelector('.candle__three'),
  75: document.querySelector('.candle__four'),
}

const fireLit = {
  30: true,
  70: true,
  15: true,
  75: true
}

const fireEvent = (x) => {
  console.log('Hello darkness my old friend');
  const currentCandle = fireLocations[x];
  currentCandle.style.opacity = 1;
  fireLit[x] = false;
  let currentBrightness = getBrightness();
  if (currentBrightness>.4) document.documentElement.style.setProperty('--mapBrightness',`${currentBrightness-.15}`)
  if (Object.values(fireLit).every(litStatus => litStatus === false)) showPath()
}

const showPath = () => {
  console.log('Door unlocked')
  heroMsg.innerHTML = `
    <p>Was that a click, I heard?</p>
    <p>Looks like the door to the turret has opened up. Whoever this madman is, I'm coming for them. It's time to end this nonsense</p>
  `;
  const door = document.querySelector('.door');
  door.style.display = 'flex';
  door.style.opacity = 1;
  blockedCoord.up = blockedCoord.up.filter(coord => {
    return !((coord[0] === '10%'||coord[0] === '15%') && coord[1] === '10%') 
  });
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
  loadedInteraction = interactions[currentMap][indexOfInteraction][3]
}