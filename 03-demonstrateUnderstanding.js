//*You don't need to write code for the following two drills.
// use any drawing app or simple pen and paper *

// 1) Show your hash map after the insertion of keys 10, 22,
// 31, 4, 15, 28, 17, 88, 59 into a hash map of length 11
// using open addressing and a hash function k mod m, where
// k is the key and m is the length.

// ANSWER: Open addressing

// [22, 88, empty, empty, 4, 15, 28, 17, 59, 31, 10]

// 0 => 22
// 1 => 88
// 2
// 3
// 4 => 4
// 5 => 15
// 6 => 28
// 7 => 17
// 8 => 59
// 9 => 31
// 10 => 10
// 11

// 10 % 11 = 0
// % = 10
// 22 % 11 = 2
// % = 0
// 31 % 11 = 2
// % = 9
// 4 % 11 = 0
// % = 4
// 15 % 11 = 1
// % = 4
// 28 % 11 = 2
// % = 6
// 17 % 11 = 1
// % = 6
// 88 % 11 = 8
// % = 9
// 59 % 11 = 5
// % = 4

// 2) Show your hash map after the insertion of the keys 5,
// 28, 19, 15, 20, 33, 12, 17, 10 into the hash map with
// collisions resolved by separate chaining. Let the hash
// table have a length m = 9, and let the hash function be
// k mod m.

// ANSWER: Separate chaining
// [ ↓ , 20, 12 , 5 , ↓ , 17]
//   28               15
//   ↓                ↓
//   19               33
//   ↓
//   10

// 0
// 1 => 28 => 19 => 10
// 2 => 20
// 3 => 12
// 4
// 5 => 5
// 6 => 15 => 33
// 7
// 8 => 17
// 9

// 5 % 9 = 0
// % = 5
// 28 % 9 = 3
// % = 1
// 19 % 9 = 2
// % = 1
// 15 % 9 = 1
// % = 6
// 20 % 9 = 2
// % = 2
// 33 % 9 = 3
// % = 6
// 12 % 9 = 1
// % = 3
// 17 % 9 = 1
// % = 8
// 10 % 9 = 1
// % = 1
