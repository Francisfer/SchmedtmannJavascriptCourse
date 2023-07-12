"use strict";

const btn = document.querySelector(".btn-country");
const countriesContainer = document.querySelector(".countries");

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/*

    Lecture: Asynchronous javascript, AJAX and API's (pdf)

    To understand what asynchronous javascript code actually is, we first need to understand what synchronous code is.

    Most of the code that we've been writing is synchronous code, it simply means that the code is executed line by line in the exact order of execution that we define in our code.

    Each line of code always waits for the previous line to finish execution.

    This can create problems when one line of code takes a long time to run. When we create an alert we block the code execution.

    Remember that timers are asynchronous and non blocking code.

    Resuming, asynchronous programming is all about coordinating the behavior of our program over a certain period of time.

    Ajax stands for Asynchronous Javascript And XML and allows us to communicate with remote web servers in an asynchronous way.

    In practice, we make Ajax calls in our code in order to request some data from a web server dynamically.

    Let's understand how Ajax works. Say that we have our javascript application running in the browser (client).

    We want the application to get some data from a web server, let's say the data about countries.

    With Ajax, we can do an HTTP request to the server which has this data. The server will then set back a response containing that data that we requested.

    This back and forth between client and server, all happens asynchronously in the background. There can even be different types of requests, like get requests to receive data or post requests to send data to a server.

    When we are asking a server to send us some data, this server usually contains a web API. This API is the one that has the data that we are asking for.

    An api is something very important, it stands for Application Programming Interface.
    
    It's a piece of software that can be used by another piece of software in order to allow applications to talk to each other.

    In javascript and web development, there are countless types of api's (DOM api, geolocation api, etc.). These are called api's because they are a self-contained piece of software that allows other pieces of software to interact with them.

    Remember that we can also implement a small and simple api in a class where we make some methods available as a public interface.

    So, objects made from a class can be seen as self-contained encapsulated pieces of software that other pieces of software can interact with.

    The important type of api's that we are actually interested in when we use ajax are so called online/web api's.

    An online API is essentially an application running on a web server, which receives requests for data, retrieves this data from some database and then sends it back to the client.

    Of course we can build our own online api's, but that requires back end development. So, for now, we are interested in third party api's.

    To finish this lecture, let's just talk about api data formats. Ajax stands for Asynchronous Javascript And XML, XML is a data format which used to be widely used to transmit data on the web.

    These day's, basically no api uses xml data anymore, instead, most of the api's use the JSON data format. The JSON data format is basically a javascript object converted to a string.
*/

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/*

    Lecture: Our first ajax call: XML HTTP REQUEST.


    Instead of: https://restcountries.eu/rest/v2/

    Use: https://countries-api-836d.onrender.com/countries/ Whenever we use the countries api is this section.


*/

// In javascript, there are multiple ways of doing ajax calls. We are going to start with the most old school one, which is called the XML HTTP request function.

const getCountryData = function (country) {
  const request = new XMLHttpRequest();
  // console.log(request); // Object

  // Next, we first need to pass the type of request to get data and, second, we need a string containing the url to which the ajax call should be made.

  // On github, there is a huge repository called public apis, the one that we are going to use is called REST Countries.

  // We can see on the top of the table if the api needs authentication, if it uses https and if it has CORS.

  // CORS is very important, any api that you use should always have cors set to yes or unknown. It stands for Cross Origin Resource Sharing, without it we cannot access a third party api from our code.

  // In the documentation, we are looking for a api endpoint, which is essentially just another name for the url that we need.

  request.open("GET", `https://restcountries.com/v3.1/name/${country}`);

  // With this, we basically opened the request, next we need to also send it.

  request.send(); // Here we send off the request, which fetches the data. Once it finishes, it emits the load event, which we are waiting for.

  // In order to get the result, we need to register a callback on the request object for the load (where we will wait for the load) event:

  request.addEventListener("load", function () {
    // console.log(this.responseText); // or request. the response is in the property response text. JSON

    const [data] = JSON.parse(this.responseText);
    console.log(data); // An array containing one object. So we need to destructure it with the [] to immediately get the object.

    // Now we can build the card component, we need to copy the html from the comment.

    const [currency] = Object.getOwnPropertyNames(data.currencies);
    const [language] = Object.getOwnPropertyNames(data.languages); // Because the api changed again

    const html = `
    <article class="country">
    <img class="country__img" src="${data.flags.png}" />
    <div class="country__data">
        <h3 class="country__name">${data.name.common}</h3>
        <h4 class="country__region">${data.region}</h4>
        <p class="country__row"><span>👫</span>${(
          +data.population / 1000000
        ).toFixed(1)} people</p>
        <p class="country__row"><span>🗣️</span>${data.languages[language]}</p>
        <p class="country__row"><span>💰</span>${
          data.currencies[currency].name
        }</p>
    </div>
    </article>`;

    countriesContainer.insertAdjacentHTML("afterend", html);
    countriesContainer.style.opacity = 1;
  });
};
// Now let's actually reuse the code to create an element like this one for multiple countries.
// All we need to do is to put all the code into a function and, dynamically get the country name.

