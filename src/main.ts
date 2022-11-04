import "./style.scss";
import { sleep } from "./utils/spleep";
const canvas = document.getElementById("canvas") as HTMLCanvasElement;
const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
const btnStart = document.getElementById("btn__start") as HTMLElement;
const speedSlider = document.getElementById("speed") as HTMLInputElement;
const sinLabel = document.getElementById("sin") as HTMLElement;
const cosLabel = document.getElementById("cos") as HTMLElement;
const radiusLabel = document.getElementById("radius") as HTMLElement;
const PORCENTAGE_RADIUS = 0.75;
let maxRadius = 0;
let speed = 15;

async function begin() {
  let i = 0;

  do {
    let radians = (i * (Math.PI / 180));
    let x = Math.floor(maxRadius * Math.cos(radians));
    let y = Math.floor(maxRadius * Math.sin(radians));

    cosLabel.textContent = `Cos(${i}) = ${x}`;
    sinLabel.textContent = `Sin(${i}) = ${y}`;
    radiusLabel.textContent = `Radius(R) = ${maxRadius.toFixed(2)}`;
    
    drawStroke(x, y, 1);
    drawCosX(x, y);
    drawSinY(x, y);
    drawCurrentPoint(x, y);
    await sleep(speed);
    clearScreen();
    
    i++;
  } while(i <= 7200);

}

function drawCircumference() {
  ctx.beginPath();
  ctx.strokeStyle = "white";
  ctx.arc(0, 0, maxRadius, 0, 2 * Math.PI);
  ctx.lineWidth = 3.5;
  ctx.strokeStyle = "white";
  ctx.stroke();
}

function drawCurrentPoint(x: number, y: number) {
  ctx.beginPath();
  ctx.fillStyle = "#e13b2c";
  ctx.arc(x, y, 10, 0, Math.PI * 2);
  ctx.fill();
  ctx.closePath();
}

function drawStroke(x: number, y: number, lineWidth: number, color = "white") {
  ctx.beginPath();
  ctx.strokeStyle = color;
  ctx.lineWidth = lineWidth;
  ctx.moveTo(0, 0);
  ctx.lineTo(x, y);
  ctx.stroke();
}

function drawCosX(x: number, y: number) {
  ctx.beginPath();
  ctx.strokeStyle = "#77dd77";
  ctx.lineWidth = 1.7;
  ctx.moveTo(x, y);
  ctx.lineTo(x, 0);
  ctx.stroke();
  
  drawStroke(x,0, 3, "#77dd77");
  drawCurrentPoint(x, 0)
}

function drawSinY(x: number, y: number) {
  ctx.beginPath();
  ctx.strokeStyle = "#84b6f4";
  ctx.lineWidth = 1.7;
  ctx.moveTo(x, y);
  ctx.lineTo(0, y);
  ctx.stroke();
  drawStroke(0,y, 3, "#84b6f4");
  drawCurrentPoint(0, y)

}

function clearScreen() {
  ctx.fillStyle = "black";
  ctx.fillRect( -canvas.width, -canvas.height, canvas.width * 2,canvas.height * 2);
  drawCoordinateAxis();
  drawCircumference();
}

function drawCoordinateAxis() {
  ctx.beginPath();
  ctx.strokeStyle = "white";
  ctx.lineWidth = 2;
  ctx.moveTo(0, -maxRadius - 25);
  ctx.lineTo(0, maxRadius + 25);
  ctx.stroke();
  ctx.closePath();

  ctx.beginPath();
  ctx.strokeStyle = "white";
  ctx.lineWidth = 2;
  ctx.moveTo(-maxRadius - 25, 0);
  ctx.lineTo(maxRadius + 25, 0);
  ctx.stroke();
  ctx.closePath();
}

function translateOrigin() {
  maxRadius = Math.floor((canvas.width / 2) * PORCENTAGE_RADIUS);
  ctx.translate(canvas.width / 2, canvas.height / 2);
  drawCircumference();
}

window.addEventListener("resize", () => {
  canvas.width = window.innerWidth / 2;
  canvas.height = window.innerHeight / 1.2;
  window.location.reload();
});

document.addEventListener("DOMContentLoaded", function () {
  canvas.width = window.innerWidth / 2;
  canvas.height = window.innerHeight / 1.2;
  translateOrigin();
  drawCoordinateAxis();
  radiusLabel.textContent = `Radius(R) = ${maxRadius.toFixed(2)}`;
  cosLabel.textContent = `Cos(${0}) = ${Math.floor(maxRadius * Math.cos(0))}`;
  sinLabel.textContent = `Sin(${0}) = ${Math.floor(maxRadius * Math.sin(0))}`;
  speedSlider.value = "0";
});

speedSlider.addEventListener("input", function() {
  speed = parseFloat(speedSlider.value);
})
  
btnStart.addEventListener("click", async () => {
  if (!btnStart.textContent!.includes("Start")) {
      window.location.reload();
      return;
  };

  btnStart.innerText = "Restart";
  begin();
});