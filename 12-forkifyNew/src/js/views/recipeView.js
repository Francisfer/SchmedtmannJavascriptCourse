import icons from "url:../../img/icons.svg";
import fracty from "fracty";
import View from "./View.js"; // Importing the parent class. we just copied all the code that should be common to all the views.

class RecipeView extends View {
  _parentElement = document.querySelector(".recipe"); // Private property, if each of the classes have this private property, this makes it easier to render the spinner, the messages or the recipe itself.

  //_data; // All the views will have all of this in common. So, all of this is the public API.

  _errorMessage = "We couldn't find that recipe. Please try another one."; // Set by default in errorHandler.

  _successMessage = "";

  // All of this went to the parent View class
  // render(data) {
  //   this._data = data;
  //   const markup = this._generateMarkup(); // Store the markup call so we can call it in the insert adjacentHtml.
  //   this._clear();
  //   this._parentElement.insertAdjacentHTML("afterbegin", markup); // As first child
  // }

  // _clear() {
  //   this._parentElement.innerHTML = ""; // Remove the message (markup that is already there), check the reusability of using this._parentElement.
  // }

  // renderSpinner() {
  //   // Generic function to attach to any parent element that is passed into the function.
  //   //
  //   const markup = `
  //         <div class="spinner">
  //           <svg>
  //             <use href="${icons}#icon-loader"></use>
  //           </svg>
  //         </div>
  //   `;
  //   this._parentElement.innerHTML = "";
  //   this._parentElement.insertAdjacentHTML("afterbegin", markup);
  // }

  // renderError(message = this._errorMessage) {
  //   const markup = `
  //   <div class="error">
  //           <div>
  //             <svg>
  //               <use href="${icons}#icon-alert-triangle"></use>
  //             </svg>
  //           </div>
  //           <p>${message}</p>
  //   </div>
  //   `;
  //   this._clear();
  //   this._parentElement.insertAdjacentHTML("afterbegin", markup);
  // }

  // renderSuccessMessage(message = this._successMessage) {
  //   // It is the default html
  //   const markup = `
  //   <div class="message">
  //           <div>
  //             <svg>
  //               <use href="${icons}#icon-smile"></use>
  //             </svg>
  //           </div>
  //           <p>${message}</p>
  //   </div>
  //   `;
  //   this._clear();
  //   this._parentElement.insertAdjacentHTML("afterbegin", markup);
  // }

  // Needs to be public so we can call it in the controller. Publisher subscriber pattern
  addHandlerRender(handler) {
    ["hashchange", "load"].forEach((event) =>
      window.addEventListener(event, handler)
    );
  }

  addHandlerUpdateServings(handler) {
    this._parentElement.addEventListener("click", function (e) {
      const btn = e.target.closest(".btn--update-servings");
      if (!btn) return;
      const newServings = +btn.dataset.updateTo; // Notice that we have camel case here and a dash (-) in the markup, it is converted by default so we need to remember to retrieve the value correctly.

      // console.log(newServings); // Remember that when we were testing the second click was nan. that's because we only rerender the recipe in the controller (update the entire view).
      // But this is also causing the image flickering at this point.

      if (newServings > 0) handler(newServings);
    });
  }

  addHandlerAddBookmark(handler) {
    this._parentElement.addEventListener("click", function (e) {
      // At the time that the application loads this button does not exist, so it is another good use case for event delegation.
      const btn = e.target.closest(".btn--bookmark");
      if (!btn) return;
      handler();
      // Now we call it in the controller
    });
  }

  _generateMarkup() {
    // We could not place this code in the render method because it will be common to all the views (classes). But each class/method renders a different html.
    // The solution is to create this method to create the html and render it with the method.
    return `
        <figure class="recipe__fig">
        <img src="${this._data.image}" alt="${
      this._data.title
    }" class="recipe__img" />
        <h1 class="recipe__title">
          <span>${this._data.title}</span>
        </h1>
      </figure>

      <div class="recipe__details">
        <div class="recipe__info">
          <svg class="recipe__info-icon">
            <use href="${icons}#icon-clock"></use>
          </svg>
          <span class="recipe__info-data recipe__info-data--minutes">${
            this._data.cookingTime
          }</span>
          <span class="recipe__info-text">minutes</span>
        </div>
        <div class="recipe__info">
          <svg class="recipe__info-icon">
            <use href="${icons}#icon-users"></use>
          </svg>
          <span class="recipe__info-data recipe__info-data--people">${
            this._data.servings
          }</span>
          <span class="recipe__info-text">servings</span>

          <div class="recipe__info-buttons">
            <button data-update-to="${
              this._data.servings - 1
            }" class="btn--tiny btn--update-servings">
              <svg>
                <use href="${icons}#icon-minus-circle"></use>
              </svg>
            </button>
            <button data-update-to="${
              this._data.servings + 1
            }" class="btn--tiny btn--update-servings">
              <svg>
                <use href="${icons}#icon-plus-circle"></use>
              </svg>
            </button>
          </div>
        </div>

        
        <div class="recipe__user-generated ${this._data.key ? "" : "hidden"}">
            <svg>
              <use href="${icons}#icon-user"></use>
            </svg>
        </div>
        <button class="btn--round btn--bookmark">
          <svg class="">
            <use href="${icons}#icon-bookmark${
      this._data.bookmarked ? "-fill" : ""
    }"></use>
          </svg>
        </button>
      </div>

      <div class="recipe__ingredients">
        <h2 class="heading--2">Recipe ingredients</h2>
        <ul class="recipe__ingredient-list">
        ${this._data.ingredients.map(this._generateMarkupIngredient).join("")}
      </div>

      <div class="recipe__directions">
        <h2 class="heading--2">How to cook it</h2>
        <p class="recipe__directions-text">
          This recipe was carefully designed and tested by
          <span class="recipe__publisher">${
            this._data.publisher
          }</span>. Please check out
          directions at their website.
        </p>
        <a
          class="btn--small recipe__btn"
          href="${this._data.sourceUrl}"
          target="_blank"
        >
          <span>Directions</span>
          <svg class="search__icon">
            <use href="${icons}#icon-arrow-right"></use>
          </svg>
        </a>
      </div>
    `;
    // recipeContainer.innerHTML = ""; // Remove the message (markup that is already there)
    // recipeContainer.insertAdjacentHTML("afterbegin", markup); // As first child CODE MOVED TO THE RENDER METHOD and clear (all this function does is to return the string)
  }
  _generateMarkupIngredient(ingredient) {
    // Instead of return cl this to see how it looks at each iteration.
    return `
      <li class="recipe__ingredient">
        <svg class="recipe__icon">
          <use href="${icons}#icon-check"></use>
        </svg>
        <div class="recipe__quantity">${
          ingredient.quantity ? fracty(ingredient.quantity).toString() : ""
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
// we create a new recipeView object and export it here so we don't have to create it in the controller.
// Also, like this, only the object has access to the properties and methods except for the object.
// We don't pass any data, so we don't even need a constructor.
