"use strict";

/* 
    What is the DOM? And what is the DOM manipulation?

    >>> DOM stands for document object model, it's basically a structured representation of html documents. It allows javascript to access html elements and styles in order to manipulate them.

    >>> When talking about the DOM tree and DOM manipulation we use the terms parent element, child element, sibling element. If we imagine the tree itself, at the top is the document, a is a special object that is the entry point to the DOM (document.querySelector()). 

    >>> The first child element of the document is, usually, the html element (the root). Head and body are two child elements of html, so they are siblings. This goes deeper through out the document.

    >>> The DOM, all the properties and methods, are not part of javascript. The DOM is part of web API - Application programming interface (libraries that browsers implement and that we can access from our javascript code).

*/

/*

console.log(document.querySelector(".message").textContent); // using the querySelector to select the message element. reading the textContent.
console.log(
  (document.querySelector(".message").textContent = "Correct Number 🎉") // changing the textContent.
);
document.querySelector(".number").textContent = 13; // changing the textContent.
document.querySelector(".score").textContent = 40; // changing the textContent.

console.log(document.querySelector(".guess").value); // get the value of the input, which is empty right now.
document.querySelector(".guess").value = 23; // manipulate this element by setting a value.
console.log(document.querySelector(".guess").value); // now it has the value of 23

*/

// Handling click events.

