"use strict";

/*

    Default parameters.

    Sometimes is useful to have functions where some parameters are set by default. This way we don't have to pass them manually in case we don't want to change the default. 


*/

// Let's now create a very basic booking function, starting with the knowledge that we already have (without the default parameters). In this function we need to pass in the flight number, the number of passengers and the price.

// Then, let's use this data to create an object and push that into an empty bookings array. Notice that we use the enhanced object literal syntax (we don't need to do flightNum: flightNum), we just need to define a variable (flightNum) and that will then create a property with this name and also the value that's in the variable.

// Remember that the purpose of this lesson is to demonstrate the es6 way of setting default values, so, if we call this function with just the flightNumber we get undefined on the other two parameters.

// 1 - Undefined is a falsy value, so we can use this to our advantage with short circuiting. In order to set a default value the old way, we would have to reassign the parameters at the beginning of the function (numPassengers = numPassengers || 1).

// 2 - With es6, all we need to do is to set the default parameter directly on the function parameter.
// const createBooking = function (flightNum, numPassengers = 1, price = 199)

// 3 - The default values can contain any expression, so we can dynamically calculate, in this example, the price based on the number of passengers. It's important to remember that the order is important to use this functionality, we couldn't calculate the price based on the number of passengers if those parameters were in another order.

//  const createBooking = function (flightNum, price = 199 * numPassengers, numPassengers = 1) wouldn't work because at the time that we want to calculate the price, numPassengers is not read yet.

const bookingArray = [];

const createBooking = function (
  flightNum,
  numPassengers = 1,
  price = 199 * numPassengers // 3
) {
  /*
    1 - ES5 way
  numPassengers = numPassengers || 1; 
  price = price || 199;
    */
  const booking = {
    flightNum,
    numPassengers,
    price,
  };
  // console.log(booking);
  bookingArray.push(booking); // Pushing the data into the empty array.
};

createBooking("LH123");
createBooking("LH123", 2, 800);
createBooking("LH123", 5);
createBooking("LH123", 6);

// Another important thing is that we cannot skip parameters when calling the function. Let's say that we wanted to leave the numPassengers with the default value and specify the price:

// createBooking("LH123", ,1000); This produces an error.
// createBooking("LH123", 1000); This sets 1000 to the numPassengers

// So one way of doing this is to set the value of the parameter that we want to skip to undefined, because setting to undefined is the same thing as not even setting it, so we get the default parameter that we've specified.
createBooking("LH123", undefined, 1000);

console.log(bookingArray);

//////////////////////////////////////////////////////////////////////////////

/*

  How passing arguments works - value vs reference.

  This lecture talks about how passing arguments into functions works. In case of reviewing the course go back to the sections that include: 

    Primitives vs objects (how primitive types and objects are stored in memory) @ 03 javascript behind the scenes - line 397.

    Short circuiting - @ 03 data structures operators and strings line 468. 

  This is a review of those lectures but applied to functions, its very important to really understand how primitives and objects work in the context of functions.

*/

// Let's draw a simple example. Set a flight number and an object that is basically the data from a passenger (name and passport).

const flight = "LH234";
const francisco = {
  name: "Francisco",
  passport: 3579309684598067,
};

// Now let's create a checkIn function that is used when the passenger already bought the ticket and is ready to check in. When writing functions, always remember that is good practice to see how exactly we are going to call it before we go further in the code.

// Imagine that the flight number has changed, that can happen in the checkIn function. Although is bad practice to change the parameters of a function, this is done only to make a point. We are going to change the flightNum to another, and also the name of the passenger to add Mr. Then we just check if the passport number is correct (assume that we get this number from a database).

const checkIn = function (flightNum, passenger) {
  flightNum = "LH999";
  passenger.name = `Mr ${passenger.name}.`;

  if (passenger.passport === 3579309684598067) {
    alert("Checked in");
  } else {
    alert("Wrong passport");
  }
};

// checkIn(flight, francisco);

// console.log(flight);
// console.log(francisco);

