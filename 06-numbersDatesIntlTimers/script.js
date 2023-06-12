"use strict";

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

/////////////////////////////////////////////////
// Data

// Start with the lectures.
// DIFFERENT DATA! Contains movement dates, currency and locale

const account1 = {
  owner: "Jonas Schmedtmann",
  movements: [200, 455.23, -306.5, 25000, -642.21, -133.9, 79.97, 1300],
  interestRate: 1.2, // %
  pin: 1111,

  movementsDates: [
    "2022-11-18T21:31:17.178Z",
    "2022-12-23T07:42:02.383Z",
    "2023-01-28T09:15:04.904Z",
    "2023-04-01T10:17:24.185Z",
    "2023-05-08T14:11:59.604Z",
    "2023-05-27T17:01:17.194Z",
    "2023-07-11T23:36:17.929Z",
    "2023-07-12T10:51:36.790Z",
  ],
  currency: "EUR",
  locale: "pt-PT", // de-DE
};

const account2 = {
  owner: "Jessica Davis",
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,

  movementsDates: [
    "2019-11-01T13:15:33.035Z",
    "2019-11-30T09:48:16.867Z",
    "2019-12-25T06:04:23.907Z",
    "2020-01-25T14:18:46.235Z",
    "2020-02-05T16:33:06.386Z",
    "2020-04-10T14:43:26.374Z",
    "2020-06-25T18:49:59.371Z",
    "2020-07-26T12:01:20.894Z",
  ],
  currency: "USD",
  locale: "en-US",
};

const accounts = [account1, account2];

/////////////////////////////////////////////////
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

/////////////////////////////////////////////////
// Functions

// Displaying days passed since the movement arranged from the course so you can see the difference.

const formatMovementsDate = function (date) {
  const calcDaysPassed = (date1, date2) =>
    Math.round(Math.abs((date1 - date2) / (1000 * 60 * 60 * 24)));

  const daysPassed = calcDaysPassed(date, new Date());

  if (daysPassed === 0) return "Today";
  if (daysPassed === 1) return "Yesterday";
  if (daysPassed <= 7) return `${daysPassed} days ago`;
  else {
    const day = `${date.getDate()}`.padStart(2, "0");
    const month = `${date.getMonth() + 1}`.padStart(2, "0"); // Zero based
    const year = date.getFullYear();
    const displayDate = `${day}/${month}/${year}`;
  }
};
// 3 - Besides the movements, we also want to display the dates of these movements, but we have a problem because we are only passing the movements array itself, so the best thing to do is to pass the entire object, just like we have done with the other functions (seems to me that it is always the best option). Don't forget that if we need to change the parameter of a function, we also need to change the function calls, in this case the displayMovements is the only one left.

const displayMovements = function (acc, sort = false) {
  containerMovements.innerHTML = "";

  const movs = sort
    ? acc.movements.slice().sort((a, b) => a - b)
    : acc.movements;

  movs.forEach(function (mov, i) {
    const type = mov > 0 ? "deposit" : "withdrawal";

    // 3.1 - Now we need to add the date html element to the html as we loop through the movements array. So, after the type. Then we need to create a new date for each of the movementDates array, we have the index, so this allows us to loop over another array while we call the forEach method on movements. We store it into a variable so we can call the methods after into other variables (use the ones that we created previously).

    const date = new Date(acc.movementsDates[i]);
    const day = `${date.getDate()}`.padStart(2, "0");
    const month = `${date.getMonth() + 1}`.padStart(2, "0"); // Zero based
    const year = date.getFullYear();
    const displayDate = `${day}/${month}/${year}`;

    // Displaying days passed since the movement:

    const calcDaysPassed = (date1, date2) =>
      Math.round(Math.abs((date1 - date2) / (1000 * 60 * 60 * 24)));
    const displayDate2 = calcDaysPassed(date, new Date());

    const html = `
      <div class="movements__row">
        <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type}</div>

     <div class="movements__date">${displayDate} so ${displayDate2} day${
      displayDate2 > 1 ? "'s" : ""
    } ago.</div>

        <div class="movements__value">${mov.toFixed(2)}€</div> 
      </div>
    `; // 2 - toFixed method on the movements

    containerMovements.insertAdjacentHTML("afterbegin", html);
  });
};

const calcDisplayBalance = function (acc) {
  acc.balance = acc.movements.reduce((acc, mov) => acc + mov, 0);
  labelBalance.textContent = `${acc.balance.toFixed(2)}€`; // 2 - toFixed method on the balance
};

