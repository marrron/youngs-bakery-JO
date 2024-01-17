let timerInterval;
let isPaused = false;

const startButton = document.querySelector(".btn-start");
const resetButton = document.querySelector(".btn-reset");
const hourInput = document.querySelector(".inp-hrs");
const minuteInput = document.querySelector(".inp-min");
const secondInput = document.querySelector(".inp-sec");
const startBtnImg = document.querySelector(".img-start");
const resetBtnImg = document.querySelector(".img-reset");
const textStart = document.querySelector(".txt-start");

hourInput.addEventListener("focus", function () {
	this.value = "";
});
minuteInput.addEventListener("focus", function () {
	this.value = "";
});
secondInput.addEventListener("focus", function () {
	this.value = "";
});

hourInput.addEventListener("blur", function () {
	if (this.value === "") {
		this.value = "00";
	}
});
minuteInput.addEventListener("blur", function () {
	if (this.value === "") {
		this.value = "00";
	}
});
secondInput.addEventListener("blur", function () {
	if (this.value === "") {
		this.value = "00";
	}
});

startButton.addEventListener("click", function () {
	if (!isPaused) {
		let hours = parseInt(hourInput.value);
		let minutes = parseInt(minuteInput.value);
		let seconds = parseInt(secondInput.value);

		if (hours === 0 && minutes === 0 && seconds === 0) {
			return;
		}

		let totalSeconds = hours * 60 * 60 + minutes * 60 + seconds;

		timerInterval = setInterval(function () {
			totalSeconds--;
			let hour = Math.floor(totalSeconds / 3600);
			let minute = Math.floor((totalSeconds - hour * 3600) / 60);
			let second = totalSeconds - hour * 3600 - minute * 60;

			hourInput.value = hour < 10 ? "0" + hour : hour;
			minuteInput.value = minute < 10 ? "0" + minute : minute;
			secondInput.value = second < 10 ? "0" + second : second;

			if (totalSeconds <= 0) {
				clearInterval(timerInterval);
				alert("타이머 끝!");
				startButton.style.backgroundColor = "#69A13F";
				startButton.style.color = "#568037";
				startBtnImg.src = "src/start-button-disabled.svg";
				startButton.style.cursor = "Default";
				resetButton.style.backgroundColor = "#69A13F";
				resetButton.style.color = "#568037";
				resetBtnImg.src = "src/reset-button-disabled.svg";
				resetButton.style.cursor = "Default";
				textStart.innerHTML = "START";
				isPaused = false;
			}
		}, 1000);

		startButton.style.backgroundColor = "#F9F03E";
		startButton.style.color = "#fff";
		startBtnImg.src = "src/pause-button.svg";
		textStart.innerHTML = "PAUSE";
		isPaused = true;
	} else {
		clearInterval(timerInterval);
		startButton.style.backgroundColor = "#3661CC";
		startButton.style.color = "#fff";
		startBtnImg.src = "src/start-button.svg";
		textStart.innerHTML = "START";
		isPaused = false;
	}
});

resetButton.addEventListener("click", function () {
	clearInterval(timerInterval);
	hourInput.value = "00";
	minuteInput.value = "00";
	secondInput.value = "00";
	startButton.style.backgroundColor = "#69A13F";
	startButton.style.color = "#568037";
	startBtnImg.src = "src/start-button-disabled.svg";
	startButton.style.cursor = "Default";
	resetButton.style.backgroundColor = "#69A13F";
	resetButton.style.color = "#568037";
	resetBtnImg.src = "src/reset-button-disabled.svg";
	resetButton.style.cursor = "Default";
	textStart.innerHTML = "START";
	isPaused = false;
});

const fields = [hourInput, minuteInput, secondInput];
fields.forEach((field) => {
	field.addEventListener("input", function () {
		if (field.value !== "00") {
			startButton.style.backgroundColor = "#3661CC";
			startButton.style.color = "#fff";
			startBtnImg.src = "src/start-button.svg";
			startButton.style.cursor = "pointer";
			resetButton.style.backgroundColor = "#F84A34";
			resetButton.style.color = "#fff";
			resetBtnImg.src = "src/reset-button.svg";
			resetButton.style.cursor = "pointer";
		} else {
			startButton.style.backgroundColor = "";
			resetButton.style.backgroundColor = "";
		}
	});
});
