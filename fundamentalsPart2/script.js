/* 

LECTURE: ACTIVATING STRICT MODE.
  Its a special mode that we can activate in javascript which makes it easier to write secure code.
  By secure we mean to avoid accidental errors in the code. 
      First, it prevent us from making mistakes that otherwise would be difficult to see because the console does not discriminate the error (see example 1).
      Second, introduce a short list of variable names that are reserved for features that might be added to the language later (see example 2). 
  To use it we need to activate the strict mode with the string "use strict".
  It can be used for an entire script if we put the string at the top, or in a specific block or function.
  
*/

"use strict";

/*
let hasDriversLicense = false;
const passTest = true;

if (passTest) hasDriverLicense = true; // Example 1 - The syntax error is not discriminated in the console. We could see the error through the spelling extension, but not in the console.

if (hasDriversLicense) console.log("I can drive :D");
*/

/*
const interface = "Audio"; // Example 2
const private = 534;
*/

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/*

LECTURE: FUNCTIONS.

    The fundamental building block of javascript applications are functions. They are one of the most essential concepts in the language. 

    Essentially, a function is a piece of code that we can reuse over and over again in our code. Its kind like a variable, but for whole pieces of code. A variable holds a value, but a function can hold one or more complete lines of code.

    function functionName(parameter, parameter) {

    }
*/
/*
function logger() {
  // if we want to log the name several times in the code
  console.log("My name is Francis");
}

// calling / running / invoking the function
logger();

// usually, when we write functions, we also pass data into a function. Additionally, a function can return data as well, that we can use for something else within a program.
*/

/*
THIS FUNCTION IS USED IN THE LECTURE: FUNCTIONS CALLING OTHER FUNCTIONS.
function fruitProcessor(apples, oranges) {
  // parameters are like variables that are specific only to this function, and will be defined once we call the function, they represent the input data of this function.
  const juice = `Juice with ${apples} apples and ${oranges} oranges.`; // building a variable to be returned
  return juice;
}

const appleJuice = fruitProcessor(5, 0); // passing the values to define the parameters. Which are called arguments. If we want to use the log we need to store it in a variable, in this case appleJuice.
console.log(appleJuice);

const appleOrangeJuice = fruitProcessor(2, 4); // calling the function with the arguments.
console.log(appleOrangeJuice);

*/
const num = Number("23"); // the number function is good to remember as we understand this process.

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/* 

LECTURE: FUNCTION DECLARATIONS VS EXPRESSIONS.
  In javascript there are different ways of writing functions, and each type of function works in a slightly different way. But they are all very similar.

  FUNCTION DECLARATIONS: The functions that we wrote in the last lecture are called function declarations, because we simply used the function keyword to declare a function. a bit like we declare a variable. >>>>> we can call the function before we declare it.
*/

function calcAge1(birthYear) {
  return 2037 - birthYear; // to simplify, and if just need to return the value later, there is no need to store it in a variable.
}
const age1 = calcAge1(1985);
// console.log(age1); we log both in the expressions example.

/*
  FUNCTION EXPRESSIONS: 
  This is an expression, so it produces a value that we can store in a variable. 

function (birthYear) {
  return 2037 - birthYear;
};

  basically thats the difference. Here we use a anonymous function (no name) and store the value in a variable, so that the variable holds the function. >>>>> we can´t call the function before we declare it.
*/

const calcAge2 = function (birthYear) {
  return 2037 - birthYear;
};
const age2 = calcAge2(1991);

console.log(age1, age2);

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/*

LECTURE: ARROW FUNCTIONS.

  There is third type of function that was added to javascript in  es6.
  An arrow function is simply a special form of function expression that is shorter and therefore faster to write.
  Compare it with the previous example.

*/

const calcAge3 = (birthYear) => 2037 - birthYear; // as we see, it still a form of function expression, its a value that we assign to the variable calcAge3, but its easier and faster to write. the return happens implicitly, without having to explicitly write return. its perfect for simple one liner functions.

const age3 = calcAge3(1991); // calling the function and save the return value to a variable to tog.
console.log(age3);

// This is the simplest form, when we only have exactly one parameter and one line of code in which we want to return something. if we have more:

/*
const yearsUntilRetirement = (birthYear) => {
  // one parameter but, two lines of code, hence the curly braces and the return statement.
  const age = 2037 - birthYear;
  const retirement = 65 - age;
  return retirement;
};

console.log(yearsUntilRetirement(1991)); // calling the function and log the return value directly, without assign it to a variable.

*/

// two parameters

/*
const yearsUntilRetirement = (birthYear, firstName) => {
  const age = 2037 - birthYear;
  const retirement = 65 - age;
  return `${firstName} retires in ${retirement} years`;
};

console.log(yearsUntilRetirement(1991, "Francis"));
console.log(yearsUntilRetirement(1980, "Joe"));

*/

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/* 

LECTURE: FUNCTIONS CALLING OTHER FUNCTIONS.

*/

function cutFruitPieces(fruit) {
  // this function cut the fruit to pieces. it receives a parameter called fruit that serves as a placeholder for the values that come from the fruitProcessor function.
  return fruit * 4;
}

