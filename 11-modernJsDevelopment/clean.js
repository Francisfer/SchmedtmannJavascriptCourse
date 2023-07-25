// Let's start by analyzing this code, which is basically about a very simple budget application.

// var budget = [
//   { value: 250, description: "Sold old TV 📺", user: "jonas" },
//   { value: -45, description: "Groceries 🥑", user: "jonas" },
//   { value: 3500, description: "Monthly salary 👩‍💻", user: "jonas" },
//   { value: 300, description: "Freelancing 👩‍💻", user: "jonas" },
//   { value: -1100, description: "New iPhone 📱", user: "jonas" },
//   { value: -20, description: "Candy 🍭", user: "matilda" },
//   { value: -125, description: "Toys 🚂", user: "matilda" },
//   { value: -1800, description: "New Laptop 💻", user: "jonas" },
// ];

// // Spending limits
// var limits = {
//   jonas: 1500,
//   matilda: 100,
// };

// // Function to add a new entry to the budget, but actually, this one is only for expenses. Here we start to see a bad practice which is that the name of the function is not very descriptive.

// // Instead of add it should be called addExpense.

// var addExpense = function (value, description, user) {
//   if (!user) user = "jonas";
//   user = user.toLowerCase();

//   var lim;
//   if (limits[user]) {
//     lim = limits[user];
//   } else {
//     lim = 0;
//   }

//   if (value <= lim) {
//     budget.push({ value: -value, description: description, user: user });
//   }
// };
// addExpense(10, "Pizza 🍕");
// addExpense(100, "Going to movies 🍿", "Matilda");
// addExpense(200, "Stuff", "Jay");
// console.log(budget);

// // Check function to check the budget and see if any of the expenses are above the limit. If it is, it will flag that by adding a limit string to a new flag property on the budget entry.
// var check = function () {
//   for (var el of budget) {
//     var lim;
//     if (limits[el.user]) {
//       lim = limits[el.user];
//     } else {
//       lim = 0;
//     }

//     if (el.value < -lim) {
//       el.flag = "limit";
//     }
//   }
// };
// check();

// console.log(budget);

// // Function to log big expenses.
// var bigExpenses = function (limit) {
//   var output = "";
//   for (var el of budget) {
//     if (el.value <= -limit) {
//       output += el.description.slice(-2) + " / "; // Emojis are 2 chars
//     }
//   }
//   output = output.slice(0, -2); // Remove last '/ '
//   console.log(output);
// };

// bigExpenses(1000); // Prints the emoji of the expense above 1000.

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Code fixed:
// 1. Change the var to const and let. Not all of the var can be const.

const budget = [
  { value: 250, description: "Sold old TV 📺", user: "jonas" },
  { value: -45, description: "Groceries 🥑", user: "jonas" },
  { value: 3500, description: "Monthly salary 👩‍💻", user: "jonas" },
  { value: 300, description: "Freelancing 👩‍💻", user: "jonas" },
  { value: -1100, description: "New iPhone 📱", user: "jonas" },
  { value: -20, description: "Candy 🍭", user: "matilda" },
  { value: -125, description: "Toys 🚂", user: "matilda" },
  { value: -1800, description: "New Laptop 💻", user: "jonas" },
];

const spendingLimits = Object.freeze({
  jonas: 1500,
  matilda: 100,
});
// spendingLimits.jay = 200;

// const limit = spendingLimits[user] ? spendingLimits[user] : 0;
const getLimit = (limits, user) => limits?.[user] ?? 0;

// Pure function :D
const addExpense = function (
  state,
  limits,
  value,
  description,
  user = "jonas"
) {
  const cleanUser = user.toLowerCase();

  return value <= getLimit(limits, cleanUser)
    ? [...state, { value: -value, description, user: cleanUser }]
    : state;
};

const newBudget1 = addExpense(budget, spendingLimits, 10, "Pizza 🍕");
const newBudget2 = addExpense(
  newBudget1,
  spendingLimits,
  100,
  "Going to movies 🍿",
  "Matilda"
);
const newBudget3 = addExpense(newBudget2, spendingLimits, 200, "Stuff", "Jay");

// const checkExpenses2 = function (state, limits) {
//   return state.map(entry => {
//     return entry.value < -getLimit(limits, entry.user)
//       ? { ...entry, flag: 'limit' }
//       : entry;
//   });
//   // for (const entry of newBudget3)
//   //   if (entry.value < -getLimit(limits, entry.user)) entry.flag = 'limit';
// };

const checkExpenses = (state, limits) =>
  state.map((entry) =>
    entry.value < -getLimit(limits, entry.user)
      ? { ...entry, flag: "limit" }
      : entry
  );

const finalBudget = checkExpenses(newBudget3, spendingLimits);
console.log(finalBudget);

// Impure
const logBigExpenses = function (state, bigLimit) {
  const bigExpenses = state
    .filter((entry) => entry.value <= -bigLimit)
    .map((entry) => entry.description.slice(-2))
    .join(" / ");
  // .reduce((str, cur) => `${str} / ${cur.description.slice(-2)}`, '');

  console.log(bigExpenses);

  // let output = '';
  // for (const entry of budget)
  //   output +=
  //     entry.value <= -bigLimit ? `${entry.description.slice(-2)} / ` : '';
  // output = output.slice(0, -2); // Remove last '/ '
  // console.log(output);
};

logBigExpenses(finalBudget, 500);
