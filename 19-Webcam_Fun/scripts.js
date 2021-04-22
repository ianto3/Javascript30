const video = document.querySelector('.player');
const canvas = document.querySelector('.photo');
const ctx = canvas.getContext('2d');
const strip = document.querySelector('.strip');
const snap = document.querySelector('.snap');

function getVideo() {
    navigator.mediaDevices.getUserMedia({ video: true, audio: false })
        .then(localMediaStream => {
            // console.log(localMediaStream);
            video.srcObject = localMediaStream;
            video.play();
        })
        .catch((err) => {
            console.error("PLEASE, WEBCAM!", err);
        })
}

function paintToCanvas() {
    const width = video.videoWidth;
    const height = video.videoHeight;
    // console.log(width, height);
    canvas.width = width;
    canvas.height = height;

    return setInterval(() => {
        ctx.drawImage(video, 0, 0, width, height);
        // Extract pixels
        let pixels = ctx.getImageData(0, 0, width, height);
        // Modify pixels
        // pixels = redEffect(pixels);

        pixels = rgbSplit(pixels);
        // ctx.globalAlpha = 0.8;

        // pixels = greenScreen(pixels);

        // Return pixels
        ctx.putImageData(pixels, 0, 0);
    }, 16)
}

function takePhoto() {
    // Plays a snap sound.
    snap.currentTime = 0;
    snap.play();

    // Take snapshot.
    const data = canvas.toDataURL("image/jpeg");
    // console.log(data); // Text representation of the photo
    const link = document.createElement("a");
    link.href = data;
    link.setAttribute("download", "somepic");
    link.innerHTML = `<imgr src="${data}" alt="Handsome Man" />`;
    strip.insertBefore(link, strip.firstChild); // Where we drop the pics
}

function redEffect(pixels) {
    for (let i = 0; i < pixels.data.length; i += 4) {
        pixels[i + 0] = pixels[i + 0] + 100 // red channel
        pixels[i + 1] = pixels[i + 1] - 50 // green channel
        pixels[i + 2] = pixels[i + 2] * 0.5 // blue channel
    }
    return pixels;
}

function rgbSplit(pixels) {
    for (let i = 0; i < pixels.data.length; i += 4) {
        pixels.data[i - 150] = pixels.data[i + 0]; // red channel
        pixels.data[i + 500] = pixels.data[i + 1]; // green channel
        pixels.data[i - 550] = pixels.data[i + 2]; // blue channel
    }
    return pixels;
}

function greenScreen(pixels) {
    const levels = {};

    document.querySelectorAll('.rgb input').forEach((input) => {
        levels[input.name] = input.value;
    });

    for (i = 0; i < pixels.data.length; i = i + 4) {
        red = pixels.data[i + 0];
        green = pixels.data[i + 1];
        blue = pixels.data[i + 2];
        alpha = pixels.data[i + 3];

        if (red >= levels.rmin
            && green >= levels.gmin
            && blue >= levels.bmin
            && red <= levels.rmax
            && green <= levels.gmax
            && blue <= levels.bmax) {
            pixels.data[i + 3] = 0;
        }
    }

    return pixels;
}

getVideo();

video.addEventListener("canplay", paintToCanvas);