import { recordHistory } from '../useCases/recordHistory';
import { isElementVisible } from '../utilities/dom';

const visibleText = getPageVisibleText(document);
const siteUrl = window.location.href;
const tabTitle = document.title;

recordHistory.execute(visibleText, siteUrl, tabTitle).catch(console.error);

/**
 * @param {Document} document
 * @returns {string}
 */
function getPageVisibleText(document) {
  const { body } = document;
  const { children } = body;
  const rawVisibleText = getVisibleText(children);

  return rawVisibleText;
}

/**
 * @param {HTMLCollection} elements
 * @returns {string}
 */
function getVisibleText(elements) {
  const visibleTextParts = [];

  for (const element of elements)
    if (isTargetElement(element)) visibleTextParts.push(element.innerText);

  return visibleTextParts.join(' ');
}

/**
 * @param {HTMLElement} element
 */
function isTargetElement(element) {
  if (isWantedElement(element)) return isElementVisible(element);
}

/**
 * @param {HTMLElement} element
 */
function isWantedElement(element) {
  const { tagName, selected } = element;

  return !(
    ['SCRIPT', 'STYLE'].includes(tagName) ||
    (tagName === 'OPTION' && !selected)
  );
}
