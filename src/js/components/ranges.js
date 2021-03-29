function updateRangeOutput(range) {
	let container = range.closest('.js-range'),
			nbRanges = container.querySelectorAll('[type="range"]').length,
			value = parseFloat(range.value),
			inputMin = null,
			inputMax = null,
			outputMin = container.querySelector('.range__output'),
			outputMax = null;

	if(container.querySelectorAll('[type="range"]').length === 2) {
		inputMin = container.querySelector('[type="range"]:first-of-type');
		inputMax = container.querySelector('[type="range"]:last-of-type');
		outputMin = container.querySelector('.range__output:first-of-type');
		outputMax = container.querySelector('.range__output:last-of-type');
	}

	if(range.matches(':first-of-type')) {
		if(inputMax && value >= parseFloat(inputMax.value)) {
			inputMax.value = value;
			outputMax.setAttribute('data-value', value);
			container.style.setProperty('--b', value);
		}
		outputMin.setAttribute('data-value', value);
		container.style.setProperty('--a', value);
	} else {
		if(value <= parseFloat(inputMin.value)) {
			inputMin.value = value;
			outputMin.setAttribute('data-value', value);
			container.style.setProperty('--a', value);
		}
		outputMax.setAttribute('data-value', value);
		container.style.setProperty('--b', value);
	}
}

document.querySelectorAll('.js-range [type="range"]').forEach((range) => {
	range.addEventListener('input', () => {
		updateRangeOutput(range);
	});
});