// getCountryData("portugal");
// getCountryData("germany");
// getCountryData("spain");
// getCountryData("usa");
// getCountryData("china"); // Logs taiwan
// getCountryData("russia");
// getCountryData("japan");
// getCountryData("mexico");

// Notice that if we reload the page, the cards might appear in a different order. This happens because the data arrives at a slightly different time.

// This proves the non blocking behavior, if we wanted the requests to be made in specific order, we would have to chain the requests. check the next lectures.

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/*


    Lecture: Welcome to Callback hell.

    In this lecture, we are going to create a sequence of AJAX calls, so that the second one runs only after the first one has finished.

    In the countries data, there is a property for the borders. What we will do is after the first ajax call is completed, we will get the boarder and, based on the code, render the neighboring country.


*/

const renderCountry = function (data, className = "") {
  const [currency] = Object.getOwnPropertyNames(data.currencies);
  const [language] = Object.getOwnPropertyNames(data.languages);

  const html = `
      <article class="country ${className}">
      <img class="country__img" src="${data.flags.png}" />
      <div class="country__data">
          <h3 class="country__name">${data.name.common}</h3>
          <h4 class="country__region">${data.region}</h4>
          <p class="country__row"><span>👫</span>${(
            +data.population / 1000000
          ).toFixed(1)} people</p>
          <p class="country__row"><span>🗣️</span>${data.languages[language]}</p>
          <p class="country__row"><span>💰</span>${
            data.currencies[currency].name
          }</p>
      </div>
      </article>`;

  countriesContainer.insertAdjacentHTML("beforeend", html);
  //   countriesContainer.style.opacity = 1;
};

const getCountryAndNeighbor = function (country) {
  // AJAX call country one
  const request = new XMLHttpRequest();

  request.open("GET", `https://restcountries.com/v3.1/name/${country}`);

  request.send();

  request.addEventListener("load", function () {
    const [data] = JSON.parse(this.responseText);
    console.log(data);

    // After exporting the functionality, we call the function to render here:
    renderCountry(data);

    // Now to get the neighbor country two

    const neighbor = data.borders?.[0]; // Optional chaining to check if borders property exist, if so get the element at position 0.
    console.log(neighbor);
    // if the countries have no neighbors at all

    if (!neighbor) return;

    // Now we can make the second AJAX call - here we don't want to use the name of the country, but the cca code.
    // We just need to change the api url to search by the code.

    const request2 = new XMLHttpRequest();

    request2.open("GET", `https://restcountries.com/v3.1/alpha/${neighbor}`);

    request2.send();

    // Now we need to listen for the load on this new request

    request2.addEventListener("load", function () {
      const [data2] = JSON.parse(this.responseText);
      console.log(data2);
      renderCountry(data2, "neighbour"); // There is a class that formats the neighbors, we just pass it into the function.
    });
  });
};

// getCountryAndNeighbor("usa");

// Notice how we have a callback function inside of another one (also called nested callbacks).

// Now imagine that we wanted to do more requests in sequence, we would end with callbacks inside of callbacks inside of callbacks...

// For this we have a special name, which is callback hell. Callback hell is when we have a lot of nested callbacks in order to execute asynchronous tasks in sequence.

// This makes the code hard to read and reason about.

// Fortunately, there is a way of escaping callback hell by using something called promises.

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/*

    Lecture: Promises and the fetch api.

    Let's learn how to avoid the callback hell with a modern feature called promises.

    Check pdf.

*/

// Before learning about promises, let's actually see one, so let's replace the old XMLHttpRequest() function with the modern way of making AJAX calls.

// That's by using the fetch api.

// This is how we used to do it:
// const request = new XMLHttpRequest();
// request.open("GET", `https://restcountries.com/v3.1/name/${country}`);
// request.send();

// This is the new way:

// const requestFetch = fetch("https://restcountries.com/v3.1/name/portugal");

