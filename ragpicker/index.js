let previousBeta = null;
let isStepDetected = false;
let stepCount = 0;

function startStepCounting() {
	// 걸음 수 측정을 위해 이벤트 리스너 등록
	window.addEventListener("deviceorientation", (event) => {
		const { beta } = event;

		// 이전 beta 값이 null인 경우 초기화
		if (previousBeta === null) {
			previousBeta = beta;
			return;
		}

		// 이전 값과 현재 값의 차이 계산
		const deltaBeta = beta - previousBeta;

		// 걸음을 감지하는 조건 설정
		if (!isStepDetected && deltaBeta > 10) {
			isStepDetected = true;
		} else if (isStepDetected && deltaBeta < -10) {
			isStepDetected = false;
			stepCount++;
		}

		previousBeta = beta;
		displayStepCount();
	});
}

// 걸음 수 출력
function displayStepCount() {
	document.querySelector(".stepcount").textContent = "" + stepCount;
}

// 걸음 수 측정 시작
startStepCounting();
