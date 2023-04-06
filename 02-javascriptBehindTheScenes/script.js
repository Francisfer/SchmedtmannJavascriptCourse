"use strict";
/*

    Javascript is:

High level - Every program that runs on the computer needs hardware resources to run, like ram memory and a cpu. In low level languages like C, we need to manually manage the resources to, for example, create a new variable. In javascript everything happens automatically, however, the programs will not be as fast or as optimized as in C.


Garbage-collected - One of the powerful tools that takes memory management away from us is garbage collection, it's basically an algorithm inside the javascript engine that removes old an unused objects from the computer memory, in order not to clog it up with unnecessary stuff.


Interpreted or just-in-time compiled - The compilation (translation) to machine code happens inside the javascript engine.


Multi-paradigm - One of the things that make javascript so popular is the fact that it's a multi-paradigm language. In programming, a paradigm is an approach and mindset of structuring code, which will direct your coding style and technique in a program that uses a certain paradigm.

    Three popular paradigms are:

    Procedural - What we've being doing so far, which is to organize the code in a very linear way with some function in between.

    Object-oriented-programming - 1

    Functional programming - 2



    We can also classify paradigms as imperative or declarative.


1 - Prototype-based object-oriented - First, almost everything in javascript is an object, except for primitive values such as strings, numbers, etc. But arrays are simply objects as we have seen. We can create arrays from a blueprint and then apply the methods, which are inherited from the prototype (push method for example).


2 - First-class functions - In a language with first-class functions, functions are simply treated as regular variables, we can pass them into other functions and return them from functions, allowing the functional programming (remember the closing modal function that we have created, we've passed it into the event listener function as the event handler argument). Passing a function into another function as an argument: first class functions.


Dynamic - A dynamically typed language don't require data type definitions, the types become known at runtime, also, the data type of a variable changes automatically (reassign x = 6 to x = "Francis"). Remember java and C, where we need to specify if the variable is a string or an integer.


Single-threaded - In computing, a thread is like a set of instructions that is executed in the computer cpu. Javascript runs in one single thread, so it can only do one thing at a time. So what if we have a long running task? It sounds like it would block the single thread. The concurrency model is how the javascript engine handles multiple tasks happening at the same time. And it achieves that by using a non blocking event loop:


Non-blocking event loop - By using an event loop, javascript takes long running tasks, executes them in the "background" and puts them back in the main thread once they are finished.

*/
/*
// Function defined in the global scope
function calcAge(birthYear) {
  const age = 2023 - birthYear;
  console.log(firstName); // firstName is accessible even though is not in the scope of the calcAge function. Variable lookup.
  return age;
}

//calcAge(1988); 1 - If we call the function before defining firstName it gives an error.

// Variable defined in the global scope, global variable.
const firstName = "Francisco";

calcAge(1988); // When we call the function, firstName is logged to the console even though the variable is defined after the calcAge function. This is possible because the function is called after the variable is declared, so its already present in the global scope (see 1).
*/

function calcAge(birthYear) {
  const age = 2023 - birthYear;
  function printAge() {
    let output = `${firstName}, you are ${age}, born in ${birthYear}`; // For scoping, the parameter of a function works just like normal variables (birthYear variable)
    console.log(output);

    if (birthYear >= 1981 && birthYear <= 1996) {
      const firstName = "John"; // Like this it doesn't perform any variable lookup because it is defined inside of the current scope, it's not redefined, its a completely new variable, it can have the same name because its restricted to this scope. Outside of this block, the firstName remains Francisco.
      var millennial = true;
      const str = `Oh, and you are a millennial, ${firstName}`;
      console.log(str);

      function add(a, b) {
        return a + b; // Functions are also block scoped
      }
      output = `New output`;
    }
    //console.log(str); // Not defined because const and let are blockScoped and we are trying to log it outside of the scope.
    console.log(millennial); // With var it logs because var variables are only function scoped.

    // add(5, 5); Functions are also block scoped, the scope is only inside of the block when using strict mode.

    console.log(output); // We can reassign variables inside of the parent scope.
  }
  printAge();
  return age;
}

