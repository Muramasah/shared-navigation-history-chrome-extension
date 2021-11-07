import { searchWebsite } from '../useCases/searchWebsite';

window.onload = onLoadHandler;

function onLoadHandler() {
  const query = getQuery();

  searchWebsite.execute(query, renderSearchResults).catch(console.error);
}

function getQuery() {
  const searchParams = new URLSearchParams(window.location.search);

  return searchParams.get('query');
}

function renderSearchResults(searchResults) {
  const searchResultsContainer =
    document.getElementsByClassName('search-results')[0];

  searchResultsContainer.innerHTML = '';

  const searchResultFragment = document.createDocumentFragment();

  searchResults.forEach(({ title, url }) => {
    const tableRowElement = document.createElement('tr');

    tableRowElement.innerHTML = `
      <td>${title}</td>
      <td>${url}</td>
    `;

    searchResultFragment.append(tableRowElement);
  });

  searchResultsContainer.append(searchResultFragment);
}
