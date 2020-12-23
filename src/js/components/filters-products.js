/* eslint-env browser, jquery */

const filters = Array.from(document.querySelectorAll('.js-list-filters [type="checkbox"]'));

function categoriesFiltered(filters) {
	return filters.filter((filter) => filter.checked).map((filter) => filter.value);
}

function filterProducts() {
	const selectedCategories = categoriesFiltered(filters);

	document.querySelectorAll('.js-list-products [data-category]').forEach((product) => {
		const category = product.getAttribute('data-category');
		if (selectedCategories.length && !selectedCategories.includes(category)) {
			product.classList.add('is-hidden-by-filter');
		} else {
			product.classList.remove('is-hidden-by-filter');
		}
	});
	if (shownLabel) {
		show(Array.from(document.querySelectorAll('.js-show-more-item:not(.is-hidden-by-filter)')));
	}
}

/* ------------------------------------*
		Is ready
*------------------------------------*/

document.addEventListener('DOMContentLoaded', () => {
	filters.forEach((filter) => {
		filter.addEventListener('change', () => {
			analyticsEvent('clic filtre produits', categoriesFiltered(filters).join(' '));
			filterProducts();
		});
	});
});
