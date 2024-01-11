const inputDeposit = document.querySelector(".input-deposit");
const btnDeposit = document.querySelector(".btn-deposit");
const btnChange = document.querySelector(".btn-change");
const myBalance = document.querySelector(".my-balance span");
const myMoney = document.querySelector(".my-money span");
const btnCola = document.querySelectorAll(".btn-cola");
const ulEarning = document.querySelector(".ul-earning");

// 1. 입금액 입력

btnDeposit.addEventListener("click", () => {
	let amount = Number(inputDeposit.value);
	let balance = Number(myBalance.textContent.replace(/[^0-9]/g, ""));
	let money = Number(myMoney.textContent.replace(/[^0-9]/g, ""));

	if (amount > money) {
		alert("소지금이 부족해요🚫");
	} else {
		myBalance.textContent = (balance + amount).toLocaleString() + "원";
		myMoney.textContent = (money - amount).toLocaleString() + "원";
		inputDeposit.value = "";
	}
});

// 2. 거스름돈 반환 버튼 구현

btnChange.addEventListener("click", () => {
	let balance = Number(myBalance.textContent.replace(/[^0-9]/g, ""));
	let money = Number(myMoney.textContent.replace(/[^0-9]/g, ""));

	myMoney.textContent = (money + balance).toLocaleString() + "원";
	myBalance.textContent = "0원";
});

// 3. 콜라버튼 누르면 earning리스트에 들어가는 기능

const btnColaArray = Array.from(btnCola);

btnColaArray.forEach((btn) => {
	btn.addEventListener("click", () => {
		// sold-out 클래스가 있는지 확인
		if (btn.classList.contains("sold-out")) {
			alert("품절입니다🚫");
			return;
		}

		let price = parseInt(btn.querySelector(".cola-price").textContent);
		let balance = parseInt(myBalance.textContent.replace(/[^0-9]/g, ""));
		let drinkName = btn.querySelector(".cola-name").textContent;

		if (balance >= price) {
			myBalance.textContent = (balance - price).toLocaleString() + "원";

			let existingItem = Array.from(ulEarning.children).find(
				(li) => li.querySelector(".earning-cola").textContent === drinkName
			);

			if (existingItem) {
				let pQuantity = existingItem.querySelector(".cola-quantity");
				pQuantity.textContent = parseInt(pQuantity.textContent) + 1;
			} else {
				let li = document.createElement("li");
				li.classList.add("list-earning");

				let img = document.createElement("img");
				img.src = `src/${drinkName.replace(" ", "_")}.png`;
				img.classList.add("small-cola");

				let pName = document.createElement("p");
				pName.classList.add("earning-cola");
				pName.textContent = drinkName;

				let pQuantity = document.createElement("p");
				pQuantity.classList.add("cola-quantity");
				pQuantity.textContent = "1";

				li.appendChild(img);
				li.appendChild(pName);
				li.appendChild(pQuantity);

				ulEarning.appendChild(li);
			}
		} else {
			alert("잔액이 부족해요🚫");
		}
	});
});

// 4. 획득 버튼 누르면 옆으로 넘어가는 기능
const btnEarning = document.querySelector(".btn-earning");
const purchasedDrinks = document.querySelector(".purchased-drinks");
const amount = document.querySelector(".amount");

btnEarning.addEventListener("click", () => {
	let earningListItems = Array.from(
		document.querySelectorAll(".list-earning")
	).filter((item) => !purchasedDrinks.contains(item));

	earningListItems.forEach((item) => {
		let drinkName = item.querySelector(".earning-cola").textContent;
		let existingItem = Array.from(purchasedDrinks.children).find(
			(li) => li.querySelector(".earning-cola").textContent === drinkName
		);

		if (existingItem) {
			let pQuantity = existingItem.querySelector(".cola-quantity");
			pQuantity.textContent =
				parseInt(pQuantity.textContent) +
				parseInt(item.querySelector(".cola-quantity").textContent);
			item.remove();
		} else {
			purchasedDrinks.appendChild(item);
		}
	});

	let totalQuantity = Array.from(
		purchasedDrinks.querySelectorAll(".cola-quantity")
	).reduce((total, quantity) => total + parseInt(quantity.textContent), 0);

	amount.textContent =
		"총금액: " + (totalQuantity * 1000).toLocaleString("ko-KR") + "원";
});

// 5.
