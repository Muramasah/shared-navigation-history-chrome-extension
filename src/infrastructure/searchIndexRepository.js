const defaultConfig = {
  baseURL: 'http://localhost:8888/search_api/v1',
  headers: {
    Accept: 'application/json',
    'Cache-Control': 'no-cache',
    'Content-type': 'application/json',
  },
};

class SearchIndexRepository {
  /**
   * @param {Website} websiteModel
   * @returns {Promise<void>}
   */
  async record(websiteModel) {
    const endpoint = `${defaultConfig.baseURL}${'/websites'}`;

    const stringifiedWebsite = JSON.stringify(websiteModel.toPlainObject());

    await fetch(endpoint, {
      method: 'PUT',
      headers: defaultConfig.headers,
      body: stringifiedWebsite,
    });
  }
}

export const searchIndexRepository = new SearchIndexRepository();
