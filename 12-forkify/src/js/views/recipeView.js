// So the view is going to be a class called RecipeView. We do this because later we will also have a parent class called View, which will contain a couple of methods that all the views should inherit.

// Also, we want each view to have a couple of private methods and properties. So, using classes makes all of this very simple to implement.

// 1. Relative to the RecipeView, one of the private properties is going to be the parentElement, set to the recipe container element. Like this, it will be really easy to render the spinner, render success or error messages or the recipe itself.
//    If each of the views has this parentElement property, it will be easy to do all of the tasks described before.
// 2. Now, what we want to do is to export something from this module. It is obvious that we have to export something from this view so that the controller can then use it.
//    But what are we going to export from this view? We might export the entire class, then in the controller, we would have to import that class and create a new object out of that class (basically create a new RecipeView object).
//    However, in that situation, it might be possible to create more than one view and we never want that. Also, that would add unnecessary work to the controller, which we want to keep as simple as possible.
//    In order to avoid all that, we will already create the object here and then export that object. Like this, no one from the outside of the RecipeView class will have access to anything, except for the object.
//    We will export default, and then a new RecipeView. We don't pass any data in, therefore we don't need any constructor.
//    Then, we import it in the controller.

// 3. Now we build the render method which accepts data and sets this.#data to the data it just received. Notice that the render method and both properties are something that all the views are going to have in common.

// 4. Now let's do something with this data, which is to render it. What we want is to take all the code from the markup and put it into our view.
//    We do not want to put into the render method, because this method will later be common to all the views (classes). So each view will of course render different html. So we will have a method that generates that html, so that the render method can then render it.
//    We can immediately return that html without having to store it into a variable.
// 4.1 - This is not going to do anything yet because what is recipe inside of the markup html? It is not defined at all, so where is this data?
//    To better understand, the recipe is loaded in the controller with model.recipe(id), which stores it into the state object. Then we take model.state.recipe and pass it into the render method, which in turn stores that data into this.#data. And its done like this so we can use that data all over the place inside of this object.
//    So, in the html, we need to replace recipe for this.#data.

// 5. The generate markup method only generates the markup html, so the rest of the code, clearing and inserting the adjacent html in the element is done by the render method also. But we also need to use the #parentElement, which is already here, that's why its useful.
// 5.1 - Also, don't forget that we need to say to the insertAdjacentHTML() what the markup is.

// 6. In regard to the render spinner we just need to bring it and replace for the parent element at the end. Also, the import for the icons needs to be here with the path written right.

// The last change to implement in this part as to do with the numbers that appear in the recipe (regarding the measures - instead of 0.5 we want 1/5 of a cup).
// So there is an api that does that for us (external library). npm fractional. REMEMBER that method of search takes you to npmjs.com, that contains one page for each npm package available.
// With this we can create new fractions based on numbers, we first need to install it - npm i fractional. Remember that this goes to the dependencies, so the we need to import it (go there to see the old way of importing with require (common js)).
// All the packages or libraries that we import from npm don't need a specified path (we just need to write their names).
// Now, in the html markup, we no longer want just the quantity, we want the quantity converted to a fraction string. So we write just like it is in the documentation (toString at the end).
// However, notice that in some cases we get NaN. This happens because in some ingredients we simply don't have a value to work on, so in this cases we should check if the number actually exists.

// 7. We also refactored the function that loops over the ingredients (to later change the markup with the ones that are on the loaded recipe) to another method.

import icons from "url:../../img/icons.svg";
import { Fraction } from "fractional"; // We destructure it so we don't need to call this with Fraction.Fraction.
// console.log(Fraction); // To see if this does exist.

class RecipeView {
  #parentElement = document.querySelector(".recipe");
  #data;
  render(data) {
    this.#data = data;
    const markup = this.#generateMarkup(); // 5.1
    this.#clear();
    this.#parentElement.insertAdjacentHTML("afterbegin", markup); // 5
  }

  #clear() {
    this.#parentElement.innerHTML = ""; // 5
  }

  renderSpinner = function () {
    const markup = `
    <div class="spinner">
      <svg>
        <use href="${icons}#icon-loader"></use>
      </svg>
    </div>
    `;
    this.#parentElement.innerHTML = "";
    this.#parentElement.insertAdjacentHTML("afterbegin", markup);
  };

  // Publisher-subscriber pattern. Cannot be private.
  addHandlerRender(handler) {
    ["hashchange", "load"].forEach((event) =>
      window.addEventListener(event, handler)
    );
  }

  #generateMarkup() {
    // 4
    return `
        <figure class="recipe__fig">
        <img src="${this.#data.image}" alt="${
      this.#data.title
    }" class="recipe__img" />
        <h1 class="recipe__title">
          <span>${this.#data.title}</span>
        </h1>
      </figure>

      <div class="recipe__details">
        <div class="recipe__info">
          <svg class="recipe__info-icon">
            <use href="${icons}#icon-clock"></use>
          </svg>
          <span class="recipe__info-data recipe__info-data--minutes">${
            this.#data.cookingTime
          }</span>
          <span class="recipe__info-text">minutes</span>
        </div>
        <div class="recipe__info">
          <svg class="recipe__info-icon">
            <use href="${icons}#icon-users"></use>
          </svg>
          <span class="recipe__info-data recipe__info-data--people">${
            this.#data.servings
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
        ${this.#data.ingredients.map(this.#generateMarkupIngredients).join("")}
      </div>

      <div class="recipe__directions">
        <h2 class="heading--2">How to cook it</h2>
        <p class="recipe__directions-text">
          This recipe was carefully designed and tested by
          <span class="recipe__publisher">${
            this.#data.publisher
          }</span>. Please check out
          directions at their website.
        </p>
        <a
          class="btn--small recipe__btn"
          href="${this.#data.sourceUrl}"
          target="_blank"
        >
          <span>Directions</span>
          <svg class="search__icon">
            <use href="${icons}#icon-arrow-right"></use>
          </svg>
        </a>
      </div>
    `;
  }

  #generateMarkupIngredients(ingredient) {
    return `
          <li class="recipe__ingredient">
            <svg class="recipe__icon">
              <use href="${icons}#icon-check"></use>
            </svg>
            <div class="recipe__quantity">${
              ingredient.quantity
                ? new Fraction(ingredient.quantity).toString()
                : ""
            }</div>
            <div class="recipe__description">
              <span class="recipe__unit">${ingredient.unit}</span>
              ${ingredient.description}
          </div>
        </li>
      `;
  }
}

export default new RecipeView();