const calcDisplaySummary = function (acc) {
  const incomes = acc.movements
    .filter((mov) => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = `${incomes.toFixed(2)}€`; // 2 - toFixed method on the in

  const out = acc.movements
    .filter((mov) => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumOut.textContent = `${Math.abs(out).toFixed(2)}€`; // 2 - toFixed method on the out

  const interest = acc.movements
    .filter((mov) => mov > 0)
    .map((deposit) => (deposit * acc.interestRate) / 100)
    .filter((int, i, arr) => {
      // console.log(arr);
      return int >= 1;
    })
    .reduce((acc, int) => acc + int, 0);
  labelSumInterest.textContent = `${interest.toFixed(2)}€`; // 2 - toFixed method on the interest
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
  displayMovements(acc);

  // Display balance
  calcDisplayBalance(acc);

  // Display summary
  calcDisplaySummary(acc);
};

// LOG OUT

const startLogOutTimer = function () {
  // Set the time to 5 minutes

  let time = 10;

  // Call the timer every second
  // The first time that this function is called it only starts after one second and we want to call it immediately. The trick is to export this code into a separate function, then call it immediately and start calling it every second using the set interval function. Compare with the code from the lessons.
  const timer = setInterval(() => {
    // Convert the number of seconds to minutes and seconds
    const minutes = String(Math.trunc(time / 60)).padStart(2, 0);
    const seconds = String(time % 60).padStart(2, 0);

    // In each call, print the remaining time in the UI

    labelTimer.textContent = `${minutes}:${seconds}`;

    // When 0 seconds, stop timer

    if (time === 0) {
      clearInterval(timer);
      // and log out user
      labelWelcome.textContent = "Log in to get started";
      containerApp.style.opacity = 0;
    }
    // Decrease one second at every function call(the set interval is called 1000), we need to put it here so we don't get logged at second 1.

    time--;
  }, 1000);

  // NOTICE that whenever we reload the page the timer starts at one second, the value where we've stopped at the first call.
};

///////////////////////////////////////
// Event handlers
let currentAccount;

// 1 - FAKE ALWAYS LOGGED IN.
// currentAccount = account1;
// updateUI(currentAccount);
// containerApp.style.opacity = 100;
// Now jonas account is always logged in.

// 2
// const now = new Date();
// // labelDate.textContent = now; // The result is not exactly what we want. We only want the day, the month and the year in the format day/month/year. So we need to create variables to build a nice string (IMPORTANT - to improve the display, whenever the day and the month only have one digit, we want to add a zero to the beginning, however, to use padStart(), we need to make a template literal):

// const day = `${now.getDate()}`.padStart(2, "0");
// const month = `${now.getMonth() + 1}`.padStart(2, "0"); // Zero based
// const year = now.getFullYear();
// const hour = now.getHours();
// const min = now.getMinutes();
// labelDate.textContent = `${day}/${month}/${year}, ${hour}:${min}`;

// EXPERIMENTING API BEFORE LOGIN

const now = new Date(); // First we create a new date to be displayed in the labelDate text content.

// 2
const options = {
  hour: "numeric",
  minute: "numeric",
  second: "numeric",
  day: "numeric",
  month: "long",
  year: "numeric",
  weekday: "narrow",
};

// 3
const locale = navigator.language; // We just need to replace the first argument of Intl.DateTimeFormat with locale, i'm leaving it like this to remember.
// console.log(locale);

labelDate.textContent = new Intl.DateTimeFormat("mt", options).format(now); // We use the api to format now. Intl.DateTimeFormat("en-US") creates a new formatter and with the .format() method we pass the date that we want to format. Each format displays the date differently.

// 2 - This is the most straightforward way of formatting dates and times, but we can take it to the next level and add some options to also customize this a little. Notice that it only displays the date and not any time, we can change this by providing an options object to the dateTimeFormat function (passing it as the second argument). The hour and minute get's displayed, however the date is gone, this happens because the date properties must by inside of the object too. Numeric for numbers and long for letters (short and narrow also).

// 3 - In many situations it makes more sense to not specify the locale manually, but instead simply get it from the user's browser.

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

    // Besides the welcome message, we also want to create the current date and time.
    const now = new Date();
    /*
    THIS CODE TEACHES TO CREATE THE DATE MANUALLY:

    const day = `${now.getDate()}`.padStart(2, "0");
    const month = `${now.getMonth() + 1}`.padStart(2, "0"); // Zero based
    const year = now.getFullYear();
    const hour = `${now.getHours()}`.padStart(2, "0");
    const min = `${now.getMinutes()}`.padStart(2, "0");
    labelDate.textContent = `${day}/${month}/${year}, ${hour}:${min}`;
*/

    // THIS CODE IMPLEMENTS THE DATE WITH THE API
    const options = {
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
      day: "numeric",
      month: "long",
      year: "numeric",
      weekday: "short",
    };
    // const locale = navigator.language; - Instead of using the locale that comes from the browser, we are using the locale specified in each account.

    // It works, it is obvious that our entire ui is written in english and the date is displayed in portuguese for jonas account. To correct this we would have to change the month to numeric and get rid of the weekday. Leaving it like this as a reminder.

    labelDate.textContent = new Intl.DateTimeFormat(
      currentAccount.locale,
      options
    ).format(now);

    // Clear input fields
    inputLoginUsername.value = inputLoginPin.value = "";
    inputLoginPin.blur();

    // Start logout timer

    startLogOutTimer();

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

    // 4 - Add transfer date
    currentAccount.movementsDates.push(new Date().toISOString());
    // - Add transfer date to the receiver
    receiverAcc.movementsDates.push(new Date().toISOString());

    // Update UI
    updateUI(currentAccount);
  }
});

