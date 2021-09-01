let monsters = [
  {
    name:'T-Rex',
    icon: '🦖',
    level: 10,
    canFly: false,
    weakness: 'comets',
    hasBarrier: false
  },
  {
    name:'Kraken',
    icon: '🐙',
    level: 8,
    canFly: false,
    weakness: 'lightning',
    hasBarrier: false
  },
  {
    name:'Scorpion',
    icon: '🦂',
    level: 2,
    canFly: false,
    weakness: 'birds',
    hasBarrier: false
  },
  {
    name:'Zombie',
    icon: '🧟‍♂️',
    level: 4,
    canFly: false,
    weakness: 'brains',
    hasBarrier: false
  },
  {
    name:'Scorpion',
    icon: '🦂',
    level: 2,
    canFly: false,
    weakness: 'birds',
    hasBarrier: false
  },
  {
    name:'Kraken',
    icon: '🐙',
    level: 8,
    canFly: false,
    weakness: 'lightning',
    hasBarrier: false
  },
  {
    name:'Scorpion',
    icon: '🦂',
    level: 2,
    canFly: false,
    weakness: 'birds',
    hasBarrier: false
  },
  {
    name:'Giant-Eagle',
    icon: '🦅',
    level: 6,
    canFly: true,
    weakness: 'arrows',
    hasBarrier: false
  },
  {
    name:'Alien',
    icon: '👾',
    level: 7,
    canFly: false,
    weakness: 'magic',
    hasBarrier: true
  },
  {
    name:'Zombie',
    icon: '🧟‍♂️',
    level: 4,
    canFly: false,
    weakness: 'brains',
    hasBarrier: false
  },
  {
    name:'Demon-Bat',
    icon: '🦇',
    level: 5,
    canFly: true,
    weakness: 'sunlight',
    hasBarrier: false
  },
  {
    name:'Zombie',
    icon: '🧟‍♂️',
    level: 4,
    canFly: false,
    weakness: 'brains',
    hasBarrier: false
  },
  {
    name:'Vampire',
    icon: '🧛‍♂️',
    level: 7,
    canFly: false,
    weakness: 'fire',
    hasBarrier: false
  },
  {
    name:'Giant-Eagle',
    icon: '🦅',
    level: 6,
    canFly: true,
    weakness: 'arrows',
    hasBarrier: false
  },
  {
    name:'GrandDragon',
    icon: '🐉',
    level: 9,
    canFly: false,
    weakness: 'ice',
    hasBarrier: false
  },
  {
    name:'Giant-Eagle',
    icon: '🦅',
    level: 6,
    canFly: true,
    weakness: 'arrows',
    hasBarrier: false
  },
  {
    name:'Giant-Eagle',
    icon: '🦅',
    level: 6,
    canFly: true,
    weakness: 'arrows',
    hasBarrier: false
  },
  {
    name:'Demon-Bat',
    icon: '🦇',
    level: 5,
    canFly: true,
    weakness: 'sunlight',
    hasBarrier: false
  },
  {
    name:'Demon-Bat',
    icon: '🦇',
    level: 5,
    canFly: true,
    weakness: 'sunlight',
    hasBarrier: false
  },
  {
    name:'Vampire',
    icon: '🧛‍♂️',
    level: 7,
    canFly: false,
    weakness: 'fire',
    hasBarrier: false
  },
  {
    name:'Scorpion',
    icon: '🦂',
    level: 2,
    canFly: false,
    weakness: 'birds',
    hasBarrier: false
  },
  {
    name:'Demon-Bat',
    icon: '🦇',
    level: 5,
    canFly: true,
    weakness: 'sunlight',
    hasBarrier: false
  },
  {
    name:'Ghoul',
    icon: '👻',
    level: 5,
    canFly: false,
    weakness: 'sunlight',
    hasBarrier: true
  },
  {
    name:'Alien',
    icon: '👾',
    level: 7,
    canFly: false,
    weakness: 'magic',
    hasBarrier: true
  },
  {
    name:'Ghoul',
    icon: '👻',
    level: 5,
    canFly: false,
    weakness: 'sunlight',
    hasBarrier: true
  },
  {
    name:'Demon-Bat',
    icon: '🦇',
    level: 5,
    canFly: true,
    weakness: 'sunlight',
    hasBarrier: false
  },
  {
    name:'GrandDragon',
    icon: '🐉',
    level: 9,
    canFly: false,
    weakness: 'ice',
    hasBarrier: false
  },
  {
    name:'Alien',
    icon: '👾',
    level: 7,
    canFly: false,
    weakness: 'magic',
    hasBarrier: true
  },
  {
    name:'T-Rex',
    icon: '🦖',
    level: 10,
    canFly: false,
    weakness: 'comets',
    hasBarrier: false
  },
  {
    name:'Kraken',
    icon: '🐙',
    level: 8,
    canFly: false,
    weakness: 'lightning',
    hasBarrier: false
  },
  {
    name:'Zombie',
    icon: '🧟‍♂️',
    level: 4,
    canFly: false,
    weakness: 'brains',
    hasBarrier: false
  },
  {
    name:'Kraken',
    icon: '🐙',
    level: 8,
    canFly: false,
    weakness: 'lightning',
    hasBarrier: false
  },
  {
    name:'Vampire',
    icon: '🧛‍♂️',
    level: 7,
    canFly: false,
    weakness: 'fire',
    hasBarrier: false
  },
  {
    name:'Sabretooth',
    icon: '🐅',
    level: 10,
    canFly: false,
    weakness: 'bellyrubs',
    hasBarrier: false
  },
  {
    name:'Alien',
    icon: '👾',
    level: 7,
    canFly: false,
    weakness: 'magic',
    hasBarrier: true
  },
  {
    name:'Ghoul',
    icon: '👻',
    level: 5,
    canFly: false,
    weakness: 'sunlight',
    hasBarrier: true
  },
  {
    name:'Sabretooth',
    icon: '🐅',
    level: 10,
    canFly: false,
    weakness: 'bellyrubs',
    hasBarrier: false
  },
  {
    name:'T-Rex',
    icon: '🦖',
    level: 10,
    canFly: false,
    weakness: 'comets',
    hasBarrier: false
  },
  {
    name:'Ghoul',
    icon: '👻',
    level: 5,
    canFly: false,
    weakness: 'sunlight',
    hasBarrier: true
  },
  {
    name:'Sabretooth',
    icon: '🐅',
    level: 10,
    canFly: false,
    weakness: 'bellyrubs',
    hasBarrier: false
  },
]

let bossData = {
  level: 100,
  canFly: true,
  weakness: 'fire',
  hasBarrier: true,
  powerLevel: 0,
  status: 'charging attack',
}