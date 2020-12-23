/* eslint-env browser, jquery */

const shownLabel = document.querySelector('.js-show-more-current');
const showMoreButton = document.querySelector('.js-show-more-btn');
const showMoreButtonNumber = parseInt(showMoreButton.getAttribute('data-number'));
const shownLabelNameItem = shownLabel.getAttribute('data-text');

function show(items) {
	body.classList.add('modal-is-open'); // Keep current scrollY window (1)
	const shown = Array.from(document.querySelectorAll('.js-show-more-item:not(.is-hidden-by-filter):not(.is-hidden-by-show-more)'));
	if (shown.length <= showMoreButtonNumber) {
		items.slice(0, showMoreButtonNumber).forEach((item) => item.classList.remove('is-hidden-by-show-more'));
	}
	refreshCountText(items);
	setTimeout(() => { // Keep current scrollY window (2)
		body.classList.remove('modal-is-open');
	}, 1);
}

function showMore(items) {
	body.classList.add('modal-is-open'); // Keep current scrollY window (1)
	const shown = Array.from(document.querySelectorAll('.js-show-more-item:not(.is-hidden-by-filter):not(.is-hidden-by-show-more)'));
	items.slice(0, shown.length + showMoreButtonNumber).forEach((item) => item.classList.remove('is-hidden-by-show-more'));
	refreshCountText(items);
	setTimeout(() => { // Keep current scrollY window (2)
		body.classList.remove('modal-is-open');
	}, 1);
}

function refreshCountText() {
	const itemsTotal = Array.from(document.querySelectorAll('.js-show-more-item:not(.is-hidden-by-filter)'));
	const itemsCurrent = Array.from(document.querySelectorAll('.js-show-more-item:not(.is-hidden-by-filter):not(.is-hidden-by-show-more)'));

	if (itemsCurrent.length > 1) {
		shownLabel.textContent = `${itemsCurrent.length} ${shownLabelNameItem} sur ${itemsTotal.length}`;
	} else {
		const text = shownLabelNameItem.slice(0, -1);
		shownLabel.textContent = `${itemsCurrent.length} ${text} sur ${itemsTotal.length}`;
	}
	if (itemsCurrent.length >= itemsTotal.length) {
		showMoreButton.setAttribute('disabled', '');
	} else {
		showMoreButton.removeAttribute('disabled');
	}
}

document.addEventListener('DOMContentLoaded', () => {
	showMoreButton.addEventListener('click', () => {
		showMore(Array.from(document.querySelectorAll('.js-show-more-item:not(.is-hidden-by-filter)')));
	});
});
