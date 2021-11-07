/** The base url should be composed by a environment variable */
const BASE_URL = 'http://localhost:8888/search_api/v1/websites';

/** In order to avoid code duplication this repository should use a fetch service
 *  as explicit dependency. */
class WebsiteIndexRepository {
  /**
   * @param {Website} website
   * @returns {Promise<void>}
   */
  async index(website) {
    const stringifiedWebsite = JSON.stringify(website.toPlainObject());

    await fetch(BASE_URL, {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Cache-Control': 'no-cache',
        'Content-type': 'application/json',
      },
      body: stringifiedWebsite,
    });
  }

  /**
   * @param {query} string
   * @returns {Promise<void>}
   */

  async search(query) {
    const endpoint = `${BASE_URL}?query=${query}`;

    const response = await fetch(endpoint);

    return response.json();
  }
}

export const websiteIndexRepository = new WebsiteIndexRepository();
