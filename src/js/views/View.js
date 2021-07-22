export default class View {
  _data;

  /**
   * Renders a spinner on parent element, clearing its inner Html.
   *
   */
  renderSpinner() {
    const markup = `
    <div class="spinner">
          <svg>
            <use href="img/icons.svg#icon-loader"></use>
          </svg>
        </div>
    `;
    this._clear();
    this._parentElement.insertAdjacentHTML('afterBegin', markup);
  }

  /**
   * Renders an error message in parent element.
   *
   * @param {*} message
   */
  renderError(message = this._errorMessage) {
    const markup = `
      <div class="error">
        <div>
          <svg>
            <use href="img/icons.svg#icon-alert-triangle"></use>
          </svg>
        </div>
        <p>${message}</p>
      </div>
    `;
    this._clear();
    this._parentElement.insertAdjacentHTML('afterBegin', markup);
  }

  /**
   * Renders a message in parent element.
   *
   * @param {*} message
   */
  renderMessage(message = this._message) {
    const markup = `
      <div class="message">
        <div>
          <svg>
            <use href="img/icons.svg#icon-smile"></use>
          </svg>
        </div>
        <p>${message}</p>
      </div>
    `;
    this._clear();
    this._parentElement.insertAdjacentHTML('afterBegin', markup);
  }

  /**
   * Adds render handler on both hashchange and load events.
   *
   * @param {*} handler
   */
  addHandlerRender(handler) {
    ['hashchange', 'load'].forEach(ev => window.addEventListener(ev, handler));
  }

  update(data) {
    this._data = data;
    const newMarkup = this._generateMarkup();

    const newDOM = document.createRange().createContextualFragment(newMarkup);
    const newElements = newDOM.querySelectorAll('*');
    const currentElements = this._parentElement.querySelectorAll('*');

    newElements.forEach((newEl, i) => {
      const curEl = currentElements[i];
      if (!newEl.isEqualNode(curEl) && newEl.firstChild.nodeValue.trim() !== '')
        curEl.textContent = newEl.textContent;

      if (!newEl.isEqualNode(curEl))
        Array.from(newEl.attributes).forEach(attr =>
          curEl.setAttribute(attr.name, attr.value)
        );
    });
  }

  /**
   * Renders markup for given data, if there is no data - renders an error.
   *
   * @param {*} data
   * @returns void|ERROR
   */
  render(data) {
    if (!data || (Array.isArray(data) && data.length === 0))
      return this.renderError();
    this._data = data;
    const markup = this._generateMarkup();
    this._clear();
    this._parentElement.insertAdjacentHTML('afterBegin', markup);
  }

  /**
   * Clears parent element inner html.
   *
   */
  _clear() {
    this._parentElement.innerHTML = '';
  }
}
