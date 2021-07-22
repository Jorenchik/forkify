import View from './View';

class ResultsView extends View {
  _parentElement = document.querySelector('.results');
  _errorMessage = 'No recipes found for your query. Please, try again!';
  _message;

  /**
   * Generates markup of search results.
   *
   * @returns string of search results HTML markup
   */
  _generateMarkup() {
    return this._data.map(this._generateMarkupPreview).join('');
  }

  /**
   * Generates one search result preview.
   *
   * @param {*} result search result data
   * @returns search result preview string of HTML markup
   */
  _generateMarkupPreview(result) {
    return `<li class="preview">
      <a class="preview__link" href="#${result.id}">
        <figure class="preview__fig">
          <img src="${result.image}" alt="Test" />
        </figure>
        <div class="preview__data">
          <h4 class="preview__title">${result.title}</h4>
          <p class="preview__publisher">${result.publisher}</p>
          <div class="preview__user-generated">
            <svg>
              <use href="img/icons.svg#icon-user"></use>
            </svg>
          </div>
        </div>
      </a>
    </li>
    `;
  }
}

export default new ResultsView();
