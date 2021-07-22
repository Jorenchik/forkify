import * as model from './model';
import recipeView from './views/recipeView';
import searchView from './views/searchView';
import resultsView from './views/resultsView';
import paginationView from './views/paginationView';

const Controller = (function () {
  const addRecipeModal = document.querySelector('.add-recipe-window');
  const bookmarks = document.querySelector('.bookmarks');

  /**
   * Runs application, taking it to initial state.
   *
   */
  const init = function () {
    addRecipeModal.style.display = 'none';
    bookmarks.style.display = 'none';
    recipeView.addHandlerRender(controlRecipe);
    searchView.addHandlerSearch(controlSearchResults);
    paginationView.addHandlerClick(controlPagination);
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

      await model.loadRecipe(id);
      recipeView.render(model.state.recipe);
    } catch (err) {
      recipeView.renderError();
    }
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
      await model.loadSearchResults(query);
      resultsView.render(model.getSearchResultsPage());
      paginationView.render(model.state.search);
    } catch (err) {
      throw err;
    }
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

  return { controlRecipe, init };
})();

export { Controller };
