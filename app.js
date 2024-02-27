const video = document.querySelector(".video");
const playToggler = document.querySelector(".play-toggler");
const togglerImg = document.querySelector(".play-toggler img");

video.addEventListener("click", togglePlay);
playToggler.addEventListener("click", togglePlay);

function togglePlay() {
  if (video.paused) {
    video.play();
    togglerImg.src = "ressources/pause.svg";
  } else {
    video.pause();
    togglerImg.src = "ressources/play.svg";
  }
}

const timersDisplay = document.querySelectorAll(".time-display");

video.addEventListener("loadeddata", fillDurationVariables);
window.addEventListener("load", fillDurationVariables);

let current;
let totalDuration;

function fillDurationVariables() {
  if (Number.isNaN(video.duration)) return;

  current = video.currentTime;
  totalDuration = video.duration;

  formatValue(current, timersDisplay[0]);
  formatValue(totalDuration, timersDisplay[1]);
}

function formatValue(val, el) {
  const currentMin = Math.trunc(val / 60);
  let currentSec = Math.trunc(val % 60);

  if (currentSec < 10) {
    currentSec = `0${currentSec}`;
  }

  el.textContent = `${currentMin}:${currentSec}`;
}
