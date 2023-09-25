// Named imports we use the {}
import { async } from "async";
import { API_URL, RES_PER_PAGE, API_KEY } from "./configuration.js";
// import { RES_PER_PAGE } from "./configuration.js";

// import { getJson, sendJson } from "./helpers.js";
// import { sendJson } from "./helpers.js";
// Named exports
// After refactoring:
import { AJAX } from "./helpers.js";

// The state should contain all the data about the application.
export const state = {
  recipe: {},
  // From the searchResults:
  search: {
    query: "",
    results: [],
    page: 1, // Another important data for the state is the current page (page number), so we can after change the page with the buttons. (1 default)
    resultsPerPage: RES_PER_PAGE,
  },
  bookmarks: [], // To store the bookmarks
};

const createRecipeObject = function (data) {
  const { recipe } = data.data;
  return {
    id: recipe.id,
    title: recipe.title,
    publisher: recipe.publisher,
    sourceUrl: recipe.source_url,
    image: recipe.image_url,
    servings: recipe.servings,
    cookingTime: recipe.cooking_time,
    ingredients: recipe.ingredients,
    // using short circuiting to set the key conditionally
    ...(recipe.key && { key: recipe.key }),
  };
};

// This function does not return anything, it just change the state object, which will contain the recipe that, in turn, is fetched by the controller (live connection).
export const loadRecipe = async function (id) {
  try {
    const data = await AJAX(`${API_URL}${id}?key=${API_KEY}`); // await the resolved value of the async function.

    // const response = await fetch(
    //   // Example ids
    //   // "https://forkify-api.herokuapp.com/api/v2/recipes/5ed6604591c37cdc054bc886"
    //   `${API_URL}/${id}`
    // ); // Await promise
    // const data = await response.json(); // Await the promise again
    // // Error handling - NOW COMES FROM THE HELPERS MODULE.
    // if (!response.ok) throw new Error(`${data.message} (${response.status})`);

    // Creating a new object to format the data from the api(better variable names)
    // const { recipe } = data.data; // With let so we can create a new one based on this one, data.data is the path of the recipe.

    // Because we are exporting state, and state.recipe should be this.
    // state.recipe = {
    //   id: recipe.id,
    //   title: recipe.title,
    //   publisher: recipe.publisher,
    //   sourceUrl: recipe.source_url,
    //   image: recipe.image_url,
    //   servings: recipe.servings,
    //   cookingTime: recipe.cooking_time,
    //   ingredients: recipe.ingredients,
    // };

    state.recipe = createRecipeObject(data);

    // If there is already a recipe with the same id in the bookmarks state, mark the recipe we just loaded from the api as bookmarked set to true.

    if (state.bookmarks.some((bookmark) => bookmark.id === id))
      state.recipe.bookmarked = true;
    else state.recipe.bookmarked = false;

    console.log(state.recipe);
  } catch (error) {
    // Temporary error handling because it should be in the view
    console.error(`${error}: This error is our own 💣💣💣`); // We can leave it so we can see in the console where exactly comes from.

    throw error;
  }
};

// Implementing search results. It is better to start with the data always because everything else depends on it.
// A query is a request for information, in this case we pass a query because it is going to be the controller who calls this function and tell what it should actually search for.
// Then we plug that query into our api call.

// controlSearchResults call this function. It is a new controller.
export const loadSearchResults = async function (query) {
  try {
    const data = await AJAX(`${API_URL}?search=${query}&key=${API_KEY}`);
    // console.log(data); // This returns all the matches for the query, so all the recipes for pizza.
    // Each object has some information about the recipes for us to render on the search results.
    // so we need to create a new object from this.
    state.search.query = query;
    state.search.results = data.data.recipes.map((recipe) => {
      return {
        id: recipe.id,
        title: recipe.title,
        publisher: recipe.publisher,
        image: recipe.image_url,
        ...(recipe.key && { key: recipe.key }),
      };
    }); // Remember that this returns a new array with the new objects, and we store this in our state.

    state.search.page = 1; // So that when we search for a new recipe the page reloads to 0.
    console.log(state.search.results);
  } catch {
    // Temporary error handling because it should be in the view
    console.error(`${error}: This error is our own 💣💣💣`); // We can leave it so we can see in the console where exactly comes from.

    throw error; // Here we do the exact same thing, so we can handle the error the controller by calling renderError from the view.
  }
};

// PAGINATION
// Remember that it's the searchResults function in the controller that is responsible for rendering the search results.
// Currently we are rendering all the results, we want to render 10 results in the first page.
// So let's create an export a function that does that. It will not be an async function because, at this point (when we call this function), we already have the search results loaded.
// All we want is to reach into the state and get the data for the page that is being requested. (a part of the results).
// For the first page we want to return a slice from the results array that goes from recipe 0 to 9 (zero based)

