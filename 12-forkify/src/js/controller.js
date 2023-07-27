// https://forkify-api.herokuapp.com/v2

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// 1. NPM init - To initialize a new project and create our package.json file.

// 2. Inside the json, change the entry point in main from index.js to index.html. An entry point can also be a js file.

// 3. Change the scripts to start and (delete the one that is there by default).

// 4. Now, to run parcel, first we need to install it. npm i parcel -D. Notice that we now have a real css file in the dist.

// 5. Changed the defer to type module.

// 6. Add polyfill for es6 features. npm core-js and regenerator-runtime. Then import them at the top of the file. When we install them, they go to the node modules, then we need to specify the ones that we want (stable and runtime).

// With everything set, let's now build our first api call. For this project, we will be using an api created by the author.

// Let's start by using the example url for the get recipe.

// 1. Sometimes is better to format the data that comes from an api. If you see the log, there are a lot of _. We want to create a new object based on the data object. SEARCH a better way for doing this.

// 2. After loading the recipe data from our api, we render that data in our application. We need the html template for the recipe itself. Always fix the indentation.
//    Then replace the data that we need. Only the ingredients are different. We insert the html on the parent element already selected above (afterbegin - as the first child).
//    At this point we encounter three problems: we have no icons, no ingredients and we still have the message showing.
//    We loop over the ingredients with map() because it returns an array with the same length that we can after join (for each returns nothing).
//    As for the icons, remember that the page that is displayed in the browser is the html of the dist folder (parcel). So, all the images, all the assets in fact, are now coming from that folder.
//    However, in the template literal we are still writing the old path to the icons. So we need a way of telling javascript the the icons file is no longer that one.
//    We can do that with parcel by simply importing the icons file. (check the top).
// Remember that we are in controller.js, so we need to go one way up (.. always mean the parent folder), then we can go (/) into images and then (/) icons svg.
// That is the old parcel version of doing this, now, for any static assets that are not programming files (images, videos, sound files) we need to write url: and then the path.

// 3. To render the spinner we create a generic function that takes a parent element. We render the spinner as we load the recipe.

//////////////////////////////////////////////////////////////////////////////////////////////////

// We now need to attach the event listeners. If you look to the final app, when we search for a recipe and click on it, the url has the # and then the id of the recipe (all together is called the hash).

// They way that this is going to work is when the hash changes in the url, a new recipe is going to be loaded. That change of the hash is an event that we can listen for.

// We click, the hash changes, we listen for that event, take the hash and, from there, take the id and then load the recipe with that id.

// To start, we need a way of triggering a change of the hash. We can do that by adding a fake link in the html search results (simulating a search from the user). Check the html.

// Now, when we click on the links, the hash changes and we can listen for that event.
// A. The name of the event is called hashchange and we listen for it on the window. The function that we want to run is then showRecipe.
//    Now we only run the function whenever the hash changes, however we need to do something in the showRecipe function because, at this point we are still hardcoding the id in the fetch.
// B. So we want to dynamically get the id from the hash but without the # (that's why we use slice). Now we can insert the id in the fetch.
// C. Remember that, when we were dynamically inserting the id in the fetch url, the firs recipe did not work, that's because the page reloads but the hash stays the same.
//    The same thing happens when we copy the entire link and try to open it in another tab. This means that we also need to listed for the load event. CHECK the way in which we listen for several events in which we want to run the same event handler function.
// D. For the last scenario in this part, if we don't have any hash (delete that part of the link) we get an error (we are trying to read the id but that comes from the hash), so we need a guard clause.

const renderSpinnerNoRefactoring = function (parentEl) {
  const markup = `
  <div class="spinner">
    <svg>
      <use href="${icons}#icon-loader"></use>
    </svg>
  </div>
  `;
  parentEl.innerHTML = "";
  parentEl.insertAdjacentHTML("afterbegin", markup);
};

