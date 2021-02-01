/* eslint-env browser, jquery */
/* global MCD, Promise */

/* ------------------------------------*
    Variables
*------------------------------------*/

const html = document.querySelector('html');
const body = document.querySelector('body');
const baseFontSize = parseInt(window.getComputedStyle(html, null).getPropertyValue('font-size'), 10);
const mqMedium = baseFontSize * getComputedStyle(html).getPropertyValue('--mq-md-unitless');
const mqLarge = baseFontSize * getComputedStyle(html).getPropertyValue('--mq-lg-unitless'); // Use mqMedium & mqLarge with window.innerWidth
const focusableSelector = 'button:not([disabled]), a[href], input:not([type="hidden"]):not([disabled]), textarea:not([disabled]), select:not([disabled]), [contenteditable]';

/* ------------------------------------*
    Generalities
*------------------------------------*/

function is_touch_device() {
	return (('ontouchstart' in window) || (navigator.MaxTouchPoints > 0) || (navigator.msMaxTouchPoints > 0));
	// navigator.msMaxTouchPoints for microsoft IE backwards compatibility
}

if (!is_touch_device()) {
	html.classList.add('not-touch');
	html.classList.remove('touch');
}

/**
 * Get scrollbar width then assign it to global CSS var
 */

function getScrollbarWidth() {
	document.documentElement.style.setProperty('--scrollbar-width', `${window.innerWidth - document.documentElement.clientWidth}px`);
}

window.addEventListener('resize', () => {
	getScrollbarWidth();
});

/* ------------------------------------*
    Expose element dimensions
*------------------------------------*/

function getComputedDimensions() {
	document.querySelectorAll('[data-computed-style]').forEach((element) => {
		const prop = element.getAttribute('data-computed-style').split(', ');
		const name = element.getAttribute('data-computed-style-name');
		prop.forEach((p) => {
			if (element.hasAttribute('data-computed-style-root')) {
				document.documentElement.style.setProperty(`--${name}-${p}`, window.getComputedStyle(element, null).getPropertyValue(p));
			} else {
				element.style.setProperty(`--${name}-${p}`, window.getComputedStyle(element, null).getPropertyValue(p));
			}
		});
	});
}

window.addEventListener('resize', () => {
	getComputedDimensions();
});

/* ------------------------------------*
    Is ready
*------------------------------------*/

document.addEventListener('DOMContentLoaded', () => {
	/**
	 * End loading bar animation
	 */
	html.classList.add('loading-page-done');

	/**
	 *
	 */
	getComputedDimensions();

	/**
	 * 
	 */
	getScrollbarWidth();
});