export const getSearchResultsPage = function (page = state.search.page) {
  state.search.page = page; // To update if we pass something or give the default of 1

  const start = (page - 1) * state.search.resultsPerPage; // 0; We want to calculate these values dynamically of course.
  const end = page * state.search.resultsPerPage; //9;
  // I we pass page 1, then the start will be 0 (what we want), and the end will be 9, because the second slice parameter is excluded (remember).
  // Same goes with page 2, the start is at position 10 and the end is at position 19. So 10 results in the page.
  // Instead of hardcoding these values here they should go into the config, so we can put it into the state here.

  return state.search.results.slice(start, end);
};

// function that updates the number of servings. this function will reach to the state (recipe ingredients) and change the quantity in each ingredient. With side effects, not pure.

export const updateServings = function (newServings) {
  state.recipe.ingredients.forEach((ingredient) => {
    // newQuantity = oldQuantity * newServings / oldServings
    ingredient.quantity =
      (ingredient.quantity * newServings) / state.recipe.servings;
  });

  // we also need to update the servings in the state, because the user might want to click more than once.
  // If we leave it like this, the second click will be based on the old servings data

  state.recipe.servings = newServings;
};

// Too keep bookmarks in the browser
const persistBookmarks = function () {
  localStorage.setItem("bookmarks", JSON.stringify(state.bookmarks));
};

// Implementing bookmarks
export const addBookmark = function (recipe) {
  // Create an array for bookmarks
  state.bookmarks.push(recipe); //add bookmark

  // Mark current recipe as bookmark

  if (recipe.id === state.recipe.id) state.recipe.bookmarked = true; // create a new property

  persistBookmarks();
};

// Delete bookmark if we click again

export const deleteBookmark = function (id) {
  // Common pattern: when we get something we want the data and when we want to delete something we get the id.

  const index = state.bookmarks.findIndex((el) => el.id === id);
  state.bookmarks.splice(index, 1);

  // Mark current recipe as NOT bookmarked
  if (id === state.recipe.id) state.recipe.bookmarked = false;

  persistBookmarks();
};

// take recipes from local storage

const init = function () {
  const storage = localStorage.getItem("bookmarks");
  if (storage) state.bookmarks = JSON.parse(storage);
  console.log(state.bookmarks);
};
init();

// Function for debugging during development

const clearBookmarks = function () {
  localStorage.clear("bookmarks");
};

// Function for uploading the recipe, eventually it will make a request to the api

export const uploadRecipe = async function (newRecipe) {
  //1 - The first task is to take the raw input data and transform it into the same format that we also get out from the api.
  // We pay more attention to the ingredients:
  // what we get from the api: {quantity: 4, unit: 'oz', description: 'cream cheese room temperature'}
  // What we get from the form: ingredient-1:"0.5,kg,Rice", notice how it's specified in the placeholders of the ingredient field of the form.

  // Try, so that the error is handled in the controller
  try {
    const ingredients = Object.entries(newRecipe)
      .filter((entry) => entry[0].startsWith("ingredient") && entry[1] !== "")
      .map((ingredient) => {
        // To test if the user inputs with the right format:

        const ingredientArray = ingredient[1].replaceAll(" ", "").split(",");

        if (ingredientArray.length !== 3)
          throw new Error(
            "Wrong ingredient format, please use the correct one."
          );

        const [quantity, unit, description] = ingredientArray;
        return { quantity: quantity ? +quantity : null, unit, description };

        // we undo the object that we've done with Object.fromEntries, basically transform that object into an array again (because we still need to receive an object for later).
        // Then we want to filter this array (we only want the properties that are called ingredient1,2,3 ...).
        // Basically we want the properties that start with ingredient and have some value (we don't want the ingredients that are not specified) filter
      });

    // Now its time to create the object that is ready to be uploaded, notice that we are going to do the opposite of what we've done with state.recipe (we've changed the key that comes from the api).
    // Now we respect the format to upload the data.

    // NOW we work both with the newRecipe data and the ingredients objects that we've created.

    const recipe = {
      title: newRecipe.title,
      source_url: newRecipe.sourceUrl,
      image_url: newRecipe.image,
      publisher: newRecipe.publisher,
      cooking_time: +newRecipe.cookingTime,
      servings: +newRecipe.servings,
      ingredients,
    };
    // console.log(recipe);

    // We need a developer key from the api (in the documentation), this sends the recipe back to us, so we store it into a variable.
    const data = await AJAX(`${API_URL}?key=${API_KEY}`, recipe);

    // So we can render our recipe as soon as we close the window:
    state.recipe = createRecipeObject(data); // transform the data to our format

    // The bookmark and they key are missing, the key is conditionally hardcoded above. we could do it here
    addBookmark(state.recipe);
  } catch (error) {
    throw error;
  }
};
