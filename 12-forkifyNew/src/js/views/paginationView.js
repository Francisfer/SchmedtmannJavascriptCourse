// This will be the view that handles the pagination. In order to do this we have to count with different scenarios.
// Page one only shows next page button (2), also, if we have less than 10 results, no button is displayed.
// If we are in any other page we have both buttons.
// If we go all the way to the last page we only have the button to come back.
// To establish the conditions we need the entire search object from the model (results[], page and results per page).
// The modules don't touch each other, so we first call the render method on this view so we can pass in the data that we need.
// We do not create another controller for this view, we want this to happen when we are also displaying the search results. IMPORTANT

import View from "./View.js";
import icons from "url:../../img/icons.svg";

class PaginationView extends View {
  _parentElement = document.querySelector(".pagination");

  _generateMarkup() {
    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    ); // we need to round it to the next integer, even if it is 5.1 for ex.

    const currentPage = this._data.page;
    console.log(this._data);
    // console.log(this._data.page);

    // here is where we establish the logic:
    // Page 1 and there are other pages
    if (currentPage === 1 && numPages > 1) {
      return `
        <button data-goto="${
          currentPage + 1
        }" class="btn--inline pagination__btn--next">
            <span>Page ${currentPage + 1}</span>
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-right"></use>
            </svg>
        </button>
        `;
    }
    // We are in page one and there are no more pages
    if (currentPage === 1 && numPages < 2) return "";
    // Last page
    if (currentPage === numPages && numPages > 1) {
      return `
        <button data-goto="${
          currentPage - 1
        }" class="btn--inline pagination__btn--prev">
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-left"></use>
            </svg>
            <span>Page ${currentPage - 1}</span>
        </button>
        `;
    }
    // Other page.
    if (currentPage > 1 && currentPage < numPages) {
      return `
        <button data-goto="${
          currentPage - 1
        }" class="btn--inline pagination__btn--prev">
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-left"></use>
            </svg>
            <span>Page ${currentPage - 1}</span>
        </button>
        <button data-goto="${
          currentPage + 1
        }" class="btn--inline pagination__btn--next">
            <span>Page ${currentPage + 1}</span>
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-right"></use>
            </svg>
        </button>
        `;
    }
  }

  _addHandlerButton(handler) {
    this._parentElement.addEventListener("click", function (e) {
      // let currentPage = this._data.page;
      // // EVENT DELEGATION - we need to now know which button was clicked based on the event.
      // // Remember that we need to remove the possibility of clicking on the span with the closest().
      // if (e.target.closest(".pagination__btn--prev"))
      //   console.log(currentPage --);
      // if (e.target.closest(".pagination__btn--next"))
      //   console.log(currentPage )++;
      // // handler;
      // // console.log(this._data.page); // REMEMBER WHY WE DIDN'T DO THIS. WE JUST WANT THIS TO RETURN A NUMBER.
      // Because, otherwise we would be handling the events here. We want to do it in the controller.

      const btn = e.target.closest(".btn--inline"); // like this we skip the span
      // We selected the button because, if we need to handle the event in the controller, we need to get a number out of this.
      // We need to establish a connection between the dom and our code and one way to do this is to create a custom data attribute in the generate markup (button) with the page that we want to go to.

      if (!btn) return; // because when we click outside of the button (parent element) we get an error.

      const goToPage = +btn.dataset.goto; // To get the number
      handler(goToPage); // We pass the number to the handler, to get access to it we pass in an argument with goToPage also.
    });
  }
}

export default new PaginationView();
