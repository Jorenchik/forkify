import * as model from './model';
import recipeView from './views/recipeView';
import searchView from './views/searchView';
import resultsView from './views/resultsView';

const App = (function () {
  const addRecipeModal = document.querySelector('.add-recipe-window');
  const bookmarks = document.querySelector('.bookmarks');
  const body = document.querySelector('body');

  const init = function () {
    addRecipeModal.style.display = 'none';
    bookmarks.style.display = 'none';
    recipeView.addHandlerRender(controlRecipe);
    searchView.addHandlerSearch(controlSearchResults);
  };

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

  const controlSearchResults = async function () {
    try {
      resultsView.renderSpinner();
      const query = searchView.getQuery();
      if (!query) return;
      await model.loadSearchResults(query);
      resultsView.render(model.getSearchResultsPage(1));
    } catch (err) {
      throw err;
      // searchView.renderError();
    }
  };

  return { controlRecipe, init };
})();

export { App };
