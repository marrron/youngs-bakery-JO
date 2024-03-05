const API_KEY = "";

if (navigator.geolocation) {
	navigator.geolocation.getCurrentPosition((position) => {
		const lat = position.coords.latitude;
		const lon = position.coords.longitude;

		fetch(
			`http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`
		)
			.then((response) => response.json())
			.then((data) => {
				document.querySelector(".location").textContent = data.name;
				document.querySelector(".temperature").textContent = `${Math.round(
					data.main.temp_min
				)}°/${Math.round(data.main.temp_max)}°`;
				document.querySelector(
					".img-weather"
				).src = `src/weather/${data.weather[0].icon}.svg`;
			})
			.catch((error) => console.error("Error:", error));
	});
} else {
	console.log("fail");
}
