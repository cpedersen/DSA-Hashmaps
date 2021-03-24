const HashMap = require("./hashMap");

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

  /*lotr.set("Hobbit", "Bilbo");
  lotr.set("Hobbit", "Frodo");
  lotr.set("Wizard", "Gandalf");
  lotr.set("Human", "Aragorn");
  lotr.set("Human", "Adam");
  lotr.set("Human", "Andy");
  lotr.set("Human", "Katy");
  lotr.set("Cat", "Dimmy");
  lotr.set("Elf", "Legolas");
  lotr.set("Maiar", "The Necromancer");
  lotr.set("Maiar", "Sauron");
  lotr.set("RingBearer", "Gollum");
  lotr.set("LadyOfLight", "Galadriel");
  lotr.set("HalfElven", "Arwen");
  lotr.set("Ent", "Treebeard");*/

  store.forEach((c) => {
    lotr.set(c[0], c[1]);
  });
  console.log(lotr);

  // Assignment #1:
  // Print your hash map and notice the length and items
  // that are hashed in your hash map. Have you hashed
  // all the items you were asked to?
  // ANSWER: No. Length shown is only 9 items despite the fact
  // that 11 items were entered into the hashmap. There are
  // two items with the same key value (Hobbit, Maiar).

  // Retrieve the value that is hashed in the key "Maiar" and Hobbit:
  console.log("Get value for Maiar key:", lotr.get("Maiar"));
  console.log("Get value for Hobbit key:", lotr.get("Hobbit"));
  console.log("Capacity: ", lotr._capacity);
  console.log("Hash table: ", lotr._hashTable);
  console.log("Deleted: ", lotr._deleted);

  // What are the values of Maiar and Hobbit that you have?:
  // Sauron and Frodo.
  // Is there a discrepancy? Explain your answer.
  // ANSWER: There is a discrepancy. The key was duplicated
  // and the value was overwritten. So Bilbo and Necomancer are not
  // showing up in the hashmap.

  // What is the capacity of your hash table after you have
  // hashed all the above items? Explain your answer.
  // ANSWER: Capacity is 24. We went over capacity of 8 (MAX_LOAD_RATIO
  // is 50%) when we reached 4 items. We multipled the initial capacity
  // of 8 by the SIZE_RATIO of 3.

  return lotr;
}

// Assignment #2:
// DO NOT run the following code before solving the problem.
// What is the output of the following code? Explain your answer.
// ANSWER: The function is creating a collision. Duplicate key
// values overwrite previous data values, resulting in a swapping
// of keys.
const WhatDoesThisDo = function () {
  let str1 = "Hello World.";
  let str2 = "Hello World.";
  let map1 = new HashMap();
  map1.set(str1, 10);
  map1.set(str2, 20);
  let map2 = new HashMap();
  let str3 = str1;
  let str4 = str2;
  map2.set(str3, 20);
  map2.set(str4, 10);

  console.log(
    `Get key for string '${str1}' (initial key: 10): `,
    map1.get(str1)
  ); // Prints 20
  console.log(
    `Get key for string '${str2}' (initial key: 20): `,
    map2.get(str3)
  ); // Prints 10
};

// Assignment #4:
// Implement a function to delete all duplicated characters
// in a string and keep only the first occurrence of each
// character. For example, if the input is string “google”,
// the result after deletion is “gole”. Test your program
// with a sentence as well such as "google all that you
// think can think of".
function removeDuplicates(string) {
  const map = new Map();
  let newStr = "";
  string.split("").forEach((letter) => {
    if (!map.has(letter)) {
      map.set(letter, "");
      newStr += letter;
    }
  });
  console.log(newStr);
  return newStr;
}

// Assignment #5:
// Write an algorithm to check whether any anagram
// of some string is a palindrome. Given some string,
// "acecarr", the algorithm should return true, because
// the letters in "acecarr" can be rearranged to the
// anagram "racecar", which itself is a palindrome. In
// contrast, given the word "north", the algorithm
// should return false, because there's no anagram
// for "north" that would be a palindrome.
const palindrome = function (str) {
  let hash = new HashMap();

  for (const char of str) {
    let slot = hash._findSlot(char);

    if (!hash._hashTable[slot]) {
      hash.set(char, 1);
    } else {
      let count = hash._hashTable[slot].value + 1;
      hash._hashTable[slot].value = count;
    }
  }

  const values = Object.values(hash._hashTable);
  const uniqueChars = values.length;

  let count = 0;
  values.forEach((item) => (count = count + item.value));

  if (count === uniqueChars * 2 || count === uniqueChars * 2 - 1) {
    return true;
  }

  return false;
};

// Assignment #6:
// Write an algorithm to group a list of words into anagrams.
// For example, if the input was ['east', 'cars', 'acre',
// 'arcs', 'teas', 'eats', 'race'], the output should be:
// [['east', 'teas', 'eats'], ['cars', 'arcs'], ['acre', 'race']].
const anagramGroup = function (strArr) {
  const anagramMap = new Map();
  strArr.forEach((word) => {
    let sorted = order(word);
    if (anagramMap.has(sorted)) {
      anagramMap.get(sorted).push(word);
    } else {
      anagramMap.set(sorted, [word]);
    }
  });
  return [...anagramMap.values()];
};

const order = (word) => {
  let order = word.split("").sort().join("");
  return order;
};

//console.log(main());
//WhatDoesThisDo();
//removeDuplicates("google"); // gole
//removeDuplicates("google all that youthink can think of"); // gole athyuinkcf
//console.log(palindrome("acecarr")); // returns true
//console.log(palindrome("north")); // returns false
//console.log(anagramGroup(["east", "cars", "acre", "arcs", "teas", "eats", "race"]));
