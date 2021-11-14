import { websiteIndexRepository } from '../../infrastructure/searchIndexRepository';

export class SearchWebsite {
  #websiteIndexRepository;

  /**
   * @param {WebsiteIndexRepository} websiteIndexRepository
   */
  constructor(websiteIndexRepository) {
    this.#websiteIndexRepository = websiteIndexRepository;
  }

  /**
   * @param {string} query
   * @param {Function} callback
   * @return {Promise<void>}
   */
  async execute(query, callback) {
    const searchResults = await this.#websiteIndexRepository.search(query);
    callback(query, searchResults);
  }
}

export const searchWebsite = new SearchWebsite(websiteIndexRepository);