function fruitProcessor(apples, oranges) {
  const applePieces = cutFruitPieces(apples); // here is where we call a function inside of a function.
  const orangePieces = cutFruitPieces(oranges); // the value is used to call the cutFruitPieces function and, replace the placeholder fruit.
  const juice = `Juice with ${applePieces} pieces of apple and ${orangePieces} pieces of orange.`;
  return juice;
}
console.log(fruitProcessor(8, 12)); // calling the function fruitProcessor; the values replace the parameter placeholders, so 8 replace apples and 12 replace oranges. then, those values are used to call the cutFruitPieces function, replacing the parameter placeholder fruit, cutting the fruit in 4 pieces. The only thing that can be confusing is calling the cutFruitPieces function, because that is done with the argument that we received from the fruitProcessor function. Just keep in mind the code flow.

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/*

LECTURE: REVIEWING FUNCTIONS.

*/

/*
const calcAge = function (birthYear) {
  return 2037 - birthYear;
};

const yearsUntilRetirement = function (birthYear, firstName) {
  const age = calcAge(birthYear);
  const retirement = 65 - age;

  if (retirement > 0) {
    // taking a decision based on the retirement value.
    console.log(`${firstName} retires in ${retirement} years`);
    return retirement; // the return keyword immediately exit the function. if the log is placed after, it will not be executed.
  } else {
    console.log(`${firstName} has already retired.`); // this is just a prebuilt function that prints something in the developer console. we use it constantly because we want to see the results in the learning process.
    return -1; // this is a standard number in programming (a number that shows clearly that it has no meaning), its good practice to return a number when the parameter or input is a number.
  }
};

console.log(yearsUntilRetirement(1988, "Francis")); // not storing in a variable.
console.log(yearsUntilRetirement(1950, "Mike"));
*/

/* 
    QUICK RECAP:
Here we have the three type of functions that we've talked about: 


function calcAge1(birthYear) {
  return 2037 - birthYear;
    }
    >>> This is a function declaration:
        - it can be used before it's declared
__________________________________________________________________________________________________
    
const calcAge2 = function (birthYear) {
  return 2037 - birthYear;
};
    >>> This is a function expression:
        - It's, essentially a function value/s stored in a variable.

__________________________________________________________________________________________________

const calcAge3 = (birthYear) => 2037 - birthYear;
    >>> This is a arrow function:
        - they are also function expressions, but special ones;
        - great for quick one-line functions where we don't need to use the return keyword and curly braces;
        - It has no (this) keyword. (more on this in future lectures)


These are three ways of writing functions, but they all work in a similar way, they all receive input data, transform data, and then output data.  
*/

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/* 

CODING CHALLENGE 1.

Back to the two gymnastics teams, the Dolphins and the Koalas! There is a new gymnastics discipline, which works differently.
Each team competes 3 times, and then the average of the 3 scores is calculated (so one average score per team).
A team ONLY wins if it has at least DOUBLE the average score of the other team. Otherwise, no team wins!

1. Create an arrow function 'calcAverage' to calculate the average of 3 scores
2. Use the function to calculate the average for both teams
3. Create a function 'checkWinner' that takes the average score of each team as parameters ('avgDolhins' and 'avgKoalas'), and then logs the winner to the console, together with the victory points, according to the rule above. Example: "Koalas win (30 vs. 13)".
4. Use the 'checkWinner' function to determine the winner for both DATA 1 and DATA 2.
5. Ignore draws this time.

TEST DATA 1: Dolphins score 44, 23 and 71. Koalas score 65, 54 and 49
TEST DATA 2: Dolphins score 85, 54 and 41. Koalas score 23, 34 and 27

HINT: To calculate average of 3 values, add them all together and divide by 3
HINT: To check if number A is at least double number B, check for A >= 2 * B. Apply this to the team's average scores 

*/
const calcAverage = (a, b, c) => (a + b + c) / 3;

const firstMatchDolphins = calcAverage(44, 23, 71);
const firstMatchKoalas = calcAverage(65, 54, 49);
const secondMatchDolphins = calcAverage(85, 54, 41);
const secondMatchKoalas = calcAverage(23, 34, 27);
// calculated the average for both matches, the solution used let, and then reassigned to calculate the second match.

function checkWinner(avgDolphins, avgKoalas) {
  // I used a declaration, the solution used an expression.
  if (avgDolphins >= avgKoalas * 2) {
    console.log(`Dolphins win (${avgDolphins} vs. ${avgKoalas})`);
  } else if (avgKoalas >= avgDolphins * 2) {
    console.log(`Koalas win (${avgKoalas} vs. ${avgDolphins})`);
  } else {
    console.log(`Nobody wins!`);
  }
}

checkWinner(firstMatchDolphins, firstMatchKoalas);
checkWinner(secondMatchDolphins, secondMatchKoalas);

