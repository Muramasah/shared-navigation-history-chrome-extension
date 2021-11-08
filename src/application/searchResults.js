import { searchWebsite } from '../domain/useCases/searchWebsite';

window.onload = onLoadHandler;

function onLoadHandler() {
  const query = getQuery();

  searchWebsite.execute(query, renderSearchResultsPage).catch(console.error);
}

function getQuery() {
  const searchParams = new URLSearchParams(window.location.search);

  return searchParams.get('query');
}

function renderSearchResultsPage(query, searchResults) {
  renderSubtitle(query);
  renderResultTable(searchResults);
}

function renderSubtitle(query) {
  const header = document.getElementsByTagName('header')[0];
  const secondLevelHeadingElement = document.createElement('h2');

  secondLevelHeadingElement.innerHTML = `Search results for: ${query}`;

  header.append(secondLevelHeadingElement);
}

function renderResultTable(searchResults) {
  const searchResultsContainer =
    document.getElementsByClassName('search-results')[0];

  searchResultsContainer.innerHTML = '';

  const searchResultFragment = getSearchResultsFragmentFrom(searchResults);

  searchResultsContainer.append(searchResultFragment);
}

/**
 * @param {Array<{title: string, url: string}>} searchResults
 * @returns
 */
function getSearchResultsFragmentFrom(searchResults) {
  const searchResultFragment = document.createDocumentFragment();

  searchResults.forEach(({ title, url }) => {
    const tableRowElement = document.createElement('tr');

    tableRowElement.innerHTML = getTableRowInnerTemplate(title, url);

    searchResultFragment.append(tableRowElement);
  });

  return searchResultFragment;
}

/**
 * @param {string} title
 * @param {string} url
 * @returns {string} Inner content for a table row element
 */
function getTableRowInnerTemplate(title, url) {
  return `
    <td>
      <span>${title}</span>
    </td>
    <td>
      <a href="${url}">${url}</a>
    </td>
  `;
}
