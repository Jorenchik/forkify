class SearchView {
  _parentEl = document.querySelector('.search');

  /**
   * Gets query from search input.
   *
   * @returns
   */
  getQuery() {
    return this._parentEl.querySelector('.search__field').value;
  }

  /**
   * Clears input text.
   *
   */
  _clearInput() {
    this._parentEl.querySelector('.search__field').value = '';
  }

  /**
   * Adds event listener on search input (submit event)/
   *
   * @param {*} handler
   */
  addHandlerSearch(handler) {
    this._parentEl.addEventListener(
      'submit',
      function (e) {
        e.preventDefault();
        handler();
        this._clearInput();
      }.bind(this)
    );
  }
}

export default new SearchView();
