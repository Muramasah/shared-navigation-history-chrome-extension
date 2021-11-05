/**
 * Strongly based in code from
 * https://dev.to/udayvunnam/implementing-lru-cache-in-javascript-3c8g
 */

import { chromeStorageRepository } from '../infrastructure/chromeStorageRepository';

class Node {
  constructor(key, value, next = null, prev = null) {
    this.key = key;
    this.value = value;
    this.next = next;
    this.prev = prev;
  }
}

class LeastRecentlyUsedService {
  #chromeStorageRepository;
  //set default limit of 10 if limit is not passed.
  constructor(chromeStorageRepository, limit = 10) {
    this.#chromeStorageRepository = chromeStorageRepository;
    this.limit = limit;

    this.size = 0;
    this.head = null;
    this.tail = null;
    this.cacheMap = {};
    this.wasSynced = false;

    console.log(this);
  }

  /**
   * For simplicity, we will assume that the synchronization is done only once
   * from the coordinator which is using this service before use other
   * methods in from this class.
   */
  async sync() {
    const storedItems = await this.#chromeStorageRepository.getAll();
    const storedKeys = Object.keys(storedItems);

    console.log({ storedItems });

    this.size = storedKeys.length;
    this.head = storedItems[storedKeys[0]];
    this.tail = storedItems[storedKeys.slice(-1)[0]];

    storedKeys.forEach((key) => {
      this.cacheMap[key] = storedItems[key];
    });

    this.wasSynced = true;
  }

  async write(key, value) {
    const existingNode = this.cacheMap[key];

    console.log({ key, value, existingNode });

    if (existingNode) {
      this.detach(existingNode);
      this.size--;
    } else if (this.size === this.limit) {
      delete this.cacheMap[this.tail.key];
      this.detach(this.tail);
      this.size--;
    }

    // Write to head of LinkedList
    if (!this.head) {
      this.head = this.tail = new Node(key, value);
    } else {
      const node = new Node(key, value, this.head);
      this.head.prev = node;
      this.head = node;
    }

    // update cacheMap with LinkedList key and Node reference
    this.cacheMap[key] = this.head;
    this.size++;
  }

  async read(key) {
    const existingNode = this.cacheMap[key];
    if (existingNode) {
      const value = existingNode.value;
      // Make the node as new Head of LinkedList if not already
      if (this.head !== existingNode) {
        // write will automatically remove the node from it's position and make it a new head i.e most used
        this.write(key, value);
      }
      return value;
    }

    console.log(`Item not available in cache for key ${key}`);
  }

  detach(node) {
    if (node.prev !== null) {
      node.prev.next = node.next;
    } else {
      this.head = node.next;
    }

    if (node.next !== null) {
      node.next.prev = node.prev;
    } else {
      this.tail = node.prev;
    }
  }

  clear() {
    this.head = null;
    this.tail = null;
    this.size = 0;
    this.cacheMap = {};
  }

  // Invokes the callback function with every node of the chain and the index of the node.
  async forEach(fn) {
    let node = this.head;
    let counter = 0;
    while (node) {
      fn(node, counter);
      node = node.next;
      counter++;
    }
  }

  // To iterate over LRU with a 'for...of' loop
  *[Symbol.iterator]() {
    let node = this.head;
    while (node) {
      yield node;
      node = node.next;
    }
  }
}

export const lruCacheService = new LeastRecentlyUsedService(
  chromeStorageRepository
);
