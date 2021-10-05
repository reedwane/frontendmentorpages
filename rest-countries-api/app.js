window.addEventListener("DOMContentLoaded", (e) => {
	var countriesList = document.querySelector(".countries-list");
	let root = document.documentElement;

	document.querySelector(".theme-toggle").addEventListener("click", (e) => {
		let body = document.querySelector("body");
		let presentTheme =
			getComputedStyle(body).getPropertyValue("--Mode-Background");

		if (presentTheme == "hsl(207, 26%, 17%)") {
			root.style.setProperty("--Mode-Elements", "hsl(0, 0%, 100%)");
			root.style.setProperty("--Mode-Text", "hsl(200, 15%, 8%)");
			root.style.setProperty("--Mode-Background", "hsl(0, 0%, 98%)");
		} else {
			root.style.setProperty("--Mode-Elements", "hsl(209, 23%, 22%)");
			root.style.setProperty("--Mode-Text", "hsl(0, 0%, 100%)");
			root.style.setProperty("--Mode-Background", "hsl(207, 26%, 17%)");
		}
	});

	//async fetch
	let url = "https://restcountries.com/v2/all";
	const getData = async (url) => {
		const resp = await fetch(url);

		if (resp.status !== 200) {
			throw new Error("cannot fetch data");
		}

		const data = await resp.json();
		return data;
	};

	getData(url)
		.then((data) => {
			// let restData = data;
			console.log(data);

			let df = document.createDocumentFragment();

			for (let i = 0; i < data.length; i++) {
				let countryDetail = document
					.querySelector(".country-detail")
					.cloneNode(true);
				countryDetail.id = `${data[i].alpha3Code}`;
				countryDetail
					.querySelector("img")
					.setAttribute("src", `${data[i].flags.png}`);
				countryDetail.querySelector("h2").innerText = data[i].name;
				countryDetail.querySelector(".population span").innerText +=
					data[i].population;
				countryDetail.querySelector(".region span").innerText += data[i].region;
				countryDetail.querySelector(".capital span").innerText +=
					data[i].capital;
				df.appendChild(countryDetail);
			}
			countriesList.appendChild(df);
			let specificDetail = document.querySelector(".specific-details");

			const getDetails = (parentId, data) => {
				let countryData;
				let currencies = [];
				let languages = [];
				let borders = [];
				let borderNames = [];

				for (let i = 0; i < data.length; i++) {
					if (data[i].alpha3Code == parentId) {
						countryData = data[i];
					}
				}

				for (let i = 0; i < countryData.currencies.length; i++) {
					currencies.push(countryData.currencies[i].name);
				}
				for (let i = 0; i < countryData.languages.length; i++) {
					languages.push(countryData.languages[i].name);
				}
				if (countryData.borders) {
					for (let i = 0; i < countryData.borders.length; i++) {
						borders.push(countryData.borders[i]);
					}
				}

				console.log(borders);

				for (let i = 0; i < borders.length; i++) {
					for (let j = 0; j < data.length; j++) {
						if (data[j].alpha3Code == borders[i]) {
							borderNames.push(
								`<p class="border ${data[j].alpha3Code}">${data[j].name}</p>`,
							);
						}
					}
				}
				console.log(borderNames);

				let specificCountry = `        <p class="home">&#8592; Back</p>

					<div class="all">
					<img src="${countryData.flag}" alt="">
			
					<div class="one">
					<h2 class="country-name">${countryData.name}</h2>

					<p class="native-name">Native Name: <span class="tag">${
						countryData.nativeName
					}</span></p>
					<p class="population">Population: <span class="tag">${
						countryData.population
					}</span></p>
					<p class="region">Region: <span class="tag">${countryData.region}</span></p>
					<p class="capital">Capital: <span class="tag">${countryData.capital}</span></p>
					</div>

					<div class="two">
					<p class="domain">Top Level Domain: <span class="tag">${
						countryData.topLevelDomain
					}</span></p>
					<p class="currencies">Currencies: <span class="tag">${currencies.join(
						", ",
					)}</span></p>
					<p class="languages">Languages: <span class="tag">${languages.join(
						", ",
					)}</span></p>
					</div>
			
			
					
					<div class="bordering-countries">
					<h4>Border Countries:</h4>
						${borderNames.join(`
						`)}
					</div>
					
					</div>`;

				return specificCountry;
			};

			document.querySelectorAll(".flag").forEach((flag) => {
				flag.addEventListener("click", (e) => {
					document.querySelector("main").style.display = "none";

					specificDetail.style.display = "block";

					let parentId = e.target.parentNode.id;

					specificDetail.innerHTML = getDetails(parentId, data);

					//
				});

				//
			});

			specificDetail.addEventListener("click", (e) => {
				if (e.target.classList.contains("border")) {
					let parentId = e.target.classList[1];

					specificDetail.innerHTML = getDetails(parentId, data);
				}
			});

			specificDetail.addEventListener("click", (e) => {
				if (e.target.classList.contains("home")) {
					document.querySelector("main").style.display = "block";

					specificDetail.style.display = "none";
				}
			});

			document.querySelector("#search").addEventListener("input", (e) => {
				let searchTerm = e.target.value.toLowerCase();
				let countriesList = document.querySelectorAll(".country-detail");

				//restcountries.com/v2/name/{name}

				https: countriesList.forEach((country) => {
					let name = country
						.querySelector(".country-name")
						.innerText.toLowerCase();
					if (name.indexOf(searchTerm) == -1) {
						country.style.display = "none";
					} else if (searchTerm == "") {
						country.style.display = "inline-block";
					} else {
						country.style.display = "inline-block";
					}
					document.querySelector("#sample").style.display = "none";
				});
			});

			document.querySelector("#filter").addEventListener("change", (e) => {
				let filter = e.target.value.toLowerCase();
				let countriesList = document.querySelectorAll(".country-detail");

				countriesList.forEach((country) => {
					country.style.display = "none";
					let region = country
						.querySelector(".region span")
						.innerText.toLowerCase();

					if (region == filter) {
						country.style.display = "block";
						console.log("same");
					}
				});
			});

			document
				.querySelector(".theme-toggle")
				.addEventListener("click", (e) => {});

			//
		})
		.catch((err) => console.log(err.message));
});
