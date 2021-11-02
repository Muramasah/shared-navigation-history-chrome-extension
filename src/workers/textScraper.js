import { recordHistory } from '../useCases/recordHistory';

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

  return sanitizeText(rawVisibleText);
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
 * @param {string} rawText
 * @returns {string}
 */
function sanitizeText(rawText) {
  return rawText.replace(/\s\s+/g, ' ').trim();
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

/**
 * @param {HTMLElement} element
 */
function isElementVisible(element) {
  return hasSize(element) && hasComputedVisiblitiy(element);
}

/**
 * @param {HTMLElement} element
 */
function hasSize(element) {
  const { offsetWidth, offsetHeight } = element;

  return !!(offsetWidth && offsetHeight && element.getClientRects().length);
}

/**
 * @param {HTMLElement} element
 */
function hasComputedVisiblitiy(element) {
  const { display, visibility } = window.getComputedStyle(element);

  return display !== 'none' && visibility !== 'hidden';
}