/*
let secretNumber = Math.trunc(Math.random() * 20) + 1; // 4
let score = 20; // 5.1
//document.querySelector(".number").textContent = secretNumber; // 8 - just to see the random number while developing
let highScore = 0;

document.querySelector(".check").addEventListener("click", function () {
  // 1
  const guess = Number(document.querySelector(".guess").value); // 2
  if (!guess) {
    document.querySelector(".message").textContent = "⛔️ No number"; // 3
  } else if (guess === secretNumber) {
    document.querySelector(".number").textContent = secretNumber; // 8
    document.querySelector(".message").textContent = "You guessed 🎉"; // 4.1
    document.querySelector("body").style.backgroundColor = "#60b347"; // 7
    document.querySelector(".number").style.width = "30rem"; // 7

    if (score > highScore) {
      // Implementing the highscore.
      highScore = score;
      document.querySelector(".highscore").textContent = highScore;
    }
  } else if (guess > secretNumber) {
    if (score > 1) {
      // 6.2
      // 6
      document.querySelector(".message").textContent = "Too high!"; // 4.1
      score--; // 5.2
      document.querySelector(".score").textContent = score; // 5.2
    } else {
      document.querySelector(".message").textContent = "You lost!"; // 6.1
      document.querySelector(".score").textContent = 0; // 6.3
    }
  } else if (guess < secretNumber) {
    if (score > 1) {
      // 6.2
      // 6
      document.querySelector(".message").textContent = "Too low!"; // 4.1
      score--; // 5.2
      document.querySelector(".score").textContent = score; // 5.2
    } else {
      document.querySelector(".message").textContent = "You lost!"; // 6.1
      document.querySelector(".score").textContent = 0; // 6.3
    }
  }
});

// CHALLENGE. Restore the initial values so the user can play again without refreshing the page (to later maintain the highscore).

document.querySelector(".again").addEventListener("click", function () {
  score = 20;
  secretNumber = Math.trunc(Math.random() * 20) + 1;
  document.querySelector(".message").textContent = "Start guessing...";
  document.querySelector(".number").textContent = "?";
  document.querySelector(".score").textContent = score;
  document.querySelector(".guess").value = "";
  document.querySelector("body").style.backgroundColor = "#222";
  document.querySelector(".number").style.width = "15rem";
});


*/
/*

1 - This is the first time that our code reacts to something that happens in the DOM, and for that we need to use an event listener.
    An event is something that happens on the page, for example, a mouse click or a mouse moving or a key press. Then, with an event listener, we can wait for a certain event to happen and then react to it.

    First, we need to select the element where the event should happen, in this case, we want to listen to the event on the button element.
    We select the button element with the class name check, because the btn class is more generic and used in the again button.

    After, we call the add event listener method. Inside the braces, the first argument we need to pass in the type of the event, in this case a simple "click".

    In the second argument, we tell the event listener what to do, basically, we need to specify the reaction to the click event. We do that by defining a function that contains the code that is executed whenever this click event happens.

    That function is going to be called the event handler because the addEventListener method is a special kind of function that expects the the type of the event in the first argument and the event handler function as the second argument. Remember that a function is also just a value, so we can pass it in another function as a value.

    Notice that we don't call the function anywhere, we only define it and pass it into the event handler. It's the javascript engine that will call the function as soon as the event happens.

2 - Here we save the number that the user inputs into a variable. Because the return from an input field is a string we need to use the Number function, so later we can compare this number with the one randomly generated.

3 - Here we start to implement the game logic. Usually, with an application like this, which requires an input value from the user, the FIRST thing to do is to check if there actually is a value. If there is no value, then we can print to the console something as a response.

Notice that we specified in the html that the input type should be a number, so letters cannot be written in the input. The only situation that we need to have in account is if the user don't write a number of if he writes zero (in both cases there is no value).  

For that we write an if statement, so, if there is no value (!guess). Remember that zero is a falsy value, so guess, in the logical context of the if else statement, will be false. But we want something to happen whenever this is false, so we need a true value to be returned is this condition, and to do that we use the negation operator, inverting false to true. Then we change the message to be displayed.

4 - Now we implement the game logic itself, so we need to implement what happens when the guess is correct (equal to the secret number), when the guess is to low or too high. Tree scenarios basically.

To start, we need to define the secret number. We do that outside of the event handler because we only want the secret number to be defined once (when we start the application). If we define the random number inside of the event handler, then on each click we get a new secret number.

    4.1 - After we only need to write the conditions for the remaining scenarios.

5 - Now let's work with the score. Each time the user guesses wrong (too high or too low), the score has to decrease by one. 

    5.1 - The better way to do this is to create a variable for the score in the code and then update it. It's good practice to always have the data also in the code and not just on the DOM. We also define this variable outside the event handler (with the same value 20) but, this time, we need to use let so we can reassign it.

    5.2 - We decrease the score value by one and set the text content to be equal to score.

If we test the game now, we see that the score value keeps decreasing to infinity, so we need to implement the losing concept to the game.

6 - To do this, we need to wrap the two conditions of loosing (too high and too low) inside of another if block, so that the code runs while the score is above zero.
    6.1 - Else display the message you lost!
    6.2 - If we test now we see that the score reaches 0, but the message only changes one click later. That´s because when the score is one and we click, the value is sill above zero. So we need to set the score > 1.
    6.3 - Now the message changes properly, however the score value stays at 1, so we also need to change the text content of score to zero at the end.




We can also change css styles with DOM manipulation. We want to change the background color to green when the user wins the game and make the secret number wider. 

7 - First we need to select the hole body of the page and then .style.nameOfThePropertyWeNeedToChange = "color". Then we change the width, also placing the value within strings.

8 - At this point, we just need to work on the again button, which resets the game. But before we start, we need to hide the secret number again and display it only when the user wins.
    */

