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
