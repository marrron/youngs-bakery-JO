const lineWidth = document.querySelector(".brush-size");
const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
const colors = document.querySelectorAll(".palette");

canvas.width = 700;
canvas.height = 700;

ctx.fillStyle = "white";
ctx.fillRect(0, 0, canvas.width, canvas.height);

ctx.lineWidth = lineWidth.value;
let isPainting = false;

function onMove(event) {
	if (isPainting) {
		ctx.lineTo(event.offsetX, event.offsetY);
		ctx.stroke();
		return;
	}
	ctx.beginPath();
	ctx.moveTo(event.offsetX, event.offsetY);
}

function startPainting() {
	isPainting = true;
}

function cancelPainting() {
	isPainting = false;
}

function onLineWidthChange(event) {
	ctx.lineWidth = event.target.value;
}

function changeColor(e) {
	const color = window.getComputedStyle(e.target).backgroundColor;
	ctx.strokeStyle = color;
	ctx.fillStyle = color;
}

function fillCanvas() {
	ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function saveCanvas() {
	const dataURL = canvas.toDataURL("image/jpeg"); // 이미지 형식을 JPEG로 변경
	const link = document.createElement("a");
	link.href = dataURL;

	// 사용자로부터 파일 이름을 입력받습니다.
	const fileName = prompt("파일 이름을 입력하세요", "canvas.jpg");
	if (fileName) {
		link.download = fileName;
		link.click();
	}
}

canvas.addEventListener("mousemove", onMove);
canvas.addEventListener("mousedown", startPainting);
canvas.addEventListener("mouseup", cancelPainting);
canvas.addEventListener("mouseleave", cancelPainting);

lineWidth.addEventListener("change", onLineWidthChange);
colors.forEach((color) => color.addEventListener("click", changeColor));

const fillButton = document.querySelector(".btn-fill");
fillButton.addEventListener("click", fillCanvas);

const saveButton = document.querySelector(".btn-save");
saveButton.addEventListener("click", saveCanvas);
