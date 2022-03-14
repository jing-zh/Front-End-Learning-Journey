// DOM elements

const musicContainer = document.getElementById("music-container");

const playBtn = document.getElementById("play");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");

const audio = document.getElementById("audio");
const progress = document.getElementById("progress");
const progressContainer = document.getElementById("progress-container");
const title = document.getElementById("title");
const cover = document.getElementById("cover");

const currTime = document.querySelector("#currTime");
const durTime = document.querySelector("#durTime");

// arrange song titles in a array

const songs = [
  "Big Adventure",
  "Crash Test",
  "In My Memory",
  "On A Journey",
  "Some Kind Of Feelin",
];

let songIndex = songs.length - 1;

// =========================================
// Load Song
// =========================================

// The loadSong Function

loadSong(songs[songIndex]);

function loadSong(song) {
  title.innerText = song;
  audio.src = `./assets/music/${song}.mp3`;
  cover.src = `./assets/images/${song}.jpg`;
}

playBtn.addEventListener("click", () => {
  const isPlaying = musicContainer.classList.contains("play");
  if (isPlaying) {
    pauseSong();
  } else {
    playSong();
  }
});

// 为什么这里使用的是music container呢？

// The playsong and pausesong function
function playSong() {
  musicContainer.classList.add("play");
  playBtn.querySelector("i.fas").classList.remove("fa-play");
  playBtn.querySelector("i.fas").classList.add("fa-pause");

  audio.play();
}

function pauseSong() {
  musicContainer.classList.remove("play");
  playBtn.querySelector("i.fas").classList.add("fa-play");
  playBtn.querySelector("i.fas").classList.remove("fa-pause");

  audio.pause();
}

// =========================================
// Switch Song
// =========================================

prevBtn.addEventListener("click", prevSong);
nextBtn.addEventListener("click", nextSong);

// 不要像下面这样写
// prevBtn.addEventListener("click", prevSong（）);
// nextBtn.addEventListener("click", nextSong（）);
// 会导致无法播放，这样没有pass function

function prevSong() {
  songIndex--;
  if (songIndex < 0) {
    songIndex = songs.length - 1;
  }

  loadSong(songs[songIndex]);
  playSong();
}

function nextSong() {
  songIndex++;
  if (songIndex > songs.length - 1) {
    songIndex = 0;
  }

  loadSong(songs[songIndex]);
  playSong();
}

// progress

audio.addEventListener("timeupdate", updateProgess);

function updateProgess(e) {
  const { duration, currentTime } = e.srcElement;
  const progressPercent = (currentTime / duration) * 100;
  progress.style.width = `${progressPercent}%`;
}

// set progress

progressContainer.addEventListener("click", setProgress);

function setProgress(e) {
  const width = this.clientWidth;
  const clickX = e.offsetX;
  const duration = audio.duration;

  audio.currentTime = (clickX / width) * duration;
}

// play next song when the song is ended

audio.addEventListener("ended", nextSong);
