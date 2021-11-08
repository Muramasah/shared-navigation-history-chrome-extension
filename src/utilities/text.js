/**
 * @param {string} rawText
 * @returns {string}
 */
export function sanitizeText(rawText) {
  return rawText.replace(/\s\s+/g, ' ').trim();
}
