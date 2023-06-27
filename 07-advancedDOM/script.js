"use strict";

///////////////////////////////////////
// Modal window

const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const btnCloseModal = document.querySelector(".btn--close-modal");
const btnsOpenModal = document.querySelectorAll(".btn--show-modal");

const openModal = function (e) {
  e.preventDefault(); // This is a link, not a button. Links with # in the href go to the top of the page when clicked. That's why we prevent the default behavior.
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
};

const closeModal = function () {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
};

/*

This is a old school for loop that we can remove over the fact that we know a better way of looping through arrays with the for each method.

for (let i = 0; i < btnsOpenModal.length; i++)
  btnsOpenModal[i].addEventListener("click", openModal);

*/

// IMPORTANT - log to the console the elements so you can easily find them in the code. We already know that we can inspect the element, but if a class belongs to many elements you can easily spot them. console.log(btnsOpenModal);

// btnsOpenModal is not quite an array, it is a node list with two elements (resulting from the querySelectorAll).
// A node list does have the for each method (and some others, but not the same that are available for arrays), that's why we can loop over it with the method:

btnsOpenModal.forEach((btn) => btn.addEventListener("click", openModal));

btnCloseModal.addEventListener("click", closeModal);
overlay.addEventListener("click", closeModal);

document.addEventListener("keydown", function (e) {
  if (e.key === "Escape" && !modal.classList.contains("hidden")) {
    closeModal();
  }
});

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/*

    LECTURE: How the DOM really works (it is important to use the lessons pdf).

    Remember that the DOM is basically the interface between all javascript code and the browser (more specifically HTML documents that are rendered in and by the browser).

    Throughout this course, we have written a ton of javascript code but many times completely without interacting with the browser (without using the DOM).

    The DOM is a very complex api (application programming interface) and it is that interface that allows us to programmatically interact with the DOM. 
    In practice, the dom contains a ton of methods and properties that we can use to interact with the dom tree (querySelector, addEventListener).

    In the dom, there are different types of nodes (some nodes are html elements while others are just text). This is important to understand because all the dom methods and properties are organized into these different types of objects.

    How the dom api is organized behind the scenes:

        Every single node in the dom tree is of the type node. In javascript, each node is represented by an object. This object gets access to special node methods and properties (text contend, child nodes). 
        We already know that there are different types of nodes, its like the node type having a couple of child types. 
        These child types of the node type are: element, text, comment and document. So, whenever there is text inside any element, we already know that it gets its own node and that node will be of the type text.

          For the element itself, there is the element type of node

*/

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/*

    LECTURE: Selecting, creating and deleting elements.

*/

// Let's start by learning a little bit more about selecting elements. We are going to start at the top of any html document (that is the document):

// console.log(document.documentElement); // This is a special way of selecting the entire document (simply document is not enough because that is not the real dom element).
// For example, if you want to apply css styles to the entire page, you always need to select document.documentElement) - this is the root

// console.log(document.head); // We can also select the head
// console.log(document.body); // or the body

// For these special elements we don't even need a selector, otherwise and as we know, we can use:

//////////////////////////////////////////////////////////////////////////////

// SECTION ONE - SELECTING ELEMENTS.

// QUERY SELECTOR / QUERY SELECTOR ALL

// console.log(document.querySelector(".header")); // This returns the first element that matches the selector.

// const allSections = document.querySelectorAll(".section");
// console.log(allSections); // To select multiple elements with this class/selector. Returns a nodeList on which we can loop with the array method forEach.

// These are the ones that we've been using and, in fact, they are the most used ways of selecting elements.

// REMEMBER - to select by tag we only write the tag (h1), to select by class we use the dot (.section) and to select by id we use the # (#something).

// As we have learned in the previous lesson, these selectors are available not only on the document itself, but also on all the elements. We use this a lot when we want to select child elements, as we will do later in this section.

// GET ELEMENT BY ID

document.getElementById("section--1");
// REMEMBER - with .getElementById() we don't need the selector #, just the name.

// NEW ONES

const allButtons = document.getElementsByTagName("button"); // To get all elements with the name (tag)

// console.log(allButtons); // Here we get all the buttons that are on the page. Notice  how this returns an html collection, which is different a nodeList.
// The html collection is a so called life collection, this means that if the dom changes, the collection is immediately updated automatically. With nodeList we still keep the same elements that we had when we created the variable.

document.getElementsByClassName("section--1"); // This is similar to get element by id and get elements by tag name. We don't need the selector, simply the name of the classes. This also returns a html collection.

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// SECTION TWO - CREATING ELEMENTS.

// INSERT ADJACENT HTML
// We can create html elements using the insert adjacent html function that we've used before. This is a quick and easy way of creating elements, go and review how it works.

// However, sometimes it is more useful to actually build the element a bit more from scratch or more programmatically, using a combination of some other methods.

// CREATE ELEMENT()

const message = document.createElement("div"); // We need to pass in a string or basically the tag name, div in this case. This will return a dom element that we can store/save somewhere (message variable in this case).

// Like this, the element is not yet anywhere in our dom. All the above is a dom object (console.log(message)) that we can now use to do something on it, but it is not in the dom itself (not anywhere on the page).

// If we want it on the page we need to manually insert it into the page, but before this, let's show how we can:

// add classes

message.classList.add("cookie-message"); // The class is called like this because we will programmatically build an element which will display a cookie message on the bottom of the screen (the class is already in the css but not in the html).

// add text

// message.textContent = "We use cookies for improved functionality and analytics."; // This inserts simply text, but we can also insert html:

message.innerHTML = `We use cookies for improved functionality and analytics. <button class="btn btn--close-cookie">Got it!</button>`; // Here we insert a button, the classes are the ones in css.

// Now, all we have to do is to insert the element into our dom. Let's do that in our header. Don't forget the technique, right click to inspect and check the class name to select the header and then append out message to that element:

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// SECTION THREE - INSERTING ELEMENTS.

// const header = document.querySelector(".header");

// header.append(message); // Now is also in the dom. Prepend adds the element as the first child of the header element (parent element), append adds as the last element.

// One thing to know is that if we prepend and then append, the element is not placed first and last (it doesn't appear twice).
// This happens because the element message is now a live element living in the dom, therefore it cannot be at multiple places at the same time.

// This means that prepend and append can be used not just to insert elements but also to move them.

// But what if we actually wanted to insert multiple copies of the same element? We need to first copy the first element.

// header.append(message.cloneNode(true)); // We need to pass in true so that all the child elements also get copied.

// header.before(message); // This will insert the message before the header element as a sibling

// header.after(message); // This will insert the message after the header element also as a sibling

//////////////////////////////////////////////////////////////////////////////

// SECTION FOUR - DELETING ELEMENTS.