const showRecipeNoRefactoring = async function () {
  try {
    const id = window.location.hash.slice(1); // B.

    if (!id) return; // D.

    renderSpinnerNoRefactoring(recipeContainer); // 3.

    const response = await fetch(
      `https://forkify-api.herokuapp.com/api/v2/recipes/${id}` // B.
    );

    const data = await response.json();

    if (!response.ok) throw new Error(`${data.message} (${response.status})`);

    // 1.
    let { recipe } = data.data;

    recipe = {
      id: recipe.id,
      title: recipe.title,
      publisher: recipe.publisher,
      sourceUrl: recipe.source_url,
      image: recipe.image_url,
      servings: recipe.servings,
      cookingTime: recipe.cooking_time,
      ingredients: recipe.ingredients,
    };
    console.log(recipe);

    // 2.

    const markup = `
        <figure class="recipe__fig">
        <img src="${recipe.image}" alt="${recipe.title}" class="recipe__img" />
        <h1 class="recipe__title">
          <span>${recipe.title}</span>
        </h1>
      </figure>

      <div class="recipe__details">
        <div class="recipe__info">
          <svg class="recipe__info-icon">
            <use href="${icons}#icon-clock"></use>
          </svg>
          <span class="recipe__info-data recipe__info-data--minutes">${
            recipe.cookingTime
          }</span>
          <span class="recipe__info-text">minutes</span>
        </div>
        <div class="recipe__info">
          <svg class="recipe__info-icon">
            <use href="${icons}#icon-users"></use>
          </svg>
          <span class="recipe__info-data recipe__info-data--people">${
            recipe.servings
          }</span>
          <span class="recipe__info-text">servings</span>

          <div class="recipe__info-buttons">
            <button class="btn--tiny btn--increase-servings">
              <svg>
                <use href="${icons}#icon-minus-circle"></use>
              </svg>
            </button>
            <button class="btn--tiny btn--increase-servings">
              <svg>
                <use href="${icons}#icon-plus-circle"></use>
              </svg>
            </button>
          </div>
        </div>

        <div class="recipe__user-generated">
          <svg>
            <use href="${icons}#icon-user"></use>
          </svg>
        </div>
        <button class="btn--round">
          <svg class="">
            <use href="${icons}#icon-bookmark-fill"></use>
          </svg>
        </button>
      </div>

      <div class="recipe__ingredients">
        <h2 class="heading--2">Recipe ingredients</h2>
        <ul class="recipe__ingredient-list">
        ${recipe.ingredients
          .map((ingredient) => {
            return `
              <li class="recipe__ingredient">
                <svg class="recipe__icon">
                  <use href="${icons}#icon-check"></use>
                </svg>
                <div class="recipe__quantity">${ingredient.quantity}</div>
                <div class="recipe__description">
                  <span class="recipe__unit">${ingredient.unit}</span>
                  ${ingredient.description}
              </div>
            </li>
          `;
          })
          .join("")}
      </div>

      <div class="recipe__directions">
        <h2 class="heading--2">How to cook it</h2>
        <p class="recipe__directions-text">
          This recipe was carefully designed and tested by
          <span class="recipe__publisher">${
            recipe.publisher
          }</span>. Please check out
          directions at their website.
        </p>
        <a
          class="btn--small recipe__btn"
          href="${recipe.sourceUrl}"
          target="_blank"
        >
          <span>Directions</span>
          <svg class="search__icon">
            <use href="${icons}#icon-arrow-right"></use>
          </svg>
        </a>
      </div>
    `;
    recipeContainer.innerHTML = ""; // Before inserting we clear the markup that is there.
    recipeContainer.insertAdjacentHTML("afterbegin", markup);
  } catch (error) {
    alert(error);
  }
};

// showRecipeNoRefactoring(); // Removed from here so it only runs whenever the hash changes.

// window.addEventListener("hashchange", showRecipeNoRefactoring);
// window.addEventListener("load", showRecipeNoRefactoring);

