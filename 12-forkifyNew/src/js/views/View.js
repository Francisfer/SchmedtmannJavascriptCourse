// Parent class, that's why we immediately export as default. We are not going to create any instance of this view.

// We will only use it as a parent class.
import icons from "url:../../img/icons.svg"; // we need them for the spinner

export default class View {
  _data;

  // second parameter because of the bookmarks view
  render(data, render = true) {
    if (!data || (Array.isArray(data) && data.length === 0))
      return this.renderError(); // Checking for an incorrect search or no recipe found with that query.
    // if there is no data OR data is an array and the length is 0.
    // We don't need to pass anything because the render error already has a default for the message of each view.

    this._data = data;
    const markup = this._generateMarkup(); // Store the markup call so we can call it in the insert adjacentHtml.

    if (!render) return markup;
    this._clear(); // This makes possible the pagination results as we change the page, we clear before inserting
    this._parentElement.insertAdjacentHTML("afterbegin", markup); // As first child
  }

  update(data) {
    // Same from the render() but we need to remove this, otherwise when we reload the page with an id already, it updates to no recipes found (the error)
    // if (!data || (Array.isArray(data) && data.length === 0))
    //   return this.renderError();
    this._data = data;

    const newMarkup = this._generateMarkup(); // Generating a new markup but not render it.
    //We will just compare this new one with the one that we had and only change text and attributes that actually changed.

    // This is just a string, so it's difficult to compare to the dom elements that we currently have on the page.

    // To solve this we can convert this markup string to a dom object that is living in the memory and use it to compare with the actual dom that we have on the page.

    const newDOM = document.createRange().createContextualFragment(newMarkup); // This converts the string into real dom node object, basically newDOM will become an object that is like a virtual dom.

    // It does NOT live on the page but lives in the memory.

    const newElements = Array.from(newDOM.querySelectorAll("*")); // Select all the elements in there.
    // console.log(newElements); // a nodeList BEFORE CONVERTING IT INTO AN ARRAY. Basically this is the dom that would be rendered on the page if we used the render method like before.

    // Now, if we search for the element that has the number of servings <span class="recipe__info-data recipe__info-data--people">4</span> we can see that the innerHTML (text content) property contains a str with a number.

    // With this, we can compare this dom with the one that we currently have on the page(don't forget that we currently are just rendering the query).

    // To do this we also have to convert the elements that are currently on the page and convert both of them into an ARRAY so we can loop over them.

    const currentElements = Array.from(
      this._parentElement.querySelectorAll("*")
    );
    // console.log(currentElements); // Still 4
    // console.log(newElements); // 5 if you click increase

    // Now we can compare these two, one by one:

    newElements.forEach((newElement, i) => {
      const currentElement = currentElements[i]; // So we can grab the current element of the old elements array. We need to loop over both at the same time.

      // The comparison is made with a method available in all nodes called isEqualNode.

      // console.log(currentElement, newElement.isEqualNode(currentElement)); // the node ---- true or false

      // Now we take the booleans in our advantage, whenever the texContent of the new element is NOT equal to the textContent of the current element (old), then the current element textContent should be textContent of the new.
      // However we only want elements that are actually text, otherwise the page breaks. And for this we need to select the first child (contains the text) because newElement is an element node (not a text node).

      // Updates changed text
      if (
        !newElement.isEqualNode(currentElement) &&
        newElement.firstChild?.nodeValue.trim() !== ""
      ) {
        // console.log(newElement.firstChild.nodeValue.trim());
        currentElement.textContent = newElement.textContent;
      }

      // Updates changed attributes. We need them for the classes and the dataset.

      if (!newElement.isEqualNode(currentElement)) {
        // Here we can use the attributes property on an element
        // console.log(newElement.attributes); // Inside of this condition, .attributes returns an object with the changed attributes. we need to convert this into an array to loop.
        // console.log(Array.from(newElement.attributes));
        Array.from(newElement.attributes).forEach((changedAttributes) =>
          currentElement.setAttribute(
            changedAttributes.name,
            changedAttributes.value
          )
        );
      }
    });
  }

  _clear() {
    this._parentElement.innerHTML = ""; // Remove the message (markup that is already there), check the reusability of using this._parentElement.
  }

  renderSpinner() {
    // Generic function to attach to any parent element that is passed into the function.
    //
    const markup = `
          <div class="spinner">
            <svg>
              <use href="${icons}#icon-loader"></use>
            </svg>
          </div>
    `;
    this._parentElement.innerHTML = "";
    this._parentElement.insertAdjacentHTML("afterbegin", markup);
  }

  renderError(message = this._errorMessage) {
    const markup = `
    <div class="error">
            <div>
              <svg>
                <use href="${icons}#icon-alert-triangle"></use>
              </svg>
            </div>
            <p>${message}</p>
    </div>
    `;
    this._clear();
    this._parentElement.insertAdjacentHTML("afterbegin", markup);
  }

  renderSuccessMessage(message = this._successMessage) {
    // It is the default html
    const markup = `
    <div class="message">
            <div>
              <svg>
                <use href="${icons}#icon-smile"></use>
              </svg>
            </div>
            <p>${message}</p>
    </div>
    `;
    this._clear();
    this._parentElement.insertAdjacentHTML("afterbegin", markup);
  }
}