// console.log(requestFetch); // You can see that the fetch function immediately returns a promise

// But what exactly is a promise and what can we do with it? A promise is an object that is used as a placeholder for the future result of an asynchronous operation.

// Less formal, a promise is a container for an asynchronous delivered value. A container for a future value.

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/*

    Lecture: Consuming promises.

    In this lecture we will consume the promise that was returned from the fetch function.

*/

const requestFetch = fetch("https://restcountries.com/v3.1/name/portugal");
console.log(requestFetch); // pending

// Let's now implement the get country data function from the first lecture, but this time using a promise.

const getCountryDataPromise = function (country) {
  // Here we will want the fetch function
  // Assuming that the promise will be fulfilled, so that we have a value available to work with, we call the then() method to handle this fulfilled state:
  // Into the then() we need to pass a callback function that we want to be executed as soon as the promise is actually fulfilled (as soon as the result is available).
  // This callback receives one argument once it's called by javascript, this argument is the resulting value of the fulfilled promise (response).

  fetch(`https://restcountries.com/v3.1/name/${country}`)
    .then(function (response) {
      // At this point, this is how we handle a fulfilled promise.

      console.log(response); // We get the response, even the type of the object is called response. We have some data about the response, like the status code, but what we are interested in is the data, which is in the body property.
      // The body is ReadableStream, we cannot yet really look at the data. In order to actually read the data we need to call the JSON method on the response.

      // response.json(); // The json() is a method that is available on the response object that is coming from the fetch function (all the resolved values).
      // The problem here is that this json() function is also an asynchronous function, which means that it will also return a new promise.
      // So what we need to do is to return this new promise from here:

      return response.json();

      // And handle that promise with another then() on the chain. This time let's call the parameter data, because the resolved value of this promise is going to be data itself:
    })
    .then(function (data) {
      console.log(data); // Here we are back to having the same data as before, but this time using two promises.

      // Now we just need to call the render function that we've created before.

      renderCountry(data[0]); // Remember that we can destructure the parameter
    });
};

// getCountryDataPromise("spain");

// We can simplify this code a lot by getting rid of the console.log's and, mainly, by using arrow function so that the returns happens implicitly:

const getCountryDataPromiseArrow = function (country) {
  fetch(`https://restcountries.com/v3.1/name/${country}`)
    .then((response) => response.json())
    .then((data) => renderCountry(data[0]));
};

// getCountryDataPromiseArrow("ukraine");

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/*

    Lecture: Chaining promises.

    Let's now learn how to chain promises in order to also render the neighboring country.

    We already have a small chain of promises because of the json() function, so the two then() called in sequence are already a small chain.

    But we will take it to the next level by chaining two sequential ajax calls.

    Just like before, we first get data about the country, which we already have, then we get the data about the neighbor country.

    Again, the second ajax call depends on the data from the first ajax call, so they need to be done in sequence.

    We need to modify what we have because the second ajax call needs to happen on the second then()

*/

const getCountryDataPromiseArrowChain = function (country) {
  fetch(`https://restcountries.com/v3.1/name/${country}`)
    .then((response) => response.json())
    .then((data) => {
      renderCountry(data[0]);

      // As soon as we get the data, we need to get the neighbor country and do the ajax call for that one as well.

      const neighbor = data[0].borders?.[0]; // data[0] because we didn't destructure
      if (!neighbor) return;

      // Second ajax now (neighbor)
      //   fetch(`https://restcountries.com/v3.1/alpha/${neighbor}`)
      //     .then((response) => response.json())
      //     .then((data) => {
      //       console.log(data);
      //       renderCountry(data[0], "neighbour");

      // The code above represents a newbie mistake, the code actually still works, but, if you notice, we are back to the callback hell because we have a callback defined inside another one.
      // (response) => inside of the previous (data) =>
      // What we need to do is to return the promise and keep the chain with that returned value:

      return fetch(`https://restcountries.com/v3.1/alpha/${neighbor}`);
    })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      renderCountry(data[0], "neighbour");
    });
};

// getCountryDataPromiseArrowChain("germany");

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/*

    Lecture: Handling rejected promises. 

    Until now, we have always assume that everything went well with the ajax calls, so we never handled errors.

    First, remember that a promise in which a error happens is a rejected promise, in this lesson we're gonna learn how to handle promise rejections.

    The only way in which the fetch promise rejects is when the user loses his internet connection.

    For now, that will be the only error that we will handle here.

    To simulate losing internet connection, go to network, online, change the speed to offline and disable cache.

    However, when we reload the page, everything will disappear and that's not what we want.

    We want to simulate that the page was first still loaded, but then, as the user does the request without internet, we want to see the error happening.

    Hence the use of the button, we only want to call the function when the user clicks on it, so uncomment it from the html. 

*/

