/* 
LECTURE: VALUES AND VARIABLES.
    1. Declare variables called 'country''continent'and'population'and assign their values according to your own country (population in millions)
    2. Log their values to the console 

*/

/*
let country = "Portugal";
let continent = "Europe";
let population = 10;
console.log(country);
console.log(continent);
console.log(population);
*/

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/* 
LECTURE: DATA TYPES.

    I. Number: Floating point numbers 👉 Used for decimals and integers
    II. String: Sequence of characters 👉 Used for text
    III. Boolean: Logical type that can only be true or false 👉 Used for taking decisions
    IV. Undefined: Value taken by a variable that is not yet defined (‘empty value’)


         1. Declare a variable called 'isIsland' and set its value according to your country. The variable should hold a Boolean value. Also declare a variable 'language', but don't assign it any value yet
         2. Log the types of 'isIsland','population','country'and'language' to the console.
*/

/*
let isIsland = false;
let language;
console.log(typeof isIsland);
console.log(typeof population);
console.log(typeof country);
console.log(typeof language);
*/

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/*
LECTURE: LET, CONST and VAR.

    1. Set the value of 'language' to the language spoken where you live (some countries have multiple languages, but just choose one).
    2. Think about which variables should be const variables(which values will never change, and which might change?). Then, change these variables to const.
    3. Try to change one of the changed variables now,and observe what happens.

    >>>> const variables can´t be changed.
    >>>> var, let and const are different, explained in section 7.
    var can be left undefined
*/

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/* LECTURE : BASIC OPERATORS. SEE OPERATOR PRECEDENCE.

    2**3 = two to the power of 3 - 2*2*2
    // Assignment operators
        let x = 10 + 5; // 15
        x += 10; // x = x + 10 = 25
        x *= 4; // x = x * 4 = 100
        x++; // x = x + 1
        x--; // x = x - 1
    
    // Comparison operators
        >, <, >=, <=

        1. If your country split in half,and each half would contain half the population, then how many people would live in each half?
        2. Increase the population of your country by 1 and log the result to the console.
        3. Finland has a population of 6 million. Does your country have more people than Finland?
        4. The average population of a country is 33 million people. Does your country have less people than the average country?
        5. Based on the variables you created,create a new variable 'description' which contains a string with this format: 'Portugal is in Europe, and its 11 million people speak portuguese'
*/

/*
console.log(population / 2);
population++;
console.log(population);
let countryF = "Finland";
let populationF = 6;
console.log(population > populationF);
console.log(population > 33);
const description =
  country +
  " is in " +
  continent +
  ", and it's " +
  population +
  " million people speak Portuguese.";
console.log(description);
*/

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/*
    CHALLENGE 1!


Mark and John are trying to compare their BMI (Body Mass Index), which is calculated using the formula: BMI = mass / height ** 2 = mass / (height * height). (mass in kg and height in meter).

1. Store Mark's and John's mass and height in variables
2. Calculate both their BMIs using the formula (you can even implement both versions)
3. Create a boolean variable 'markHigherBMI' containing information about whether Mark has a higher BMI than John.

TEST DATA 1: Marks weights 78 kg and is 1.69 m tall. John weights 92 kg and is 1.95 m tall.
TEST DATA 2: Marks weights 95 kg and is 1.88 m tall. John weights 85 kg and is 1.76 m tall.

GOOD LUCK 😀
*/

let markMass1 = 78,
  markHeight1 = 1.69;
const bmiMark1 = markMass1 / markHeight1 ** 2;
console.log(bmiMark1);

let markMass2 = 95,
  markHeight2 = 1.88;
const bmiMark2 = markMass2 / markHeight2 ** 2;
console.log(bmiMark2);

let johnMass1 = 92,
  johnHeight1 = 1.95;
const bmiJohn1 = johnMass1 / johnHeight1 ** 2;
console.log(bmiJohn1);

let johnMass2 = 85,
  johnHeight2 = 1.76;
const bmiJohn2 = johnMass2 / johnHeight2 ** 2;
console.log(bmiJohn2);

let markHigherBMI1st = bmiMark1 > bmiJohn1;
let markHigherBMI2nd = bmiMark2 > bmiJohn2;
console.log(markHigherBMI1st);
console.log(markHigherBMI2nd);

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/* 

LECTURE: STRINGS AND TEMPLATE LITERALS.

Template literals is an new feature of javascript that simplifies the construction of strings. 

*/

const firstName = "Francisco";
const job = "teacher";
const birthYear = 1988;
const year = 2023;

