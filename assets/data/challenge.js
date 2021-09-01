const challengeData = [
  {
    msg:"That's a lot of monsters! Let's switch things up and put the enemies with the lowest level at the front with a 'sort' attack. Hmm, now how do I do that again?",
    chal: "let weakestFirst = monsters.sort(<input type='text' name='user-entry' id='user-entry'>)",
    sol: (curMonsters) => JSON.stringify([...curMonsters].sort((current,next) => current.level > next.level?-1:1))
  },
  {
    msg:"Woah, that was awesome! Now let's take out those monsters with my legend[arr]y filter attack! I should be able to take out any enemy with a level of less than 5.",
    chal: "let defeatWeakMonsters = monsters.filter(<input type='text' name='user-entry' id='user-entry'>)",
    sol: (curMonsters) => JSON.stringify([...curMonsters].filter(monster => monster.level >= 5))
  },
  {
    msg:"Uh-oh, looks like the flying monsters are heading for the castle! Better get the [arr]chers🏹 to fire a volley of [arr]ows and use 'map' to take away their ability to fly and lower their level by 4!➶➵➴",
    chal: "let disableFlying = monsters.map(monster => {<textarea type='text' name='user-entry' id='user-entry' rows='3' autocorrect='off'></textarea>})",
    sol: (curMonsters) => JSON.stringify([...curMonsters].map(monster => {
      if (monster.canFly) {
        monster.level -= 4;
        monster.canFly = false;
      } 
      return monster;
    }))
  },
  {
    msg:"It's time to bring out the big guns. We're going to use some [arr]cane magic! But it takes some prep[arr]ation, first we need a count only of how many monsters are weak to fire, ice and lightning.",
    chal: "let objCountOfElementalWeaknesses = monsters.reduce((count,monster)=> {<textarea type='text' name='user-entry' id='user-entry' rows='3' autocorrect='off'></textarea>},{})",
    sol: (curMonsters) => JSON.stringify([...curMonsters].reduce((count,monster) => {
      if (monster.weakness === 'fire' || monster.weakness === 'ice' || monster.weakness === 'lightning') {
        count[monster.weakness]?count[monster.weakness] += 1 : count[monster.weakness] = 1;
      }
      return count;
    },{}))
  },
  {
    msg:"Great, now we know how much magic to charge we now need to know who to t[arr]get with which magic.Let's get an array of their indexes for each elemental weakness!",
    chal: "let weakToElement = (element) => monsters.reduce((arrOfIndexes,monster,i) => {<textarea type='text' name='user-entry' id='user-entry' rows='3' autocorrect='off'></textarea>},[])",
    sol: (curMonsters) => JSON.stringify([...curMonsters].reduce((arrOfIndexes,currentMonster,i) => {
      if (currentMonster.weakness === 'fire') arrOfIndexes.push(i);
      return arrOfIndexes;
    },[]))
  },
  {
    msg:"Alright, magic ch[arr]ged, coordinates locked-in. With the power of filter and includes, Casting fi[arr]🔥, blizz[arr]d💎 and sp[arr]k⚡!",
    chal: "let coordinates = [...weakToElement('fire'), ...weakToElement('ice'), ...weakToElement('lightning')]<br>let grandMagic = monsters.filter(<textarea type='text' name='user-entry' id='user-entry' rows='3' autocorrect='off'></textarea>)",
    sol: (curMonsters) => JSON.stringify([...curMonsters].filter((monster) => (monster.weakness!=='fire'&&monster.weakness!=='ice'&&monster.weakness!=='lightning')))
  },
  {
    msg:"Whew! That took a lot out of me but it was worth it, the tide of battle is turning. Hmm, I think 'some' of them might have a barrier. I should check first to conserve my magic",
    chal: "let doAnyEnemiesHaveBarrier = monsters.some(<input type='text' name='user-entry' id='user-entry'>)",
    sol: (curMonsters) => JSON.stringify([...curMonsters].some(monster => monster.hasBarrier))
  },
  {
    msg:"Just as I suspected, those ghouls and aliens are gu[arr]ding themselves agianst my m[arr]tial arts🤜. Let's see how tough they are when I disabled their barriers with some Map action",
    chal: "let removeBarriers = monsters.map(monster => {<textarea type='text' name='user-entry' id='user-entry' rows='2' autocorrect='off'></textarea>})",
    sol: (curMonsters) => JSON.stringify([...curMonsters].map(monster => {
      monster.hasBarrier = false;
      return monster;
    }))
  },
  {
    msg:"There's still too many. It's time to cut their numbers down to one of each.✨SPECIAL ATTACk - No input needed✨ Time to use my st[arr] attack🌠, a new Map should sort them out - this is a tricky one.",
    chal: "let removeDuplicateMonsters = [...new Map(monsters.map(monster => [monster.name,monster])).values()]",
    sol: (curMonsters) => JSON.stringify([...new Map(curMonsters.map(monster => [monster.name,monster])).values()])
  },
  {
    msg:"Ok, it's time to finish this! Using the power of my sc[arr]let blade, I'll unleash the power of splice and defeat all enemies.",
    chal: "let eliminateAll = (monsters) => {<br>monsters.splice(<input type='text' name='user-entry' id='user-entry'>);<br>return monsters;}",
    sol: (curMonsters) => JSON.stringify([...curMonsters].splice(0,curMonsters.length))
  },
  {
    msg:"Ho-ho! Looks like the D[arr]k Wiz[arr]d isn't as much of a coward as I thought, jumping into battle himself. But it's too late, without your monsters you're nothing. With my n[arr]ow slash I'll cut your length down to nothing!",
    chal: "let finishWizard = (monsters) => {<br>monsters.length <input type='text' name='user-entry' id='user-entry'>;<br>return monsters}",
    sol: (curMonsters) => JSON.stringify(curMonsters.length=0)
  },
]