/* 
    SOLUTION PRESENTED IN THE COURSE:

    const calcAverage = (a, b, c) => (a + b + c) / 3;

// Test 1
let scoreDolphins = calcAverage(44, 23, 71);
let scoreKoalas = calcAverage(65, 54, 49);
console.log(scoreDolphins, scoreKoalas);

const checkWinner = function (avgDolphins, avgKoalas) { // used an expression
  if (avgDolphins >= 2 * avgKoalas) {
    console.log(`Dolphins win 🏆 (${avgDolphins} vs. ${avgKoalas})`);
  } else if (avgKoalas >= 2 * avgDolphins) {
    console.log(`Koalas win 🏆 (${avgKoalas} vs. ${avgDolphins})`);
  } else {
    console.log('No team wins...');
  }
}
checkWinner(scoreDolphins, scoreKoalas);

checkWinner(576, 111); // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> we can use any values.

// Test 2
scoreDolphins = calcAverage(85, 54, 41); //reassigning the variable
scoreKoalas = calcAverage(23, 34, 27);
console.log(scoreDolphins, scoreKoalas);
checkWinner(scoreDolphins, scoreKoalas);

*/

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/*

LECTURE: INTRODUCTION TO ARRAYS.

    The two most important data structures are arrays and objects.

    Programming is, most of the time, data. 

    If we wanted to store our friends names in variables to use later in a program, with the knowledge that we have, this is how we would do it:

    const friend1 = 'Michael';
    const friend2 = 'Steven';
    const friend3 = 'Peter';

    This is not be very easy, specially if we have many friends.

    It would be much easier to store this values (names) into a larger container. And thats where arrays have their importance. 

    We use arrays when we have more than a single value. So instead of the above, this is how we should do:
*/

const friends = ["Michael", "Steven", "Peter"]; // create a variable called friends, use the brackets to create a new array, in which we store the values, separated by a comma (outside of the string).
console.log(friends);

const birthYears = new Array(1991, 1984, 2008, 2020); // This is another way to create an array. Instead of the brackets we use the keyword new and the Array function. However it is more usual to use the brackets (literal syntax).

// Now we know how to create arrays, in other words, how to put elements into an array. let's learn how to get them out. For that we use the square bracket syntax again.

console.log(friends[0]); // to log the first of the friends array (don't forget the arrays are zero based).
console.log(friends[2]);
console.log(friends.length); // to log the number of elements that is in the array (the length property is not zero based!!!, it gives us the exact amount of elements). We are not retrieving an element, so we don't use the brackets.
console.log(friends[friends.length - 1]); // to log the last element of the array. we need to use an expression because, to retrieve an element, we need the correct index position. as we have seen, the length property is not zero based, so we need to -1. inside the brackets, javascript expects an expression (remember expression vs statement).

// the square brackets syntax is not only for retrieving elements from the array, we can also replace them:

friends[2] = "Jay"; // replace peter for jay
console.log(friends);

// Notice that the friends variable is declared with const. As we have learned, const variables cannot be changed/reassigned, however we just did it here with the replacement of a string. This happens because only primitive values are immutable, but arrays are not primitive values, so we can change them. It works this way because of the way that javascript stores data in memory (more on this on javascript behind the scenes lecture).

// friends = ['Bob', 'Alice'] >>>> What we can't do is this, replace the entire array, say that now, the friends array should have this two strings.

const firstName = "Francis";
const francis = [firstName, "Ferreira", 2023 - 1988, "teacher", friends]; // An array can hold values with different types, all at the same time (notice the array used before inside of this new array). We can also use variables, see firstName example, remember forms data to be structured in an array.
console.log(francis);
console.log(francis.length); // remember that it's not zero based, hence the 5 in the log

// Exercise to demonstrate the utility of arrays.
const calcAge = function (birthYear) {
  // lets bring the function to calculate the age.
  return 2023 - birthYear;
};

const years = [1990, 1967, 2002, 2010, 2018]; // imagine that we have an array of birth years and we want to calculate the age of some of them using the function, and then store the results into a new array.

const ageA = calcAge(years[0]); // calcAge the age of the first element (position zero) and store the result into a variable called ageA.
const ageB = calcAge(years[1]);
const ageC = calcAge(years[years.length - 1]); // calcAge the element in the last position.
console.log(ageA, ageB, ageC); // this way it will log the three ages, but if we started with an array, we usually want to end with an array;

const ages = [
  // we create an array named ages
  calcAge(years[0]), // remember that any position of the array simply needs to be an expression (something that produces a value). we can place a function call in an array because it produces a value.
  calcAge(years[1]), // Don't be confused with the (,)!! It's prettier extension arranging the code, in this phase of learning imagine that it's all in one line.
  calcAge(years[years.length - 1]),
];
console.log(ages); // the same values, placed in an array.

// if we wanted to calculate the age for all of the elements in the array, we could NOT do this. And that's because years is an array, if we pass it as an argument in the function we would see NaN in the console. the operation that is done in the function expects a single value , we can't do a number minus an array (return 2023 - array).

// calcAge(years);
// console.log(calcAge(years));

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/*
LECTURE: BASIC ARRAY OPERATIONS(METHODS).

    Javascript has some built in functions that we can apply directly on arrays.

    This are called methods. we can think of methods as array operations basically.


*/