// document
//   .querySelector(".btn--close-cookie")
//   .addEventListener("click", function () {
//     message.remove();

//     // message.parentElement.removeChild(message); Old school way of doing it.
//   });

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/*

    LECTURE: Styles, attributes, and classes.

*/

// Let's continue to work on our cookies message banner.

// STYLES
// to set a style on an element we .style and then the property name. This styles are set as inline styles, so directly in the dom.

message.style.backgroundColor = "#37383d";

message.style.width = "120%"; // Comprimento - So that the bar occupies all the screen in width.

// You might think that we can read styles by using the style property:

console.log(message.style.height); // We get nothing, because using the style property like this only works for inline styles that we set ourselves, like the ones that we just did above.

console.log(message.style.width); // Now we get 120%.

// We can get the styles if we really want to, all we need to do is to use the getComputedStyle function and pass in the element:

//console.log(getComputedStyle(message)); // We get a huge object that contains all of the properties with all of the values, to get a certain property from there we do:

console.log(getComputedStyle(message).height); // 50 px
console.log(getComputedStyle(message).width); // 2016px - not 120%

// Let's now say that we wanted to increase the height of the message banner by 40px, you have to remember that the get computed style function returns a string, we need to parse it so it is possible to add a number to it.
// Remember that the second argument of the parse function is the base (10 most of the times or 2 if working with binary)

message.style.height =
  parseInt(getComputedStyle(message).height, 10) + 30 + "px";

// Now let's work with css custom properties, which we usually call css variables. Check the css, the custom properties are the ones in :root (defining variables in the root is like defining in the document in javascript).
// They are called css variables because the idea is very similar to javascript (this way we can change the value in many places all over our css files by simply changing the value there).
// If we can change the value there (in the css), then we can also change it right from javascript.

document.documentElement.style.setProperty("--color-primary", "orangered"); // Set property first argument to target the property that we want to change and the second is what we want to change.
// We can use setProperty to do everything that we've done previously, but it is easier to use those techniques.

// ATTRIBUTES - READ VALUES

// Remember that in html the src, alt, class and id are all attributes of the elements. In javascript we can access and change the different attributes of an element.

const logo = document.querySelector(".nav__logo"); // Let's select the logo

// Now we can access some of the standard properties of that logo element.

console.log(logo.alt);
console.log(logo.src); // http://127.0.0.1:5500/img/logo.png - Notice how this link (source) is different from the one in the html. This is because the logged URL is basically the absolute url for the image.
// The url that is in the html is the relative source, relative to the folder in which the index.html file is located. To get the relative url we need getAttribute:

console.log(logo.getAttribute("src")); // It works the same way for links (the absolute links will be the same, but for relative links the log is different)!

const openAccount = document.querySelector(".nav__link--btn");
console.log(openAccount.href);
console.log(openAccount.getAttribute("href"));

// This works for standard properties of the elements, for example an image it's supposed to have the alt and source attributes on it.
// So, if we specify them on html, javascript will automatically create these properties on the object.
// But if we add other properties that are not standard for the element, javascript will not create those properties on the object. To access these properties we need to use getAttribute:

console.log(logo.getAttribute("designer")); // Remember that we've created this property in the html manually. We could have done this with setAttribute:

logo.setAttribute("company", "Bankist");

// Another one that works and might be handy is className:

console.log(logo.className);

// ATTRIBUTES - SET VALUES

logo.alt = "Beautiful minimalist logo";

// console.log(logo.alt); // Beautiful minimalist logo - You can also inspect the element to see.

// There is also a special type of attributes that we will talk about further in the course - data attributes. (data-)

// CLASSES

// logo.classList.add()
// logo.classList.remove()
// logo.classList.toggle()
// logo.classList.contains()

// It is possible do add a class using className=""; -- DON'T USE THIS - Overwrites what is already there.

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/*

    LECTURE: Implementing smooth scrolling.

*/

// The functionality that we're about to implement is to smoothly scroll to the first section when we press the learn more button. Let's see two ways of doing this:

// 1 - The first way is a bit more old school, first we create the button variable and get the class (in this case id) of the section that we want to scroll to. (section--1)

const btnScrollTo = document.querySelector(".btn--scroll-to");
const section1 = document.querySelector("#section--1");

btnScrollTo.addEventListener("click", function (e) {
  // First we need the coordinates of the section that we want to scroll to:

  const s1coords = section1.getBoundingClientRect(); // If we log s1coords you will see real coordinates, we need the x value (0 because we don't want horizontal scrolling) and the y value (how many pixels we want to move vertically).
  window.scrollTo(s1coords.left, s1coords.top + window.pageYOffset); // Both the coordinates are placed in the scrollTo global function.

  // If we click again it will not work, that's because the top that we've specified is always relative to the viewport, NOT to the document (not to the top of the page).
  // The solution to this is to add the current scroll position to the top value (s1coords.top).
  // We add the "distance" that we've scrolled to determine the position of the section not relative to the viewport (top of the browser window), but instead relative to the top of the page with window.pageYOffset.

  // To implement more functionalities we need to use the scrollTo function and pass in an object:

  window.scrollTo({
    left: s1coords.left + window.pageXOffset,
    top: s1coords.top + window.pageYOffset,
    behavior: "smooth",

    // This is the old school way of doing this, manually calculating the values of left and top, even the window.pageXOffset and window.pageYOffset is deprecated if you search.
  });
});

// MORE MODERN WAY:

btnScrollTo.addEventListener("click", function () {
  section1.scrollIntoView({
    behavior: "smooth",
  }); // We take the element that we want to scroll to (section1) and, on that we call scrollIntoView (we pass in the object with the behavior)
});

// //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/*

    LECTURE: Types of events and event handlers.

    An event is basically a signal that is generated by a certain dom node and a signal means that something has happened (a click somewhere or the mouse moving, the user triggering the full screen mode).

    Then, we can listen to these events in our code using event listeners, so that we can handle them if we'd like. 
    But, no matter if we handle a certain event or not (ex click), that event will always happen when a user clicks, it doesn't matter if we are listening or not (remember this for the next lessons).

    Check for documentation about events on MDN. The most important are related to mouse and keyboards.

*/

// We already worked with a couple of different events earlier in the course, now let's take a look to another type of events, which is the mouse enter event:

// const h1 = document.querySelector("h1"); // Let's first select an element (there is only one h1).

// MOUSE ENTER - The mouse enter event is a little like the hover event in css. It fires whenever a mouse enters a certain event.

/*
h1.addEventListener("mouseenter", function () {
  alert("With addEventListener: Great, you are reading the heading!");
});
*/

// We already know add event listeners, but let's se two more ways of attaching an event listener to an element:

// 1 - By using the so called onmouseenter property and set this property to the function. For each of the events that exist, there is one on-event property like this one (onclick for ex.).

