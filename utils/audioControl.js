const audioToggle = ({target},audio) => {
  audio.paused ? target.innerText = "🔊" : target.innerText = "🔈";
  audio.paused ? audio.play() : audio.pause();
}


const audioBtn = document.querySelector('.audio-toggle');
const audioTrack = document.querySelector('audio');
audioBtn.addEventListener('click',(e) => audioToggle(e,audioTrack))