// Now, when we do the requests, we get ERR_INTERNET_DISCONNECTED and, the most important for our example - Uncaught (in promise) TypeError: Failed to fetch

// So, for the first time, the promise that's returned from the fetch function was rejected.

// There are two ways of handling rejections:

// 1 - The first one is to pass a second callback function into the first then() method. This first callback is always gonna be called for the fulfilled promise.
// But we can also pass in a second callback, which will be called when the promise was rejected.
// This callback will be called with an argument which is the error itself.
// Now we handled the error by displaying the alert window, also, the error that we saw previously is now gone. This is called catching the error.
// What if the first promise was fulfilled, but the second one was rejected? We would need to catch the error there as well.
// This is a little bit annoying and there is a better way of handling all these errors globally, just in one central place.

// 2 - This is done by adding the catch() method at the end of the chain (it catches any errors that occur anyplace in the promise chain).

// 3 - Just to finish, there is one more quick method that is also available on all promises. Besides then and catch, there is also the finally() method.
// The callback function that we define there will always be called, whatever happens with the promise (fulfilled or rejected). That's the difference between the other two.
// The then() is called when the promise is fulfilled and the catch() is called when the promise is rejected.
// The finally method is not always useful, but sometimes it is. We use this method for something that always needs to happen, no matter the result of the promise.
// One example of that is to hide a loading spinner, like the rotating circles that appear when loading.
// These apps show a spinner when a asynchronous operation starts and then hide it when the operation completes.
// In our example, what always needs to happen is the fade in of the container, so we can do it here instead of doing it in the functions.

const renderError = function (message) {
  countriesContainer.insertAdjacentText("beforeend", message);
  //   countriesContainer.style.opacity = 1;
};

const getCountryHandlingErrors = function (country) {
  fetch(`https://restcountries.com/v3.1/name/${country}`)
    .then(
      (response) => response.json()
      //(error) => alert(error) // 1
    )
    .then((data) => {
      renderCountry(data[0]);
      const neighbor = data[0].borders?.[0];
      if (!neighbor) return;

      return fetch(`https://restcountries.com/v3.1/alpha/${neighbor}`);
    })
    .then(
      (response) => response.json()
      //(error) => alert(error) // 1
    )
    .then((data) => {
      console.log(data);
      renderCountry(data[0], "neighbour");
    })
    .catch((error) => {
      // Check the console.error
      console.error(`${error} 🧨🧨🧨🧨`);

      // Usually, simply logging the error to the console is not enough in a real application with a real user interface.
      // So let's also display an error message for the user to see. It is a more real use case of this catch block.
      // Let's create a function that will also render some kind of error outside.

      renderError(`Something went wrong 🧨🧨🧨 ${error.message}! Try again!`);
      // The error that is generated in this callback is a real javascript object, which contains the message property.
    })
    .finally(() => {
      countriesContainer.style.opacity = 1;
    });
};

// Now we just attach the event handler.
btn.addEventListener("click", function () {
  getCountryHandlingErrorsRefactored("australia");
});

// Now, let's try to simulate another error, so we can see what we're gonna do in the next lecture.

// If we try to search for a country that simply doesn't exist, our api is not going to find any result for that.

// Cannot read properties of undefined is the error displayed in the message, but it doesn't reflect the true error, which is simply that our api cannot find any country with this name.

// That is reflected with the code 404. However, the fetch promise only rejects when there is no internet connection, which means that the promise still gets fulfilled with a 404.

// There is no rejection, so the catch() cannot catch this error. It does pick up the - Cannot read properties of undefined, but that's not the one that we want to handle.

// In this case we really want to tell the user that no country was found with this name.

