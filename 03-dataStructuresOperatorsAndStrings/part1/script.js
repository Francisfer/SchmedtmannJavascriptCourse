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

    DESTRUCTURING ARRAYS.

    In this section we are going to continue learning basic syntax and basic javascript features, but now with focus on more modern javascript.

    The theme of this section is the simulation of a food delivery application with no user interface, just javascript, in the next lesson we will work with a ui and make the whole process. For now, let's focus on built in data structures and modern advanced operators.

*/

// Let's start with array destructuring, which is an esx feature and it's basically a way of unpacking values from an array or an object into separate variables. In other words destructuring is to break a complex data structure down into a smaller data structure like a variable.

// For arrays, we use destructuring to retrieve elements from the array and store them into variables in a very easy way.

const arr = [2, 3, 4];
// If we wanted to retrieve each value into separated variables without destructuring, it would look like this:

const a = arr[0];
const b = arr[1];
const c = arr[2];

const [x, y, z] = arr; // With destructuring, we can declare all three variables at the same time. The brackets reminds us of an array, but its actually not, whenever javascript sees them on the left side of the (=) it assumes destructuring.
console.log(x, y, z);
// console.log(arr); we are not changing the original array, we are just unpacking it.

// Let's now work with the data from out restaurant. We have some arrays in there: the categories starter menu and main menu. Let's retrieve some elements out of them:

/*
const [first, second] = restaurant.categories; // We don't need to retrieve all the elements, we can specify the ones we want with the order in which they appear inside of the array.
console.log(first, second); // Italian and pizzeria.
*/

// What if we just wanted the first and third values from the categories array?

const [first, , second] = restaurant.categories; // Don't get confused with the name of the variable being second on the third position. We can name variables as we want.
console.log(first, second); // Now first and second are Italian and vegetarian.

// This allows us to be very versatile, let's say that the owner of the restaurant wanted to switch the first with the second category. Basically make vegetarian the main(first) and italian the secondary(second) category.

let [main, , secondary] = restaurant.categories; // Let because we need to reassign for the first technique.

// Without destructuring, we would need to create a temporary variable to assign one of them (main), then main becomes secondary and secondary becomes temp. Remember the exercise with the boxes, if we wanted to switch the content of one box to another without touching the ground, we would need a third box (variable).

// const temp = main;
// main = secondary;
// secondary = temp;
// console.log(main, secondary);

// With destructuring we can make things much easier: just pay attention to the order of the code. If we take it by steps, we start by creating a new array with the variables inverted: [secondary, , main] / then we can simply reassign them with the destructuring technique.

[main, , secondary] = [secondary, , main];
console.log(main, secondary);

// Another technique with destructuring is that we can have a function returning an array and immediately destruct that array into different variables. Basically, this allows us to return multiple values from a function.

// Lets write a function to order food. Check the method order created in the restaurant object. This is a function that accepts two parameters: one index for the starter menu and another for the main menu. The user basically orders by giving the index. Then we need to return the values of the index position chosen by the user.

console.log(restaurant.order(2, 0)); // garlic bread and pizza in an array.

// Now we can destructure the array, this is a very handy way of immediately create two variables out of one function call:

const [entry, mainDish] = restaurant.order(2, 0);
console.log(entry, mainDish);

// Now, let's say that we have a nested array

const nested = [2, 4, 8, [5, 6]];
// How can we get the first value(2) and the entire nested array?

// const [j, , , k] = nested;
// console.log(j, k); // This gives us the number two and the array [5,6], but what if we wanted the individual values?

// We need to do destructuring inside destructuring:

const [j, , , [f, q]] = nested;
console.log(j, f, q);

// Another feature of destructuring is the possibility of setting default values for the variables when we are extracting them. This is particularly handy when we don't know the length of the array. Imagine that we don't know the length of the next array [8,9] and we actually try to take three values out of a two values array.

const [r = "c", w = "c", m = "c"] = [8, 9];
console.log(r, w, m); // we get undefined on the m variable log.

// Here we can set the default value of "m" to all of them so we can easily see that we are trying to retrieve an element at a position that doesn't exist. The example in the lecture used the number one, but since we are using numbers it thought that would be clearer to put a string. This is useful when getting data from an api, maybe that's because he used a number.

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/*

    DESTRUCTURING OBJECTS.

      Instead of the brackets we use the curly braces to destructure.

      Then, all we have to do is to provide the variable names exactly matching the property names that we want to retrieve from the object. The first an obvious object to destructure is the restaurant object, so let's take the name, categories, and opening hours.
*/