const francisco =
  "I'm " + firstName + ", a " + (year - birthYear) + " year old " + job + "!";
console.log(francisco);
/* This is the most common way to create a string, however is somehow prone to errors or to the necessity off adding spaces. */

const franciscoNew = `I'm ${firstName}, a ${year - birthYear} year old ${job}!`;
console.log(franciscoNew);
/* With the template literals technique we just need to add a ` in the beginning and ${variableName};
The output is the same.*/

console.log(
  "String with \n\
multiple \n\
lines"
);
/* Multiline string before Template Literals. */

console.log(`String with
multiple
lines`);
/* Multiline string with new feature. This will become handy to build html from javascript. */

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/* 

LECTURE: TAKING DECISIONS - IF/ELSE STATEMENTS.
The if/else statements are also defined as control structure because it allows us to have more control over the code (blocks that are executed and blocks that don´t get executed.) */

const age = 17;
if (age >= 18) {
  console.log("Sarah can start driving license");
} else {
  const yearsLeft = 18 - age;
  console.log(
    "Sarah is too young, wait another " + yearsLeft + " years to drive"
  );
  console.log(
    `Sarah is too young, wait another ${yearsLeft} years to drive`
  ); /* Template literals */
}
/* console.log(yearsLeft) >>>>>> This creates an error because yearsLeft is only defined inside the if/else statement, there is an example ahead. */

/* CHALLENGE 2 (using the code from challenge 1)

Use the BMI example from Challenge #1, and the code you already wrote, and improve it:

1. Print a nice output to the console, saying who has the higher BMI. The message can be either "Mark's BMI is higher than John's!" or "John's BMI is higher than Mark's!"
2. Use a template literal to include the BMI values in the outputs. Example: "Mark's BMI (28.3) is higher than John's (23.9)!"

HINT: Use an if/else statement
*/

if (bmiMark1 >= bmiJohn1) {
  console.log(`Mark´s BMI (${bmiMark1}) is higher than John´s (${bmiJohn1}`);
} else {
  console.log(`John´s BMI (${bmiJohn1}) is higher than Mark´s (${bmiMark1})`);
}

if (bmiMark2 >= bmiJohn2) {
  console.log(`Mark´s BMI (${bmiMark2}) is higher than John´s (${bmiJohn2}`);
} else {
  console.log(`John´s BMI (${bmiJohn2}) is higher than Mark´s (${bmiMark2}`);
}

/* 
In the beginning of this lecture we have created the const yearsLeft inside the if/else statement. That worked only because we called it inside that same if/else statement. If we want to call it outside we must define it without a value. It´s better explained in lessons ahead.


const birthYear2 = 1988;

let century;
if (birthYear2 <= 2000) {
  century = 20;
} else {
  century = 21;
}
console.log(century);
*/

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/*

LECTURE: TYPE CONVERSION AND COERCION.


type conversion: when we explicitly change/convert the type manually. we can only convert to numbers, strings or to booleans (booleans behave in a different way, see ahead in Truthy and Falsy Values lecture).
*/
const inputYear =
  "1991"; /* this is an input from a user asking the birth year. if we don´t specify the type of input to number (in the html or in javascript), it defaults to "text" or, in this case, a string. */

console.log(inputYear + 18);
/* assuming that we want to calculate the year when the user turns 18, we need to convert this string into a number, so that the + sign doesn't concatenate the values - see the log.
 */

console.log(
  Number(inputYear),
  inputYear
); /* to convert the string into a number we need to use the function (Number). see the log, one is a number and the other is a string. */

console.log(Number(inputYear) + 18); /* now we can perform the calculations. */

console.log(
  String(23),
  23
); /* this is the opposite, converting numbers into strings. although is not as important. see log for the different colors in the output.

/*
type coercion: javascript automatically coverts the type implicitly. type coercion happens whenever an operator(+ -) is dealing with two values that have different types. in that case javascript will convert one of the values to match the other value, so that the operation can be executed. Many languages don´t have type coercion, in that case we need to manually specify the type with a function as seen before.
*/

console.log(
  "I am " + 23 + " years old"
); /* the + operator triggers a coercion to strings. whenever there is an operation between a string and a number, the number will be converted to a string. */

console.log(`I am 23 years old`); /* The same happens with template literals. */
console.log("23" - "10" - 3);
console.log("23" * "2" * 2);
console.log("23" / "2" + 5);
console.log(
  "23" + "10" + 3
); /* Not all operators do type coercion to string. the - * / operators converts strings to numbers. As we can see in the last log, using the + operator converts the number and concatenates the strings. */
console.log(
  "23" + "10" / 2
); /* If, instead of the + we use /, the code performs the division and concatenates the string 23 with the result. */

