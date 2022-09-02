"use strict";

/* eslint-env browser */

/* ------------------------------------*
    Generate sub menu styles guide
*------------------------------------*/
var menuStyleguide = document.getElementById('menuStylesguide');
var subSectionsTitles = document.querySelectorAll('.js-menu');
var ul = document.createElement('ul');

if (subSectionsTitles.length) {
  menuStyleguide.querySelector('.active').parentNode.append(ul);
}

document.querySelectorAll('.js-menu').forEach(function (title) {
  var href = title.getAttribute('id');
  var a = document.createElement('a');
  var li = document.createElement('li');
  a.textContent = href;
  a.href = window.location.pathname + '#' + href;
  li.append(a);
  ul.append(li);
});
/* ------------------------------------*
    Create snippets
*------------------------------------*/

function process(str) {
  var div = document.createElement('div');
  div.innerHTML = str.trim();
  return format(div, 0).innerHTML;
}

function format(node, level) {
  var indentBefore = new Array(level++ + 1).join('  ');
  var indentAfter = new Array(level - 1).join('  ');
  var textNode;

  for (var i = 0; i < node.children.length; i++) {
    textNode = document.createTextNode("\n".concat(indentBefore));
    node.insertBefore(textNode, node.children[i]);
    format(node.children[i], level);

    if (node.lastElementChild == node.children[i]) {
      textNode = document.createTextNode("\n".concat(indentAfter));
      node.appendChild(textNode);
    }
  }

  return node;
}

document.querySelectorAll('.js-snippet').forEach(function (snippet) {
  var language = 'html';

  if (snippet.getAttribute('data-language')) {
    language = snippet.getAttribute('data-language');
  }

  var details = document.createElement('details');
  var summary = document.createElement('summary');
  summary.innerHTML = 'Toggle code';
  var pre = document.createElement('pre');
  var code = document.createElement('code');
  var parent = snippet.closest('.js-parent-snippet');
  details.classList.add('toggle-code');
  pre.classList.add('snippet');
  code.classList.add("language-".concat(language));
  details.append(summary);
  details.append(pre);
  pre.append(code);
  code.append(process(snippet.outerHTML).substring(1).replace(/ js-snippet/g, '').replace(/ class="js-snippet"/g, '').replace(/ u-d-none/g, ''));
  parent.append(details);
});