const { name, openingHours, categories } = restaurant; // since the order in objects does not matter, we don't need to manually skip elements like we did in an array, we simply need to write the name.

console.log(name, openingHours, categories); // The name variable has a notation because declaring a variable with name is deprecated.

// Let's say that we don't actually want to create variables with the exact same property name:

const {
  name: restaurantName,
  openingHours: hours,
  categories: tags,
} = restaurant;

console.log(restaurantName, hours, tags);

// As we said before, the full potential of these techniques will only be known when we start working with third party data like api's. And, also in that perspective, the possibility of setting default values is very important for the case that we are trying to read a property that does not exist on the object. Usually we get undefined. We can also combine the syntax for attributing a different name to the variable at the same time that we give the default value (empty array in this case):

const { menu = [], starterMenu: starters = [] } = restaurant;
console.log(menu, starters); // you can see the default value getting applied to menu.

// Next, we are going to talk about mutating variables while destructuring objects, like we did with arrays. With objects it works a little different.

let u = 111;
let i = 999;
const obj = { u: 23, i: 7, c: 14 };

// We want to mutate u and i, so that u becomes 23 and i becomes 7.

// const { u, i } = obj; - We cannot say const u and i because they are already declared above.

// let { u, i } = obj; - we also cannot say let because it would reassign variables that we already have.

// { u, i } = obj; Like this we get a syntax error because when we start a line with a curly brace javascript expects a code block, and since we cannot assign (=) anything to a code block, we get this error. The solution is to wrap all the code line with parenthesis.

({ u, i } = obj);
console.log(u, i);

// NESTED OBJECTS : Let's say that we wanted to create two variables: open and close. These should contain the open and close hours for friday. Opening hours is an object and inside of it we have another object. Friday is an object inside of the opening hours object, which is inside of the restaurant object.

// We are going to work with the opening hours object, remember that we already destructured the restaurant object and created the variable openingHours to store that object.  console.log(openingHours);

const { fri } = openingHours;
console.log(fri); // friday is the object in the log, but we want two variables, one called open and other called closed. So we can further destructure the friday object using this syntax:

const {
  fri: { open, close },
} = openingHours;
console.log(open, close);

// If we didn't wanted the same name that we have in the object:

const {
  fri: { open: aberto, close: fechado },
} = openingHours;
console.log(aberto, fechado);

// To further destructure use the colon and then {}, to just rename use the colon.

// Practical application of the destructuring technique - Many times in javascript we have functions with a lot of parameters and it can be hard to know their order. So, instead of defining the parameters manually, we can just pass an object into the function as an argument and the function will immediately destructure that object. See the order delivery method.

// const restaurant = {
//   name: "Classico Italiano",
//   location: "Via Angelo Tavanti 23, Firenze, Italy",
//   categories: ["Italian", "Pizzeria", "Vegetarian", "Organic"],
//   starterMenu: ["Focaccia", "Bruschetta", "Garlic Bread", "Caprese Salad"],
//   mainMenu: ["Pizza", "Pasta", "Risotto"],
//   openingHours: {
//     thu: {
//       open: 12,
//       close: 22,
//     },
//     fri: {
//       open: 11,
//       close: 23,
//     },
//     sat: {
//       open: 0, // Open 24 hours
//       close: 24,
//     },
//   },
//   order: function (starterIndex, mainIndex) {
//     return [this.starterMenu[starterIndex], this.mainMenu[mainIndex]];
//   },

/* PHASE ONE:

 1 - orderDelivery: function (obj) {
     console.log(obj);
   },

   PHASE TWO:

 3 - orderDelivery: function ({ starterIndex, mainIndex, time, address }) {
    console.log( - 4
      `Order received! ${this.starterMenu[starterIndex]} and ${this.mainMenu[mainIndex]} will be delivered to ${address} at ${time} hours.`
    );
  },
};

  PHASE THREE: 5
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

*/

// 1 - We start by calling the argument obj and log it to the console.

// Then we call the function with (passing in) an object of options:
restaurant.orderDelivery({
  time: "22.30",
  address: "Via del Sole, 21",
  mainIndex: 2,
  starterIndex: 2,
});

// 3 - Now, we can actually do destructuring right here in the parameter with the exact four property names that we used to call the function. We usually write the function first and then call it, but for lesson purposes it makes more sense doing things in this order.