let n = "1" + 1; // "11" coercion to string
n = n - 1; // "11" - 1 coercion to number
console.log(n);

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/*

LECTURE: TRUTHY AND FALSY VALUES

Falsy values are values that are not exactly false, but will become false when we try to convert them to a boolean. False is already false, so we don't need to include it.

There are 5 falsy values: 0, '' (this is an empty string), undefined, null, NaN.
Everything else are so called truthy values or values that will be converted to true, for example any number that is not zero or any string that is not empty. we've already used the String and the Number functions, now we will use the Boolean function.
*/

console.log(Boolean(0));
console.log(Boolean(undefined));
console.log(Boolean("Jonas")); // not empty
console.log(Boolean({})); // empty object - further lessons
console.log(Boolean([])); // empty array - further lessons
console.log(Boolean(""));

/* In practice, the conversion to boolean is always implicit - type coercion. but when exactly does javascript do type coercion to booleans? it happens in to scenarios: first when using logical operators and second in a logical context (for example in a condition of an if else statement). 

if/else statement context: 
    The next condition has the variable money set to zero. Then we test to see if a person has money or not. If we run the code, the second condition gets executed, but why? We know that money is a number (zero initially), but in the logical context of an if/else statement condition(right after the if), javascript will try to coerce any value into a boolean. No matter what we put, if its not a boolean, javascript will try to convert it to a boolean using the truthy and falsy value rules that we discussed in the beginning. zero is a falsy value, in the condition it will be converted to false and, as a result, the else block gets executed. If we change the value of money, the condition will become true and the if block gets executed.
*/

const money = 0;
if (money) {
  console.log("Don't spend it all ;)");
} else {
  console.log("You should get a job!");
}

/* Another use case is to check if a variable is defined or not. Later in the course we will see that it makes a lot of sense to test if something actually exists or not. uncomment the different situations to see the log! */

/*
let height; 
if (height) {
  console.log('YAY! Height is defined');
} else {
  console.log('Height is UNDEFINED');
}
*/

/*
let height = 160;
if (height) {
  console.log('YAY! Height is defined');
} else {
  console.log('Height is UNDEFINED');
}
*/

let height = 0;
if (height) {
  console.log("YAY! Height is defined");
} else {
  console.log("Height is UNDEFINED");
}

/*
If we set the value to zero, we did actually defined the variable but the output is false. it's not what we want for this scenario (the possibility of the value being zero makes the code buggy). this can and wil be resolved using logical operators (further in the course)
*/

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/* 

LECTURE: EQUALITY OPERATORS (=== VS ==) 
So far, we have only used comparison operators to take decisions with if/else statements. lets suppose that we want to check if two values are actually equal, instead of one being greater or less than other.

The equality operators, just like the comparison operators, will return a boolean (true or false). however:

    >>>> In the case of the === (strict equality operator), the result will only be true if the two values are exactly the same, that happens because it does not perform type coercion.

    >>>> On the other hand, the == (loose equality operator), does type coercion. this operator has specific rules. its advised in this course to only use the strict operator, using the functions mentioned before (Number, String, Boolean) to convert the inputs.

The different operator (!== STRICT) (!= LOOSE). rules are the same.

*/

/*
const ageThisLecture = 18; // if we change the value to "18", only the second condition will be true. 

if (ageThisLecture === 18) console.log('You just became an adult :D (strict equality operator)'); // if we only use one line of code (condition) we can omit the {}.

if (ageThisLecture == 18) console.log('You just became an adult :D (loose equality operator)');



const favorite = Number(prompt("What's your favorite number?")); // if we don´t use the Number function the return type will be a string
console.log(favorite);
console.log(typeof favorite);


if (favorite === 23) { // 22 === 23 -> TRUE (because we have used the Number function to convert, otherwise it would return a string)
    console.log('Cool! 23 is an amazing number!')
  } else if (favorite === 7) {    // we can add more conditions to an if/else statement with else/if
    console.log('7 is also a cool number')
  } else if (favorite === 9) {
    console.log('9 is also a cool number')
  } else {
    console.log('Number is not 23 or 7 or 9')
  }
  if (favorite !== 23) console.log('Why not 23?'); // STRICT OPERATOR FOR DIFFERENT.

  */

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/*

LECTURE: BOOLEAN LOGIC (AND, OR & NOT)

  Boolean logic is a branch of computer science which uses true and false values to solve complex logical problems. in order to do that, it uses several logical operators to combine true and false values, much like we use arithmetic operators to combine numeric values. The most basic logical operators are AND - OR - NOT.

AND OPERATOR - Returns true only if all the operands/values are true.
OR OPERATOR - Returns true if one of the variables/operands is true.
NOT OPERATOR (It has precedence over the others) - It doesn't combine multiple values. Acts in only one boolean value and inverts it. 

*/

