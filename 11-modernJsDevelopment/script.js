/*

    Lecture: An overview of modern javascript development. (pdf)

    When we build applications, we don't write all of our code onto one big script, send that script as it is to the browser and call it a day.

    Today, we divide our projects into multiple modules, these modules can share data between them and make our code more organized and maintainable.

    One great thing about modules is that we can also include third party modules into our own code.

    There are thousands of open source modules, which we also call packages, that developers share on the NPM repository.

    We can then use these packages for free in our own code. For example the react framework or jquery. All these packages are available through NPM.

    NPM stands for node packet manager because it was originally developed together with node.js. However it established itself as the go to repository for all kind of packages in modern javascript.

    In order to download, share and use packages, we use the NPM software installed on our computer. This is a simple command line interface that allow us to do all that.

    So, NPM is both the repository in which packages live, and a program that we use on our computers to install and manage these packages. 

    Say that we are done writing our project code, we divided it into multiple modules and we included some third party modules as well. Now the development step is complete.

    However, usually, that's not the end of the story, not when we are building a real world application. 

    Instead, our project now needs to go through a build process where one big final javascript bundle is built. That's the final file which we will deploy to our web server for production.

    Basically, it's the javascript file that will be sent to browsers in production. Production simply means that the application is being used by real users in the real world.

    A build process can be something really complex, but to keep it simple we are just including two steps. 

    At the first step, we'll bundle all our modules together into one big file, this is a pretty complex process which can eliminate unused code and compress our code as well.

    This step is very important for two reasons: first, older browsers don't support modules at all, so code that's in a module cannot be executed by any older browser.
    Second, it's also better to send less files to the browser and its also beneficial that the bundling step compresses our code.

    As the second step, we do something called transpiling and polyfill , which is basically to convert all modern javascript syntax and features back to old es5 syntax. So that older browsers can understand our code without breaking.
    This is usually done using a tool called babel.

    After these two steps, we end up with that final javascript bundle, ready to be deployed on a server for production.

    Of course, we don't perform these steps ourselves, instead we use a special tool to implement this build process for us. The most common build tools available are probably webpack and parcel.

    These are called javascript bundlers because they take our raw code and transform it into a javascript bundle.

    Webpack is the more popular one, but it can be really hard and confusing to set it up, because there is a lot of stuff that we need to configure manually in order to make it work properly.

    Parcel, on the other hand, is a zero configuration bundler which simply works out of the box. In this bundler, we don't have to write any set up code, which is amazing.

    These tools are also available on NPM. So, like packages that we include in our code, we will download and manage tools using NPM as well. These tools include the live server, the parcel bundler and babel.
    

*/

