function updateRange(range) {
	let container = range.closest('.js-range'),
			nbRanges = container.querySelectorAll('[type="range"]').length,
			value = parseFloat(range.value),
			inputMin = container.querySelector('[type="range"]:first-of-type'),
			inputMax = null,
			outputMin = container.querySelector('.range__output'),
			outputMax = null;

	if(container.querySelectorAll('[type="range"]').length === 2) {
		inputMax = container.querySelector('[type="range"]:last-of-type');
		outputMin = container.querySelector('.range__output:first-of-type');
		outputMax = container.querySelector('.range__output:last-of-type');
	}

	if(range.matches(':first-of-type')) {
		if(inputMax && value >= parseFloat(inputMax.value)) {
			inputMax.value = value;
			updateThumbText(container, inputMax, outputMax, value);
		}
		updateThumbText(container, inputMin, outputMin, value);
	} else {
		if(value <= parseFloat(inputMin.value)) {
			inputMin.value = value;
			updateThumbText(container, inputMin, outputMin, value);
		}
		updateThumbText(container, inputMax, outputMax, value);
	}
}

function updateThumbText(container, input, output, value) {
	output.setAttribute('data-value', value);
	if(input.matches(':first-of-type')) {
		container.style.setProperty('--a', value);
	} else {
		container.style.setProperty('--b', value);
	}
	if(input.getAttribute('data-unit')) {
		input.setAttribute('aria-valuetext', input.value+""+input.getAttribute('data-unit'));
	}
}

document.querySelectorAll('.js-range [type="range"]').forEach((range) => {
	range.addEventListener('input', () => {
		updateRange(range);
	});
});