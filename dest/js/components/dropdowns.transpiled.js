"use strict";

var activeDropdown = null;
var dropdownFocusables = [];

var dropdownClickHandler = function dropdownClickHandler(e) {
  if (!activeDropdown.contains(e.target)) {
    closeDropdown(activeDropdown);
  }
};

window.addEventListener('keydown', function (e) {
  if (e.key === 'Tab' && activeDropdown !== null) {
    focusDropdown(e);
  }
});

var focusDropdown = function focusDropdown(e) {
  var index = dropdownFocusables.findIndex(function (f) {
    return f === activeDropdown.querySelector(':focus');
  });

  if (e.shiftKey === true) {
    index--;
  } else {
    index++;
  }

  if (index < 0 || index >= dropdownFocusables.length) {
    closeDropdown(activeDropdown);
  }
};

window.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && activeDropdown !== null) {
    activeDropdown.querySelector('.js-dropdown').focus();
    closeDropdown(activeDropdown);
  }
});

var openDropdown = function openDropdown(dropdown) {
  if (activeDropdown) closeDropdown(activeDropdown);
  activeDropdown = dropdown;
  dropdownFocusables = Array.from(dropdown.querySelectorAll(focusableSelector));
  dropdown.querySelector('.js-dropdown').setAttribute('aria-expanded', 'true');
  document.addEventListener('click', dropdownClickHandler);
};

var closeDropdown = function closeDropdown(dropdown) {
  dropdown.querySelector('.js-dropdown').setAttribute('aria-expanded', 'false');
  document.removeEventListener('click', dropdownClickHandler);
  activeDropdown = null;
};

document.querySelectorAll('.js-dropdown').forEach(function (btn) {
  btn.addEventListener('click', function () {
    if (btn.getAttribute('aria-expanded') == 'false') {
      openDropdown(btn.parentNode);
    } else {
      closeDropdown(btn.parentNode);
    }
  });
});