// import shoppingCart from "./shoppingCart.js";

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/*

    Lecture: An overview of modules in javascript. (pdf)

    Modules are a super important part of software development.

    A module is a reusable piece of code that encapsulates implementations details of a certain part of our project.

    That sounds a bit like a function, or even a class, but the difference is that a module is usually a stand alone file. That is not always the case, but when we think of a module, we think of a separate file.

    Of course, a module always contains some code, but it can also have imports and exports. With exports, as the name says, we can export values out of a module, for example simple values or even entire functions.

    Whatever we export from a module is called the public API. So, this is just like classes, where we can also expose a public api for other code to consume.

    In the case of modules, this public api is actually consumed by importing values into a module. Just like we can export values, in modules, we can usually also import values from other modules.
    
    These other modules from which we import are then called dependencies of the importing module. Because the code that is in the module that is importing cannot work without the code that it's importing from the external module.

    This entire logic that we just described is true for all modules in all programming languages. Modules are a pattern that developers have been using in all languages for decades.

    Of course, we can write code without modules, we've been doing that up until this point, but that's because our applications have been very simple.

    However, when a code base grows bigger, there start to be many advantages of using modules. 
    
    The first one is that modules make it really easy to compose software, we can think of modules as small building blocks that we put together in order to build really complex applications.

    Isolating components is another huge advantage of using modules (modules can be developed in isolation without thinking about the entire codebase). The developer doesn't even need to understand all of it.

    Modules also make it very easy to abstract our code. We can implement low level code in modules and import these abstractions into other modules.

    Modules also lead to a more organized codebase, because when we break up our code into separate, isolated and abstracted modules, this makes the code more organized and easier to understand.

    Modules also allow us to reuse the same code in a project and even across multiple projects. 
    
    For example, if we use a module to implement a couple of mathematical functions in a certain project, and if we then need the same functions in the next project, all we need to do is to copy that module into the new project.

    This is how modules work in general, but let's now see how they work in javascript specifically.

    As of ES6, javascript has a native built-in module system. We did have modules before es6, but we had to implement them ourselves or use external libraries. 

    ES6 modules are modules that are stored in files and each file is exactly one module (one module per file).

    In modules, all top level variables are scoped to the module. This means that variables are private to the module by default. 
    
    The only way an outside module can access a value that is inside of a module is by exporting that value.

    Modules are always executed in strict mode, so we don't need to manually declare strict mode.

    The this keyword is always undefined at the top level in modules, while in scripts it points at the window object.

    With modules, we can import and export values between them using the es6 export and import syntax. In regular scripts, this is completely impossible. 

    There is something really important to note about imports and exports, which is the fact that they can only happen at the top level (outside of any function or any if block). 

    Also, all imports are hoisted, so no matter where in the code you are importing values, it's like the import statement will be moved to the top of the file.

    In practice, importing values is always the first thing that happens in a module.

    Now, in order to link a module to an html file, we need to use the script tag with the type attribute set to module instead of just a plain script tag.

    Finally, about downloading the module files themselves, this always automatically happens in an asynchronous way. 
    
    This is true for a module loaded from html as well as for modules that are loaded by importing one module into another using the import syntax.

    On the other hand, regular scripts are downloaded by default in a blocking synchronous way, unless we use async or differ attributes on the script tag.

    See how it works behind the scenes in the pdf.

    After the parsing process has figured out which modules it needs to import, then these modules are downloaded asynchronously from the server. 

    It is only the import operation itself that happens synchronously (that's one of the reasons why imports are only possible at top level, so that the parsing process know all the modules to import for the hole project).

    After a module arrives, it is also parsed and then the modules exports are linked to the imports in the index.js. This is a live connection, when the value changes in the exporting module, it also changes in the importing module.

    This is very important to understand because it's unique to es6 modules, other module systems do not work like this. 

*/

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/*

    Lecture: Exporting and importing in ES6 modules.


*/
/* UNCOMMENT HERE
// Let's start with the simplest scenario of all, which is simply import a module without importing any value.
// Let's create a new module, as always we already start with a script.js, so we need to create a new file.

// This new module is going to be called shoppingCart. It's also a convention to use camelCase names.

// The shoppingCart is going to be the exporting module and the script.js the importing module.

// To start, let's just log this to the console, just to make sure that the module is actually being imported.
// Of course we need to import the other module. Notice that javascript automatically omits the .js (it also works without the extension).
// For this to work, (when we want to connect a module to the html file) we need to specify the type attribute (type = "module"). Check the html.

// import "./shoppingCart.js";
// console.log("Importing module");

// The first log that we see is the exporting module, only then importing module is logged to the console.
// This means that, in fact, the code from the shoppingCart module is executed before any code in the importing module.
// The code in the importing module is parsed and, before it is executed, all the code in the modules that this one imports is executed first.
// Also notice that we didn't use strict mode here, this happens by default in modules.

// Now let's define some variables in the exporting module.

// Now, to import, we just need to write it with the exact same name, between curly braces. We will see the syntax without the curly braces a little bit later.

import {
  addToCart,
  totalPrice as price, // To change the name as we import.
  totalQuantity,
} from "./shoppingCart.js";
console.log("Importing module");

// addToCart("beans", 23); // 23 beans added to the cart!

// console.log(price, totalQuantity); // 237 23 - totalPrice is now price because we changed it in the import.

import * as ShoppingCart from "./shoppingCart.js";

// We can take this importing even further, we can import all the exports of a module at the same time.
// This is going to create an object with all the imports. The naming convention is the same as with classes - ShoppingCart.

console.log(ShoppingCart); // Module {Symbol(Symbol.toStringTag): 'Module'}

// Now, whenever we want to use something that was exported, we have to take that from the object.

ShoppingCart.addToCart("Potatoes", 20); // 20 Potatoes added to the cart!

// If you think about this, the export module is basically exporting a public api, just like a class.
// It's as if the ShoppingCart was an object created from a class, which now has the methods and properties, for ex:

console.log(ShoppingCart.totalPrice); // 237

// Of course, we are not trying to replace classes with modules, it's just to see the similarities.

// DEFAULT IMPORT, see that we give a name to the function here:

import add from "./shoppingCart.js"; // Notice that we are importing the same module twice, it still works, but it's NOT advisable.

add("carrots", 33);

// import add, { addToCart, totalPrice as price, tq } from './shoppingCart.js'; AVOID
// We could also mix named and default imports in the same module, but it is also not a good practice. We never mix named and default exports in the same module.

// The preferred style is to actually just use one default export per module and import it like we did.

// Just to prove that the imports are a live connection to exports, we exported the cart array. const cart = []

// But now just see when we add a couple more products.

add("carrots", 33);
add("onions", 15);
add("garlic", 16);

console.log(ShoppingCart.cart); // (5) [{…}, {…}, {…}, {…}, {…}] Notice that we do not see that empty object that we've exported, instead we have this array with the objects that we just added to the cart.

// This proves that the import is not just a copy of the value [] that we've exported.
// If it was we would simply get the empty array (what the variable looked like when we exported it).

// This is very IMPORTANT TO KEEP IN MIND.

*/

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/*

    Lecture: Top level await.

    Let's now shortly go back to asynchronous javascript because there has been an important change in es2023.

    Starting from 2022, we can now use the await keyword outside of async functions, at least in modules.

    This is very important and it's called top level await, just remember that this only works in modules. 

*/