// 4 - Now, because we've destructured the object, we actually have four variables that we can log to the console, or make a string out of the information.

// 5 - Using the default values in case some property is not defined. As we can conclude by the log, the time is at the default value that we've specified. But we also didn't include the main index property, the meal appears because we set the default value to the 0 position. If we assume that its a real application and the user actually doesn't want the main meal, the logic can be that the position 0 of each property with an array of choices is always none? The course don't explain but since he placed the zero as default it may be because of that, since a string logs as undefined.

restaurant.orderDelivery({
  address: "Via del Sole, 21",
  starterIndex: 1,
});

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/*

   THE SPREAD OPERATOR.

    We can use the spread operator to basically expand an array into all of its elements (unpacking all the array elements at once).


    
*/

const array = [7, 8, 9];
// Let's say that we have an array and we want to create a new array based on this one, but with some new elements at the beginning.

const badArray = [1, 2, array[0], array[1], array[2]];
console.log(badArray);
// With the techniques that we've learned, we either have to loop over this array or, even worst and as shown above, do it manually.

// Since es6 we can do it in a much better way using the spread operator:

const goodArray = [1, 2, ...array];
console.log(goodArray);

// What the spread operator does is to basically take all the values out of the array and write them individually as we would have done manually.

// This means that we can use the spread operator whenever we would otherwise write multiple values separated by commas. That situation happens whenever we write an array literal (like we did with array) and when we pass arguments into functions. Let's say that we've wanted to log the individual elements of the goodArray:

// console.log(goodArray); This way we just log one value which is the array, but we want to log the individual values, so we use the spread operator:

console.log(...goodArray);

// To resume, we can use the spread operator whenever we need the individual elements of an array or when we need to pass multiple elements into a function like we did with the log.

// Example: let's say that we wanted to create an array with one more food item in the main menu of the restaurant.

const newMenu = [...restaurant.mainMenu, "Gnocci"];
console.log(newMenu);

// Keep in mind that we are creating a new array, we are not manipulating the restaurant.mainMenu array.

// You might have noticed that the spread operator is a bit similar to destructuring because it also help us to get elements out of arrays. The big difference is that the spread operator takes all the elements from the array and doesn't create new variables. As a consequence, we can only use it in places where we would, otherwise, write values separated by commas.

// Two important use cases of the spread operator:

// Create shallow copies of arrays:

const mainMenuCopy = [...restaurant.mainMenu]; // Similar to object.assign but here the syntax is a lot easier to use.
console.log(mainMenuCopy);

// Merge two arrays together (starterMenu and the mainMenu)

const mergedMenu = [...restaurant.starterMenu, ...restaurant.mainMenu];
console.log(mergedMenu);

// Besides arrays, the spread operator works on all iterables. There are different iterables in javascript, we will talk about all of them by the end of the course but, for now, know that iterables are things like arrays, strings, maps or sets but NOT objects. Basically, most of the built-in data structures in javascript are now iterables, with the exception of objects.

// Since strings are also iterables, it means that we can use the spread operator on a string as well. We want to create an array that contains all the individual letters of str and some more elements:

const str = "Francisco";

const letters = [...str, "", "F."]; // The empty space without the "" logs as empty.
console.log(letters);

// Keep in mind that we can still ONLY use the spread operator when building an array or when we pass values into a function (where multiple values separated by a comma are expected):

console.log(...str, "", "F."); // Now with the individual letters.

// Let's now write a function as a method that accepts multiple arguments and then use the spread operator to actually pass those arguments.

// We need a method to order just pasta, and the pasta always needs to have exactly three ingredients (arguments).

// const pasta = [
//   prompt("Ingredient one?"),
//   prompt("Ingredient two?"),
//   prompt("Ingredient three?"),
// ];
// console.log(pasta);

// restaurant.orderPasta(...pasta);

/*

MY SOLUTION 

  Although the string log is correct, its much better to store the prompts into a string to later pass in the method with the spread operator.

const pasta = restaurant.orderPasta(
  prompt("Ingredient one"),
  prompt("Ingredient two"),
  prompt("Ingredient three")
);
console.log(pasta); // Undefined
*/

// Since ES2018, the spread operator also works on objects, even though objects are not iterables.

// When we started to approach the spread operator, the first exercise was to create a new array based on another array. Now let's do the same with the restaurant object:

const newRestaurant = { foundedIn: 1988, ...restaurant, founder: "Giuseppe" }; // The order does not matter
console.log(newRestaurant);

