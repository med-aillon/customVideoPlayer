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

  video.removeEventListener("loadeddata", fillDurationVariables);
  window.removeEventListener("load", fillDurationVariables);
}

function formatValue(val, el) {
  const currentMin = Math.trunc(val / 60);
  let currentSec = Math.trunc(val % 60);

  if (currentSec < 10) {
    currentSec = `0${currentSec}`;
  }

  el.textContent = `${currentMin}:${currentSec}`;
}

const progress = document.querySelector(".progress");

video.addEventListener("timeupdate", handleTimeUpdate);

function handleTimeUpdate() {
  current = video.currentTime;

  formatValue(current, timersDisplay[0]);
  const progressPosition = current / totalDuration;
  progress.style.transform = `scaleX(${progressPosition})`;
  if (video.ended) {
    togglerImg.src = "ressources/play.svg";
  }
}

const muteBtn = document.querySelector(".mute-btn");
const muteImg = document.querySelector(".mute-btn img");

muteBtn.addEventListener("click", handleMute);

function handleMute() {
  if (!video.muted) {
    video.muted = true;
    muteImg.src = "ressources/mute.svg";
  } else {
    video.muted = false;
    muteImg.src = "ressources/unmute.svg";
  }
}

const volumeSlider = document.querySelector(".volume-slider");

volumeSlider.addEventListener("change", handleVolumeModification);

function handleVolumeModification() {
  video.volume = volumeSlider.value / 100;

  if (video.volume === 0) {
    muteImg.src = "ressources/mute.svg";
  } else {
    muteImg.src = "ressources/unmute.svg";
  }
}