// ["hashchange", "load"].forEach((event) =>
//   window.addEventListener(event, showRecipeNoRefactoring)
// ); // C.

//////////////////////////////////////////////////////////////////////////////////////////////////

// We already implemented a part of the application, but it has no structure whatsoever. It is time to talk about the project architecture at this point, but also about software architecture in general.

// We've touched on this subject already, but now we go a little bit deeper (use the pdf).

// There are multiple reasons why we need software architecture, first it will give our project the structure in which we can then write our code. Structure means how we organize and divide the code into different modules, classes and functions.

// The next reason is maintainability, when we build a project, we always need to think about the future and keep in mind that the project is never really done. We will need to make changes in the future and that only works if the project is nicely structured.

// The need to add new features brings us to expandability, because we need to do this easily in the future. This is only possible with a good structure and overall architecture.

// The perfect architecture is the one that allows all these three aspects, in order to reach this, we can create our own architecture from scratch. That works in a small project like the mapty, however, in bigger projects, we can opt for a well established architecture pattern that developers have been using for decades.

// Examples of this are module view controller (MVC), model view presenter (MVP), flux and many other architectures. This is what we are going to do in this project.

// These days, many developers use a framework like react, angular, vue or svelte to take care of the architecture for them. This is the way to go for large applications, however, it is very important to really know javascript before switching to some of these frameworks.

// That includes knowing how to implement an architecture by yourself. This is also an objective of this project.

// No matter where the architecture comes from or who develops it, there are some components that any architecture must have: business logic, state, http library, application logic (router) and presentation logic (ui layer). Check the pdf to see what each of them is about.

// Business logic is the code that solves the actual business logic, it is directly related to what business does and what it needs.

// The state is one of the most important aspects of any application. It is essentially what stores all the data about the application that is running in the browser, so the data about the application front end basically.
// The state should store any data that you might fetch from an api, data that the user inputs, what page the user is currently viewing, etc.
// This data should be the so called single source of truth, which should be kept in sync with the user interface. This means that if some data changes in the state, then the user interface should reflect that (and also the other way around).
// Storing and displaying data and keeping everything in sync is one of the most difficult tasks when building applications. That's why there are many state libraries like redux or mobx. But we are going to keep it simple and use a simple object to store our entire state.

// Next, the http library is simply responsible for making and receiving ajax requests. We have been doing that using the fetch function and we will keep doing it here.

// The presentation logic (router) is the code that is only concerned about the implementation of the app itself. So, it's more the technical aspects of the app, which are not related with the underlying business problem.
// For example, the application logic includes handling of ui events and navigation on the page. That is the reason why this component is many times called a router (mapping actions to the user navigation)

// Finally, the presentation logic (ui layer) is all about the visible part of the application. Essentially, we can say that the presentation logic is responsible for displaying the application state on the user interface in order to keep everything in sync.

// Now, any good architecture has a way of separating all these components instead of mixing everything together in one big file.

// To solve this messy problem, we are going to use the model view controller architecture (MVC). As the name says, this architecture contains three big parts: the model, the view and the controller.
// The view is, of course, for the presentation logic (the part interacting with the user).

// The model is all about the application's data, that's why usually contains the state and also the business logic (that manipulates the state), so they are kept closely together.
// The model is also what contains the http library, that might get some data from the web (from some api or some backend).

// Finally, the controller is what contains the application logic. It kind of sits between the model and the view. Basically, it creates a bridge between the model and the view which, in fact, should know nothing about each other.
// The model and the view will exist completely independent from one another. In fact, one of the goals of this mvc pattern is to separate business logic from application logic, making developing the application so much easier.
// But, as a consequence, we then need something to connect these two parts, that is the controller.

