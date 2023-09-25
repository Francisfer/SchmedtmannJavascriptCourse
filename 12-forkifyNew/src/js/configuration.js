// In many projects, it's common to have two special modules that are completely independent of the rest of the architecture.
// This is the model for the project configuration, where we put all the variables that are constant and reused throughout project.
// Like this we can change easily in one place, like the url, if it changes, we can change it in just one place.
// UPPERCASE

export const API_URL = `https://forkify-api.herokuapp.com/api/v2/recipes/`;
export const TIMEOUT_SECONDS = 10; // Again, if we need to change it we do it here.
export const RES_PER_PAGE = 10;
export const API_KEY = "8407426e-a684-4f0e-b02b-d9fe8ab86158";
export const MODAL_CLOSE_SEC = 2.5;
