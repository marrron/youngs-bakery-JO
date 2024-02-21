function updateTime() {
	var now = new Date(); // 현재 날짜 및 시간을 가져옴

	var hours = now.getHours(); // 시간을 가져옴
	var minutes = now.getMinutes(); // 분을 가져옴

	// 시간이 한 자리일 경우 앞에 0을 붙이기
	if (hours < 10) {
		hours = "0" + hours;
	}
	// 분이 한 자리일 경우 앞에 0을 붙이기
	if (minutes < 10) {
		minutes = "0" + minutes;
	}

	// 시간 표시
	document.querySelector(".time").innerText = hours + ":" + minutes;

	var date = now.getDate(); // 일을 가져옴
	var month = now.getMonth() + 1; // 월을 가져옴 (월은 0부터 시작이므로 1을 더해줌)
	var year = now.getFullYear(); // 년을 가져옴

	// 월과 일이 한 자리일 경우 앞에 0을 붙여 두 자리로 만듦
	if (month < 10) {
		month = "0" + month;
	}
	if (date < 10) {
		date = "0" + date;
	}

	// 날짜 표시
	document.querySelector(".date").innerText = month + "/" + date + "/" + year;
}

// 페이지가 로드되면 updateTime 함수를 실행하고, 그 후 매 1초마다 updateTime 함수를 실행
window.onload = function () {
	updateTime();
	setInterval(updateTime, 1000);
};