// Have in mind that, at this point, the objective is to change the flight number and the name of the passenger. However, when we log flight, notice that the flight number still the same that we had before, although we "changed it" in the function parameter. Also, the francisco object have indeed changed to include Mr before the name.

//  PRIMITIVE
// This happens because flight is a primitive type (its just a string). As we pass this value into the function, the flightNum parameter is basically a copy of the original value (so its a completely different variable). Therefore, when we change it to the new flight number, this don't get reflected in the outside flight variable (still LH234). Its the same as doing this: const flightNum = flight;

//  REFERENCE
// On the other hand, the francisco object that we passed in (called passenger in the function argument) was indeed affected by the change in its original value. This happens because when we pass a reference type into a function, what is copied is really just a reference to the object in the memory heap. Its the same as doing this: const passenger = francisco;

// As we know, when trying to copy an object like this, we are really just copying the reference to that object in the memory heap, but they both point to the same object in memory. This is exactly what is happening with the francisco object here, as we pass it into the checkIN function, where is called passenger. Manipulating the passenger object is the same as manipulating the francisco object.

// To recap, passing a primitive type into a function is just the same as creating a copy, the value is simply copied. On the other hand, when we pass an object, whatever we change in the copy will gets reflected in the original.

// We need to be careful with this behavior and always keep it in mind because it can have serious consequences in large code bases. This is specially true when working with multiple developers in large code bases.

// Let's write another quick function so that you can be prepared for real life situations. Create a new function newPassport that accepts any person and changes that persons passport number.

const newPassport = function (person) {
  person.passport = Math.trunc(Math.random() * 100000000000);
};

// newPassport(francisco); // Now we call the function with the francisco object. Imagine that we booked the flight with the original passport number, that number is the one that will be compared in the checkIn function (hardcoded value). But now we change the passport number before we checkIn:

//checkIn(flight, francisco); // As you can see in the alert, the passport number is now wrong. This happens because we have two functions manipulating the same object and this is creating a problem.

console.log(francisco); // As we pass the francisco object in the newPassport function (called person in the function argument), the object is manipulated and, as consequence, the change is also reflected in the original (francisco). So, when we pass that object in the checkIn function the passport number is already manipulated, alerting the wrong number.

// In programming, there are two terms that are used frequently when dealing with functions, which are passing by value and passing by reference. Many new javascript programmers can be confused by these terms. To clarify, javascript does NOT have passing by reference, only passing by value, even though it seems like its passing by reference. There are languages like C++ where you can pass a reference to any value instead of the value itself. This works even with primitives, so you could pass a reference to the value 5 and the original value (outside of the function) would be changed as well. This is called pass by reference, but once again, javascript does not have pass by reference.

// This can be confusing because, as we just learned, for objects we do in fact pass in a reference (the memory address of the object). However, that reference itself is still a value, but a value that contains a memory address. Basically, we pass a reference to the function but we do not pass by reference, this is an important distinction.

//////////////////////////////////////////////////////////////////////////////

/*

    First class and higher order functions.

A fundamental property of the javascript language is the fact that it has first class functions. This enables us to write higher order functions but what is it all about?

  First class functions are like first class citizens. This means that functions are simply treated as values. Functions are really just another type of objects in javascript, since objects are values, functions are values too. 

  If functions are values, there is a lot that we can do with them, like storing them in variables or object properties (which we did a couple of times before).

  We can also pass functions as arguments to other functions (event listeners or event handlers to DOM objects)

  We can also return a function from another function.

  Finally, remember that functions are objects, so just like in objects we have function methods (methods that we can call on functions).

  Having first class functions in javascript makes it possible to write and use higher order functions. Higher order function is either:
  
      A function that receives another function as an argument (event listeners - the function that is passed as the event handler is usually called a callback function, because it will be called later, by the higher order function, which in this example is the event listener function)
      
      A function that returns a new function. This is an advanced feature that will be better explained in the next lessons.
      
  To finish this introduction, there seems to be a confusion between first class functions and higher order functions. Some people think that they are the same thing, but actually they mean different things.

      First class functions is just a feature that a programming language either have or not. All it means is that all functions are values, that's it, there are no first class functions in practice, its just a concept.

      There are, however, higher order functions in practice, which are possible because the language supports first class functions. Its a subtle difference, but important to have in mind.
*/

