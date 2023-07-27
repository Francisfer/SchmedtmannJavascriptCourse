// In this file, we will put all the variables that should be constant and reused across the project.

//The goal of having this file with all these variables is that it will allow us to easily configure our project by simply changing some of the data that is in this configuration file.

// We will not want to put all the variables in this file, the only variables that we do want here are the ones that are responsible for "defining some important data" about the application itself.

// 1. One example is the api url. We will actually reuse this in multiple places across this project, for example getting search data and also for uploading a recipe to the server.

// Now image that, for some reason, this url needs to change. If we do not use this technique, we need to change the url everywhere it was used. Having this into a variable makes it extremely easy.

// You could argue that we could simply create this variable in the model. But then, we would have all these configuration variables spread across multiple modules. It is much easier to simply have all of those variables in one central place.

// Using uppercase means that this is a constant that will never change. This is a named export, so to import is we use the curly braces so we can use their actual name.

// 2. The timeout number of seconds.

export const API_URL = `https://forkify-api.herokuapp.com/api/v2/recipes`; // 1.

export const TIMEOUT_SECONDS = 10; // 2.