// Check the pdf for better understanding a typical flow of actions and of data as soon as some event happens.
// In this example we think of a click event. To start, it's going to be the controller who will handle that event, because handling an event is doing something in the application. So it's clearly part of the application logic.
// This handling might involve updating the user interface and also ask the model for some data. With this, we can say that the controller dispatches tasks to the model and to the view.
// Asking the model for some data might involve doing an ajax request to the web. Then, when that data arrives, the controller takes the data from the model and sends it to the view. Finally, the view will render that data to the user interface and finish this whole cycle.
// If you check the pdf, there are two types of arrows, the dotted arrows represent data flow between the different parts while the solid arrows represent actual function calls and module imports.
// By analyzing this, we can see that it's only the controller who imports and calls functions from the model and the view, NOT the other way around. This means that the model and the view are completely standalone and completely isolated.

// Check the pdf to see this applied to what we already did until now. Notice how the model and the controller are implemented in a module while the view is actually a class.

//////////////////////////////////////////////////////////////////////////////////////////////////

// Now it's time to refactor our code to MVC. We start by creating the necessary files so that we can then split up our code between them.

// Inside of the src folder and inside of js, let's create a new file which will be called model.js. This will be the module in which we write our entire model.

// Then, we need the view, or actually the views, because we will have multiple views. One for each feature basically.
// If we are going to have multiple views, the best thins is to create a folder called views inside of js so we don't clutter everything.
// Now we are working on displaying the recipe, so this file is gonna be called recipeView.js.

// Like this, we will have one big module for all the controllers (controller.js), one big module for the entire model (recipe, search, bookmarks) but, for the views, we will have one module for each of the different views. We will see why this makes sense as we keep developing.

// Let's now start with the model. Again, we are going to have a big state object which will contain an object for recipe, another for search and another for bookmarks. For now we are going to work with the recipe. There will also be a function for loading the recipe.
// This function will be called by the controlRecipes, which kind of sits between loading the recipe and then rendering it using the view.

// From all the code that we've written, renderSpinner has nothing to do with the business logic, its only presentational logic (goes to the view); getting the id is more about the application logic itself (to make it work, so it stays here).

// Go to the model module now. It's a good technique to have the tabs in the same order that the MVC architecture.

// 1. Now we can call the function to load the recipe with the id. Remember that this is an async function, it returns a promise, so we need to await that promise before we can move on to the next step of the execution (markup).
//    This is VERY IMPORTANT. An async function will return a promise that we then need to handle whenever we call that async function. At least if we want to get some result out of it, or if we kind of want to stop the execution in the function that is calling the other async function.
// 1.1 - Remember that this loadRecipe does not return anything, therefore we are not storing any result into a new variable. Instead, we will get access to state.recipe (that was manipulated by this function).
//    Temporarily, let's store that value into a recipe variable, just so we can see if everything is still working (the markup uses recipe.image for example, remember that we were getting an error because recipe was not defined).
//    Everything is working, it is important to check when we are refactoring code.

// Now it's time for the view, so go to the file.

// With the new object being imported, you might ask how do we pass data into the recipeView? We are not creating the object ourselves, then we cannot pass any data in (for the constructor for example).

// 2. The solution is to create a method called render in the view module. Then, here we just need to pass in the data in that method.
// 2.1 - If, previously, we exported the entire class, here we would have to do this. It would work the same way.
//    Now, this method will accept this data and it will store it into the object. Check view.

//////////////////////////////////////////////////////////////////////////////////////////////////

// Many real world applications have two special modules that are completely independent of the rest of the architecture. A module for the project configuration and also a module for some general helper functions that are useful across the whole project.

//  Let's implement these modules in our own project starting with the configuration module. In the js folder, we create a new file called config.js.

// Go there now.

// After this, create a new file in the js folder for some helper functions (helpers.js).

// Go there now.

//////////////////////////////////////////////////////////////////////////////////////////////////

// Let's now learn how we can listen for events and also handle them in the MVC by using something called the publisher-subscriber pattern.

// Right now, we are listening for the hashchange and the load events right here in the controller. However, this does not make a lot of sense, because everything that is related to the dom (to the view), should be inside of a view.

