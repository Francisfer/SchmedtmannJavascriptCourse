// This class acts like a parent view for the resultsView and bookmarks view. Because both of them are essentially the same.
// At least the markup that they generate is exactly the same

// Contains a render to call with the search results, similar to the render in the recipe view, but with the results from the search.

// What this view will do is to generate only one preview element (generate markup preview)

import View from "./View.js";
import icons from "url:../../img/icons.svg";

class PreviewView extends View {
  _parentElement = "";

  _generateMarkup() {
    const id = window.location.hash.slice(1);

    return `
    <li class="preview">
      <a class="preview__link ${
        this._data.id === id ? "preview__link--active" : ""
      }" href="#${this._data.id}">
        <figure class="preview__fig">
          <img src="${this._data.image}" alt="${this._data.title}" />
        </figure>
          <div class="preview__this._data">
              <h4 class="preview__title">${this._data.title}</h4>
              <p class="preview__publisher">${this._data.publisher}</p>
              <div class="preview__user-generated ${
                this._data.key ? "" : "hidden"
              }">
              <svg>
              <use href="${icons}#icon-user"></use>
              </svg>
          </div>
        </div>
      </a>
    </li>
    `;
  }
}

export default new PreviewView();
