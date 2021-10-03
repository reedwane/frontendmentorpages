window.addEventListener("DOMContentLoaded", (e) => {
	var numberInput = document.querySelector("#number-input");
	let root = document.documentElement;
	// COLORS
	var themeOne = document.getElementById("one");
	var themeTwo = document.getElementById("two");
	var themeThree = document.getElementById("three");

	themeOne.addEventListener("click", (e) => {
		root.style.setProperty("--main-background", "hsl(222, 26%, 31%)");
		root.style.setProperty("--toggle-keypad-background", "hsl(223, 31%, 20%)");
		root.style.setProperty("--screen-background", "hsl(224, 36%, 15%)");
		root.style.setProperty("--key-background-1", "hsl(225, 21%, 49%)");
		root.style.setProperty("--key-shadow-1", "hsl(224, 28%, 35%)");
		root.style.setProperty("--key-background-toggle", "hsl(6, 63%, 50%)");
		root.style.setProperty("--key-shadow-2", "hsl(6, 70%, 34%)");
		root.style.setProperty("--key-background-2", "hsl(30, 25%, 89%)");
		root.style.setProperty("--key-shadow-3", "hsl(28, 16%, 65%)");
		root.style.setProperty("--text-color-1", "#FFFFFF");
		root.style.setProperty("--key-color", "hsl(221, 14%, 31%)");
		root.style.setProperty("--text-color-2", "white");
		root.style.setProperty("--text-white", "hsl(0, 0, 100%)");
	});

	themeTwo.addEventListener("click", (e) => {
		root.style.setProperty("--main-background", "hsl(0, 0%, 90%)");
		root.style.setProperty("--toggle-keypad-background", "hsl(0, 5%, 81%)");
		root.style.setProperty("--screen-background", "hsl(0, 0%, 93%)");
		root.style.setProperty("--key-background-1", "hsl(185, 42%, 37%)");
		root.style.setProperty("--key-shadow-1", "hsl(185, 58%, 25%)");
		root.style.setProperty("--key-background-toggle", "hsl(25, 98%, 40%)");
		root.style.setProperty("--key-shadow-2", "hsl(25, 99%, 27%)");
		root.style.setProperty("--key-background-2", "hsl(45, 7%, 89%)");
		root.style.setProperty("--key-shadow-3", "hsl(35, 11%, 61%)");
		root.style.setProperty("--text-color-1", "hsl(60, 10%, 19%)");
		root.style.setProperty("--text-color-2", "white");
		root.style.setProperty("--text-white", "hsl(0, 0, 100%)");
		root.style.setProperty("--key-color", "hsl(60, 10%, 19%)");
	});

	themeThree.addEventListener("click", (e) => {
		root.style.setProperty("--main-background", "hsl(268, 75%, 9%)");
		root.style.setProperty("--toggle-keypad-background", "hsl(268, 71%, 12%)");
		root.style.setProperty("--screen-background", "hsl(268, 71%, 12%)");
		root.style.setProperty("--key-background-1", "hsl(281, 89%, 26%)");
		root.style.setProperty("--key-shadow-1", "hsl(285, 91%, 52%)");
		root.style.setProperty("--key-background-toggle", "hsl(176, 100%, 44%)");
		root.style.setProperty("--key-shadow-2", "hsl(177, 92%, 70%)");
		root.style.setProperty("--key-background-2", "hsl(268, 47%, 21%)");
		root.style.setProperty("--key-shadow-3", "hsl(290, 70%, 36%)");
		root.style.setProperty("--text-color-1", "hsl(52, 100%, 62%)");
		root.style.setProperty("--text-color-2", "hsl(198, 20%, 13%)");
		root.style.setProperty("--text-white", "hsl(0, 0, 100%)");
		root.style.setProperty("--key-color", "hsl(52, 100%, 62%)");
	});

	// event listener for the figures
	document.querySelectorAll(".figure").forEach((figure) => {
		figure.addEventListener("click", (e) => {
			e.preventDefault();
			numberInput.innerText += e.target.value;
		});
	});

	// event listener for the calculation operators
	document.querySelectorAll(".operator").forEach((operand) => {
		operand.addEventListener("click", (e) => {
			e.preventDefault();
			//
			//
			numberInput.innerText += e.target.value;
			//

			//
		});
	});

	// event listener for the reset button
	document.querySelector(".reset").addEventListener("click", (e) => {
		e.preventDefault();
		numberInput.innerText = "";
	});

	// event listener for the equal sign
	document.querySelector(".sum").addEventListener("click", (e) => {
		e.preventDefault();
		numberInput.innerText = eval(numberInput.innerText);
	});
	// numberInput.innerText = "";

	// event listener for the delete button
	document.querySelector(".del").addEventListener("click", (e) => {
		e.preventDefault();

		numberInput.innerText = numberInput.innerText.slice(0, -1); // trims the last figure away
	});

	//
	//
});
