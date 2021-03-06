let characterConfig = {
  currentSprite: `url('../../assets/sprites/hero/front.png')`,
  direction: 'down',
  front: `url('../../assets/sprites/hero/front.png')`,
  back: `url('../../assets/sprites/hero/back.png')`,
  frontStep1: `url('../../assets/sprites/hero/front-step-1.png')`,
  frontStep2: `url('../../assets/sprites/hero/front-step-2.png')`,
  left: `url('../../assets/sprites/hero/left.png')`,
  leftStep: `url('../../assets/sprites/hero/left-step.png')`,
  leftStep1: `url('../../assets/sprites/hero/left-step-1.png')`,
  leftStep2: `url('../../assets/sprites/hero/left-step-2.png')`,
  leftTurn: `url('../../assets/sprites/hero/left-turn.png')`,
  right: `url('../../assets/sprites/hero/right.png')`,
  rightStep: `url('../../assets/sprites/hero/right-step.png')`,
  rightStep1: `url('../../assets/sprites/hero/right-step-1.png')`,
  rightStep2: `url('../../assets/sprites/hero/right-step-2.png')`,
  rightTurn: `url('../../assets/sprites/hero/right-turn.png')`,
  attackBasic: `url('../../assets/sprites/hero/attack-basic.png')`,
  attackMagic: `url('../../assets/sprites/hero/attack-magic.png')`,
  attackScarlet: `url('../../assets/sprites/hero/attack-scarlet.png')`,
  attackRagnarok: `url('../../assets/sprites/hero/attack-ragnarok.png')`,
}

let villainConfig = {
  currentSprite: `url('../../assets/sprites/villain/back.png')`,
  direction: 'up',
  front: `url('../../assets/sprites/villain/front.png')`,
  back: `url('../../assets/sprites/villain/back.png')`,
  frontArmsOpen:`url('../../assets/sprites/villain/front-arms-open.png')`,
  left:`url('../../assets/sprites/villain/left.png')`,
  turnLeft:`url('../../assets/sprites/villain/turn-left.png')`,
  turnFront:`url('../../assets/sprites/villain/turn-front.png')`
}