// getCountryHandlingErrors("kljfghlk");

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/*

    Lecture: Throwing errors manually.

    In this lecture, we're gonna fix the request 404 error that we saw happening in the previous lecture.

    The problem is that, during the fetch, there is a 404 error (that is displayed in the console), which is a different error that the catch() method displays in the message (because the promise was not rejected - REMEMBER).

    So, if the promise don't get rejected, we need to do that manually (see 1). We start by logging the response to see the object.

    Now, notice how the ok property is set to false, the reason for that is the status code 404.

    When the request goes well, the response object has the ok property set to true and the status code 200.

    So, we can reject the promise manually with base on the ok property of the response object (see 2). We create a new error with the new Error() constructor function and pass in an error message.
    
    Then, we use the throw keyword, which will immediately terminate the current function (just like return does).

    The effect of creating and throwing an error in any of these then() methods is that the promise will immediately reject.

    Basically, the promise returned by the then() handler will be a rejected promise. That rejection will then propagate all the way down to the catch handler that we have set up.

    So, the error message that we've created with new error propagates down to the catch method. There, we handle that error, and that's why now the error.message displays exactly what we've written/passed in the new error.

    See 3.
    Again, what if there was no error in the first promise, but we get a problem in the second fetch (neighbor)? 

    Say that change the neighbor variable to something that not exist, instead of getting it from the object's data[0].borders?.[0].

    It is going to be a rejection in this promise. We get another error which is not handle, we need to copy the code and handle the error there also.

    Now we get the error that we want.

*/

const getCountryHandlingErrors404 = function (country) {
  fetch(`https://restcountries.com/v3.1/name/${country}`)
    .then((response) => {
      // 1. Let's take a look at the response in this case:
      console.log(response);

      // 2.
      if (!response.ok)
        throw new Error(`Country not found! (${response.status})`);

      return response.json(); // We added a block, so we need to explicitly RETURN
    })
    .then((data) => {
      renderCountry(data[0]);
      const neighbor = data[0].borders?.[0];
      if (!neighbor) return;

      return fetch(`https://restcountries.com/v3.1/alpha/${neighbor}`);
    })
    .then((response) => {
      if (!response.ok)
        throw new Error(`Country not found! (${response.status})`);

      return response.json();
    })
    .then((data) => {
      console.log(data);
      renderCountry(data[0], "neighbour");
    })
    .catch((error) => {
      console.error(`${error} 🧨🧨🧨🧨`);

      renderError(`Something went wrong 🧨🧨🧨 ${error.message}! Try again!`);
    })
    .finally(() => {
      countriesContainer.style.opacity = 1;
    });
};

// getCountryHandlingErrors404("portugal");

// As you start to notice, we are starting to repeat ourselves too many times, which means that we need to refactor this code.

// We can build a helper function that will wrap up the fetch, the error handling and also the conversion to JSON (everything that we repeat).

// Finally, all there is left is to handle the error for when there is no neighbor, because right now we are just returning.

// If we try australia, we can see that the cl of the neighbor is undefined. So, what we want to do is throw a new error that will get caught in the catch method. check 1.

const getJSON = function (url, errorMsg = "Something went wrong") {
  // Notice that we need to return all of this
  return fetch(url).then((response) => {
    if (!response.ok) throw new Error(`${errorMsg} (${response.status})`);

    return response.json();
  });
};

const getCountryHandlingErrorsRefactored = function (country) {
  getJSON(
    `https://restcountries.com/v3.1/name/${country}`,
    "Country not found!"
  )
    .then((data) => {
      renderCountry(data[0]);
      const neighbor = data[0].borders?.[0];
      if (!neighbor) throw new Error("No neighbor found!"); // 1.

      return getJSON(
        `https://restcountries.com/v3.1/alpha/${neighbor}`,
        "Country not found!"
      );
    })
    .then((data) => {
      //   console.log(data);
      renderCountry(data[0], "neighbour");
    })
    .catch((error) => {
      console.error(`${error} 🧨🧨🧨🧨`);

      renderError(`Something went wrong 🧨🧨🧨 ${error.message}! Try again!`);
    })
    .finally(() => {
      countriesContainer.style.opacity = 1;
    });
};

// getCountryHandlingErrorsRefactored("south africa");

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/*

    Coding Challenge #1


In this challenge you will build a function 'whereAmI' which renders a country ONLY based on GPS coordinates. For that, you will use a second API to geocode coordinates.

Here are your tasks:

PART 1
1. Create a function 'whereAmI' which takes as inputs a latitude value (lat) and a longitude value (lng) (these are GPS coordinates, examples are below).

2. Do 'reverse geocoding' of the provided coordinates. Reverse geocoding means to convert coordinates to a meaningful location, like a city and country name. Use this API to do reverse geocoding: https://geocode.xyz/api.
The AJAX call will be done to a URL with this format: https://geocode.xyz/52.508,13.381?geoit=json. Use the fetch API and promises to get the data. Do NOT use the getJSON function we created, that is cheating 😉

3. Once you have the data, take a look at it in the console to see all the attributes that you received about the provided location. Then, using this data, log a message like this to the console: 'You are in Berlin, Germany'

4. Chain a .catch method to the end of the promise chain and log errors to the console

5. This API allows you to make only 3 requests per second. If you reload fast, you will get this error with code 403. This is an error with the request. Remember, fetch() does NOT reject the promise in this case. So create an error to reject the promise yourself, with a meaningful error message.

PART 2
6. Now it's time to use the received data to render a country. So take the relevant attribute from the geocoding API result, and plug it into the countries API that we have been using.
7. Render the country and catch any errors, just like we have done in the last lecture (you can even copy this code, no need to type the same code)

TEST COORDINATES 1: 52.508, 13.381 (Latitude, Longitude)
TEST COORDINATES 2: 19.037, 72.873
TEST COORDINATES 2: -33.933, 18.474

GOOD LUCK 😀
*/

