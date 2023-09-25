// import "core-js/stable";
// import "regenerator-runtime/runtime";

// import icons from "../img/icons.svg"; // Old way with parcel
// import icons from "url:../img/icons.svg"; // New way, for static assets (images, video or sound files)

import * as model from "./model.js"; // Importing everything from the model.
import recipeView from "./views/recipeView.js";
import searchView from "./views/searchView.js";
import resultsView from "./views/resultsView.js";
import paginationView from "./views/paginationView.js";
import bookmarksView from "./views/bookmarksView.js";
import addRecipeView from "./views/addRecipeView.js";
import { MODAL_CLOSE_SEC } from "./configuration.js";
// const recipeContainer = document.querySelector(".recipe"); // The container that holds all the info about the recipe (to render to)

// if (module.hot) {
//   module.hot.accept();
// }
// When using this we have to, sometimes kill the server and init again.
///////////////////////////////////////
// controller/handlers(event handlers) - recipe view

const controlRecipes = async function () {
  try {
    const id = window.location.hash.slice(1);
    if (!id) return;

    recipeView.renderSpinner(); // No longer needs the parent element because it is in every class. so we can call it in different views and they will act the same way.

    // Using the dom algorithm to update the results view, marking the selected search results. also listens to the hash change.

    resultsView.update(model.getSearchResultsPage()); // If we use the render method, then the flickering happens in the images too.

    // 1 - update bookmarks view
    bookmarksView.update(model.state.bookmarks);

    // 2 - LOADING RECIPE
    await model.loadRecipe(id); // Async returns a promise that we need to await, we don't store this because this function does not return any resolved value.
    // it simply manipulates the state.
    // const recipe = model.state.recipe;

    // 3 - RENDERING RECIPE

    recipeView.render(model.state.recipe); // Method that we've created in the recipeView so we can send the data from here and work with it there.

    // NOTE - As for the ingredients, we need to loop over the ingredients array that contains the objects with the data in order to create the markup.
    // In the end, the expression needs to return a string a string of html. So the method needs to return something se we can then join (.map)
    // NOTE - As for the icons, they are no longer coming from the path that we've specified, they are coming from the dist folder, so we need to change this by importing the icons file (at the top).

    // update bookmarks view
    // debugger;
    // bookmarksView.update(model.state.bookmarks);
  } catch (error) {
    // recipeView.renderError(`${error}: This error is our own 💣💣💣`);
    //Since we are dealing with the first possible error, which is the incorrect url (id) we don't pass any message here, we simply create a private variable in the recipeView that contains it. SEE HOW IT IS WITH OTHER ERRORS.
    recipeView.renderError();
    console.error(error);
  }
};

// Listening for the hash change, remember that at the beginning this was done by adding a new link in the html.
// This was done with an id from the demo version, but, the hash itself appears when the click happens.
// However we need to insert the id dynamically in the function.
// const id = window.location.hash.slice(1);
// window.addEventListener("hashchange", controlRecipes);
// window.addEventListener("load", controlRecipes);
// We need to listen for the load to otherwise if we copy the link with the id it doesn't load.
// ["hashchange", "load"].forEach((event) =>
//   window.addEventListener(event, controlRecipes)
// ); // Should be in the view. But the handler function that we pass in is in the controller.
// We want to handle the events in the controller, but listen for them in the view. For this we use the publisher-subscriber pattern.
// The publisher is the view and the subscriber is the controller. As soon as the publisher publish an event, the subscriber will get called.

// And we do this right at the beginning with the creation of an init function:

// // controller/handlers(event handlers) - results view
const controlSearchResults = async function () {
  try {
    resultsView.renderSpinner();
    // Get search query
    const query = searchView.getQuery();
    if (!query) return;

    // Load search results
    await model.loadSearchResults(query); // Async returns a promise that we need to await, we don't store this because this function does not return any resolved value.

    // Render results

    // resultsView.render(model.state.search.results); // BEFORE PAGINATION
    resultsView.render(model.getSearchResultsPage()); // AFTER PAGINATION

    // Pagination method - render initial pagination buttons
    paginationView.render(model.state.search);
  } catch (error) {
    console.error(error);
  }
};