// To show top level await, let's simply do a fetch request.

/*
UNCOMMENT HERE
const result = await fetch("https://jsonplaceholder.typicode.com/posts");

// Remember that we need another await to parse the data as JSON.

const data = await result.json();
//console.log(data);

// Here we have our data outside of an async function, however, it is very important to understand that this blocks the execution of the entire module now.

// As we've learned in the previous lessons, that is sometimes not what we actually want.

// console.log("I just log after the request!");

// In fact, the await keyword, which is now outside of an async function, is blocking the entire execution of this module.

// This, of course, can be useful in some situations, but it can also be harmful, specially if it's a really long running task.

// Although this example clearly demonstrates the use of top level await, it is not very real, so let's analyze other situation.

// Many times, we have the situations where we do have an async function that we want to return some data.

// This function will do the same but it will only return the very last post.

const getLastPost = async function () {
  const result = await fetch("https://jsonplaceholder.typicode.com/posts");
  const data = await result.json();
  //console.log(data);

  // We are going to return a new object with the title of data and, to get the last element, let's use the new es2022 at() method.
  return { title: data.at(-1).title, text: data.at(-1).body };
};

const lastPost = getLastPost();

// console.log(lastPost); // If you remember the last lesson, this is not going to work because calling an async function always returns a promise, and not the object that we were expecting.

// This happens because, by the time that we are calling the function, the data as not yet arrived, so we get a pending promise.

// To get the data that we want we can use regular promises. We can take the promise that is returned and use the then() to get access to the resolved value.

// lastPost.then((resolvedValue) => console.log(resolvedValue));

// However, doing this isn't very clean, to make it better we can use top level await. Which is going to be the result of awaiting getLastPost().

const lastPost2 = await getLastPost();
// console.log(lastPost2); // It is in situations like these where top level await can get quite useful.

// To finish, let's see one more important implication of using top level await.

// If one module imports a module which has a top level await, then, the importing module will wait for the imported module to finish the blocking code.

// It's the same of saying that the code in this script.js has to wait for the code in shopping cart.js to finish.

// It is very important to remember that using top level await (await outside an async function) will block the entire module in a way that we couldn't block code execution before.

// This is not only a really helpful tool, but also one that we need to use with great care.

*/
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/*

    Lecture: The module pattern.

    Now that we know how modules work, let's quickly see the module pattern that was used before in order to implement modules in javascript.

    It is important to understand this module pattern because we still see it around and it's also a very good application of many of the stuff that we've been learning throughout the course.

    Just like in regular modules that we just learned about, the main goal of the module pattern is to encapsulate functionality, to have private data and to expose a public api. 

    The best way of achieving all that is by simply using a function, because functions gives us private data by default and allow us to return values, which can become our public api.

    Let's see how the module pattern gets implemented.

*/