// ADD ELEMENTS.
const friendsThisLecture = ["Michael", "Steven", "Peter"];
friendsThisLecture.push("Jay"); // the push method adds elements to the END of the array.
console.log(friendsThisLecture);

// push method is, essentially, a function that we call directly on the friends array with the (.). Since push is a function, it returns a value, which is the length of the new array. If we want to capture the value, we create a new variable for that, pay attention because we cant do both ways, otherwise it adds jay twice:

// const newLength = friendsThisLecture.push("Jay");
// console.log(newLength);

// most of the time we don't do this, we push an element and it's done, because we don't immediately need the length of the new array.

friendsThisLecture.unshift("John"); // the unshift method adds elements to the BEGINNING of the array. just like push,it also returns the length of the array.
console.log(friendsThisLecture);

// REMOVE ELEMENTS.

friendsThisLecture.pop(); // It's the opposite of push. It removes the last element of the array. we don't need to pass any argument to remove the last element.
console.log(friendsThisLecture);

// friendsThisLecture.pop(); // if we run it twice, it removes again the last element.
// console.log(friendsThisLecture);

// the pop method doesn't return the length of the new array, instead returns the removed element:

const popped = friendsThisLecture.pop();
console.log(popped);
console.log(friendsThisLecture);

friendsThisLecture.shift(); // Removes the first element, returns the removed.
console.log(friendsThisLecture);

// INDEX POSITION.
console.log(friendsThisLecture.indexOf("Steven"));
console.log(friendsThisLecture.indexOf("Bob")); // if the element doesn't exist we get -1 (remember first lessons)

// there is a similar method to the indexOf, its an ES6 method and its called includes. instead of returning the index of the element, will simply return true if the element is in the array and false if its not:

console.log(friendsThisLecture.includes("Steven"));
console.log(friendsThisLecture.includes("Bob"));
// it tests with strict equality, if we had the number 23 in the array and tested for string "23" it would return false. Does not do type coercion. This method is very useful to test conditionals:

