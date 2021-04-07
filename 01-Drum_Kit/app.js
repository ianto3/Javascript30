
window.document.addEventListener("keydown", function (ev) {
    const keyCode = ev.keyCode;
    const keyBtn = document.querySelector(`div[data-key="${keyCode}"]`);
    if (!keyBtn) return; // breaks rest of function, avoids erros in console.
    keyBtn.classList.add("playing"); // activate css effect

    const audio = document.querySelector(`audio[data-key="${keyCode}"]`);
    audio.currentTime = 0; // starts audio from 0, allows to play in fast succesion.
    audio.play();
});


const keys = document.querySelectorAll(".key");
keys.forEach(key => {
    key.addEventListener("transitionend", ev => {
        console.log(ev)
        const playing = document.querySelector(".playing");
        if (!playing) return; // breaks rest of function, avoids erros in console.
        playing.classList.remove("playing");
    })
})