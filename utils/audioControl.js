const audioToggle = ({target},audio) => {
  let currentAudio = inBattle?audio[1]:audio[0]
  currentAudio.paused ? target.innerText = "🔊" : target.innerText = "🔈";
  currentAudio.paused ? currentAudio.play() : currentAudio.pause();
  currentAudio.paused ? audioManuallyPaused = true : audioManuallyPaused = false;
}


const audioBtn = document.querySelector('.audio-toggle');
const audioTrack = document.querySelectorAll('audio');
audioBtn.addEventListener('click',(e) => audioToggle(e,audioTrack))