function updateRangeOutput(range) {
	let parent = range.closest('.js-range'),
			nbRanges = parent.querySelectorAll('[type="range"]').length,
			value = range.value,
			inputMin = null,
			inputMax = null;

	if(parent.querySelectorAll('[type="range"]').length === 2) {
		inputMin = parent.querySelector('[type="range"]:first-of-type');
		inputMax = parent.querySelector('[type="range"]:last-of-type');
	}

	if(range.matches(':first-of-type')) {
		if(inputMax && value >= inputMax.value) {
			inputMax.value = value;
			parent.style.setProperty('--b', value);
		}
		parent.style.setProperty('--a', value);
	} else {
		if(value <= inputMin.value) {
			inputMin.value = value;
			parent.style.setProperty('--a', value);
		}
		parent.style.setProperty('--b', value);
	}
}

document.querySelectorAll('.js-range [type="range"]').forEach((range) => {
	range.addEventListener('input', () => {
		updateRangeOutput(range);
	});
});