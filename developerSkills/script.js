"use strict";

// In the preferences menu of vscode we can define snippets to shortcut the code. cl = console log.

// Debugging using the console.

/*
const measureKelvin = function () {
  const measurement = {
    type: "temp",
    unit: "celsius",
    value: Number(prompt("Degrees celsius")),
  };
  console.table(measurement);
  const kelvin = measurement.value + 273;
  return kelvin;
};

console.log(measureKelvin());


*/

// The first step while debugging is to identify the bug. In the example above, the function returns a string that results from the concatenation of whatever you put in the prompt + 273.

// We can see this if we log either the hole object or just the type of the value property. Remember that, to analyze the object, we need to call the logs inside of the function.

// For bigger objects the console.table(measurement) is much more useful.

// Since we want a number to which we had 273, we need to use the Number function with the prompt (remember that the prompt function always return a string). Number(prompt()).

// This is a simple example on how we can use the console to hunt a bug, however, with more complex situations we might find the google chrome debugger more helpful:

// In the developer tools, access sources and select the script. We can place break points by clicking in the line of code where we want the code to freeze. This is handy because we don't need to use a lot of console.log's to solve problems like this. With this method we can easily see that the value property of the measurement object is a string, so a string added to a number also returns a string.

// The step button allows us to control the flow of the code. To better understand, let's work with a bigger bug using the calcAmplitudeBug function.

/*
const calcAmplitudeBug = function (t1, t2) {
  const temps = t1.concat(t2);
  console.log(temps);
  // creates a constant that concatenates two arrays

  let max = temps[0];
  let min = temps[0];
  // creates two variables that define the max and min temperatures at position zero, so we can loop to find the actual values that we need.

  for (let i = 0; i < temps.length; i++) {
    const currTemp = temps[i];
    // creates a variable that holds the current position of i, so we don't need to repeat ourselves in the loop conditions.
    if (typeof currTemp !== "number") continue;
    if (currTemp > max) max = currTemp;
    if (currTemp < min) min = currTemp;
    // the conditions so that both the highest and lowest value in the array are stored in the max and min variables.
  }
  console.log(max, min);
  return max - min;
  // to return the amplitude value
};

const amplitudeBug = calcAmplitudeBug(
  [2, 34, 52, 76, 45, 68],
  [5, 56, 85, 14, 99, 78]
);

console.log(amplitudeBug);

*/

// Let´s introduce a bug to this function. In previous exercises, we created variables called sum and set it equal to zero so we could sum all the numbers in the array through a loop. Let´s say that we've followed the same line of thought in this function and, instead of assigning the variables max and min to the zero position, we actually set it to zero.

const calcAmplitudeBug = function (t1, t2) {
  const temps = t1.concat(t2);
  console.log(temps);

  let max = 0; // Right here!
  let min = 0; // Right here!

  for (let i = 0; i < temps.length; i++) {
    const currTemp = temps[i];

    if (typeof currTemp !== "number") continue;
    if (currTemp > max) max = currTemp;
    if (currTemp < min) min = currTemp;
  }
  console.log(max, min);
  return max - min;
};

const amplitudeBug = calcAmplitudeBug(
  [2, 34, 52, 76, 45, 68],
  [5, 56, 85, 14, 99, 78]
);

console.log(amplitudeBug);

// As we can see, although the max temperature is correct, the minimum value is not. This would only work if we had negative temperatures in the arrays or if the minimum temperature was zero. Since the readings don't have one or another, this app would have a bug, simply because we have defined a value to the variable and not a position to start the loop. If the minimum value in the arrays is two, zero is the lower value to compute.

// The debugger is specially useful in loops because we can see the iterations step by step. If we place the breakpoint on line 83 (where the max and min are being computed) we can analyze the iterations step by step.

// Coding Challenge #1

/*
Given an array of forecasted maximum temperatures, the thermometer displays a string with these temperatures.

Example: [17, 21, 23] will print "... 17ºC in 1 days ... 21ºC in 2 days ... 23ºC in 3 days ..."

Create a function 'printForecast' which takes in an array 'arr' and logs a string like the above to the console.

Use the problem-solving framework: Understand the problem and break it up into sub-problems!

TEST DATA 1: [17, 21, 23]
TEST DATA 2: [12, 5, -5, 0, 4]
*/

const data1 = [17, 21, 23];
const data2 = [12, 5, -5, 0, 4];
const data3 = [5, 56, 85, 14, 99, 78];

const printForecast = function (arr) {
  let print = "";
  for (let i = 0; i < arr.length; i++) {
    print += `${arr[i]}ºC in ${i + 1} days ... `;
  }
  console.log("... " + print);
};

printForecast(data2);
