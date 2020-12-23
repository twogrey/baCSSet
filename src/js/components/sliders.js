/* eslint-env browser */

document.querySelectorAll('.js-slider-products').forEach((product) => {
	tns({
		container: product.querySelector('.p-slider__content'),
		controlsContainer: product.querySelector('.p-slider__controls'),
		navPosition: 'bottom',
		nav: true,
		controls: true,
		loop: false,
		mouseDrag: true,
		lazyload: false,
		arrowKeys: true,
		edgePadding: baseFontSize * getComputedStyle(html).getPropertyValue('--spacing-unitless') * 2,
		gutter: baseFontSize * getComputedStyle(html).getPropertyValue('--spacing-unitless'),
		slideBy: 'page',
		items: 2,
		responsive: {
			576: {
				items: 3,
			},
			768: {
				items: 4,
				edgePadding: baseFontSize * getComputedStyle(html).getPropertyValue('--spacing-unitless') * 4,
				gutter: baseFontSize * getComputedStyle(html).getPropertyValue('--spacing-unitless') * 2,
			},
			1200: {
				items: 5,
				edgePadding: 0,
			},
		},
		onInit() {
			product.style.display = 'block';
		},
	});
});

document.querySelectorAll('.js-slider-inspirations').forEach((inspiration) => {
	tns({
		container: inspiration.querySelector('.p-slider__content'),
		controlsContainer: inspiration.querySelector('.p-slider__controls'),
		navPosition: 'bottom',
		nav: true,
		controls: true,
		loop: false,
		mouseDrag: true,
		lazyload: false,
		arrowKeys: true,
		edgePadding: baseFontSize * getComputedStyle(html).getPropertyValue('--spacing-unitless') * 2,
		gutter: baseFontSize * getComputedStyle(html).getPropertyValue('--spacing-unitless'),
		slideBy: 'page',
		items: 1,
		responsive: {
			576: {
				items: 2,
			},
			768: {
				edgePadding: baseFontSize * getComputedStyle(html).getPropertyValue('--spacing-unitless') * 4,
				gutter: baseFontSize * getComputedStyle(html).getPropertyValue('--spacing-unitless') * 2,
			},
			1200: {
				edgePadding: 0,
			},
		},
		onInit() {
			inspiration.style.display = 'block';
		},
	});
});

document.querySelectorAll('.js-slider-inspirations-with-flags').forEach((inspiration) => {
	tns({
		container: inspiration.querySelector('.p-slider__content'),
		controlsContainer: inspiration.querySelector('.p-slider__controls'),
		navPosition: 'bottom',
		nav: true,
		controls: true,
		loop: false,
		mouseDrag: true,
		lazyload: false,
		arrowKeys: true,
		edgePadding: baseFontSize * getComputedStyle(html).getPropertyValue('--spacing-unitless') * 2,
		gutter: baseFontSize * getComputedStyle(html).getPropertyValue('--spacing-unitless'),
		slideBy: 'page',
		items: 1,
		responsive: {
			768: {
				edgePadding: baseFontSize * getComputedStyle(html).getPropertyValue('--spacing-unitless') * 4,
				gutter: baseFontSize * getComputedStyle(html).getPropertyValue('--spacing-unitless') * 2,
			},
			1200: {
				edgePadding: 0,
			},
		},
		onInit() {
			inspiration.style.display = 'block';
		},
	});
});
