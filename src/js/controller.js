import * as model from './model';
import recipeView from '../views/recipeView';

/////////////////////////////
// Controller
/////////////////////////////

const App = (function () {
  const addRecipeModal = document.querySelector('.add-recipe-window');
  const bookmarks = document.querySelector('.bookmarks');
  const body = document.querySelector('body');

  const init = function () {
    addRecipeModal.style.display = 'none';
    bookmarks.style.display = 'none';
    ['hashchange', 'load'].forEach(ev => {
      window.addEventListener(ev, showRecipe);
    });

    // window.addEventListener('hashchange', showRecipe);
    // window.addEventListener('load', showRecipe);
  };

  const recipeContainer = document.querySelector('.recipe');

  const timeout = function (s) {
    return new Promise(function (_, reject) {
      setTimeout(function () {
        reject(new Error(`Request took too long! Timeout after ${s} second`));
      }, s * 1000);
    });
  };

  const showRecipe = async function () {
    try {
      const id = window.location.hash.slice(1);

      if (!id) return;
      recipeView.renderSpinner(recipeContainer);

      // 1) loading the recipe

      await model.loadRecipe(id);
      const { recipe } = model.state;

      // 2) rendering the recipe
      recipeView.render(model.state.recipe);
    } catch (err) {
      alert(err);
    }
  };

  return { recipeContainer, showRecipe, showRecipe, timeout, init };
})();

export { App };
