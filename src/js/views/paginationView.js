import View from './View';

import icons from '../../img/icons.svg';

class PaginationView extends View {
  _parentElement = document.querySelector('.pagination');

  addHandlerClick(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--inline');
      if (!btn) return;

      const goToPage = +btn.dataset.goto;

      handler(goToPage);
    });
  }

  _generateMarkup() {
    const curPage = this._data.page;
    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );
    // Page 1 and other pages
    if (curPage === 1 && numPages > 1)
      return this._generateNextPageButton(curPage);
    // Page 1 no other pages
    if (curPage === 1 && numPages === 1) return '';
    if (curPage === numPages && numPages > 1)
      // Last page
      return this._generatePreviousPageButton(curPage);
    // Page with pages on both sides
    if (curPage < numPages) {
      const markupPrev = this._generatePreviousPageButton(curPage);
      const markupNext = this._generateNextPageButton(curPage);
      return markupPrev + markupNext;
    }
  }

  _generatePreviousPageButton(page) {
    return `
    <button data-goto="${page - 1}" class="btn--inline pagination__btn--prev">
      <svg class="search__icon">
        <use href="${icons}#icon-arrow-left"></use>
      </svg>
      <span>${page - 1}</span>
    </button>
    `;
  }

  _generateNextPageButton(page) {
    return `
    <button data-goto="${page + 1}" class="btn--inline pagination__btn--next">
      <span>${page + 1}</span>
      <svg class="search__icon">
        <use href="${icons}#icon-arrow-right"></use>
      </svg>
    </button>
    `;
  }
}

export default new PaginationView();
