const defaultConfig = {
  baseURL: 'http://localhost:8888/search_api/v1/websites',
  headers: {
    Accept: 'application/json',
    'Cache-Control': 'no-cache',
    'Content-type': 'application/json',
  },
};

class WebsiteIndexRepository {
  /**
   * @param {Website} website
   * @returns {Promise<void>}
   */
  async index(website) {
    const endpoint = defaultConfig.baseURL;

    const stringifiedWebsite = JSON.stringify(website.toPlainObject());

    await fetch(endpoint, {
      method: 'PUT',
      headers: defaultConfig.headers,
      body: stringifiedWebsite,
    });
  }

  /**
   * @param {query} string
   * @returns {Promise<void>}
   */

  async search(query) {
    const endpoint = `${defaultConfig.baseURL}?query=${query}`;

    const response = await fetch(endpoint);

    return response.json();
  }
}

export const websiteIndexRepository = new WebsiteIndexRepository();