let attackSFX = {
  attackBasic:[
    `url('../../assets/sprites/attacks/attack-1.png')`,
    `url('../../assets/sprites/attacks/attack-2.png')`,
    `url('../../assets/sprites/attacks/attack-3.png')`,
  ],
  attackFiarr:[
    `url('../../assets/sprites/attacks/attack-fiarr-1.png')`,
    `url('../../assets/sprites/attacks/attack-fiarr-2.png')`,
    `url('../../assets/sprites/attacks/attack-fiarr-3.png')`,
  ],
  attackBlizarrd:[
    `url('../../assets/sprites/attacks/attack-blizarrd-1.png')`,
    `url('../../assets/sprites/attacks/attack-blizarrd-2.png')`,
    `url('../../assets/sprites/attacks/attack-blizarrd-3.png')`,
    `url('../../assets/sprites/attacks/attack-blizarrd-4.png')`,
    `url('../../assets/sprites/attacks/attack-blizarrd-5.png')`,
  ],
  attackSparrk:[
    `url('../../assets/sprites/attacks/attack-sparrk-1.png')`,
    `url('../../assets/sprites/attacks/attack-sparrk-2.png')`,
    `url('../../assets/sprites/attacks/attack-sparrk-3.png')`,
  ],
  attackDisable:[
    `url('../../assets/sprites/attacks/attack-disable-1.png')`,
    `url('../../assets/sprites/attacks/attack-disable-2.png')`,
    `url('../../assets/sprites/attacks/attack-disable-3.png')`,
    `url('../../assets/sprites/attacks/attack-disable-4.png')`,
    `url('../../assets/sprites/attacks/attack-disable-5.png')`,
    `url('../../assets/sprites/attacks/attack-disable-6.png')`,
  ],
  attackScarlet:[
    `url('../../assets/sprites/attacks/attack-scarrlet-1.png')`,
    `url('../../assets/sprites/attacks/attack-scarrlet-2.png')`,
    `url('../../assets/sprites/attacks/attack-scarrlet-3.png')`,
    `url('../../assets/sprites/attacks/attack-scarrlet-4.png')`,
    `url('../../assets/sprites/attacks/attack-scarrlet-5.png')`,
  ],
  attackHarrmony:[
    `url('../../assets/sprites/attacks/attack-heal-1.png')`,
    `url('../../assets/sprites/attacks/attack-heal-2.png')`,
    `url('../../assets/sprites/attacks/attack-heal-3.png')`,
    `url('../../assets/sprites/attacks/attack-heal-4.png')`,
    `url('../../assets/sprites/attacks/attack-heal-5.png')`,
    `url('../../assets/sprites/attacks/attack-heal-6.png')`,
    `url('../../assets/sprites/attacks/attack-heal-7.png')`,
    `url('../../assets/sprites/attacks/attack-heal-8.png')`,
    `url('../../assets/sprites/attacks/attack-heal-9.png')`,
    `url('../../assets/sprites/attacks/attack-heal-10.png')`,
    `url('../../assets/sprites/attacks/attack-heal-11.png')`,
  ],
  attackRagnarok:[
    `url('../../assets/sprites/attacks/attack-disable-1.png')`,
    `url('../../assets/sprites/attacks/attack-disable-2.png')`,
    `url('../../assets/sprites/attacks/attack-disable-3.png')`,
    `url('../../assets/sprites/attacks/attack-disable-4.png')`,
    `url('../../assets/sprites/attacks/attack-disable-5.png')`,
    `url('../../assets/sprites/attacks/attack-disable-6.png')`,
    `url('../../assets/sprites/attacks/attack-fiarr-1.png')`,
    `url('../../assets/sprites/attacks/attack-fiarr-2.png')`,
    `url('../../assets/sprites/attacks/attack-fiarr-3.png')`,
    `url('../../assets/sprites/attacks/attack-blizarrd-1.png')`,
    `url('../../assets/sprites/attacks/attack-blizarrd-2.png')`,
    `url('../../assets/sprites/attacks/attack-blizarrd-3.png')`,
    `url('../../assets/sprites/attacks/attack-sparrk-1.png')`,
    `url('../../assets/sprites/attacks/attack-sparrk-2.png')`,
    `url('../../assets/sprites/attacks/attack-sparrk-3.png')`,
    `url('../../assets/sprites/attacks/attack-scarrlet-1.png')`,
    `url('../../assets/sprites/attacks/attack-scarrlet-2.png')`,
    `url('../../assets/sprites/attacks/attack-scarrlet-3.png')`,
    `url('../../assets/sprites/attacks/attack-scarrlet-4.png')`,
    `url('../../assets/sprites/attacks/attack-scarrlet-5.png')`,
  ],
  ghoul:[
    `url('../../assets/sprites/attacks/attack-ghoul-1.png')`,
    `url('../../assets/sprites/attacks/attack-ghoul-2.png')`,
    `url('../../assets/sprites/attacks/attack-ghoul-3.png')`,
    `url('../../assets/sprites/attacks/attack-ghoul-4.png')`,
    `url('../../assets/sprites/attacks/attack-ghoul-5.png')`,
  ],
  vulture:[
    `url('../../assets/sprites/attacks/attack-vulture-1.png')`,
    `url('../../assets/sprites/attacks/attack-vulture-2.png')`,
    `url('../../assets/sprites/attacks/attack-vulture-3.png')`,
    `url('../../assets/sprites/attacks/attack-vulture-4.png')`,
    `url('../../assets/sprites/attacks/attack-vulture-5.png')`,
    `url('../../assets/sprites/attacks/attack-vulture-6.png')`,
  ],
  leech:[
    `url('../../assets/sprites/attacks/attack-leech-1.png')`,
    `url('../../assets/sprites/attacks/attack-leech-2.png')`,
    `url('../../assets/sprites/attacks/attack-leech-3.png')`,
    `url('../../assets/sprites/attacks/attack-leech-4.png')`,
    `url('../../assets/sprites/attacks/attack-leech-5.png')`,
    `url('../../assets/sprites/attacks/attack-leech-6.png')`,
    `url('../../assets/sprites/attacks/attack-leech-7.png')`,
  ],
  werewolf:[
    `url('../../assets/sprites/attacks/attack-werewolf-1.png')`,
    `url('../../assets/sprites/attacks/attack-werewolf-2.png')`,
    `url('../../assets/sprites/attacks/attack-werewolf-3.png')`,
    `url('../../assets/sprites/attacks/attack-werewolf-4.png')`,
    `url('../../assets/sprites/attacks/attack-werewolf-5.png')`,
  ],
  hydra:[
    `url('../../assets/sprites/attacks/attack-hydra-1.png')`,
    `url('../../assets/sprites/attacks/attack-hydra-2.png')`,
    `url('../../assets/sprites/attacks/attack-hydra-3.png')`,
    `url('../../assets/sprites/attacks/attack-hydra-4.png')`,
    `url('../../assets/sprites/attacks/attack-hydra-5.png')`,
    `url('../../assets/sprites/attacks/attack-hydra-6.png')`,
  ]
}

const battleScenes = {
  cave: `url('../../assets/sprites/stage/battle-scenes/cave.png')`,
  dungeon: `url('../../assets/sprites/stage/battle-scenes/dungeon.png')`
}