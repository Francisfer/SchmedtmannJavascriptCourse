// Exporting module

console.log("Exporting module");

// Don't forget that variables declared inside of a module are scoped to the module. Just like the ones defined next.
// Inside a module, the module itself is like the top level scope. This means that all top level variables are private inside of this module.

const shippingCost = 10;
export const cart = []; // Exported just to see that the imports are a live connection to the exports. It seems that we are exporting an empty array.

// If we wanted to use them in the script.js module (import), we would have to use exports.
// In es6 there are two types of exports, named exports and default exports.
// Named exports is actually the simplest way of exporting something from a module. We just need to put export in front of anything that we might want to export.

// Say that we wanted to create a method that takes in a product and a quantity, pushes a new object to the cart variable (empty array) and logs something to the console.

// All we have to do is to write export to create a named export from this module.

export const addToCart = function (product, quantity) {
  cart.push({ product, quantity });
  console.log(`${quantity} ${product} added to the cart!`);
};

// Now we can import that variable in the other module.

// Just keep in mind that exports ALWAYS need to happen in top level code, it doesn't work inside of a block or function.

// Of course, we can export multiple things from a module using named exports. Actually, that is the main use of named exports.

// Say we want to export this:

const totalPrice = 237;
const totalQuantity = 23;

export { totalPrice, totalQuantity };
// Now we can go import to the other module. Remember that we can also change the variable name here, before we export, with the same syntax (as).

// Now it's time to talk about default exports. Usually, we use them when we only want to export one thing per module.
// That is the reason why they are called default.

// Here we simply want to export a value, for example, if we wanted to export the same function, we would simply export the value itself, not the variable.

// It works like this:

export default function (product, quantity) {
  cart.push({ product, quantity });
  console.log(`${quantity} ${product} added to the cart!`);
}

// As you see, no name is involved at all. This way, when we import it, we can give it any name that we want.
