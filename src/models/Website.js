/**
 * This class represent our main domain model, its properties should be value
 * objects to abstract domain logic such as validations. The models in general
 * should not have any logic, and should only be used to represent data. The
 * logic used here should be part of a domain service such as a use case.
 *
 */

import { sanitizeText } from '../utilities/text';

export class Website {
  #text;
  #url;
  #title;
  /**
   * @param {string} text
   * @param {string} url
   * @param {string} title
   * @return {Website}
   */
  constructor(text, url, title) {
    const sanitizedText = sanitizeText(text);
    const sanitizedUrl = url.trim();
    const sanitizedTitle = title.trim();

    if (sanitizedText === '' || sanitizedUrl === '' || sanitizedTitle === '')
      throw new Error('Website must have text, url and title');

    this.#text = sanitizedText;
    this.#url = sanitizedUrl;
    this.#title = sanitizedTitle;
  }

  get text() {
    return this.#text;
  }

  get url() {
    return this.#url;
  }

  get title() {
    return this.#title;
  }
  /** This method should not be in the model, abstract to a domain service when
   *  is possible */
  toPlainObject() {
    return {
      text: this.text,
      url: this.url,
      title: this.title,
    };
  }
}