/*
h1.onmouseenter = function () {
  alert("With onmouseenter: Great, you are reading the heading!");
};
*/

// However, this way of listening to events is a bit old school.
// There are two reasons for the add event listener is better, the first one is that it allows us to add multiple event listeners to the same event (without overwriting the previous),
// the second one is that we can actually remove an event handler in case we don't need it anymore.

// 2 - Removing an event handler is something that we've never talked about but, in this case, removing doesn't mean erasing the event itself, take the previous example of mouseenter, what if we only wanted that the alert to appear once?
// We need to remove the event after it occurs once.

// To do that, we first need to export the function into a named function, so we can then remove the event listener in that same function:

const alertH1 = function (e) {
  alert("With addEventListener: Great, you are reading the heading!");

  // Now, we can prevent that from happening, so after we listen for an event and handle that same event with the alertH1 function, we can remove that event listener. This way it just happens once.

  h1.removeEventListener("mouseenter", alertH1); // This doesn't actually needs to be here, we could remove it outside of the function after some time passed for ex. See below.
};

//h1.addEventListener("mouseenter", alertH1);

setTimeout(() => h1.removeEventListener("mouseenter", alertH1), 3000);

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/*

    LECTURE: Event propagation: capturing, targeting and bubbling.

    Javascript events have a very important property. It's a so called capturing phase and a bubbling phase. See the course pdf!

    The events are not generated at the target element (click on a link), instead, the event it's generated at the root of the element (document - the very top of the dom tree).

    From there, the so called CAPTURING phase happens, where the event then travels all the way down from the document root to the target element. 
    As the event travels down the tree, it will pass through every single parent element (not siblings) of the target element.

    As soon as the event reaches the target, the TARGET phase begins, where events can be handled right at the target. As we already know, we do that with event listeners, such as the click.
    So, event listeners wait for a certain event to happen on a certain element and, as soon as the event occurs, it runs the attached callback function.

    After reaching the target, the event actually travels all the way up to the document route again, in the so called bubbling phase. 
    We say that events bubble up from the target to the document root, passing through all its parent elements (not siblings).

    It is important to know this because it is like the event also happened in each of the parent elements. As the event bubbles through a parent element it's as if the event had happened right in that very element.

    What this means is that if we attach the same event listener also, for example, to the section element, then we would get the exact same alert window for the section element as well. 
    We would have handle the exact same event twice, once at its target and once at one of its parent elements.

    This behavior will allow us to implement really powerful patterns, as we will see throughout the rest of the section. IMPORTANT

    By default, events can only be handled in the target and in the bubbling phase. However, we can set up event listeners in a way that they listen to events in the capturing phase instead. 
    Also, not all types of events do have a capturing and bubbling phase. Some of them are created right on the target element, so we can only handle them there. However, most of events do capture and bubble such as described.

    Let's now see this in action.
*/

// EVENT PROPAGATION IN PRACTICE.

// We are going to start by attaching event handlers to the features navigation link and also all of its parent elements. Then, as we click the link, we will give all these elements random background colors, which allows us to visualize exactly how event bubbling is happening.

// Let's start by creating that random color. A random color is basically just a string, like rgb, with a value between zero and 255. rgb(255,255,255)

const randomInt = (min, max) =>
  Math.floor(Math.random() * (max - min + 1) + min);

const randomColor = () =>
  `rgb(${randomInt(0, 255)},${randomInt(0, 255)},${randomInt(0, 255)})`;

console.log(randomColor());

// Let's now attach the event handlers:

document.querySelector(".nav__link").addEventListener("click", function (e) {
  this.style.backgroundColor = randomColor(); // points to the element on which the event handler is attached to.
  console.log("LINK", e.target, e.currentTarget); // Read 1 and 2 below.
  // console.log(e.currentTarget === this);

  // e.stopPropagation(); // 3
});

// Now what if we perform the same action on the parent elements?

document.querySelector(".nav__links").addEventListener("click", function (e) {
  this.style.backgroundColor = randomColor();
  console.log("CONTAINER", e.target, e.currentTarget);
});
document.querySelector(".nav").addEventListener(
  "click",
  function (e) {
    this.style.backgroundColor = randomColor();
    console.log("NAV", e.target, e.currentTarget);
  },
  false
); // Read 4

// Now, if we click on the features link, the color also changes on its parent elements, that's because of bubbling.
//It is as if the click event had also happened in all of the parent elements. But if we click on the parent elements, the color of the child elements keep unchanged (from here, it only bubbles up).

// 1 - This e.target is to see where the event originated, where the event first happened, NOT the element on which the handler is attached.
// If we click in the features link you will see in the log that the target is the same in all three handlers (nav__link).
// If you click on the container the target is the same for both handlers (nav__links) and if you click on the nav, the target is only the nav.

// 2 - Besides the e.target, there is also e.currentTarget, which is indeed the element on which the event handler is attached.
// The purpose is to show you that the current target is not the same if we click the features link.
// So, the e.currentTarget is exactly the same as the this keyword (e.currentTarget === this) because the this keyword points to the element on which the event handler is attached to.

// 3 - Another important thing to know is that we can actually stop the event propagation from happening. All we need to do is to call stopPropagation on the event.
// In practice, it's usually not a good idea to stop propagation

// 4 - With this, we have seen phase two and three (target and bubbling), but what about the capture phase? As we've learned, events are captured when they come down from the document route all the way to the target.
// But our events are not picking up these events during the capture phase.

// Add event listener is only listening for events in the bubbling phase, but not in the capturing phase.
// That is the default behavior of the add event listener method and, the reason for that, is that the capturing phase is usually irrelevant for us.
// It's just not that useful, on the other hand, the bubbling phase can be very useful for something called event delegation (next lecture).

// However, if we want to catch events during the capturing phase, we can define a third parameter in the add event listener function.
// When set to true, the event handler will no longer listen to bubbling events, but instead to capturing events.
// In practice, this is going to look the same, but the log shows you that the first element through which the event passes is the navigation (because it listens when the event travels down), it used to be the link (toggle true and false to see the differences).

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/*

    LECTURE: Event delegation - Implementing page navigation.

    Let's now use the power of event bubbling to implement something called event delegation.

    What we're going to do is to implement smooth scrolling behavior in the navigation, so that when we click one of the navigation bar links it will automatically scroll smoothly to the corresponding section. 

    Right now this happens instantaneously because it's a relative link specified in the html.


*/
/* UNCOMMENT
document.querySelectorAll(".nav__link").forEach(function (currEl) {
  currEl.addEventListener("click", function (e) {
    // console.log("link"); // To see if it works. Now we can see the problem, by default, clicking on these links will scroll to the corresponding position in the html. 
    // This happens because of the anchors (the # with the section in the href), which will automatically move to the page to the element (section) that has the corresponding id. 
    // We need to prevent this from happening before we can implement smooth scrolling:
    e.preventDefault();

    // Now we can go ahead. How i did it:
    // document
    //   .querySelector(`${currEl.getAttribute("href")}`) // Get attribute because we don't want the absolute url.
    //   .scrollIntoView({ behavior: "smooth" });

    // Course:

    const id = this.getAttribute("href"); // Stored the value into a variable. Don't forget using the this keyword.
    document.querySelector(id).scrollIntoView({ behavior: "smooth" });
  });
});
*/
// IMPORTANT - The use of the id of the elements that we want to scroll to as href attributes (with #) is a pretty common technique for implementing a navigation like this.

