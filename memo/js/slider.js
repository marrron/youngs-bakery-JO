var slideIndex = 0;
var slides = document.querySelectorAll(".slides li");
var prevButton = document.querySelector(".prev");
var nextButton = document.querySelector(".next");

function showSlide(n) {
	for (var i = 0; i < slides.length; i++) {
		slides[i].style.display = "none";
	}
	slides[n].style.display = "block";
}

prevButton.addEventListener("click", function () {
	slideIndex--;
	if (slideIndex < 0) {
		slideIndex = slides.length - 1;
	}
	showSlide(slideIndex);
});

nextButton.addEventListener("click", function () {
	slideIndex++;
	if (slideIndex >= slides.length) {
		slideIndex = 0;
	}
	showSlide(slideIndex);
});

showSlide(slideIndex);
