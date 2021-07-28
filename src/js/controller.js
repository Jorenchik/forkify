import * as model from './model';
import recipeView from './views/recipeView';
import searchView from './views/searchView';
import resultsView from './views/resultsView';
import bookmarksView from './views/bookmarksView';
import paginationView from './views/paginationView';
import addRecipeView from './views/addRecipeView';
import { FORM_SUCESS_TIMEOUT_SEC, MODAL_CLOSE_SEC } from './config';

const Controller = (function () {
  const addRecipeModal = document.querySelector('.add-recipe-window');
  const bookmarks = document.querySelector('.bookmarks');

  /**
   * Runs application, taking it to initial state.
   *
   */
  const init = function () {
    model.init();
    recipeView.addHandlerRender(controlRecipe);
    recipeView.addHandlerUpdateServings(controlServings);
    recipeView.addHandlerAddBookmark(controlAddBookmark);
    bookmarksView.addHandlerRender(controlBookmarks);
    searchView.addHandlerSearch(controlSearchResults);
    paginationView.addHandlerClick(controlPagination);
    addRecipeView.addHandlerUpload(controlAddRecipe);
  };

  /**
   * Renders recipe with id from hash.
   *
   */
  const controlRecipe = async function () {
    try {
      const id = window.location.hash.slice(1);
      if (!id) return;
      recipeView.renderSpinner();

      resultsView.update(model.getSearchResultsPage());
      bookmarksView.update(model.state.bookmarks);

      await model.loadRecipe(id);
      recipeView.render(model.state.recipe);
    } catch (err) {
      recipeView.renderError();
    }
  };

  /**
   * Upadtes servings according to serving change, returns immeadiately if new serving size is less than 1.
   *
   * @param {*} servingChange
   * @returns
   */
  const controlServings = function (servingChange) {
    const newServings = model.state.recipe.servings + servingChange;
    if (newServings < 1) return;
    model.updateServings(newServings);
    // recipeView.render(model.state.recipe);
    recipeView.update(model.state.recipe);
  };

  const controlBookmarks = function () {
    bookmarksView.render(model.state.bookmarks);
    bookmarks.style.display = 'block';
  };

  /**
   * Renders search results, returns imideately if there is no query.
   *
   */
  const controlSearchResults = async function () {
    try {
      resultsView.renderSpinner();
      const query = searchView.getQuery();
      if (!query) return;
      model.state.page = 1;
      await model.loadSearchResults(query);
      resultsView.render(model.getSearchResultsPage());
      paginationView.render(model.state.search);
    } catch (err) {
      throw err;
    }
  };

  const controlAddBookmark = function () {
    if (model.state.recipe.bookmarked) {
      model.removeBookmark(model.state.recipe.id);
    } else {
      model.addBookmark(model.state.recipe);
    }

    recipeView.update(model.state.recipe);

    bookmarksView.render(model.state.bookmarks);
    bookmarks.style.display = 'block';
  };

  /**
   * Renders results of given page and new pagination.
   *
   * @param {*} goToPage Page which results should be shown of
   */
  const controlPagination = function (goToPage) {
    resultsView.render(model.getSearchResultsPage(goToPage));
    paginationView.render(model.state.search);
  };

  const controlAddRecipe = async function (newRecipe) {
    try {
      addRecipeView.renderSpinner();

      await model.uploadRecipe(newRecipe);

      recipeView.render(model.state.recipe);

      addRecipeView.renderMessage();

      bookmarksView.render(model.state.bookmarks);

      window.history.pushState(null, '', `#${model.state.recipe.id}`);

      setTimeout(function () {
        addRecipeView.toggleWindow();
      }, MODAL_CLOSE_SEC * 1000);
    } catch (err) {
      addRecipeView.renderError(err.message);
    }
  };

  const clearBookmarks = model.clearBookmarks;

  return { init };
})();

export { Controller };
