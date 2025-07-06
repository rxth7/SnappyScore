// script.js
const canvas = document.getElementById("drawingCanvas");
const ctx = canvas.getContext("2d");
const colorPicker = document.getElementById("colorPicker");
const brushSize = document.getElementById("brushSize");

let drawing = false;
let tool = 'brush';

canvas.addEventListener("mousedown", (e) => {
  drawing = true;
  ctx.beginPath();
  ctx.moveTo(e.offsetX, e.offsetY);
});

canvas.addEventListener("mouseup", () => {
  drawing = false;
  ctx.beginPath();
});

canvas.addEventListener("mouseout", () => {
  drawing = false;
  ctx.beginPath();
});

canvas.addEventListener("mousemove", (e) => {
  if (!drawing) return;
  ctx.lineWidth = brushSize.value;
  ctx.lineCap = "round";
  ctx.strokeStyle = tool === 'brush' ? colorPicker.value : "#fff";
  ctx.lineTo(e.offsetX, e.offsetY);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(e.offsetX, e.offsetY);
});

function changeTool(selectedTool) {
  tool = selectedTool;
}

function clearCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}
