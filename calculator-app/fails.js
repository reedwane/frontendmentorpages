window.addEventListener("DOMContentLoaded", (e) => {
	var savedInput = document.querySelector("#saved-input");
	var presentInput = document.querySelector("#present-input");
	var numberInput;
	var numberSpan = `<span id="number-input"></span>`;
	var presentFigure = 0;
	var savedFigure = 0;
	var resultText;
	var lastCharOfResult;
	var operatorArray = ["x", "/", "+", "-"];
	var result = 0;
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
		root.style.setProperty("--text-color-1", "hsl(0, 0, 100%)");
		root.style.setProperty("--text-color-2", "hsl(221, 14%, 31%)");
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
		root.style.setProperty("--text-color-2", "hsl(60, 10%, 19%)");
		root.style.setProperty("--text-white", "hsl(0, 0, 100%)");
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
	});

	const add = (result, savedFigure) => {
		return savedFigure + result;
	};

	const subtract = (result, savedFigure) => {
		return result - savedFigure;
	};

	const multiply = (result, savedFigure) => {
		result == 0 ? (result = 1 * savedFigure) : (result = result * savedFigure);
		return result;
	};

	const divide = (result, savedFigure) => {
		result == 0 ? (result = savedFigure / 1) : (result = result / savedFigure);
		return result;
	};

	// event listener for the figures
	document.querySelectorAll(".figure").forEach((figure) => {
		figure.addEventListener("click", (e) => {
			e.preventDefault();
			numberInput = document.querySelector("#number-input");
			numberInput.innerText += e.target.value;
			presentFigure = parseFloat(numberInput.innerText);
			savedFigure = presentFigure;
		});
	});

	// event listener for the calculation operators
	document.querySelectorAll(".operator").forEach((operand) => {
		operand.addEventListener("click", (e) => {
			const getResult = (resultText, result, savedFigure, presentFigure) => {
				if (e.target.classList.contains("plus")) {
					//for addition

					if (
						//if subtraction is pending
						resultText.lastIndexOf("-") == resultText.length - 1 &&
						resultText.length != 0
					) {
						//
						result = subtract(result, savedFigure);
						//
					} else if (
						//if multiplication is pending
						resultText.lastIndexOf("x") == resultText.length - 1 &&
						resultText.length != 0
					) {
						//
						result = multiply(result, savedFigure);
						//
					} else if (
						//if division is pending
						resultText.lastIndexOf("/") == resultText.length - 1 &&
						resultText.length != 0
					) {
						//
						result = divide(result, savedFigure);
						//
					} else {
						//if no calculation is pending
						result = result + presentFigure;
					}
				} else if (e.target.classList.contains("minus")) {
					//for subtraction

					if (
						//addition is pending
						resultText.lastIndexOf("+") == resultText.length - 1 &&
						resultText.length != 0
					) {
						//
						result = add(result, savedFigure);
						//
					} else if (
						//if multiplication is pending
						resultText.lastIndexOf("x") == resultText.length - 1 &&
						resultText.length != 0
					) {
						//
						result = multiply(result, savedFigure);
						//
					} else if (
						//if division is pending
						resultText.lastIndexOf("/") == resultText.length - 1 &&
						resultText.length != 0
					) {
						//
						result = divide(result, savedFigure);
						//
					} else {
						// if no calculation is pending
						result == 0
							? (result = presentFigure - result)
							: (result = result - presentFigure);
					}
				} else if (e.target.classList.contains("multiply")) {
					// for multiplication

					if (
						// if addition is pending
						resultText.lastIndexOf("+") == resultText.length - 1 &&
						resultText.length != 0
					) {
						//
						result = add(result, savedFigure);
						//
					} else if (
						// if subtraction is pending
						resultText.lastIndexOf("-") == resultText.length - 1 &&
						resultText.length != 0
					) {
						//
						result = subtract(result, savedFigure);
						//
					} else if (
						//if division is pending
						resultText.lastIndexOf("/") == resultText.length - 1 &&
						resultText.length != 0
					) {
						//
						result = divide(result, savedFigure);
						//
					} else {
						// if no calculation is pending
						result == 0
							? (result = 1 * savedFigure)
							: (result = result * savedFigure);
					}
				} else {
					// for division

					if (
						// if addition is pending
						resultText.lastIndexOf("+") == resultText.length - 1 &&
						resultText.length != 0
					) {
						//
						result = add(result, savedFigure);
						//
					} else if (
						// if subtraction is pending
						resultText.lastIndexOf("-") == resultText.length - 1 &&
						resultText.length != 0
					) {
						//
						result = subtract(result, savedFigure);
						//
					} else if (
						// if multiplication is pending
						resultText.lastIndexOf("x") == resultText.length - 1 &&
						resultText.length != 0
					) {
						//
						result = multiply(result, savedFigure);
						//
					} else {
						// if no calculation is pending
						result == 0
							? (result = savedFigure / 1)
							: (result = result / savedFigure);
					}
				}

				return result;
			};
			e.preventDefault();
			//
			//
			resultText = savedInput.innerText;
			lastCharOfResult = resultText[resultText.length - 1];
			if (
				savedInput.innerText != "" &&
				operatorArray.includes(lastCharOfResult) &&
				(e.target.value == "+" || e.target.value == "-") &&
				numberInput.innerText == ""
			) {
				// if an operator is pressed immediately after another operator
				// if it is plus or minus, add it to the upcoming number
				console.log("still intact");

				numberInput = document.querySelector("#number-input");
				numberInput.innerText += e.target.value;
				//
				// if it is multiplication or division, change the last char of the result text
			} else if (
				savedInput.innerText != "" &&
				operatorArray.includes(lastCharOfResult) &&
				(e.target.value == "+" || e.target.value == "-") &&
				numberInput.innerText == ""
			) {
				// if an operator is pressed to change the incoming value to positive or negative
				// if an operator is pressed immediately after another operator
				// if it is plus or minus, add it to the upcoming number
				console.log("still intact");

				numberInput = document.querySelector("#number-input");
				numberInput.innerText = e.target.value;
				//
				// if it is multiplication or division, change the last char of the result text
			} else if (
				savedInput.innerText != "" &&
				(e.target.value == "/" || e.target.value == "*") &&
				numberInput.innerText == ""
			) {
				// if an operator is pressed immediately after another operator
				// if it is the multiplication or division sign,
				// change the pending calculation

				savedInput = document.querySelector("#saved-input");
				resultText = savedInput.innerText;

				savedInput.innerText = `${result} ${e.target.innerText}`;
				//
				// if it is multiplication or division, change the last char of the result text
			} else {
				console.log("reaching calc");
				numberInput.innerText = "";
				presentInput.removeChild(presentInput.childNodes[0]);
				presentInput.innerHTML = numberSpan;
				resultText = savedInput.innerText;
				lastCharOfResult = resultText[resultText.length - 1];

				// do the math
				result = getResult(resultText, result, savedFigure, presentFigure);
				savedInput.innerText = `${result.toFixed(2)} ${e.target.innerText}`;
			}
			//

			//
		});
	});

	// event listener for the reset button
	document.querySelector(".reset").addEventListener("click", (e) => {
		e.preventDefault();
		resultText = "";
		result = 0;
		savedFigure = 0;
		presentFigure = 0;
		numberInput.innerText = "";
		savedInput.innerText = "";
	});

	// event listener for the equal sign
	document.querySelector(".sum").addEventListener("click", (e) => {
		e.preventDefault();

		console.log("reaching sum");
		const getResult = (resultText, result, savedFigure, presentFigure) => {
			if (e.target.classList.contains("plus")) {
				//for addition

				if (
					//if subtraction is pending
					resultText.lastIndexOf("-") == resultText.length - 1 &&
					resultText.length != 0
				) {
					//
					result = subtract(result, savedFigure);
					//
				} else if (
					//if multiplication is pending
					resultText.lastIndexOf("x") == resultText.length - 1 &&
					resultText.length != 0
				) {
					//
					result = multiply(result, savedFigure);
					//
				} else if (
					//if division is pending
					resultText.lastIndexOf("/") == resultText.length - 1 &&
					resultText.length != 0
				) {
					//
					result = divide(result, savedFigure);
					//
				} else {
					//if no calculation is pending
					result = result + presentFigure;
				}
			} else if (e.target.classList.contains("minus")) {
				//for subtraction

				if (
					//addition is pending
					resultText.lastIndexOf("+") == resultText.length - 1 &&
					resultText.length != 0
				) {
					//
					result = add(result, savedFigure);
					//
				} else if (
					//if multiplication is pending
					resultText.lastIndexOf("x") == resultText.length - 1 &&
					resultText.length != 0
				) {
					//
					result = multiply(result, savedFigure);
					//
				} else if (
					//if division is pending
					resultText.lastIndexOf("/") == resultText.length - 1 &&
					resultText.length != 0
				) {
					//
					result = divide(result, savedFigure);
					//
				} else {
					// if no calculation is pending
					result == 0
						? (result = presentFigure - result)
						: (result = result - presentFigure);
				}
			} else if (e.target.classList.contains("multiply")) {
				// for multiplication

				if (
					// if addition is pending
					resultText.lastIndexOf("+") == resultText.length - 1 &&
					resultText.length != 0
				) {
					//
					result = add(result, savedFigure);
					//
				} else if (
					// if subtraction is pending
					resultText.lastIndexOf("-") == resultText.length - 1 &&
					resultText.length != 0
				) {
					//
					result = subtract(result, savedFigure);
					//
				} else if (
					//if division is pending
					resultText.lastIndexOf("/") == resultText.length - 1 &&
					resultText.length != 0
				) {
					//
					result = divide(result, savedFigure);
					//
				} else {
					// if no calculation is pending
					result == 0
						? (result = 1 * savedFigure)
						: (result = result * savedFigure);
				}
			} else {
				// for division

				if (
					// if addition is pending
					resultText.lastIndexOf("+") == resultText.length - 1 &&
					resultText.length != 0
				) {
					//
					result = add(result, savedFigure);
					//
				} else if (
					// if subtraction is pending
					resultText.lastIndexOf("-") == resultText.length - 1 &&
					resultText.length != 0
				) {
					//
					result = subtract(result, savedFigure);
					//
				} else if (
					// if multiplication is pending
					resultText.lastIndexOf("x") == resultText.length - 1 &&
					resultText.length != 0
				) {
					//
					result = multiply(result, savedFigure);
					//
				} else {
					// if no calculation is pending
					result == 0
						? (result = savedFigure / 1)
						: (result = result / savedFigure);
				}
			}

			return result;
		};
		// numberInput.innerText = "";

		switch (savedInput.innerText[savedInput.innerText.length - 1]) {
			case "+":
			case "-":
			case "/":
			case "x":
				presentInput.removeChild(presentInput.childNodes[0]);
				presentInput.innerHTML = numberSpan;
				numberInput = document.querySelector("#number-input");
				resultText = savedInput.innerText;
				lastCharOfResult = resultText[resultText.length - 1];

				// do the math
				result = getResult(resultText, result, savedFigure, presentFigure);
				numberInput.innerText = `${result.toFixed(2)}`;
				savedInput.innerText = `${result.toFixed(2)}`;

				// resultText = "";
				presentFigure = result;
				savedFigure = result;
				result = 0;
				break;

			default:
				break;
		}
	});

	// event listener for the delete button
	document.querySelector(".del").addEventListener("click", (e) => {
		e.preventDefault();
		numberInput = document.querySelector("#number-input");
		numberInput.innerText = numberInput.innerText.slice(0, -1); // trims the last figure away
		presentFigure = parseFloat(numberInput.innerText);
		savedFigure = presentFigure;
	});

	//
	//
});