const newRestaurantCopy = { ...newRestaurant };
newRestaurantCopy.name = "Ristorante";

console.log(newRestaurantCopy); // We have indeed created a copy of the object, otherwise the name of both would be the same as we've seen in previous lessons.

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// REST PATTERN AND PARAMETERS.

// The rest pattern looks exactly like the spread operator (the same syntax with the three dots) but does the opposite of the spread operator.

// Remember that we've used the spread operator to build new arrays or to pass multiple values into a function. Those are the use cases of the spread operator and, in both cases, we have used the spread operator to expand an array into individual elements.

// The rest parameter uses the same syntax to COLLECT multiple elements and condense them into an array. So, spread operator is to unpack an array while rest is to pack elements into an array.

const arrayHere = [5, 4, 6, 7, 8, ...[3, 5]];
console.log(arrayHere);

// We've wanted to create a new array based on an existing array, and use the spread operator to expand that. Here, we are still using the spread syntax, and we know that because we are using it on the right hand side of the assignment operator (the equal sign).

// However, we can use it on the left side of the assignment operator, together with destructuring. Let's say that we are destructuring this array [1,2,3,4,5] and we want to take the first element (1) and store it in variable one, the second (2) and store it in two and the rest of the elements in the others variable using the rest syntax:

const [one, two, ...others] = [1, 2, 3, 4, 5];
console.log(one, two, others);

// Let's use another example with the restaurant object. We build an array that will be the entire menu using the spread operator: [...restaurant.mainMenu, ...restaurant.starterMenu]. Now we can use the rest pattern while we are destructuring. We want to store pizza and risotto from the main menu into different variables and the rest into other food:

const [pizza, , risotto, ...otherFood] = [
  ...restaurant.mainMenu,
  ...restaurant.starterMenu,
];

console.log(pizza, risotto, otherFood);

// Indeed we have the strings pizza, the string risotto and then all the rest of the elements that we didn't select into their own variables. Notice that the rest syntax collects all the array elements AFTER the last variable (risotto in this example). It does not include any skipped elements like we've did with pasta. The rest pattern always must be the last in the destructuring assignment.

// Let's say that we also wanted to store one or more elements of the starterMenu array. In that case we just need to follow their position as if they were merged:

// const [pizza, , risotto, focaccia, , garlic, ...otherFood] = [
//   ...restaurant.mainMenu,
//   ...restaurant.starterMenu,
// ];
// console.log(pizza, risotto, focaccia, garlic, otherFood);

// Using the rest parameter with objects (the difference is that the remaining elements will be collected into a new object and not into a new array).

// Let's work with the openingHours object, selecting only saturday:

const { sat, ...weekDays } = restaurant.openingHours;
console.log(sat, weekDays); // Remember that the order does not matter, the variable names must match the ones in the object.

//  FUNCTIONS - Pass multiple arguments into functions all at the same time.

// We want to take an arbitrary amount of arguments and simply add them together.

// For that we will use the rest pattern (rest parameters in this case).

const add = function (...numbers) {
  // console.log(numbers);if we log it we cant see the rest parameter packing the numbers into an array.
  let sum = 0;
  for (i = 0; i < numbers.length; i++) {
    sum += numbers[i];
  }
  console.log(sum);
};
// This is now a function that can accept any number of parameters

add(2, 3);
add(5, 3, 7, 2);
add(8, 2, 5, 3, 2, 1, 4);

const e = [5, 6, 5, 6, 7, 3];
// What if we wanted to use this array to call the function?

add(...e); // we simply use the spread operator. Here, we spread the values automatically instead of doing it by hand, and then compress them into an array again when we call the function. (...numbers).

// Let's now use rest parameters in the restaurant object for some edge cases. The pizza must have at least one ingredient, the other are optional.

restaurant.orderPizza("Mushrooms", "onion", "olives", "spinach");

// TO CONCLUDE: The spread and the rest syntax look exactly the same, but they work in opposite ways depending on where they are used. The spread operator is used where we, otherwise, write values separated by a comma. On the other hand, the rest pattern is basically used where we, otherwise, write variable names separated by commas. (values vs variable names).

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/*

SHORT CIRCUITING (&& AND ||)

    Let's go back to two of the logical operators that we have studied before but didn't explore their full potential.

    We can use the and operator and the or operator for something called short circuiting.

    So far, we've used logical operators only to combine boolean values, but we can do a lot more with the && and ||.

*/

// Logical operators can use any data type, they can return any data type and they do something called short circuiting (short circuit evaluation).

