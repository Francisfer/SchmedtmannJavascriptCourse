"use strict";

const flights =
  "_Delayed_Departure;fao93766109;txl2133758440;11:25+_Arrival;bru0943384722;fao93766109;11:45+_Delayed_Arrival;hel7439299980;fao93766109;12:05+_Departure;fao93766109;lis2323639855;12:30";

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
  order(startIndex, mainIndex) {
    return [this.starterMenu[startIndex], this.mainMenu[mainIndex]];
  },
  delivery({ startIndex, mainIndex, address, user }) {
    console.log(
      ` Dear ${user}, your order ${this.starterMenu[startIndex]} and ${this.mainMenu[mainIndex]} will be delivered at ${address} `
    );
  },
  personalizedPasta(ing1, ing2, ing3) {
    console.log(`Your pasta with ${ing1}, ${ing2} and ${ing3}`);
  },
  orderpizza(main, ...rest) {
    console.log(main);
    console.log(rest);
  },
};

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

    WORKING WITH STRINGS - PART 1

    We are going to be looking to a couple of useful string methods. We are going to leave the restaurant theme behind and work with airplanes now.

*/

const airline = "TAP Air Portugal";
const plane = "A320";

// Just like in arrays, we can get the character of a string at a certain position.

console.log(plane[0]);
console.log(plane[1]); // Returns a string
console.log(Number(plane[2])); // If we want the number.

// We can do the same directly on a string:

console.log("B737"[0]);

// We can read the length property of a string, just like in arrays:

console.log(airline.length);

// And directly on the string:

console.log("B737".length);

// Let's now talk about METHODS. So, comparing strings with arrays, some of the methods are quite similar to the array methods.

console.log(airline.indexOf("r")); // Notice that strings are zero based, indexOf() just gives the first occurrence, but we might need the last one:
console.log(airline.lastIndexOf("r"));

// We can also search for entire words:

console.log(airline.indexOf("Portugal")); // Case sensitive, no correspondence returns (-1). The word is at position 8.

// What can we do with these indexes? Why are they useful?

// One good case is to extract part of the string using the slice method. This method needs indexes as arguments, so it becomes handy to first figure out the index of part of a string to then extract that:

console.log(airline.slice(4, 7)); // The result is called a sub string (its impossible to mutate strings - primitives), so if we wanted to use this substring we would have to store it in a variable or in a data structure. First argument to start slicing (inclusively) and second to stop (exclusively - stops extracting before it reaches index seven)

// In the previous examples we hardcoded the indexes, but imagine that we don't know the string that we are dealing with (don't know the indexes). This is where the indexOf() and lastIndexOF() become really important.

// Let's extract the first word of the airline string:

console.log(airline.slice(0, airline.indexOf(" "))); // First word goes from 0 index to the first space,

// Last word:

console.log(airline.slice(airline.lastIndexOf(" "), airline.length)); // If we don't specify the second parameter the result is the same. Notice how the space is included in the log, to solve this:

console.log(airline.slice(airline.lastIndexOf(" ") + 1, airline.length));

// These are the fundamentals of the slice method, but we can go further. We can define a negative begin argument

console.log(airline.slice(-1)); // Starts extracting from the end
console.log(airline.slice(1, -1)); // We can also specify a negative end parameter.

// Practice. Let's write a function that receives an airplane seat and logs to the console whether it is a middle seat or not. We only want to know if the string contains a B or an E.

const checkMiddleSeat = function (seat) {
  // B and E are middle seats
  let letter = seat.slice(-1);

  if (letter === "B" || letter === "E") console.log("Middle seat");
  // REMEMBER to be specific when establishing the condition if (letter === "B" || letter === "E").
  else console.log("Not a Middle seat");
};
// checkMiddleSeat("11B");
// checkMiddleSeat("11C");
// checkMiddleSeat("11E");
// checkMiddleSeat("11D");
// checkMiddleSeat("11E");