const firstName = "Francisco";
calcAge(1988);
// console.log(age) or printAge() ; Not defined error because its out of the scope. Only an inner scope has access to the variables of its outer scope, never the other way around.

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/*
    THE VARIABLE ENVIRONMENT: HOISTING AND THE TDZ (Temporal Dead Zone).

We learned that an execution context always contains three parts: a variable environment, the scope chain in the current context and the this keyword.

Now its time to talk about the variable environment, more specifically how variables are actually created in javascript.

In javascript, we have a mechanism called hoisting. Hoisting makes some types of variables accessible/usable in the code before they are actually declared (variables lifted to the top of their scope).

However, behind the scenes and before execution, the code is basically scanned for variable declarations and, for each variable, a new property is created in the variable environment object.

Hoisting does not work in the same for all variables, let's analyze how hoisting works for:

    Function declarations (Block scoped when using strict mode, function scoped when using sloppy mode):
    
      Function declarations are actually hoisted and the initial value in the variable environment is set to the actual function. In practice, what this means, is that we can use function declarations before they are actually declared in the code. Again, because they are stored in the variable environment object even before the code starts executing. As we can see, the calcAge function can be called before its declared in the code:

      console.log(calcAge(1988));

      function calcAge(birthYear) {
       return 2023 - birthYear;
    }

    Variables declared with var (Function scoped):
    
      Are also hoisted, but hoisting works in a different way here. Unlike functions, when we try to access a var variable before its declared in the code, we don't get the declared value, we get undefined:

        console.log(firstNameHere);
        var firstNameHere = "Sylvester";

      This behavior is a common source of bugs in Javascript, thats why in modern approaches we almost never use var. When we try to access a variable before we declare it we expect an error or the actual value, but never undefined.

    Variables declared with const and let (Block scoped):

      Const and let variables are not hoisted. Technically they are, but the value is basically set to uninitialized, so there is no value to work with at all. These variables are placed in a so-called TDZ (temporal dead zone), which makes it so that we can't access these variables between the beginning of the scope and the place where the variables are declared. 

      console.log(firstNameHere, lastNameHere);
      const firstNameHere = "Sylvester";
      let lastNameHere = "Stallone";


    Function expressions and arrow functions - 

      Here it depends if the functions where created with var, let or const.Keep in mind that these functions are simply variables, so they behave in the exact same way in regard to hoisting. Created with var is hoisted to undefined, and with const or let is not hoisted (TDZ). Thats why we cannot use function expressions before we declare them in the code, unlike function declarations.
*/

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/*

      HOISTING AND TDZ IN PRACTICE.

*/

// Variables
/*
console.log(me);
console.log(job); // Still at the TDZ at this time.
console.log(year); // Still at the TDZ at this time.

var me = "Francisco"; // Hoisted to the value of undefined.
let job = "Programmer";
const year = 1988;
*/

// Functions

/*
console.log(addDeclaration(2, 3)); // Possible because its a declaration
console.log(addExpression(2, 3)); // Still at the TDZ at this time with const and let.
console.log(addArrow(2, 3)); // Still at the TDZ at this time with const and let.

function addDeclaration(a, b) {
  return a + b;
}

let addExpression = function (a, b) {
  return a + b;
};

var addArrow = (a, b) => a + b;

// RECAP: Function declarations can be called before initialization.
      //  Function expressions and arrow cannot be called before initialization when using let or const.
      // When using var, we get a different error message in the log, and that's because variables declared with var get hoisted and set to undefined. So, addArrow becomes essentially that, a variable set to undefined. When we try to use, in this case log the function, its the same of doing:
      // console.log(addArrow(2, 3)); === undefined(2, 3);
      // console.log(addArrow) === undefined
*/

/* Example of a possible mistake when using var to declare our variables in the code. 

1 - We start by writing a function declaration (so it can be called before initialization) that deletes all the products from a shopping cart when called (if it was a real application, this would be a dangerous function that should not be called without care).

2 - Next we declare a variable with var, which contains the number of products in the cart and set it to ten. 

3 - Finally, we write some logic that deletes the shopping cart whenever the number of products is zero. We already know that zero is a falsy value, so we can write the condition like this. To remember: 

if (numProducts > 0) {
  console.log("basket with something");
} else if (numProducts === 0) {
  console.log("empty basket");
}



if (numProducts) {
  console.log("basket with something");
} else if (!numProducts) {
  console.log("empty basket");
}

*/

if (!numProducts) deleteShoppingCart(); // 3

var numProducts = 12; // 2

function deleteShoppingCart() {
  // 1
  console.log("All products deleted");
}