// Short circuiting - In the case of the or operator, short circuiting means that if the first value (operand) is truthy, it will immediately return that value without evaluating the other operands (returns the first truthy value that finds, and if it finds none it returns the last).

console.log("-------- OR --------");

console.log(3 || "Francis"); // We used two values that are not booleans and the result (return value) is 3, not a boolean too.
console.log("" || "Francis"); // "Francis" because "" is falsy.
console.log(true || 0); // True
console.log(undefined || null); // null because its the last operand.

console.log(undefined || 0 || "" || "Hello" || 23 || null); // "hello" - the first truthy, when its found it shortcuts the entire evaluation and returns that same value.

// It follows the order of the operand itself, if one is true, then the condition is also true.

// Let's now see a more practical application of this in the restaurant object. Say that there might be a property on the restaurant object with the numbers of guests, but we don't know if it exists. We want to define a variable based in numGuests and set a default value if it doesn't exist (10).

// restaurant.numGuests = 0; // If it is defined we get 23. Uncomment!

const guests1 = restaurant.numGuests ? restaurant.numGuests : 10;
console.log(guests1);

// We can take advantage of short circuiting and the or operator to be more simple instead of an if/else statement or the ternary operator:

const guests2 = restaurant.numGuests || 10;
console.log(guests2);

// Before we talk about the and operator, there is something that we need to acknowledge. Both of this previous solutions will not work when the number of guests is zero. The output is 10 because the restaurant.numGuests becomes zero (the actual number of guests) and its a falsy value, so the second condition (10) gets assigned to guests. WE WILL EXPLORE A GOOD SOLUTION TO THIS PROBLEM IN THE NEXT LECTURE.

/*

AND OPERATOR SHORT CIRCUITING:

    When it comes to short circuiting, the and operator works in the exact opposite way of the or operator.
*/
console.log("-------- AND --------");

console.log(0 && "Francis"); // The and operator short circuits when the first value is falsy, and returns that same falsy value (0) without evaluating the second operand. It makes sense with the properties of the operator itself (if one condition is false then all the evaluation is false).

console.log(7 && "Francis"); // Returns Francis because is the last value of the evaluation.

console.log("Hello" && 23 && null && "Francis");

// Practical example - If restaurant.orderPizza exists, if yes call it.

if (restaurant.orderPizza) {
  restaurant.orderPizza("mushrooms", "spinach");
}

// Many times we can avoid an if statement when all we want to do is to check if a property or value exists. restaurant.orderPizza makes the evaluation (if restaurant.orderPizza exists), then, if yes, call it restaurant.orderPizza("Mushrooms", "spinach"). If it doesn't exists nothing happens because it gets set to undefined (falsy) and, as a consequence, short circuits the evaluation.

restaurant.orderPizza && restaurant.orderPizza("Mushrooms", "spinach");

/*

THE NULLISH COALESCING OPERATOR (??)

  Remember that previously this solution didn't work for zero guests.
*/

restaurant.numGuests = 0;

const guests = restaurant.numGuests || 10;
console.log(guests);

const guestsCorrect = restaurant.numGuests ?? 10;
console.log(guestsCorrect);

// This works because the nullish coalescing operator works with the concept of nullish values instead of falsy values. Nullish values are null and undefined, it does not include zero (0) or the empty string (""). Only nullish values will short circuit the evaluation here. If we comment out the number of guests, the first operand becomes undefined, and the second gets executed and returned.

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/*

LOGICAL ASSIGNMENT OPERATORS.

  Even more modern than the nullish coalescent operator, are three new logical assignment operators introduced en es2021.


*/

// Let's create two new restaurants objects:

const rest1 = {
  name: "Capri",
  // numGuests: 20,
  numGuests: 0,
};

const rest2 = {
  name: "La Piazza",
  owner: "Giovanni Rossi",
};

// Now, what we want to do is to set a default number of guests for restaurant objects that do not have that property. In our case is just rest2, but lets pretend that we got this restaurants from some kind of API and we want to apply something to all of them (adding the number of guests to the objects that don't have them).

// rest1.numGuests = rest1.numGuests || 10;
// rest2.numGuests = rest2.numGuests || 10;
// console.log(rest1, rest2);

// Let's introduce the very first logical assignment operator, THE OR ASSIGNMENT OPERATOR. With this operator we will be able to write the same thing in a more concise way.

// rest1.numGuests ||= 10;
// rest2.numGuests ||= 10;
// console.log(rest1, rest2);

