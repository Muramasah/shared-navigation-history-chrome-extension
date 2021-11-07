import { websiteIndexRepository } from '../../infrastructure/searchIndexRepository';

class SearchWebsite {
  #websiteIndexRepository;

  /**
   * @param {WebsiteIndexRepository} websiteIndexRepository
   */
  constructor(websiteIndexRepository) {
    this.#websiteIndexRepository = websiteIndexRepository;
  }

  /**
   * @param {string} query
   * @return {Promise<void>}
   */
  async execute(query, callback) {
    const searchResults = await this.#websiteIndexRepository.search(query);
    callback(searchResults);
  }
}

export const searchWebsite = new SearchWebsite(websiteIndexRepository);
