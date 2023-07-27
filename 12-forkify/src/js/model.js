// 1. Let's begin to build our state object. In there, for now, we have the recipe, which in turn, is also an empty object at the beginning.
//  We export the state object of course, so that we can use it in the controller.

// 2. Let's also create that loadRecipe function. This function will be the one responsible for fetching the recipe data from the api.
// 2.1 - Now we can actually start grabbing some of the code that we've written. However, we need to fix this a bit, we need to get the id from anywhere. A good idea is to pass the id into the function (the control gets the id and when it calls the model it can pass the id into it).
// 2.2 - The recipe should now be state.recipe because now we are just changing the state object with this function. This means that the function doesn't return anything (after the controller call the function, the state object will then contain the recipe that the controller takes out).

// Now we can import the model to the controller. From the model we want to import everything, check out the controller.

import { async } from "regenerator-runtime";
import { API_URL } from "./config.js";
import { getJSON } from "./helpers.js";

// 1.
export const state = {
  recipe: {},
};

// 2.
export const loadRecipe = async function (id) {
  try {
    const data = await getJSON(`${API_URL}/${id}`);
    // 2.1
    // const response = await fetch(`${API_URL}/${id}`);

    // const data = await response.json();

    // if (!response.ok) throw new Error(`${data.message} (${response.status})`);

    // 2.2
    const { recipe } = data.data;
    state.recipe = {
      id: recipe.id,
      title: recipe.title,
      publisher: recipe.publisher,
      sourceUrl: recipe.source_url,
      image: recipe.image_url,
      servings: recipe.servings,
      cookingTime: recipe.cooking_time,
      ingredients: recipe.ingredients,
    };
    console.log(state.recipe);
  } catch (error) {
    console.error(error);
  }
};