/*
let secretNumber = Math.trunc(Math.random() * 20) + 1;
let score = 20;
let highScore = 0;
document.querySelector(".check").addEventListener("click", function () {
  const guess = Number(document.querySelector(".guess").value);
  if (!guess) {
    document.querySelector(".message").textContent = "⛔️ No number"; // 11
  } else if (guess === secretNumber) {
    document.querySelector(".number").textContent = secretNumber;
    document.querySelector(".message").textContent = "You guessed 🎉"; // 11
    document.querySelector("body").style.backgroundColor = "#60b347";
    document.querySelector(".number").style.width = "30rem";

    if (score > highScore) {
      highScore = score;
      document.querySelector(".highscore").textContent = highScore;
    }
  } else if (guess > secretNumber) {
    // 9
    if (score > 1) {
      document.querySelector(".message").textContent = "Too high!"; // 11
      score--;
      document.querySelector(".score").textContent = score;
    } else {
      document.querySelector(".message").textContent = "You lost!"; // 11
      document.querySelector(".score").textContent = 0;
    }
  } else if (guess < secretNumber) {
    // 9
    if (score > 1) {
      document.querySelector(".message").textContent = "Too low!"; // 11
      score--;
      document.querySelector(".score").textContent = score;
    } else {
      document.querySelector(".message").textContent = "You lost!"; // 11
      document.querySelector(".score").textContent = 0;
    }
  }
});

document.querySelector(".again").addEventListener("click", function () {
  score = 20;
  secretNumber = Math.trunc(Math.random() * 20) + 1;
  document.querySelector(".message").textContent = "Start guessing..."; // 11
  document.querySelector(".number").textContent = "?";
  document.querySelector(".score").textContent = score;
  document.querySelector(".guess").value = "";
  document.querySelector("body").style.backgroundColor = "#222";
  document.querySelector(".number").style.width = "15rem";
});

*/

/*

    REFACTORING THE CODE: THE DRY PRINCIPLE.

    As we can see our code is now functional, however, there is a lot of repetition or duplicated code (dry principle = don't repeat yourself).

9 - In this two scenarios (guess higher or lower) all of the code is similar  with the exception of the first message string ("too high" or "too low"). Here we can use a technique called refactoring (refactoring = restructure the code without changing/affecting functionality).

    We already identified the two blocks where this happens. The first if block checks if the guess is too high and the second checks if the guess is too low, however, in both cases we are checking if the guess is DIFFERENT from the secret number. So, whenever the guess is different from the secret number, all of the code is the same, with the exception of the first message.

10 - Instead of having a block for when the guess is too high and another for when the guess is too low, let's create one block for the situation where the guess is different. 

11 - Now we just need to address the message using the ternary operator for when the guess is too high and when the guess is to low.

12 - The code looks a lot cleaner now, however, another refactoring technique can be applied so that it gets even better. As we can see, we still have the same code repeated in multiple places like the query's where we set the message, the number, the score and calculating the random secret number. We can refactor this same repeated code into functions, and then call them in all the places with the duplicated code.

*/

let secretNumber = randomNumber();
let score = 20;
let highScore = 0;

const displayMessage = function (message) {
  document.querySelector(".message").textContent = message;
};

const displayScore = function (score) {
  document.querySelector(".score").textContent = score;
};

const displayNumber = function (number) {
  document.querySelector(".number").textContent = number;
};

const styleBackground = function (color) {
  document.querySelector("body").style.backgroundColor = color;
};

const numberStyle = function (width) {
  document.querySelector(".number").style.width = width;
};
const guessValue = function () {
  return Number(document.querySelector(".guess").value); // Remember return
};

function randomNumber() {
  // must be a function declaration because we call it before initialize.
  return Math.trunc(Math.random() * 20) + 1; // Remember return
}

document.querySelector(".check").addEventListener("click", function () {
  const guess = guessValue();
  if (!guess) {
    displayMessage("⛔️ No number");
  } else if (guess === secretNumber) {
    displayNumber(secretNumber);
    displayMessage("You guessed 🎉");
    styleBackground("#60b347");
    numberStyle("30rem");

    if (score > highScore) {
      highScore = score;
      document.querySelector(".highscore").textContent = highScore;
    }
  } else if (guess !== secretNumber) {
    // 10
    if (score > 1) {
      displayMessage(guess > secretNumber ? "Too high!" : "Too low!"); // 11
      score--;
      displayScore(score);
    } else {
      displayMessage("You lost!");
      displayScore(0);
    }
  }
});

document.querySelector(".again").addEventListener("click", function () {
  score = 20;
  secretNumber = randomNumber();
  displayMessage("Start guessing...");
  displayNumber("?");
  displayScore(score);
  document.querySelector(".guess").value = "";
  styleBackground("#222");
  numberStyle("15rem");
});