if (friendsThisLecture.includes("Steven")) {
  console.log("You have a friend called Steven");
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/*
CODING CHALLENGE 2 

Steven is still building his tip calculator, using the same rules as before: Tip 15% of the bill if the bill value is between 50 and 300, and if the value is different, the tip is 20%.

1. Write a function 'calcTip' that takes any bill value as an input and returns the corresponding tip, calculated based on the rules above (you can check out the code from first tip calculator challenge if you need to). Use the function type you like the most. Test the function using a bill value of 100.
2. And now let's use arrays! So create an array 'bills' containing the test data below.
3. Create an array 'tips' containing the tip value for each bill, calculated from the function you created before.
4. BONUS: Create an array 'total' containing the total values, so the bill + tip.

TEST DATA: 125, 555 and 44

HINT: Remember that an array needs a value in each position, and that value can actually be the returned value of a function! So you can just call a function as array values (so don't store the tip values in separate variables first, but right in the new array) 

*/

const calcTip = function (bill) {
  if (bill >= 50 && bill <= 300)
    return bill * 0.15; // Don't forget decimals with (.)
  else return bill * 0.2;
};

console.log(calcTip(555)); // testing the function

const bills = [125, 555, 44];
const tips = [calcTip(bills[0]), calcTip(bills[1]), calcTip(bills[2])];
console.log(tips);

// Bonus question:

const total = [bills[0] + tips[0], bills[1] + tips[1], bills[2] + tips[2]];
console.log(total);

/*
Solution from lecture:

const calcTip = function (bill) {
  return bill >= 50 && bill <= 300 ? bill * 0.15 : bill * 0.2;
} // function expression using the ternary operator 


// const calcTip = bill => bill >= 50 && bill <= 300 ? bill * 0.15 : bill * 0.2; // using the arrow function with the ternary operator.

const bills = [125, 555, 44];
const tips = [calcTip(bills[0]), calcTip(bills[1]), calcTip(bills[2])];
const totals = [bills[0] + tips[0], bills[1] + tips[1], bills[2] + tips[2]];

console.log(bills, tips, totals);
*/

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/*
LECTURE: INTRODUCTION TO OBJECTS.

    Another data structure in javascript is objects.

    We have been using arrays as a data structure to, basically, store multiple related values in the same variable. 

QUICK ARRAY RECAP:

const francisArray = [
  'Francis',
  'Ferreira',
  2023 - 1988,
  'teacher',
  ['Michael', 'Peter', 'Steven']
];

Basically, this is a data structure that combines multiple values that belong to the francis entity.

Intuitively, by looking to the array, we know that the first element of the array should be called firstName, the second lastName, age, etc.

However, in arrays there is no way of giving this elements a name, we can only reference them by the order number in which they appear in the array.

To solve that problem, we have another data structure in Javascript - OBJECTS. In objects, we actually define key value pairs, so we can give each of these values a name:


const francis = { Again, we define a variable and, between the curly braces, is the actual object.
  firstName: 'Francis', 
  lastName: 'Ferreira',
  age: 2023 - 1988,
  job: 'teacher',
  friends: ['Michael', 'Peter', 'Steven']
};

The keys (firstName, age, etc.) are called properties. In coding language we would actually say that the object Francis has five properties. So the firstName property has the value of Francis.

Objects are probably the most fundamental concept in the whole Javascript language, so there are many ways of creating objects. This is the simplest way of creating an object {} - object literal syntax. 

Contrary to arrays, the order of these values doesn't matter when we want to retrieve them. So, we should use arrays for more order data and objects for more unstructured data.

So how do we do it?
*/

/*

LECTURE: DOT vs BRACKET NOTATION.

How to retrieve and change data in objects using both the dot and bracket notation.

*/

const francisco = {
  firstName: "Francisco",
  lastName: "Ferreira",
  age: 2023 - 1988,
  job: "teacher",
  friends: ["Michael", "Peter", "Steven"],
};

console.log(francisco); // in the console, the properties are ordered alphabetically.

console.log(francisco.lastName);
// dot notation - (.) is actually an operator that will go to the object francisco and retrieve the property that we've specified explicitly.

console.log(francisco["lastName"]);
// bracket notation - Here, the big difference between the two notations is that, in the bracket notation, we can put any expression that we'd like. We don't have to specifically write the string here, instead, we can compute it from some operation:

const nameKey = "Name"; // imagine that we have a variable that stores the repeating part in firstName and lastName.
console.log(francisco["first" + nameKey]); // we can use that variable to get both the first and last name. we create the string first and concatenate it with nameKey.
console.log(francisco["last" + nameKey]); //we can put any expression here.

// console.log(jonas.'last' + nameKey) // with the dot notation it produces an error.

// in dot notation we have to use the final property name, not a computed property name. When we have to compute the property name we have to use the bracket notation, otherwise the dot notation looks a lot clean and its easier to use.

// to make it even more clear, let's say that we don't know which property we want to show, and we get this information from some user interface:

/*



const interestedIn = prompt(
  // for this we use the prompt function, which will return a string that we store in the variable interestedIn.
  "What do you want to know about Francisco? Choose between firstName, lastName, age, job, and friends"
);
// console.log(interestedIn); // the log in the console displays the string that the user chose, but we want the actual job so:

// console.log(francisco[interestedIn]); // the string produced by the user gets the property from the object francisco.

// console.log(francisco.interestedIn); would produce undefined error, which in this case, tells us that the property interestedIn does not exist. This shows the difference between dot notation and bracket notation. However, we can go further, let's say that the user writes something other than what's specified, the same undefined error occurs. But this time it actually doesn't exist. Since the undefined error is a false value, we can use it in our advantage:

if (francisco[interestedIn]) {
  // if this value exists, or is truth:
  console.log(francisco[interestedIn]); // print it to the console.
} else {
  console.log(
    "Wrong request! Choose between firstName, lastName, age, job, and friends"
  );
}


*/

// now that we've learned how to retrieve elements from an object, let's see how to add new properties using both notations:

/*
francisco.location = "Spain"; // dot notation 
francisco["twitter"] = "@francisco";
console.log(francisco);
*/

// Exercise:
console.log(
  francisco.firstName +
    " has " +
    francisco.friends.length +
    " friends, and his best friend is called " +
    francisco.friends[0]
);

// it could be done with a template literal:

console.log(
  `${francisco.firstName} has ${francisco.friends.length} friends, and his best friend is called ${francisco.friends[0]}`
);

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/*

LECTURE: OBJECT METHODS.

  Objects, just like arrays, can hold different types of data (even arrays and objects inside objects).

  But we can go even further. As we know, functions are really just another type of value, and if it is a value, we can create a key value pair in which the value is the function. So yes, we can add functions to objects:

const jonas = {
      firstName: 'Jonas',
      lastName: 'Schmedtmann',
      birthYear: 1991, // to simplify, just put the birth year.
      job: 'teacher',
      friends: ['Michael', 'Peter', 'Steven'],
      hasDriversLicense: true, // add a boolean here, just to show that we can hold all kinds of different data types in one object.

// Now let's add a function here as a key value pair, to do that we just add another key here:
// Any function that is attached to an object is called a METHOD, and if we think of functions as simply being values, we can conclude that a method is also a property.

      calcAge: function (birthYear) { // function as an expression, the difference is just in the syntax (:) because calcAge is not a regular variable as before, but instead is a property of the jonas object.
       return 2037 - birthYear;
      }

// Now we can access the calcAge property or method, just like we've done before.

      console.log(jonas.calcAge(1981)); dot notation
      console.log(jonas["calcAge"](1981); bracket notation

// we can see that the birth year 1991 that we passed as an argument to the method is actually already defined in the jonas object above. We already have this information so it's not good practice to repeat ourselves. 

// So how can we access the birthYear property directly from the jonas object? in every method, javascript gives us access to a special variable called (this). The (this) keyword or variable is equal to the object on which the method is called. (IN OTHER WORDS, IS EQUAL TO THE OBJECT CALLING THE METHOD) : 


      calcAge: function () {
        console.log(this);              // if we log it we can see the object jonas
        return 2037 - this.birthYear;
   }
      console.log(jonas.calcAge());     // Here, the object calling the calcAge method is jonas. It means that inside of the method, the THIS keyword will point to jonas.


// we can go a little further with this: let's say that we need to access the age multiple times throughout one program:

console.log(jonas.calcAge());
console.log(jonas.calcAge());
console.log(jonas.calcAge());

if we do it like this, the function is called three times, so the computation is done multiple times, which is not a good option if the computation is heavier. The solution is to calculate the age once and store it in the object and, when we need it, we can just retrieve it from the object as a property.


      calcAge: function () {
        this.age = 2037 - this.birthYeah;       // we can use the (this) keyword to create a new property (this.age) and set it equal to the result of the calculation.
        return this.age;                        // we don't need to return it, we can make the method only calculate the age without returning it, but it's good practice to always be specific.
  },

// So now we can replace the function call with the request for the age property.

console.log(jonas.age);
console.log(jonas.age);
console.log(jonas.age);
*/

// CHALLENGE:

const franciscoThisLesson = {
  firstName: "Francisco",
  lastName: "Ferreira",
  birthYear: 1988,
  job: "teacher",
  friends: ["Michael", "Peter", "Steven"],
  hasDriversLicense: true,
  calcAge: function () {
    this.age = 2023 - this.birthYear;
    return this.age;
  },
  getSummary: function () {
    return `${this.firstName} is a ${this.calcAge()}-year old ${
      this.job
    }, and he has ${this.hasDriversLicense ? "a" : "no"} driver's license`;
  },
};

/*
console.log(franciscoThisLesson.getSummary());
console.log(franciscoThisLesson);
console.log(franciscoThisLesson.friends.length);
*/

/*
console.log(
  `${
    franciscoThisLesson.firstName
  } is a ${franciscoThisLesson.calcAge()}-year old ${
    franciscoThisLesson.job
  }, and he has ${
    franciscoThisLesson.hasDriversLicense ? "a" : "no"
  } driver's license.`
);
*/

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/*
CHALLENGE 3:

Let's go back to Mark and John comparing their BMIs! This time, let's use objects to implement the calculations! Remember: BMI = mass / height ** 2 = mass / (height * height). (mass in kg and height in meter)

1. For each of them, create an object with properties for their full name, mass, and height (Mark Miller and John Smith)
2. Create a 'calcBMI' method on each object to calculate the BMI (the same method on both objects). Store the BMI value to a property, and also return it from the method.
3. Log to the console who has the higher BMI, together with the full name and the respective BMI. Example: "John Smith's BMI (28.3) is higher than Mark Miller's (23.9)!"

TEST DATA: Marks weights 78 kg and is 1.69 m tall. John weights 92 kg and is 1.95 m tall.

*/
const mark = {
  firstName: "Mark",
  lastName: "Miller",
  mass: 78,
  height: 1.69,
  calcBMI: function () {
    // the parameters come from the object, don't forget.
    this.bmi = this.mass / this.height ** 2; // power of two, don't forget.
    return this.bmi;
  },
};

mark.calcBMI();

const john = {
  firstName: "John",
  lastName: "Smith",
  mass: 92,
  height: 1.95,
  calcBMI: function () {
    this.bmi = this.mass / this.height ** 2;
    return this.bmi;
  },
};

john.calcBMI();

// having the same code in both objects solves the problem, however we repeat ourselves. we will learn how to avoid this with object oriented programming further in the course.

/*
const higherBMI = function () { 
  if (mark.bmi > john.bmi)
    console.log(
      `${mark.firstName} ${mark.lastName}'s BMI (${mark.bmi}) is higher than ${john.firstName} ${john.lastName}'s (${john.bmi})!`
    );
  else
    console.log(
      `${mark.firstName} ${mark.lastName}'s BMI (${mark.bmi}) is lower than ${john.firstName} ${john.lastName}'s (${john.bmi})!`
    );
};

higherBMI();

// i wrote a function in order to log, but it was unnecessary.
*/
if (mark.bmi > john.bmi)
  console.log(
    `${mark.firstName} ${mark.lastName}'s BMI (${mark.bmi}) is higher than ${john.firstName} ${john.lastName}'s (${john.bmi})!`
  );
else
  console.log(
    `${mark.firstName} ${mark.lastName}'s BMI (${mark.bmi}) is lower than ${john.firstName} ${john.lastName}'s (${john.bmi})!`
  );

/*
SOLUTION FROM THE COURSE: 

if (mark.bmi > john.bmi) {
  console.log(`${mark.fullName}'s BMI (${mark.bmi}) is higher than ${john.fullName}'s BMI (${john.bmi})`)
} else if (john.bmi > mark.bmi) {
  console.log(`${john.fullName}'s BMI (${john.bmi}) is higher than ${mark.fullName}'s BMI (${mark.bmi})`)
}

*/

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/*

LECTURE: 

    ITERATION: THE FOR LOOP

    When we talked about the if/else statement, we said that it's a control structure, just like the loops.

    Loops are a fundamental aspect of every programming language because they allow us to automate repetitive tasks. just like a gym with reps:

for (let rep = 1; rep <= 30; rep++) { // for loop keeps running while condition is TRUE
  console.log(`Lifting weights repetition ${rep} 🏋️‍♀️`);
}

    The loop statement has three parts separated by (;): 

        the first part is the initial value of a counter, in this case we create a variable called rep and set it to 1.

        the second part is a logical condition that is evaluated before each iteration of the loop (evaluated before each time the code in the loop is executed). If the condition is true, the next loop iteration will run,  but as soon as the condition is false, the loop stops.

        the third part of the for statement is the counter update after each iteration.

        after the three parts, we write the code that we want to be repeated. In this case log to the console. to increase the number in the string we use a placeholder for the rep variable.
*/

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/*

LECTURE: LOOPING ARRAYS, BREAKING AND CONTINUING.

    Let's explore some more features of the for loop and create some more useful examples.

    One of the most used applications of the for loop is to loop through arrays.


*/

const francisArray = [
  "Francis",
  "Ferreira",
  2023 - 1988,
  "teacher",
  ["Michael", "Peter", "Steven"],
];

// We can use the for loop to loop through this array. For now, let's say that we wanted to individually log every element of the array to the console.

/*
for (let i = 0; i < francisArray.length; i++) {
  console.log(francisArray[i], typeof francisArray[i]);
}
*/

// (i) is a traditional counter variable name in coding. This time set to zero because the array is zero based.
// we are using the counter variable to retrieve the elements of the array
// by also logging the type of each element in the array, we can see that the array is also an object.

// this is basically how we loop arrays using the for loop. What we did was just read values from the array, however, we can also create a new array that contains the type of each of the elements:

const types = []; // we start by creating a new and empty array.

for (let i = 0; i < francisArray.length; i++) {
  console.log(francisArray[i], typeof francisArray[i]); // using the same loop

  //types[i] = typeof francisArray[i];
  types.push(typeof francisArray[i]); // using the push method (add at the end), most commonly used.
}

console.log(types);

// Another example:

const yearsThisLesson = [1991, 2007, 1969, 1988];

// What we want to do is to calculate the ages and store them in a new array.

const agesThisLesson = [];

for (let i = 0; i < yearsThisLesson.length; i++) {
  agesThisLesson.push(2023 - yearsThisLesson[i]);
  //agesThisLesson[i] = 2023 - yearsThisLesson[i];
}
console.log(agesThisLesson);

// Two important statements for the for loop: continue and break.

console.log("JUST STRINGS");
for (let i = 0; i < francisArray.length; i++) {
  if (typeof francisArray[i] !== "string") continue; // if the type of the current element is not a string, then continue. just logs the strings, skipping the others.

  console.log(francisArray[i], typeof francisArray[i]);
}

console.log("BREAK WITH NUMBER");
for (let i = 0; i < francisArray.length; i++) {
  if (typeof francisArray[i] === "number") break; // if the type of the current element is a number, terminate the loop. A we see in the log, after the number is found, nothing gets printed.

  console.log(francisArray[i], typeof francisArray[i]);
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/*

LECTURE: LOOPING BACKWARDS AND LOOPS IN LOOPS.

    first we will loop over an array backwoods.

    second we will create a loop inside another loop.
*/

const thomas = [
  "Tom",
  "Cruise",
  2023 - 1977,
  "Actor",
  ["Jim", "John", "Peter"],
];

for (let i = thomas.length - 1; i >= 0; i--) {
  console.log(i, thomas[i]); // also logging the counter (i), just to be clear on the log. if we add elements it works fine.
}

// we start with the counter named i and we want to start (initial value) from the end of the array.
// then we write the condition (in which condition the loop should keep running?). we want the loop to keep running as long as the counter is still above zero.
// then we need to decrease the index or the counter by one.

// loop inside of a loop with the gym example. Previously we had one exercise with 10 reps, now imagine that we have three different exercises with 5 reps each. notice that we named the counter with exercise and not (i) for learning purposes.

/*
for (let exercise = 1; exercise <= 3; exercise++) {
  console.log(`-------- Starting exercise ${exercise}`);
  for (let reps = 1; reps <= 5; reps++) {
    console.log(`Exercise ${exercise}: Lifting weight repetition ${reps} 🏋️‍♀️`);
    for (let rest = 1; rest <= 1; rest++) {
      console.log(`Rest ${rest} minute`);
    }
  }
}
*/

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/*

LECTURE: THE WHILE LOOP.

    Let's bring the gym example again: 

for (let rep = 1; rep <= 10; rep++) {
  console.log(`Lifting weights repetition ${rep} 🏋️‍♀️`);   
}

    To implement the same with a while loop we still need the same components. We still need a counter to print the current value to the console, we still need a condition so that we know when to stop, and we still need to increase the counter.

    In the while loop it works a bit different because we can only specify a condition. So while (rep <= 10) {}. The other two condition we have to specify "manually":

let rep = 1; >>>> we need to set the counter outside.
while (rep <= 10) { >>>> the condition
  console.log(`WHILE: Lifting weights repetition ${rep} 🏋️‍♀️`); >>>> the code to execute 
  rep++; >>>> at the end of the iteration we increase the counter.
}

    The while loop its more versatile than the for loop because it does not really need a counter. we have placed it here because of this specific example. All the while loop needs is the condition, see the next example.

    The next example does not depend on a counter, instead, it will depend on a random variable. we basically want to roll a dice, and keep looping until we roll a six. 

    Remember - Math.random() creates a random number between zero and one, we multiply it by six because that's the number of faces of the dice. Since it gives us a decimal number we need to use Math.trunc to remove the decimal part. at this point it will return a number between zero and five, and that's why we add one, so it returns one to six.
*/

/*
let dice = Math.trunc(Math.random() * 6) + 1;
console.log(dice);

while (dice !== 6) {
  // we want to keep running the loop until a six comes, so while dice is different from 6.
  console.log(`You rolled a ${dice}`); // IMPORTANT - INFINITE LOOP
  dice = Math.trunc(Math.random() * 6) + 1;
  if (dice === 6) console.log(`You rolled a ${dice}, you win!`);
}
*/

/*
IMPORTANT - INFINITE LOOP >>>> The while loop will be better explained further ahead, however, keep in mind the following: 

>>>> we start by generating ONE random number between one and six;
>>>> then, we say that while the number is different from six, log the following;
>>>> if we stop the code here and save, the loop will run forever because, remember, we have only generated ONE random number, and if its different from six it will keep printing the template literal (i guess)
>>>> that's why we need to keep creating new dice values with the reassignment of the variable dice at the end of each iteration with the code:
    dice = Math.trunc(Math.random() * 6) + 1;


When we don't know the number of iterations, the while loop is the adequate tool, otherwise the for loop may be more useful. 
*/

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/*

CHALLENGE 4

Let's improve Steven's tip calculator even more, this time using loops!

1. Create an array 'bills' containing all 10 test bill values
2. Create empty arrays for the tips and the totals ('tips' and 'totals')
3. Use the 'calcTip' function we wrote before (no need to repeat) to calculate tips and total values (bill + tip) for every bill value in the bills array. Use a for loop to perform the 10 calculations!

TEST DATA: 22, 295, 176, 440, 37, 105, 10, 1100, 86 and 52


4. BONUS: Write a function 'calcAverage' which takes an array called 'arr' as an argument. This function calculates the average of all numbers in the given array. This is a DIFFICULT challenge (we haven't done this before)! Here is how to solve it:
  4.1. First, you will need to add up all values in the array. To do the addition, start by creating a variable 'sum' that starts at 0. Then loop over the array using a for loop. In each iteration, add the current value to the 'sum' variable. This way, by the end of the loop, you have all values added together
  4.2. To calculate the average, divide the sum you calculated before by the length of the array (because that's the number of elements)
  4.3. Call the function with the 'totals' array

*/

const billsExerciseFour = [22, 295, 176, 440, 37, 105, 10, 1100, 86, 52];
const tipsExFour = [];
const totals = [];

const calcTipThis = function (bill) {
  if (bill >= 50 && bill <= 300) return bill * 0.15;
  else return bill * 0.2;
};
// console.log(calcTipThis(billsExerciseFour[3]));

for (let i = 0; i < billsExerciseFour.length; i++) {
  // don't forget that is (<), not (<=) because (.length) is not zero based (we need index 0 to 9), change to see why.
  tipsExFour.push(calcTipThis(billsExerciseFour[i]));
  totals[i] = billsExerciseFour[i] + tipsExFour[i];
}
console.log(billsExerciseFour, tipsExFour, totals);

const calcAverageThis = function (arr) {
  let sum = 0; // create a variable to be updated at each iteration.
  for (let i = 0; i < arr.length; i++) {
    sum += arr[i];
    //sum = sum + arr[i]; // it's the same, but more clean with the operator
  }
  return sum / arr.length;
};
console.log(calcAverageThis(totals));
console.log(calcAverageThis(tipsExFour));

/*
const calcTip = function (bill) {
  return bill >= 50 && bill <= 300 ? bill * 0.15 : bill * 0.2;
}
const bills = [22, 295, 176, 440, 37, 105, 10, 1100, 86, 52];
const tips = [];
const totals = [];

for (let i = 0; i < bills.length; i++) {
  const tip = calcTip(bills[i]); // 
  tips.push(tip);
  totals.push(tip + bills[i]);
}
console.log(bills, tips, totals);

const calcAverage = function (arr) {
  let sum = 0;
  for (let i = 0; i < arr.length; i++) {
    // sum = sum + arr[i];
    sum += arr[i];
  }
  return sum / arr.length;
}
console.log(calcAverage([2, 3, 7]));
console.log(calcAverage(totals));
console.log(calcAverage(tips));
*/
