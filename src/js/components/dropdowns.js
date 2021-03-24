let activeDropdown = null;
let dropdownFocusables = [];

const dropdownClickHandler = function(e) {
  if (!activeDropdown.contains(e.target)) {
    closeDropdown(activeDropdown);
  }
};

window.addEventListener('keydown', (e) => {
	if (e.keyCode === 9 && activeDropdown !== null) {
		focusDropdown(e);
	}
});

const focusDropdown = function(e) {
	let index = dropdownFocusables.findIndex((f) => f === activeDropdown.querySelector(':focus'));
	if (e.shiftKey === true) {
		index--;
	} else {
		index++;
	}
	if (index < 0 || index >= dropdownFocusables.length) {
		closeDropdown(activeDropdown);
	}
};

window.addEventListener('keydown', (e) => {
	if (e.keyCode === 27 && activeDropdown !== null) {
		activeDropdown.querySelector('.js-dropdown').focus();
		closeDropdown(activeDropdown);
	}	
});
 
const openDropdown = function (dropdown) {
	if(activeDropdown) closeDropdown(activeDropdown);
	activeDropdown = dropdown;
	dropdownFocusables = Array.from(dropdown.querySelectorAll(focusableSelector));
	dropdown.querySelector('.js-dropdown').setAttribute('aria-expanded', 'true');
	document.addEventListener('click', dropdownClickHandler);
};

const closeDropdown = function (dropdown) {
	dropdown.querySelector('.js-dropdown').setAttribute('aria-expanded', 'false');
	document.removeEventListener('click', dropdownClickHandler);
	activeDropdown = null;
};

document.querySelectorAll('.js-dropdown').forEach((btn) => {
	btn.addEventListener('click', () => {
		if(btn.getAttribute('aria-expanded') == 'false') {
			openDropdown(btn.parentNode);
		} else {
			closeDropdown(btn.parentNode);
		}
	});
});