// This actually works fine, but it's not really efficient. That's because we are adding the exact same callback function once to each of the three elements (in currentEl.add event listener).
// The exact same function is now attached to the three elements.
// This is unnecessary, it would be fine for only three elements, but certainly not for thousands (impacts performance) because we would be creating thousands of copies of the same function with the for each method.
// The solution for this is to use event delegation.

// In event delegation, we use the fact that events bubble up, and we do that by putting the event listener on a common parent of all the elements that we are interested in. In our example, the nav__links.

// Whenever the user clicks one of the links, the event is generated and bubbles up.

// Event delegation is done in two steps:

// 1 - First we add the event listener to the common parent element of the elements that we are interested in.

// 2 - Determine which element originated the event, so that we can work with that element.

document.querySelector(".nav__links").addEventListener("click", function (e) {
  // console.log(e.target); // Notice that if we click outside of the links, the element that originates the event is the container (.nav__links).
  // This is important to notice because we only want to work with the clicks that happened on one of the links. So we need a matching strategy in order to match only the elements that we are interested in.
  // In this case, the best way is to check if the target has the .nav__link class.

  // Matching strategy
  if (e.target.classList.contains("nav__link")) {
    e.preventDefault();

    const id = e.target.getAttribute("href"); // The href is not on this (keyword), because this points to the parent element to which we've attached the event listener (".nav__links").

    console.log(id);

    document.querySelector(id).scrollIntoView({ behavior: "smooth" });
  }
});

// Keep in mind that coming up with the matching strategy is probably the hardest part of implementing event delegation.

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/*

    LECTURE: DOM traversing.

    Dom traversing is basically walking through the dom. This means that we can select an element based on another element. 
    This is very important because, sometimes, we need to select elements relative to a certain element. 
    For example, a direct child or a direct parent element (sometimes we don't even know the structure of the dom at runtime). In all these cases we need dom traversing.

*/

// We are going to work with the h1 element (when banking meets minimalist), we are going downwards, upwards and sideways

const h1 = document.querySelector("h1"); // Start by selecting the element.

// Going DOWNWARDS (selecting child elements):

// The first way of doing this is to use querySelector, because we already know that querySelector also works on elements, not only on the document. As you can see in the html or in the inspector, we can select two span elements (highlight classes).

console.log(h1.querySelectorAll(".highlight")); // Query selector all because there's two of them. Logs a node list with all the elements with the class highlight that are children of the h1 element (NodeList(2) [span.highlight, span.highlight]).

// That would work no matter how deep these child elements would be inside of the h1 element. This is IMPORTANT to notice. Also, if there were other elements with the class highlight in the page (outside of the h1), they would not be selected.

console.log(h1.childNodes); // Sometimes, all we need are actually direct children, for this we can use h1.childNodes.
// Here we get all kinds of stuff: text, comment, the span elements - NodeList(9) [text, comment, text, span.highlight, text, br, text, span.highlight, text].
// That's because nodes can be anything, as we already know. This gives us every single node of every single type that exists inside of an element.

console.log(h1.innerHTML, h1.textContent); // But many times we are simply interested in the elements themselves, if we wanted the text we could use .textContent (just the text) or innerHTML(the html itself).

console.log(h1.children); // childNodes is not that used, but there is children, which gives us an html collection (live collection, so it is updated). Here, we indeed only get the three elements that are inside of the h1.

// Finally, there is also first and last element child.

// h1.firstElementChild.style.color = "white";
// h1.lastElementChild.style.color = "orangered";

// Going UPWARDS (selecting parent elements):

console.log(h1.parentNode); // For direct parents, it's similar to childNodes but upwards. Header title - <div class="header__title">…</div>grid

console.log(h1.parentElement); // This one is more used, but in this example is the same element.

// Most of the time we need a parent element which is not a direct parent, in other words, we might need to find a parent element no matter how far away it is in the dom tree.

// h1.closest(".header").style.background = "var(--gradient-secondary)"; // For that we have the closest method.
// Let's say that we have multiple headers on the page, so multiple elements with the class of headers. But, for some reason, we only wanted to find the one that is a parent of the h1 element.
// The closest method receives a query string, just like querySelector. We have selected the closest parent and applied a css variable (custom properties).
// This is very IMPORTANT, we're going to use this all the time, especially for event delegation.

// We can think of closest being the opposite of querySelector. Query Selector finds children (no matter how deep in the dom tree), while closest finds parents (no matter how far up in the dom tree)

// Going SIDEWAYS (selecting sibling elements):

// For some reason, in javascript, we can only access direct siblings (only the previous and the next one):

console.log(h1.previousElementSibling); // Null because there is nothing there (before), it is the first child.
console.log(h1.nextElementSibling); // h4

// Just like before, we also have the same properties.

console.log(h1.previousSibling);
console.log(h1.nextSibling);

// If we really need all the siblings (not only the previous and next one), we can use the trick of moving up to the parent element and then read all the children from there.

console.log(h1.parentElement.children); // Html collection of all of the siblings, including itself.

// Let's do something with this, so an html collection is not quite an array, but it is still an iterable that we can spread into an array. Than we can loop over the array to do something, like scale them a bit.

// [...h1.parentElement.children].forEach(function (el) {
//   console.log(el);

//   if (el !== h1) el.style.transform = "scale(0.5)";
// });

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/*

    LECTURE: Building a tabbed component.

    In this lecture, we are going to work with the operations section. 
    
    A tabbed component can appear in many different ways, what they all have in common is the existence of tabs that, once you click, the content of the are will change.

    For this component, we need a bunch of html. The hole tab component is called operations. We have one content element for each of the tabs. 
    
    So, when we click on one of the tabs, we will not create any new content, what we'll do instead is to hide the other content.

*/

// We start by selecting the elements.

const tabs = document.querySelectorAll(".operations__tab"); // Buttons
const tabsContainer = document.querySelector(".operations__tab-container"); // Button container
const tabsContent = document.querySelectorAll(".operations__content");

// Let's use event delegation to implement functionality. Remember that for event delegation, we need to attach the event handler to the common parent element.