// It might seem that these two events don't really look as if they have to do with the view (ui), but imagine that, instead, we would be handling a click event on some dom element.
// Listening for that event should, for sure, go into the view. Therefore, we can say the same about these events, they have more to do with the dom manipulation then actually with the controller.

// Therefore, we need a way of putting this logic into the recipe view. However, the handler function that we use to handle these events is actually this controller function (controlRecipes).

// So, we have a problem, we don't want the event listener to be here, but we need the controller function (we don't want to also put it in the view).

// Check the pdf at this point.

// Recapping what we've said, we want to handle the events in the controller because, otherwise, we would have application logic in the view. We don't want that.

// But, on the other hand, we want to listen for events in the view because, otherwise, we would need DOM elements in the controller. Basically, we would have presentation logic in the controller, which would be wrong according with the mvc implementation.

// Essentially, event listeners should be attached to dom elements in the view, but the events should then be handled by controller functions that live in the controller module.

// If you take a look to the pdf, we have the controlRecipes() function in the controller, and we have a special method in the view, which is called addHandlerRender().

// We might think that is very easy to connect these two functions because, why not simply call the controlRecipes function right from the view whenever an event occurs?
// This is simply not possible because, in the way we set up the architecture, the view does not know anything about the controller (it doesn't import it).

// There is a good solution for this, which is called the publisher subscriber design pattern. Design patterns in programming are just standard solutions to certain kind of problems.

// In this pattern, we have a publisher, which is some code that knows when to react. In this case, it's going to be the addHandlerRender function in the view, because it will contain the add event listener method. Therefore it will know when to react to the event.

// On the other hand, we have a subscriber, which is code that actually wants to react. This is the code that should be executed when the event happens, in our code, that is the controlRecipes() that we already have in the controller.

// Remember that the publisher does not know yet that the subscriber even exists.

// Knowing this, the solution is that we can now subscribe (from the controller) to the publisher (view) by passing in the subscriber function as an argument.

// In practice, that means that as soon as the program loads, the init function is called and immediately calls the addHandlerRender function from the view.

// As we call addHandlerFunction, we pass in our controlRecipes function as an argument. Essentially, we subscribe controlRecipes to addHandlerRender. At this point, both functions are now connected.

// Now, addHandlerRender listens for events using the add event listener and, as soon as the event happens, the controlRecipes function will be called as the callback function of add event listener. Check the view.

// Now we create the init function to call the method here in the controller. Check the init() right at the beginning.

//////////////////////////////////////////////////////////////////////////////////////////////////

// START HERE!!!!!!

import * as model from "./model.js"; // ./ same level
import recipeView from "./views/recipeView.js"; // The new recipeView object
// import icons from "../img/icons.svg";

import "core-js/stable"; // Polyfill everything else
import "regenerator-runtime/runtime"; // Polyfill async/await

const recipeContainer = document.querySelector(".recipe");

const controlRecipes = async function () {
  try {
    const id = window.location.hash.slice(1);
    console.log(id);
    if (!id) return;

    recipeView.renderSpinner();

    // 1.
    await model.loadRecipe(id);

    // 1.1
    // const { recipe } = model.state; // We no longer need this because we are passing the data into the render method.

    // 2. Rendering the recipe

    recipeView.render(model.state.recipe);
    // 2.1 - const recipeView = new RecipeView(model.state.recipe)
  } catch (error) {
    console.error(error);
  }
};

// controlRecipes(); // Removed from here so it only runs whenever the hash changes.

// window.addEventListener("hashchange", controlRecipes);
// window.addEventListener("load", controlRecipes);
// ["hashchange", "load"].forEach((event) =>
//   window.addEventListener(event, controlRecipes)
// ); // C. Goes to the view.

const init = function () {
  recipeView.addHandlerRender(controlRecipes);
};
init(); // Called right at the beginning.