// 1.

const whereAmI = function (lat, long) {
  fetch(`https://geocode.xyz/${lat},${long}?geoit=json`)
    .then((response) => {
      if (!response.ok)
        throw new Error(`Problem with geocoding (${response.status})`);
      return response.json();
    })
    .then((data) => {
      console.log(data);
      console.log(`You are in ${data.city}, ${data.country}!`);

      let countryArranged = data.country.toLowerCase();

      return fetch(`https://restcountries.com/v3.1/name/${countryArranged}`);
    })
    .then((response) => {
      if (!response.ok)
        throw new Error(`${"Country not found!"} (${response.status})`);

      return response.json();
    })
    .then((data) => {
      renderCountry(data[0]);
      const neighbor = data[0].borders?.[0];
      if (!neighbor) throw new Error("No neighbor found!");

      return fetch(`https://restcountries.com/v3.1/alpha/${neighbor}`);
    })
    .then((response) => {
      if (!response.ok)
        throw new Error(`Country not found! (${response.status})`);
      return response.json();
    })
    .then((data) => {
      renderCountry(data[0], "neighbour");
    })
    .catch((error) => {
      console.error(`${error} 🧨🧨🧨🧨 Try again!`);
      renderError(`Something went wrong 🧨🧨🧨 ${error.message}! Try again!`);
    })
    .finally(() => {
      countriesContainer.style.opacity = 1;
    });
};

// whereAmI("52.508", "13.381");
// whereAmI("19.037", "72.873");
// whereAmI("-33.933", "18.474");

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/*

    Lecture: Asynchronous behind the scenes: the event loop. (PDF)

    IMPORTANT FOR THE INTERVIEW.

    Javascript has one thread of execution - remember.

    Web apis environment are some apis provided to the engine but are actually not part of the javascript language itself (dom, timers, fetch api...).

    The callback queue is a data structure that holds all the ready to be executed callback functions that are attached to some event that has occurred.

    Whenever the call stack is empty, the event loop takes callbacks from the callback queue and puts them into the call stack, so that they can be executed. 

    The event loop is the essential piece that makes asynchronous behavior possible.

    Callbacks related to promises are not going to the callback queue. If the call stack is empty, the event loop put them in the call stack no matter if the callback queue is empty or not.

    Next we will see the event loop in practice.


*/

// console.log("Test start");

// setTimeout(() => console.log("0 sec timer"), 0); // This is a timer that should call the timer function exactly after 0 seconds.

// Promise.resolve("Resolved promise 1").then((res) => console.log(res)); // Now let's build a promise that resolves immediately. We will learn this in the next lesson but, for now, keep in mind that promise.resolve allows us to build a promise that is immediately resolved.

// console.log("Test end"); // To finish, let's just log another string.

// In what order do you think that these four messages will be logged to the console? The direct logs, then the promise and, finally the timer.

// Top level code, or code outside of any callback will run first. So the first two logs come from both synchronous cl.

// Now, between the timer and the resolved promise things can get a bit tricky. Both of them will finish at the exact same time. Both after 0 seconds.

// The timer because we told it to finish after 0 seconds, and the promise because we told it to immediately become resolved.

// Answering the question of which one will be handled first, or, in other words, which of these callbacks will be executed first:

// The timer appears first in the code, so it's callback will be put on the callback queue first, but does that mean that it will get executed first? NO

// This happens because of the microtasks queue, REMEMBER. The callback of the resolved promise will be put on the microtasks queue, and this queue has priority over the callback queue.

// So, after the hole code runs, we will have one callback on the callback queue and one callback on the microtasks queue.

// Therefore, the one on the micro should be executed first.

