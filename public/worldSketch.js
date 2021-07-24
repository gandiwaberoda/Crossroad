const worldCanvasContainer = document.getElementById("worldCanvasContainer")
const worldSketch = (sk) => {
    let scale = 1.0;

    const lapanganPadding = 50;
    const canvasW = 700;
    const canvasH = 1000;
    const lapanganOrigin = { x: lapanganPadding, y: lapanganPadding };

    function W2CanX(worldX) {
        return (worldX + lapanganPadding) * scale;
    }
    function W2CanY(worldY) {
        return (canvasH - worldY - lapanganPadding) * scale;
    }
    function W2CanvasSpace(x, y) {
        return {
            x: W2CanX(x),
            y: W2CanY(y),
        }
    }

    sk.setup = () => {
        sk.createCanvas(worldCanvasContainer.offsetWidth, worldCanvasContainer.offsetHeight);
        rescale();
    };

    function drawRobot(worldX, worldY, worldRot) {
        sk.push()
        sk.ellipseMode(sk.CENTER);
        sk.fill(255);
        sk.circle(W2CanX(worldX), W2CanY(worldY), 50 * scale);
        sk.pop()
    }

    function drawLapangan() {
        sk.push();
        sk.fill(56, 155, 60);
        sk.rect(0, 0, canvasW * scale, canvasH * scale, 10)

        sk.translate(lapanganPadding * scale, lapanganPadding * scale)

        // Garis lapangan
        sk.stroke(255)
        sk.strokeWeight(5 * scale); // Beastly

        // Lapangan
        sk.fill(56, 155, 60);
        sk.rect(0, 0, 600 * scale, 900 * scale);

        // Lingkaran tengah
        sk.circle(300 * scale, 450 * scale, 200 * scale)
        sk.line(0, 900 / 2 * scale, 600 * scale, 900 / 2 * scale)

        // Garis Gawang Temen
        sk.rect((600 / 2 - 150) * scale, (900 - 100) * scale, 300 * scale, 100 * scale)
        // Garis Gawang Musuh
        sk.rect((600 / 2 - 150) * scale, 0, 300 * scale, 100 * scale)

        sk.fill(255)
        // Gawang Temen
        sk.rect((600 / 2 - 200 / 2) * scale, 900 * scale, 200 * scale, 30 * scale)
        // Gawang Musuh
        sk.rect((600 / 2 - 200 / 2) * scale, -30 * scale, 200 * scale, 30 * scale)
        sk.fill(56, 155, 60);


        // sk.rect()
        sk.pop();
    }

    function rescale() {
        scale = worldCanvasContainer.offsetWidth / canvasW;
        sk.resizeCanvas(canvasW * scale, canvasH * scale);
    }

    sk.draw = () => {
        sk.background(0);
        drawLapangan();
        drawRobot(300, 450, 10);
    };

    sk.windowResized = () => {
        rescale();
    }
};
let worldCanvas = new p5(worldSketch, worldCanvasContainer);
