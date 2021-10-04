window.addEventListener("DOMContentLoaded", (e) => {
	var countriesList = document.querySelector(".countries-list");
	//async fetch
	const getData = async () => {
		let url = "https://restcountries.com/v2/all";
		let url1 = "data/data.json";
		const resp = await fetch(url);

		if (resp.status !== 200) {
			throw new Error("cannot fetch data");
		}

		const data = await resp.json();
		return data;
	};

	getData()
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
					.setAttribute("src", `${data[i].flag}`);
				countryDetail.querySelector("h2").innerText = data[i].name;
				countryDetail.querySelector(".population span").innerText +=
					data[i].population;
				countryDetail.querySelector(".region span").innerText += data[i].region;
				countryDetail.querySelector(".capital span").innerText +=
					data[i].capital;
				df.appendChild(countryDetail);
			}
			countriesList.appendChild(df);

			document.querySelectorAll(".flag").forEach((flag) => {
				flag.addEventListener("click", (e) => {
					document.querySelector("main").style.display = "none";

					let specificDetail = document.querySelector(".specific-details");
					specificDetail.style.display = "grid";

					let parentId = e.target.parentNode.id;
					let countryData;

					for (var i = 0; i < data.length; i++) {
						if (data[i].alpha3Code == parentId) {
							countryData = data[i];
						}
					}

					let currencies = [];
					let languages = [];
					let borders = [];
					let borderNames = [];
					for (let i = 0; i < countryData.currencies.length; i++) {
						currencies.push(countryData.currencies[i].name);
					}
					for (let i = 0; i < countryData.languages.length; i++) {
						languages.push(countryData.languages[i].name);
					}
					for (let i = 0; i < countryData.borders.length; i++) {
						borders.push(countryData.borders[i]);
					}
					console.log(borders);

					for (var i = 0; i < borders.length; i++) {
						for (let j = 0; j < data.length; j++) {
							if (data[j].alpha3Code == borders[i]) {
								borderNames.push(
									`<p class="${data[j].alpha3Code}">${data[j].name}</p>`,
								);
							}
						}
					}
					console.log(borderNames);

					let specificCountry = `        <p>Back</p>


                        <img src="${countryData.flag}" alt="">
                
                        <h2 class="country-name">${countryData.name}</h2>
                
                        <p class="native-name">Native Name: <span class="tag">${
													countryData.nativeName
												}</span></p>
                        <p class="population">Population: <span class="tag">${
													countryData.population
												}</span></p>
                        <p class="region">Region: <span class="tag">${
													countryData.region
												}</span></p>
                        <p class="capital">Capital: <span class="tag">${
													countryData.capital
												}</span></p>
                
                        <p class="domain">Top Level Domain: <span class="tag">${
													countryData.topLevelDomain
												}</span></p>
                        <p class="currencies">Currencies: <span class="tag">${currencies.join(
													", ",
												)}</span></p>
                        <p class="languages">Languages: <span class="tag">${languages.join(
													", ",
												)}</span></p>
                
                
                        <h3>Border Countries</h3>
                        <div class="bordering-countries">
                            ${borderNames.join(`
                            `)}
                        </div>`;

					specificDetail.innerHTML = specificCountry;

					//
				});

				//
			});

			//

			document.querySelectorAll(".bordering-countries p").forEach((country) => {
				country.addEventListener("click", (e) => {});
			});
		})
		.catch((err) => console.log(err.message));
});