btnLoan.addEventListener("click", function (e) {
  e.preventDefault();

  // const amount = Number(inputLoanAmount.value); // 1 - Rounding the loan amount. Here we needed to convert the input into a number, however, as we've learned, the math methods do type coercion, so:

  const amount = Math.floor(inputLoanAmount.value); // Using floor because we want to round any value down. 150.53 will be 150.

  if (
    amount > 0 &&
    currentAccount.movements.some((mov) => mov >= amount * 0.1)
  ) {
    setTimeout(function () {
      // Timer
      // Add movement
      currentAccount.movements.push(amount);

      // 4 - Add loan date
      currentAccount.movementsDates.push(new Date().toISOString());

      // Update UI
      updateUI(currentAccount);
    }, 4000);
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
  displayMovements(currentAccount, !sorted);
  sorted = !sorted;
});

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// LECTURES

/*

    Lecture: converting and checking numbers.

    The first thing that you should know is that, in javascript, all numbers are represented internally as floating point numbers. Basically, always as decimals, no matter if we write them as integers or as decimals:

*/

// The first thing that you should know is that, in javascript, all numbers are represented internally as floating point numbers. Basically, always as decimals, no matter if we write them as integers or as decimals:

console.log(23 === 23.0); // True. This is the reason why we only have one data type for all numbers.

// Also, numbers are represented internally in a 62 base 2 format, which means that numbers are always stored in a binary format. In this binary form, it is very hard to represent some fractions that are easy to represent in the base 10 system that we are used to.

// Base 10 - 0 to 10 ; Base 2 - 0 to 1

// As said, there are numbers very difficult to represent in base 2, like the fraction 0.1. That results in very weird outputs like this:

console.log(0.1 + 0.2); // 0.30000000000000004

// This is kind of a classic joke in javascript because the result should be 0.3. But javascript simply don't have a better way of representing this number.

// So, in base 10, 1/10 is simply 0.1. This is very easy to represent, however, if we were trying to do 3/10, that is also impossible to represent for us because it would be 3.33333 to infinity. In binary, the same thing happens with 0.1.

// In some cases, javascript does some rounding behind the scenes to try at its best to hide these problems, but some operations (0.1 + 0.2) simply cannot mask the fact that it cannot represent certain fractions. Many other languages use the same system, like php or ruby, we just have to accept that it works this way because we cannot do anything against this.

// Be aware that you cannot do really precise, scientific or financial calculations in javascript because you can run into problems like this:

console.log(0.1 + 0.2 === 0.3); // false

// Now that we know how javascript represents numbers, let's go back to actually working with them. We know how to convert a string to a number:

console.log(Number("1988"));

// But there is an easier way of doing it, which is to plus 23 the string:

console.log(+"23"); // Because when javascript sees the plus operator it will do type coercion, automatically converting all the operands to numbers. The code looks a lot cleaner.

// What we did was conversion, but we can also do something called parsing. We can parse a number from a string. The Number object has some methods to do parsing.

// PARSEINT()

console.log(Number.parseInt("30px")); // Javascript will automatically figure out the number that is in this string. In order to make this work, the string needs to start with a number

console.log(Number.parseInt("er30px")); // NaN

// This can be useful when we get some kind of unit from css and need to get rid of that unit.

// The parseInt() accepts a second argument, which is called radix. The radix is the base of the numeral system that we are using. Most of the times we use the base 10, so we place 10 as the second argument, but, if we are working with binary we would have to write 2:

Number.parseInt("er30px", 10);

// PARSEFLOAT() - BEST FOR WHENEVER WE NEED TO READ A VALUE OUT OF A STRING.

console.log(Number.parseFloat("     2.4rem     ")); // Same thing with floats (reads the decimal numbers). If we use parseInt we just get 2.

// Both of these methods are also global functions, so we didn't have to call them on number - (parseFloat("     2.4rem     "); also works. But this is the old school way of doing it, in modern javascript is more encouraged to call these functions on the number object.

// ISNAN()

// Is not a number can be used to check if any value is a number (not any value, but more on that later). This method is confusing, go through the logs to see why.

// When we use the number object (function) on data that cannot be converted to a number, the number function will return NaN, this can happen with string data or undefined data:

console.log(Number("Francisco")); // NaN
console.log(Number(undefined)); // NaN

// With booleans, the number function will return 0 if false and 1 if true:

console.log(Number(true)); // 1
console.log(Number(false)); // 0

// The Number.isNaN() method determines whether the passed value is NaN AND also if that value passed to it is the number data type. This means passing a value to the Number.isNaN() method that is NOT a number data type returns false, which can be confusing:

console.log(Number.isNaN("Francisco")); // Clearly this string is NaN, but it returns false.

// However, the global .isNaN() function only determines if the value is NaN or not, it does not check if the value is number data type.

console.log(isNaN("Francisco"));

// IS FINITE() - BEST WAY OF CHECKING IF A VALUE IS A NUMBER.

// Dividing a number by zero gives us infinity in javascript, it is something that is not allowed in mathematics - keep in mind.

// There is a better method of evaluating if something is a number or not (besides global isNaN()), it is called .isFinite().

console.log(Number.isFinite(20.2)); // true
console.log(Number.isFinite("Francisco")); // false

// ISINTEGER()
console.log(Number.isInteger(2.3)); // false

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/*

    Lecture: Math and rounding.

    Let's learn some more mathematical operations and also about rounding numbers.

    This is a overview of the keywords and respective functionalities that are part of the Math function.

*/

// SQUARE AND CUBIC ROOT.

// Let's start with the square root. Just like many other functions, the square root is part of the math namespace.

console.log(Math.sqrt(25));

// The same could be achieved using the exponentiation operator as well (elevado a).

console.log(25 ** (1 / 2)); // We want the square root, so we use 1/2 (two being the square)

console.log(8 ** (1 / 3)); // This works to for the cubic root too (just use 3 instead)

console.log(Math.cbrt(8)); // Or we can use the cbrt on the math function.

// MIN AND MAX VALUES.

// How to get the min and max value out of a couple of values

console.log(Math.max(2, 34, 53, 66, 36, 80, 4)); // Max

console.log(Math.min(2, 34, 53, 66, 36, 80, 4)); // Min

// Both the max and min functions do type coercion, but none of the does parsing:

console.log(Math.max(2, 34, 53, 66, 36, "80", 4)); // Max - still get the 80 as a number.

console.log(Math.min("2", 34, 53, 66, 36, 80, 4)); // Min - still get the 2 as a number.

console.log(Math.max(2, 34, 53, 66, 36, "80px", 4)); // Max - No parsing, returns NaN.

console.log(Math.min("2px", 34, 53, 66, 36, 80, 4)); // Min - No parsing, returns NaN.

// There are a couple of methods that are also constants on the math namespace. Check them at https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math

// For example if we wanted to calculate the radius of a circle with 10px we could do it like this:

console.log(Math.PI); // Pi number (constant)
console.log(Math.PI * Number.parseFloat("10px") ** 2);

// RANDOM NUMBERS

// More specifically the random() function. It is very important to be able to generate good random numbers when we need them, use this to review what we've learned with the dice rolls.

console.log(Math.random()); // Random number between 0 and 1 (exclusively)
console.log(Math.random() * 6); // Multiply by the number of dice faces
console.log(Math.trunc(Math.random() * 6) + 1); // Trunc (remove the decimal part) the result and add 1 because, otherwise, the highest number would be 5.

// Let's now generalize this formula so that we can use it from now on to always generate random integers between two values.

function getRandomNumber(min, max) {
  return Math.trunc(Math.random() * (max - min + 1)) + min;
}

const randomInt = (min, max) =>
  Math.trunc(Math.random() * (max - min + 1)) + min;

// Math.random() gives us a number between 0 and 1 (1 exclusively) right? So, if we multiply this by max - min, we get a number between 0 and max - min (exclusively). In order for min - max to be included we add 1, remember the dice example. You can think of this part as finding the minimum value.

// At the end, if we add min to the calculation we get the maximum value.

console.log(randomInt(10, 20));

// ROUNDING INTEGERS

console.log(Math.trunc(34.55)); // We already been using .trunc(), what this does is to simply remove any decimal part always.

// But we also have other ways, all of these methods DO TYPE COERCION:

console.log(Math.round(34.9)); // 35
console.log(Math.round(34.49)); // .round(), this will always round to the nearest integer. 34

console.log(Math.ceil(34.9)); // 35
console.log(Math.ceil(34.49)); // .ceil(), always rounds UP and returns the smaller integer greater than or equal to a given number. 35

console.log(Math.floor(34.9)); // 34
console.log(Math.floor("34.49")); // .floor(), always rounds DOWN and returns the largest integer less than or equal to a given number. 34

// You might think that floor and trunc are very similar. Indeed, they do the same when we are dealing with positive numbers, basically floor and trunc cut off the decimal part. Remember that with negative numbers, rounding works the other way around.

console.log(Math.trunc(-34.9)); // trunc removes the decimal part, we get 34

console.log(Math.floor(-34.1)); // floor

// floor is a little bit better than trunc because it works on every situations. So we should replace it in our generic function above, but im going to leave it like this for educational purposes. Also, to get a better understanding of rounding numbers in javascript check https://www.sitepoint.com/rounding-numbers-javascript/.

// ROUNDING FLOATING POINT NUMBERS

// Rounding decimals works a little bit different.

console.log((2.7).toFixed()); // First we need to specify the number between () and then call the toFixed method on that same number. The toFixed method accepts the number of decimals parts that we want, zero being the default. We get 3.

console.log((2.7).toFixed(3)); // We get 2.700
console.log((2.345).toFixed(2)); // We get 2.35, notice that the toFixed method returns a string, so if we want a number we need to convert it:

console.log(+(2.345).toFixed(2)); // The plus sign is the same as having:

console.log(Number((2.345).toFixed(2))); // Same thing.

// It works like this because primitives don't have methods, so javascript does what is called boxing (transform the number between () into a number object, then call the method on that object, and when the operation is finished, convert it back to a primitive).

// Let's now apply some of this to the bankist app. The first thing to do is to round the requested loan amount, because right now is possible to request a loan with decimal parts, which is not common. Check 1 in the code (loan button).

// Next, let's use the toFixed method to make our numbers look a bit nicer, because right now we have some movements with one decimal and others with two. We will do this in all places where we display numbers on the screen, so in the 3 functions (displayMovements, calcDisplayBalance and calcDisplaySummary). Check 2 in the code.

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/*

    Lecture: The remainder operator

    This operator has some special use cases, so it deserves a lecture on its own.

    When the dividend is not completely divided by the divisor, the leftover value is called remainder. 

    

*/

console.log(5 % 2); // This operator simply returns the remainder of a division (the rest of a division). It returns one, but why?

console.log(5 / 2); // If we divide 5 by two we get 2.5. However, if we only have in account the integer part of this division we have 2, so 2 * 2 is four, with the remainder of 1 (5 - 4 = 1). So 5 = 2 * 2 + 1

console.log(8 % 3); // 2
console.log(8 / 3); // 8 = 2 * 3 + 2

console.log(24 % 5); // 4
console.log(24 / 5); // Same thing, 24 / 5 = 4.8 so 5 * 4 = 20 remainder 4

// In programming, this operator is frequently used to check if a number is even or odd. An even number is a number divisible by 2, so with a remainder of 0.

console.log(6 % 2); // 0
console.log(6 / 2); // Dividing 6 by 2 results in a integer number, exactly 3, so 3 * 2 = 6 remainder 0

// With this knowledge we can check if a number is even or not, so let's create a function:

/*
My function - The function works fine, however keep in mind the improvements that can be done in the code. First, if the objective is to simply return true of false, a simple arrow function is much more adequate because we don't need to specify return of the condition ; second, we might actually need this to return a boolean in real life conditions, not a string because then we cannot do anything programmatically after.

This:

const checkEven = function (nr) {
  console.log(nr % 2 === 0 ? "Even" : "Odd");
};
*/

// Can become this if we want to avoid the console log when calling the function:

const checkEven = function (nr) {
  console.log(nr % 2 === 0);
};

// See the difference with arrow:

const checkEvenArrow = (nr) => nr % 2 === 0; // Need to log when calling the function

const checkEvenArrowNoLog = (nr) => console.log(nr % 2 === 0);

checkEven(1);
console.log(checkEvenArrow(1));
checkEvenArrowNoLog(1);

// It's time to start distinguishing between how things are done for educational purposes and how things are going to be done professionally. In real life context the checkEvenArrow would be adequate, the other ones are just ways of seeing the result or can be considered debugging techniques.

// This works to check if any number is divisible by any other number. Whenever the result of the remainder operator is 0, that means that the first number is completely divisible by the second number. This is sometimes important to know in programming.

// Let's see another example involving the application. Let's start by selecting all the movements rows from the html, and then paint them based on some conditions.

// document.querySelectorAll(".movements__row"); // This will return a node list, that we can immediately convert into a real array by [] and, this time, use the spread operator to spread all the elements and, on that array, we can immediately call the forEach method. Just like before, this needs to happen inside of a event handler, otherwise it will not work because the code will run right when we start the app, but when we log in we override that with the deposits of the current user.

let colored = false;

// labelBalance.addEventListener("click", function () {
//   if (colored) {
//   }
//   [...document.querySelectorAll(".movements__row")].forEach((row, i) => {
//     // Now, let's say that we want to color every second row of the movements. All we need to do is to check if the current index is divisible by two:

//     // At 0, 2, 4, 6
//     if (i % 2 === 0) row.style.backgroundColor = "orangered";

//     // Now say that we wanted to paint every third row in another color:

//     // At 0, 3, 6, 9
//     if (i % 3 === 0) row.style.backgroundColor = "blue";

//     colored = !colored;
//   });
// });

// There is some overlap, but it illustrates well that when you need to do something every Nth time (every second time or every third time as above) we can use the remainder operator. I also added the toggle capacity for training.

labelBalance.addEventListener("click", function () {
  if (!colored) {
    [...document.querySelectorAll(".movements__row")].forEach((row, i) => {
      if (i % 2 === 0) row.style.backgroundColor = "orangered";

      if (i % 3 === 0) row.style.backgroundColor = "blue";
    });
  }
  if (colored)
    [...document.querySelectorAll(".movements__row")].forEach(
      (row) => (row.style.backgroundColor = "#fff")
    );
  colored = !colored;
  console.log(colored);
});

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/*

    Lecture: Numeric separators - Numbers, dates, intl and timers.

    Starting from ES2021, we can use a feature called numeric separators to format numbers in a way that is easier for us and for other developers to read and understand.
    

*/

// NUMERIC SEPARATORS

// Let's say that we wanted to represent a really large number, like the diameter of our solar system.

let diameter = 287460000000; // Just from looking at this number its really difficult to read and understand.

// When we write numbers this large under normal english language, we usually use a thousand separator like the comma - 287,460,000,000. Now we can do the same thing in javascript using the new numeric separators.

// These numeric separators are simply underscores that we can place anywhere we want in our numbers, which makes it easier to understand and parse numbers this large.

diameter = 287_460_000_000;
console.log(diameter); // 287460000000 the log appears without the separators, which means that the engine ignores the underscores, allowing us to place them anywhere that we want.

const priceCents = 345_99; // Using the underscore makes it easier to understand that this is a price in cents (345_99 euros), but the engine sees the 34599.

// We can use the underscore to give meaning to certain parts of our numbers now.

const transferFee1 = 15_00; // Here it looks like the fee is 15 dollars
const transferFee2 = 1_500; // Here it looks like the fee is 1500 dollars

// In both examples the number is the same 1500, but the placing of the underscore allows us to read them differently.

// UNDERSCORE RESTRICTIONS

// const pi = 3._1415
// const pi = _3.1415
// const pi = 3.1415_
// const pi = 3_.1415
// const pi = 3.14__15 // Two in a row.
// This produces an error, we can only place underscores between numbers.

// One final detail that we need to be aware of is that, when we try to convert strings that contain underscores to a number that will not work as expected.

Number("5_000_456"); // NaN

// This means that we should only use these numeric separators when writing down numbers like in the priceCents or transferFee variables. If you need to store a number in a string, for example in an API, or if you get a number as a string from an API, you should not use underscores in there because javascript will not be able to parse the number out of that string correctly.

console.log(Number.parseInt("230_000")); // Here we don't get NaN, but we only get 230, only the part that is before the underscore.

// WORKING WITH BIGINT

// Let's now talk about one of the primitive data types that we've never talked about before. BigInt is a special type of integers introduced in ES 2020.

// We've learned that numbers are represented internally as 64 bits, which means that there are exactly 64 ones or zeros to represent any given number. Of these 64 bits, only 54 are used to store digits themselves, the rest are for storing the position of the decimal point and the sign.

// If there are only 53 bits to store the number, that means that there is a limit of how big the numbers can be. We can calculate that number, it's 2 (base two) elevated to 53 minus one because numbers start at zero:

console.log(2 ** 53 - 1); // This is the biggest number that javascript can safely represent.

// This number is so important that it's even stored into the Number namespace:

console.log(Number.MAX_SAFE_INTEGER); // Any integer that is larger than this is not safe, which means that it cannot be represented accurately. If we make calculations with numbers larger than these we might lose precision.

// This might be a problem because, in some situations, we might need really big numbers, much larger than these (for database id's or when interacting with real 60 bit numbers). We also might get a number larger than this from an API and we have no way of storing it in javascript.

// However, starting from ES 2020, a new primitive was added called BigInt. It can be used to store numbers as large as we want.

console.log(2098720956872496549586730459867034); // log - 2.0987209568724966e+33 because it does not have precision. However, if we use n at the end, this will be a bigInt:

console.log(2098720956872496549586730459867034n);

// The n basically transforms a regular number into a bigint number. You can see in the console that it also looks different.

// We can use the BigInt function without the n to create a bigint number, sometimes that is necessary, however notice that the log is actually different after some point. Meaning that this constructor function should probably only be used with small numbers (see below the logic purpose of the constructor):

console.log(BigInt(2098720956872496549586730459867034)); // 2098720956872496626666081578123264n

// Let's perform some operation with these numbers.

console.log(10000n + 10000n); // 20000n - We wouldn't even need to work with big int here, it's just to show that the operators work the same way as before.

console.log(1049853948572039845702398457n * 100000000n);

// What is not possible is to mix big int numbers with regular numbers.

const huge = 29086729867942567948567948567n;
const num = 23;
// console.log(huge * num); // Uncaught TypeError: Cannot mix BigInt and other types, use explicit conversions

// What we need to do is to convert the num into a big int, here is the logical purpose of the BigInt function.

console.log(huge * BigInt(num)); // 668994786962679062817062817041n

// There are two EXCEPTIONS to this, which are the comparison operators and the plus operator when working with strings:

console.log(20n > 15); // We can still do a big int greater than a normal number, we still get true

console.log(20n === 20); // Here we get false, it makes sense because the strict equality operator does not do type coercion. These two values have a different primitive type:
console.log(typeof 20n); // bigint

console.log(20n == "20"); // With the lose equality operator we get true because of the type coercion.

// The SECOND EXCEPTION is when we do string concatenations - Seems to me that this was already resolved. CHECK MDN

console.log(num + " is really small");
console.log(huge + " is really big");

const normal = num + " is really small";
const bigIntStr = huge + " is really big";
console.log(typeof normal, typeof bigIntStr); // Both are strings.

// Divisions

console.log(10n / 3n); // 3n - cuts the decimal part off
console.log(10 / 3); // 3.333333

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/*

    Lecture: Creating dates

    When we built real world applications, one type of data that comes up all the time is dates and times.

    Dates and time can be a little bit messy and confusing in javascript, just like with numbers, let's learn the fundamentals.

    https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date


*/

// First we need to actually create a date. There are four ways of creating dates in javascript, they all use the date constructor function, but they can accept different parameters.

// 1 - The first way is to use the new Date constructor, we can assign it to a variable.

const now1 = new Date();
console.log(now1); // Thu Jun 08 2023 14:56:53 GMT+0100 (Western European Summer Time) - We get the date and time at this very moment.

// 2 - The second way is to parse the date from a date string.

// console.log(new Date("Jun 09 2023 14:56:53")); // We've copied part of the string above and javascript automatically parse the time based on that.

// console.log(new Date("December 24 2030")); // We can also write the string ourselves. Notice that we even get the day of the week. Although it is possible to do this, it's generally not a good idea to do this because it can be quite unreliable.

// However, if the string was created by javascript itself, then it is pretty safe. In our account objects, we now have the movements dates array, so let's try to parse one of the strings (again, this is ok because javascript created the strings of the movementsDates array).

console.log(new Date(account1.movementsDates[0])); // from 2019-11-18T21:31:17.178Z (Z stands for UTC coordinated universal time --- to Mon Nov 18 2019 21:31:17 GMT+0000 (Western European Standard Time).

// 3 - That was based on a string, but we can also pass in year, month, day, hour minutes and seconds in the constructor.

console.log(new Date(2037, 10, 19, 15, 23, 5)); // Thu Nov 19 2037 15:23:05 GMT+0000 (Western European Standard Time) - Notice that we have month 10, but the log shows November, the month is ZERO BASED in javascript.

console.log(new Date(2037, 10, 31)); // Tue Dec 01 2037 00:00:00 GMT+0000 (Western European Standard Time)
console.log(new Date(2037, 10, 33)); // Another cool feature is that javascript automatically corrects the date, November don't have 31 days, so the log corrects to December 1st (the next day) and to December 3rd in the second log. Sometimes this can be pretty useful.

// 4 - Finally, we can also pass into the date constructor function the amount of milliseconds passed since the beginning of the unix time. Jan 1st of 1970.

console.log(new Date(0)); // Zero milliseconds after the initial unix time -- Thu Jan 01 1970 01:00:00 GMT+0100 (Western European Standard Time). This is going to be pretty useful, even though it looks a bit strange.

console.log(new Date(3 * 24 * 60 * 60 * 1000)); // Here we make a date that is 3 days after the initial time. So 3 days * one day is made out of 24 hours * one hour is made out of 60 minutes, one minute is made out of 60 seconds, one second is made out of 1000 milliseconds. This is how we convert from days to milliseconds.

// The result of the multiplication is called the timestamp of the day number three. We will see why this is useful a little bit later.

// These dates that we've created here are just another special type of object, therefore they have their own methods. We can use these methods to get or to set components of a date.

// WORKING WITH DATES - METHODS

const future = new Date(2037, 10, 19, 15, 23);
console.log(future);

// Let's now work with this date:

console.log(future.getFullYear()); // We get 2037. There is also getYear() but NEVER use that

console.log(future.getMonth()); // REMEMBER that this is zero based, so month 10 is actually month 11.

console.log(future.getDate()); // 19 - This is actually the day of the month because:
console.log(future.getDay()); // 4 - The getDay is the day of the week, zero is sunday, so thursday is 4 - ZERO based too.

console.log(future.getHours()); // 15
console.log(future.getMinutes()); // 23
console.log(future.getSeconds()); // 0

// We can also get a nicely formatted string:

console.log(future.toISOString()); // 2037-11-19T15:23:00.000Z - This is the ISO string, which follows some kind of international standard. You might have notice that the strings in the movement dates of the account objects have a similar format, that's because they were generated by this method.

// We can also get the timestamp for the date:

console.log(future.getTime()); // 2142256980000 - REMEMBER that the timestamp is the milliseconds which have passed since jan 1st 1970. It is possible to revert the process, in other words create a date based on the timestamp:

console.log(new Date(2142256980000)); // Thu Nov 19 2037 15:23:00 GMT

// Timestamps are so important that there is a special method that we can use to get the timestamp for right now.

console.log(Date.now()); // You don't even need to create a new date if you want the timestamp for right now.

// Finally, there are also the set versions of all the previous methods.

future.setFullYear(2040);
console.log(future); // Mon Nov 19 2040 15:23:00 GMT+0000 (Western European Standard Time)

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/*

    Lecture: Adding dates to the app.

    Start by going to the demo version to see where we have dates. Under the current balance and in all of the movements.


*/

// 1 - The first thing to do is to fake always logged in so we don't need to log every time we change the code - check FAKE ALWAYS LOGGED IN.

// 2 - Now inspect the date under the current balance to see the class name and then get the corresponding element. Then we start by implement the code out of the callback functions so we can see how it looks before.

// 3 and 3.1 - Let's now use the dates on the movements. Go to the function that displays the movements.

// Next we need to get the code in 2 and put it into the code that get's executed when we log in.

// 4 - At this point, if you try to transfer or request a loan, you will notice that the date displays NaN. That's because a new movement was added and the dates still the same. So, whenever we transfer or make a loan, we need to not only to push the new value to the movements array but also into the movement dates. Go to the btn transfer and btn loan. Remember that we needed to convert new Date().toISOString().

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/*

    Lecture: Operations with dates.

    Let's now perform some operations with dates.

*/

// We can subtract one date from another date in order to calculate how many days have passed between the two dates.

// This works because whenever we attempt to convert a date to a number, then the result is going to be the timestamp in milliseconds. With these milliseconds, we can then perform calculations.

const futureOp = new Date(2037, 10, 19, 15, 23);
// console.log(Number(future)); // 2236951380000 - Don't forget that we can also use the plus (+) instead of Number().

// After we convert the date into milliseconds, we can then perform the operations and then convert the timestamp back to days, hours or whatever we want.

// Let's now create a function that takes in two dates and returns the number of days that passed between two dates.

const daysPassed = function (date1, date2) {
  // let dateOne = +date1;
  // let dateTwo = +date2; We don't have to do this because, although the new date returns the isoString, the operation between two dates returns the timestamp:
  const daysPassed = (date1 - date2) / (1000 * 60 * 60 * 24); // Here is where we make the conversion from the timestamp (milliseconds) to days. REMEMBER that there are 1000 milliseconds in a second, 60 seconds in a minute, 60 minutes in an hour and 24 hours in a day.

  return daysPassed;
};
const date1 = new Date(2023, 7, 9);
const date2 = new Date(2023, 7, 6);

console.log(daysPassed(date1, date2));

// From the lecture:

const calcDaysPassed = (date1, date2) =>
  Math.round(Math.abs((date1 - date2) / (1000 * 60 * 60 * 24)));

console.log(calcDaysPassed(date1, date2));

// If we needed to store

const days1 = calcDaysPassed(date2, date1); // If we flip the dates and make the subtraction, the result will be negative (days left), it might be handy to leave it like this if we wanted to know if it is days passed or days left, but if we don't want a negative result we can simply use the absolute value method.
console.log(days1);

// This works fine, but if you need really precise calculations (for example including time changes due to daylight saving changes), then you should use a date library like moment.js

// Let's consider that one of these dates also have some time - ten hours and eight minutes in date 3

const date3 = new Date(2023, 7, 9, 10, 8);
const date4 = new Date(2023, 7, 6);

console.log(calcDaysPassed(date3, date4)); // we get 3.422222222222222, so we could use math.round()

// Now let's use this function to do some improvements in our function. Basically what we want to do is: if one movement happened today, instead of displaying the date display today, so on and so forth. Go to the display movements function. The best logic is established in the first function of the program, but i left it like this so you remember how to make it better.

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/*

    Lecture: Internationalizing dates (INTL).

    Javascript has a new internationalization API, this allows us to easily format numbers and strings according with different languages.

    With this API, we can make our applications support different languages, which is pretty important. For example, currencies or dates are represented differently around the world. 

    There is a lot that we can do with this internationalization API, but is this section, we're just gonna talk briefly about formatting dates and numbers.

    MDN INTL
*/

// STARTING WITH DATES.

// In our application, we have dates is two places (under current balance and in each movement). First go to the login function. To get the different codes (iso language code table) of the countries (en-US) go to www.lingoes.net

// MOVEMENTS - Go to the lessons complete code to better understand because leaving the code above with all the steps is getting confusing, remember that we've created a function to formatMovementsDate (need to also pass in the locale ) that is called in the displayMovements function (where we need to call it with both arguments as well).

/*

    Lecture: Internationalizing Numbers (INTL).

    Let's now format regular numbers.
*/

const number = 3884764.23; // Creating a number so we can experiment with.

// Most basic formatting. NumberFormat takes again a locale string "en.US" and .format to pass in what we want to format:

console.log(
  "US format          ",
  new Intl.NumberFormat("en-US").format(number)
); // US format 3,884,764.23 (commas as separators)

console.log(
  "Germany format     ",
  new Intl.NumberFormat("de-DE").format(number)
); // Germany format 3.884.764,23 (dots as separators)

console.log(
  navigator.language,
  new Intl.NumberFormat(navigator.language).format(number)
); // Browser format

console.log(
  "Syria format       ",
  new Intl.NumberFormat("ar-SY").format(number)
);

// Let's now create an object of options. Now we have other properties in this object like style (go to Mdn to see the possible options - the currency is not defined by the locale, it must be defined manually)

console.log("WITH OPTIONS:");
const optionsNum = {
  style: "unit", // We can say the style is a unit and:
  unit: "mile-per-hour", // the unit is miles per hour. There are tons of units like this - celsius.
};

console.log(
  "US format with options         ",
  new Intl.NumberFormat("en-US", optionsNum).format(number)
); // US format with options          3,884,764.23 mph

console.log(
  "Germany format with options    ",
  new Intl.NumberFormat("de-DE", optionsNum).format(number)
); // Germany format with options     3.884.764,23 mi/h

console.log(
  navigator.language,
  new Intl.NumberFormat(navigator.language, optionsNum).format(number)
); // pt-PT 3 884 764,23 mi/h

console.log(
  "Syria format with options      ",
  new Intl.NumberFormat("ar-SY", optionsNum).format(number)
); // Syria format with options       ٣٬٨٨٤٬٧٦٤٫٢٣

// Let's now implement currencies in our application. Go to the display movements function.  <div class="movements__value">${mov.toFixed(2)}€</div></div> - This is where we display the movements in our app, with the euro sign hardcoded. Now we want the internationalization API to take care or all of this.

/*
This is how we would do it:

const formattedMov = new Intl.NumberFormat(acc.locale, { we wrote the object directly
  style: "currency",
  currency: acc.currency,
}).format(mov); // The current movement

<div class="movements__value">${formattedMov}</div></div> - Use the value of formattedNow without the hardcoded euro symbol.

*/

// There are other places where we need to format the currencies as well. So, in order to do that we create a generic function that accepts all the data that we need to work with. We could pass the entire object, but that would only work for this application.

const formatCurrencies = function (value, locale, currency) {
  return Intl.NumberFormat(locale, {
    style: "currency",
    currency: currency,
  }).format(value);
};

// Then we just need to call the function on the code, check the clean code of the lectures so we don't make more confusion in the code that we wrote. With these improvements the formattedMov variable is now a function call (we don't even need to store it into a variable, we can set the label text content to be the result of the function call):

// labelBalance.textContent = formatCurrencies(mov, acc.locale, acc.currency)
// labelSumIn.textContent = formatCurrencies(incomes, acc.locale, acc.currency)
// labelSumOut.textContent = formatCurrencies(Math.abs(out), acc.locale, acc.currency)
// labelSumInterest.textContent = formatCurrencies(interest, acc.locale, acc.currency)

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/*

    Lecture: Timers - settimeout and setinterval.

    We have two kinds of timers: settimeout timer (runs just once after a defined time) and the setinterval timer (keeps running forever until we stop it)

*/

// SETTIMEOUT()

// Basically, we can use set settimeout to execute some code at some point in the future, let's use this to simulate ordering a pizza. When we order a pizza, it doesn't arrive right away, it takes some time and we can simulate that.

// setTimeout(() => console.log("Here is your pizza! 🍕🍕🍕"), 4000); // The setTimeOut function receives a callback function as a first argument (arrow function in our example), just like some array methods or DOM events and, as second argument, the amount of seconds that will pass until this function is called (in milliseconds).

// With this, we really delayed calling this arrow function. We can also say that we schedule this function call for 4 seconds later.

// What is important to understand is that the code execution does not stop at this point. It's the same of saying that the code doesn't stop running for those four seconds. Once javascript hits the setTimeout function (or that line of code), it keeps counting the time in the background and registers the callback function to be called after that time has passed and, immediately moves on to the next line. We can prove that is the following way:

console.log("I'm not waiting for the timeout to get executed"); // This get's logged to the console before the four seconds, so before the pizza gets "delivered".

// This mechanism is called ASYNCHRONOUS JAVASCRIPT. We will talk about how this works behind the scenes in a section dedicated to it.

// What if we needed to pass some arguments into the callback function if we are not calling the function ourselves with the ()? The setTimeOut as a solution for this.

// All the arguments that we pass after the delay, will be arguments of the callback function. We just need to do the following:

setTimeout(
  (ing1, ing2) =>
    console.log(`Here is your pizza with ${ing1} and ${ing2}! 🍕🍕🍕`),
  4000,
  "olives",
  "spinach"
);

// There is one more thing to know, we can actually cancel the timer at least until the delay has actually passed. So, before the four seconds have passed, we can cancel the timeout.

// Before we demonstrate this, let's first put the ingredients into an array, check how we use the spread operator to use the arguments:

const ingredients = ["cheese", "ham"];

const timer = setTimeout(
  (ing1, ing2) =>
    console.log(`Here is your pizza with ${ing1} and ${ing2}! 🍕🍕🍕`),
  4000,
  ...ingredients
);

// We can now specify a condition to cancel the timeout:

if (ingredients.includes("ham")) clearTimeout(timer); // Inside the clearTimeout we need to pass in the name of the timer, basically we can assign a timer to a variable and then use it here.

// Let's now go to our app and implement the timer to simulate the approval of a loan. Go to button loan.

// SETINTERVAL()

// Timeout simply schedules a function to run after a certain amount of time, but the callback is only executed once, what if we wanted to run a function over and over again, like every five seconds?

// Let's use the setInterval function to create a clock that will display in our console. Notice the autocompletion feature of vscode so you don't need to write the code all the time, it uses arrow functions.

// setInterval(() => {
//   const now = new Date();
//   const options = {
//     hour: "numeric",
//     minute: "numeric",
//     second: "numeric",
//   };
//   console.log(new Intl.DateTimeFormat(navigator.language, options).format(now));
// }, 1000);

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/*

    Lecture: Implementing a countdown timer.

    After some inactive time, users are logged out in some applications, this is what we will do using the setinterval timer. It is important to see the flow chart again, notice how the timer appears is several (whenever the user logs in, the logout timer will start or restart - whenever the logout timer expires we want to log the user out)
*/

// Start by creating a function that will set the logout timer.

// Check the lessons code and remember to go deeper on the timer resetting when doing operations, change the login and also the logic behind starting to count at zero. IMPORTANT TO REVIEW.

// FINAL CODE FROM LECTURES.

// Functions
/*
const formatMovementDate = function (date, locale) {
  const calcDaysPassed = (date1, date2) =>
    Math.round(Math.abs(date2 - date1) / (1000 * 60 * 60 * 24));

  const daysPassed = calcDaysPassed(new Date(), date);
  console.log(daysPassed);

  if (daysPassed === 0) return "Today";
  if (daysPassed === 1) return "Yesterday";
  if (daysPassed <= 7) return `${daysPassed} days ago`;

  // const day = `${date.getDate()}`.padStart(2, 0);
  // const month = `${date.getMonth() + 1}`.padStart(2, 0);
  // const year = date.getFullYear();
  // return `${day}/${month}/${year}`;
  return new Intl.DateTimeFormat(locale).format(date);
};

const formatCur = function (value, locale, currency) {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency: currency,
  }).format(value);
};

const displayMovements = function (acc, sort = false) {
  containerMovements.innerHTML = "";

  const movs = sort
    ? acc.movements.slice().sort((a, b) => a - b)
    : acc.movements;

  movs.forEach(function (mov, i) {
    const type = mov > 0 ? "deposit" : "withdrawal";

    const date = new Date(acc.movementsDates[i]);
    const displayDate = formatMovementDate(date, acc.locale);

    const formattedMov = formatCur(mov, acc.locale, acc.currency);

    const html = `
      <div class="movements__row">
        <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type}</div>
        <div class="movements__date">${displayDate}</div>
        <div class="movements__value">${formattedMov}</div>
      </div>
    `;

    containerMovements.insertAdjacentHTML("afterbegin", html);
  });
};

const calcDisplayBalance = function (acc) {
  acc.balance = acc.movements.reduce((acc, mov) => acc + mov, 0);
  labelBalance.textContent = formatCur(acc.balance, acc.locale, acc.currency);
};

const calcDisplaySummary = function (acc) {
  const incomes = acc.movements
    .filter((mov) => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = formatCur(incomes, acc.locale, acc.currency);

  const out = acc.movements
    .filter((mov) => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumOut.textContent = formatCur(Math.abs(out), acc.locale, acc.currency);

  const interest = acc.movements
    .filter((mov) => mov > 0)
    .map((deposit) => (deposit * acc.interestRate) / 100)
    .filter((int, i, arr) => {
      // console.log(arr);
      return int >= 1;
    })
    .reduce((acc, int) => acc + int, 0);
  labelSumInterest.textContent = formatCur(interest, acc.locale, acc.currency);
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
  displayMovements(acc);

  // Display balance
  calcDisplayBalance(acc);

  // Display summary
  calcDisplaySummary(acc);
};

const startLogOutTimer = function () {
  const tick = function () {
    const min = String(Math.trunc(time / 60)).padStart(2, 0);
    const sec = String(time % 60).padStart(2, 0);

    // In each call, print the remaining time to UI
    labelTimer.textContent = `${min}:${sec}`;

    // When 0 seconds, stop timer and log out user
    if (time === 0) {
      clearInterval(timer);
      labelWelcome.textContent = "Log in to get started";
      containerApp.style.opacity = 0;
    }

    // Decrease 1s
    time--;
  };

  // Set time to 5 minutes
  let time = 120;

  // Call the timer every second
  tick();
  const timer = setInterval(tick, 1000);

  return timer; // We need to return
};

///////////////////////////////////////
// Event handlers
let currentAccount, timer;

// FAKE ALWAYS LOGGED IN
// currentAccount = account1;
// updateUI(currentAccount);
// containerApp.style.opacity = 100;

btnLogin.addEventListener("click", function (e) {
  // Prevent form from submitting
  e.preventDefault();

  currentAccount = accounts.find(
    (acc) => acc.username === inputLoginUsername.value
  );
  console.log(currentAccount);

  if (currentAccount?.pin === +inputLoginPin.value) {
    // Display UI and message
    labelWelcome.textContent = `Welcome back, ${
      currentAccount.owner.split(" ")[0]
    }`;
    containerApp.style.opacity = 100;

    // Create current date and time
    const now = new Date();
    const options = {
      hour: "numeric",
      minute: "numeric",
      day: "numeric",
      month: "numeric",
      year: "numeric",
      // weekday: 'long',
    };
    // const locale = navigator.language;
    // console.log(locale);

    labelDate.textContent = new Intl.DateTimeFormat(
      currentAccount.locale,
      options
    ).format(now);

    // const day = `${now.getDate()}`.padStart(2, 0);
    // const month = `${now.getMonth() + 1}`.padStart(2, 0);
    // const year = now.getFullYear();
    // const hour = `${now.getHours()}`.padStart(2, 0);
    // const min = `${now.getMinutes()}`.padStart(2, 0);
    // labelDate.textContent = `${day}/${month}/${year}, ${hour}:${min}`;

    // Clear input fields
    inputLoginUsername.value = inputLoginPin.value = "";
    inputLoginPin.blur();

    // Timer
    if (timer) clearInterval(timer); // If a timer is running, reset it
    timer = startLogOutTimer(); // And start it again with the user that logged in

    // Update UI
    updateUI(currentAccount);
  }
});

btnTransfer.addEventListener("click", function (e) {
  e.preventDefault();
  const amount = +inputTransferAmount.value;
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

    // Add transfer date
    currentAccount.movementsDates.push(new Date().toISOString());
    receiverAcc.movementsDates.push(new Date().toISOString());

    // Update UI
    updateUI(currentAccount);

    // Reset timer
    clearInterval(timer);
    timer = startLogOutTimer();
  }
});

btnLoan.addEventListener("click", function (e) {
  e.preventDefault();

  const amount = Math.floor(inputLoanAmount.value);

  if (
    amount > 0 &&
    currentAccount.movements.some((mov) => mov >= amount * 0.1)
  ) {
    setTimeout(function () {
      // Add movement
      currentAccount.movements.push(amount);

      // Add loan date
      currentAccount.movementsDates.push(new Date().toISOString());

      // Update UI
      updateUI(currentAccount);

      // Reset timer
      clearInterval(timer);
      timer = startLogOutTimer();
    }, 2500);
  }
  inputLoanAmount.value = "";
});

btnClose.addEventListener("click", function (e) {
  e.preventDefault();

  if (
    inputCloseUsername.value === currentAccount.username &&
    +inputClosePin.value === currentAccount.pin
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
*/