// Remember that the implication of the fact that microtasks have priority over regular callbacks is that if one of the microtasks takes a long time to run, then the timer will actually be delayed and not run after the 0 seconds.

// Instead, it will run a bit later, after the microtask is actually done with its work.

// Let's simulate this, remember that the promise will be resolved immediately, but the microtask that it contains (that it puts on the microtasks queue), will take a long time.

// UNCOMMENT BEFORE PUSH
// console.log("Test start");
// setTimeout(() => console.log("0 sec timer"), 0);
// Promise.resolve("Resolved promise 1").then((res) => console.log(res));

// Promise.resolve("Resolved promise 2").then((res) => {
//   // Here we will create another promise that will immediately resolve.
//   // But before logging to the console, we want this callback to have a really heavy task, which should take a lot of time.
//   // We can simulate that by looping over a large number

//   // for (let i = 0; i < 10000000000; i++) {}

//   console.log(res); // As you can see, it took a long time for this log to appear. And only after this the 0 sec timer log appeared on the screen, proving that the zero seconds are not a guarantee.

//   // You cannot do really high precision things using javascript timers. Keep that in mind when working with promises.
// });

// console.log("Test end");

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/*

    Lecture: Building a simple api.

    At this point, we know all about consuming promises, but we've never actually built our own promise.

    Remember the lottery ticket example from previous lectures, let's simulate that by using a promise.

    A fulfilled promise means to win the lottery and a rejected promise means to lose.

*/

// We create a new promise using the promise constructor (it takes exactly one argument, the so called executor function).

// As soon as the promise constructor runs, it will automatically execute the executor function that we pass in.

// As the promise constructor executes the executor function, it will do so by passing two arguments; the resolve and the reject FUNCTIONS.

// 1. Into the resolve function, we pass the fulfilled value of the promise, so that it can later be consumed with the then() method.
// Off course, we are going to handle the result of this promise just like we handled any other promise with the then() method.
// Whatever value we pass into the resolve function is going to be the result of the promise that will be available in the then(), we just pass in a string for now.

// 2. Into the reject function, we pass in the error message that we later want to be able in the catch method.

const lotteryPromise = new Promise(function (resolve, reject) {
  // this executor function that we specify here is the one which will contain the asynchronous behavior.
  // So, this executor function, should eventually produce a result value.
  // The value that is going to be the future value of the promise.
  // In the lottery example, let's say that we win in 50% of the cases and lose 50%.
  //   if (Math.random() >= 0.5) {
  //     // Then i want to call the resolve function - so we win in this case - fulfilled
  //     resolve("You win!! 🤑🤑🤑"); // See 1.
  //   } else {
  //     // Now we handle the opposite case. Where we want to mark this promise as rejected. See 2.
  //     reject("You lost your money 💩💩💩");
  //   }
  // UNCOMMENT
  //   console.log("Lottery draw is happening!!");
  //   setTimeout(function () {
  //     if (Math.random() >= 0.5) {
  //       resolve("You win!! 🤑🤑🤑");
  //     } else {
  //       reject(new Error("You lost your money 💩💩💩")); // It's better to create a new error object.
  //     }
  //   }, 5000);
});

// Now it's time to actually consume the promise.

// UNCOMMENT
// lotteryPromise
//   .then((resolvedValue) => console.log(resolvedValue))
//   .catch((error) => console.error(error));

// It works, however, right now this is not asynchronous yet. Let's simulate this lottery draw by adding a simple timer.

// This timer simulates the time that is passed between buying the ticket and getting the result.

// By using the timer, we actually encapsulated some asynchronous behavior into this promise (which is the hole point of promises in the first place).

// Most of the time, all we actually do is to consume promises, we only build promises to wrap old callback functions into promises.

// This is a process that we call promisifying. It means to convert callback based asynchronous behavior to promise based.

// Let's see how we could do this by promisify the set timeout function (creating a wait function).

const wait = function (seconds) {
  return new Promise(function (resolve) {
    setTimeout(resolve, seconds * 1000);
  });
};

// Inside of this function, we actually create and return the promise, usually that's always what we do. It is also what the fetch does, remember?

// In this case, we don't even need the reject function because it is impossible for the timer to fail. Therefore we will never mark this promise as rejected.

// The callback function of the setTimeout (so, the function that we want to be called after a certain time is the resolve function).

// We are not passing any resolved value into the resolve function because that is not mandatory and, in the case of the timer, it's also not really necessary.

// All we need to do is to make our code wait, so no resolve values are needed.

// Now we just consume that promise.