// We start by writing a function, usually we write an IIFE. The reason for that is so we don't have to call it separately and also ensure that it's only called once.

// It is very important that this function is only created once because the goal is not to reuse code by running it multiple times.

// The only purpose of this function is to create a new scope and return data just once.

/*
UNCOMMENT HERE
const ShoppingCart2 = (function () {
  // Inside the function, let's simply add the same variables that we've had before in the other module.
  // In that other shopping cart, we had a bunch of private variables (data that was not exported).

  const cart = [];
  const shippingCost = 10;
  const totalPrice = 237;
  const totalQuantity = 23;

  // We can also use the addToCart() function.

  const addToCart = function (product, quantity) {
    cart.push({ product, quantity });
    console.log(
      `${quantity} ${product} added to the cart! Shipping cost is ${shippingCost}`
    ); // Notice how we can log a private variable, but without having access to it.
  };

  // And let's add a simple function which will log something to the console

  const orderStock = function (product, quantity) {
    console.log(`${quantity} ${product} ordered from supplier!`);
  };

  // Right now all of this data is private because it is inside of the scope of the function.
  // All we have to do is to return some of this stuff in order to return a public api.

  // To do that we simply return an object which contains the stuff that we want to make public.

  return {
    addToCart,
    cart,
    totalPrice,
    totalQuantity,
  };

  // Right now, we are not really storing this returned object anywhere, we need to assign the result of running this iife to a new variable. Calling it ShoppingCart2 above.
})();


*/
// Now we can do:

// ShoppingCart2.addToCart("apples", 4);
// ShoppingCart2.addToCart("pizza", 2);

// But we can't do

// console.log(ShoppingCart2.shippingCost); // Undefined

// And that's the implementation of the module pattern. Remember that manipulating the data that is inside of the one time called iife is only possible due to closures.

// Remember that closures allow a function to have access to all the variables that were present at its birthplace.

// Again, this is how the module pattern works and it works very well, even before es6 modules even existed in javascript.

// The problem is that if we wanted a module per file, like we have with es6 modules, we would have to create different scripts and link all of them in the html file.

// That creates a couple of problems, like we have to be careful with the order in which we declare them in the html and also we couldn't bundle them together using a module bundler.

// The module pattern that we've just learned works indeed very well but has some limitations, that's why native modules were added to the language in es6.

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/*

    Lecture: Common JS modules.

    Besides native es modules and the module pattern, there are also other module systems that have been used by javascript in the past, but they were not native. They relied on some external implementations.

    Two examples are AMD modules and commonJS modules. Common js modules are worth taking a look at, so let's do that now.

    Common js modules are important because they have been used in nodejs for almost all of its existence.

    Only very recently, es modules have actually been implemented in nodejs.

    The big consequence of this is that almost all the modules in the npm repository still use the commonJS module system.

    So let's see what this is all about.

*/

// Let's just pretend that we want to export something from this module and, just like es6 modules, in common js one file is one module.

// To export, we use the keyword.name, for ex.

// export.addToCart = function (product, quantity) {
//     cart.push({ product, quantity });
//     console.log(
//       `${quantity} ${product} added to the cart! Shipping cost is ${shippingCost}`
//     ); // Notice how we can log a private variable, but without having access to it.
//   };

// Of course this would not work in the browser but it would work in node. The export keyword is basically an object that is not defined here in our code and also not in the browser.

// But, in nodejs it is an important object that is used.

// To import we would use the require keyword, again it is not defined here but it is defined in nodejs.