// Let's now write our own higher order functions to demonstrate how they work. In this lecture, we are going to create a function that accepts other functions as an input.

// To start, we write two simple generic functions that so simple string transformations. OneWord replaces all the spaces in a word and converts it to lower case, upperFirstWord converts the first word to upper case.

const oneWord = function (str) {
  return str.replaceAll(" ", "").toLowerCase();
};

const upperFirstWord = function (str) {
  const [first, ...rest] = str.split(" "); // Always have in mind these techniques.
  return [first.toUpperCase(), ...rest].join(" ");
};

// Now that we have the generic functions we are ready to create a higher order function. This function is called transformer, it will also take a string, but, as a second argument, it will take a function. While building the function, remember that its very useful to actually see how we would call it before working on the code.

const transformer = function (str, fn) {
  console.log(`Original string: ${str}`);
  console.log(`Transformed string: ${fn(str)}`); // This is where we call the function
  console.log(`Transformed by: ${fn.name}`); // Name is a function property, remember that functions also have methods.
};

transformer("Javascript is the best!", upperFirstWord); // Notice how we are just passing the value of the function and not calling it.
transformer("Javascript is the best!", oneWord); // The callback function, because we don't call it here, but in the function itself.

// Another example:

const high5 = function () {
  console.log("👋");
};
// document.body.addEventListener("click", high5); // addEventListener is the higher order function and high5 is the callback function.

// Using the forEach() built in function that we call on arrays:

// ["Jonas", "Martha", "Adam"].forEach(high5); // We will talk about the forEach() method in the next lesson, what matters here is that we have used the concept of callback function.

// The use of callback functions is very frequent and vital in Javascript for many reasons: first, it makes it easier to split up out code into more reusable and interconnected parts; second and most important is that it allows us to create abstraction. Abstraction is the possibility of hiding the details of some code implementation because we don't really care about that detail, which allows us to think about problems in a higher/more abstract level. Knowing this, is now obvious why we say higher order functions, because they operate at a higher level of abstraction, leaving the low level details to the low level functions.

//////////////////////////////////////////////////////////////////////////////

/*

  Functions returning functions.

  Here we are going to talk about the opposite of what we've been doing in the last lecture. Let's built a function that returns a new function.

  The sense of it all might be a bit confusing, however the explanation will go deeper at the end of the course because this concept is more used in the functional programming paradigm instead of OOP.

*/

const greet = function (greeting) {
  return function (name) {
    console.log(`${greeting} ${name}`);
  };
};

greet("Hey"); // The result of calling this functions is going to be the returned function, so we can store it into a variable:

const greeterHey = greet("Hey");

// and then call it with the other argument:

greeterHey("Francisco"); // Notice how greeterDay is now a function, so we could do this in one go:

greet("Hello")("Francisco");

/*
    
At this point there are just a few things to keep in mind:

    When we built a function that returns a function, keep in mind that whenever we call that first function, the result is the other function, that's why calling greet() results in the returned function.

    We can use functionality by storing the first function call into a variable, so we can call it with the argument required in the returned function or we can simply call it with both arguments in order because, once again, calling greet() returns another function.

  
This works because of something called a closure. Closure is a very complex and difficult to understand mechanism that's part of javascript. We will approach them in the end of this section.
*/

// Challenge - rewrite the function using arrow functions:

const greetArrow = (greeting) => {
  return (name) => {
    console.log(`${greeting} ${name}`);
  };
};
greetArrow("Hello")("Francisco Ferreira");

const greetArrow1 = (greeting) => (name) => console.log(`${greeting} ${name}`);

//////////////////////////////////////////////////////////////////////////////

/*

  The call and apply methods.

    In this lecture we are going back to the this keyword and learn how we can set it manually, also why we actually want to do that.


*/

// Let's create a very simple object for the airline and also a simple booking method:

const lufthansa = {
  airline: "Lufthansa",
  iataCode: "LH",
  bookings: [],
  // book: function() {}; But now we can use the enhanced object literal
  book(flightNum, name) {
    console.log(
      `${name} booked a seat on ${this.airline}, flight ${this.iataCode}${flightNum}.`
    );
    this.bookings.push({ flight: `${this.iataCode}${flightNum}`, name });
  },
};

lufthansa.book(444, "Francisco Ferreira");
lufthansa.book(444, "Michael Jackson");
console.log(lufthansa);
// Nothing new here, the this keyword point to the lufthansa object and we also want the book method to push a new object to the bookings array.

// Now, imagine that the lufthansa group created a new airline:

const euroWings = {
  airline: "Eurowings",
  iataCode: "EW",
  bookings: [],
};

// We also want to take bookings for eurowings, however, taking the exact same book() method from lufthansa and paste it into this new airline is bad practice. We can take the method and store it into an external function so we can reuse it for all the different airlines:

const book = lufthansa.book;

// book(234, "Larry King"); // If we use the function to create a new booking it produces the error cannot read properties of undefined. This happens because this is now a regular function call (the this keyword points to undefined), not a method. So how do we tell javascript that we want to create a booking in eurowings? Or even in lufthansa?

// We need to explicitly tell javascript what the this keyword should be like. In other words, if we want to book to lufthansa, the this keyword should point there, and vice versa.

// There are three function methods that we can use to do that: call(), apply() and bind().

// CALL METHOD

book.call(euroWings, 23, "Larry King"); // The first argument is to where we want the this keyword to point, the others are the parameters of the original function itself. This is what we call setting the this keyword manually.

console.log(euroWings); // Its necessary to say that we could create as many airlines as we wanted and use the method to add more bookings, however they all need to have the exact same format as the original object or, at least the same properties that the method needs to operate.

// APPLY METHOD

// The apply() method does the exact same thing, the only difference is that apply() does not receive a list of arguments after the this keyword, instead it receives an array of the arguments.

book.apply(euroWings, [549, "Mike Tyson"]);

// This method is not that used anymore in modern javascript because we now have the spread operator:

const flightData = [44444, "Snoop Dog"];

book.call(euroWings, ...flightData); // We can still use call()

console.log(euroWings);

// THE BIND METHOD

// Just like the call method, bind also allows us to manually set the this keywords for any function call. The difference is that bind does not immediately call the function. Instead it returns a new function where the this keyword is bound, so its set to whatever value we pass into bind.

// Let's say that we need to use the book function for eurowings all the time. This is what we've been doing; book.call(euroWings, 23, "Larry King");

// Now we can use the bind method to create a new function with the this keyword also set to eurowings:

book.bind(euroWings); // This will not call the book function, instead it will return a new function where the this keyword will always be set to eurowings. Let's than create/store this function:

const bookEw = book.bind(euroWings);

// Now let's use this function

bookEw(2345, "Steven Steve"); // As you can see, this now looks like the normal/original book function call again. Because the bookEw function already has the this keyword set "in stone" to the eurowings object. We no longer have to specify the this keyword again, the name of the parameters is back to being the flight number and the passenger name.

// We could now do the same for the other airlines, create one booking function for each of the airlines that we've had. This makes is easier to book a flight for each of the airlines if we had to do it multiple times (specify the this keyword once and then use them as convenient).

// As always, we can take this even further. In the call method, we can pass multiple arguments besides the this keyword - book.call(euroWings, 23, "Larry King"). Aside the this keyword we pass the flight number and the passenger name. We can do the same with the bind method and the arguments that we specify will also be set in stone (they will be defined and the function will always be called with those same arguments).

// For example, we could use bind to create a function for one specific airline and a specific flight number.

const bookEW23 = book.bind(euroWings, 23); // Now we just need the name, because flightNum is already set. We could also define the passenger name here, but it would make no sense.

bookEW23("Stallone");

// Specifying parts of the argument before hand is actually a common pattern called partial application. Essentially, partial application means that a part of the arguments of the original function are already applied/set.

// There are other situations in which we can use the bind method in a very useful manner. One example is when we use objects together with event listeners. For this example, the buy new plane button will come in to play.

