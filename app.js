const form = document.querySelector('form');
const input = document.querySelector('input');
const showResults = document.querySelector('.results');
const showSummary = document.querySelector('.summary');

const tvShows = {
	renderOption(tvshow) {
		const imgSrc = tvshow.show.image.original;
		return `
			<figure>
				<img src="${imgSrc}" />
			</figure>
			<h1 class='title'>${tvshow.show.name}</h1>
		`;
	},

	async searchApi(searchTerm) {
		try {
			const config = { params: { q: searchTerm } };
			const results = await axios.get(`https://api.tvmaze.com/search/shows`, config);
			input.value = '';

			return results.data;
		} catch (error) {
			console.log(error);
		}
	},

	async onOptionSelect(tvshow) {
		showSummary.innerHTML = await onMovieSelect(tvshow);
	}
};

displayConfig({
	...tvShows,
	root: showResults
});

const onMovieSelect = async ({ show }) => {
	showResults.innerHTML = null;
	const imgSrc = show.image.original;
	const stars = document.createElement('div');
	const starsInner = document.createElement('div');
	const starsOuter = document.createElement('div');
	const rating = document.createElement('p');
	rating.classList.add('inline__p');
	if (show.rating.average) {
		starsInner.classList.add('stars__inner');
		starsOuter.classList.add('stars__outer');
		starsOuter.append(starsInner);
		const starPercentage = show.rating.average / 10 * 100;
		const starPercentageRounded = `${Math.round(starPercentage / 10) * 10}%`;
		starsInner.style.width = starPercentageRounded;
		rating.innerHTML = `<strong>RATING</strong> - `;
		stars.append(rating);
		stars.append(starsOuter);
	} else {
		stars.innerHTML = '';
	}

	return `
		<section class="show__result__card">
			<figure>
				<img src="${imgSrc}" />
			</figure>
			<h1 class="title">${show.name}</h1>
			<article class="plot">${show.summary}</article>
			
			<div class="about__movie">
				<p><strong>LANGUAGE</strong> - ${show.language}</p>
				<p><strong>GENRES</strong> - ${show.genres}</p>
				<p><strong>LANGUAGE</strong> - ${show.language}</p>
				<p><strong>PREMIERED</strong> - ${show.premiered}</p>
				<p><strong>STATUS</strong> - ${show.status}</p>
				${stars.innerHTML}
			</div>
		</section>
	`;
};
