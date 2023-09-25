// Contains a render to call with the search results, similar to the render in the recipe view, but with the results from the search.

import View from "./View.js";
import icons from "url:../../img/icons.svg";
import previewView from "./previewView.js"; // Kind of the parent view to render the preview markup
// This class will be very similar to the recipeView. This means that we need a parent class, so we can reuse all the methods in all child classes.

// However we only want the methods that are not unique to each view. The parent element, adding the handlers and generating the markup are UNIQUE to each class.

// But everything else, including the data (because it is the same) can be included in the parent class.

class ResultsView extends View {
  _parentElement = document.querySelector(".results");
  _errorMessage = "No recipes found for your query! Please try again.";
  _successMessage = "";
  // Now its time to create the generateMarkup method in this class. Not only because its unique, but also because the render method (public) relies on it to build and render the markup with the data.

  // _generateMarkup() {
  //   // Don't forget to check the data always, it is an array that we need to loop over

  //   return this._data.map(this._generateMarkupPreview).join(""); // Notice the difference of a regular map call.
  //   // return this._data
  //   //   .map((previewData) => this._generateMarkupPreview(previewData))
  //   //   .join(""); Same result
  // }

  // _generateMarkupPreview(data) {
  //   // Remember that we've removed an icon and the preview__link--active (highlighted) (will come to this when uploading a recipe)

  //   // But before this we are going to use the dom algorithm to add a class conditionally if the link is clicked (being clicked means that the result id is equal to the id in the url)

  //   // First we get the id
  //   const id = window.location.hash.slice(1);

  //   return `
  //   <li class="preview">
  //     <a class="preview__link ${
  //       data.id === id ? "preview__link--active" : ""
  //     }" href="#${data.id}">
  //       <figure class="preview__fig">
  //         <img src="${data.image}" alt="${data.title}" />
  //       </figure>
  //       <div class="preview__data">
  //         <h4 class="preview__title">${data.title}</h4>
  //         <p class="preview__publisher">${data.publisher}</p>
  //       </div>
  //     </a>
  //   </li>
  //   `;
  // }

  _generateMarkup() {
    // Don't forget to check the data always, it is an array that we need to loop over

    return this._data
      .map((result) => previewView.render(result, false))
      .join(""); // Notice the difference of a regular map call.
    // return this._data
    //   .map((previewData) => this._generateMarkupPreview(previewData))
    //   .join(""); Same result
  }
}

export default new ResultsView();
