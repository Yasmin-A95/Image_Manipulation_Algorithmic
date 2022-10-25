const { createCanvas, loadImage } = require('canvas')
const fs = require('fs')

loadImage('./assets/house0.JPG').then((image) => {
    const canvas = createCanvas(image.width, image.height)
    const offscreenCanvas = createCanvas(image.width, image.height)
    const offscreenCTX = offscreenCanvas.getContext('2d')
    const ctx = canvas.getContext('2d')
    // draw img
    offscreenCTX.drawImage(image, 0, 0);
    for (let y = 0; y < image.width; y += 5) {
        for (let x = 0; x < image.height; x += 10) { // fuck wid whats in here
            //circles(offscreenCTX, y, x, ctx)
            ASCII(offscreenCTX, y, x, ctx)
            // ctx.beginPath();
            // ctx.rect(x, y, 10, 5)
            // ctx.stroke();
        } // Math.random() < 0.5 ? "rgba(255, 0, 0, 0)" :
    }
    saveImage(canvas);
})

function ASCII(offscreenCTX, y, x, ctx) {
    const colorAtPixel = offscreenCTX.getImageData(y + 5, x + 5, 1, 1)
    const r = colorAtPixel.data[0];
    const g = colorAtPixel.data[1];
    const b = colorAtPixel.data[3];
    ctx.beginPath();
    ctx.fill(r, g, b);
    //textSize(width);
    text("G", i * width, j * h)
}

function mathThatWorksForHighResImgs(offscreenCTX, ctx, image) {
    for (let y = 0; y < image.width; y += 5) {
        for (let x = 0; x < image.height; x += 10) {
            circles(offscreenCTX, y, x, ctx)
        }
    }
}
function circles(offscreenCTX, y, x, ctx) {
    const colorAtPixel = offscreenCTX.getImageData(y + 5, x + 5, 1, 1) // important, px positionin
    ctx.fillStyle =
        `rgba(${colorAtPixel.data[0]}, ${colorAtPixel.data[1]}, ${colorAtPixel.data[2]}, ${colorAtPixel.data[3]})`
    ctx.beginPath()
    ctx.arc(y, x, 5, 1, (2 * Math.PI))
    ctx.fill()
}

function saveImage(canvas) {
    const out = fs.createWriteStream(__dirname + '/assets/done.jpg')
    const stream = canvas.createJPEGStream({
        quality: 0.95,
        chromaSubsampling: false
    })
    stream.pipe(out)
    out.on('finish', () => console.log('The JPG file was created.'))
}