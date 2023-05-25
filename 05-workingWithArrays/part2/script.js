"use strict";

// BANKIST APP

// Data

// We start with on object for each account. In a real situation, we would want much more information about the movements, like the date and a small description, however, we really just want to work with arrays.

// At this point we could ask why an object instead of a map. This is because we need to simulate that this data came from some kind of API and, usually, it comes in the form of objects.

const account1 = {
  owner: "Jonas Schmedtmann",
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: "Jessica Davis",
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: "Steven Thomas Williams",
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: "Sarah Smith",
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

// Finally we have an array with all of the account objects in there. Remember that this is one of the most common ways of organizing data in javascript applications.

const accounts = [account1, account2, account3, account4];

// Elements - As you can see, all of the elements that we need are already selected so we don't need to write these cells.

const labelWelcome = document.querySelector(".welcome");
const labelDate = document.querySelector(".date");
const labelBalance = document.querySelector(".balance__value");
const labelSumIn = document.querySelector(".summary__value--in");
const labelSumOut = document.querySelector(".summary__value--out");
const labelSumInterest = document.querySelector(".summary__value--interest");
const labelTimer = document.querySelector(".timer");

const containerApp = document.querySelector(".app");
const containerMovements = document.querySelector(".movements");

const btnLogin = document.querySelector(".login__btn");
const btnTransfer = document.querySelector(".form__btn--transfer");
const btnLoan = document.querySelector(".form__btn--loan");
const btnClose = document.querySelector(".form__btn--close");
const btnSort = document.querySelector(".btn--sort");

const inputLoginUsername = document.querySelector(".login__input--user");
const inputLoginPin = document.querySelector(".login__input--pin");
const inputTransferTo = document.querySelector(".form__input--to");
const inputTransferAmount = document.querySelector(".form__input--amount");
const inputLoanAmount = document.querySelector(".form__input--loan-amount");
const inputCloseUsername = document.querySelector(".form__input--user");
const inputClosePin = document.querySelector(".form__input--pin");

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

const currencies = new Map([
  ["USD", "United States dollar"],
  ["EUR", "Euro"],
  ["GBP", "Pound sterling"],
]);

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// In this lesson, it's time to take a look at the application that we're gonna build in this section.

// Start by exploring the final version of the app at https://bankist.netlify.app/

// Then take a look to the flow chart, just like before (pig game), the chart was built based on the flow of actions that we saw on the live version. This was made with the intention of learning all about arrays.

/*

Now let's go back to DOM manipulation. We are going to learn a couple of manipulation techniques and use the together with the forEach() method that we just learned about.

Take a look to the html and css files and keep them opened until throughout this project.

*/

// 1 - In the html file, we have the navigation bar (all of the top part before log in) and the main element, that's basically the entire application which is now invisible. That's because in the css (line 87) we have the app selector with the opacity set to 0, comment it out and then we can see the application. Logically, logging in and out is essentially changing the opacity (from 0 to 100). Right now, we want to display the movements in the application container, so, for each movement, we want one element like the ones that are already displayed.

// 1 - We will use the forEach() method to do this, basically looping through the array and, in each iteration, create an element and display it on the page. We could do this on the global context, however that is not good practice, whenever we do something like this, its better to create a function. Then, we make this function receive the data with which it should actually work, in this case, the movements (We call it movements because this function should receive one array of movements and then work with that data). Instead of working with global variables, start passing the data that the function needs into that function. Don't forget, start by calling the function to see exactly what you are doing.

// 2 - After that we use the forEach method to loop over the array. We need the current movement and also the index because, if you see the ones that are already on the app, they are ordered by index(1 deposit, 2 withdrawal).

// 3 - Now we need to essentially create an html element at each iteration. Take a look at the html file, we have a movements div, which is the container for all the movements, and, inside, another div with the class of movements_row. So, each row is a movement, and that's exactly what we need to copy. We are not going to work on the date right now, so we delete it. After, we create a variable called html and past the code in a template literal. Template literals are perfect for creating html elements templates because it easy to create a multi line string and then replace the hardcoded data with our actual movements data.

// The movements and the index are used only once, but the ternary operator to decide if it is a deposit or a withdrawal is going to be used twice (one time on the template string and another on the class name so that different configuration or colors can be applied), so we store it into a variable and change in both places.

// 4 - Now that we have created our html template, all we need to do is to find a way to actually add this html on to the webpage. Basically we need to attach this html into the movements container/element. For this we will use a method called insertAdjacentHTML() (still inside of the forEach() code of course). We will call this method on the movements element in which we want to add a new movements row element. We are looking for an element with the class of movements, and its already called containerMovements cell. The insertAdjacentHTML() method accepts two strings, the first is the position in which we want to attach the html (afterbegin - right after the beginning of the element) and the string that contains the html - CHECK MDN. With beforeend the order would be inverted, because each new element would be added before the end of the container (so after the previous one).

// 5 - As you can see, we still have the two hardcoded ones that we had in the beginning. That's because we are actually adding elements to the container, we are not overwriting anything. Actually, that has to be the first thing that we need to do, to actually empty the container and only then start adding new elements. We do this by using the innerHTML (similar to textContent, the difference is that textContent simply returns the text itself and innerHTML returns everything, including the html with the tags - CHECK MDN) and set it to an empty string (outside of the loop of course).

/* 1 */ const displayMovements = function (movements, sort = false) {
  /* 5 */ containerMovements.innerHTML = "";

  const movs = sort ? movements.slice().sort((a, b) => a - b) : movements;

  /* 2 */ movs.forEach(function (currentMovement, i) {
    const type = currentMovement > 0 ? "deposit" : "withdrawal";
    /* 3 */ const html = `
    <div class="movements__row">
      <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type}</div>
      <div class="movements__value">${currentMovement}€</div>
  </div>
    `;
    /* 4 */ containerMovements.insertAdjacentHTML("afterbegin", html);
  });
};

// displayMovements(account1.movements);

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Coding Challenge #1

/* 
Julia and Kate are doing a study on dogs. So each of them asked 5 dog owners about their dog's age, and stored the data into an array (one array for each). For now, they are just interested in knowing whether a dog is an adult or a puppy. A dog is an adult if it is at least 3 years old, and it's a puppy if it's less than 3 years old.

Create a function 'checkDogs', which accepts 2 arrays of dog's ages ('dogsJulia' and 'dogsKate'), and does the following things:

1. Julia found out that the owners of the FIRST and the LAST TWO dogs actually have cats, not dogs! So create a shallow copy of Julia's array, and remove the cat ages from that copied array (because it's a bad practice to mutate function parameters)
2. Create an array with both Julia's (corrected) and Kate's data
3. For each remaining dog, log to the console whether it's an adult ("Dog number 1 is an adult, and is 5 years old") or a puppy ("Dog number 2 is still a puppy 🐶")
4. Run the function for both test datasets

HINT: Use tools from all lectures in this section so far 😉

TEST DATA 1: Julia's data [3, 5, 2, 12, 7], Kate's data [4, 1, 15, 8, 3]
TEST DATA 2: Julia's data [9, 16, 6, 8, 3], Kate's data [10, 5, 6, 1, 4]

GOOD LUCK 😀
*/

const checkDogs = function (dogsJulia, dogsKate) {
  const dogsJuliaArranged = dogsJulia.slice(1, -2);
  const dogs = dogsJuliaArranged.concat(dogsKate);
  // const dogs = [...dogsJuliaArranged, ...dogsKate];
  dogs.forEach(function (age, i) {
    // if (age >= 3)
    //   console.log(`Dog number ${i + 1} is an adult, and is ${age} years old.`);
    // else if (age < 3) console.log(`Dog number ${i + 1} is still a puppy 🐶`);

    age >= 3
      ? console.log(`Dog number ${i + 1} is an adult, and is ${age} years old.`)
      : console.log(`Dog number ${i + 1} is still a puppy 🐶`);
  });
};

// checkDogs([3, 5, 2, 12, 7], [4, 1, 15, 8, 3]);

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/*

  Data transformations: MAP, FILTER, REDUCE.

    In javascript, there are three big and important array methods that we use all the time to perform data transformations.

    Basically, these are methods that we use to create NEW arrays based on transforming data from other arrays.

    In recent years, this tools have become really popular and for good reasons.

    The tools that we are talking about are map, filter and reduce (go check the support pdf).

      MAP - This is another method that we can use to loop over arrays. This method is actually similar to the forEach method that we've studied before, with the difference that map creates a brand new array based on the original array. Essentially, the map method takes an array, loops over the array and, in each iteration, it applies a callback function that we specify in our code to the current element (current * 2 - each element should be multiplied by 2). We say that it maps the values of the original array to a new array, that's why this method is called map. This is extremely useful, usually more useful than the forEach method because this last one simply allows us to do some work with each array element. Map, on the other hand, builds us a brand new array containing the results of applying an operation on all array elements.

      FILTER - Is used to filter for elements in the original array which satisfy a certain condition (current > 2). All the other elements will be filtered out and not included in the new array.

      REDUCE - We use reduce to boil down (reduce) all the elements of the original array into one single value. One example can be to add all the elements of an array together, but we can do many other interesting things. Following the example of adding all the elements to one single value, we have to specify an operation (acc + current) where acc is an accumulator variable. Then, as the reduce method loops over the array, it keeps adding the current element onto the accumulator until, at the end of the loop, we have the total sum of all the elements. We also say that this whole process has now reduced the original array to one single value. It is this value that is returned from the reduce method in the end (there is no new array in this case, only the reduced value).

      Let's now put this to practice
*/

// MAP METHOD

// Let's bring back the movements array and, this time, we will try to convert the elements into us dollars (suppose they are in euros and that 1 euro is worth 1.1 dollars).

// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

// We start by storing the conversion rate into a variable.

const eurToUsd = 1.1;

// Now what we want to do is to multiply each element of the movements array by the eurToUsd (conversion rate). Just like in the forEach method, the callback function also accepts the value, index and map arguments.

/*
movements.map(function (value, i) {
  const converted = Math.trunc(value * eurToUsd);
  console.log(converted); 
});

REMEMBER - If the method returns a new array we store it in a variable so we don't have to cl all the time to see the results. At this point you should be able to know that the procedure in the course always have educational purposes, but its always good to implement real life techniques as we go along.

*/

const movementsUSD = movements.map(function (mov) {
  return mov * eurToUsd;
});

// const movementsUSD = movements.map((mov) => mov * eurToUsd);

console.log(movements); // Not mutated.
console.log(movementsUSD);

// Just to see the difference, let's recreate the functionality with a for of loop.

let movementsUsd = [];

for (const mov of movements) {
  movementsUsd.push(mov * eurToUsd);
}

console.log(movementsUsd);

// Both techniques result in the same output, but the philosophy/paradigm is completely different. With the map method, we use a function to solve the problem of creating a new array, with the for of loop we simply loop over the array and manually create a new one. The map method is more in line with functional programming while the for of loop is more related with OOP. The modern way of javascript is becoming more in line with functional programming.

// Finally, we can simplify a lot the callback function in our code. We can use an arrow function if there is only a line of code remember? Also remember the mnemonic - in arrow functions, the function keyword AND the return keyword are replaced by the arrow.

//  movements.map((mov) => mov * eurToUsd);
// console.log(movementsUSDArrow);

// However, many developers argue that the lack of the function keyword and the return keyword leads to bad readability, making the code harder to understand. It may be a question of team preference, however knowledge don't take space.

// Let's now explore the map method a little more. Just like the forEach method, the map method also has access to the exact same three parameters. Besides the current array element, we also have access to the index as the whole array. Let's now use the map method to loop again over the movements array, but this time we're gonna create a string similar to the ones that we printed using the forEach method.

// const movementsDescriptions = movements.map(function (mov, i, arr) {
//   if (mov > 0) {
//     return `Movement ${i + 1} - Deposit of ${mov} euros`;
//   } else if (mov < 0) {
//     return `Movement ${i + 1} - Withdrawal of ${Math.abs(mov)} euros`;
//   }
// });

// This time we will not log the string to the console. Instead, we want to return the string, so that it then gets put into the new array that results from the map method. For that we use the return keyword, notice that we can use it more than once if we specify a condition. It's perfectly acceptable to have more than one return in a function code, as long as only ONE of them gets executed (always remember the obvious things can sometimes lead to big confusions, in the learning phase it's best to keep this in mind).

// We can clean the code a bit more because the only thing that changes between both strings is the deposit/withdrawal word, so:

const movementsDescriptions = movements.map(function (mov, i, arr) {
  return `Movement ${
    i + 1
  } - ${mov > 0 ? "Deposit" : "Withdrawal"} of ${mov} euros`;
});

console.log(movementsDescriptions);

// So, one more time, it is a good idea to keep in mind why we actually get access to three parameters in the callback function. All we do is to pass the callback function into the map method, but we do not call this function by ourselves. It is the map method who calls this function for each of the array elements in the movements array.

// Each time that the map method calls the callback function, it will simply pass in the current array element, the current index and the whole array. Of these we are only using the first two, but they stay on the code so you can remember.

// We could say that what we did with the forEach method is exactly the same as with map. However, there is a big difference between this approaches. With forEach, we printed each line individually as we were looping over the array, so in each of the iterations we performed some action that was then visible in the console (side effects).

// With map, all we did was to return each of the strings from the callback, they got added to the new array basically, and finally we logged the entire array to the console, and not the elements one by one. We can say that with the map method, we did not create a side effect in each of the iterations. All we did was to build a new array. The idea of side effects will become important again as we talk more about functional programming.

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/*

  Computing usernames.
  
    Let's now use the map and the forEach method to compute user names for each account. 

    The username is simply the initials of each of the users.

*/

// Let's start with one of them (one string), so it can be easier, and then we will generalize that function for the entire accounts array that we have in the code. For now let's start with Steven.

const user = "Steven Thomas Williams"; // Username should be stw
// const username = user
//   .toLowerCase()
//   .split(" ")
//   .map(function (name) {
//     return name[0];
//   })
//   .join("");
// console.log(username);

// As you start to see, there is magic both in the method chaining and the map method because we can arrange the string in one go. Notice that the order is important, the only reason that we can use the map method is because the split method returns an array. The same way, we can only call the split method because tolowercase returns a string. We could also use an arrow function on this one >>> .map(name => name[0]). The callback function in the map method always needs to return the new value, in the case of arrow functions we don't need to use the keyword, but the returning actually happens.

// Let's now take this into a generic function for all users:

// const createUserName = function (user) {
//   const username = user
//     .toLowerCase()
//     .split(" ")
//     .map(function (name) {
//       return name[0];
//     })
//     .join("");
//   return username; // Necessary
// };

// createUserName(user); // Off course to see the result we would have to log it.
// console.log(createUserName(user));

// Now we actually want to compute one username for each of the account holders. Should we use the map or the forEach method? Well, we don't want to create a new array in this situation, all we want to do is to modify the objects (account1, 2, etc.), so, the elements that already exist in the accounts array. What we want is to simply loop over the array accounts and do something, for that we use the forEach method.

// Let's modify the function so it receives an array of accounts. This goes back to the philosophy that each function should actually receive the data that it should work with, instead of using a global variable. That's exactly what we did with the movements (displayMovements function), which we could have read directly from the global variable (of account1.movements for example), but instead we created a function that receives that data and can work with that data or with any other data that we choose to pass into it.

// Here we are doing the same, we do not want to rely on the accounts array that we already have, but instead we want to pass it into the function.

const createUserName = function (accts) {
  accts.forEach(function (acc) {
    acc.username = acc.owner // Creating a new property on the accounts objects, named acc in the function.
      .toLowerCase()
      .split(" ")
      .map(function (name) {
        return name[0];
      })
      .join("");
  });
};

createUserName(accounts);
console.log(accounts);

// In this function we don't return anything because, again, what we are doing here is to produce a side effect (create a new property on the objects), there is no need to return anything because we are not creating a new value to return.

// Things to get from this lesson: the use case of the map method to create a new array with just the initials and the use of forEach method to produce some side effects (do some work without returning anything).

// THE FILTER METHOD

// As we already saw, the filter method is used to filter for elements that satisfy a certain condition. But how do we specify such condition? Using a callback function again. Let's again work with the movements array.

// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

// Notice that we also get access to the current array element, the index and the entire array. For now let's just work with the current element (usually with filter thats all that we need).

// What we actually want is to create an array with all of the deposits, and deposits are only the movements that are above 0. Passing that condition means that the condition is true right? So the trick is that we return a boolean value, so all we need to do is to return the current movement if it is greater than 0.

const deposits = movements.filter(function (mov) {
  return mov > 0;
});

console.log(deposits); // It's that simple, this proves that if you know how to use the callback function correctly and if you know how and why it works, all of these methods become really simple.

// Let's use the for of loop so you can appreciate the difference.
const depositsForOff = [];

for (const mov of movements) {
  if (mov > 0) depositsForOff.push(mov);
}
console.log(depositsForOff);

// Again you can ask, so why don't just use the for of loop for everything? Well, and also again, there is a push in javascript for using more functional code like using the methods. But there is a more practical implication here, and that's because we can simply chain all of these methods together to build a big final result (like we did with the string).

// Small challenge - create the withdrawals array.

const withdrawals = movements.filter(function (mov, i, arr) {
  return mov < 0;
});
console.log(withdrawals);

const withdrawalsArrow = movements.filter((mov) => mov < 0);
console.log(withdrawalsArrow);

// THE REDUCE METHOD

// Now its time to talk about the third data transformation method. We use the reduce method to boil down (reduce) all the elements in an array to one single value. We've talked about adding up all the numbers in one array, let's try that now with our movements array. By adding up all these numbers, both the deposits and the withdrawals, we end up with the global balance of the account basically.

// This method also gets a callback function, but this is a little bit different from the others (map or for each). So, in these other callbacks, the first parameter is always the current element of the array, the second is always the index and the third is the entire array. Here, the first parameter is actually something called the accumulator (acc) that keeps accumulating the value that ultimately we want to return.

// The first argument of the reduce method is the callback function, but there is actually another. The second parameter is the initial value of the accumulator in the first loop iteration, the value that we specify as 0 in this case (meaning that we want to start counting, or start adding at 0).

const balance = movements.reduce(function (acc, curr, i, arr) {
  // console.log(
  //   `Logging the accumulator so it can be clearer. Iteration ${i}: ${acc}`
  // );

  return acc + curr; // IT'S NOT +=. At each loop iteration, we return the updated acc plus the new current value. This is how we keep adding in the next iteration.
}, 0);

console.log(balance);

// With for of loop

let total = 0; // this variable acts like the accumulator. With for of loop we always need external variables in situations like this. This is fine if you only need one loop, but it starts to become really puzzling and unpractical when we use many loops for doing many operations.
for (const balance of movements) {
  total += balance;
}
console.log(total);

// These methods that have we've being studying completely avoid this extra variable and simply return the value right away.

// Simplified with an arrow function
const balanceArrow = movements.reduce((acc, curr) => (acc += curr), 0);
console.log(balanceArrow);

// Understanding how the reduce method works is something really important, but is a little more confusing than the others.

// Now that we can do this, we can go back to our application to calculate the balance of the account and print it. The best procedure when we are working on an app functionality is to inspect the element that we want to work on and see the class. We already have the cells, but even like this it can be harder to find than just inspect and keep going. IMPORTANT - label is everything where we simply want to put some text in (we can call it label in the cell, so it can be easier to distinguish).

const calcDisplayBalance = function (account) {
  account.balance = account.movements.reduce((acc, curr) => (acc += curr), 0);
  labelBalance.textContent = `${account.balance} €`;
};
// calcDisplayBalance(account1.movements);

// Just to finish this lecture about reduce, let's see other example aside adding values. Now we want to get the maximum value of the movements array. To do this we can also use reduce because, remember, reduce is for boiling down the array into just one single value, but that value can be whatever we want. It doesn't have to be a sum, it could be a multiplication or even something completely different (string or an object).

// The big question that we always have to ask is what should be the purpose of the acc value? We must do this each time we use reduce.

const checkMax = function (arr) {
  const max = arr.reduce(function (acc, current) {
    if (acc > current) {
      return acc;
    } else {
      return current;
    }
  }, arr[0]);
  return max;
};

// If we use a generic function we always have to store the return of the call back into a variable that we return after in the higher order function.

console.log(checkMax(movements));

const max = movements.reduce(function (acc, current) {
  if (acc > current) {
    return acc;
  } else {
    return current; // Here we are returning the movement as the NEW accumulator in the next iteration.
  }
}, movements[0]);
console.log(max);

// In the reduce method we always have to return the acc somehow to the next iteration, if you go step by step in the iterations you will notice that when the current is 450 and the acc is 200, we return the current value as the new acc to be compared in the next. There, if the acc is greater then the current, we return the same acc that we had before.

// We could have used 0 as the initial value of the acc, but that would not be correct because if the first value was negative, this would not work as expected (maybe it would work with the minimum, but definitely not with the maximum - in this cases always go with the first value of the array which is also the default value).

function minMax(items) {
  return items.reduce((acc, val) => {
    acc[0] = acc[0] === undefined || val < acc[0] ? val : acc[0];
    acc[1] = acc[1] === undefined || val > acc[1] ? val : acc[1];
    return acc;
  }, []); // Notice the empty array as the initial value.
}
console.log(minMax(movements)); // To find both min and max in one call.
// This answer has the advantage of working for arbitrary ordered types (e.g. strings), rather than just numerics, which is a nice generalization. One possible optimization would be to make the initialValue be [items[0], items[0]], so you can avoid special casing undefined, simplifying the min/max calculations on each call to if (val < acc[0]) acc[0] = val; and if (val > acc[1]) acc[1] = val;

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Coding Challenge #2

/* 
Let's go back to Julia and Kate's study about dogs. This time, they want to convert dog ages to human ages and calculate the average age of the dogs in their study.

Create a function 'calcAverageHumanAge', which accepts an arrays of dog's ages ('ages'), and does the following things in order:

1. Calculate the dog age in human years using the following formula: if the dog is <= 2 years old, humanAge = 2 * dogAge. If the dog is > 2 years old, humanAge = 16 + dogAge * 4.
2. Exclude all dogs that are less than 18 human years old (which is the same as keeping dogs that are at least 18 years old)
3. Calculate the average human age of all adult dogs (you should already know from other challenges how we calculate averages 😉)
4. Run the function for both test datasets

TEST DATA 1: [5, 2, 4, 1, 15, 8, 3]
TEST DATA 2: [16, 6, 10, 5, 6, 1, 4]

GOOD LUCK 😀
*/

// Tried to do everything in one go with chaining methods but it wasn't possible to do the average because i needed the length of the filtered array. Se if there was a different way to do this in one go >>> FIXED we could have done everything in one go if we used the arr argument in the callback function of the reduce method to calculate the length.

const calcAverageHumanAge = function (ages) {
  const adultDog = ages
    .map(function (current) {
      if (current <= 2) {
        return current * 2;
      } else {
        return 16 + current * 4; // Multiplication ( * ) and division ( / ) have higher precedence than addition ( + ) and subtraction ( - )
      }
    })
    .filter(function (current) {
      return current >= 18;
    });

  const avgHumanYears = adultDog.reduce(function (acc, current) {
    return acc + current;
  }, 0); // It couldn't be adultDog[0] because we want the sum, so starting the counter at 0. We don't want to compare the values of the array. IMPORTANT

  return avgHumanYears / adultDog.length;
};

console.log(calcAverageHumanAge([5, 2, 4, 1, 15, 8, 3]));
console.log(calcAverageHumanAge([16, 6, 10, 5, 6, 1, 4]));

// With some refactoring:

const calcAverageHumanAgeRef = function (ages) {
  const adultDog = ages
    .map((current) => (current <= 2 ? current * 2 : 16 + current * 4))
    .filter((current) => current >= 18);

  const avgHumanYears = adultDog.reduce((acc, current) => acc + current, 0);

  return avgHumanYears / adultDog.length;
};

console.log(calcAverageHumanAgeRef([5, 2, 4, 1, 15, 8, 3]));
console.log(calcAverageHumanAgeRef([16, 6, 10, 5, 6, 1, 4]));

// Solution from the course. It's basically the same but he didn't chain the methods together because that is going to be on the next lecture. Also, notice a good purpose of the availability of the entire array argument on the callback function (to calculate the avg directly) - 1.

const calcAverageHumanAgeJonas = function (ages) {
  const humanAges = ages.map((age) => (age <= 2 ? 2 * age : 16 + age * 4));
  const adults = humanAges.filter((age) => age >= 18);

  // const average = adults.reduce((acc, age) => acc + age, 0) / adults.length;

  const average = adults.reduce(
    (acc, age, i, arr) => acc + age / arr.length, // 1  IMPORTANT
    0
  );

  // 2 3. (2+3)/2 = 2.5 === 2/2+3/2 = 2.5

  return average;
};
const avg1 = calcAverageHumanAgeJonas([5, 2, 4, 1, 15, 8, 3]);
const avg2 = calcAverageHumanAgeJonas([16, 6, 10, 5, 6, 1, 4]);
console.log(avg1, avg2);

// RESEARCH MORE ABOUT THE REDUCE METHOD - Things to have in mind: not += and also the

// 1 - The role of the acc.
// 2 - The purpose of the second parameter (the initial value of the acc), zero if we want the sum and position if we want to compare the values.
// 3 - Not +=.
// 4 - The importance of the index and entire array parameter of the callback function to make things in one go (averages with the current array).

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/*

    The magic of chaining methods.

    Up until now, we have been using the map, filter and reduce methods in isolation.
    
    However, we can take this one step further by chaining all of these methods together, one after another.

*/

// Let's say that we wanted to take all the movement deposits, then convert them from euros to dollars and finally add them all up, so that we know exactly how much was deposited into the account in usd. We can do these operations individually and store these results in a new variable, but we can also do all in one go.

// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

const depositsEuro = function (arr) {
  const eurToUsd = 1.1;
  const deposits = movements
    .filter((element) => element > 0)
    .map((element) => element * eurToUsd)
    .reduce((acc, element) => acc + element, 0); // Remember that if we do more than one operation we need the curly braces and the return.
  return deposits;
  console.log(deposits);
};

console.log(depositsEuro(movements));
// depositsEuro(movements)

// Keep in mind that map returns an array, filter also returns an array (so we could have chained many other methods as well, as long as they return new arrays) but reduce returns a value, so we can't chain map or filter after this.

// When we chain all of these methods together it can be a little bit hard to debug if one of the results is not what we expect. If the final result was something weird, we wouldn't know which step of the chain had the bug. A good technique is to check the array in each of the different steps (remember that we can check the current array with the arguments in the callback function, this is a feature that it's really useful). Also remember that, if you want to check the result of the first method (filter in this example), you need to see the entire array in the next method (map in this example) because that entire array is the result of the previous method.

// Now that we know how to chain methods we can go back to our application. We can now calculate the statistics under the movements container. In are all the deposits, out are all the withdrawals and the interest is what the bank might pay us.

// My solution: See if we could refactor the code differently. Note that we don't want to convert the value to usd.

const calcDisplaySummary = function (movements) {
  // when setting the interest rate dynamically we would have to change the variables to movements.movements, so later we could set the interest rate to movements.interestRate.
  const deposits = movements
    .filter((element) => element > 0)
    .reduce((acc, element) => acc + element, 0);

  labelSumIn.textContent = `${Math.round(deposits)}€`; // Should it be a template literal or just the value?

  const withdrawals = movements
    .filter((element) => element < 0)

    .reduce((acc, element) => acc + element, 0);

  labelSumOut.textContent = `${Math.abs(Math.round(withdrawals))}€`; // Remember that math.abs() removes the minus sign (-). Check other purposes of the method MDN.

  const interest = movements
    .filter((current) => current > 0)
    .map((current) => (current * currentAccount.interestRate) / 100)
    .filter((current, i, arr) => {
      //console.log(arr); // Just so we can see the entire array.
      return current >= 1; // Notice the difference in the syntax when we need to write more that one line of code. Also, notice the necessity of the return keyword.
    })
    .reduce((acc, current) => acc + current, 0);
  labelSumInterest.textContent = interest;

  // The second filter represents the changing of rules of the bank. Imagine that the bank just pays interest if that interest is at least 1 euro. We need to add another method after the map to extract the values above 1.

  // The interest is paid on each deposit. That's why we filter for the deposits only. We want the value to display only the money that comes from interest, so, to do that, we need to map to a new array just the percentages of each deposit.
};

// calcDisplaySummary(account1.movements); // We will later change this to the user that logs into the app.

// A couple of consideration over the chaining method: we should not overuse chaining because, when overdone, it can cause real performance issues if we have huge arrays. Try to compress functionality (sometimes the map call happens more times than we really need).

// Second, it's bad practice in javascript to chain methods that mutate the underlying/original array (splice or reverse methods for example). You should not chain these two methods, and also try to never change the original array. We are going to talk more about this when we get to the functional programming section.

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Coding Challenge #3

/* 
Rewrite the 'calcAverageHumanAge' function from the previous challenge, but this time as an arrow function, and using chaining!

TEST DATA 1: [5, 2, 4, 1, 15, 8, 3]
TEST DATA 2: [16, 6, 10, 5, 6, 1, 4]

GOOD LUCK 😀
*/

// My solution. It wasn't necessary to create the variable to return.

// const calcAverageHumanAgeArrow = (str) => {
//   const avgHumanYears = str
//     .map((current) => (current <= 2 ? current * 2 : 16 + current * 4))
//     .filter((current) => current >= 18)
//     .reduce((acc, current, _, arr) => acc + current / arr.length, 0);

//   return avgHumanYears;
// };

// console.log(calcAverageHumanAgeArrow([5, 2, 4, 1, 15, 8, 3]));

const calcAverageHumanAgeArrow = (str) =>
  str
    .map((current) => (current <= 2 ? current * 2 : 16 + current * 4))
    .filter((current) => current >= 18)
    .reduce((acc, current, _, arr) => acc + current / arr.length, 0); // Really pay attention to this technique of calculating the average because, when using chaining, this is actually the only way of doing it.

console.log(calcAverageHumanAgeArrow([5, 2, 4, 1, 15, 8, 3]));

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/*

    Let's now talk about the find() method.


*/

// As the name suggests, we can use the find method to retrieve one element of an array, based on a condition. Let's again use the movements array.

// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

const firstWithdrawal = movements.find(function (current) {
  return current < 0;
});
console.log(firstWithdrawal);

const firstWithdrawalArrow = movements.find((current) => current < 0);

// Just like the other methods that we've been talking about, find() also accepts a condition and a callback function, which will then be called as the method loops over the array. Find() is just another method that loops over the array, but then it does something different. Instead of creating a new array, the find() method retrieves the first element of the array that satisfies the established condition.

// To recap: filter and find are a bit similar, however, there are two fundamental differences: 1 - filter returns all the elements that satisfy the condition while the find method just returns the first one; 2 - the filter method returns a new array while find only returns the element itself.

// Let's now take it to the next level and start working with our array of objects. The accounts array which contains the four objects, where each if them is an account. This is a pretty common data structure in javascript, so its important that we work through this together with the find method.

// This is where the find method can become very useful, basically, we can now find an object in the array, based on some property of that same object.

// Let's say that we wanted to find the account owned by jessica. Notice that in the callback, as we loop over the accounts array, each of the current elements is one account.

const jessica = accounts.find((account) => account.owner === "Jessica Davis");
// console.log(jessica);

// This is really powerful in terms of functionality, when one array contains multiple objects which all have a similar structure (owner, pin, etc.).

// Usually, the goal of the find() is to just find exactly one element, therefore we usually set up a condition where only one element can satisfy that condition.

// We will use this in the next couple of lectures to implement the login feature.

// As a challenge, implement the same functionality of the find() method using the for of loop.

let jessicaForLoop;

for (const account of accounts) {
  if (account.owner === "Jessica Davis") jessicaForLoop = account;
}
// console.log(jessicaForLoop);

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/*

    Let's now finally implement the login feature.

    Start by taking a look to our demo app before login.
    
    The only thing we can do is to login with the username (that we've computed before) and the password. After we did that, and if the credentials are correct, we can enter the account either by pressing the button or pressing the enter key.

    Now take a look at the html, there is a form and in it a login button, to which we will attach the event listener method. Then, as for the inputs, the username is gonna come from the the input user and the pin from the input pin, both already selected as cells.


*/

const updateUi = function (currentAccount) {
  // DISPLAY MOVEMENTS - inspect to see the class more easily
  displayMovements(currentAccount.movements);
  // DISPLAY BALANCE
  calcDisplayBalance(currentAccount);
  // DISPLAY SUMMARY
  calcDisplaySummary(currentAccount.movements);
};

// Let's now create these event handlers.

let currentAccount; // 3 - We just define it.

btnLogin.addEventListener("click", function (event) {
  event.preventDefault(); // 2
  //console.log("login"); // 1
  currentAccount = accounts.find(
    (account) => account.username === inputLoginUsername.value
  ); // 3 - Here we assign it to this value
  // console.log(currentAccount);

  /* 4 */ if (currentAccount?.pin === Number(inputLoginPin.value)) {
    // console.log("login"); // Just to check if it runs, if we just input js we only get the object (without being logged in).
    /* 5 */
    // DISPLAY UI AND MESSAGE

    containerApp.style.opacity = 100; // It's good to use classes for this, however this is just one style, it's not a big work to do it like this.

    labelWelcome.textContent = `Welcome back, ${
      currentAccount.owner.split(" ")[0]
    }`;
    // console.log(currentAccount.interestRate);
    /* 6 */

    updateUi(currentAccount);

    /* 7 */
    inputLoginUsername.value = inputLoginPin.value = "";
    // Same as below because the assignment operator works from left to right.
    // inputLoginUsername.value = "";
    // inputLoginPin.value = "";
    inputLoginPin.blur();
  }
});

// 1 - Start by just log login to the console. As you click the button, you can see a flash of the string appearing in the console, and then the page reloads. This happens because this is a button in a form element. In html, the default behavior when we click the submit button is to reload the page.

// 2 - We need to stop that from happening and, for that, we need to give this function a parameter (event), then, we can call the method preventDefault(), preventing this form from submitting.

// Another thing that is great about forms is that whenever we have one of these fields (pin, user) selected and press enter, that is exactly the same of pressing the button. So, whenever we have one of these fields inputted and then press enter, that will automatically trigger a click event on the button.

// 3 - Now let's actually do the work. To log the user in, we need to find the account from the accounts array with the username that the user inputted. That's where out find method comes into play again. It's basically the same as we did before but, this time, we want to read the value of the input field. Now, we need to define a variable to store this code outside of the function. And this because we need this information about the current account also later in other functions (when we transfer money, we need to know from which account that money should actually go - current account). We already computed usernames with the createUserName function, so we need to look for is because that's already a property inside the account objects. console.log(accounts); The owner is the hole name.

// 4 - We got the user, now what we need to do is to check the pin is correct. If we try to log with a random username we get undefined because it only reads the ones that are on the objects. The find method returns undefined if no element matches the condition. So how do we solve this error? The first thing that comes to mind is to check if the current account actually exists like this: currentAccount && currentAccount.pin === Number(inputLoginPin.value). But now we know about optional chaining, which is much easier to apply. The error is gone and now we just get undefined if we try a random username. currentAccount?.pin === Number(inputLoginPin.value).

// 5 - Now, in case of the account exists and the pin is correct what do we do? Check the flowchart, we display the ui and the welcome message first, and then display balance, summary and movements.

// 6 - As you see, these balances and movements are all hardcoded from what we did previously (calcDisplaySummary, calcDisplayBalance and also displayMovements). Actually, we want to do this inside of the login function, because we only want to calculate and display the balance, movements and the summary as soon as we get the data that we want to display. So we comment out the function calls outside the function (here in the lesson, in a real app we would remove them.)

// 7 - Now let's remove the text from the input fields and also the focus from the pin. The last is done by calling the blur() method to the input field.

// 8 - To finalize, we need to go back to the calcDisplay function because, if you notice, we hardcoded the interest rate for all users. However, there is a different interest rate for each of them as a property inside of the corresponding object. So we need to dynamically use the interest rate depending on the current user. This can be done in two ways, one is to modify the function so that it receives the account (then we need to modify the variables) this is best practice of course. Or, like i did, to set the interest rate to currentAccount.interestRate. But keep in mind that the best practice is to receive the hole object (we would have to call the function with the entire account).

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/*

    Let's now finally implement the transfers.

    To do this we input the username to which we want to transfer and the amount.

    btnTransfer
    inputTransferTo
    inputTransferAmount
*/

// The first thing is to attach an event handler to the button inside the transfer money area.

btnTransfer.addEventListener("click", function (event) {
  event.preventDefault();
  // Data from the input.
  const amount = Number(inputTransferAmount.value); // We need a number.
  const receiverAccount = accounts.find(
    (account) => account.username === inputTransferTo.value
  ); // We need the string to find the account object to which we want to transfer.

  // 1
  if (
    amount > 0 &&
    receiverAccount &&
    amount <= currentAccount.balance &&
    receiverAccount?.username !== currentAccount.username
  ) {
    // Add negative and positive movement to current and receiver user (doing the transfer.).
    currentAccount.movements.push(-amount);
    receiverAccount.movements.push(amount);

    // 2
    updateUi(currentAccount);
  }
  // Clean the input fields.
  inputTransferTo.value = inputTransferAmount.value = "";
  inputTransferAmount.blur();
});

// 1 - The flow chart actually misses two things before we add the negative and positive movements to the involved accounts. We need to check if the amount is a positive number and if the current user has enough money to transfer. When we calculated the balance, we actually didn't store the result, we printed directly. Now, we need to change the function to receive the entire object, so that we can create another property with the value that we want to store. We also check if the receiverAccount actually exists and make sure that we cant transfer money to ourselves.

// 2 - Now we also want to update the user interface. We could copy the code from the login button ( displayMovements(currentAccount.movements);calcDisplayBalance(currentAccount); calcDisplaySummary(currentAccount.movements)) but that is not good practice. So let's refactor the code from the login button all into one function.

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/*

    The findIndex() method.

    The findIndex() method works almost the same as the find method. But, as the name suggests, findIndex returns the index of the found element and not the element itself. 

    Let's see a great use case of this new method in our application. 

    inputCloseUsername
    inputClosePin
*/

// Take a look at the close account feature of the application. Closing an account basically means delete that account object from the accounts array. To delete an element from an array we use the splice method, but, for the splice method we need the index at which we want to delete.

// Let's first select the button and attach an event listener.

btnClose.addEventListener("click", function (event) {
  event.preventDefault();
  const user = inputCloseUsername.value;
  const pin = Number(inputClosePin.value);

  if (user === currentAccount.username && pin === currentAccount.pin) {
    const index = accounts.findIndex(
      (account) => account.username === currentAccount.username
    );

    // Delete account
    accounts.splice(index, 1);

    // Hide the ui
    containerApp.style.opacity = 0;

    // Change message
    labelWelcome.textContent = "Log in to get started";
  }
  // Clear the fields

  inputCloseUsername.value = inputClosePin.value = "";
  inputClosePin.blur();
});

// Final note: both the find and findIndex methods have access to the current index and entire current array.

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/*

    Some and every methods.

 
*/

// To start learning about the some method, let's look at the includes method that we have studied before.

console.log(movements); // Just so we can see it

console.log(movements.includes(-130)); // The value that we've specified is indeed in the array, so it returns true. So, we can use the includes method to test if an array includes a certain value. However, we can only test for equality right? The includes method returns true only if any value is exactly equal to -130.

// So what if we wanted to test for a condition instead? That's where the some method comes into play. Let's say that we wanted to know if there has been any deposits on this account (in other words if there is any positive movement in the array).

const anyDeposits = movements.some((movement) => movement > 0);
console.log(anyDeposits); // true

// But let's say that we wanted to know if there is any deposit above 5000:

const above = movements.some((movement) => movement > 5000);
console.log(above);

// You can see that these methods are quite similar, the difference is that the includes method test only for equality, while the some method accepts a condition. It is a good mnemonic to associate the word any (if any...) to the some method.

// Let's now use the some method to implement our missing functionality, which is to request a loan to a bank. The some method is handy because the bank as a rule which says that it only grants a loan if there is at least one deposit with at least 10% of the requested amount.

btnLoan.addEventListener("click", function (event) {
  event.preventDefault();
  const valueRequested = Number(inputLoanAmount.value);
  const rule = valueRequested * 0.1; // Or valueRequested / 10.

  if (
    valueRequested > 0 && // So the bank don't take money from us
    currentAccount.movements.some((current) => current >= rule)
  ) {
    // Add movement
    currentAccount.movements.push(valueRequested);
    updateUi(currentAccount);
  }
  inputLoanAmount.value = "";
  inputLoanAmount.blur();
});

// We can cheat and ask for bigger values because our algorithm is very simple, but this as educational purposes.

// Let's now talk about the closest cousin of the some method. The every method is quite similar, however it will only returns true if all of the elements in the array satisfy the condition. If all the elements pass the condition specified in the callback function the every method returns true.

console.log(movements.every((current) => current > 0));
console.log(account4.movements.every((current) => current > 0)); // this account only have deposits.

// IMPORTANT - Up until this point, we have always written the callback function directly as an argument into our array methods. However is good to know that we can also write this function separately, and then pass it as a callback. Like you will see in the next example, it's much better to organize your code like this. Because if you use the function in more then one place and then you need to change it, this technique saves hours of work. DRY principle.

const deposit = (mov) => mov > 0;

console.log(movements.some(deposit));
console.log(movements.every(deposit));
console.log(movements.filter(deposit));

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/*

    Flat and flatMap methods. ES2019

    These two methods are very easy to understand.

*/

// Let's say that we have an array with nested arrays in it.

const arr = [[1, 2, 3], [4, 5, 6], 7, 8];

// This is perfectly normal, but what if we wanted to take all these elements out of the sub arrays and put all of them together in one big array (1 to 8)? We can do it using the flat method, which removes the nested arrays and flat the array .

console.log(arr.flat());
// console.log(arr); // Does not change the original array.

// Now let's say that we have an array which is even deeper nested (the previous one have like one level of nesting):

const arrDeeper = [[[1, 2], 3], [4, [5, 6]], 7, 8];

console.log(arrDeeper.flat()); // The result still have the two inner arrays, meaning that the flat method only goes one level deep when flattening the array.

// We can easily fix that by using the depth argument. One is the default, so, for this example we must use flat with two as argument.

console.log(arrDeeper.flat(2));

// This is basically how flat works, but this example is not useful. Let's go back to the bank accounts. Let's say that the bank itself wants to calculate the overall balance of all the movements of all the accounts.

// First, we have all these movements stored in arrays, and these arrays are inside the objects in the accounts array. The first thing to do is to take them out of the accounts array and put them all into one new array. That's right, the map method is perfect for that.

const accountMovements = accounts.map((acc) => acc.movements);
console.log(accountMovements);

const allMovements = accountMovements.flat(); // We just have one level of nesting so the default parameter works just fine.
console.log(allMovements);

// Now we just need to add them together.

const overallBalance = allMovements.reduce((acc, current) => acc + current, 0);
console.log(overallBalance);

// As you might know by now, we can do this in a much clean way by using method chaining.

const overallBalanceChaining = accounts
  .map((account) => account.movements)
  .flat()
  .reduce((acc, current) => acc + current, 0);

console.log(overallBalanceChaining);

// Using map first and then flat the result is a very common operation in real world coding. So, there is a new method (introduced at the same time) called flatMap.

// flatMap essentially combines a map and a flat method into just one method, which is better for performance.

const overallBalanceChaining2 = accounts
  .flatMap((account) => account.movements)
  .reduce((acc, current) => acc + current, 0);
console.log(overallBalanceChaining2);

// Essentially, flatMap is the map method with the result flattening at the end. What is IMPORTANT to know is that, in the flatMap method, the flat only goes one level deep and we cannot change it. If you need to go deeper, its necessary the use of the flat method.

// Keep these two methods in mind whenever you find yourself in a situation where you have nested arrays and need to work with them. Believe that it is more common than it might look.

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/*

    Sorting arrays

    MUTATES THE ORIGINAL ARRAY

    We are almost finished with this section and with our application. However there is one feature missing, which is the ability of sorting the movements.

    Sorting is a much discussed topic in computer science. There are countless algorithms and methods of sorting values, but for now, we are simply going to use javascript built in sort method.

*/

// Let's start with an array of strings.

const owners = ["Jonas", "Francisco", "Adam", "Zach", "Martha"];

// All we need to do now is to use the sort method.

console.log(owners.sort()); // We now get the array sorted alphabetically.

console.log(owners); // This actually mutates the original array, Which means that we have to be very CAREFUL with this method.

// Let's try it with numbers as well

const nr = [6, 36, 7, 2, 78, 4, 6, -4, -3, -25];

// console.log(nr.sort()); // The result is not what we've expected. The numbers are not ordered in any way. The reason for this is that the sort method does the sorting based on strings. This might sound weird, but that is just how it works by default. What this method does is to convert everything to strings, and then do the sorting itself. If we look at the result as if they were strings, then it actually makes sense: the minus always comes first, then its ordered by the first number only (alphabetically ordered as if they were strings, only the first character matters).

// We can fix this by passing in a compare callback function into the sort method. This callback function is called with two arguments (a, b). These two parameters are essentially the current value and the next value if we imagine the sort method looping over the array.

// However, in order to understand how the compare function works (how the callback function works) and how we have to write it, let's just think of a and b as simply being two consecutive numbers in the array.

// Let's put that in practice by sorting the array in ascending order.

// If we return something less than 0, then a will be before b
// return < 0; (A - B) KEEP ORDER

// If we return something greater than 0, then b will be before a
// return > 0; (B - A) SWITCH ORDER

// Ascending order

nr.sort((a, b) => {
  if (a > b) return 1; // The number can be any, as long as it is positive.
  if (b > a) return -1;
  // (a < b) return -1;
});
console.log(nr);

// Descending order

nr.sort((a, b) => {
  if (a > b) return -1;
  if (b > a) return 1;
  // (a < b) return 1;
});
console.log(nr);

// This works with strings to. But, since we are working with numbers, we can actually simplify this a lot using some simple math.

// Look at the condition. If a is greater than b, it means that a minus b is always going to be something positive (exactly what we want to return). The same happens with the second condition, ir a is less that b, it means that a minus b is always going to be something negative (exactly what we want to return).

const nrSimplified = [-12, -555, -4345, 345, 346, 75, -65];

// Ascending
nrSimplified.sort((a, b) => a - b);
// We write a minus b because if a is greater than b it returns positive, and the other way around returns negative.
console.log(nrSimplified);

// Descending
nrSimplified.sort((a, b) => b - a); // Remember that we are returning the result of the operation, we just don't write it because its an arrow function.
console.log(nrSimplified);

// If you have a mixed array, this is not going to work.

// Now that we know how the sort method works, let's go back to our application. If you go to the demo version, you will find that the sort button sorts the movements in a descending order (which is actually a ascending order because we are displaying the movements from the bottom up).

// We will implement the sorting functionality right in the function that displays the movements. First we implement the sorting itself, and then the clicking.

// We start by adding a parameter to the function, which is the sort parameter and, by default we set it to false. Now, depending on this parameter, whether is true or false, we will then order (sort) our movements or not. We set it to false because, by default, we want to show the movements in the order they appear in the array.

// When we click the sort button, we will then call the display movements function with the sort parameter set to true.

// To do this, we define the variable movs conditionally. So if sort is true, we want to sort the movements array. However, we do now want to change the underlying array (the "original" array), we need to use slice to make a copy to be sorted after. Now, in the callback function of the sort method we need to think about the order that we want. Remember that the movements appear in descending order in the ui, but that is because we start to display the values from the bottom up (after beginning), so we now want to display in ascending order. If sorting is false, we want movs to become just movements.

// Finally, we need to use movs in the rest of the displayMovements function. With this, we adapted this function to support sorting.

// Now we just need to create the last event handler of our application. However, if we just call the function with the correct parameters, it just sorts once, it does not go back to normal if we click the button again. The solution for this is the use of a state variable that will monitor if we are currently sorting or not. This variable needs to live outside of the callback function so that its value can be preserved after we click the button.

// We start by setting the variable to false, because in the beginning the array is not sorted, the same way that we set the displayMovements function parameter to false as default.

// Then, when we click the button, we basically want the opposite of sorted (!sorted). Pay attention on how we pass the !sorted value as we call the displayMovements function.

// IMPORTANT
// By steps:
// We click, pass the value of !sorted (true), we sort and flip the variable to true. We click again, pass the value of !sorted (now false) to the function, we don't sort and display the values of the movements array.

let sorted = false;

btnSort.addEventListener("click", function (e) {
  e.preventDefault();
  displayMovements(currentAccount.movements, !sorted); // When we click, we want true, so not sorted.

  sorted = !sorted; // This is actually what makes everything work.
  console.log(sorted); // Check the console each time you press the button to really understand this.
});

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// The code from the course:

/*

// Functions

const displayMovements = function (movements, sort = false) {
  containerMovements.innerHTML = '';

  const movs = sort ? movements.slice().sort((a, b) => a - b) : movements;

  movs.forEach(function (mov, i) {
    const type = mov > 0 ? 'deposit' : 'withdrawal';

    const html = `
      <div class="movements__row">
        <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type}</div>
        <div class="movements__value">${mov}€</div>
      </div>
    `;

    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

const calcDisplayBalance = function (acc) {
  acc.balance = acc.movements.reduce((acc, mov) => acc + mov, 0);
  labelBalance.textContent = `${acc.balance}€`;
};

const calcDisplaySummary = function (acc) {
  const incomes = acc.movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = `${incomes}€`;

  const out = acc.movements
    .filter(mov => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumOut.textContent = `${Math.abs(out)}€`;

  const interest = acc.movements
    .filter(mov => mov > 0)
    .map(deposit => (deposit * acc.interestRate) / 100)
    .filter((int, i, arr) => {
      // console.log(arr);
      return int >= 1;
    })
    .reduce((acc, int) => acc + int, 0);
  labelSumInterest.textContent = `${interest}€`;
};

const createUsernames = function (accs) {
  accs.forEach(function (acc) {
    acc.username = acc.owner
      .toLowerCase()
      .split(' ')
      .map(name => name[0])
      .join('');
  });
};
createUsernames(accounts);

const updateUI = function (acc) {
  // Display movements
  displayMovements(acc.movements);

  // Display balance
  calcDisplayBalance(acc);

  // Display summary
  calcDisplaySummary(acc);
};

///////////////////////////////////////
// Event handlers
let currentAccount;

btnLogin.addEventListener('click', function (e) {
  // Prevent form from submitting
  e.preventDefault();

  currentAccount = accounts.find(
    acc => acc.username === inputLoginUsername.value
  );
  console.log(currentAccount);

  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    // Display UI and message
    labelWelcome.textContent = `Welcome back, ${
      currentAccount.owner.split(' ')[0]
    }`;
    containerApp.style.opacity = 100;

    // Clear input fields
    inputLoginUsername.value = inputLoginPin.value = '';
    inputLoginPin.blur();

    // Update UI
    updateUI(currentAccount);
  }
});

btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = Number(inputTransferAmount.value);
  const receiverAcc = accounts.find(
    acc => acc.username === inputTransferTo.value
  );
  inputTransferAmount.value = inputTransferTo.value = '';

  if (
    amount > 0 &&
    receiverAcc &&
    currentAccount.balance >= amount &&
    receiverAcc?.username !== currentAccount.username
  ) {
    // Doing the transfer
    currentAccount.movements.push(-amount);
    receiverAcc.movements.push(amount);

    // Update UI
    updateUI(currentAccount);
  }
});

btnLoan.addEventListener('click', function (e) {
  e.preventDefault();

  const amount = Number(inputLoanAmount.value);

  if (amount > 0 && currentAccount.movements.some(mov => mov >= amount * 0.1)) {
    // Add movement
    currentAccount.movements.push(amount);

    // Update UI
    updateUI(currentAccount);
  }
  inputLoanAmount.value = '';
});

btnClose.addEventListener('click', function (e) {
  e.preventDefault();

  if (
    inputCloseUsername.value === currentAccount.username &&
    Number(inputClosePin.value) === currentAccount.pin
  ) {
    const index = accounts.findIndex(
      acc => acc.username === currentAccount.username
    );
    console.log(index);
    // .indexOf(23)

    // Delete account
    accounts.splice(index, 1);

    // Hide UI
    containerApp.style.opacity = 0;
  }

  inputCloseUsername.value = inputClosePin.value = '';
});

let sorted = false;
btnSort.addEventListener('click', function (e) {
  e.preventDefault();
  displayMovements(currentAccount.movements, !sorted);
  sorted = !sorted;
});

*/