tabsContainer.addEventListener("click", function (e) {
  // console.log("button", e.target); // Button to check if it works and e.target to check the classes.

  const clicked = e.target.closest(".operations__tab"); // We can't just use target because if we click the number we get the span element (the element that is inside of the button) and we need the button no matter where we click.
  // We also can't use dom traversing because, although it would work for the span problem (the span parent element in indeed the button), but the button itself would point to the parent ("operations__tab-container").
  // The solution is to use closest, like this we will search for the closest operations tab.

  if (!clicked) return; // This solves the problem of clicking outside of the button (to get rid of the null error that results from the use of the closest method - if you click outside of the button, but inside of the tabs container, there is no matching parent to be found). So, if there is no clicked on the targets, return immediately (GUARD CLAUSE). The code stops here if no condition is met, otherwise it runs the rest.

  tabs.forEach((el) => el.classList.remove("operations__tab--active")); // To remove the clicked style to all buttons before adding to the clicked. Clearing the class on all of them and only add it to one of them afterwards:

  clicked.classList.add("operations__tab--active"); // No dot REMEMBER

  // Activate content area:

  tabsContent.forEach((content) =>
    content.classList.remove("operations__content--active")
  ); // Just like above, it's like toggle.

  // The operations content is the same as having display none, it is the operations content active that actually displays the content or not (in its absence).
  // So we need to select the content that we want to display and add it the class that activates.

  document
    .querySelector(`.operations__content--${clicked.getAttribute("data-tab")}`)
    .classList.add("operations__content--active");

  // console.log(clicked.getAttribute("data-tab"));
  // Instead of ${clicked.getAttribute("data-tab")}, we could just ${clicked.dataset.tab} IMPORTANT - RESEARCH
});

// The whole idea when we build components like this is to add and remove classes as necessary to manipulate content to our needs (just like the modal window).

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/*

    LECTURE: Passing arguments to event handlers.

    Let's now create an effect on our page navigation, where all the links fade out (including the logo) when hover over one of them, except for the link that we hover over.

    This will teach us something valuable which is how to pass arguments into event handler functions.

*/

// So, we already know that we shouldn't create an event listener for each link, we should use event delegation.

const nav = document.querySelector(".nav"); // The common parent of all of the links, including the logo. If we just wanted to work with the links, the parent element should be nav__links, but we also want to work with the logo.

// nav.addEventListener("mouseover"); // Now we use mouseover, which is similar to mouseenter, with the difference of mouseenter not bubbling up. But here we actually need the event to actually bubble. RESEARCH THE EVENTS - the opposite of mouseover is mouseout and the opposite of mouseenter is mouseleave.

nav.addEventListener("mouseover", function (e) {
  // MATCHING STRATEGY - here we don't need the closest because there is no child elements (like the div in the previous lesson) that we could accidentally click.

  if (e.target.classList.contains("nav__link")) {
    // console.log("yes"); // Just to check if it is working.

    const hovered = e.target; // Creating a variable with the element that we're gonna work with.

    const siblings = hovered.closest(".nav").querySelectorAll(".nav__link"); // To select the other elements, we can go to the parent element and select the children, however, if you check the html, you can see that the parent elements of the links are the list items with the class of nav item.
    // So we need to go up, instead of doing this manually, we can simply search for a parent (which matches a certain query) by using the closest method. From there we select the nav links.

    const logo = hovered.closest(".nav").querySelector("img"); // We could select it manually by it's class name, but suppose that there were many navigation's on this page. It's always better to move up to the closest parent and query from there.

    siblings.forEach((el) => {
      if (el !== hovered) el.style.opacity = 0.5;
    });
    logo.style.opacity = 0.5;

    // Like this it only works once, in other words it fades all the elements except the hovered but if we remove the mouse it doesn't go back to the default. Here is where we need the mouseout event listener. We just copy the code and reset the opacity to 1.
  }
});

nav.addEventListener("mouseout", function (e) {
  if (e.target.classList.contains("nav__link")) {
    const hovered = e.target;

    const siblings = hovered.closest(".nav").querySelectorAll(".nav__link");

    const logo = hovered.closest(".nav").querySelector("img");

    siblings.forEach((el) => {
      if (el !== hovered) el.style.opacity = 1;
    });
    logo.style.opacity = 1;
  }
});

// As you might guess, although it works, the code is repetitive. Let's refactor it, usually that happens by creating a new function.
// The next step is to verify what is the same and what changes (easy in this case because it's just the opacity).
// So, we can simply take the code and create an argument or a parameter for that opacity, then we can pass that opacity into the function.

const handleHover = function (e, opacity) {
  if (e.target.classList.contains("nav__link")) {
    const hovered = e.target;

    const siblings = hovered.closest(".nav").querySelectorAll(".nav__link");

    const logo = hovered.closest(".nav").querySelector("img");

    siblings.forEach((el) => {
      if (el !== hovered) el.style.opacity = opacity;
    });
    logo.style.opacity = opacity;
  }
};

/*

nav.addEventListener("mouseover", handleHover);
nav.addEventListener("mouseout", handleHover);

This is how we used the callback function, we've done it before. However, the problem is that now we want to pass in values in the callback (0.5 for the mouseover and 1.0 for the mouseout) and we also need a way of passing the e (event). 
Remember that we cannot call the function with the parameters on the callback (javascript expects a function there, if we call that function, then it becomes another value - undefined in this case because we don't return nothing).

The first solution is to still have a regular callback function that javascript calls for us whenever the event happens. Then, inside we can call the function with the parameters: 

nav.addEventListener("mouseover", function(e) {
  handleHover(e, 0.5)
});

nav.addEventListener("mouseout", function(e) {
  handleHover(e, 1)
});

We can do even better and remove the anonymous callbacks altogether by using the bind method. Using it to pass an argument into the handler function

Remember that the bind method creates a copy of the function that it's called on and it will set the this keyword in the function call to whatever value we pass into bind. So we can call each function and set the this keyword to the value:

nav.addEventListener("mouseover", handleHover.bind(0.5));

nav.addEventListener("mouseout", handleHover.bind(1));

Also notice that the this keyword is equal to current target by default, but in this case it will remain unaltered (navigation element), because we set the this keyword manually.

If the this keyword is now the opacity, all we need to do is to change it in the function: 

const handleHover = function (e, opacity) {
  if (e.target.classList.contains("nav__link")) {
    const hovered = e.target;

    const siblings = hovered.closest(".nav").querySelectorAll(".nav__link");

    const logo = hovered.closest(".nav").querySelector("img");

    siblings.forEach((el) => {
      if (el !== hovered) el.style.opacity = this;
    });
    logo.style.opacity = this;
  }
};

We use the this key to pass an argument into the handler function because we can only ever pass one real argument, which is the event. If we need to pass additional values we need to use the this keyword. If we need several arguments we can pass an array or an object instead of just one value like the opacity. REMEMBER THAT PASSING ARGUMENTS INTO EVENT HANDLERS IS THE ACTUAL PURPOSE OF THE LESSON.

*/

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/*

    LECTURE: Implementing a sticky navigation: the scroll event.

    Another common feature on webpages is to make the navigation bar become attached to the top of the webpage after we scroll to a certain point.

    We make the navigation sticky by adding the sticky class (sets the position to fixed and changes the background color to transparent) whenever we reach a certain position.

*/

