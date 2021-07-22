import { API_URL, RESULTS_PER_PAGE } from './config';
import { getJSON } from './helpers';

/**
 * State object
 *
 */
export const state = {
  recipe: {},
  search: {
    page: 1,
    results: [],
    resultsPerPage: RESULTS_PER_PAGE,
  },
  bookmarks: [],
};

/**
 * Loads recipe by id.
 *
 * @param {*} id
 */
export const loadRecipe = async function (id) {
  try {
    const data = await getJSON(`${API_URL}/${id}`);

    let { recipe: fetchedRecipe } = data.data;
    state.recipe = {
      id: fetchedRecipe.id,
      title: fetchedRecipe.title,
      publisher: fetchedRecipe.publisher,
      sourceUrl: fetchedRecipe.source_url,
      image: fetchedRecipe.image_url,
      cookingTime: fetchedRecipe.cooking_time,
      servings: fetchedRecipe.servings,
      ingredients: fetchedRecipe.ingredients,
    };

    if (state.bookmarks.some(bookmark => bookmark.id === id))
      state.recipe.bookmarked = true;
    else state.recipe.bookmarked = false;
  } catch (err) {
    throw err;
  }
};

/**
 * Loads search results by given query.
 *
 * @param {*} query search query
 */
export const loadSearchResults = async function (query) {
  try {
    const { data } = await getJSON(`${API_URL}?search=${query}`);
    state.search.results = data.recipes.map(rec => {
      return {
        id: rec.id,
        image: rec.image_url,
        publisher: rec.publisher,
        title: rec.title,
      };
    });
  } catch (err) {
    throw err;
  }
};

/**
 * Returns search results of given page.
 *
 * @param {*} page
 * @returns
 */
export const getSearchResultsPage = function (page = 1) {
  state.search.page = page;

  const start = (page - 1) * RESULTS_PER_PAGE;
  const end = page * RESULTS_PER_PAGE;

  return state.search.results.slice(start, end);
};

/**
 * Updates recipe serving size in current recipe, renders new information.
 *
 *
 * @param {*} newServings
 */
export const updateServings = function (newServings) {
  state.recipe.ingredients.forEach(ing => {
    // newQt = oldQt * newServings / oldServings
    ing.quantity = (ing.quantity * newServings) / state.recipe.servings;
  });

  state.recipe.servings = newServings;
};

const persistBookmarks = function () {
  localStorage.setItem('bookmarks', JSON.stringify(state.bookmarks));
};

export const addBookmark = function (recipe) {
  state.bookmarks.push(recipe);
  if (recipe.id === state.recipe.id) {
    state.recipe.bookmarked = true;
  }
  persistBookmarks();
};

export const removeBookmark = function (id) {
  const index = state.bookmarks.findIndex(el => el.id === id);
  state.bookmarks.splice(index, 1);
  if (id === state.recipe.id) state.recipe.bookmarked = false;
  persistBookmarks();
};

export const init = function () {
  const storage = localStorage.getItem('bookmarks');
  if (storage) state.bookmarks = JSON.parse(storage);
};

export const clearBookmarks = function () {
  localStorage.clear('bookmarks');
};