// const { addToCart } = require ("./shoppingCart.js")

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/*

    Lecture: A brief introduction to the command line.

    Before we can use a tool like parcel, we need to learn a bit about the command line.

    All these tools that are available on npm only work in the command line.

    Let's first talk about the live server that was used previously in the course. The live server can be used in two ways.

    The first is to install a vscode extension (what we've been doing) and, the second and more professional, is to use node.js and a so called npm package.

    Now we're gonna instal node.js and use a npm package called live-server there.

    Node.js is a way of running javascript outside of the browser, but also a way or running other development tools.

    Move two levels up cd ../..
    control+c to kill live server 
    rm to remove, name after
    rmdir for empty folders
    rm -R (the R is called a flag(option) that stands for recursive) for folders 
    mv nameOfTheFile ../ move to the parent folder. 
*/

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/*

    Lecture: Introduction to NPM.

    Let's now use npm for the first time. 

    Before we jump straight to npm, let's start by understanding why we actually nee something like this.

    Why do we need a way of managing packages or dependencies in our project?
    Back in the day, before npm, we used to include external libraries right into our html, basically using the script tag.

    This would then expose a global variable that we could use, that's exactly what we did earlier with the mapty project. Remember that we included the leaflet library file using a script tag before our own script.

    We did that so our own script could then use the global variable that was exposed by the leaflet file/script.

    But this actually creates a couple of problems, at least in a big project. First, it doesn't make much sense having the html loading all our javascript, that is just really messy.

    Also, many times we would actually download a library file to our computer directly, for example a jQuery javascript file. 
    But then, when a new version would come out, we would have to manually go to the site, download the new version, change the file in our file system manually and include it here.

    Also, before npm, there wasn't a single repository that contained all the packages that we might need. All of this was a huge pain.

    We start by checking if we have npm installed. npm -v

    In each project that we want to use npm we need to initialize it. npm init

    This will ask us a couple of questions in order to create a package.json file.

    The first is the name of the file, if we press enter, whatever is in the () will be the default. This goes also for the following questions, of course we could write something that we want, but for now we are good with the defaults.

    After this, we end up with a special file called package.json. That is the file that npm created for our project.

    This file is basically what stores the entire configuration of our project.

    Now let's actually install the leaflet library that we've used before, but this time using npm.

    In the website's download page you will see that we just need to run npm install leaflet. (npm i leaflet)

    The first thing to notice is that our package.json now has leaflet as a dependency.

    The second thing is that now we have a folder called node_modules. This folder contains the leaflet folder (containing everything about this library that we need to include in our page).

    We've installed our leaflet library now, but if we wanted to use it, that wouldn't be easy without a module bundler. That is because this library uses the common JS module system.

    We will see how all of this works later, for now just learn how to install the dependencies.

    Actually, let's also install and import one of the most popular javascript libraries - lodash.

    Lodash is essentially a collection of a ton of useful functions for arrays, objects, functions, dates and more. 

    The documentation teach us how to install it through npm, however, we are not looking for the normal version of lodash (because it uses common js). The one we want is lodash-es (es modules).

    So, npm i lodash-es and we got it in the node_modules.

    The one that we want now is called cloneDeep.js. This exports default cloneDeep, so we can name it because it is a default export.


*/

// Let's import it exactly how we used to do it.

// import cloneDeep from "./node_modules/lodash-es/cloneDeep.js";
import cloneDeep from "lodash-es"; // Parcel finds the path

// So why importing this code and not any of the others? Because we've already mention lodash before when we talked about copying objects.

// Remember that it's very hard to copy a nested object, let's quickly create one here:

const state = {
  cart: [
    { product: "bread", quantity: 5 },
    { product: "pizza", quantity: 5 },
  ],
  user: { loggedIn: true },
};

// This is a deeply nested object, let's see what happens when we copy it using javascript.

const stateClone = Object.assign({}, state);
console.log(stateClone); // Indeed it looks exactly the same as the state. However, see what happens when we change one of the nested objects in the original array.

state.user.loggedIn = false; // In the copy, loggedIn also changed to false.

// If we wanted to create manually a deep copy/clone, that would be a lot of work.

// Instead, we can use the function that lodash gives us.

const stateDeepClone = cloneDeep(state);
console.log(stateDeepClone);

state.user.loggedIn = true; // Now when we change back to true, only the object.assign changes as well.

// Great, this is one step closer to working like a real javascript developer because this is what everyone does all the time.

// Go back to the package.json file. Say that you want to move your project to another computer, also share it with another developer or even check it into version control like git.

