const bars = document.querySelector("#menu-icon");
const nav = document.querySelector("nav");

const accordion = document.querySelectorAll(".accordion");

for (acc of accordion) {
	let panel = acc.nextElementSibling;
	acc.addEventListener("click", function () {
		this.classList.toggle("accordion-open");
		panel.classList.toggle("show-accordion");
		nav.style.maxHeight = "fit-content";
	});
	// acc.addEventListener("focusout", function () {
	// 	this.classList.toggle("accordion-open");
	// 	panel.classList.toggle("show-accordion");
	// });
}

bars.addEventListener("click", function () {
	let icon = bars.getAttribute("src");
	if (icon == "images/icon-hamburger.svg") {
		bars.setAttribute("src", "images/icon-close.svg");
	} else {
		bars.setAttribute("src", "images/icon-hamburger.svg");
	}
	nav.classList.toggle("nav-open");

	if (nav.style.maxHeight) {
		nav.style.maxHeight = null;
	} else {
		nav.style.maxHeight = nav.scrollHeight + "10" + "px";
	}
});

// function getResolution() {
// 	if (window.screen.width > 700) {
// 		document.querySelector("header h1").innerHTML = "BOO!";
// 	}
// }
// const dhead = document.getElementById("header");
// console.log(dhead);
// header.addEventListener("onclick", getResolution());