/*

As you can see in the log, the products are deleted although the value of numProducts is set to 12. This happens because, at the time of the condition (step 3), numProducts is hoisted and set to undefined and, as we know, undefined is also a falsy value, triggering the execution of the deleteShoppingCart() function although we gave it a value of 12. If this was a larger application the error would be significantly hard to find.

Lesson to take and best practices advisement:

1 - Don't use var, always use const and let if you need to reassign the value later in the code.

2 - Always declare your variables at the top of each scope.

3 - Always declare all your functions first and use them only after the declarations, even function declarations.
*/

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/*

THE THIS KEYWORD.

  The this keyword or this variable is a special variable that is created for every execution context (therefore every function). 

  Its one of the three component's of any execution context, along with the variable environment and the scope chain.

  It takes the value of, or points to the "owner" of the function in which the this keyword is used.

  The value of the this keyword is not static, its not always the same, it depends on how the function is called and its value is only assigned when the function is actually called.

  Let's see four different ways to call a function:

  1. As a method - Function attached to an object, so when we call a method, the this keyword inside that method will point to the object on which the method is called, in other words it points to the object that is calling the method:

      const Francisco = {
        name: "Francisco",
        year: 1988,
        calcAge: function () {
          console.log(this);
          return 2023 - this.year;
        },
      };

      Francisco.calcAge();

      Here, the method is the calcAge method, which is a function attached to the Francisco object. When we call the function, the this keyword points to the Francisco object, as if we substitute the this keyword with (Francisco.year), which we can see when logging the this keyword.
    
  2. Simple function call - Here, the this keyword will simply be undefined but it gets its own keyword (in strict mode, in sloppy mode it points to the global object, which in the case of the browser is the window object).

  3. Arrow functions - While arrow function are not exactly a way of calling functions, its an important kind of function that we need to consider. Remember that arrow functions do not get their own this keyword, instead, the this keyword in an arrow function it will simply be the this keyword of the surrounding function (parent function). In technical terms this is called the lexical this keyword, because it simply gets picked up from the outer lexical scope of the arrow function.

  4. Event listener - If a function is called as an event listener, the this keyword will always point to the DOM element that the handler function is attached to.


  The this variable will never point to the function itself and also to the variable environment.
*/

// The this keyword in practice:

console.log(this); // Points to the global scope (window).

const calcAgeThis = function (birthYear) {
  console.log(2023 - birthYear);
  console.log(this); // Undefined (strict mode)
};

calcAgeThis(1988);

// Arrow function

const calcAgeArrow = (birthYear) => {
  console.log(2023 - birthYear);
  console.log(this); // Points to the parent scope, in this case the global scope (window).
};

calcAgeArrow(1988);

// Method

const Francisco = {
  name: "Francisco",
  year: 1988,
  calcAge: function () {
    console.log(this); // Points to the Francisco object.
    console.log(2023 - this.year);
  },
};

Francisco.calcAge();

// Saying that the this keyword points to the object that is calling the method is not the same of saying that the this keyword will point to the object in which we wrote the method. In other words, we can have another object and call the same method without writing it again. In this case, the this keyword will point to the new object because its the one calling the method.

const fernando = {
  name: "Fernando",
  year: 2000,
};

fernando.calcAge = Francisco.calcAge; // Method borrowing
fernando.calcAge(); // Notice the log. the this keyword now points to the fernando object and the age is correct.

// We can take things even further, we can store the function calcAge into a variable:

// const f = Francisco.calcAge;

// f(); // This f function is now just a regular function call, its not attached to any object, so the this keyword becomes undefined. We also get an error because it cannot read the year property of undefined.

// Some pitfalls of the this keyword related to regular and arrow functions:

// var firstNameNow = "joe"; // with var the log is correct because var variables create objects in the global scope.

const Manuel = {
  firstName: "Manuel",
  year: 1988,
  calcAge: function () {
    console.log(this);
    console.log(2023 - this.year);
  },

  greet: () => console.log(`Hey ${this.firstNameNow}`),
};

Manuel.greet(); // In the log we get Hey undefined, and that happens because arrow functions do not get their own this keyword, so it uses the scope of their parent, which in this case is the global scope. As best practice, we should never use arrow function as methods, always use a normal function expression.

// Lets now enhance the calcAge function by adding another function that returns if a person is a millennial:

const Johnny = {
  firstName: "Johnny",
  year: 1988,
  calcAge: function () {
    console.log(this);
    console.log(2023 - this.year);
    // SOLUTION 1!
    // const self = this;
    // const isMillennial = function () {
    //   //   console.log(this);
    //   //   console.log(this.year >= 1981 && this.year <= 1996);
    //   // };
    //   console.log(self);
    //   console.log(self.year >= 1981 && self.year <= 1996);
    // };
    // isMillennial(); // This is a just a regular function call, even though it happens inside of a method, and because of that we get an error (cannot read properties of undefined). One of the solution is to create another variable called self outside of the isMillennial function and set its value to the this keyword (which at that time points correctly to the object).

    // SOLUTION 2 ES6 - CREATE AN ARROW FUNCTION (it uses/inherits the this keyword of its parent scope, which in this case is the calcAge method).

    const isMillennial = () => {
      console.log(this);
      console.log(this.year >= 1981 && this.year <= 1996);
    };
    isMillennial();
  },
};