// Let's start by adding a new property only to the lufthansa object, this property contains the total planes of the airline:

lufthansa.planes = 300;

// Then we add a new method only to the lufthansa object, which is to buy a new plane.

lufthansa.buyPlane = function () {
  console.log(this);
  this.planes++; // Essentially we want to add a new plane whenever we click on the button.
  console.log(this.planes); // To check the addition
};

// document.querySelector(".buy").addEventListener("click", lufthansa.buyPlane);

// Doing it like this, the this keyword points to the button element and, consequently, the this.planes is NAN.

// We have learned that, in an event handler function, the this keyword always points to the element on which that handler is attached to, in this case, the button element. This is prove that the this keyword is set dynamically.

// Of course we need the this keyword to point to the lufthansa object when we click the button, so:

/*
const buyLH = lufthansa.buyPlane;
const lhBuy = buyLH.bind(lufthansa);

document.querySelector(".buy").addEventListener("click", lhBuy);

This is my solution, it works but we can do it directly on the callback function.
*/

document
  .querySelector(".buy")
  .addEventListener("click", lufthansa.buyPlane.bind(lufthansa));

// Another use case for the bind method, about partial application. Remember that partial application means that we can preset parameters. Let's start by creating a general function which adds a tax to some value:

const addTax = (rate, value) => value + value * rate;

// Imagine that there is one tax that we use all time.

const addVat = addTax.bind(null, 0.23); // The null is in the place of the this keyword, its common procedure to use null when we don't care about the this keyword (or is not relevant). Keep in mind that the order of the arguments is important, to preset the rate its necessary that it is the first argument, otherwise it wouldn't work.

// console.log(addVat(200));
// console.log(addVat(100));

// Bind returns a completely new function.

// Challenge - rewrite the example above with a function returning a function.

const calcTax = function (rate) {
  return function (value) {
    return value + value * rate; // Don't forget the return
  };
};
const rate = calcTax(0.23);
// console.log(rate(100));

const calcTaxArr = (rate) => (value) => value + value * rate;
const rateArr = calcTaxArr(0.23);
// console.log(rateArr(100));

//////////////////////////////////////////////////////////////////////////////

/*

  CODING CHALLENGE 1.

  Let's build a simple poll app!

A poll has a question, an array of options from which people can choose, and an array with the number of replies for each option. This data is stored in the starter object below.

Here are your tasks:

1. Create a method called 'registerNewAnswer' on the 'poll' object. The method does 2 things:
  1.1. Display a prompt window for the user to input the number of the selected option. The prompt should look like this:
        What is your favorite programming language?
        0: JavaScript
        1: Python
        2: Rust
        3: C++
        (Write option number)
  
  1.2. Based on the input number, update the answers array. For example, if the option is 3, increase the value AT POSITION 3 of the array by 1. Make sure to check if the input is a number and if the number makes sense (e.g answer 52 wouldn't make sense, right?)
2. Call this method whenever the user clicks the "Answer poll" button.
3. Create a method 'displayResults' which displays the poll results. The method takes a string as an input (called 'type'), which can be either 'string' or 'array'. If type is 'array', simply display the results array as it is, using console.log(). This should be the default option. If type is 'string', display a string like "Poll results are 13, 2, 4, 1". 
4. Run the 'displayResults' method at the end of each 'registerNewAnswer' method call.

HINT: Use many of the tools you learned about in this and the last section 😉

BONUS: Use the 'displayResults' method to display the 2 arrays in the test data. Use both the 'array' and the 'string' option. Do NOT put the arrays in the poll object! So what should the this keyword look like in this situation?

BONUS TEST DATA 1: [5, 2, 3]
BONUS TEST DATA 2: [1, 5, 3, 9, 6, 1]

GOOD LUCK 😀
*/

