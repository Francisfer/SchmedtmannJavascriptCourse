/* 

LECTURE: VALUES AND VARIABLES.
    1. Declare variables called 'country''continent'and'population'and assign their values according to your own country (population in millions)
    2. Log their values to the console 

*/


    let country = "Portugal"; 
    let continent = "Europe"; 
    let population = 10; 
    console.log(country); 
    console.log(continent); 
    console.log(population); 


/*

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/* 

LECTURE: DATA TYPES.

    I. Number: Floating point numbers 👉 Used for decimals and integers
    II. String: Sequence of characters 👉 Used for text
    III. Boolean: Logical type that can only be true or false 👉 Used for taking decisions
    IV. Undefined: Value taken by a variable that is not yet defined (‘empty value’)


         1. Declare a variable called 'isIsland' and set its value according to your country. The variable should hold a Boolean value. Also declare a variable 'language', but don't assign it any value yet
         2. Log the types of 'isIsland','population','country'and'language' to the console.
*/


    let isIsland = false;
    let language; 
    console.log(typeof isIsland)
    console.log(typeof population)
    console.log(typeof country)
    console.log(typeof language)


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/* LECTURE: LET, CONST and VAR.

    1. Set the value of 'language' to the language spoken where you live (some countries have multiple languages, but just choose one).
    2. Think about which variables should be const variables(which values will never change, and which might change?). Then, change these variables to const.
    3. Try to change one of the changed variables now,and observe what happens.

    >>>> const variables can´t be changed.
    >>>> var, let and const are different, explained in section 7.
*/

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

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

    console.log(population / 2 ); 
    population++
    console.log(population);
    let countryF = "Finland";
    let populationF = 6
    console.log(population > populationF)
    console.log(population > 33)
    const description = country + " is in " + continent + ", and it's " + population + " million people speak Portuguese."
    console.log(description)



/* 

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

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

let markMass1 = 78, markHeight1 = 1.69;
const bmiMark1 = markMass1 / (markHeight1 ** 2);
console.log(bmiMark1)

let markMass2 = 95, markHeight2 = 1.88;
const bmiMark2 = markMass2 / (markHeight2 ** 2);
console.log(bmiMark2)


let johnMass1 = 92, johnHeight1 = 1.95;
const bmiJohn1 = johnMass1 / (johnHeight1 ** 2);
console.log(bmiJohn1)

let johnMass2 = 85, johnHeight2 = 1.76;
const bmiJohn2 = johnMass2 / (johnHeight2 ** 2);
console.log(bmiJohn2)


let markHigherBMI1st = bmiMark1 > bmiJohn1;
let markHigherBMI2nd = bmiMark2 > bmiJohn2;
console.log(markHigherBMI1st)
console.log(markHigherBMI2nd)

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/* 

LECTURE: STRINGS AND TEMPLATE LITERALS.

Template literals is an new feature of javascript that simplifies the construction of strings. 

*/

const firstName = 'Francisco';
const job = 'teacher';
const birthYear = 1988;
const year = 2023;

const francisco = "I'm " + firstName + ', a ' + (year - birthYear) + ' year old ' + job + '!';
console.log(francisco);
/* This is the most common way to create a string, however is somehow prone to errors or to the necessity off adding spaces. */

const franciscoNew = `I'm ${firstName}, a ${year - birthYear} year old ${job}!`;
console.log(franciscoNew);
/* With the template literals technique we just need to add a ` in the beginning and ${variableName};
The output is the same.*/

console.log('String with \n\
multiple \n\
lines');
/* Multiline string before Template Literals. */


console.log(`String with
multiple
lines`);
/* Multiline string with new feature. This will become handy to build html from javascript. */

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/* 

LECTURE: TAKING DECISIONS - IF/ELSE STATEMENTS.
The if/else statements are also defined as control structure because it allows us to have more control over the code (blocks that are executed and blocks that don´t get executed.) */

const age = 17;
if(age >= 18) {
    console.log("Sarah can start driving license")
} else {
    const yearsLeft = 18 - age;
    console.log("Sarah is too young, wait another " + yearsLeft + " years to drive");
    console.log(`Sarah is too young, wait another ${yearsLeft} years to drive`); /* Template literals */
}
/* console.log(yearsLeft) >>>>>> This creates an error because yearsLeft is only defined inside the if/else statement, there is an example ahead. */

/* CHALLENGE 2 (using the code from challenge 1) */

if (bmiMark1 >= bmiJohn1) {
    console.log(`Mark´s BMI (${bmiMark1}) is higher than John´s (${bmiJohn1}`)
} else {
    console.log(`John´s BMI (${bmiJohn1}) is higher than Mark´s (${bmiMark1})`)
}

if (bmiMark2 >= bmiJohn2) {
    console.log(`Mark´s BMI (${bmiMark2}) is higher than John´s (${bmiJohn2}`)
} else {
    console.log(`John´s BMI (${bmiJohn2}) is higher than Mark´s (${bmiMark2}`)
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

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/*

LECTURE: TYPE CONVERSION AND COERCION.
conversion: 
coercion: 
*/
