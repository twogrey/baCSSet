let modal = null;
let modalFocusables = [];
let previouslyFocusedElementModal = null;

const openModal = function (modalID) {
	// Keep current modal & his trigger
	modal = document.querySelector('#'+modalID);
	previouslyFocusedElementModal = document.querySelector(':focus');
	
	// Add specific styles to <html> & <body>
	getScrollbarWidth();
	body.classList.add('modal-is-open');

	// Set attribute to <dialog> element
	modal.setAttribute('open', '');

	// Check focusable elements in the modal then give focus to the first one
	modalFocusables = Array.from(modal.querySelectorAll(focusableSelector));
	modalFocusables[0].focus();

	// Init closing modal functions
	modal.addEventListener('click', closeModalOnBackdrop);
	modal.querySelectorAll('.js-modal-close').forEach((btn) => {
		btn.addEventListener('click', closeModal);
	});
};

const closeModal = function () {
	// Abort function if there is not opened modal
	if (modal === null) {
		return;
	}

	// Give focus to the trigger
	if (previouslyFocusedElementModal !== null) {
		previouslyFocusedElementModal.focus();
	}

	// Add fading-out class to modal
	modal.classList.add('is-hiding');

	// Remove closing modal functions
	modal.removeEventListener('click', closeModal);
	modal.querySelectorAll('.js-modal-close').forEach((btn) => {
		btn.removeEventListener('click', closeModal);
	});

	//
	const hideModal = function () {
		// Undo all the things
		modal.classList.remove('is-hiding');
		modal.removeAttribute('open', '');
		body.classList.remove('modal-is-open');
		modal.removeEventListener('animationend', hideModal);
		modal = null;
		getScrollbarWidth();
	};

	// When the modal has finished to fade out
	modal.addEventListener('animationend', hideModal);
};

//
const closeModalOnBackdrop = function (e) {
	if(e.target === modal) {
		closeModal();
	}
};

// Focus trap
const focusInModal = function (e) {
	let index = modalFocusables.findIndex((f) => f === modal.querySelector(':focus'));
	if (e.shiftKey === true) {
		index--;
	} else {
		index++;
	}
	if (index >= modalFocusables.length) {
		e.preventDefault();
		index = 0;
		modalFocusables[index].focus();
	}
	if (index < 0) {
		e.preventDefault();
		index = modalFocusables.length - 1;
		modalFocusables[index].focus();
	}
};

window.addEventListener('keydown', (e) => {
	// Close modal by pressing Esc
	if (e.key === 'Escape' && activeDropdown === null) {
		closeModal(e);
	}
	if (e.key === 'Tab' && modal !== null) {
		focusInModal(e);
	}
});

document.querySelectorAll('.js-modal').forEach((a) => {
	a.addEventListener('click', () => {
		openModal(a.getAttribute('data-modal-id'));
	});
});