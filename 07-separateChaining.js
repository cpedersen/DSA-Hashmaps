// Write another hash map implementation as above, but
// use separate chaining as the collision resolution mechanism.

// Test your hash map with the same values from the lotr hash map.

class Node {
  constructor(data) {
    this.data = data;
    this.next = null;
  }
}

class HashMap {
  constructor(initialCapacity = 8) {
    this.size = 0;
    // 01. CHANGE: Date is stored as an object
    // in an array. This is the pointer to our
    // object in the array.
    this._hashTable = new Array(initialCapacity);
    this._capacity = initialCapacity;
    this._deleted = 0;
  }

  get(key) {
    // 02.CHANGE
    let hash = this._hashString(key);
    if (!this._hashTable[hash]) return null;
    let chain = this._hashTable[hash];
    if (chain.hasOwnProperty(key)) {
      return chain[key];
    }
    return null;
  }

  set(item) {
    // 03. CHANGE
    let key = this._hashString(item);
    let node = new Node(item);
    if (this._hashTable[key]) {
      node.next = this._hashTable[key];
    }
    this._hashTable[key] = node;
  }

  // 04. CHANGE
  // We can't rely on the hashed index to be accurate.
  // Solution it not to delete item. Just put a deleted
  // marker in the slot. Then on resize you clear the
  // dleted items.
  remove(item) {
    let key = this._hashString(item);
    if (this._hashTable[key]) {
      if (this._hashTable[key].data === item) {
        this._hashTable[key] = this._hashTable[key].next;
      } else {
        let current = this._hashTable[key].next;
        let prev = this._hashTable[key];
        while (current) {
          if (current.data === item) {
            prev.next = current.next;
          }
          prev = current;
          current = current.next;
        }
      }
    }
  }

  // 05. CHANGE
  _hashString(string) {
    let hash = 5381;
    for (let i = 0; i < string.length; i++) {
      //Bitwise left shift with 5 0s - this would be similar to
      //hash*31, 31 being the decent prime number
      //but bit shifting is a faster way to do this
      //tradeoff is understandability
      hash = (hash << 5) + hash + string.charCodeAt(i);
      //converting hash to a 32 bit integer
      hash = hash & hash;
    }
    //making sure has is unsigned - meaning non-negative number.
    return hash >>> 0;
  }
}

const store = [
  ["Hobbit", "Bilbo"],
  ["Hobbit", "Frodo"],
  ["Wizard", "Gandalf"],
  ["Human", "Aragorn"],
  ["Elf", "Legolas"],
  ["Maiar", "The Necromancer"],
  ["Maiar", "Sauron"],
  ["RingBearer", "Gollum"],
  ["LadyOfLight", "Galadriel"],
  ["Ent", "Treebeard"],
  ["HalfElven", "Arwen"],
];

function main() {
  const lotr = new HashMap();
  lotr.MAX_LOAD_RATIO = 0.5;
  lotr.SIZE_RATIO = 3;
  store.forEach((c) => {
    lotr.set(c[0], c[1]);
  });
  console.log(lotr);
  console.log("Get value for Maiar key:", lotr.get("Maiar"));
  console.log("Get value for Hobbit key:", lotr.get("Hobbit"));
  console.log("Capacity: ", lotr._capacity);
  console.log("Hash table: ", lotr._hashTable);
  console.log("Deleted: ", lotr._deleted);

  return lotr;
}

main();
