/* eslint-disable no-undef */

chrome.omnibox.onInputEntered.addListener(onQueryEntered);

const SEARCH_RESULT_PAGE_URL = chrome.runtime.getURL(
  'build/search-results.html'
);

/**
 * @param {string} query
 */
function onQueryEntered(query) {
  if (query.trim() !== '')
    chrome.tabs.create({ url: `${SEARCH_RESULT_PAGE_URL}?query=${query}` });
}
