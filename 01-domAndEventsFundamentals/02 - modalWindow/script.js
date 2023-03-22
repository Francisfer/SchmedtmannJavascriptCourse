"use strict";

// As we start to develop in a more professional way, the first thing to do is to select the elements that we need and store them in variables. Like so, we already start to write clean the code from the beginning.

// There is already a div element containing the modal window, with the class of modal hidden. The modal class is to style the element and the hidden class is the one that we are going to work with. notice that the hidden class is also in the div element overlay. It's important to analyze carefully the html and the css to have a clear idea of the classes purpose. It's good practice to separate the ones that style the elements from the ones that have dom manipulation purposes with a comment.

const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const btnCloseModel = document.querySelector(".close-modal");
const btnsOpenModal = document.querySelectorAll(".show-modal"); // 1

const openModal = function () {
  // 6
  modal.classList.remove("hidden"); // 2 - No dot.
  overlay.classList.remove("hidden"); // 3
};

const closeModal = function () {
  // 4
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
};

for (let i = 0; i < btnsOpenModal.length; i++) {
  btnsOpenModal[i].addEventListener("click", openModal); // 6
}

btnCloseModel.addEventListener("click", closeModal); // 5

overlay.addEventListener("click", closeModal); // 5

// 7
document.addEventListener("keydown", function (event) {
  if (event.key === "Escape" && !modal.classList.contains("hidden")) {
    closeModal();
  }
});

/*
1 - const btnsOpenModal = document.querySelector(".show-modal");
console.log(btnsOpenModal); 

All the three buttons have the same class .show-modal, however, if we use the query selector in situations like this, we will notice in the console that only the first button gets logged. This is the first limitation of the querySelector method that we encounter, whenever the selector matches multiple elements, we need to use querySelectorAll, otherwise only the first element will get selected.

Now, if we log the variable containing the three buttons class (.show-modal), we see that the log is a type of array (it's not exactly an array, but we will see a more in depth explanation further in the course). 
console.log(btnsOpenModal);

If it is an array, we can loop through it and do something, for example log the text content of each one.
console.log(btnsOpenModal[i].textContent);

2 - Inside the loop we add an event listener for all the three buttons (remember that we only have one modal div element, event though we have three buttons, we are simply giving them the same functionality, which is to open the modal window). To do that we use the property classList and the remove method (remember that we are not selecting the class, that's why we don't use the dot, we are simply passing the name of the class).
We can remove or add more classes if we place them separated with a comma outside the quotation marks.

3 - Doing the same for the overlay div, so the style is applied. 

4 - Now we want the close button and the overlay clicking to restore the first configuration. So we need to add the styles in both cases: 

btnCloseModel.addEventListener("click", function () {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
});

overlay.addEventListener("click", function () {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
});

This makes it work, however we are repeating ourselves, we need to create a function that we can use in both cases.

5 - Notice that we don't use the parenthesis, we are not calling the function immediately, we just want it to be called once the button gets clicked.

6 - We can also create a function to open the modal.

7 - Let's learn how to respond to keyboard events. We still need to use addEventListener, however, keyboard events are called global events because they don't happen on one specific element. For global events we usually listen on the hole document (document.addEventListener). So, no matter where the event happens on the page, it will always trigger the event handler that we specify. 

There are three types of events for the keyboard: keydown (triggers when we press the key down), keypress (triggers continually while we keep the finger on the key) and keyup (triggers when we lift the finger off the keyboard).

document.addEventListener("keydown", function () {
  console.log("pressed"); 
});

This log shows us that the function gets executed for any key that is pressed, but we just want the esc key to close the modal.

For that we need to know which key was pressed, that information will be stored in the event object created by javascript. Until now we've never looked to the event itself, we just listened and reacted to it. However, if we give an argument to the function and then log it, its possible to see the object created by javascript.

document.addEventListener("keydown", function (event) {
  console.log(event);
});

Press escape.

In this object is possible to see that the key property set to escape (key: "Escape").

As we have done with objects before we can log the property directly to the console:

document.addEventListener("keydown", function (event) {
  console.log(event.key);
});

Now that we now this, we just need to place the conditionals. So, if the event key is equal to escape and if the modal does not contain the class hidden (notice the boolean inversion (!) at the beginning) then, close the modal (here we need to call the function).

document.addEventListener("keydown", function (event) {
  if (event.key === "Escape") {
    if (!modal.classList.contains("hidden")) {
      closeModal();
    }
  }
});

*/
