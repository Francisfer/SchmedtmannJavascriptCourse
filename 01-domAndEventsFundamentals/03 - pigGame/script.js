"use strict";

// Selecting elements.

const player0 = document.querySelector(".player--0");
const player1 = document.querySelector(".player--1");
const score0Element = document.querySelector("#score--0");
const score1Element = document.getElementById("score--1"); // Same result.
const current0Element = document.getElementById("current--0");
const current1Element = document.getElementById("current--1");

const diceEl = document.querySelector(".dice");
const btnNewGame = document.querySelector(".btn--new");
const btnRollDice = document.querySelector(".btn--roll");
const btnHold = document.querySelector(".btn--hold");

// Starting conditions
let scores, currentScore, activePlayer, playing; // 10

const resetGame = function () {
  scores = [0, 0];
  currentScore = 0; // 4
  activePlayer = 0; // 5
  playing = true; // 8

  score0Element.textContent = 0; // 1
  score1Element.textContent = 0; // 1
  current0Element.textContent = 0;
  current1Element.textContent = 0;

  diceEl.classList.add("hidden"); // 2
  player0.classList.remove("player--winner");
  player1.classList.remove("player--winner");
  player0.classList.add("player--active");
  player1.classList.remove("player--active");
};
resetGame(); // 9

const switchPlayer = function () {
  // 6
  currentScore = 0;
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0.classList.toggle("player--active");
  player1.classList.toggle("player--active");
};

// Rolling dice functionality
btnRollDice.addEventListener("click", function () {
  if (playing) {
    // Generating a random dice roll.
    const diceRoll = Math.trunc(Math.random() * 6) + 1;

    // Display dice.
    diceEl.classList.remove("hidden");
    diceEl.src = `dice-${diceRoll}.png`; // 3

    // Check if rolled 1.
    if (diceRoll !== 1) {
      // Add dice to current score.
      currentScore += diceRoll;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      // Switch to next player.
      switchPlayer();
    }
  }
});

// Hold the score and check winner
btnHold.addEventListener("click", function () {
  if (playing) {
    // Add current score to active player score.
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    // Check if score is >= 20
    if (scores[activePlayer] >= 20) {
      // If it is, finish the game.
      playing = false;

      diceEl.classList.add("hidden");
      document
        .querySelector(`.player--${activePlayer}`) // 7
        .classList.add("player--winner");
      document
        .querySelector(`.player--${activePlayer}`) // 7
        .classList.remove("player--active");
    } else {
      // Switch to next player.
      switchPlayer();
    }
  }
});

// Reset the game
btnNewGame.addEventListener("click", resetGame);

/*

Remember of the importance of console.log in the debugging process.


1 - Setting the scores to zero. We can use zero (number) instead of a string because of the javascript engine.

2 - Hide the dice. We can also use 
    document.querySelector(".dice").style.display = "none";

3 - With .src we can manipulate the image to be displayed. We need to be careful with the path of the images. In this case they are all in the same folder of the root. But in some projects they will appear in separated folders.

4 - This variable has the purpose of adding the dice numbers, so we can´t write it inside the event handler (otherwise it would reset to zero at each click).

5 - We are storing the score values into an array. That's why is handy to define the player's as zero and one, so then we can easily use the zero base functionality.

6 - Remember that in the guess my number project we've used arguments in the functions. We did that to specify what they were supposed to change and, consequently, making the code more readable upon their usage. Here, the code is exactly the same, so we don't need to use an argument to specify any change.

7 - When selecting with querySelector we need to add the selector (.) if it is a class or the (#) if it is an id.
When selecting with getElementById we just need to specify the id name itself.
To add or remove we just use the string without the selector (.).

8 - State variables are very useful in programming, in this case it allow's us to actually stop the game when one of the player's win. Otherwise the functionality of the buttons would continue after the winning condition is met. This logic can be useful in many case, DON'T FORGET!

9 - When creating the resetGame function to restore all the initial values of the game, we need to have in consideration that we need to call it right after, otherwise the code will not be applied when we refresh the page. It will work only if we press the new game button (where the function is called it in the event handler.) 

10 - Remember that we need to define the variables outside the function. Otherwise (if we define them inside) it will produce an error (actually: variable y is not defined). This happens because the variables are scoped to the resetGame function. The solution is to declare them outside the function with no values, and then reassign them a value in the function itself. Scoping is one of the subjects of further lessons, but keep in mind that variables defined inside functions are only available inside of that same function.
*/