const poll = {
  question: "What is your favorite programming language?",
  options: ["0: JavaScript", "1: Python", "2: Rust", "3: C++"],
  // This generates [0, 0, 0, 0]. More in the next section 😃
  answers: new Array(4).fill(0),
  registerNewAnswer: function () {
    const answer = prompt(
      `${this.question}\n${String(this.options).replaceAll(
        ",",
        "\n"
      )}\n(Write option number)`
    );

    if (answer.trim() === "") alert("Option between 0 and 3");
    else if (Number(answer) >= 0 && Number(answer) <= 3) this.answers[answer]++;
    else alert("Option between 0 and 3");

    this.displayResults();
    this.displayResults("string");
  },
  displayResults(type = "array") {
    if (type === "array") console.log(this.answers);
    else if (type === "string") {
      const answersArray = String(this.answers);

      console.log(`Poll results are ${answersArray.replaceAll(",", ", ")}.`);
    }
  },
};

document
  .querySelector(".poll")
  .addEventListener("click", poll.registerNewAnswer.bind(poll));

const poll1 = {
  answers: [5, 2, 3],
};
const poll2 = {
  answers: [1, 5, 3, 9, 6, 1],
};

const display = poll.displayResults;

display.call(poll1);
display.call(poll2, "string");

// The main difficulty was to establish the condition based on the input. I started by converting the prompt to a number at the beginning but then an empty answer counted as 0. Remember to check if there is a better way in the solution.

// Probably the code needs some refactoring, but its not much, see if the solution trims or arranges the input better and in a variable apart.

// SOLUTION FROM THE COURSE
/*
const poll = {
  question: "What is your favorite programming language?",
  options: ["0: JavaScript", "1: Python", "2: Rust", "3: C++"],
  // This generates [0, 0, 0, 0]. More in the next section 😃
  answers: new Array(4).fill(0),
  registerNewAnswer() {
    const answer = Number(
      // He converts to number right at the beginning.
      prompt(
        // The .join() method converts the array into a string directly.
        `${this.question}\n${this.options.join("\n")}\n(Write option number)`
      )
    );

    // Register answer - we could do an if else statement like i did, however this is perfect for using short circuiting (answer below answers.length - the length is 4, so below is 3, which is the number of possibilities):
    typeof answer === "number" &&
      answer < this.answers.length &&
      this.answers[answer]++;

    console.log(this.answers);
    this.displayResults(); // Without argument (string as default)
    this.displayResults("string"); // To see the string log
  },
  displayResults(type = "array") {
    if (type === "array") {
      console.log(this.answers);
    } else if (type === "string") {
      console.log(`Poll results are ${this.answers.join(", ")}.`); // Once again the use of join() would make the code much simpler.
    }
  },
};

document
  .querySelector(".poll")
  .addEventListener("click", poll.registerNewAnswer.bind(poll));

const poll1 = {
  answers: [5, 2, 3],
};
const poll2 = {
  answers: [1, 5, 3, 9, 6, 1],
};

const display = poll.displayResults;

display.call(poll1);
display.call(poll2, "string");
// Without having to create an object (see the syntax carefully):
display.call({ answers: [1, 5, 3, 9, 6, 1] }, "string");

*/

// By converting the prompt to a number at the beginning we don't have to worry if the input is a letter. The rest of the logic always keep valid answers if they are below the length of the answers array (but we can place negative numbers).

// The best improvement that i could have done is the use of the join() method to convert directly to string. The rest of the logic is also useful, but, as i have seen when doing the exercise, converting to a number at the beginning makes possible that a empty answer counts as position 0. The same way, in my solution several empty spaces don't trigger the alert, hence the doubt of trimming the prompt.

//////////////////////////////////////////////////////////////////////////////

/*

  Immediately invoked function expressions (IIFE). 

    In Javascript, sometimes we need a function that is only executed once. Basically a function that disappears right after its called once.

    This does't make much sense, however we actually need this technique later for something called async/await.

    If you are reviewing the course, be sure to check function declarations vs function expressions in fundamentalsPart2 line 75.

    
*/

// So how can we do this? Of course we can simply create a function and only execute it once:

const runOnce = function () {
  console.log("This will never run again");
};
// runOnce();

// However, we can call and run this function again later in the code if we want to right? But this is not what we want to do, we want to execute a function immediately and not even have to save it somewhere. Here is how we do this: we simply write the function expression itself (without assigning it to any variable):

