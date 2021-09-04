const audioToggle = ({target},audio) => {
  let currentAudio = inBattle?audio[1]:audio[0]
  currentAudio.paused ? target.innerText = "🔊" : target.innerText = "🔈";
  currentAudio.paused ? currentAudio.play() : currentAudio.pause();
  currentAudio.paused ? audioManuallyPaused = true : audioManuallyPaused = false;
}

const soundEffects = {
  all: document.querySelectorAll('[data-effect'),
  fire: document.querySelector('[data-effect="fire"]'),
  ice: document.querySelector('[data-effect="ice"]'),
  lightning: document.querySelector('[data-effect="lightning"]'),
  break: document.querySelector('[data-effect="break"]'),
  slice: document.querySelector('[data-effect="slice"]'),
  swing: document.querySelector('[data-effect="swing"]'),
  heal: document.querySelector('[data-effect="heal"]'),
  absorb: document.querySelector('[data-effect="absorb"]'),
  crunch: document.querySelector('[data-effect="crunch"]'),
  bird: document.querySelector('[data-effect="bird"]'),
  inferno: document.querySelector('[data-effect="inferno"]'),
  ghoul: document.querySelector('[data-effect="ghoul"]'),
  confirm: document.querySelector('[data-effect="confirm"]'),
}

const audioBtn = document.querySelector('.audio-toggle');
const audioTrack = document.querySelectorAll('audio');
audioBtn.addEventListener('click',(e) => audioToggle(e,audioTrack))