const hasDriversLicense = true; // A
const hasGoodVision = true; // B
const isTired = false; // C

console.log(hasDriversLicense && hasGoodVision); // && AND Operator
console.log(hasDriversLicense || hasGoodVision); // || OR Operator
console.log(!hasDriversLicense); // NOT Operator

if (hasDriversLicense && hasGoodVision && isTired) {
  console.log("Sarah can drive.");
} else {
  console.log("Sarah shouldn't drive!");
} // She shouldn't drive because isTired is set to false.

if (hasDriversLicense && hasGoodVision && !isTired) {
  console.log("Sarah can drive.");
} else {
  console.log("Sarah shouldn't drive!");
} // With !isTired she can drive.

if (hasDriversLicense || hasGoodVision || isTired) {
  console.log("Sarah can drive.");
} else {
  console.log("Sarah shouldn't drive!");
} // only one value truth to the condition to be also truth.

/*

//set A = true
  //  B = false
  //  C = False
    
    //The purpose is to train precedence and analyzing the output.

if (hasDriversLicense && (hasGoodVision || isTired)) {
    console.log("Sarah can drive.");
} else {
    console.log("Sarah shouldn't drive!");
} // (true - false - false = shouldn't)



if (hasDriversLicense || (hasGoodVision && isTired)) {
    console.log("Sarah can drive.");
} else {
    console.log("Sarah shouldn't drive!");
} // (true - false - false = can drive)

*/
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// CHALLENGE 3
/*

There are two gymnastics teams, Dolphins and Koalas. They compete against each other 3 times. The winner with the highest average score wins the a trophy!

1. Calculate the average score for each team, using the test data below
2. Compare the team's average scores to determine the winner of the competition, and print it to the console. Don't forget that there can be a draw, so test for that as well (draw means they have the same average score).

3. BONUS 1: Include a requirement for a minimum score of 100. With this rule, a team only wins if it has a higher score than the other team, and the same time a score of at least 100 points. HINT: Use a logical operator to test for minimum score, as well as multiple else-if blocks 😉
4. BONUS 2: Minimum score also applies to a draw! So a draw only happens when both teams have the same score and both have a score greater or equal 100 points. Otherwise, no team wins the trophy.

TEST DATA: Dolphins score 96, 108 and 89. Koalas score 88, 91 and 110
TEST DATA BONUS 1: Dolphins score 97, 112 and 101. Koalas score 109, 95 and 123
TEST DATA BONUS 2: Dolphins score 97, 112 and 101. Koalas score 109, 95 and 106
*/

const dolphinsAverage = (97 + 112 + 101) / 3;
const koalasAverage = (109 + 95 + 106) / 3;
console.log(dolphinsAverage);
console.log(koalasAverage);
// 1.

/*
if (dolphinsAverage > koalasAverage) {
    console.log(`Dolphins win with an average score of ${dolphinsAverage} versus ${koalasAverage} `);
} else if (dolphinsAverage < koalasAverage) {
    console.log(`Koalas win with an average score of ${koalasAverage} versus ${dolphinsAverage} `);
} else if (dolphinsAverage === koalasAverage) {
    console.log(`It's a Draw!`);
}
*/

// 2 and 3 (just change the results given above. Also test draw below 100 points)

