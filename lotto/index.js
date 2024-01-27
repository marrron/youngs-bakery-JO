// 금액 버튼 누르면 input에 들어가게
document.querySelector(".btn").addEventListener("click", function (event) {
	if (event.target.tagName === "BUTTON") {
		document.querySelector(".input-side input").value = event.target.textContent
			.replace(/,/g, "")
			.replace("원", "");
	}
});

// 금액 추가하면 수량 변경
var totalQuantity = 0;
document
	.querySelector(".input-side button")
	.addEventListener("click", function () {
		var inputValue = document.querySelector(".input-side input").value;
		var quantity = Math.floor(inputValue / 1000);
		totalQuantity += quantity;
		document.querySelector(".check-side span").textContent =
			"총 " + totalQuantity + "개를 구매하였습니다";
	});

// 로또 번호 생성
function createLottoNumbers() {
	var numbers = Array.from({ length: 45 }, (_, i) => i + 1);
	var lottoNumbers = [];

	for (var i = 0; i < 6; i++) {
		var index = Math.floor(Math.random() * numbers.length);
		var number = numbers.splice(index, 1)[0];
		lottoNumbers.push(number);
	}

	return lottoNumbers.sort(function (a, b) {
		return a - b;
	});
}
// input value 1000의 배수로 제한
document
	.querySelector(".input-side button")
	.addEventListener("click", function () {
		var inputValue = document.querySelector(".input-side input").value;

		if (inputValue % 1000 !== 0) {
			alert("🚫1000원 단위로 구매 가능합니다🚫");
			return;
		}

		var quantity = Math.floor(inputValue / 1000);
		var lottoWrap = document.querySelector(".lotto-wrap");

		if (!lottoWrap) {
			lottoWrap = document.createElement("div");
			lottoWrap.classList.add("lotto-wrap");
			lottoWrap.style.display = "none";
			lottoWrap.style.flexDirection = "column";
			lottoWrap.style.overflowY = "scroll";
			lottoWrap.style.maxHeight = "300px";
			lottoWrap.style.paddingBottom = "80px";
			lottoWrap.style.width = "550px";
			// 입력버튼 누르면 당첨번호버튼 안눌리는거 해결
			lottoWrap.style.position = "absolute";

			var bokSide = document.querySelector(".bok-side");
			bokSide.insertAdjacentElement("afterend", lottoWrap);
		}

		for (var i = 0; i < quantity; i++) {
			var lottoNumbers = createLottoNumbers();

			var numberWrap = document.createElement("div");
			numberWrap.classList.add("number-wrap");
			lottoNumbers.forEach(function (number) {
				var p = document.createElement("p");
				p.textContent = number;
				numberWrap.appendChild(p);
			});
			lottoWrap.appendChild(numberWrap);
		}
	});

// lottoWrap 토글 / label class로 하면 안먹힘
document.querySelector(".toggle-btn").addEventListener("click", function () {
	var lottoWrap = document.querySelector(".lotto-wrap");
	if (lottoWrap && lottoWrap.style.display === "none") {
		lottoWrap.style.display = "flex";
	} else if (lottoWrap) {
		lottoWrap.style.display = "none";
	}
});

// 당첨번호 생성
function generateLottoNumbers() {
	var numbers = Array.from({ length: 45 }, (_, i) => i + 1);
	var winningNumbers = [];

	for (var i = 0; i < 6; i++) {
		var index = Math.floor(Math.random() * numbers.length);
		var number = numbers.splice(index, 1)[0];
		winningNumbers.push(number);
	}

	return {
		mainNumbers: winningNumbers.sort(function (a, b) {
			return a - b;
		}),
		bonusNumber: numbers[Math.floor(Math.random() * numbers.length)],
	};
}

document.querySelector(".auto-result").addEventListener("click", function () {
	var winningNumbers = generateLottoNumbers();
	var winningDivs = document.querySelectorAll(".winning > div > p");

	for (var i = 0; i < winningDivs.length; i++) {
		winningDivs[i].textContent = winningNumbers.mainNumbers[i];
	}

	var bonusDiv = document.querySelector(".bonus > div > p");
	bonusDiv.textContent = winningNumbers.bonusNumber;
});

// 결과 확인하기 누르면 모달창 뜨게
document.querySelector(".result").addEventListener("click", function () {
	var modal = document.querySelector(".modal");
	modal.style.display = "block";
});

// 다시시작하기 누르면 페이지 리로드
document.querySelector(".restart").addEventListener("click", function () {
	location.reload();
});

// 각 당첨 케이스별로 카운트를 저장하는 객체
var winningCounts = {
	"0 ~ 2개": 0,
	"3개": 0,
	"4개": 0,
	"5개": 0,
	"5개 + 보너스볼": 0,
	"6개": 0,
};

// 각 당첨 케이스별 당첨금
var prizes = {
	"0 ~ 2개": 0,
	"3개": 5000,
	"4개": 50000,
	"5개": 1500000,
	"5개 + 보너스볼": 30000000,
	"6개": 2000000000,
};

// 당첨금 확인
function checkWinning(numbers, winningNumbers, bonusNumber) {
	let matchCount = 0;
	let bonusMatch = false;
	let prizeKey = "";

	numbers.forEach((number) => {
		if (winningNumbers.includes(number)) {
			matchCount++;
		} else if (number === bonusNumber) {
			bonusMatch = true;
		}
	});

	switch (matchCount) {
		case 6:
			prizeKey = "6개";
			break;
		case 5:
			prizeKey = bonusMatch ? "5개 + 보너스볼" : "5개";
			break;
		case 4:
			prizeKey = "4개";
			break;
		case 3:
			prizeKey = "3개";
			break;
		default:
			prizeKey = "0 ~ 2개";
			break;
	}

	// 당첨 카운트 업데이트
	winningCounts[prizeKey]++;

	// 당첨금 반환
	return prizes[prizeKey];
}

// 결과 확인하기 버튼 클릭 이벤트
document.querySelector(".result").addEventListener("click", function () {
	var winningNumbers = generateLottoNumbers();
	let totalPrize = 0;
	document.querySelectorAll(".number-wrap").forEach((numberWrap) => {
		const numbers = Array.from(numberWrap.children).map((p) =>
			Number(p.textContent)
		);
		const prize = checkWinning(
			numbers,
			winningNumbers.mainNumbers,
			winningNumbers.bonusNumber
		);
		totalPrize += prize;
	});

	// 테이블 업데이트
	var rows = document.querySelector("tbody").children;
	for (let i = 0; i < rows.length; i++) {
		const row = rows[i];
		const key = row.children[0].textContent;
		row.children[2].textContent = winningCounts[key] + "개";
	}

	// 총 당첨금 표시
	var totalPrizeP = document.createElement("p");
	totalPrizeP.textContent = `총 당첨금: ${totalPrize.toLocaleString()}원!`;
	var rateOfReturn = document.querySelector(".rate-of-return");
	rateOfReturn.parentNode.insertBefore(totalPrizeP, rateOfReturn);

	// 수익률 계산
	var totalInvestment = totalQuantity * 1000; // 총 투자금액
	var rateOfReturnCalc =
		((totalPrize - totalInvestment) / totalInvestment) * 100; // 수익률

	// 수익률 출력
	rateOfReturn.textContent = `당신의 총 수익률은 ${rateOfReturnCalc.toFixed(
		2
	)}% 입니다.`;
});
