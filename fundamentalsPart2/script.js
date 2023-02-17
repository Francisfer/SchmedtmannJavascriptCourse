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

  FUNCTION DECLARATIONS: The functions that we wrote in the last lecture are called function declarations, because we simply used the function keyword to declare a function. a bit like we declare a variable. >>>>> we can call the function before we declare it with declarations.
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
