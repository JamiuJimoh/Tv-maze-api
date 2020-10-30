const form = document.querySelector('form');
const input = document.querySelector('input');
const showResults = document.querySelector('.results');

const tvShows = {
	async searchApi(searchTerm) {
		try {
			const config = { params: { q: searchTerm } };
			const results = await axios.get(`http://api.tvmaze.com/search/shows`, config);
			return results.data;
		} catch (error) {
			console.log(error);
		}
	},

	renderResults(res) {
		for (let data of res) {
			const imgSrc = data.show.image;
			const name = data.show.name;
			if (data.show.image) {
				const section = document.createElement('section');
				const figure = document.createElement('figure');
				const img = document.createElement('img');
				const title = document.createElement('h1');
				section.classList.add('movie__show__card', 'grow');
				showResults.classList.add('results');
				section.classList.remove('show__result__card');
				// console.dir(showResults);
				img.src = imgSrc.original;
				title.textContent = name;
				figure.append(img);
				section.append(figure);
				section.append(title);
				showResults.append(section);

				section.addEventListener('click', () => {
					showResults.innerHTML = null;
					const div = document.createElement('div');
					const starsInner = document.createElement('div');
					const starsOuter = document.createElement('div');
					const br = document.createElement('br');
					const language = document.createElement('p');
					const plot = document.createElement('p');
					const genres = document.createElement('p');
					const premiered = document.createElement('p');
					const status = document.createElement('p');
					const rating = document.createElement('p');
					rating.classList.add('inline__p');
					title.classList.add('title');
					plot.classList.add('plot');
					// const bold = document.createElement('strong');
					div.classList.add('about__movie');
					showResults.classList.remove('results');
					section.classList.remove('movie__show__card', 'grow');
					section.classList.add('show__result__card');
					// bold.append(`Language - `);
					// div.append(bold);
					plot.innerHTML = `${data.show.summary}`;
					section.append(plot);
					div.append(br);
					language.innerHTML = `<strong>LANGUAGE</strong> - ${data.show.language}`;
					div.append(language);
					div.append(br);
					genres.innerHTML = `<strong>GENRES</strong> - ${data.show.genres}`;
					div.append(genres);
					div.append(br);
					premiered.innerHTML = `<strong>PREMIERED</strong> - ${data.show.premiered}`;
					div.append(premiered);
					div.append(br);
					status.innerHTML = `<strong>STATUS</strong> - ${data.show.status}`;
					div.append(status);
					div.append(br);
					if (data.show.rating.average) {
						starsInner.classList.add('stars__inner');
						starsOuter.classList.add('stars__outer');
						starsOuter.append(starsInner);
						const starPercentage = data.show.rating.average / 10 * 100;
						const starPercentageRounded = `${Math.round(starPercentage / 10) * 10}%`;
						starsInner.style.width = starPercentageRounded;
						rating.innerHTML = `<strong>RATING</strong> - `;
						div.append(rating);
						div.append(starsOuter);
						div.append(br);
					}
					div.append(br);
					showResults.append(section);
					section.append(div);
				});
			}
		}
	}
};

form.addEventListener('submit', async (e) => {
	try {
		e.preventDefault();
		showResults.innerHTML = null;

		let formVal = form.elements.search.value;
		// if (input.innerText) {
			const results = await tvShows.searchApi(formVal);
			tvShows.renderResults(results);
		// }
		input.value = '';
	} catch (error) {
		console.log(error);
	}
});

console.dir(input);
