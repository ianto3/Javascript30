
window.document.addEventListener("keydown", function (ev) {
    const keyCode = ev.keyCode;
    const keyBtn = document.querySelector(`div[data-key="${keyCode}"]`);
    keyBtn.classList.add("playing") // activate css effect

    const audio = document.querySelector(`audio[data-key="${keyCode}"]`);
    audio.currentTime = 0; // starts audio from 0, allows to play in fast succesion.
    audio.play();

    keyBtn.classList.remove("playing")
});