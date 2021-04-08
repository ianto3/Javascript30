const media = document.querySelector(".viewer");
const controls = document.querySelector(".player__controls");
const playBtn = document.querySelector(".toggle");
const slider = document.querySelectorAll(".player__slider");
const skipBtn = document.querySelectorAll(".player__button");
const progress = document.querySelector(".progress");
const progressBar = document.querySelector('.progress__filled');
const fullScreenBtn = document.querySelector(".fullscreen");

function playPauseMedia() {
    console.dir(playBtn)
    if (media.paused) {
        playBtn.innerHTML = "❚ ❚"
        media.play();
    } else {
        playBtn.innerHTML = "►"
        media.pause();
    }
}

// updates volume or playback rate
function updateRange() {
    if (this.name === "volume") {
        media.volume = this.value;
    } else {
        media.playbackRate = this.value;
    }
}

// skip time forward or backwards
function skip() {
    media.currentTime += parseFloat(this.dataset.skip);
}

function handleProgress() {
    const percent = (media.currentTime / media.duration) * 100;
    progressBar.style.flexBasis = `${percent}%`;
}

// skip through progress interacting with the progressbar
function jumpProgressBar(ev) {
    const clickedOffset = ev.offsetX;
    const divTotalOffset = progress.offsetWidth;
    const clickedPercentage = clickedOffset * 100 / divTotalOffset;
    const newTime = clickedPercentage * media.duration / 100;
    // suggested
    // const newTime = ev.offsetX / progress.offsetWidth * media.duration;
    media.currentTime = newTime;
}

playBtn.addEventListener("click", playPauseMedia);
media.addEventListener("click", playPauseMedia);
media.addEventListener("timeupdate", handleProgress);
slider.forEach(slider => slider.addEventListener("change", updateRange));
skipBtn.forEach(btn => btn.addEventListener("click", skip));
progress.addEventListener("click", ev => jumpProgressBar(ev))
fullScreenBtn.addEventListener("click", () => media.requestFullscreen())