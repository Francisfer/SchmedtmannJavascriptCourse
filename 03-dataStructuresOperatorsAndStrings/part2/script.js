"use strict";

// Data needed for a later exercise
const flights =
  "_Delayed_Departure;fao93766109;txl2133758440;11:25+_Arrival;bru0943384722;fao93766109;11:45+_Delayed_Arrival;hel7439299980;fao93766109;12:05+_Departure;fao93766109;lis2323639855;12:30";

// Data needed for first part of the section
const restaurant = {
  name: "Classico Italiano",
  location: "Via Angelo Tavanti 23, Firenze, Italy",
  categories: ["Italian", "Pizzeria", "Vegetarian", "Organic"],
  starterMenu: ["Focaccia", "Bruschetta", "Garlic Bread", "Caprese Salad"],
  mainMenu: ["Pizza", "Pasta", "Risotto"],
  openingHours: {
    thu: {
      open: 12,
      close: 22,
    },
    fri: {
      open: 11,
      close: 23,
    },
    sat: {
      open: 0, // Open 24 hours
      close: 24,
    },
  },
  order: function (starterIndex, mainIndex) {
    return [this.starterMenu[starterIndex], this.mainMenu[mainIndex]];
  },
  orderDelivery: function ({
    starterIndex = 1,
    mainIndex = 0,
    time = "00:00",
    address,
  }) {
    console.log(
      `Order received! ${this.starterMenu[starterIndex]} and ${this.mainMenu[mainIndex]} will be delivered to ${address} at ${time} hours.`
    );
  },
  orderPasta: function (ing1, ing2, ing3) {
    console.log(
      `Here is your delicious pasta with ${ing1}, ${ing2} and ${ing3}!!`
    );
  },
  orderPizza: function (mainIngredient, ...otherIngredients) {
    console.log(mainIngredient);
    console.log(otherIngredients);
  },
};

/*

  LOOPING ARRAYS: THE FOR-OF LOOP.

  Let's now talk about a new way of looping over arrays that was introduced in es6.

*/

// Let's say we want to loop over our entire menu array.

const menu = [...restaurant.starterMenu, ...restaurant.mainMenu];

// for (const item of menu) console.log(item); // Item is the variable name. This will automatically loop over the entire array and, at each iteration it will give us access to the current array element. One line of code don't need curly brackets.

// We can still use the continue and break keywords with the for of loop.

// What if we want the current index and not just the current element? In the for of loop is a bit more difficult when we need that index, because the for of loop was just meant to give you the current element. To have both you have to do it like this:

for (const item of menu.entries()) {
  // we need to call the entries method on the menu array.
  console.log(item); // now, each of the item is now an array with the index and the array element itself.
}

// What actually is the menu.entries?

// console.log(menu.entries()); // Array iterator (further lessons)

// Now, if we want to print a nice menu on the console, we can take advantage of this data without destructuring:

/*
for (const itemMenu of menu.entries()) {
  console.log(`${itemMenu[0] + 1}: ${itemMenu[1]}`); // we add one to the current itemMenu index so that the menu starts at one and not zero, then we start at position one.
}
*/

// And with destructuring:

for (const [index, element] of menu.entries()) {
  console.log(`${index + 1}: ${element}`);
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/*

    ENHANCED OBJECT LITERALS.

    We have been talking a lot about es6 features and new additions to the language.

    Let's continue with enhanced object literals.

    The restaurant object is an object literal, we can see that because we've used the curly braces syntax.

    ES6 introduced three ways which make it easier to write object literals like this.

    FOLLOW THE ORDER!!!
*/

// 3 - Finally, the third enhancement of es6 is that we can now compute property names instead of having to write them manually and literally.

// Compute just means calculate, and let's try it by saying that we have an array with all week days:
const weekDays = [
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
  "sunday",
];

// Now, looking to the opening hours object, let's say that we want to compute the days (thu, fri, sat) out of the weekDays array, instead of having to manually write them:

const openingHoursComputed = {
  [weekDays[3]]: {
    open: 12,
    close: 22,
  },
  [weekDays[4]]: {
    open: 11,
    close: 23,
  },
  sat: {
    open: 0,
    close: 24,
  },
};
// console.log(openingHoursComputed);

// 1 - Say that we have an object outside of the restaurant object. Let's take the openingHours out to a separate variable:

const openingHours = {
  thu: {
    open: 12,
    close: 22,
  },
  fri: {
    open: 11,
    close: 23,
  },
  sat: {
    open: 0,
    close: 24,
  },
};

// We still want to have the openingHours object inside of the restaurant object:

const restaurant1 = {
  name: "Classico Italiano",
  location: "Via Angelo Tavanti 23, Firenze, Italy",
  categories: ["Italian", "Pizzeria", "Vegetarian", "Organic"],
  starterMenu: ["Focaccia", "Bruschetta", "Garlic Bread", "Caprese Salad"],
  mainMenu: ["Pizza", "Pasta", "Risotto"],
  //openingHours: openingHours >>>>> before es6

  // After es6 we don't need to repeat ourselves, pay attention to the (,) and not the (:) after the property name:
  openingHours,

  // 2 - The second enhancement of es6 is about methods. We don't need to create a property and then set it to a function expression like we've been doing:
  order: function (starterIndex, mainIndex) {
    return [this.starterMenu[starterIndex], this.mainMenu[mainIndex]];
  },

  // Now we can write it like this, without the (:) and the function keyword:

  orderDelivery({ starterIndex = 1, mainIndex = 0, time = "00:00", address }) {
    console.log(
      `Order received! ${this.starterMenu[starterIndex]} and ${this.mainMenu[mainIndex]} will be delivered to ${address} at ${time} hours.`
    );
  },
  orderPasta(ing1, ing2, ing3) {
    console.log(
      `Here is your delicious pasta with ${ing1}, ${ing2} and ${ing3}!!`
    );
  },
  orderPizza: function (mainIngredient, ...otherIngredients) {
    console.log(mainIngredient);
    console.log(otherIngredients);
  },
};

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/*

    OPTIONAL CHAINING.

    A new feature of objects and also arrays is called optional chaining.

*/

// Let's say that we wanted to get the opening hours of our restaurant for monday:

console.log(restaurant.openingHours.mon);

// We know that the property mon doesn't exist, and the log is undefined, however we must pretend that this data came from a web api and we are checking in a more blind manner. If we go further and want to know the opening hour of the restaurant we get an error, because we cannot read a property of undefined:

// console.log(restaurant.openingHours.mon.open);

// In order to avoid this error we actually have to test if restaurant.openingHours.mon actually exists, so:

if (restaurant.openingHours.mon) console.log(restaurant.openingHours.mon.open);

// To see with a day that we know that exists:

// if (restaurant.openingHours.fri) console.log(restaurant.openingHours.fri.open);

// Focusing on monday, imagine that we also didn't knew if openingHours existed. We would have to check for both:

if (restaurant.openingHours && restaurant.openingHours.mon)
  console.log(restaurant.openingHours.mon.open);

// Again, assuming that the data comes from an api, this testing can get out of hand quickly when we have deeply nested objects with lot's of optional properties. A solution for this is optional chaining and with it, if a certain property doesn't exist, it returns undefined immediately, avoiding the error that we saw above.

console.log(restaurant.openingHours.mon?.open);

// Here is how it works: only if the property that is BEFORE the (?), so (mon) exists, the property (open) will be read. If it doesn't exist, undefined is returned immediately as in the log. Optional chaining works with the nullish concept that we talked before, so a property exists if its not null and not undefined, if its zero of "" it still exists.

// We can have multiple optional chaining that we can use instead the if else statements >>>>  if (restaurant.openingHours && restaurant.openingHours.mon)console.log(restaurant.openingHours.fri.open);

console.log(restaurant.openingHours?.mon?.open);

// With a day that actually exists:

console.log(restaurant.openingHours?.sat?.open);

// <<<REAL WORLD EXAMPLE>>>
// I want to loop over this array and log to the console whether the restaurant is open or closed on each of the days.

const Days = ["mon", "tue", "wed", "thu", "fri", "sat", "sun"];

for (const day of Days) {
  const open = restaurant.openingHours[day]?.open; // 1 (IMPORTANT!)
  const closed = restaurant.openingHours[day]?.close;
  if (open || closed) {
    console.log(`On ${day}, we open at ${open}, and close at ${closed}`);
  } else console.log(`Sorry, on ${day} we are closed`); // 2
}

// 1 - bracket notation - Here, the big difference between the two notations is that, in the bracket notation, we can put any expression that we'd like. We don't have to specifically write the string here, instead, we can compute it from some operation (it's coming dynamically from the days array).

// 2 - The lecture uses the nullish coalescing operator to place "closed" for undefined days (cannot be || because of the falsy value of saturday opening hour) >>>  const open = restaurant.openingHours[day]?.open ?? "closed";
// However, the output get´s weird because the objective is to demonstrate the use of both optional chaining and the different operators.

// OPTIONAL CHAINING WITH METHODS

// We can check if a method exists before we call it, we should always use the nullish coalescing operator for the possibility of the method doesn't exist:

console.log(restaurant.order?.(2, 2) ?? "Method does not exist!");
console.log(restaurant.orderRisotto?.(2, 2) ?? "Method does not exist!");

// OPTIONAL CHAINING WITH ARRAYS

// To check if an array is empty:

const users = [
  {
    name: "Francis",
    email: ".......",
  },
];

console.log(users[0]?.email ?? "User array empty");

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/*

  LOOPING OBJECTS: OBJECT KEYS, VALUES AND ENTRIES.

    We've talked about loop over arrays, which are iterables, but we can also loop over objects, which are not iterables.

    We have different options, depending on what exactly we want to loop over: over the object property names, over the values or both together.
*/

// OVER THE PROPERTY NAMES (KEYS) - Ultimately, we still have to use the for off loop to loop over an array but in an indirect way, we are not actually looping over the object itself.

for (const day of Object.keys(openingHours)) {
  console.log(day);
}

const properties = Object.keys(openingHours);
console.log(properties); // as we can see is an array with the property names.

// Properties is the resulting array of Object.keys(openingHours), so let's use it:

let openString = `We are open on ${properties.length} days: `;
for (const day of properties) {
  openString += `${day}, `;
}
console.log(openString);

// OVER THE PROPERTY VALUES

const values = Object.values(openingHours);
console.log(values);

// OVER THE ENTIRE OBJECT - PROPERTIES AND VALUES

// We already used the entries method with arrays, which returns the index number and the element itself. We can do something similar on objects and also return the key and the value, however is slightly different because its not going to be a method that we call on the object itself like we did with arrays (menu.entries()). Here we do it differently:

const obj = Object.entries(openingHours);
console.log(obj);

for (const [key, { open, close }] of obj) {
  console.log(`On ${key}, we open at ${open} and close at ${close}!`);
}

/*
for (const x of obj) {
  console.log(
    `On ${x[0]}, we open at ${x[1].open} and close at ${x[1].close}!`
  );
}

// In my solution i could't destructure, so remember that:

      // We use the Object.entries(object to be looped over), however, REMEMBER that the return is an array that, in this case, contains three arrays itself.

      // Then, on the loop we just need to pay attention to the order in which we destructure, [key(position zero of the array), {open, close// position 1}].

*/

// CODING CHALLENGE TWO:

const game = {
  team1: "Bayern Munich",
  team2: "Borrussia Dortmund",
  players: [
    [
      "Neuer",
      "Pavard",
      "Martinez",
      "Alaba",
      "Davies",
      "Kimmich",
      "Goretzka",
      "Coman",
      "Muller",
      "Gnarby",
      "Lewandowski",
    ],
    [
      "Burki",
      "Schulz",
      "Hummels",
      "Akanji",
      "Hakimi",
      "Weigl",
      "Witsel",
      "Hazard",
      "Brandt",
      "Sancho",
      "Gotze",
    ],
  ],
  score: "4:0",
  scored: ["Lewandowski", "Gnarby", "Lewandowski", "Hummels"],
  date: "Nov 9th, 2037",
  odds: {
    team1: 1.33,
    x: 3.25,
    team2: 6.5,
  },
};

/*
Let's continue with our football betting app! 

Keep using the 'game' variable from before.

Your tasks:

1. Loop over the game.scored array and print each player name to the console, along with the goal number (Example: "Goal 1: Lewandowski");

2. Use a loop to calculate the average odd and log it to the console without destructuring (We already studied how to calculate averages, you can go check if you don't remember);

3. Print the 3 odds to the console, but in a nice formatted way,exactly like this:
        Odd of victory Bayern Munich: 1.33 

        Odd of draw: 3.25

        Odd of victory Borrussia Dortmund: 6.5

Get the team names directly from the game object, don't hardcode them (except for "draw"). Hint: Note how the odds and the game objects have the same property names 😉

4. Bonus:Create an object called 'scorers' which contains the names of the players who scored as properties, and the number of goals as the value. In this game, it will look like this:
     {
       Gnarby: 1,
       Hummels: 1,
       Lewandowski: 2
}
*/
console.log("EXERCISES RESULTS");
// 1

// We are working with an array, so we just use .entries.
for (const [index, player] of game.scored.entries()) {
  // console.log(`Goal ${index + 1}: ${player}!!!`);
}
/*
// WITHOUT DESTRUCTURING
for (const player of game.scored.entries()) {
  // console.log(player);
  console.log(`Goal ${player[0] + 1}: ${player[1]}!!!`);
}
*/
// 2

// MY FIRST SOLUTION
/*
const gameOdds = Object.values(game.odds);
let result = 0;

for (const value of gameOdds) {
  result += value;
}
const average = result / gameOdds.length;
console.log(average);
*/

/*

      //  MY SECOND SOLUTION - function that can be used as a method:

const calcAverage = function (arr) {
  let result = 0;
  for (let i = 0; i < gameOdds.length; i++) {
    result += gameOdds[i];
  }
  console.log(result / gameOdds.length);
};
calcAverage();


// const calcAverage = function () {
//   let sum = 0;
//   for (const value of Object.values(odds)) {
//     sum += value;
//   }
//   return sum / odds.length;
//   // or console log directly
// };
// console.log(calcAverage());

// const calcAverage = function (array) {
//   let sum = 0;
//   for (const value of array) {
//     sum += value;
//   }
//   console.log(sum / array.length);
//   // or console log directly
// };
// calcAverage(odds);
*/

// MY THIRD SOLUTION - With destructuring
/*
const object = Object.entries(game.odds);

let sum = 0;
for (const [, value] of object) {
  sum += value;
}
console.log(sum / object.length);
console.log(sum);
*/
// SOLUTION FROM THE COURSE - The for of loop is only used to add values to the sum variable (averageThis), the rest is made outside the loop, noob mistake, don't forget.

// const odds = Object.values(game.odds);
// let averageThis = 0;
// for (const odd of odds) averageThis += odd;
// averageThis /= odds.length;
// console.log(averageThis);

// 3

const printOdds = Object.entries(game.odds); // We are working with an object, so we use the Object.entries()

// for (let [key, value] of printOdds) {
//   if (game[key]) {
//     console.log(`Odd of victory ${game[key]}: ${value}`);
//   } else console.log(`Odd of draw: ${value}`);
// }

// SOLUTION FROM THE COURSE

// for (const [team, odd] of printOdds) {
//   const teamString = team === "x" ? "Draw" : `victory ${game[team]}`;
//   console.log(`Odd of ${teamString}: ${odd}`);
// }

// He used the ternary operator to dynamically complete the final string, the result is the same and doesn't matter in this specific exercise. However it is a better solution than hard code draw.
// 4

// MY SOLUTION
// const scorers1 = {};

// for (const name of game.scored) {
//   scorers1[name] = scorers1[name] ? scorers1[name] + 1 : 1;
// }
// console.log(scorers1);

// SOLUTION FROM THE COURSE
// const scorers = {};
// for (const player of game.scored) {
//   scorers[player] ? scorers[player]++ : (scorers[player] = 1);
// }
// console.log(scorers);

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/*

    SETS AND MAPS

    In the past, javascript basically just had two built in data structures: objects and arrays. 

    With es6, two more data structures were finally introduced: sets and maps.

*/

// SETS

// To create a new set we write new set() and we need to pass in an iterable. The most common iterable is an array:

const ordersSet = new Set([
  "Pasta",
  "Pizza",
  "Pizza",
  "Risotto",
  "Pasta",
  "Pizza",
]);

// A set is just a collection of unique values, that means that a set can never have any duplicates. This property makes them useful in certain situations. A set can hold mixed data types.

console.log(ordersSet); // We clearly noticed that we have duplicate values in the set, however, the log gives us a set with the size of 3 and the duplicates are gone. Also, we can see that a set is similar to an array, there are no key value pairs, its just a bunch of values grouped together into a set. Just like arrays, sets are also iterables. However, a set is still very different from an array, first because its elements are unique and second, because the order of those elements in the set is irrelevant.

// If sets are iterables we can pass in a string, and we get a set with eight elements (components of the string), notice that there are not repeated letters in the string:

console.log(new Set("Francisco"));

// A set can also be empty: console.log(new Set());

// HOW TO WORK WITH SETS:

// 1 - We can get the size of a set:

console.log(ordersSet.size);

// We get 3. In this particular example, if the set was an array of all the orders, this could be useful for a chef to know how many different meals are going to be cooked.

// Notice how its actually called size and not length like in arrays.

// 2 - We can check if a certain element is in a set.
// The .has() is actually a method, and, comparing with arrays, is similar to the .includes() method.

console.log(ordersSet.has("Pizza")); // True
console.log(ordersSet.has("Bread")); // False
// console.log(ordersSet.has("Pizza", "Bread")); Not possible, only the first gets evaluated

// 3 - We can add elements to a set, in this example say that someone ordered garlic bread and that happened twice:

ordersSet.add("Garlic bread");
ordersSet.add("Garlic bread");
console.log(ordersSet); // Only one of them was added, because a set has to be unique.

// 4 - We can delete elements from the set:

ordersSet.delete("Garlic bread");
// console.log(ordersSet); // Even though we added twice it gets erased from the set.
// ordersSet.delete("Risotto");
// console.log(ordersSet);

// At this point, we might ask how do we actually retrieve elements out of a set? Can we use index like in arrays? console.log(ordersSet[1]);

// No, it gives us undefined, and that is because in sets there are no indexes, in fact there is no way of getting values out of sets. If we think about this, there is really no need of getting data out of a set. If all values are unique and if their order does not matter there is no point of retrieving values out of a set.

// All we need to know is whether a certain value is in the set or not, and for that we have the .has() method. If the objective is to actually store values in order and then retrieve it, than the best solution is to use an array.

// 5 - There is another method but not has important, all we can use it for is to delete all the elements of the set.

// ordersSet.clear();
// console.log(ordersSet);

// As said in the beginning, sets are also iterables. Therefore we can loop over them:

for (const order of ordersSet) {
  // console.log(order);
}

// USE CASE OF SETS.
// In a normal code base, the main use case of sets is actually to remove duplicate values of arrays.

// Say that we have an array in our restaurant which contains the staff and we are interested in knowing only which different positions exist in the restaurant. In other words, we would like to have a unique array of the staff array (without the duplicates).

const staff = ["Waiter", "Chef", "Waiter", "Manager", "Chef", "Waiter"];

const staffUnique = new Set(staff);
console.log(staffUnique);

// Okay, but now we want staffUnique to be an array, and the conversion from a set to an array is pretty easy because they are both iterables. Remember that the spread operator works on all iterables, which includes sets.

// First we create an array out of the set (the log gives us an array with the set): const staffArray = [new Set(staff)];

// Second - We unpack the array with the spread operator:

const staffArray = [...new Set(staff)];
console.log(staffArray);

// This is useful if for some reason we need this array, however, if we only wanted to know how many professions exist in the restaurant we could do it like this:

console.log(
  new Set(["Waiter", "Chef", "Waiter", "Manager", "Chef", "Waiter"]).size
); // it looks weird but it works and we wouldn't even need to create the array.

/*
     MAPS FUNDAMENTALS

     Maps are a lot more useful than sets.

     In javascript, map is a data structure that we can use to map values to keys. Just like in objects, data is stored in key value pairs in maps.

     The big difference between objects and maps is that in maps, the keys can have any type, and this is very useful.

     In objects, the keys are basically always strings, in maps we can have any type of key (it can even be objects, arrays and other maps). 


*/

// The constructor is the same. The easiest way of creating a map is to leave it empty at first.

const restaurantMap = new Map();

// Then, to fill up the map, we can use set method, in which we pass two arguments. The first is the key name and the second is the value (in this example the key is name and the value is the restaurant name itself).

// Set is pretty similar to the .add() method in sets. Both allow us to add a new element to the data structure.

restaurantMap.set("Name", "Classico Italiano");

// As we said, the keys can have any type we want, so 1 restaurant is in Italy and 2 is in Portugal:

restaurantMap.set(1, "Firenze, Italy");
restaurantMap.set(2, "Lisbon, Portugal");

// Calling the method like this does not only update the map that is called on, but also returns the map:

console.log(restaurantMap.set(2, "Lisbon, Portugal"));

// The fact that the .set() method returns the updated map allows us to chain the .set() method:

restaurantMap
  .set("categories", ["Italian", "Pizzeria", "Vegetarian", "Organic"])
  .set("open", 11)
  .set("close", 23)
  .set(true, "We are open")
  .set(false, "We are closed"); // Notice that this is all in one line of code, there is no (,) in between. We will see how useful this is in further lessons.

// 1 - To retrieve data from a map we use the .get() method. All we have to do is to pass the name of the key explicitly having the type in account (a string, a number, a boolean, etc.).

restaurantMap.get("Name");
restaurantMap.get("true"); // The true key is mapped to we are open and the name key is mapped to classico italiano.

// console.log(restaurantMap.get("Name"));
// console.log(restaurantMap.get(true));

// Let's do something with the possibility of having boolean values as keys. Say that we have the current time (it's possible to get it from javascript but we don't know how yet, so we define a variable). Although the solution is cleaver, don't overuse this kind of pattern because it makes the code hard to read. PAY ATTENTION TO THE SYNTAX

const time = 8;

console.log(
  restaurantMap.get(
    // true or false
    time > restaurantMap.get("open") && time < restaurantMap.get("close")
  )
);
// We don't need to specify the condition because the result of the evaluation is going to be true or false, filling the log accordingly.

/*
// My solution. 
restaurantMap.get(
  time > restaurantMap.get("open") && time < restaurantMap.get("close")
    ? console.log(restaurantMap.get(true))
    : console.log(restaurantMap.get(false))
);
*/

// 2 - The .has() method to check if a map contains a certain key.

console.log(restaurantMap.has("categories"));

// 3 - The .delete() method allows us to delete elements from the map by passing the key.

restaurantMap.delete(2);
// Say that restaurant 2 should now be closed.
// console.log(restaurantMap);

// 3 - The .size property logs the size of the map (Not zero based)
console.log(restaurantMap.size);

// 4 - The .clear() method removes all the elements from the map.
// restaurantMap.clear();
// console.log(restaurantMap);

// Let's see how we can use arrays or objects as map keys:

// restaurantMap.set([1, 2, 3], "Test");
// console.log(restaurantMap);

// But how exactly could we get the "Test" value from the map?

// console.log(restaurantMap.get([1, 2, 3])); This returns undefined because, even though we write the exact same array to get the value they are not the same object in the heap. In order to make it work we would have to create the array as a variable and then pass it to read the value out of the map. TAKE A REVISION AT THE PRIMITIVES VS OBJECTS LESSON AT THIS POINT.

const arr = [1, 2, 3];
restaurantMap.set(arr, "Test");
console.log(restaurantMap.get(arr)); // Now they refer to the same place in memory.

// Objects as map keys (this can be very useful with DOM elements because it enables some advanced functionality):

restaurantMap.set(document.querySelector("h1"), "Heading");
// console.log(restaurantMap);

// Maps iteration

// We have learned to create an empty map and then edit elements with the .set() method.

// But there is another way of populating a new map without having to use the .set() method. And this becomes handy when there are a lot of values to set. We are going to implement something like a quiz:

const question = new Map([
  ["question", "What is the best programming language in the world?"],
  // Now we specify the options for the answer, and we can do it by their number:
  [1, "C"],
  [2, "Java"],
  [3, "Javascript"],
  // We need a key for the correct answer:
  ["correct", 3],
  // Then, we can also have a success message:
  [true, "Correct"],
  // And a try again message:
  [false, "Try again!"],
]);
// console.log(question);

// Inside new Map we can pass in an array, this array itself contains multiple arrays and, in each of these arrays, the first position is going to be the key and the second position is going to be the value.

// This method is preferable when we are creating a new map from scratch, however, when we keep adding new elements programmatically, the .set() method is the way to go.

// Notice how the structure of this new map is exactly the same from calling Object.entries(). In both we get an array of arrays, where the first element is the key and the second is the value.

// This means that there is a easy way to convert from objects to maps.

const hoursMap = new Map(Object.entries(openingHours));
// console.log(hoursMap);

// ITERATION - Iteration is possible on maps because they are also iterables. And so, the for loop is also available for them.

// Let's use a for loop to print just the answer option to the console. Remember that this is exactly how we did for objects, but since objects are not iterables we needed the Object.entries() to convert it. Even destructuring happens the same way.

// Keep in mind that we just want to print the answers, in other words, we only want to print an element if the key is a number:

// for (const [key, value] of question) {
//   if (typeof key === "number") console.log(`Answer ${key}: ${value}`);
// }

// Now imagine that this was a real app and we wanted the answers to come from the user:

console.log(question.get("question"));

for (const [key, value] of question) {
  if (typeof key === "number") console.log(`Answer ${key}: ${value}`);
}
// const answer = Number(prompt(`Your answer`));

// My solution
// if (answer === 3) {
//   console.log(question.get(true));
// } else if (answer < 1 || answer > 3) {
//   console.log(`Just option 1 to 3!`);
// } else {
//   console.log(question.get(false));
// }

// Course solution

// question.get("correct"); This returns the value, remember.
// We can take advantage of the booleans by chaining the .get() method

// console.log(question.get(question.get("correct") === answer));

// The result of the evaluation between correct and answer returns true or false, which becomes the key of the next .get method, logging the value.

// Finally, sometimes we also need to convert maps back into arrays.

const conversion = [...question];
// console.log(conversion);

// REMEMBER THAT THE METHODS AVAILABLE FOR ARRAYS ARE ALSO AVAILABLE FOR MAPS

// console.log([...question.entries()]);
// console.log([...question.keys()]);
// console.log([...question.values()]);

// THEY RETURN A MAP ITERATOR if we don't use the spread operator
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/*

    WHICH DATA STRUCTURE TO USE?

    Dealing and working with data is the main thing that we do as developers and that's the reason why we have been working with built-in data structures, such as arrays and objects.

    We have also been introduced to sets and maps in the last lectures, so now, from four data structures, which ones should we choose?

1 -  Where does data actually come from?

    There are essentially three sources of data: 

    1.1 - Data can be written within the program source code itself, like status messages that will be displayed on a webpage based on user actions.

    1.2 - Data can come from the user interface (webpage). It can either be data that the user inputs into some form, or data that is already written in the DOM (user's tasks in a todo app or expenses in a budget app).

    1.3 - Data can come from external sources, which is usually a web API. We can use a web API to get data from other web applications (current weather in any city, data about movies, currency conversion rates).

    No matter where the data comes from and what kind of data it is, we usually always have collections of data that we need to store. To store these collections of data we use data structures. But how to choose the adequate one?

    If we just need a simple list of values we are going to use an array or a set. On the other hand, if we need key value pairs we are going to use objects or maps.

  ARRAYS VS SETS - We already know that we should use them for simple lists of values, when we do not need to describe those values. We should use arrays when we need to store values and when those values might contain duplicates, also, when we need to manipulate data because there are a lot of useful methods. Sets should only be used when working with unique values (remove duplicates) and also when high performance is really important because operations (searching for an item or deleting an item from a set can be 10x faster in sets than in arrays).

  OBJECTS VS MAPS - Should be used when we need to describe the values using keys. Map keys can have any data type, they are easy to iterate and its easy to compute the size of a map. The biggest advantage of objects is probably how easy it is to write them and to access data by simply using the .dot or the brackets operator. Also, most of developers are already used to objects and so they keep using them for simple key value stores. To conclude, maps should be used when you simply need to map keys to values and when you need keys that are not strings. If a function as an method is needed (function as value) you should use objects (existence of the this keyword).
*/

/*
CODING CHALLENGE THREE:


Let's continue with our football betting app! This time, we have a map with a log of the events that happened during the game. The values are the events themselves, and the keys are the minutes in which each event happened (a football game has 90 minutes plus some extra time).

1. Create an array 'events' of the different game events that happened (no duplicates);

2. After the game has finished, is was found that the yellow card from minute 64 was unfair. So remove this event from the game events log;

3. Print the following string to the console: "An event happened, on average, every 9 minutes" (keep in mind that a game has 90 minutes);

4. Loop over the events and log them to the console, marking whether it's in the first half or second half (after 45 min) of the game, like this:
      [FIRST HALF] 17: ⚽️ GOAL

GOOD LUCK 😀
*/

const gameEvents = new Map([
  [17, "⚽️ GOAL"],
  [36, "🔁 Substitution"],
  [47, "⚽️ GOAL"],
  [61, "🔁 Substitution"],
  [64, "🔶 Yellow card"],
  [69, "🔴 Red card"],
  [70, "🔁 Substitution"],
  [72, "🔁 Substitution"],
  [76, "⚽️ GOAL"],
  [80, "⚽️ GOAL"],
  [92, "🔶 Yellow card"],
]);

// 1
// const events = new Set(gameEvents.values()); This alone isn't enough because it returns a set when we need an array, so:

const events = [...new Set(gameEvents.values())];
console.log(events);

// MY SOLUTION

// let array = [];

// for (const [, value] of gameEvents) {
//   array.push(value);
// }
// const events = new Set(array);
// console.log(events);

// 2

gameEvents.delete(64);
// console.log(gameEvents);

// 3
console.log(
  `An event happened, on average, every ${90 / gameEvents.size} minutes`
);

// If we wanted to be more precise:
const clock = [...gameEvents.keys()].pop();
// console.log(clock); first we select the game events keys, turn it into an array, destructure it and pop the last element (remember that the pop returns the popped), which dictates the last events time in this case. Then we just need:

console.log(
  `An event happened, on average, every ${clock / gameEvents.size} minutes`
);

// 4

for (const [min, event] of gameEvents) {
  const half = min <= 45 ? "FIRST" : "SECOND";
  // console.log(`[${half} HALF] ${min}: ${event}`);
}

// for (const [key, value] of gameEvents) {
//   if (key <= 45) {
//     console.log(`[FIRST HALF] ${key}, ${value}`);
//   } else if (key >= 45 && key <= 90) {
//     console.log(`[SECOND HALF] ${key}, ${value}`);
//   } else console.log(`[OVERTIME] ${key}, ${value}`);
// }