// There is a better way of doing this, but let's start by working with the scroll event for now.

// window.addEventListener("scroll", function (e) {console.log("hi");});

// The scroll event is available on window (not document), to which we attach the event listener. Like this, the event will be fired off each time we scroll on our page. Just a tiny scroll fires the event multiple times.

// This is why the scroll event is not really efficient and should be avoided, but it is useful to understand.

const initialCoords = section1.getBoundingClientRect(); // section1 is already selected above.

// console.log(initialCoords); Amongst others, we get the top coordinate, so we can work with that.

// window.addEventListener("scroll", function () {
//   // console.log(window.scrollY); // To get the scroll position on the y axis. It measures the current position in relation to the top of the page (that's why we start with zero), it measures the distance from the current scroll position to the top of the page.
//   // Add the sticky class as soon as we reach the first section. We should not hardcode the value because it changes according with the viewport size. So let's use the position of the first section (done outside of the event handler).

//   if (window.scrollY > initialCoords.top) {
//     nav.classList.add("sticky"); // Nav is already selected. NO POINT TO ADD OR REMOVE CLASSES (.), only for selecting
//   } else nav.classList.remove("sticky");
// });

// LECTURE: The intersection observer API.

// THE WAY TO GO:
// This is no way of doing this, it really affects performance because the scroll is constantly firing, specially on mobile.

// Let's now implement the same by using the new intersection observer API. But what exactly is this and why is it so helpful? This api allows our code to observe changes to the way that a certain target element intersects another element or the way it intersects the viewport.

// Let's begin by learning how this api actually works without the sticky navigation.
/*
const obsCallback = function (entries, observer) {
  // This callback will be called each time that the observed element (target) is intersecting the root element at the threshold that we've defined.
  // In our example, whenever our target (section1) is intersecting the viewport at 10%, this function will be called, no matter if we are scrolling up or down.
  //It has two arguments, the entries and the observer object itself. In this case we are only interested in the entries, but using the observer is sometimes useful.
  // The entries are actually an array of the threshold entries.

  entries.forEach((entry) => {
    console.log(entry);
  });
};

const obsOptions = {
  root: null, // This object needs first a root property. The root is the element that the target is intersecting, the target is section1 and the root is the element that we want our target to intersect. Null to see the target element intersection the entire viewport.

  threshold: [0, 0.2], // The percentage of intersection at which the observer callback will be called. You can think of this as the percentage that we want visible in our root. 
  Zero means that our callback will trigger each time that the target element moves completely out of the view and also as soon as it enters the view (called when the target is moving into the view and out of the view).

 
};

const observer = new IntersectionObserver(obsCallback, obsOptions); // We need to start by creating a new intersection observer. Here we need to pass a callback function and an object of options.

observer.observe(section1); // We now use the observer to observe a certain target with the observe method.
*/

// Now let's think about this, when do we want our navigation to become sticky? When the header moves completely out of the view, so this time we are going to observe the header element.

// 1 - Let's start by selecting that:

const header = document.querySelector(".header");

// 5 - Create a variable to dynamically apply the root margin in the options object. The we just specify it in the object.

const navHeight = nav.getBoundingClientRect().height;
console.log(navHeight);

// 4 - Defining the function, here we will have the functionality that we want to happen (add and remove the sticky class).

const stickyNav = function (entries) {
  const [entry] = entries; // we only have one threshold, so we don't need to loop over the entries, we can simply get the first element with destructuring. This is the same as writing entries [0].
  // console.log(entry);

  // Adding and removing the classes condition (now we establish the condition based on the is intersecting value - only when the header is not intersecting the viewport we add the sticky class):
  if (!entry.isIntersecting) nav.classList.add("sticky");
  // When the target is not intersecting the root.
  else nav.classList.remove("sticky");
};

// 2 - Create the observer, the options object was created directly:

const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0, // If we want the sticky navigation as soon as the header moves completely out of view the threshold is zero. In zero percent of the header showing in the viewport.
  rootMargin: `-${navHeight}px`, // Minus to happen 90px before the header get's out of the viewport.
});

// 3 - Using the header observer to observe the header:
headerObserver.observe(header);

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/*

    LECTURE: Revealing elements on scroll.

    Let's implement another modern feature using the intersection observer api. This time, we are going to reveal elements as we scroll close to them.

*/

// We are going to reveal each section as we approach it (not the images yet). The animation itself comes from css, we achieve this by simply adding a class (search--hidden) to each of these section as we approach them.

// What the css class does is to give an opacity of zero and move them a little bit down (8rem). Then, when we remove it, the opacity and the rem go back to zero.

// This class is not on the sections, so we could add it manually to all four of them before we start (check the html).
// However, this is never a good idea because, if some users disable javascript, the page wont be visible for them (they don't have a way of removing this class), so the solution is to add it an removing it programmatically with javascript.
// They are still there, they still preserve their height, but they are now invisible.

// Our job now is to remove this class as we approach each of these sections.

// 3.1
const allSections = document.querySelectorAll(".section");

// 2 - The callback, this time we will need the observer:
const revealSection = function (entries, observer) {
  // 5 - The previous steps were the setup, now we create the logic.

  const [entry] = entries;
  // console.log(entry); to see the target, is intersecting and check if the unobserve in running.

  // Now the target element is going to be important (inside we have the className) because we want to make the first section appear, not all the sections at once. So we need a way of knowing which is the section that actually intersected the viewport, that's what we can use the target for.

  // We establish the condition so that we only trigger the class removal when the target is actually intersecting. Otherwise it will appear right from the beginning. However, we can establish a guard clause so it returns if its not intersecting.

  if (!entry.isIntersecting) return;
  entry.target.classList.remove("section--hidden");

  // The last improvement that we can do is to unobserve these sections because, as we keep scrolling, the observer keeps observing the sections (events are being added).
  observer.unobserve(entry.target);
};

// 1 - The observer:
const sectionObserver = new IntersectionObserver(revealSection, {
  // 4 - Now we start dealing with the options, as always the root is going to be the viewport and the threshold is set to something greater than zero. Because we don't want to show the section right as it enters the view, but a bit later. 15% visible.
  root: null,
  threshold: 0.15,
});

// We want to observe all the four sections in this case. It is possible to observe them all using the same observer. First we select all the sections (3.1) and then observe these as multiple targets, all using this observer.

