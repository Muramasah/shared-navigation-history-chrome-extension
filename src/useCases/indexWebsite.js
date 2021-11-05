import { searchIndexRepository } from '../infrastructure/searchIndexRepository';
import { History } from '../models/Website';
import { lruCacheService } from '../services/lruCacheService';

class IndexWebsite {
  #lruCacheService;
  #searchIndexRepository;

  constructor(lruCacheService, searchIndexRepository) {
    this.#lruCacheService = lruCacheService;
    this.#searchIndexRepository = searchIndexRepository;
  }

  /**
   * @param {string} text
   * @param {string} url
   * @param {string} title
   * @return {Promise<void>}
   */
  async execute(text, url, title) {
    const newWebsite = new History(text, url, title);
    const cachedWebsiteText = await this.getCachedSiteText(newWebsite);

    console.log({ cachedSiteText: cachedWebsiteText });

    if (this.#shouldSaveWebsiteText(cachedWebsiteText, newWebsite)) {
      await this.#saveInCache(newWebsite);
      await this.#searchIndexRepository.record(newWebsite);
      return;
    }
  }

  async getCachedSiteText(newHistoryModel) {
    await this.#lruCacheService.sync();

    return await this.#lruCacheService.read(newHistoryModel.url);
  }

  #shouldSaveWebsiteText(cachedWebsiteText, websiteModel) {
    return !cachedWebsiteText || cachedWebsiteText !== websiteModel.text; // may be redundant
  }

  async #saveInCache(newHistoryModel) {
    await this.#lruCacheService.write(
      newHistoryModel.url,
      JSON.stringify(newHistoryModel.toPlainObject())
    );
  }
}

export const recordHistory = new IndexWebsite(
  lruCacheService,
  searchIndexRepository
);