// Before we move on, let's understand why this actually works. We know that strings are just primitives, so why do they have methods? Shouldn't methods only be available on objects such as arrays? That is true, however, in javascript, whenever we call a method on a string, that string primitive is converted to a string object with the same content. Then, it's on that object that the method is called. This process is called boxing because it takes our string and puts it into a box which is the object.

// Basically this is what happens:

console.log(new String("Francisco")); // Javascript calls this string function whenever we call a method on a string, in the log we can see that it looks like an object.

console.log(typeof new String("Francisco"));

// Then, when the operation is done (the method is called, slice()), the object is converted back to a regular string primitive. In fact all string methods return primitives, even if called on a string object:

console.log(typeof new String("Francisco").slice(1)); // Back being a string.

////////////////////////////////////////////////////////////////////////////

// Let's continue with simple string methods.

// The first two are going to be for changing the case of a string:
console.log(airline.toUpperCase());
console.log(airline.toLowerCase());

// We can also use the method directly on a string:

console.log("FRANCISCO".toLowerCase());

// Use case on a practical example (fix capitalization in a passenger name):

const passenger = "FrAnciSCO"; // It should be Francisco

const passengerLower = passenger.toLowerCase(); // The first step is usually to put everything in lowercase.

const passengerCorrect =
  passengerLower[0].toUpperCase() + passengerLower.slice(1); // Then, we just need to select the first character of passengerLower and add the rest of the string by slicing after position 1 (inclusively).
console.log(passengerCorrect);

// CHALLENGE - Create a function that returns the name with the fixed capitalization

const passengerFixed = function (name) {
  let nameFixed = name.toLowerCase();
  nameFixed = nameFixed[0].toUpperCase() + nameFixed.slice(1);
  console.log(nameFixed);
};
passengerFixed("AntONINho");

// Another practical example is to check (more like comparing) a user input email:

const email = "hello@francisco.io"; // We have the email of one passenger
const loginEmail = "  Hello@Francisco.Io  \n"; // The user logs in with errors like spaces, incorrect capitalization and even an enter character (new line).

// Still, this email is correct or valid, and we can compare if these two are kind of the same by converting them. Notice that the emails are the same, there are not more or less letters etc.

const lowerEmail = loginEmail.toLowerCase(); // Again, the first step is to convert to lower case.

const trimmedEmail = lowerEmail.trim(); // Now all that is left is to correct the empty spaces, and we have the trim() method for that.
console.log(trimmedEmail);

// We can do all in one go without having to use different variables, and this is similar to the set() method:

const normalizedEmail = loginEmail.toLowerCase().trim();
console.log(normalizedEmail);

// CHALLENGE - Function that compares two emails

const checkEmail = function (emailUser, emailLogin) {
  return emailUser === emailLogin;
};

console.log(checkEmail(email, normalizedEmail));

// Now let's learn one of the most important thing about strings, which is to replace parts of strings.

const priceGB = "288,97£"; // In Europe, the (,) is used as the decimal separator. So, what we want to do now is to compute the string to US (replace the pound with the dollar sign and the comma with the dot).

const priceUS = priceGB.replace("£", "$").replace(",", "."); // We use the replace method which has two arguments, the first is for what we want to replace and the second is for the one will replace the first one. Notice the chaining to save the creation of a new variable.

console.log(priceUS);

// We can replace entire words and not just symbols, let's say that we want to change a common anouncement that we hear on airpoorts.

const announcement =
  "All passengers come to boarding door 23. Boarding door 23"; // Usually is gate instead of door, so let's change it.
const newAnnouncement = announcement.replaceAll("door", "gate");
console.log(newAnnouncement);

