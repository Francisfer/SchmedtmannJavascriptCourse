const recipeContainer = document.querySelector(".recipe");
const timeout = function(s) {
    return new Promise(function(_, reject) {
        setTimeout(function() {
            reject(new Error(`Request took too long! Timeout after ${s} second`));
        }, s * 1000);
    });
}; // https://forkify-api.herokuapp.com/v2
 /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
 // 1. NPM init - To initialize a new project and create our package.json file.
 // 2. Inside the json, change the entry point in main from index.js to index.html. An entry point can also be a js file.
 // 3. Change the scripts to start and (delete the one that is there by default).
 // 4. Now, to run parcel, first we need to install it. npm i parcel

//# sourceMappingURL=index.62406edb.js.map
