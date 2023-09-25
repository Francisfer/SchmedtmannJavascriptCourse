// This is the exact same code from the results view, except for the parent element
import View from "./View.js";
import icons from "url:../../img/icons.svg";
import previewView from "./previewView.js"; // Kind of the parent view to render the preview markup

class BookmarksView extends View {
  _parentElement = document.querySelector(".bookmarks__list");
  _errorMessage = "No bookmarks yet. Find a nice recipe and bookmark it!";
  _successMessage = "";
  // Now its time to create the generateMarkup method in this class. Not only because its unique, but also because the render method (public) relies on it to build and render the markup with the data.

  addHandlerRender(handler) {
    window.addEventListener("load", handler);
  }
  _generateMarkup() {
    // Don't forget to check the data always, it is an array that we need to loop over

    return this._data
      .map((bookmark) => previewView.render(bookmark, false))
      .join(""); // Notice the difference of a regular map call.
    // return this._data
    //   .map((previewData) => this._generateMarkupPreview(previewData))
    //   .join(""); Same result
  }
}

export default new BookmarksView();
