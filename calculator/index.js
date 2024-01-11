// 결과를 표시할 input 요소
const input = document.querySelector("input");

function appendToResult(value) {
	if (input.value === "0") {
		input.value = value;
	} else {
		input.value += value;
	}
}

// 결과 계산
function calculateResult() {
	try {
		let expression = input.value;
		let answer = eval(expression);
		answer = Math.floor(answer); // 소수점 이하는 버리기
		input.value = answer;
	} catch (error) {
		input.value = "Error"; // 계산 중 오류 발생하면 에러
	}
}

// 결과 초기화
function clearResult() {
	input.value = "0";
}

document.getElementById;
