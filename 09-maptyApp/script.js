"use strict";

// prettier-ignore
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const form = document.querySelector(".form");
const containerWorkouts = document.querySelector(".workouts");
const inputType = document.querySelector(".form__input--type");
const inputDistance = document.querySelector(".form__input--distance");
const inputDuration = document.querySelector(".form__input--duration");
const inputCadence = document.querySelector(".form__input--cadence");
const inputElevation = document.querySelector(".form__input--elevation");

////////////////////////////////////////////////////////////////////////////////////////

/*

    Lecture: Project planning. Check pdf.

    There are many different ways of planning a project, this one is good for small and medium sized projects.

    Many companies use the idea of user stories, a user story is basically a description of the app functionality from the user's perspective.

    All stories put together describe the entire application.

    User stories are a high level overview of the whole application, which allows developers to determine the exact features that we need to implement.

    Then, to visualize the different actions that the user can take and how the program react to these actions, we put all the features into a nice flowchart.

    Once we know exactly what we're gonna build, it's time to think about how we're gonna build it. This brings us to the project's architecture.

    In this context, architecture means how we will organize our code and what javascript features we will use (what holds all the code together).

    This marks the end of the planning step, so we are ready to move on to the DEVELOPMENT step. Where we implement the plan that we created using javascript code.

    In the case of the app that we are about to create, the user story could be something like this:

        As a user, i want to log my running workouts with location, distance, time, pace and steps per minute. Also, as a user, i want to log my cycling workouts with location, distance, time, speed and elevation gain.

        This clearly tells us WHO wants to perform WHICH action and WHY.

    CHECK THE PDF.

    In the flow chart, the yellow parts are the actions, the green parts are when we render something on the user interface and the red mark operations that happen asynchronously.

*/

////////////////////////////////////////////////////////////////////////////////////////

/*

    Lecture: Using the geolocation api.

    This is called an api because, in fact, it is a browser api, just like the internationalization or timers.

    There are many modern api's, like to access the user's camera or to make the user's phone vibrate. CHECK THEM OUT.

*/

// Just to make sure that we don't get any errors in an old browser, we can test if the navigator.geolocation actually exists:

/*
UNCOMMENT BEFORE PUSH
if (navigator.geolocation)
  // Run the following code
  navigator.geolocation.getCurrentPosition(
    function (position) {
      console.log(position); // To test

      // Let's now take the position out of the object:

      //   const latitude = position.coords.latitude;
      //   const longitude = position.coords.longitude;

      // With destructuring
      const { latitude } = position.coords;
      const { longitude } = position.coords;

      // Creating a link to test:
      //   console.log(`https://www.google.com/maps/@${latitude},${longitude}`);
    },
    function () {
      alert("Could not get your position!");
    }
  );
*/
// This function takes two callback functions as an input.

// The first one is the callback function that will be called on success (whenever the browser successfully got the coordinates od the current position of the user).

// The second callback is the error callback, which is the one to be called when there happened an error while getting the coords.

// The first function is called with a parameter that is called the position parameter, first we just log it to the console to test.

// The second callback is simply an alert.

// Now we can already see the browser asking permission to use our location. If we click block, the alert appears in the ui.

// When we allow the location, we get the position object in the console. What we are interested in are the coords (lat and long)

////////////////////////////////////////////////////////////////////////////////////////

/*

    Lecture: Displaying a map using leaflet library.

    We are going to learn how to display a map using a third party library called leaflet.

    Whenever we use a third party library, the first thing to include it in our site. 

    We are going to use the hosted version of leaflet. We will need a css and a javascript file.

    There are also a bit more elegant ways of including javascript, using a packet manager like npm. This is how we will do it in the future.

    For now, the easiest way to get started is to simply include a hosted version that is on a cdn. Grab the code and paste it in the html's head, before our own script - IMPORTANT.

    Also include the defer attribute. This is a perfect example for when we need to use the defer attribute because, again, the order in which the scripts are downloaded is very important.

    It is in our script where we will use the leaflet library. So, by the time that our script loads, the browser must already have downloaded the leaflet library.

    We already included the library into our site, but of course we need to do something with it. By itself, the leaflet script doesn't do anything.

    We need to use the functions that are defined in this library to our advantage. 

    In the overview tab, there is a very simple example of how we could implement a map with a certain coordinates and also how to display a very simple marker. 

    Copy that code and paste it.
   
*/

