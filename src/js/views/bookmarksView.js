import View from './View';
import previewView from './previewView';

class BookMarksView extends View {
  _parentElement = document.querySelector('.bookmarks');
  _errorMessage = 'No bookmarks yet! Find nice recipe and bookmark it!';
  _message;

  /**
   * Generates markup of search results.
   *
   * @returns string of search results HTML markup
   */
  _generateMarkup() {
    return this._data
      .map(bookmark => previewView.render(bookmark, false))
      .join('');
  }

  addHandlerRender(handler) {
    window.addEventListener('load', handler());
  }
}

export default new BookMarksView();
