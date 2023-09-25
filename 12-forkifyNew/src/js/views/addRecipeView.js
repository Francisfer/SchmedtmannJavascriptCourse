// "Same" code from other views

// This view is different because the html of the markup is already in the code.

import View from "./View.js";
import icons from "url:../../img/icons.svg";

class AddRecipeView extends View {
  _parentElement = document.querySelector(".upload"); // We want the parent element to be this so we can listen for the submit event and use new FormData on <form class="upload">
  _successMessage = "Recipe was successfully uploaded!";
  _window = document.querySelector(".add-recipe-window");
  _overlay = document.querySelector(".overlay");
  _btnOpenForm = document.querySelector(".nav__btn--add-recipe");
  _btnCloseForm = document.querySelector(".btn--close-modal");
  constructor() {
    // we want this to be called as soon as the page loads. this has nothing to do with any controller.
    // There is nothing special happening that the controller needs to tell us.

    // so, this time we add a constructor method (this is a child class, so we need super)

    // Of course we need to import this view (object), otherwise it will never execute this file.
    super();
    this._addHandlerShowModal();
    this._addHandlerHideModal();
    // this.addHandlerUpload(); // The handler cannot be the constructor because we need to get the data to the model through the controller SEE BELLOW
  }
  toggleWindow() {
    this._overlay.classList.toggle("hidden");
    this._window.classList.toggle("hidden");
  }

  _addHandlerShowModal() {
    this._btnOpenForm.addEventListener("click", this.toggleWindow.bind(this));
    //   // we want to take the overlay in the window and remove the hidden class
    //   this._overlay.classlist.toggle("hidden"); //REMEMBER this bug (this keyword points to the button)
    //   this._window.classlist.toggle("hidden");
  }

  _addHandlerHideModal() {
    this._btnCloseForm.addEventListener("click", this.toggleWindow.bind(this));
    this._overlay.addEventListener("click", this.toggleWindow.bind(this));
  }

  addHandlerUpload(handler) {
    this._parentElement.addEventListener("submit", function (e) {
      e.preventDefault();

      // To get the form data, browser api new FormData, we have to pass in a form, this is why we chose the parent element .upload.
      //   const data = new FormData(this);
      //   console.log(data); Returns an object that we can't really use without spreading it into an array.
      const dataArray = [...new FormData(this)];

      // IMPORTANT - At this point we need to think about what we want to do with this data. we want to eventually upload this data to the browser api.
      // Uploading data is just another api call, and they happen in the model, so we need a controller to be the handler of this event.

      const data = Object.fromEntries(dataArray); // Usually we always want an object and not an array of entries, there is a method to convert entries into an object.

      handler(data);
    });
  }

  _generateMarkup() {}
}

export default new AddRecipeView();
