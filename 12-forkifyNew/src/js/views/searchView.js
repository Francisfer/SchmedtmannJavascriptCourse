// Class that is responsible for the search bar and button.
// Here we start to really see the potential of having the parent element defined in each class.

class SearchView {
  _parentElement = document.querySelector(".search"); // Parent class of the input and the button.

  getQuery() {
    const query = this._parentElement.querySelector(".search__field").value;
    this._clearInput();
    return query;
  }

  _clearInput() {
    this._parentElement.querySelector(".search__field").value = "";
  }

  addHandlerSearch(handler) {
    // It is a form, so we listen for the submit event instead of the click or keydown.
    // This is why we cannot also immediately call the handler because the submit event reloads the page.
    this._parentElement.addEventListener("submit", function (e) {
      e.preventDefault();

      handler(); // It's not in the callback so we need to call it here.
    });
  }
}
export default new SearchView();