/*
    When the author created this course, the replaceAll() method wasn't available yet, so he gave another approach to solve the problem of the replace() method (only replaces the first occurrence).
    
    The solution involves the creation of a regular expression. We will talk about them in further lessons, for now we will just create a simple one to tell the replace method that it should target all the occurrences. 

const announcement1 = announcement.replace(/door/g, "gate"); // To use a regular expression, we need to write the string between slashes instead of quotes. Then we just need to add this (g) flag that stands for global.
console.log(announcement1);

*/

// There are three simple methods that return booleans (includes; startsWith; endsWith)

const plane2 = "A320neo";
console.log(plane2.includes("3"));
console.log(plane2.includes("320"));
console.log(plane2.startsWith("a"));
console.log(plane2.startsWith("A32"));
console.log(plane2.endsWith("O"));

// Let's say that we want to check if this airplane belongs to the Airbus family:
if (plane2.includes("neo")) console.log("Part of Airbus");

// Whenever we need to take a decision based on the content of a string these three methods are very helpful.

// PRACTICE: We want to check if the baggage of a certain is allowed to check-in. Notice that some passengers like to write with some uppercase letters, this is important to once again show that whenever we receive input from a user we usually always start bt converting everything into lowercase. because then its easier to compare it with something.

const checkBaggage = function (items) {
  const baggage = items.toLowerCase();
  if (baggage.includes("knife") || baggage.includes("gun")) {
    console.log("You are NOT allowed on board!");
  } else console.log("Welcome aboard");
};

checkBaggage("I have a laptop, some Food and a pocket Knife"); // If we didn't convert to lower case this passenger would be allowed on the plane.
checkBaggage("Socks and camera");
checkBaggage("Got some snacks and a gun for protection");

////////////////////////////////////////////////////////////////////////////

// One of the most powerful string methods is .split(). This method allows us to split a string into multiple parts based on a divider string:

console.log("a+very+nice+string".split("+")); // For some reason, let's say that we have a string like this. The divider string, in this case is the (+). The method will split the string on the divider occurrences and then store the results into elements of a new array.

// If we want an array with the elements of a name, we split the string by the space:
console.log("Francisco Ferreira".split(" "));

// With this functionality, we can use the power of destructuring to create variables directly:

// const [firstName, lastName] = "Francisco Ferreira".split(" ");
// console.log(firstName, lastName);

// We could have done the same thing with the .slice() method, but it would be a lot more complicated, and almost impossible for longer sentences.

const [firstName, lastName] = "Francisco Ferreira".split(" ");

// Now we want to make the lastName uppercase and also add a mr. in the beginning:
console.log(`Mr. ${firstName} ${lastName.toUpperCase()}`); // We could do a simple template literal like this, however there is a method called .join(), which is the opposite of split().

const newName = ["Mr.", firstName, lastName.toUpperCase()].join(" ");

console.log(newName);

// We can use this to do what we've already done in previous lessons, which is to capitalize the first letter of name, however, now its much easier to do with multiple names.

// Using a function:

const passenger2 = "Albino sousa de magalhães";

const capitalizedName = function (name) {
  const names = name.split(" ");
  const namesUpper = [];

  for (const n of names) {
    // namesUpper.push(n[0].toUpperCase() + n.slice(1)); // .push() because we need an array to later join outside the loop.

    // Another way to do this is to simply replace the first letter of n for the first letter of n capitalized:
    namesUpper.push(n.replace(n[0], n[0].toUpperCase())); // n is the word, so we don't specify the index there.
  }
  console.log(namesUpper.join(" "));
};

capitalizedName(passenger2);

// Let's now talk about padding a string. Padding a string means to add a number of characters to the string until it has a certain desired length.

const message = "Go to gate 23!";
console.log(message.padStart(25, "+")); // Adds characters to the beginning of the string, the first argument is the desired length (25 characters long) and the second is the the character that we want to pad the string with.

console.log(message.padEnd(25, "+"));

console.log(message.padStart(25, "+").padEnd(30, "+")); // Chaining the methods, notice that the pad start adds 25 characters to the string go, so the pad end will only had 5 (+) signs to the end of the string.

