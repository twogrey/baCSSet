let modal = null;
let focusables = [];
let previouslyFocusedElement = null;

const focusableSelector = 'button:not([disabled]), a[href], input:not([type="hidden"]):not([disabled]), textarea:not([disabled]), select:not([disabled]), [contenteditable]';

const openModal = function (e, modalID) {
	if (e) {
		e.preventDefault();
		modalID = e.currentTarget.getAttribute('data-modal-id');
	}

	if (modalID) {
		modal = document.querySelector('#'+modalID);
	} else {
		modal = modalID;
	}

	focusables = Array.from(modal.querySelectorAll(focusableSelector));
	previouslyFocusedElement = document.querySelector(':focus');
	body.classList.add('modal-is-open');
	modal.setAttribute('open', '');
	focusables[0].focus();
	modal.addEventListener('click', closeModal);
	modal.querySelector('.js-modal-close').addEventListener('click', closeModal);
	modal.querySelector('.js-modal-stop').addEventListener('click', stopPropagation);
};

const closeModal = function (e) {
	if (modal === null) {
		return;
	}
	if (previouslyFocusedElement !== null) {
		previouslyFocusedElement.focus();
	}
	if (e) {
		e.preventDefault();
	}
	modal.classList.add('is-hiding');
	modal.removeEventListener('click', closeModal);
	modal.querySelector('.js-modal-close').removeEventListener('click', closeModal);
	modal.querySelector('.js-modal-stop').removeEventListener('click', stopPropagation);
	const hideModal = function () {
		modal.classList.remove('is-hiding');
		modal.removeAttribute('open');
		body.classList.remove('modal-is-open');
		modal.removeEventListener('animationend', hideModal);
		modal = null;
		getScrollbarWidth();
	};
	modal.addEventListener('animationend', hideModal);
};

const stopPropagation = function (e) {
	e.stopPropagation();
};

document.querySelectorAll('.js-modal').forEach((a) => {
	a.addEventListener('click', openModal);
});

window.addEventListener('keydown', (e) => {
	if (e.key === 'Escape' || e.key === 'Esc') {
		closeModal(e);
	}
});