// function() {
//   console.log("This will never run again");
// }

// But this produces an error: function statements require a function name. This is because javascript expects a function statement (we start writing with function keyword). We can trick javascript into thinking that this is just an expression either by wrapping everything in ():

(function () {
  console.log("This will never run again");
})();

// Or by using the ! (not) pay attention to the syntax in both (the () at the end specially to call it):

!(function () {
  console.log("This will never run again");
  const isOnlyOnThisScope = 23;
})();

// This is why this pattern is called immediately invoked function expression (IIFE)

// The same would work with an arrow function:

(() => console.log("This will NEVER run again"))();

// But why was this pattern actually invented? Well, we already know that functions create scopes, whats important here is that one scope does not have access to variables from an inner scope. For example here, in the global scope, we do not have access to any variables that are defined on any of these functions here:

// console.log(isOnlyOnThisScope); isOnlyOnThisScope is not defined (in this scope).

// Therefore we say that all data defined inside a scope is private or is encapsulated. Data encapsulation and data privacy are extremely important concepts in programming. Many times we need to protect our variables from being overwritten by some other parts of the program or even with external scripts or libraries. These concepts will be studied in the object oriented programming section, for now keep in mind that is important to hide variables and that scopes are a good tool for doing this. This is also why the immediately invoked function expressions were invented (this is not a feature but a pattern).

// Remember that, in ES6, variables declared with let or const inside of a block also create their own scope:

{
  const isPrivate = 23;
  var notPrivate = 35;
}

// console.log(isPrivate); is not defined, we cannot access it.
console.log(notPrivate); // var makes it accessible (ignores the block).

// This is the reason why, in modern javascript, immediately invoked function expressions are not that used anymore. If all we want is to create a new scope for data privacy, all we need to do is to create a block like the one above. There is no need to create a function to create a new scope, unless we want to use var for our variables, but we know that we should't do that.

// However, if you need to execute a function just once, then the IIFE pattern is still the one to go.

//////////////////////////////////////////////////////////////////////////////

/*

  Closures.

    There is an almost mystical feature of javascript function that many developers fail to fully understand. Closures are the most difficult concept to understand in javascript.

    To fully understand how closures work, we need to understand the execution context, the call stack and the scope chain. This is because closures kind of bring all of these concepts together in a magical way.
    
*/

// Let's start by creating a new function called secureBooking and it is this function that will create the closure. The first thing to explain about closures is that they are not a feature that we explicitly use. We don't create closures manually like we create a new array or a new function.

// A closure simply happens automatically in certain situations, we just need to recognize them. And that's what we are going to do in this example. The function is called secureBooking because the passenger count variable cannot be accessed or manipulated from the outside.

// What's special about this function is that it will return a new function (and what this function does is to update the passenger count variable, so, the variable that is defined in the parent function).

const secureBooking = function () {
  let passengerCount = 0;

  return function () {
    passengerCount++;
    console.log(`${passengerCount} passengers`);
  };
};

// Let´s now call the function and store the result in a variable called booker. This is similar to what we did in the lecture of functions returning other functions. If you are reviewing the material, also check the pdf of the course to understand what we did here. Is nothing new at this point, the global scope has the secureBooking function, when that function gets executed a new execution context is created in the call stack with the variables within that function and, when it returns the second function it disappears from the call stack (always keep this in mind).

const booker = secureBooking(); // Secured booking finished its execution here.

// Really understand how functions returning new functions work so you don't get confused by the syntax. To call the function we need secureBooking()(). So its like including the argument for the first and the argument for the second. If we store the function into a variable we can call it with just one (). If you log booker you will see that is the returned function.

booker(); // Booker is the returned function
booker();
booker();
// console.log(booker);

// So how is this possible? How can the booker() function update the variable passengerCount if its execution context is no longer on the stack.

// We can say that a closure makes a function remember all the variables that existed at the functions "birthplace". Secure booking is the birthplace of the booker function (returned function). So, booker remembers all the variables that existed of its birthplace.