/*
UNCOMMENT BEFORE PUSHING
if (navigator.geolocation)
  navigator.geolocation.getCurrentPosition(
    function (position) {
      console.log(position);

      const { latitude } = position.coords;
      const { longitude } = position.coords;

      // Paste the code:

      const coords = [latitude, longitude]; // We need this array on the setView and marker methods.

      const map = L.map("map").setView(coords, 13); // The string that we pass into the L.map function must be the id name of an element in our html (where the map will be displayed).
      // The second argument of the serView method is the zoom.
      // In our example the div at the end of the code.

      L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(map);

      // Let's talk about the tileLayer. The map that we see on the page is made of small tiles, these tiles come from the url that is specified.
      // We are going to use open street map, but leaflet works with all other kinds of maps as well.
      // We can use the url to change the appearance of our map, in this lesson we changed https://tile.openstreetmap.fr/hot/{z}/{x}/{y}.png from https://tile.openstreetmap.org/{z}/{x}/{y}.png. DIDN'T work, find others.

      L.marker(coords)
        .addTo(map)
        .bindPopup("A pretty CSS popup.<br> Easily customizable.")
        .openPopup();
    },
    function () {
      alert("Could not get your position!");
    }
  );
*/

////////////////////////////////////////////////////////////////////////////////////////

/*

    Lecture: Displaying a map marker.

*/

// We are going to display a marker whenever we click on the map. For that we are going to use the leaflet library again.

/*
UNCOMMENT BEFORE PUSH
if (navigator.geolocation)
  navigator.geolocation.getCurrentPosition(function (position) {
    console.log(position);

    const { latitude } = position.coords;
    const { longitude } = position.coords;

    const coords = [latitude, longitude];

    map = L.map("map").setView(coords, 13);

    L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);

    // To create a marker
    L.marker(coords)
      .addTo(map)
      .bindPopup("A pretty CSS popup.<br> Easily customizable.")
      .openPopup();

    // 1.
    // console.log(map); // Here you can see the on method (inherited)

    map.on(
      "click",
      function (mapE) {
        mapEventLeaflet = mapE;
        // 3.
        form.classList.remove("hidden"); // Show the form whenever we click.
        inputDistance.focus(); // To focus the cursor on the distance whenever we click.

        // 2.
        // console.log(mapEventLeaflet); // coords in the object.
        //     const { lat, lng } = mapEventLeaflet.latlng;

        //     L.marker([lat, lng])
        //       .addTo(map)
        //       .bindPopup(
        //         L.popup({
        //           maxWidth: 250,
        //           minWidth: 100,
        //           autoClose: false,
        //           closeOnClick: false,
        //           className: "running-popup",
        //         })
        //       )
        //       .setPopupContent("Workout")
        //       .openPopup(); // Read leaflet documentation.
        //   });
      },
      function () {
        alert("Could not get your position!");
      }
    );
    */

/*
1.
    The first thing that we need to do is to add the event handler to the map, so that we can then handle any incoming clicks.

    Should we attach an event listener to the hole map element? This wouldn't work because we wouldn't have a way of knowing where exactly the user clicked.

    We need to access to the coords of the point that was just clicked.

    We cannot use the add event listener that we've been using all the time.

    But we can use something similar that is available on the leaflet library.

    This is where the map variable comes into play for the first time.

    We stored the result of the map into a variable because it is on map that we can add an event listener.

    Remember that the on method does not come from javascript itself, it is coming from the leaflet library.

    When leaflet calls the on method, it will do so with a special event. If we log it, we can see an object that contains the coords that we need.

2.
    We can now add a marker at that point. We use destructuring again and place the values in an array.

    .marker creates the marker; .addTo adds it to the map; bindPopup create a popup and binds it to the marker (here we can create a brand new popup object instead of specifying a string)

*/

