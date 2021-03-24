let activeDropdown = null;

const dropdownClickHandler = function(e) {
  if (!activeDropdown.contains(e.target)) {
    closeDropdown(activeDropdown);
  }
};

const focusDropdown = function(e) {
  if (!activeDropdown.contains(e.target)) {
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
	dropdown.querySelector('.js-dropdown').setAttribute('aria-expanded', 'true');
	document.addEventListener('click', dropdownClickHandler);
	document.addEventListener('focusin', focusDropdown);
};

const closeDropdown = function (dropdown) {
	dropdown.querySelector('.js-dropdown').setAttribute('aria-expanded', 'false');
	document.removeEventListener('click', dropdownClickHandler);
	document.removeEventListener('focusin', focusDropdown);
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