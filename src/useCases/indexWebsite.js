import { chromeStorageRepository } from '../infrastructure/chromeStorageRepository';
import { websiteIndexRepository } from '../infrastructure/searchIndexRepository';
import { Website } from '../models/Website';
import { lruCacheService } from '../services/lruCacheService';

class IndexWebsite {
  #lruCacheService;
  #storageRepository;
  #websiteIndexRepository;

  /**
   * @param {LRUCacheService} lruCacheService
   * @param {ChromeStorageRepository} storageRepository
   * @param {WebsiteIndexRepository} websiteIndexRepository
   */
  constructor(lruCacheService, storageRepository, websiteIndexRepository) {
    this.#lruCacheService = lruCacheService;
    this.#storageRepository = storageRepository;
    this.#websiteIndexRepository = websiteIndexRepository;
  }

  /**
   * @param {string} text
   * @param {string} url
   * @param {string} title
   * @return {Promise<void>}
   */
  async execute(text, url, title) {
    await this.#syncCacheWithStore();

    const newWebsite = new Website(text, url, title);

    await this.#index(newWebsite);
  }

  async #index(newWebsite) {
    const cachedWebsite = await this.#getCachedWebsite(newWebsite);

    if (!this.#shouldIndexWebsite(newWebsite, cachedWebsite)) return;

    await this.#saveInCache(newWebsite);
    await this.#websiteIndexRepository.index(newWebsite);
  }

  async #getCachedWebsite(newWebsite) {
    const rawStoredWebsite = await this.#lruCacheService.read(newWebsite.url);

    if (!rawStoredWebsite) return null;

    const websiteDTO = JSON.parse(rawStoredWebsite);

    return new Website(websiteDTO.text, websiteDTO.url, websiteDTO.title);
  }

  async #syncCacheWithStore() {
    const storedWebsites = await this.#storageRepository.getAll();

    await this.#lruCacheService.sync(storedWebsites);
  }

  #shouldIndexWebsite(website, cachedWebsite) {
    return !cachedWebsite || cachedWebsite.text !== website.text; // may be redundant
  }

  async #saveInCache(newWebsite) {
    const key = newWebsite.url;
    const value = JSON.stringify(newWebsite.toPlainObject());

    await this.#lruCacheService.write(key, value, this.#storageRepository.set);
  }
}

export const indexWebsite = new IndexWebsite(
  lruCacheService,
  chromeStorageRepository,
  websiteIndexRepository
);