// Now we can loop over the node list with for each (we use foreach to do something that does not involve creating a new array).

allSections.forEach(function (section) {
  sectionObserver.observe(section);

  // Since we are already looping over all the sections, it is a good idea to add the class hidden here
  section.classList.add("section--hidden");
});

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/*

    LECTURE: Lazy loading images. This really impacts the site's performance.

    One of the most important things when building websites is performance. Images have, by far, the biggest impact on page loading. It is very important that images are optimized on any page.

    For that, we can use a strategy called lazy loading images.

    Start by looking to the html, each of the features has an image. The main ingredient to the lazy loading strategy is that we have a very low resolution image which is loaded right in the beginning.

    That image is the one on the src attribute, as you can see, the dimensions are only 200 x 120 in this case, while the image to really display has 2000 x 1200 and half of a megabyte. 
    The image that we want to display when the scroll reaches the position is referred in the data-src attribute. 

    Data-src is a special attribute that we can use, but any other would work as well. Check mdn to read about the DATA ATTRIBUTES. 

    Basically, the idea is to, as we scroll to one of these low resolution images, we will then replace it with the one specified in the data-src attribute.

    Also, we will remove the lazy-img class, which is the filter that makes the image blur.

    // Let's now implement this, using the intersection observer api one more time. 

*/

// 1 - First, we need to select the images, this selector is going to be a little bit different this time because we don't want to select all images (not all of them get lazy loaded).
// We could simply do a selector of image to get all images: const features = document.querySelectorAll("img");
// But we just want the images that have the data-src attribute (where we've specified the high resolution image).

const imgTargets = document.querySelectorAll("img[data-src]"); // Selecting the three elements that contain the data-src property. This is how it's done in css.
// console.log(imgTargets);

// 4 - The callback function (where the functionality always goes)
const loadImg = function (entries, observer) {
  const [entry] = entries; // Again, we only have one threshold, so one entry.
  // console.log(entry);

  if (!entry.isIntersecting) return; // The guard clause - if they're not intersecting we want an early return.

  // Otherwise we want to replace the src attribute with the data-src attribute:

  // console.log(entry.target.dataset); // So you can see why we have to do dataset.src next, this logs DOMStringMap {src: 'img/digital.jpg'}

  entry.target.src = entry.target.dataset.src; // Remember that each of these images are at entry.target, also, that dataset is where the special data properties are stored.

  // entry.target.classList.remove("lazy-img"); // You might think that we could just remove the blur class like this, however, if we do so, we will remove the class before the high resolution image has loaded.
  // We can test this on the network tab of the inspector, if we set to slow 3g, we will see that the blur is removed, the low resolution image appears and only after it loads the high resolution image gets displayed.

  // We want the class to be removed only when the image finishes loading, and, when this occurs the load event is emitted. If it is emitted, we can listen for it like we would listen for any other type of event.

  entry.target.addEventListener("load", function () {
    entry.target.classList.remove("lazy-img");
  }); // On that image (target) we can do add event listener and listen for the load event and, only then, remove the blur class.

  observer.unobserve(entry.target); // To stop observing
};

// 2 - The image observer (with the name of the callback function that we're gonna create after):

const imgObserver = new IntersectionObserver(loadImg, {
  root: null,
  threshold: 0, // Start at zero and adjust as it goes
  rootMargin: "200px",
});

// 3 - Attaching the image observer to all the images (targets)
imgTargets.forEach((img) => imgObserver.observe(img));

// Ideally, we want the images to be loaded before the user reaches them.
// REMEMBER that the threshold is the percentage of the target appearing in the viewport (in this case), if you set it to one, the code only runs when the image appears in full, zero is as soon as it starts appearing.
// The fact that we can't place any negative number in the threshold makes us use the root margin to set the code to run before (negative pixels) or after (positive) a certain number of pixels. READ MORE ABOUT THIS.

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/*

    LECTURE: Building a slider component - part 1.

    The first thing to do is to see how this is actually implemented in html and css. As you can see in the inspector, all the sliders are side by side. If you turn off the overflow property, you can see the next slide, as if it is waiting to come up. When you click the buttons or the dots, all the slides move to the left side. This happens by using the transform css property (setting it to translate x by a certain value). Basically, what we need to do is to adapt these values (percentages) as we go.

    
*/

// Right at the start, we have all of the slides on top of each other so, the first thing that we need to do here is to establish this initial condition where they are all side by side.

// We will set these percentages programmatically of course.

// 1 - We start with some selections.

const slides = document.querySelectorAll(".slide");
const slider = document.querySelector(".slider");
// Btns
const btnLeft = document.querySelector(".slider__btn--left");
const btnRight = document.querySelector(".slider__btn--right");

// slider.style.transform = "scale(0.8)"; // Smaller so we can see.
// slider.style.overflow = "visible"; // Visible so we can see them all.

// 2 - Now we loop over all the slides and set the style on each of them, this time we also need the index.

slides.forEach((slide, i) => {
  slide.style.transform = `translateX(${100 * i}%)`; // Here is where we write the percentages, so, we want the first slide to be at 0%, the second at 100% and the third at 200%.
  // That's because translateX will move them to position 100% (the width of these elements is 100%, so the second element will start right at the end of the last one).
  // To calculate these values programmatically, we can multiply 100 by the index (zero the first time, then 100, etc.).
});

// 3 - Event handlers to the buttons
// Going to the next slide (we are going to start by moving to the right only). Remember that, going to the right is simply to change the value of the transform property. For that we need an outside variable that holds the value of the current slide.

let currentSlide = 0;

const maxSlide = slides.length; // We can also read the length of a node list, this is to stop the slider when we run out of slides and go back to the start (in the logic below).

btnRight.addEventListener("click", function () {
  if (currentSlide === maxSlide - 1) {
    currentSlide = 0; // If we run out of slides, go back to the beginning.
  } else {
    currentSlide++; // Adding 1 to each click.
  }

  // Now we need to implement the same logic as before with the for each method but with a slight difference. Remember that the active slide is the one that we want to be zero percent so when we click, we add 1 to the current slide, index 0 - 1 is -1 and -1 * 100 is - 100 (sliding the image).

  slides.forEach((slide, i) => {
    slide.style.transform = `translateX(${100 * (i - currentSlide)}%)`;
  });
  activateDot(currentSlide); // Change the active class
});

btnLeft.addEventListener("click", function () {
  if (currentSlide === 0) {
    currentSlide = maxSlide - 1; // So that we go to the last slice
  } else {
    currentSlide--;
  }

  slides.forEach((slide, i) => {
    slide.style.transform = `translateX(${100 * (i - currentSlide)}%)`;
  });
  activateDot(currentSlide); // Change the active class
});

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/*

    LECTURE: Building a slider component - part 2.

    IMPORTANT - The code of the previous section need's to be refactored, i left it crude so i can remember why it was done that way. 
                The code from the lectures is at the end of this script so i can compare it, so go there and see how the creation of the functions was made because at this point i will keep repeating the code. 
                It is important to carefully study this part because now, for the keyboard events, we just needed to call the functions for previous and next slide.

    
*/