// Use case of padding. When you see a credit card number on the internet you never see the entire number, you see the last four digits and the rest is masked with some kind of symbol. Let's implement a function that does that masking:

const maskCreditCard = function (number) {
  const toString = String(number); // Using type conversion: toString = number + "";
  const lastFour = toString.slice(-4);
  return lastFour.padStart(toString.length, "@");
};
console.log(maskCreditCard("12345678"));
console.log(maskCreditCard(123456789101112));
console.log(maskCreditCard("123456789101112"));

// The .repeat() method. This one allows us to repeat the same string multiple times. Let's say there is bad wheather at one airport, usually, they have a long message on the screen that keeps repeating.

const message2 = "Bad weather... All departures delayed... ";

// Now we want a bigger string repeating this one multiple times.
console.log(message2.repeat(5));

// Now let's simulate that due to the bad wheather, there are many planes waiting to take off.

const planesInLine = function (n) {
  console.log(`There are ${n} planes in line ${"🛩️".repeat(n)}`); // The emoji can count as a string if we use the "".
};

planesInLine(12);
planesInLine(5);
planesInLine(8);
planesInLine(9);

// Check more string methods on MDN, a good shortcut is to look for one on google and the rest just appears on the left side of the page. .concat() .reverse() are suggestions.

///////////////////////////////////////////////////////////////////////////

// Coding Challenge #4

/* 
Write a program that receives a list of variable names written in underscore_case and convert them to camelCase.
The input will come from a textarea inserted into the DOM (see code below), and conversion will happen when the button is pressed.
THIS TEST DATA (pasted to textarea)
underscore_case
 first_name
Some_Variable 
  calculate_AGE
delayed_departure
SHOULD PRODUCE THIS OUTPUT (5 separate console.log outputs)
underscoreCase      ✅
firstName           ✅✅
someVariable        ✅✅✅
calculateAge        ✅✅✅✅
delayedDeparture    ✅✅✅✅✅
HINT 1: Remember which character defines a new line in the textarea 😉
HINT 2: The solution only needs to work for a variable made out of 2 words, like a_b
HINT 3: Start without worrying about the ✅. Tackle that only after you have the variable name conversion working 😉
HINT 4: This challenge is difficult on purpose, so start watching the solution in case you're stuck. Then pause and continue!


*/

document.body.append(document.createElement("textarea"));
document.body.append(document.createElement("button"));

/*
document.querySelector("button").addEventListener("click", function () {
  const text = document
    .querySelector("textarea")
    .value.toLowerCase()
    .replaceAll(" ", "")
    .replaceAll("\n", " ");

  const strArr = text.split(" ");

  // MY FIRST SOLUTION
  for (const v of strArr) {
    const position = v.indexOf("_") + 1;
    const firstWord = v.substring(0, position - 1);
    const secondWord = v.substring(position);
    const secondWordArranged =
      secondWord[0].toUpperCase() + secondWord.slice(1);
    const final =
      (firstWord + secondWordArranged).padEnd(20, " ") +
      "✅".repeat(strArr.indexOf(v) + 1);
    console.log(final);
  }

  // MY SECOND SOLUTION - Problem = it replaces the first occurrence.

  // for (const v of strArr) {
  //   const position = v.indexOf("_") + 1;
  //   const final = v.replace(v[position], v[Number(position)].toUpperCase());
  //   console.log(final);
  // }
});

*/

//  SOLUTION FROM THE COURSE