Johnny.calcAge();

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/* 

Functions also get access to an arguments keyword, not just the this keyword. 

Just like the this keyword, the arguments keyword is only available in regular functions. 

In the function expression we get an arguments array in the log, which has the parameters that we've specified. We can add more parameters than the ones that we've specified, they don't have a name, but we can see and use them in the functions (use a loop over the array and add all the numbers together). We have better way to deal with multiple parameters that we will learn in future lectures, for now just have in mind the existence of the parameters keyword.

The arrow function does not get the arguments keyword.
*/

const addExpressionHere = function (a, b) {
  console.log(arguments);
  return a + b;
};

addExpressionHere(5, 5);
addExpressionHere(5, 5, 5, 5, 5);

const addArrowHere = (a, b) => {
  console.log(arguments);
  return a + b;
};

// addArrowHere(5, 5);

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// PRIMITIVES VS OBJECTS - How primitive types and objects are stored in memory.

// Primitives (numbers, strings, booleans, undefined, null, symbol, bigint.)

let age = 35;
let oldAge = age;
age = 36;

// The age variable is 35, old age stores that value because its my birthday and we reassign age to 36.

console.log(age); // its 31 because we reassigned it.
console.log(oldAge); // the oldAge still 35 because, at that point of the code, the reassignment didn't affect the value.

// Now lets create another scenario which as an object:

const me = {
  name: "Francisco",
  age: 35,
};

// Lets say that we have a friend that is also called Francisco and we copy this object:

const friend = me;

// Both the name and the age are the same now, but my friend age is different:

friend.age = 23; // we did not change me.age

console.log("Friend object:", friend);
console.log("Me object:", me);

/*
    As we can see in the console, both of the objects now have 23 years old. 

    Aside the primitive types written above, basically everything else is an object (object literal, arrays, functions, etc.).

    Now, when we are talking about memory and memory management, its usual to call primitives primitive types and objects reference types because of the different way that they are stored in memory.

    Primitive types are stored in a call stack (stored in the execution contexts in which they are declared), reference types are stored in memory heap.

    Primitive types - When we define age to the value of 35, we are basically creating an identifier (age) that has a specific address in memory, where the value is stored. Then, we set old age to be equal to age, so old age gets the same address and value of age in memory. Finally, when we reassign the age value to 36, a new address and value, or new piece of memory, is allocated and the age identifier simply points to the new address that is holding the value of 36. 

    Reference Types - Here things work differently. When the me object is created it gets stored in the heap, there is also a memory address and the value itself. 

      However, in the call stack, the me identifier does not point directly to the newly created memory address in the heap. Instead, it points to a new piece of memory that is created in the stack. It is the value of that memory allocation that holds the address to the me object. In other words, the memory allocation in the call stack has a reference to the allocation in the heap that holds the me object. This happens because of the possibility of objects being too large to store in the call stack, instead they are stored in the heap, which is like an almost unlimited memory pool. The call stack just allocates memory with a reference of where the object is in the heap, so it can find it when necessary. 

      From here we can conclude that when the friend object is set to be equal to the me object it also gets set to point to the same address in the heap. That's why both objects are changed. Notice that, even though we have defined the friend variable as a constant, we can still manipulate the object without problems, it makes sense because we did not change the value in memory for the friend identifier, it stills the same that points to the address in the heap (reference to the object). All we did was change the value in the heap, and that is possible to do. Keep in mind that variables declared with const are immutable only for primitive values, not for reference values.

*/

// PRIMITIVES AND OBJECTS IN PRACTICE.

let lastNameNow = "William";
let oldLastNameNow = lastNameNow;
lastNameNow = "Davis";
console.log(lastNameNow);
console.log(oldLastNameNow);

// Objects

const jessica = {
  firstName: "Jessica",
  lastName: "Williams",
  age: 27,
};

const marriedJessica = jessica; // we are just copying the reference which will point to the same object. We are not creating a new object in the heap.
marriedJessica.lastName = "Davis";
console.log("Before marriage:", jessica);
console.log("After marriage:", marriedJessica);

// What if we actually wanted to make this work? What if we wanted to copy the object so we could then change one of them without changing the other?

const jessica2 = {
  firstName: "Jessica",
  lastName: "Williams",
  age: 27,
  family: ["Alice", "Bob"],
};

// we use a function called object.assign that merges a new empty object with jessica2. This an new object where all the properties are really copied.
const jessicaCopy = Object.assign({}, jessica2);
jessicaCopy.lastName = "Davis";
jessicaCopy.age = 45;

console.log("Before marriage:", jessica2);
console.log("After marriage:", jessicaCopy);

// This technique object.assign only works on the first level. In other words, if we have an object inside of the object, the inner object still points to the same place in memory. object.assign only creates a shallow copy:

// jessicaCopy.family.push("Mary", "John");
// console.log("Before marriage:", jessica2);
// console.log("After marriage:", jessicaCopy);
