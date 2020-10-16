/*
This file contains some basic examples for direct DOM (and BOM) manipulation (with JavaScript).
*/

// Browser Object Model (BOM):
window.open();
window.innerWidth;
window.scrollX;
window.scrollTo();

// Document Object Model (DOM):
document.body;
document.title;
document.URL;

document.getElementById();
document.getElementsByClassName();
document.getElementsByTagName();

document.querySelector();
document.querySelectorAll();

Element.innerHTML;
Element.outerHTML;

Element.style;
Element.style.color;
Element.style.color = 'green';
Element.style.backgroundColor = 'blue';
Element.cssText;
Element.cssText = 'padding: 1em; color: white; background-color: red;';

Element.className;
Element.classList;
Element.classList.add();
Element.classList.remove();
Element.classList.toggle();

Element.attributes;
Element.hasAttribute();
Element.getAttribute();
Element.setAttribute();
Element.removeAttribute();

Element.setAttribute('style', 'background-color: red');
Element.style.cssText = 'background-color: red';
Element.style.backgroundColor = 'red';

// Create a DOM Element:
document.createElement();
document.createTextNode();
document.appendChild(); // use it first to append the text node to the element, then to append the element to the document
