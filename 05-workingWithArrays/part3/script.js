"use strict";

/////////////////////////////////////////////////
/////////////////////////////////////////////////
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

// Functions

const displayMovements = function (movements, sort = false) {
  containerMovements.innerHTML = "";

  const movs = sort ? movements.slice().sort((a, b) => a - b) : movements;

  movs.forEach(function (mov, i) {
    const type = mov > 0 ? "deposit" : "withdrawal";

    const html = `
      <div class="movements__row">
        <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type}</div>
        <div class="movements__value">${mov}€</div>
      </div>
    `;

    containerMovements.insertAdjacentHTML("afterbegin", html);
  });
};

const calcDisplayBalance = function (acc) {
  acc.balance = acc.movements.reduce((acc, mov) => acc + mov, 0);
  labelBalance.textContent = `${acc.balance}€`;
};

const calcDisplaySummary = function (acc) {
  const incomes = acc.movements
    .filter((mov) => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = `${incomes}€`;

  const out = acc.movements
    .filter((mov) => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumOut.textContent = `${Math.abs(out)}€`;

  const interest = acc.movements
    .filter((mov) => mov > 0)
    .map((deposit) => (deposit * acc.interestRate) / 100)
    .filter((int, i, arr) => {
      // console.log(arr);
      return int >= 1;
    })
    .reduce((acc, int) => acc + int, 0);
  labelSumInterest.textContent = `${interest}€`;
};

const createUsernames = function (accs) {
  accs.forEach(function (acc) {
    acc.username = acc.owner
      .toLowerCase()
      .split(" ")
      .map((name) => name[0])
      .join("");
  });
};
createUsernames(accounts);

const updateUI = function (acc) {
  // Display movements
  displayMovements(acc.movements);

  // Display balance
  calcDisplayBalance(acc);

  // Display summary
  calcDisplaySummary(acc);
};

///////////////////////////////////////
// Event handlers
let currentAccount;

btnLogin.addEventListener("click", function (e) {
  // Prevent form from submitting
  e.preventDefault();

  currentAccount = accounts.find(
    (acc) => acc.username === inputLoginUsername.value
  );
  console.log(currentAccount);

  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    // Display UI and message
    labelWelcome.textContent = `Welcome back, ${
      currentAccount.owner.split(" ")[0]
    }`;
    containerApp.style.opacity = 100;

    // Clear input fields
    inputLoginUsername.value = inputLoginPin.value = "";
    inputLoginPin.blur();

    // Update UI
    updateUI(currentAccount);
  }
});

btnTransfer.addEventListener("click", function (e) {
  e.preventDefault();
  const amount = Number(inputTransferAmount.value);
  const receiverAcc = accounts.find(
    (acc) => acc.username === inputTransferTo.value
  );
  inputTransferAmount.value = inputTransferTo.value = "";

  if (
    amount > 0 &&
    receiverAcc &&
    currentAccount.balance >= amount &&
    receiverAcc?.username !== currentAccount.username
  ) {
    // Doing the transfer
    currentAccount.movements.push(-amount);
    receiverAcc.movements.push(amount);

    // Update UI
    updateUI(currentAccount);
  }
});

btnLoan.addEventListener("click", function (e) {
  e.preventDefault();

  const amount = Number(inputLoanAmount.value);

  if (
    amount > 0 &&
    currentAccount.movements.some((mov) => mov >= amount * 0.1)
  ) {
    // Add movement
    currentAccount.movements.push(amount);

    // Update UI
    updateUI(currentAccount);
  }
  inputLoanAmount.value = "";
});

btnClose.addEventListener("click", function (e) {
  e.preventDefault();

  if (
    inputCloseUsername.value === currentAccount.username &&
    Number(inputClosePin.value) === currentAccount.pin
  ) {
    const index = accounts.findIndex(
      (acc) => acc.username === currentAccount.username
    );
    console.log(index);
    // .indexOf(23)

    // Delete account
    accounts.splice(index, 1);

    // Hide UI
    containerApp.style.opacity = 0;
  }

  inputCloseUsername.value = inputClosePin.value = "";
});

let sorted = false;
btnSort.addEventListener("click", function (e) {
  e.preventDefault();
  displayMovements(currentAccount.movements, !sorted);
  sorted = !sorted;
});

/////////////////////////////////////////////////
/////////////////////////////////////////////////
/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

const currencies = new Map([
  ["USD", "United States dollar"],
  ["EUR", "Euro"],
  ["GBP", "Pound sterling"],
]);

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/*


    More ways of creating and filling arrays.

    The last thing that we're gonna learn in this section is how to programmatically create and fill arrays


*/

// So far we have only created arrays like this, literally writing them out by hand:

console.log([1, 2, 3, 4, 5, 6, 7]);

// Or like this, using the new Array constructor and passing the numbers as arguments (no square brackets).

console.log(new Array(1, 2, 3, 4, 5, 6, 7));

// Basically, in these cases we already have all data, which allows us to manually create these arrays. However, we can also generate arrays programmatically, so without having to define all the items manually.

// There are many situations in which this is necessary, so there are multiple ways of doing it.

// The easiest one is to, again, use the new array constructor function. Let's use it and pass only one argument.

const x = new Array(7);
console.log(x); // We might think that this is going to create an array with only one element (7). But actually that doesn't happen, instead it creates a new array with seven empty elements, containing nothing.

// The output is very weird, and the reason for that is the behavior of the new array function. When we only pass in one argument, it creates a new empty argument with that length. It is important to know this behavior because it can lead to weird ERRORS.

// Also, we cannot use this x array for anything, for example we cannot call the map() method on it to fill it up. If we try to put something in each element like 5,

x.map(() => 5); // Nothing happens if you log it to the console.

// This is not very useful except for one thing, because there is one method that we can call on this empty array, which is fill(). All we need to do is use fill() and pass in a value that will fill the entire array (with this specific value).

// This method actually MUTATES THE ORIGINAL/UNDERLYING ARRAY.

// x.fill(1);
// console.log(x);

// This method is actually similar to the slice() method. Besides the value that we want to fill the array with (first parameter), we can also specify where we want to start to fill (second parameter), and where we want to end exclusively (third parameter).

x.fill(1, 3, 5);
console.log(x);

// We can also use the fill() on other arrays, it doesn't have to be an empty array.

const arr = [1, 2, 3, 4, 5, 6, 7];
arr.fill(1, 3, 5);
console.log(arr);

// The fill method can be useful sometimes, however, what if we actually wanted to programmatically recreate the array from our first example? [1, 2, 3, 4, 5, 6, 7]

// We can use the Array.from() function. This is completely NEW. We are NOT using the .from as a method on an array, instead, we are using it in the Array constructor (the Array constructor is the same as in new Array). Array is a function, and on this function we call the from() method. We will make this more clear in the OPP section.

// To make this more easy to understand, let's first recreate the array with seven (1). In the from method, we can first pass in an object with the length property. The second argument is a mapping function, exactly like the callback function that we pass into the map method. In this case we don't even need arguments (current, index) because we only want to 1 in each element.

const y = Array.from({ length: 7 }, () => 1);
console.log(y); // This is a lot cleaner than using the weird new Array behavior together with the fill() method.

// Now to recreate the [1, 2, 3, 4, 5, 6, 7] array:

const p = Array.from({ length: 7 }, (current, i) => (current = i + 1)); // Remember that we should use _ to define variables that we don't need in the function parameters. In this example we needed the index, so we first must define the current element to get it, in real life situations we use the _ for this.
console.log(p);

// This is how we create arrays programmatically, the use cases for this is, for example, to create an array with 100 random dice rolls:

const diceRandom = Array.from(
  { length: 100 },
  (current, i) => (current = Math.trunc(Math.random() * 6) + 1)
);
// console.log(diceRandom);

// Let's now see a more real use case of the Array.from function. This function was initially introduced into javascript in order to create arrays from array like structures. Remember how we talked about so-called iterables before (strings, maps or sets), they can be converted to real arrays using array.from().

// That's the reason also for the name of the function, because we can create arrays from other things. Besides these obvious iterables that we just mentioned, another great example of an array like structure is the result of using querySelectorAll. Remember that querySelectorAll returns something called NodeList, which is something like an array that contains all the selected elements.

// Something like an array is not a real array, so it doesn't have methods like map() or reduce() for example. If we actually wanted to use a real array method like that on a NodeList, we would first need to convert the NodeList to an array. For that, Array.from() is perfect.

// Let's say that we do not have the movements of our application stored in an array. Pretend that we only have the values of the movements stored in the user interface, but we do not have them somewhere in the code.

// Say that we want to calculate their sum. Therefore, we need to somehow get them first from the user interface and then do the calculation based on that.

// document.querySelectorAll(".movements__value").map() DON'T WORK - NOT A REAL ARRAY.

// const movementsUI = Array.from(document.querySelectorAll(".movements__value"));
// console.log(movementsUI);

// Like this we only get two elements, which are the ones that are already in the user interface by the time that we load the script (When we load the script, the two values are the ones that are on the html), and not the seven that are loaded from the account object.

// If we actually want to select those elements we have to do the code in some event handler (because the user is already logged in and by clicking somewhere we can go get the elements that we want). Let's use the balance label to perform this action.

labelBalance.addEventListener("click", function () {
  // WORKS BUT THERE IS A BETTER WAY
  // const movementsUI = Array.from(
  //   document.querySelectorAll(".movements__value")
  // ).map((current) => current.textContent.replace("€", ""));

  // USING THE MAP CALLBACK AS THE SECOND ARGUMENT OF Array.from() and convert to number
  const movementsUI = Array.from(
    document.querySelectorAll(".movements__value"),
    (current) => Number(current.textContent.replace("€", ""))
  );

  // We could convert to an array like this, but then we would have to do the mapping separately:
  // const movementsUI2 = [...document.querySelectorAll(".movements__value")];

  console.log(movementsUI); // Use this to understand better why we ordered the elements like we did in previous lectures.
});

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/*

  Which array method to use? 

    Since the beginning of the course, we have studied 23 different array methods exactly.

    This means that you can now do everything you can imagine with arrays, the problem is that choosing between 23 different array methods is not always easy.

To help figure out which method to use in each situation, you should start by asking the question what do i actually want from this method?

Use the pdf from the lectures to check all of them and use it as a template.

*/

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Array methods practice.

// 1 - Calculate how much as been deposited in total in the bank.

const bankDepositSum = accounts
  .flatMap((account) => account.movements)
  .filter((current) => current > 0)
  .reduce((acc, current) => acc + current, 0);

console.log(bankDepositSum);

// 2 - Count how many deposits there have been in the bank with at least 1000.

const numDeposits1000 = accounts
  .flatMap((account) => account.movements)
  .filter((current) => current >= 1000).length;

console.log(numDeposits1000);

const numDeposits1000Reduce = accounts
  .flatMap((account) => account.movements)
  .reduce((count, current) => {
    if (current >= 1000) count++;
    return count;
  }, 0); // The initial value zero is like the outside variable of a loop where we keep storing a new value. It can also be a position [0] READ MORE ABOUT THE REDUCE()
console.log(numDeposits1000Reduce);

const numDeposits1000ReduceTernary = accounts
  .flatMap((account) => account.movements)
  .reduce(
    (count, current) => (current >= 1000 ? count++ /* ++count */ : count),
    0
  );
console.log(numDeposits1000ReduceTernary);

// IMPORTANT - First, it is necessary to, once again, say that you need to explore the potential of the reduce method. The accumulator can have several functionalities and, the initial value is also extremely important. Second, as you can see, when using an if else statement, the count++ works normally, however, when using the ternary operator the result is 0. This happens because the ++ operator does actually increase the value but returns the previous one, which in this case is zero. In the if else statement we return the final value of the count, however, in the ternary operator we return at each iteration, so we always return zero. The solution is to use the prefixed ++ operator (writing it BEFORE THE OPERAND)

// 3 - IMPORTANT EXERCISE - A more advanced use case of the reduce method. Create a new object instead of returning just a number (it can be a new array or a new string). This means that we can use reduce to replace many of the other methods that we've studied before. Create an object which contains the sum of the deposits and of the withdrawals. Basically, we want to calculate these two sums in one go using the reduce method.

const sums = accounts
  .flatMap((account) => account.movements)
  .reduce(
    (sums, current) => {
      // Here, the object that we defined in the initial value is the sums (accumulator)

      // current > 0 ? ++sums.deposits : ++sums.withdrawals; // The number of deposits and withdrawals

      // current > 0 ? (sums.deposits += current) : (sums.withdrawals += current); // The sum of the deposits and withdrawals.

      // A more refactored code:

      sums[current > 0 ? "deposits" : "withdrawals"] += current;

      return sums; // REMEMBER that we always need to return the accumulator. This is a code block, so that doesn't happen implicitly as before.
    },
    { deposits: 0, withdrawals: 0 } // This is the initial value of the accumulator.
  );

console.log(sums);

// What is new in this exercise is the work we do with the initial value. There is where we define if we want an array or an object and also the keys that we want to use.

/*
We could destructure the object right at the beginning and log the values directly:

const {deposits, withdrawals} = accounts
  .flatMap((account) => account.movements)
  .reduce(
    (sums, current) => {
      
      sums[current > 0 ? "deposits" : "withdrawals"] += current;

      return sums;
    },
    { deposits: 0, withdrawals: 0 }

    );

    console.log(deposits, withdrawals)
*/

// Recreation of the previous with arrays:

const sumsArray = accounts
  .flatMap((account) => account.movements)
  .reduce(
    (acc, current) => {
      current > 0 ? (acc[0] += current) : (acc[1] += current);

      return acc;
    },
    [0, 0]
  );
console.log(sumsArray);

// Nothing to do with the accounts object. Create a simple function to convert any string to a title case (all the words in a sentence are capitalized except for some of them)

// this is a nice title -> This Is a Nice Title

const convertTitleCase = function (str) {
  const exceptions = ["a", "an", "the", "and", "but", "or", "on", "in", "with"];
  let titleCase = str
    .toLowerCase()
    .split(" ")
    .map((current) => {
      if (exceptions.includes(current)) {
        return current;
      } else {
        const remainingLetters = current.slice(1);
        return current[0].toUpperCase() + remainingLetters;
      }
    })
    .join(" ");

  console.log(titleCase);
};

// The solution from the course used the ternary operator to make the condition and stored the capitalization into a function, so it could be called with the current value and with the title case variable at the end (to avoid the strings that started with an exception, like "and"). That way it always capitalize the first word of every string:

const convertTitleCaseCourse = function (title) {
  const capitalize = (str) => str[0].toUpperCase() + str.slice(1);

  const exceptions = ["a", "an", "and", "the", "but", "or", "on", "in", "with"];

  const titleCase = title
    .toLowerCase()
    .split(" ")
    .map((word) => (exceptions.includes(word) ? word : capitalize(word)))
    .join(" ");

  return capitalize(titleCase);
};

convertTitleCase("HIOhflkhds sld is on with or ims UFOFU fj but");
convertTitleCase("this is a LONG title but not too long");
console.log(convertTitleCaseCourse("this is a nice title"));
console.log(
  convertTitleCaseCourse("and here is another title with an EXAMPLE")
);

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Coding Challenge #4

/* 
Julia and Kate are still studying dogs, and this time they are studying if dogs are eating too much or too little.
Eating too much means the dog's current food portion is larger than the recommended portion, and eating too little is the opposite.
Eating an okay amount means the dog's current food portion is within a range 10% above and 10% below the recommended portion (see hint).

1. Loop over the array containing dog objects, and for each dog, calculate the recommended food portion and add it to the object as a new property. Do NOT create a new array, simply loop over the array. Formula: recommendedFood = weight ** 0.75 * 28. (The result is in grams of food, and the weight needs to be in kg)
2. Find Sarah's dog and log to the console whether it's eating too much or too little. HINT: Some dogs have multiple owners, so you first need to find Sarah in the owners array, and so this one is a bit tricky (on purpose) 🤓
3. Create an array containing all owners of dogs who eat too much ('ownersEatTooMuch') and an array with all owners of dogs who eat too little ('ownersEatTooLittle').
4. Log a string to the console for each array created in 3., like this: "Matilda and Alice and Bob's dogs eat too much!" and "Sarah and John and Michael's dogs eat too little!"
5. Log to the console whether there is any dog eating EXACTLY the amount of food that is recommended (just true or false)
6. Log to the console whether there is any dog eating an OKAY amount of food (just true or false)
7. Create an array containing the dogs that are eating an OKAY amount of food (try to reuse the condition used in 6.)
8. Create a shallow copy of the dogs array and sort it by recommended food portion in an ascending order (keep in mind that the portions are inside the array's objects)

HINT 1: Use many different tools to solve these challenges, you can use the summary lecture to choose between them 😉
HINT 2: Being within a range 10% above and below the recommended portion means: current > (recommended * 0.90) && current < (recommended * 1.10). Basically, the current portion should be between 90% and 110% of the recommended portion.

GOOD LUCK 😀
*/

// TEST DATA:

const dogs = [
  { weight: 22, curFood: 250, owners: ["Alice", "Bob"] },
  { weight: 8, curFood: 200, owners: ["Matilda"] },
  { weight: 13, curFood: 275, owners: ["Sarah", "John"] },
  { weight: 32, curFood: 340, owners: ["Michael"] },
];

// Variables:
// const eatingTooLittle = currentDog.curFood < currentDog.recommendedFood * 0.9;
// const eatingNormal =
//   currentDog.curFood > currentDog.recommendedFood * 0.9 &&
//   currentDog.curFood < currentDog.recommendedFood * 1.1;
// const eatingTooMuch = currentDog.curFood > currentDog.recommendedFood * 1.1;

// 1

dogs.forEach((currentDog) => {
  currentDog.recommendedFood = Math.trunc(currentDog.weight ** 0.75 * 28); // ** is elevate to 0.75.
});

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// 2

const SarahDog = dogs.find((current) =>
  current.owners.find((current) => current === "Sarah")
);
console.log(SarahDog);
if (
  SarahDog.curFood > SarahDog.recommendedFood * 0.9 &&
  SarahDog.curFood < SarahDog.recommendedFood * 1.1
) {
  console.log("Eating normally");
} else if (SarahDog.curFood > SarahDog.recommendedFood * 1.1) {
  console.log("Too much");
} else console.log("Too little");

// Solution from the course:

const dogSarah = dogs.find((current) => current.owners.includes("Sarah")); // The output is the same, because the find method just needs to receive a condition to retrieve the element when is true. I made another condition with the find method, but it was unnecessary because the includes method already returns the result of the evaluation.

console.log(
  `Sarah's dog is eating ${
    dogSarah.curFood > dogSarah.recommendedFood ? "too much" : "too little"
  }`
); // He made a template string to log to the console.

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// 3 - Check the course solution to see the differences, although the output is correct, the differences are plausible to acknowledge:

const ownersEatTooMuch = dogs
  .map((current, i) => current.curFood > current.recommendedFood)
  .filter((current) => current !== undefined) // This was necessary because we didn't use filter at the beginning, so the map method pushed all the elements to the new array. I changed this one to see the difference when studying.
  .flat();

const ownersEatTooLittle = dogs
  .map((current, i) => {
    const eatingTooLittle = current.curFood < current.recommendedFood;

    if (eatingTooLittle) return current.owners;
  })
  .filter((current) => current !== undefined)
  .flat();
console.log(ownersEatTooMuch);
console.log(ownersEatTooLittle);

// Solution from the course:

const ownersEatTooMuchLesson = dogs
  .filter((current) => current.curFood > current.recommendedFood)
  .flatMap((current) => current.owners);
console.log(ownersEatTooMuchLesson);

const ownersEatTooLittleLesson = dogs
  .filter((current) => current.curFood < current.recommendedFood)
  .flatMap((current) => current.owners);
console.log(ownersEatTooLittleLesson);

// We use filter first because we want the new array to have just the dogs that eat too much. Then we use map to create a new array with the owners, with the same length as the previous, but just with that information. Then we just use flat.

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// 4

const strMuch = ownersEatTooMuch.join(" and ") + "'s dogs eat too much!";
console.log(strMuch);

const strLittle = ownersEatTooLittle.join(" and ") + "'s dogs eat too little!";
console.log(strLittle);

// Solution from the course:

console.log(`${ownersEatTooMuchLesson.join(" and ")}'s dogs eat too much!`);
console.log(`${ownersEatTooLittleLesson.join(" and ")}'s dogs eat too little!`);

// Template string again, but the principle is the same in this one.

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// 5

const exactly = dogs.some(
  (current) => current.curFood === current.recommendedFood
);
console.log(exactly);

// Solution from the course:

console.log(
  dogs.some((current) => current.curFood === current.recommendedFood)
);

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// 6
let eatingOkArray = []; // 7

const okay = dogs.some((current, i, arr) => {
  const eatingNormal =
    current.curFood > current.recommendedFood * 0.9 &&
    current.curFood < current.recommendedFood * 1.1;

  if (current && eatingNormal) eatingOkArray.push(current); // 7
  return eatingNormal;
});

console.log(okay);

// By reusing the condition he meat to store it into a variable, i managed to use the same method chaining to push the dogs eating ok into the array.

// Solution from the course:

console.log(
  dogs.some(
    (current) =>
      current.curFood > current.recommendedFood * 0.9 &&
      current.curFood < current.recommendedFood * 1.1
  )
);

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// 7
console.log(eatingOkArray);

// Solution from the course:

const checkEatingOk = (current) =>
  current.curFood > current.recommendedFood * 0.9 &&
  current.curFood < current.recommendedFood * 1.1;

const eatingOkArrayCourse = dogs.filter(checkEatingOk);
console.log(eatingOkArrayCourse);

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// 8

const dogsSorted = dogs
  .slice()
  .sort((a, b) => a.recommendedFood - b.recommendedFood);
console.log(dogsSorted);

// The solution from the course is the same. Remember that you can hover on the parameters to find out information. Also, the trick here is to use the adequate methods for the task, use the template provided in the course material.
