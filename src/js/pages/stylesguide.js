/* eslint-env browser */

/* ------------------------------------*
    Generate sub menu styles guide
*------------------------------------*/

const menuStyleguide = document.getElementById('menuStylesguide');
const subSectionsTitles = document.querySelectorAll('.js-menu');

const ul = document.createElement('ul');

if (subSectionsTitles.length) {
	menuStyleguide.querySelector('.active').parentNode.append(ul);
}

document.querySelectorAll('.js-menu').forEach((title) => {
	const href = title.getAttribute('id');
	const a = document.createElement('a');
	const li = document.createElement('li');
	a.textContent = href;
	a.href = window.location.pathname+'#'+href;
	li.append(a);
	ul.append(li);
});

/* ------------------------------------*
    Create snippets
*------------------------------------*/

function process(str) {
	const div = document.createElement('div');
	div.innerHTML = str.trim();

	return format(div, 0).innerHTML;
}

function format(node, level) {
	const indentBefore = new Array(level++ + 1).join('  ');
	const indentAfter = new Array(level - 1).join('  ');
	let textNode;

	for (let i = 0; i < node.children.length; i++) {
		textNode = document.createTextNode(`\n${indentBefore}`);
		node.insertBefore(textNode, node.children[i]);

		format(node.children[i], level);

		if (node.lastElementChild == node.children[i]) {
			textNode = document.createTextNode(`\n${indentAfter}`);
			node.appendChild(textNode);
		}
	}

	return node;
}

document.querySelectorAll('.js-snippet').forEach((snippet) => {
	let language = 'html';
	if (snippet.getAttribute('data-language')) {
		language = snippet.getAttribute('data-language');
	}
	const details = document.createElement('details');
	const summary = document.createElement('summary');
	summary.innerHTML = 'Toggle code';
	const pre = document.createElement('pre');
	const code = document.createElement('code');
	const parent = snippet.closest('.js-parent-snippet');
	details.classList.add('toggle-code');
	pre.classList.add('snippet');
	code.classList.add(`language-${language}`);
	details.append(summary);
	details.append(pre);
	pre.append(code);
	code.append(process(snippet.outerHTML).substring(1).replace(/ js-snippet/g, '').replace(/ class="js-snippet"/g, '').replace(/ u-d-none/g, ''));
	parent.append(details);
});