// Basically, this operator assigns a value to a variable if that variable is currently falsy. The same as above, however, we have the same problem as before if the number of guests is zero because this operator does not work with the concept of nullish values (it works with the concept of falsy values).

// To resolve this problem we have the NULLISH ASSIGNMENT OPERATOR, it sounds complicated, but in fact we just change the or for the nullish coalescing operator (??):

rest1.numGuests ??= 10;
rest2.numGuests ??= 10;
// console.log(rest1, rest2);

// This operator assigns a value to a variable if that variable is currently nullish (null or undefined) as currently is in rest2.

// We do also have the logical AND ASSIGNMENT OPERATOR. To learn about that one, let's say that we want to anonymize the names of the restaurant owners. So, when there currently is an owner, like in rest2 object, we want to replace the string with anonymous.

// rest2.owner = rest2.owner && "<<<Anonymous>>>";

// Remember that this works because of short circuiting, particularly in the case of the && operator, it short circuits when the first value is falsy, returning that falsy value. Because the first value is truthy, the second value will be evaluated and returned.

// rest1.owner = rest1.owner && "<<<Anonymous>>>"; Returns undefined because res1.owner does not exist, its undefined and that's exactly what's returned.

// We can now replace the duplicate variable with the && assignment operator. In this case, the log is different for rest1, because its simply not there, instead of returning undefined. Basically, what the logical && assignment operator does is to assign a value to a variable if that variable is truthy.

rest1.owner &&= "<<<Anonymous>>>";
rest2.owner &&= "<<<Anonymous>>>";
// console.log(rest1, rest2);

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/*

CODING CHALLENGE ONE:

We're building a football betting app (soccer for my American friends 😅)!
Suppose we get data from a web service about a certain game (below). In this challenge we're gonna work with the data. So here are your tasks:

1. Create one player array for each team (variables 'players1' and 'players2')

2. The first player in any player array is the goalkeeper and the others are field players. For Bayern Munich (team 1) create one variable ('gk') with the goalkeeper's name, and one array ('fieldPlayers') with all the remaining 10 field players

3. Create an array 'allPlayers' containing all players of both teams (22 players)

4. During the game, Bayern Munich (team 1) used 3 substitute players. So create a new array ('players1Final') containing all the original team1 players plus 'Thiago', 'Coutinho' and 'Perisic'

5. Based on the game.odds object, create one variable for each odd (called 'team1', 'draw' and 'team2')

6. Write a function ('printGoals') that receives an arbitrary number of player names (NOT an array) and prints each of them to the console, along with the number of goals that were scored in total (number of player names passed in)

7. The team with the lower odd is more likely to win. Print to the console which team is more likely to win, WITHOUT using an if/else statement or the ternary operator.

TEST DATA FOR 6: Use players 'Davies', 'Muller', 'Lewandowski' and 'Kimmich'. Then, call the function again with players from game.scored
GOOD LUCK 😀

*/

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
  printGoals: function (...playerName) {
    for (i = 0; i < playerName.length; i++) {
      console.log(playerName[i]);
    }
    console.log(`${playerName.length} goals scored in total!!`);
  },
};

// 1

const [players1, players2] = game.players;
console.log(players1, players2);

// const players1 = game.players[0];
// const players2 = game.players[1];
// console.log(players1);
// console.log(players2);

// 2
const [gk, ...fieldPlayers] = players1;
console.log(gk, fieldPlayers);

// 3
const allPlayers = [...players1, ...players2];
console.log(allPlayers);

// 4

const players1Final = [...players1, "Thiago", "Coutinho", "Perisic"];
console.log(players1Final);

// 5

// In my solution i went straight to the game.odds, but to train nested destructuring in objects is better to do like the course.

// const { team1, x: draw, team2 } = game.odds;
// console.log(team1, draw, team2);

const {
  odds: { team1, x: draw, team2 },
} = game;
console.log(team1, draw, team2);

// 6

game.printGoals(...game.scored);

// 7

// Both give the same result
team1 > team2 || console.log(`Team one is more likely to win`);
team1 < team2 && console.log(`Team one is more likely to win`);

// Doing the same to have an output if the odds were the other way around.
team1 > team2 && console.log(`Team two is more likely to win`);
team1 < team2 || console.log(`Team two is more likely to win`);

// Both solutions were right, however, remember that the || operator short circuits when a truthy value is found; the && operator short circuits when a falsy value is found.

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
