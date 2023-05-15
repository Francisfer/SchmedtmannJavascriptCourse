"use strict";

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// BANKIST APP

// Data

const account1 = {
  owner: "Jonas Schmedtmann",
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: "Jessica Davis",
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: "Steven Thomas Williams",
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: "Sarah Smith",
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector(".welcome");
const labelDate = document.querySelector(".date");
const labelBalance = document.querySelector(".balance__value");
const labelSumIn = document.querySelector(".summary__value--in");
const labelSumOut = document.querySelector(".summary__value--out");
const labelSumInterest = document.querySelector(".summary__value--interest");
const labelTimer = document.querySelector(".timer");

const containerApp = document.querySelector(".app");
const containerMovements = document.querySelector(".movements");

const btnLogin = document.querySelector(".login__btn");
const btnTransfer = document.querySelector(".form__btn--transfer");
const btnLoan = document.querySelector(".form__btn--loan");
const btnClose = document.querySelector(".form__btn--close");
const btnSort = document.querySelector(".btn--sort");

const inputLoginUsername = document.querySelector(".login__input--user");
const inputLoginPin = document.querySelector(".login__input--pin");
const inputTransferTo = document.querySelector(".form__input--to");
const inputTransferAmount = document.querySelector(".form__input--amount");
const inputLoanAmount = document.querySelector(".form__input--loan-amount");
const inputCloseUsername = document.querySelector(".form__input--user");
const inputClosePin = document.querySelector(".form__input--pin");

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// LECTURES

const currencies = new Map([
  ["USD", "United States dollar"],
  ["EUR", "Euro"],
  ["GBP", "Pound sterling"],
]);

// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Let's start with simple array methods. Why arrays have methods? Remember that methods are simply functions that we can call on objects, basically they are functions attached to objects. If we have array methods, this means that arrays themselves are also objects.

// We will se why all arrays have access to this methods in a later section when we talk about prototypal inheritance, for now, understand that arrays are objects and that they get access to built in methods that we can see as tools for arrays. Don't forget that there are many more methods in MDN.

let arr = ["a", "b", "c", "d", "e"];

// SLICE() - DOESN'T MUTATE

// The first method that we are going to talk about is the slice method, which is very similar to the slice method that is available on strings. With the slice method we can extract any part on an array without changing the original. slice(begin, end):

console.log(arr.slice(2)); // from position two inclusively to the end.
console.log(arr.slice(1, 3)); // from position 1 inclusively to position 3 exclusively. The length of this new array is the second parameter minus the first one.

// This method returns a new array, so we can log it to see or, obviously, store into a variable.

// Just like in strings, we can define a negative parameter and to start the copy from the end of the array.

console.log(arr.slice(-1)); // -1 is the last position (arr.length - 1), so its just the last position.

console.log(arr.slice(1, -2)); // b and c. Don't forget that the second parameter is not included.

// We can use the slice method to simply create a shallow copy of the array:

console.log(arr.slice());

// If you remember, we did the exact same thing using the spread operator (note that we create a new array with the []):

console.log([...arr]); // The output is exactly the same, so which of them should we use in order to create a shallow copy of the array? Its about personal preference, the only situation where you really need to use the slice method is when you want to chain multiple methods together, calling them one after another.

// SPLICE() - MUTATE

// The splice method works almost the same way as the slice method. The fundamental difference is that it does actually change the original array.

console.log(arr.splice(2)); // It extracts the same way. c, d, e
console.log(arr); // The extracted elements are now gone (deleted) in the original array, leaving just the remaining. a, b

// Most of the times, we don't really care about the value that the splice method returns (the array with the extracted elements), we use it with the purpose of deleting one or more elements from an array. One of the frequent use cases is to remove the last element of an array. arr.splice(-1)

// The splice method accepts two arguments, the first one to specify the start inclusively, and the second for the delete count (how many elements we want to delete, starting from the first argument position). Let's say that we wanted to delete b and c: arr.splice(1, 2).

// REVERSE() - MUTATE

arr = ["a", "b", "c", "d", "e"]; // Just restoring the array to continue working.

const arr2 = ["j", "i", "h", "g", "f"]; // Say that we have this array with the alphabet in the incorrect order and we want to reverse it.

console.log(arr2.reverse());

console.log(arr2); // This method mutates the original array. Keep in mind that is very important to know which methods mutate the original array, because in certain situations we might not want to mutate the original array.

// CONCAT() - DOESN'T MUTATE

// The concat method is used to concatenate two arrays. Let's create a variable called letters, and letters will be the result of calling the concat method on arr, with arr2 as the argument.

const letters = arr.concat(arr2); // The first array will be the one on which the method is called, and the second array is the one we pass into the concat method.
console.log(letters);

console.log([...arr, ...arr2]); // Remember that we already did something similar with the spread operator, the result is the same and it also don't mutate any of the involved arrays. It's just a question of personal preference.

// JOIN() - DOESN'T MUTATE

console.log(letters.join(" - ")); // We have already talked about this method, it joins the elements of an array , separated by a parameter that we specify, returning a string.

// Remember that we already learn push(), pop(), unshift(), shift(), indexof() and includes()

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// NEW AT METHOD

// There is a new very simple method in ES2022 called at()

// Start by creating a dummy array

const array = [23, 11, 64];

// If we wanted to get one of the values out of the array, the first one, we would traditionally do it like this:

console.log(array[0]);

// Now we can do the exact same thing using a method:

console.log(array.at(0));

// Maybe this doesn't look all too useful, so what's the big advantage of using the method instead of the bracket notation? There is one particularity of the at() method which makes it quite useful to use. To demonstrate, let's say that we now want to get the last element of the array, supposing that we don't know the length of the array:

console.log(array[array.length - 1]); // This would be one of the traditional ways of doing it. Remember that the indexes are zero based but .length gives us the length of the array, which is 3, that's why we need to subtract 1 to get the correct index of the last element.

console.log(array.slice(-1)); // Another way is to use the slice() method to get a copy of the array with the last element (specifying the last position in the argument). Of course we want the value and not a copy of the array that contains it, so we use the bracket notation with position 0.
console.log(array.slice(-1)[0]);

// The at() method makes this process even easier, just by specifying the last index:

console.log(array.at(-1));

// So, with this, should we use the at() or the bracket notation? As always, it depends, if you want to get the last element of an array or basically start counting from the end of an array, you should probably use the at() method. You should also consider the at() method if you want to do something called "method chaining", which we will talk about later in this section. On the other hand, if you just want to quickly get a value from an array, like the first element, you can keep using the bracket notation.

// Finally, the at() method also work on strings:

console.log("Francisco".at(0)); // This gives us the F.

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// FOR EACH METHOD

// In this lesson we will loop over an array using the forEach() method. We already learned to loop over an array using the for of loop, however, the forEach() method is fundamentally different.

// From now on, we will start working with our bank account data, but still in a very simplified way.

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

// Let's say that we wanted to loop over this movements array in order to print a message for each movement in this bank account. The positive numbers are deposits and the negative values are withdrawals, so we can use this to write a message for both cases. Let's start by doing this using the for of loop, so we can compare it later:

console.log("--- FOR OF LOOP ---");

for (const movement of movements) {
  if (movement > 0) {
    console.log(`Deposit of ${movement} euros`);
  } else if (movement < 0) {
    console.log(`Withdrawal of ${Math.abs(movement)} euros`); // We can use this math function in order to get the absolute value instead of having to edit the value to remove the - sign.
  }
}

// This solution works perfectly, but let's see how things can be done using the forEach() method:

console.log("--- FOR EACH METHOD ---");

movements.forEach(function (movement) {
  if (movement > 0) {
    console.log(`Deposit of ${movement} euros`);
  } else if (movement < 0) {
    console.log(`Withdrawal of ${Math.abs(movement)} euros`);
  }
});

// Pay attention to the syntax, the forEach() actually requires a callback function. Technically, forEach() is a higher order function which requires a callback function in order to tell it what to do. It's the forEach() method that will call the callback function at each iteration. In other words, what the forEach() method does is to loop over the array and, in each iteration, it will execute the callback function.

// Also, as the forEach() method calls the callback function in each iteration, it will pass the current element of the array as an argument. We have specified that as movement because that's what we did above, but we can call it anything that we want just like we do with the value in the for of loop.

// In order to be more specific, in the first iteration (iteration 0) it will call the function with the value of 200 - function (200) and so forth. This is important to understand, we tell forEach() that in each iteration it should log one of these strings, basically we give instructions to the method by giving it a callback function that tells (contains the instructions) it what to do in each iteration.

// The forEach() method looks a lot cleaner and is easier to write or read. However each programmer develops his own coding style. However, understand how this method works, specially with the callback function, is still very important for all the other methods that we are going to learn later.

// Let's now learn some more stuff about this method. What if we needed access to a counter variable just like we can access the current index of the array with the for of loop?

// We use .entries() - IMPORTANT

// for (const [index, movement] of movements.entries()) {
//   if (movement > 0) {
//     console.log(`Movement ${index + 1} - Deposit of ${movement} euros`);
//   } else if (movement < 0) {
//     console.log(
//       `Movement ${index + 1} - Withdrawal of ${Math.abs(movement)} euros`
//     );
//   }
// }

// Let's now do the same in the forEach() method. Here is a lot easier to get access to the current index. To understand how it works we need to remember once more that it is the forEach() method who calls the callback function in each iteration.

// As it calls this function, it also passes the current element of the array AND the index AND the entire array that we are looping. Therefore we can specify them in the function parameter. We use the direct names in this example (movement, index and array), however, as we know, the names don't matter. What matters is the ORDER OF THE PARAMETERS, so the first parameter always needs to be the current element, the second always the current index and the third always the entire array. The order is different with .entries(), don't forget.

movements.forEach(function (movement, index, array) {
  if (movement > 0) {
    console.log(`Movement ${index + 1} - Deposit of ${movement} euros`);
  } else if (movement < 0) {
    console.log(
      `Movement ${index + 1} - Withdrawal of ${Math.abs(movement)} euros`
    );
  }
});

// Always keep in mind that in the real world of programming we use shorter names, so index would be i for example.

// Now, when should we use forEach() and when should we use the for off loop? One fundamental difference between them is that you cannot break out of a forEach() loop, the continue and break statements do not work at all. Instead, forEach() will always loop over the entire array and you can't do nothing about it. If you need to break out of a loop, keep using the for of loop, other than that, it just comes down to personal preference.

// At this point it is worth mentioning that you really need to understand the fundamental mechanism or the role of the callback function here because, if you do, working with all other array methods in this section will be really easy.

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// We've learned about the forEach() method on array, let's now see how the method works with maps and sets.

// We are going to start with maps, and for that let's bring the currencies map written above.

// const currencies = new Map([
//   ["USD", "United States dollar"],
//   ["EUR", "Euro"],
//   ["GBP", "Pound sterling"],
// ]);

// Remember that in this array of arrays, each of the array elements (each of the inner arrays) will be one entry of the map (where the first value is the key, and the second one is the value)

// Let's now call the method on currencies, so forEach() and then the callback function with three parameters/arguments. The first will be the current value in the current iteration, the second will be the key and the third the entire map being looped over. This is similar with arrays, remember the order: current element, index, array.

currencies.forEach(function (value, key, map) {
  console.log(`${key}: ${value}`);
});

// Now with a set. Let's create a new set and remember that, between new Set(), we need to place an iterable, so an array in this case.

const currenciesUnique = new Set(["USD", "GPB", "EUR", "GPB", "EUR"]);
// console.log(currenciesUnique); // Check if it just has unique values.

// Let's now call the method on the set, again with the same parameters just to see if actually that makes sense:

// currenciesUnique.forEach(function (value, key, map) {
//   console.log(`${key}: ${value} `);
// });

// As you can see in the log, the key is the exact same thing as the value. This happens because a set doesn't have keys or indexes, so there is no value that would make sense for the key. The only reason that it exists for sets as well is simply because there is no sense of changing the method and cause confusion in developers.

// If we would like to use the last parameter (map), we could simply use the convention _ to specify that the parameter is a throwaway variable (simply not used). We will see this again a bit later.

currenciesUnique.forEach(function (value, _, map) {
  console.log(`${value}: ${value} `);
});
