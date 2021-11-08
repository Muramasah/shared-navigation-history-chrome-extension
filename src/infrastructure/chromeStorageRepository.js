/* eslint-disable no-undef */

/**
 * This repository relies on the chrome.storage.local API. To provide this functionality
 * in a more robust way, it would be better to use the chrome.storage.sync API.
 */

class ChromeStorageRepository {
  async get(key) {
    return await chrome.storage.local.get([key]);
  }

  async getAll() {
    return await chrome.storage.local.get(null);
  }

  async set(key, value) {
    await chrome.storage.local.set({ [key]: value });
  }

  async remove(key) {
    await chrome.storage.local.remove(key);
  }

  async clear() {
    await chrome.storage.local.clear();
  }
}

export const chromeStorageRepository = new ChromeStorageRepository();