// This is possible because a function always have access to the variable environment of the execution context in which it was created. Even after that execution context is gone. The closure is then basically this variable environment attached to the function, exactly as it was at the time and place that the function was created. The variables in the closure have priority over the variables in the scope chain, so if there was a global passengerCount variable set to 10, it would still first use the one in the closure. See the pdf for more definitions with analogies.

// Although we can't access the variables in the closure, we can explore it like this:

console.dir(booker); // Whenever we see the double brackets [[Scope]], that means that it is an internal property which we cannot access from our code.

// Let's create two more situations in which closures are going to appear. Both of these examples are going to demonstrate that we don't need to return from another function in order to create a closure.

// We start by defining an empty variable called f:
let f;

// Then a function expression g:
const g = function () {
  const a = 23; // define a variable a:

  // And the reassign variable f to a function value.
  f = function () {
    console.log(a * 2);
  };
};

// g();
// f(); // Logs 46, which is indeed 23 * 2

// This proves that the f value (inside of the function at the time we reassign it) really does close over any variables of the execution context in which it was defined. Otherwise it wouldn't have access to variable a in order to multiply 23 by 2 when we call f(). This is true even when the variable itself was technically not even defined inside of the variable environment of the function.

// Let's now take it to the next level and create a new function that is going to be very similar.

const h = function () {
  const b = 777;
  f = function () {
    console.log(b * 2);
  };
};

g(); // Here we call g and reassign f to a function that multiplies a by 23
f(); // F gives the 46 output
console.dir(f); // Check the closure, a= 23
h(); // Here we reassign again f
f(); // The result is correct with the reassignment

// Let's now inspect the variable environment

console.dir(f); // in the closure b is now 777 and it no longer has the value of a (the closure that used to have before)

// Example two - This example will be a timer, which is another great example that we don't need to return a function to see a closure in action.

const boardPassengers = function (numPassengersHere, waitTime) {
  const perGroup = numPassengersHere / 3; // We call this variable per group because boarding  happens in groups and usually there are three groups.

  setTimeout(function () {
    console.log(`We are now boarding all ${numPassengersHere} passengers`);
    console.log(`There are 3 groups, each with ${perGroup} passengers`);
  }, waitTime * 1000);

  console.log(`Will start boarding in ${waitTime} seconds.`);
};

// 1 - This is the first time that we use a timer in this course, we will talk about it in further lessons but its a good example to demonstrate the closure. We use the serTimeout() function, which needs two parameters. The first one is a function which will be executed, and this function will be executed after a certain time (second parameter - in milliseconds). This is essentially a callback function. We multiply waitTime by 1000 because we are going to pass waitTime in seconds.

// boardPassengers(180, 3)

// When we call the function the perGroup variable is created, the setTimeout() is run and the last console log is run. Then, after 3 seconds, the function of setTimeout will be executed. However, the boardPassengers() already finished and its out of the execution context. Only with closure its possible for the function to use all the variables of the context in which it was created (n and perGroup).

// To finish, let's now prove that the closure have priority over the scope chain.

const perGroup = 1000; // If the scope chain had priority over the closure, then the callback function (of setTimeout) would indeed use this variable in the template literal. But that only happens if we comment out the perGroup created inside of the boardPassengers().
boardPassengers(180, 3);

// Coding Challenge #2

/* 
This is more of a thinking challenge than a coding challenge 🤓

Take the IIFE below and at the end of the function, attach an event listener that changes the color of the selected h1 element ('header') to blue, each time the BODY element is clicked. Do NOT select the h1 element again!

And now explain to YOURSELF (or someone around you) WHY this worked! Take all the time you need. Think about WHEN exactly the callback function is executed, and what that means for the variables involved in this example.

GOOD LUCK 😀
*/

(function () {
  const header = document.querySelector("h1");
  header.style.color = "red";

  document.querySelector("body").addEventListener("click", function () {
    header.style.color = "blue";
  });
})();

// The callback function of the higher order function addEventListener() has access to the header variable because of closure. By the time the callback gets executed, the IIFE has already disappeared from the execution context, and with it the header variable.