// In all of these scenarios, you should never ever include the node modules folder. There is no reason to include this huge folder.

// Now you might ask, if i copy my project without the node modules folder (so without the dependencies), will i have to install all of them, one by one?

// That is where this important package.json file comes into play. You can delete the folder (the import no longer works of course), but there is a easy way to get it back.

// All we have to do is npm i (without any package name). Then, npm will reach to the package.json file, look at all the dependencies and install them back.

// With this, we now have a basic understanding on how to work with npm, downloading packages and also include them in our code.

// However, importing packages like we did (by specifying the entire path) its not practical at all.

// In the next video, its time to finally use parcel to fix this.

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/*

    Lecture: Bundling with parcel and npm scripts. 
    
    You might have heard of webpack also (most popular bundler, specially in react world), but parcel works without any configuration.

    Parcel is basically another build tool which is also available on npm.

    To install npm i parcel --save-dev (this is now a different dependency, we have to write all of that). A dev dependency is like a tool that we need to build our application, but its not a dependency that we actually include in our code.

    It appears in a new field in our package.json file, the libraries are the regular dependencies and parcel is a dev dependency.

    We use parcel in the terminal because parcel is just another command line interface.

    However, we cannot simply run parcel like this: parcel index.html. This is not going to work because the command is not found. 

    The reason for that is that this doesn't work with locally installed packages. Parcel was indeed installed locally (only on this project), that's why it showed up in the package.json file of this exact project.

    There are global installations, but more on that by the end of this video. 

    In order to still be able to use parcel here in the console we have two options. We can use something called npx or we can use npm scripts.

    Let's start with npx, which is basically an application built into NPM, what matters is that we can use npx to run the same command (npx parcel index.html).

    The option that we pass into parcel (index.html) is the entry point, because that's where we include our script.js. 

    In our script, we are including the cloneDeep module from lodash and also our shoppingCart module from before. 

    Basically, in this example, the goal of using parcel is to bundle these three modules together (script.js - which is in the html; clone and shopping).

    After is complete, parcel also starts a new development server on the url that specifies. 

    If you click on it, a new tab is opened. So, besides only bundling, it also does exactly the same job as our live server.

    To see how to resolve any problems with parcel go to the video of this lesson min 6.37. You can also see how to install a specific version of parcel.

    After the server from parcel inits, you can shut the other down. It's exactly the same. 

    In the course, an error appeared because we still have the type module in the html (but i think it is no longer necessary to change it, because it does that automatically). 

    But keep in mind that we had a problem with the top level awaits that we had in the code.

    This makes sense because the new html that parcel creates is no longer of the type module. 
    
    What parcel does is to create a dist folder, that we later send for production. 


*/

// Whenever we save this file, it will automatically reload as with the live server.

// In parcel, we can activate something even better, which is called hot model replacement.

if (module.hot) {
  module.hot.accept();
}

// What hot module reloading means is that, whenever we change one of the modules, it will trigger a rebuild, but that new modified bundle will then automatically get injected into the browser without triggering a whole page reload.

// This is going to be advantageous for maintaining state on our page whenever we are testing out something. Remember the bankist app where we had to login at each reload.

// With parcel and hot module replacement that is not going to happen.

// Now, relative to the necessity of writing the whole path when we imported the cloneDeep from lodash, all module bundlers find the path automatically.

// All we have to do is to say that we want to include the lodash library.

// Now stop the server. Remember that we initialized parcel by saying npx parcel and then index.html.

// But there is a second way, which is to use npm script, that's the way developers use it in practice.

// Npm scripts are another way of running locally installed packages in the command line. They also allow us to automate repetitive tasks (remember what we did with the console.log).

// So, in the package.json, we can create a script (notice that we cannot write the command in the command line, but we can write it in the npm script).

// Start, now is like writing parcel index.html. npm run start.

// Now we have a simple command for when we want to start parcel.

// Whenever we are done developing our project, it is time to build the final bundle (the bundle that is compressed and has code elimination).

// For that, we need another parcel command (another script). npm run build.

// Finally, it is also possible to install packages globally. However it is advisable to install the tools locally, so that they can always stay on the latest version.
