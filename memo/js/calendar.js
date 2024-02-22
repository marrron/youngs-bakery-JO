const today = new Date();
let currentMonth = today.getMonth();
let currentYear = today.getFullYear();
let currentDate = today.getDate();

const monthNames = [
	"January",
	"February",
	"March",
	"April",
	"May",
	"June",
	"July",
	"August",
	"September",
	"October",
	"November",
	"December",
];

function showCalendar(month, year) {
	const firstDay = new Date(year, month).getDay();
	const daysInMonth = 32 - new Date(year, month, 32).getDate();

	let date = 1;
	let calendar = document.querySelector(".calendar .content .days");
	calendar.innerHTML =
		"<tr><th>Sun</th><th>Mon</th><th>Tue</th><th>Wed</th><th>Thu</th><th>Fri</th><th>Sat</th></tr>";

	document.querySelector(
		".calendar .content .month p"
	).textContent = `${year}, ${monthNames[month]}`;

	for (let i = 0; i < 6; i++) {
		let row = document.createElement("tr");

		for (let j = 0; j < 7; j++) {
			if ((i === 0 && j < firstDay) || date > daysInMonth) {
				let cell = document.createElement("td");
				row.appendChild(cell);
			} else {
				let cell = document.createElement("td");
				cell.textContent = date;

				// 오늘 날짜인지 확인하고, 맞다면 'today' 클래스를 추가
				if (
					year === today.getFullYear() &&
					month === today.getMonth() &&
					date === currentDate
				) {
					cell.classList.add("today");
				}

				row.appendChild(cell);
				date++;
			}
		}

		calendar.appendChild(row);
	}
}

document
	.querySelector(".calendar .content .month .prev-month")
	.addEventListener("click", function () {
		currentYear = currentMonth === 0 ? currentYear - 1 : currentYear;
		currentMonth = currentMonth === 0 ? 11 : currentMonth - 1;
		showCalendar(currentMonth, currentYear);
	});

document
	.querySelector(".calendar .content .month .next-month")
	.addEventListener("click", function () {
		currentYear = currentMonth === 11 ? currentYear + 1 : currentYear;
		currentMonth = (currentMonth + 1) % 12;
		showCalendar(currentMonth, currentYear);
	});

showCalendar(currentMonth, currentYear);