////////////////////////////////////////////////////////////////////////////////////////

/*

    Lecture: Rendering workout input form.

    Now what we want in that event handler that we set up is to render the form, so that a new workout can be added.

    Then, on that form, we will add an event listener, so whenever that form is submitted, only then the marker is rendered on the map.

    The form that we want to render is the one with the class of "form", which is already selected in our code above.

    Check 3 in the code above.

*/

// Now let's add an event handler to the form for submitting it. For now we are not going to care about the data.

// All we want is whenever the form is submitted, a marker appears on the page, exactly at the place that was previously clicked.

// Notice that we don't even have a submit button, but remember that whenever we hit the enter key on a form that will also trigger the submit event.

// This event listener needs to be made outside of the previously of course.

// Notice that, when we paste the code in this event listener, we are trying to use two variables that do not exist in the global scope.
// They exist on the scope of the callback of the geolocation api - navigator.geolocation.getCurrentPosition.

// We are trying to access mapEventLeaflet and map. The map is easy to fix, all we have to do is to create a global variable and reassign the const in the callback.

// For mapEventLeaflet, we do the same thing, create a global variable, change the name in map.on and reassign it on that same function.

// This because we don't need the map event in the map.on, but it is the place where we have access to it, so we copy it to a global variable.

// It will not work if we don't select the event to prevent the default behavior.

// Now it is working, but this form is far from complete. We need to clear all the input fields value. A.

/*
UNCOMMENT BEFORE PUSH
form.addEventListener("submit", function (e) {
  e.preventDefault();

  // clear input fields - A.
  inputDistance.value =
    inputDuration.value =
    inputCadence.value =
    inputElevation.value =
      "";

  const { lat, lng } = mapEventLeaflet.latlng; // Here is where we need it.

  L.marker([lat, lng])
    .addTo(map)
    .bindPopup(
      L.popup({
        maxWidth: 250,
        minWidth: 100,
        autoClose: false,
        closeOnClick: false,
        className: "running-popup",
      })
    )
    .setPopupContent("Workout")
    .openPopup(); // Read leaflet documentation.
});

// Now, what we want to do is whenever we click on cycling (type), the cadence should change to elevation.

// This is actually easier than it looks because there is actually an event which is triggered whenever we change the value of this select element (see html).

// Let's listen for that event and, whenever it happens, we will hide and display the corresponding fields. "form__input--type".

// Notice that the event is called change.

// The input elevation is the element that we are going to work with, but the one that has the hidden class is the closest parent with the form__row class.

// We are going to toggle the hidden class both on the elevation gain and on the cadence (there will be only one of them visible).

inputType.addEventListener("change", function () {
  inputElevation.closest(".form__row").classList.toggle("form__row--hidden");
  inputCadence.closest(".form__row").classList.toggle("form__row--hidden"); // We are selecting parents, so we need the selector.
});
*/
////////////////////////////////////////////////////////////////////////////////////////

/*

    Lecture: Project architecture. Check pdf.

    In this project, the main structure will come from classes and objects.

    One of the most important aspects of any architecture is to decide where and how to store the data.

    Data is the most fundamental part of any application.

    In this case, the data that we need to store and manage comes directly form the user stories.

    We will need to store the location, distance, time, pace and steps per minute for the running.

    Location, distance, time, speed and elevation for the cycling user story.

    We will design our classes so that they can create objects that will hold this kind of data.

    Check the pdf now. We are going to have a parent class called workout which will hold the distance, duration and coords.

    Then we will have a more specific class for running, which will hold the cadence and the pace and one for cycling, which holds the elevation and speed.

    The reason that the classes are designed like this is because the distance, duration and coords are common to both of the types of activities.

*/

