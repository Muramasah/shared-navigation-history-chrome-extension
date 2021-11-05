/**
 * @param {HTMLElement} element
 */
export function isElementVisible(element) {
  return hasSize(element) && hasComputedVisibility(element);
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
function hasComputedVisibility(element) {
  const { display, visibility } = window.getComputedStyle(element);

  return display !== 'none' && visibility !== 'hidden';
}
