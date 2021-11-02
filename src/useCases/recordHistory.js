class RecordHistory {
  /**
   * @param {string} text
   * @param {string} url
   * @param {string} title
   * @return {Promise<void>}
   */
  async execute(text, url, title) {
    console.log(`${text} ${url} ${title}`);
  }
}

export const recordHistory = new RecordHistory();
