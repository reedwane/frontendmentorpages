window.addEventListener("DOMContentLoaded", (e) => {
	//variables
	var infoBox = document.querySelector(".info");
	var timeTabs = document.querySelector(".timetabs");
	var dimColor = "hsl(0, 0%, 56%)";
	var brightColor = "hsl(0, 0%, 100%)";
	// var durations = ["daily", "weekly", "monthly"];
	var currentDuration = ["weekly", "Last Week"];

	//async fetch
	const getData = async () => {
		let url = "https://jsonkeeper.com/b/W9BF";
		let url1 = "data/data.json";
		const resp = await fetch(url1);

		if (resp.status !== 200) {
			throw new Error("cannot fetch data");
		}

		const data = await resp.json();
		return data;
	};

	//Default view
	getData()
		.then((data) => {
			let jsonData = data;

			//Displaying the json data
			const displayResults = (dataArray) => {
				var df = document.createDocumentFragment();

				//creating the div for each task box based on the number of tasks present in the data
				for (let i = 0; i < dataArray.length; i++) {
					let taskBox = document.createElement("div");

					taskBox.innerHTML = `<div class="tasks" id=${dataArray[i].title}>
          
            <div class="task">
              
              <h2 class="title">Task</h2>
            
              <p class="ellipsis"></p>
              
              <p class="current-duration"></p>
              
              <p class="past">
                <span class="timeframe"></span> - <span class="past-duration"></span>
              </p>
            
            </div>
            
          </div>`;
					//taskBox.id = `${dataArray[i].title}`;

					//appending the boxes into the document fragment
					df.appendChild(taskBox);
				}
				return df;
			};

			//time formatter
			//formatting info in the taskboxes based on the current duration selected
			const passTime = (dataArray, currentDuration, taskBoxes) => {
				taskBoxes.forEach((box) => {
					//to create a transition effect class
					box.querySelectorAll("p").forEach((p) => {
						p.classList.add("pre-animation");
					});

					//setting this timeout to effect the transition effect after 1secs
					setTimeout(() => {
						var boxIndex = Array.prototype.indexOf.call(taskBoxes, box);
						// console.log(boxIndex);

						box.querySelector(".title").textContent = dataArray[boxIndex].title;
						//console.log(boxIndex);

						box.querySelector(".current-duration").textContent = `${
							dataArray[boxIndex]["timeframes"][currentDuration[0]]["current"]
						}hrs`;

						box.querySelector(".timeframe").textContent = currentDuration[1];

						box.querySelector(".past-duration").textContent = `${
							dataArray[boxIndex]["timeframes"][currentDuration[0]]["previous"]
						}hrs`;

						//the opacity set for transition effected here
						box.querySelectorAll("p").forEach((p) => {
							p.classList.remove("pre-animation");
						});
					}, 500);
				});
			};

			//the  displayResults function returns the number of div boxes for to the infobox node
			infoBox.appendChild(displayResults(jsonData));
			var taskBoxes = document.querySelectorAll(".tasks");
			//passTime is then used to render the information based on the current time selected
			passTime(jsonData, currentDuration, taskBoxes);
			displayResults(jsonData);

			//reacting to tab switches
			timeTabs.addEventListener("click", (e) => {
				timeTabs.querySelectorAll("p").forEach((tab) => {
					tab.style.color = dimColor;
					if (e.target == tab) {
						tab.style.color = brightColor;
					}
				});
				if (e.target.className == "monthly") {
					currentDuration = ["monthly", "Last Month"];
					getData();
				} else if (e.target.className == "daily") {
					currentDuration = ["daily", "Yesterday"];
					getData();
				} else {
					currentDuration = ["weekly", "Last Week"];
					getData();
				}
				//

				//getting the data and rendering the default view
				getData()
					.then((data) => {
						let jsonData = data;
						passTime(jsonData, currentDuration, taskBoxes);
						//console.log(taskBoxes.length);
					})
					.catch((err) => console.log(err.message));
			});
			//
			//
		})
		.catch((err) => console.log(err.message));

	//
	//

	// creating the color change for hover on the timetabs
	timeTabs.querySelectorAll("p").forEach((tab) => {
		tab.addEventListener("mouseover", (e) => {
			e.target.style.color = brightColor;
		});
		tab.addEventListener("mouseleave", (e) => {
			e.target.style.color = dimColor;
			document.getElementById(`${currentDuration[0]}`).style.color =
				brightColor;
		});
	});
	//
	//
});

//FAILED JSON FETCH
//   const request = async () => {
//     const resp = await fetch('data/data.json');
//     jsondata = await resp.json();
//   }

//   request().then(resp => console.log(resp));

// console.log(jsondata);