/* 

    1 - The first thing is to add an event listener to the button.

    2 - Next, we take the value out of the text area. 

    3 - Next he splits the strings on the new line (const rows) with the objective of getting five different strings inside an array.

    4 - Now he loops over the array and, at each iteration, logs the variable name converted to camelCase.

      4.1 - The first idea is to split each word at the underscore (remember that each word is called row in the loop). However, we can use the chain to also put every letter in lower case and trim the spaces.

          row.toLowerCase().trim().split("_");

      4.2 - IMPORTANT - Always remember that the methods change the string (not the properties(index, length, etc.)) return a substring and, in order to use that substring we need to store it in a variable. 
      
          const value = row.toLowerCase().trim().split("_");
      
      The split method will return five arrays in the loop, each with the first and second word.
      
          (2) ['underscore', 'case']
          (2) ['first', 'name']
          (2) ['some', 'variable'] , etc
      
      So we can destructure at the same time we store the values to get the first and the second word.

    5 - Then we start building the output.



*/

document.querySelector("button").addEventListener("click", function () {
  const text = document.querySelector("textarea").value;
  const rows = text.split("\n");

  for (const row of rows) {
    // (const [i, row] of rows.entries) if we wanted to repeat the symbol in a different way.
    const [first, second] = row.toLowerCase().trim().split("_");
    const output = `${first}${second.replace(
      second[0],
      second[0].toUpperCase()
    )}`;
    console.log(output.padEnd(20, " ") + "✅".repeat(rows.indexOf(row) + 1));
    // console.log(`${output.padEnd(20)}${"✅".repeat(i + 1)}`);
  }
});

// To have in mind: the methods that change the string return substrings that we need to store in a variable. While storing, we can destructure to put each value in separate variables. This and the possibility of making a template literal were the fundamental difficulties that led me to a more complex solution.

///////////////////////////////////////////////////////////////////////////

/*

  Strings methods practice

const flights =
  "_Delayed_Departure;fao93766109;txl2133758440;11:25+_Arrival;bru0943384722;fao93766109;11:45+_Delayed_Arrival;hel7439299980;fao93766109;12:05+_Departure;fao93766109;lis2323639855;12:30";

*/

const flight = flights.split("+");

for (const v of flight) {
  const [status, from, to, time] = v
    .replaceAll("_", " ")
    .replaceAll("+", " ")
    .split(";");
  let message;
  status.includes("Delayed")
    ? (message = `🔴${status} from ${from.slice(0, 3).toUpperCase()} to ${to
        .slice(0, 3)
        .toUpperCase()} (${time.replace(":", "h")})`)
    : (message = `${status} from ${from.slice(0, 3).toUpperCase()} to ${to
        .slice(0, 3)
        .toUpperCase()} (${time.replace(":", "h")})`);
  console.log(message.padStart(44, " "));
}

/*
    The solution from the course is quite similar, being the differences:

    1 - He loops over the flights string while splitting it (the split gives us four strings in the loop).

    2 - Then he destructure to the same four variables (with different names) while splitting each value (string) at the (;).

    3 - Next he arranges the text directly on the template literals placeholders instead of arranging them all at once.

    4 - Notice that the condition is established differently with the .startsWith() method in the beginning of tbe string using another placeholder (it returns a boolean as the includes method). Because the condition is placed before we replace the (_), we need to include it in the condition.

    5 - The from and to are arranged with a function that is created outside the loop. The function takes the string as an input and then applies the changes that are specified. ${from.slice(0,3).toUpperCase()} ${to.slice(0,3).toUpperCase()}. The output would be the same.

    6 - The padding makes part of the string, so he edits it directly, instead of doing it on the output log. He leaves it at 36, but in my log the formatting appears differently, looking more similar with 44. Remember that the empty space is the default value of the pad method, so we don't need to specify the " ". Also, remember that the use of placeholders next to each other is very common while doing this kind of work (even to establish conditions).

*/

const arrangeStr = (str) => str.slice(0, 3).toUpperCase();

for (const flight of flights.split("+")) {
  const [type, from, to, time] = flight.split(";");
  const output = `${type.startsWith("_Delayed") ? "🔴" : ""}${type.replaceAll(
    "_",
    " "
  )} from ${arrangeStr(from)} to ${arrangeStr(to)} (${time.replace(
    ":",
    "h"
  )})`.padStart(36);
  console.log(output);
}
