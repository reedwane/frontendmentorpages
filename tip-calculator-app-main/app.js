window.addEventListener("DOMContentLoaded", (e) => {
	//declaring the variable needed in the app
	//
	var bills = document.querySelector(".bills input");
	var bill = 142.55;
	var tipBox = document.querySelector(".tips");
	var tips = document.querySelectorAll(".tips p");
	var tipPercents = [0.05, 0.1, 0.15, 0.25, 0.5];
	var percent = 0.15;
	var custom = document.querySelector(".custom input");
	var cusPercent = custom.value;
	var defaultPercent = document.querySelector("#default");
	var noOfPeople = document.querySelector(".people input");
	var people = document.querySelector(".people input").value;
	var peopleError = document.querySelector(".people-error");
	var errorColor = "red";
	var bdrColor = "var(--Strong-cyan)";
	peopleError.style.display = "none";
	var reset = document.querySelector("#reset");
	var tipAmount; //per person
	var totalAmount; //per person

	//
	//the function for calculating the tip each person is giving from the total bill
	const calcTipAmount = (bill, percent, people) => {
		return (bill / people) * percent;
	};
	//
	//the function for calculating the total amount each person will pay
	const calcTotalAmount = (bill, tipAmount, people) => {
		return bill / people + tipAmount;
	};

	//
	//the function for recalculating the amounts when new inputs are made
	const update = (people, tipAmount, totalAmount, bill, percent) => {
		tipAmount = calcTipAmount(bill, percent, people);
		totalAmount = calcTotalAmount(bill, tipAmount, people);

		document.querySelector("#tip-amount").innerText = `$${tipAmount.toFixed(
			2,
		)}`;
		document.querySelector("#total-amount").innerText = `$${totalAmount.toFixed(
			2,
		)}`;

		reset.style.opacity = 2;
	};

	//
	//reacting to change in the total bill input

	bills.addEventListener("input", (e) => {
		people = 1;
		noOfPeople.value = 1;
		bill = e.target.value;
		update(people, tipAmount, totalAmount, bill, percent);
	});

	//
	//reacting to change in the percentage of tip selected

	tipBox.addEventListener("click", (e) => {
		defaultPercent.removeAttribute("id");
		let option = e.target;

		tips.forEach((perc) => {
			perc.removeAttribute("id");
			var tip = Array.prototype.indexOf.call(tips, perc);
			if (perc == option) {
				if (tip < 5) {
					custom.value = "";
					percent = tipPercents[tip];
					option.setAttribute("id", "default");
				}
				console.log(tip);
			}
		});

		update(people, tipAmount, totalAmount, bill, percent);
	});

	//
	//reacting to selection of a custom percentage for the tip

	custom.addEventListener("input", (e) => {
		cusPercent = e.target.value / 100;
		percent = cusPercent;
		update(people, tipAmount, totalAmount, bill, percent);
	});

	//
	//changing the amounts for each people based on the total number of people paying the bill

	noOfPeople.addEventListener("input", (e) => {
		people = e.target.value;
		if (people == 0) {
			peopleError.style.display = "inline-block";
			e.target.style.borderColor = errorColor;
		} else {
			peopleError.style.display = "none";
			e.target.style.borderColor = bdrColor;
			update(people, tipAmount, totalAmount, bill, cusPercent);
		}
	});

	//
	// clearing all input and reseting the values with the reset button

	reset.addEventListener("click", (e) => {
		e.preventDefault();
		e.target.style.opacity = 0.3;
		noOfPeople.value = 0;
		custom.value = "";
		bills.value = 0;
		bill = 0;
		percent = 0;
		defaultPercent.removeAttribute("id");
		document.querySelector("#tip-amount").innerText = `$0.00`;
		document.querySelector("#total-amount").innerText = `$0.00`;
	});

	//
	//the default result from the default values set

	update(people, tipAmount, totalAmount, bill, percent);
});