const bossChallengeData = [
  `<code class="challenge-code">let bossDataAsArray = <input disabled/>.<input disabled/>(bossData)</code>
    <button class="fail-advance primary-btn">object.entries</button>
    <button class="fail-advance primary-btn">object.array</button>
    <button class="dialog-advance primary-btn">Object.entries</button>
    <button class="fail-advance primary-btn">entries.object</button>
  `,
  `<code class="challenge-code">Object.<input disabled>(bossData.map(keypair => {<br>if(keypair[<input class="--small" disabled/>] === 'hasBarrier') keypair[1] = false;<br>return keypair<br>}))</code>
    <button class="fail-advance primary-btn">'map' and 'hasBarrier'</button>
    <button class="dialog-advance primary-btn">'fromEntries' and '0'</button>
    <button class="fail-advance primary-btn">'fromEntries' and 'barrier'</button>
    <button class="fail-advance primary-btn">'entries' and '0'</button>
  `,
  `<code class="challenge-code">let poison = {<br>status:'poison'<br>}<br>Object.<input disabled>(<input disabled>,<input disabled>)</code>
    <button class="fail-advance primary-btn">'bossData', 'assign' & 'poison'</button>
    <button class="fail-advance primary-btn">'Assign', 'bossData' & 'poison'</button>
    <button class="fail-advance primary-btn">'assign', 'poison' & 'bossData'</button>
    <button class="dialog-advance primary-btn">'assign', 'bossData' & 'poison'</button>
  `,
  `<code class="challenge-code">Object<input class="--large" disabled></code>
    <button class="fail-advance primary-btn">'.bossData(isFrozen)'</button>
    <button class="fail-advance primary-btn">'(bossData) === typeof 'frozen''</button>
    <button class="fail-advance primary-btn">'.freeze(bossData)'</button>
    <button class="dialog-advance primary-btn">'.isFrozen(bossData)'</button>
  `,
  `<code class="challenge-code">bossData = <input disabled><br><input disabled> <input disabled>.powerLevel</code>
    <button class="fail-advance primary-btn">'Object.create(bossData), 'bossData' & 'delete'</button>
    <button class="dialog-advance primary-btn">'{...bossData}', 'delete' & 'bossData'</button>
    <button class="fail-advance primary-btn">'[...bossData]', 'delete' & 'bossData'</button>
    <button class="fail-advance primary-btn">'bossData', 'delete' & 'bossData'</button>
  `,
  `<code class="challenge-code">for (const key in <input disabled>) {<br>if(key === 'canFly') bossData[<input disabled/>] = false;<br>if(<input disabled/> === 'level') bossData[key] -= 30;}</code>
    <button class="fail-advance primary-btn">'Object(bossData)', 'level' & 'key'</button>
    <button class="fail-advance primary-btn">'{...bossData}', 'canFly' & 'level'</button>
    <button class="dialog-advance primary-btn">'bossData', 'key' & 'key'</button>
    <button class="fail-advance primary-btn">'bossData', '[canFly]' & 'key'</button>
  `,
  `<code class="challenge-code">function inferno(){<br>this.level -= Math.floor(Math.random()*4)<br>}<br>bossData.infernoAttack = <input disabled/>;<br>while(bossData.level><input class="--small" disabled>) {<br>bossData.<input disabled/>()<br>}</code>
    <button class="fail-advance primary-btn">'inferno', '=1' & 'infernoAttack'</button>
    <button class="dialog-advance primary-btn">'inferno', '0' & 'infernoAttack'</button>
    <button class="fail-advance primary-btn">'infernoAttack', '0' & 'inferno'</button>
    <button class="fail-advance primary-btn">'inferno', '=0' & 'inferno'</button>
  `,
  `<h4>Your attack is super effective!</h4>
  `,
]