////////////////////////////////////////////////////////////////////////////////////////

/*

    Lecture: Refactoring the code for project architecture.

*/

class App {
  #map;
  #mapEventLeaflet;
  #workouts = [];

  constructor() {
    this._getPosition();
    form.addEventListener("submit", this._newWorkout.bind(this));

    inputType.addEventListener("change", this._toggleElevationField); // Does not use the this keyword so we don't need to bind.
  }

  _getPosition() {
    if (navigator.geolocation)
      navigator.geolocation.getCurrentPosition(
        this._loadMap.bind(this), // We must bind the this keyword
        function () {
          alert("Could not get your position!");
        }
      );
  }

  _loadMap(position) {
    const { latitude } = position.coords;
    const { longitude } = position.coords;

    const coords = [latitude, longitude];

    this.#map = L.map("map").setView(coords, 13);

    L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(this.#map);

    this.#map.on("click", this._showForm.bind(this));
  }

  _showForm(mapE) {
    this.#mapEventLeaflet = mapE;
    form.classList.remove("hidden");
    inputDistance.focus();
  }

  _toggleElevationField() {
    inputElevation.closest(".form__row").classList.toggle("form__row--hidden");
    inputCadence.closest(".form__row").classList.toggle("form__row--hidden");
  }

  _newWorkout(e) {
    e.preventDefault();

    // CREATING A NEW WORKOUT LECTURE:

    // HELPER functions
    const validInputs = (...inputs) =>
      inputs.every((inp) => Number.isFinite(inp));
    const allPositive = (...inputs) => inputs.every((inp) => inp > 0);
    // If one of them is false we trigger the alert, that's why we use the !

    // Get data from form

    const type = inputType.value; // Check html - value running for running and vice versa.

    const distance = +inputDistance.value; // Coming as string, hence the plus to convert.

    const duration = +inputDuration.value;

    // The cadence and the elevation gain, we don't want to get them here at the beginning, we only want the first if the workout is running and the second if it is cycling.
    let workout;
    const { lat, lng } = this.#mapEventLeaflet.latlng; // Let's bring it here

    // Check if data is valid

    // If workout running, create running object

    if (type === "running") {
      const cadence = +inputCadence.value;

      // Check if data is valid - or because it should return when one is not a nr, not all.
      if (
        // !Number.isFinite(distance) ||
        // !Number.isFinite(duration) ||
        // !Number.isFinite(cadence)
        !validInputs(distance, duration, cadence) ||
        !allPositive(distance, duration, cadence) // Check helper functions.
      )
        return alert("Inputs have to be positive number"); // Guard clause - check for the opposite of what we want to return immediately if that is true.

      // Add new object to workout array

      workout = new Running([lat, lng], distance, duration, cadence);
    }
    // If workout cycling, create cycling object

    if (type === "cycling") {
      const elevation = +inputElevation.value;

      if (
        !validInputs(distance, duration, elevation) ||
        !allPositive(distance, duration) // Check helper functions. Elevation can be negative.
      )
        return alert("Inputs have to be positive number");

      workout = new Cycling([lat, lng], distance, duration, elevation);
    }
    // Add new object to workout array

    this.#workouts.push(workout); // # created in the private class fields
    console.log(workout);
    // Render workout on map as marker
    // const { lat, lng } = this.#mapEventLeaflet.latlng;

    L.marker([lat, lng])
      .addTo(this.#map)
      .bindPopup(
        L.popup({
          maxWidth: 250,
          minWidth: 100,
          autoClose: false,
          closeOnClick: false,
          className: "running-popup",
        })
      )
      .setPopupContent("Workout")
      .openPopup(); // Read leaflet documentation.

    // Render workout on map as marker

    // Hide form and clear input fields - A.
    inputDistance.value =
      inputDuration.value =
      inputCadence.value =
      inputElevation.value =
        "";
  }
}

// Let's make this code work, because right now none of this will do anything.
// Fist we need to create an actual object out of this class (like this is all just a plan)

const app = new App();

// In order to trigger the geolocation api, the _getPosition method needs to be called, but, right now that is not happening.

// app.getPosition() - we could do this. then, this code would get executed right at the point where the app loads.
// However, why should we do this out here if we could do it inside of the class?
// Inside of the class, we also have a method that automatically get's called as the page loads, let's think how we could do this instead.

// Inside of the App class, we also have a method that gets executed as soon as the app object is created (the one that we've just created). That is the constructor method.

// So, we can simply get the position in the constructor. Check it.

// Now our code should already be working. The first part of our refactoring is actually completed.

// Continuing, remember that in the _loadMap method we are redefining the global variables map and mapEventLeaflet.
// But now we want everything that is related to our app inside of the Map class. So we are gonna define these variables as properties of the object.
// For that we are going to use a private class field with the #. Both of them will now become private instance properties.
// Of course we need to fix the rest of the code where they appear.

// Now for both of the event listeners that we have outside of the class. The one listening for the event of submitting the form and the one of toggling the input type field.

// We want these event listeners to be set right at the beginning, when the script loads, but inside of the class.

// What is the method that automatically gets called as soon as the script loads? the constructor.

// Of course that we need to refactor the code to its own functions. the form submission goes to the _newWorkout because submitting the form for the workout will create a new workout.

// Remember that with dom elements you need to constantly bind the this keyword.

////////////////////////////////////////////////////////////////////////////////////////

/*

    Lecture: Managing workout data: creating classes.

    In this lecture we're gonna implement classes to manage the data about our cycling and running workouts that are coming from the ui.

    Let's start implementing the parent class for both workout types.

*/

// This class will take in the data that is common to both (see the constructor).

class Workout {
  date = new Date();
  id = (Date.now() + "").slice(-10); // 1
  constructor(coords, distance, duration) {
    this.coords = coords; // [lat, long]
    this.distance = distance; // In km
    this.duration = duration; // In min
  }
}

/*

1 - Remember that in the bank project the unique identifier used to be simply the name of the account owner.

    However this is not a good practice, instead any object should have some kind of unique identifier, so that we can later identify that object using that id.

    In the real world, we usually use some kind of library in order to create good and unique id numbers. We should never create id's on our own.

    Right now we will simply use the current date to create a new id, convert it to a string and take the last 10 numbers.
*/

// Now for the child classes.

class Running extends Workout {
  constructor(coords, distance, duration, cadence) {
    super(coords, distance, duration);
    this.cadence = cadence;

    this.calcPace(); // Using the constructor to immediately calculate the pace.
  }

  // Method for calculating the pace

  calcPace() {
    // Min/km
    this.pace = this.duration / this.distance; // Adding a new property.
    return this.pace;
  }
}

class Cycling extends Workout {
  constructor(coords, distance, duration, elevationGain) {
    super(coords, distance, duration);
    this.elevationGain = elevationGain;

    this.calcSpeed(); // Using the constructor to immediately calculate the speed.
  }

  // Method for calculating the speed

  calcSpeed() {
    // Km/h
    this.speed = this.distance / (this.duration / 60); // Because the duration is in hours.

    return this.speed;
  }
}

// Let's test these classes

// const run1 = new Running([39, -12], 5.2, 24, 178);
// const cycling1 = new Cycling([39, -12], 27, 95, 523);

// console.log(run1, cycling1); // Notice how the id is the same, when using the app that is going to be fine because we can't create two workouts simultaneously.

////////////////////////////////////////////////////////////////////////////////////////

/*

    Lecture: Creating a new workout.

    Using the workout classes that we've just implemented, let's now finally implement the feature of creating a new workout from our user interface.

    If you take a look at the flowchart, the user submits a new workout is the one that we are interested in.

    Everything is going to happen whenever we hit enter, so remember that we added an event listener to the constructor of the App class (where we have the callback function of new workout). 

    This to sat that all the code will be written in the _newWorkout method. 

    Check the code above.
*/