if (dolphinsAverage > koalasAverage && dolphinsAverage >= 100) {
  console.log(
    `Dolphins win with an average score of ${dolphinsAverage} versus ${koalasAverage} `
  );
} else if (dolphinsAverage < koalasAverage && koalasAverage >= 100) {
  console.log(
    `Koalas win with an average score of ${koalasAverage} versus ${dolphinsAverage} `
  );
} else if (
  koalasAverage === dolphinsAverage &&
  koalasAverage >= 100 &&
  dolphinsAverage >= 100
) {
  console.log(`It's a Draw!`);
} else {
  console.log(`No team wins!`);
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/*

LECTURE: THE SWITCH STATEMENT.
    The switch statement is an alternative way of writing a complex if/else statement when all we want to do is to compare a one value to multiple different options. To write an agenda for example. Most of this data would come from the user, the hard coding is for learning purposes.
*/

/*
const day = "monday";

switch (day) {
  case "monday": // day === 'monday' STRICT EQUALITY
    console.log("Plan course structure");
    console.log("Go to coding meetup");
    break;
  case "tuesday": // note that its a colum (:)
    console.log("Prepare theory videos");
    break;
  case "wednesday": // run the same code for different values/if the activity was the same for ex.
  case "thursday":
    console.log("Write code examples");
    break;
  case "friday":
    console.log("Record videos");
    break;
  case "saturday":
  case "sunday":
    console.log("Enjoy the weekend :D");
    break;
  default:
    console.log("Not a valid day!"); // this line is like the else statement, in case of any of days is valid.
}
// not adding the break makes the code run until the next break, in this case logs the activities for two days.

if (day === "monday") {
  console.log("Plan course structure");
  console.log("Go to coding meetup");
} else if (day === "tuesday") {
  console.log("Prepare theory videos");
} else if (day === "wednesday" || day === "thursday") {
  // ALWAYS specify the code: (day === "wednesday || "thursday") would not be valid!
  console.log("Write code examples");
} else if (day === "friday") {
  console.log("Record videos");
} else if (day === "saturday" || day === "sunday") {
  console.log("Enjoy the weekend :D");
} else console.log("Not a valid day!");
// this is the if else way (actually i prefer it)

*/

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/*
LECTURE: STATEMENTS AND EXPRESSIONS.

STATEMENTS - a bigger piece of code that is executed and does not produce a value on itself: if/else or switch.

EXPRESSIONS - Is a peace of code that produces a value: 3 + 4 or 1991 or booleans.

const me = 'Francis';
console.log(`I'm ${2037 - 1991} years old ${me}`);

The explanation on this lesson was not very clear, however, the point is that javascript expects expressions and statements on the right places. for example:

console.log(`I'm ${2037 - 1991} years old ${if (23 > 10)}`); this is not valid because in the second placeholder is expected an expression.
*/

/* 

LECTURE: THE CONDITIONAL (TERNARY) OPERATOR.
We already saw two ways of writing conditionals (if/else statement and the switch statement) but there is another one.

The conditional operator allows us to write something similar to an if/else statement but all in one line. Another advantage is the possibility to declare a variable based on a condition. as we remember, to do the same with an if/else statement, we would have to declare a variable (with no value) outside the condition (let).


*/

const ageNow = 20; // First we define a variable
/*
ageNow >= 18 // test if the age is at least 18
  ? console.log("I like to drink wine 🍷") // use the ? and place the if condition after, we can only have one line of code
  : console.log("I like to drink water 💧"); // after the : place the else part of the code, thats why is called ternary (the condition, the if part and the else part.)
*/

// this is how this is commonly used:

const drink = ageNow >= 18 ? "wine 🍷" : "water 💧"; // this operator is an expression, it produces a value, so it can be stored in a variable. its basically the possibility of assigning a variable conditionally without a bigger block of code using if/else, as we will see next.
console.log(drink);
console.log(`I like to drink ${ageNow >= 18 ? "wine 🍷" : "water 💧"}`); // we can put the expression directly in a template literal

let drink2;
if (ageNow >= 18) {
  drink2 = "wine 🍷";
} else {
  drink2 = "water 💧";
}
console.log(`I like to drink ${drink2}`);

/* 
    CODING CHALLENGE 4:

Steven wants to build a very simple tip calculator for whenever he goes eating in a restaurant. In his country, it's usual to tip 15% if the bill value is between 50 and 300. If the value is different, the tip is 20%.

1. Your task is to calculate the tip, depending on the bill value. Create a variable called 'tip' for this. It's not allowed to use an if/else statement 😅 (If it's easier for you, you can start with an if/else statement, and then try to convert it to a ternary operator!)
2. Print a string to the console containing the bill value, the tip, and the final value (bill + tip). Example: 'The bill was 275, the tip was 41.25, and the total value 316.25'

TEST DATA: Test for bill values 275, 40 and 430

HINT: To calculate 20% of a value, simply multiply it by 20/100 = 0.2
HINT: Value X is between 50 and 300, if it's >= 50 && <= 300 

*/

const bill = 75;
const tip = bill >= 50 && bill <= 300 ? bill * 0.15 : bill * 0.2;
console.log(
  `The bill was ${bill}, the tip was ${tip}, and the total value ${bill + tip}`
);

let tip2;
if (bill >= 50 && bill <= 300) {
  tip2 = bill * 0.15;
} else {
  tip2 = bill * 0.2;
}
console.log(
  "The bill was " +
    bill +
    ", the tip was " +
    tip2 +
    ", and the total value " +
    (bill + tip2)
);
