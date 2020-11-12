displayConfig = ({ root, searchApi, renderOption, onOptionSelect }) => {
	const input = document.querySelector('input');

	const onFormSubmit = async (e) => {
		try {
			e.preventDefault();
			root.innerHTML = null;

			let formVal = form.elements.search.value;
			if (!input.value.length) {
				return;
			}
			const items = await searchApi(formVal);
			
			const filteredItems = items.filter((img) => img.show.image !== null);
			for (let item of filteredItems) {
				const option = document.createElement('section');
				option.classList.add('movie__show__card', 'grow');
				option.innerHTML = renderOption(item);
				option.addEventListener('click', (e) => {
					input.value = '';
					onOptionSelect(item);
				});
				root.append(option);
			}
		} catch (error) {
			console.log(error);
		}
	};

	form.addEventListener('submit', onFormSubmit);
};
