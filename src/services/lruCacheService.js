/**
 * Strongly based in code from
 * https://dev.to/udayvunnam/implementing-lru-cache-in-javascript-3c8g
 */

class Node {
  constructor(key, value, next = null, prev = null) {
    this.key = key;
    this.value = value;
    this.next = next;
    this.prev = prev;
  }
}

class LRUCacheService {
  /**
   * @param {number} limit
   */
  constructor(limit = 10) {
    this.limit = limit;

    this.size = 0;
    this.head = null;
    this.tail = null;
    this.cacheMap = {};
    this.wasSynced = false;
  }

  /**
   * For simplicity, we will assume that the synchronization is done from the
   * coordinator before use other methods in from this class.
   */
  async sync(storedItems) {
    const storedKeys = Object.keys(storedItems);

    storedKeys.forEach((key) => {
      this.write(key, storedItems[key]); // using this function the value will be stored in the storage again
    });

    this.wasSynced = true;
  }

  /**
   * @param {*} key
   * @param {*} value
   * @param {Function} callback Async function to be called when the key and
   * value are written
   */
  async write(key, value, callback) {
    const existingNode = this.cacheMap[key];

    console.log('write', { key, value, existingNode });

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
    if (callback) await callback(key, value);
  }

  async read(key) {
    const existingNode = this.cacheMap[key];

    if (!existingNode) return null;

    const value = existingNode.value;

    /**@todo split responsibilities from this method and abstract the head updating */
    // Make the node as new Head of LinkedList if not already
    if (this.head !== existingNode)
      // write will automatically remove the node from it's position and make it a new head i.e most used
      this.write(key, value);

    return value;
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

  // clear() {
  //   this.head = null;
  //   this.tail = null;
  //   this.size = 0;
  //   this.cacheMap = {};
  // }

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

export const lruCacheService = new LRUCacheService();
