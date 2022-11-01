import "./style.css";
const canvas = document.getElementById("canvas") as HTMLCanvasElement;
const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
const PORCENTAJE_RADIUS = 0.70;
let maxRadius = 0;

canvas.width = window.innerWidth / 2;
canvas.height = window.innerHeight / 1.2;

translateOrigin();

// Formating the origin of the canvas to the center.
function translateOrigin() {
  maxRadius = (canvas.width / 2) * PORCENTAJE_RADIUS;
  ctx.translate(canvas.width / 2, canvas.height / 2);
  drawCircumference();
  begin();
}

async function begin() {
  for (let i = 0; i <= 720; i++) {
    let radians = i * (Math.PI / 180);
    console.log({angle: i, radians})
    let x = Math.floor(maxRadius * Math.cos(radians));
    let y = Math.floor(maxRadius * Math.sin(radians));

    drawStroke(x, y);
    drawCosineX(x, y);
    drawSineY(x, y);
    drawPoint(x, y);
    await sleep(20);
    clearScreen();
  }
}
function drawCircumference() {
  ctx.beginPath();
  ctx.strokeStyle = "white";
  ctx.arc(0, 0, maxRadius, 0, 2 * Math.PI);
  ctx.lineWidth = 3.5;
  ctx.strokeStyle = "white";
  ctx.stroke();
}

function drawPoint(x: number, y: number) {
  ctx.beginPath();
  ctx.fillStyle = "red";
  ctx.arc(x, y, 5, 0, Math.PI * 2);
  ctx.fill();
  ctx.closePath();
}

function drawStroke(x: number, y: number) {
  ctx.beginPath();
  ctx.strokeStyle = "tomato";
  ctx.lineWidth = 0.9;
  ctx.moveTo(0, 0);
  ctx.lineTo(x, y);
  ctx.stroke();
}

function drawCosineX(x: number, y: number) {
  ctx.beginPath();
  ctx.strokeStyle = "orange";
  ctx.lineWidth = 1.3;
  ctx.moveTo(x, y);
  ctx.lineTo(x, 0);
  ctx.stroke();
}

function drawSineY(x: number, y: number) {
  ctx.beginPath();
  ctx.strokeStyle = "lightGreen";
  ctx.lineWidth = 1.3;
  ctx.moveTo(x, y);
  ctx.lineTo(0, y);
  ctx.stroke();
}

function clearScreen() {
  ctx.fillStyle = "black";
  ctx.fillRect(
    -canvas.width,
    -canvas.height,
    canvas.width * 2,
    canvas.height * 2
  );
  drawCoordinateLine();
  drawCircumference()
}

function drawCoordinateLine() {
  ctx.beginPath();
  ctx.strokeStyle = "white";
  ctx.lineWidth = 2;
  ctx.moveTo(0, (-maxRadius - 25));
  ctx.lineTo(0, (maxRadius + 25));
  ctx.stroke();

  ctx.beginPath();
  ctx.strokeStyle = "white";
  ctx.lineWidth = 2;
  ctx.moveTo((-maxRadius - 25), 0);
  ctx.lineTo((maxRadius + 25), 0);
  ctx.stroke();
}

function sleep(ms: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

window.addEventListener("resize", () => {
  canvas.width = window.innerWidth / 2;
  canvas.height = window.innerHeight / 1.2;
  translateOrigin();
});