// Let's start by attaching an event handler to a keyboard event so we can also slide through the slider. Remember that we handle keyboard events right at the document.

document.addEventListener("keydown", function (e) {
  // console.log(e); // REMEMBER - to see which keys we want to use. If you press the key you will see the "code" that you need to use.

  if (e.key === "ArrowLeft") {
    if (currentSlide === 0) {
      currentSlide = maxSlide - 1; // So that we go to the last slice
    } else {
      currentSlide--;
    }

    slides.forEach((slide, i) => {
      slide.style.transform = `translateX(${100 * (i - currentSlide)}%)`;
    });
  } else if (e.key === "ArrowRight") {
    if (currentSlide === maxSlide - 1) {
      currentSlide = 0;
    } else {
      currentSlide++;
    }

    slides.forEach((slide, i) => {
      slide.style.transform = `translateX(${100 * (i - currentSlide)}%)`;
    });
  }
  activateDot(currentSlide); // Change the active class
});

// Now to work with the dots, take a look to the html. We have an empty container (div) with the class of dots in which we're gonna create the dots (they don't exist on the page at this moment).

const dotContainer = document.querySelector(".dots"); // Let's start by selecting the element.

// If you take a look to the final version of the page, you will see that each dot is going to be one element with the class of dots__dot and the data attribute with the number of the slide that clicking the button will go to.
// One more time, the data attribute holds some data that we need to make the functionality work.

// Now we create a function to create the dots, what we want is to create one element for each of the slides:

const createDots = function () {
  slides.forEach(function (slides, i) {
    dotContainer.insertAdjacentHTML(
      "beforeend",
      `<button class="dots__dot" data-slide="${i}"></button>`
    );
  }); // the simplest way of doing this is to loop over the slides, because then we can do something for each of them. It's not really about the slides, it's just so we can do this for all of the slides, improving functionality even if we add more of them.
  // Notice that we don't care about the slides parameter, but we want the index, an underscore should be placed in cases like this. Beforeend is as the last child.
};

createDots(); // We need to call the function to create the dots of course.

// Now let's actually make them work, for this we are going to use event delegation (so we don't have to attach one event handler to each dot, but instead to the common parent "dot container"), so if the event (clicked button) has the class of the buttons.

dotContainer.addEventListener("click", function (e) {
  if (e.target.classList.contains("dots__dot")) {
    // console.log("dot"); // to check if it's working

    // const slide = e.target.dataset.slide; // Because data-slide, slide is the name
    const { slide } = e.target.dataset; // Same thing with destructuring, because the name is the same.

    // console.log(slide); // 0, 1, 2

    // Now what we want is to go to the slide that we've selected. With the refactored code we just needed to call the function - REMEMBER TO SEE THIS.

    slides.forEach((s, i) => {
      s.style.transform = `translateX(${100 * (i - slide)}%)`;
    });
    activateDot(slide); // Change the active class, here is just slide
  }
});

// Now all we need to do is to add the class dots__dot--active so that we can display the active button (change the background color). We need this functionality in many places, not only when we click on the dots, but also when we press the keys or the arrows. For this we need to create a different function.

const activateDot = function (slide) {
  // Like we did previously, we need to first remove the class from all the dots.
  document
    .querySelectorAll(".dots__dot")
    .forEach((dot) => dot.classList.remove("dots__dot--active"));

  // Now we add the class to the one that is displaying.

  // MY SOLUTION
  // document.querySelectorAll(".dots__dot").forEach((dot) => {
  //   if (dot.dataset.slide === String(slide))
  //     dot.classList.add("dots__dot--active");
  // });

  // COURSE SOLUTION - It produces the same result, however this one is much better. My only doubt was related with the use of the [] to dynamically select the slide, remember when we wanted to select images based on the data-src - document.querySelectorAll('img[data-src]')
  // It's procedural, we need to use them always in these situations. One more time, check the clean code at the end because, in the refactored code, we just needed to call this function in the arrows, keyboard and buttons, passing the current slide.

  document
    .querySelector(`.dots__dot[data-slide="${slide}"]`)
    .classList.add("dots__dot--active");
};

activateDot(0); // This should be in the initial code. So we have the class when we reload or enter the page. Notice the code refactored at the end, the functionality is all in one function so we don't pollute the global namespace. We are going to talk about this further ahead, but keep it in mind because it is very IMPORTANT.

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/*

    LECTURE: Lifecycle dom events.

    Let's take a look at a couple of different events that occur in the dom during a webpage lifecycle.

    When we say lifecycle, we mean right from the moment that the page is first accessed until the user leaves it.

    
*/

// 1 - The first event that we need to talk about is called dom content loaded. This event is fired by the document as soon as the html is completely parsed. Which means that the html has been partially downloaded and been converted to the dom tree.

// Also, all scripts must be downloaded and executed before the dom content loaded event can happen.

// We can listen to that event and, since it happens on the document we call the add event listener. The name of the event is domContentLoaded.

document.addEventListener("DOMContentLoaded", function (e) {
  // This event does not wait for images and other external resources to load, just html and javascript need to be loaded

  console.log("HTML parsed and DOM tree built", e); // you can go to the network and set it to fast 3g to see the milliseconds.
});

// 2 - The second event is called load event. The load event is fired by the window as soon as, not only the HTML is parsed, but also all the images and external resources like css files are also loaded. Basically, when the complete page has finished loading is when this event gets fired. Load time in the network tab.

window.addEventListener("load", function (e) {
  console.log("Page fully loaded", e);
});

// 3 - The before unload event is also fired on window. This event is created immediately before a user is about to leave the page. Good to ask if the user is sure to leave the page, however now it just works when we want to reload, closing the tab is possible without the prompt.

// window.addEventListener("beforeunload", function (e) {
//   e.preventDefault();
//   console.log(e);
//   e.returnValue = "";
// });

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/*

    LECTURE: Efficient script loading: DEFER and ASYNC. (pdf required to review)

    To finish this section, let's take a look at different ways of loading a javascript script in html. 

    It's all in the pdf, basically defer in the head  is the way to go. To support old browser's keep placing the script tag at the end of the html.

    In our application we have the script at the end of the html body, before moving it to the head, check the network tab, choose fast 3g just so we can see the files being loaded. The DOM content loaded was 1.67s and the load 2.26 (the script had some stalled time just like presented in the lecture). 

    Now, move it to the head and add the defer attribute. 1.24 and 1.92       
*/
