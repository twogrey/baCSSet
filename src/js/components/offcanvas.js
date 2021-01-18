let offcanvas = null;
let offcanvasFocusables = [];
let previouslyFocusedElementOffcanvas = null;

const openOffcanvas = function (offcanvasID) {
	// Keep current offcanvas
	offcanvas = document.querySelector('#'+offcanvasID);

	// Keep trigger
	previouslyFocusedElementOffcanvas = document.querySelector(':focus');
	if (previouslyFocusedElementOffcanvas !== null && previouslyFocusedElementOffcanvas.getAttribute('aria-expanded')) {
		previouslyFocusedElementOffcanvas.setAttribute('aria-expanded', 'true');
	}

	// Add specific styles to <body>
	body.classList.add('offcanvas-is-open');

	// Show element
	offcanvas.classList.add('is-active');

	// Check focusable elements in the offcanvas then give focus to the first one
	offcanvasFocusables = Array.from(offcanvas.querySelectorAll(focusableSelector));
	offcanvasFocusables[0].focus();

	// Init closing offcanvas functions
	offcanvas.addEventListener('click', closeOffcanvas);
	offcanvas.querySelectorAll('.js-offcanvas-close').forEach((btn) => {
		btn.addEventListener('click', closeOffcanvas);
	});
	offcanvas.querySelector('.js-offcanvas-stop').addEventListener('click', stopPropagation);
};

const closeOffcanvas = function () {
	// Abort function if there is not opened offcanvas
	if (offcanvas === null) {
		return;
	}

	// Give focus to the trigger
	if (previouslyFocusedElementOffcanvas !== null) {
		previouslyFocusedElementOffcanvas.focus();
		if (previouslyFocusedElementOffcanvas.getAttribute('aria-expanded')) {
			previouslyFocusedElementOffcanvas.setAttribute('aria-expanded', 'false');
		}
	}

	// Add fading-out class to offcanvas
	offcanvas.classList.add('is-hiding');

	// Remove closing offcanvas functions
	offcanvas.removeEventListener('click', closeOffcanvas);
	offcanvas.querySelectorAll('.js-offcanvas-close').forEach((btn) => {
		btn.removeEventListener('click', closeOffcanvas);
	});
	offcanvas.querySelector('.js-offcanvas-stop').removeEventListener('click', stopPropagation);

	//
	const hideOffcanvas = function () {
		// Undo all the things
		offcanvas.classList.remove('is-hiding');
		offcanvas.classList.remove('is-active');
		body.classList.remove('offcanvas-is-open');
		offcanvas.removeEventListener('animationend', hideOffcanvas);
		offcanvas = null;
		getScrollbarWidth();
	};

	// When the offcanvas has finished to fade out
	offcanvas.addEventListener('animationend', hideOffcanvas);
};

const stopPropagation = function (e) {
	e.stopPropagation();
};

// Focus trap
const focusInOffcanvas = function (e) {
	e.preventDefault();
	let index = offcanvasFocusables.findIndex((f) => f === offcanvas.querySelector(':focus'));
	if (e.shiftKey === true) {
		index--;
	} else {
		index++;
	}
	if (index >= offcanvasFocusables.length) {
		index = 0;
	}
	if (index < 0) {
		index = offcanvasFocusables.length - 1;
	}
	offcanvasFocusables[index].focus();
};

window.addEventListener('keydown', (e) => {
	// Close modal by pressing Esc
	if (e.key === 'Escape' || e.key === 'Esc') {
		closeOffcanvas(e);
	}
	if (e.key === 'Tab' && offcanvas !== null) {
		focusInOffcanvas(e);
	}
});

document.querySelectorAll('.js-offcanvas').forEach((a) => {
	a.addEventListener('click', () => {
		openOffcanvas(a.getAttribute('data-offcanvas-id'));
	});
});

var resizeTimer;

window.addEventListener('resize', (e) => {
	if(offcanvas && offcanvas.classList.contains('offcanvas--mq') && window.innerWidth > mqMedium) {
		clearTimeout(resizeTimer);
		resizeTimer = setTimeout(function() {
			closeOffcanvas(e);
		}, 250);
	}
});