// So, after x seconds, then resolve (remember that we are not using any values, hence the ()):

// UNCOMMENT
// wait(1)
//   .then(() => {
//     console.log("1 second passed!");
//     return wait(1); // New promise
//   })
//   .then(() => {
//     console.log("2 second passed!");
//     return wait(1);
//   })
//   .then(() => {
//     console.log("3 second passed!");
//     return wait(1); // New promise
//   })
//   .then(() => {
//     console.log("4 second passed!");
//   });

// See the similarities with the fetch(), in the result of the first fetch, we would create a new fetch and return it.

// See the difference with the callback hell.

// setTimeout(() => {
//     console.log('1 second passed');
//     setTimeout(() => {
//       console.log('2 seconds passed');
//       setTimeout(() => {
//         console.log('3 second passed');
//         setTimeout(() => {
//           console.log('4 second passed');
//         }, 1000);
//       }, 1000);
//     }, 1000);
//   }, 1000);

// Way of creating a fulfilled and rejected promise immediately:

// Promise.resolve("Done").then((value) => console.log(value));
// Promise.reject(new Error("Error")).catch((error) => console.error(error));

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/*

    Lecture: Promisifying the geolocation api.

    We used the geolocation api before, so let's start by reviewing how it works.

*/

// The getCurrentPosition() function accepts two callbacks, the first for success and the second one for the error.

// So, the first callback function gets access to the position object, and the second to the error (let's use it in case that the user doesn't allow the page to get access to the current location).

// navigator.geolocation.getCurrentPosition(
//   (position) => console.log(position),
//   (error) => console.log(error)
// );

// console.log("Getting position"); // So that you can see that this is asynchronous behavior, we have this log after in the code, but it appears first in the console.

// So, the navigator function offloaded it's work to the background (to the web api environment) and immediately moved to the next line (the cl).

// This is very clearly a callback based api (we have to pass in both the callbacks), let's now promisify this.

const getPosition = function () {
  return new Promise(function (resolve, reject) {
    // navigator.geolocation.getCurrentPosition(
    //     (position) => resolve(position),
    //     (error) => reject(error)
    //   );

    // If the navigator function automatically calls the callback, also, it it automatically passes in the position, we can simply do this:

    navigator.geolocation.getCurrentPosition(resolve, reject);

    // This is exactly the same. Before we've specified the callback manually, but all we did was to take the position and pass it into resolve.
    // Now that happens automatically, resolve itself is the callback function, which will get called with the position.
  });
};

// getPosition().then((position) => console.log(position));

// Now let's take it to the next level. Remember that in the last coding challenge we built a function which received gps coords as an input, and then rendered the corresponding country.

// Now we actually got these coords via geolocation, so we don't even have to pass in any coords into that function.

// Since we have this getPosition function, we are going to be able to build a function that will tell us where we are in the world based on the location of our device.

// We use destructuring to set the latitude and longitude, then we just need to chain the methods.

// Remember that we need to bring the fetch and return it.

const whereAmI2 = function () {
  getPosition()
    .then((position) => {
      const { latitude: lat, longitude: long } = position.coords; // Remember how to rename with destructuring.
      //   console.log(lat, long);

      return fetch(`https://geocode.xyz/${lat},${long}?geoit=json`);
    })
    .then((response) => {
      if (!response.ok)
        throw new Error(`Problem with geocoding (${response.status})`);
      return response.json();
    })
    .then((data) => {
      console.log(`You are in ${data.city}, ${data.country}!`);

      let countryArranged = data.country.toLowerCase();

      return fetch(`https://restcountries.com/v3.1/name/${countryArranged}`);
    })
    .then((response) => {
      if (!response.ok)
        throw new Error(`${"Country not found!"} (${response.status})`);

      return response.json();
    })
    .then((data) => {
      renderCountry(data[0]);
      const neighbor = data[0].borders?.[0];
      if (!neighbor) throw new Error("No neighbor found!");

      return fetch(`https://restcountries.com/v3.1/alpha/${neighbor}`);
    })
    .then((response) => {
      if (!response.ok)
        throw new Error(`Country not found! (${response.status})`);
      return response.json();
    })
    .then((data) => {
      renderCountry(data[0], "neighbour");
    })
    .catch((error) => {
      console.error(`${error} 🧨🧨🧨🧨 Try again!`);
      renderError(`Something went wrong 🧨🧨🧨 ${error.message}! Try again!`);
    })
    .finally(() => {
      countriesContainer.style.opacity = 1;
    });
};

// whereAmI2();
