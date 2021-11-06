const defaultConfig = {
  baseURL: 'http://localhost:8888/search_api/v1',
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
    const endpoint = `${defaultConfig.baseURL}${'/websites'}`;

    const stringifiedWebsite = JSON.stringify(website.toPlainObject());

    await fetch(endpoint, {
      method: 'PUT',
      headers: defaultConfig.headers,
      body: stringifiedWebsite,
    });
  }
}

export const websiteIndexRepository = new WebsiteIndexRepository();