// controller/handlers(event handlers) - to handle the button clicks. Although the controlPagination and the controlSearchResults are "related", the first one just controls the rendering of the query at the first page. paginationView.render(model.state.search);
// This one controls the pagination buttons and use the number of the dataset to call the getSearchResultsPage from the model (to display from index x to index y).

const controlPagination = function (goToPage) {
  // console.log(goToPage); // This is how we get the number from the paginationView.

  // Rerendering the new results
  resultsView.render(model.getSearchResultsPage(goToPage));

  // Rerendering the new buttons
  paginationView.render(model.state.search);
};

// controller/handlers(event handlers) - update recipe servings
// this one will be executed when the increase or decreased buttons are clicked, we will not have another view because the buttons and the data are already in the recipe view.
// So, that's where we add the method addHandlerUpdateServings()

const controlServings = function (newServings) {
  // Update recipe servings (in model.state) updating the underlying data (notice that we are mutating the data)
  model.updateServings(newServings);

  // update the recipe view (the one that will be impacted by the change)

  // Rerendering the recipe
  //recipeView.render(model.state.recipe); // So we don't have to go to each of the values. However this caused a flick in the image each time we changed the servings because we are updating the entire recipe view.

  // So, instead of calling the render method, we are going to build an update method with a DOM ALGORITHM.

  recipeView.update(model.state.recipe); // The update method will only update text and attributes in the dom without having to rerender the entire view.
  // This method will be in the parent View, so it is available on all the views.
};

// Controller for adding a new bookmark

const controlAddBookmark = function () {
  //Add or remove bookmark
  if (!model.state.recipe.bookmarked) model.addBookmark(model.state.recipe);
  else model.deleteBookmark(model.state.recipe.id);

  // update recipe view

  // console.log(model.state.recipe); // true
  // This happens when we click on the button, so we need to add a new handler to the recipe view

  // to update the view and add the class "-fill" conditionally
  recipeView.update(model.state.recipe);

  // render bookmarks

  bookmarksView.render(model.state.bookmarks);
};

//

const controlBookmarks = function () {
  bookmarksView.render(model.state.bookmarks);
};

// REMEMBER THAT uploadRecipe is an async function, so to get the errors we also need an async function here and await the resolved value
const controlAddRecipe = async function (newRecipe) {
  // Try catch to render the error if the format is not correct
  try {
    // show loading spinner
    addRecipeView.renderSpinner();

    await model.uploadRecipe(newRecipe);

    //render recipe
    recipeView.render(model.state.recipe);

    // success message
    addRecipeView.renderSuccessMessage();

    // render bookmark view

    bookmarksView.render(model.state.bookmarks); // not using update because we want to insert a new element

    // using the history api to change the id in the url. It takes three arguments (1st the state, doesn't matter; the title, which is not that important""; and the third is the url)

    window.history.pushState(null, "", `${model.state.recipe.id}`);

    // close form window

    setTimeout(function () {
      addRecipeView.toggleWindow();
    }, MODAL_CLOSE_SEC * 1000);
  } catch (error) {
    addRecipeView.renderError(error.message);
  }
};

const init = function () {
  bookmarksView.addHandlerRender(controlBookmarks);
  recipeView.addHandlerRender(controlRecipes);
  searchView.addHandlerSearch(controlSearchResults);
  paginationView._addHandlerButton(controlPagination);
  // controlServings(); // IMPORTANT - Remember that to test this without the event listeners, just to see if everything was connected properly, we couldn't do it here.
  // This is one of the pitfalls of working with the async in javascript because we are calling the method at init(), where no recipe as yet been loaded.
  // To test this we would have to do it after rendering the recipe in control recipes
  recipeView.addHandlerUpdateServings(controlServings);

  // bookmark
  recipeView.addHandlerAddBookmark(controlAddBookmark);
  addRecipeView.addHandlerUpload(controlAddRecipe);
};
init();
