import { API_KEY, API_URL, RESULTS_PER_PAGE } from './config';
import { AJAX } from './helpers';

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

const createRecipeObject = function (fetchedRecipe) {
  return {
    id: fetchedRecipe.id,
    title: fetchedRecipe.title,
    publisher: fetchedRecipe.publisher,
    sourceUrl: fetchedRecipe.source_url,
    image: fetchedRecipe.image_url,
    cookingTime: fetchedRecipe.cooking_time,
    servings: fetchedRecipe.servings,
    ingredients: fetchedRecipe.ingredients,
    ...(fetchedRecipe.key && { key: fetchedRecipe.key }),
  };
};

/**
 * Loads recipe by id.
 *
 * @param {*} id
 */
export const loadRecipe = async function (id) {
  try {
    const data = await AJAX(`${API_URL}/${id}?key=${API_KEY}`);

    let { recipe: fetchedRecipe } = data.data;
    state.recipe = createRecipeObject(fetchedRecipe);

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
    const { data } = await AJAX(`${API_URL}?search=${query}&key=${API_KEY}`);
    state.search.results = data.recipes.map(rec => {
      return {
        id: rec.id,
        image: rec.image_url,
        publisher: rec.publisher,
        title: rec.title,
        ...(rec.key && { key: rec.key }),
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

export const uploadRecipe = async function (newRecipe) {
  try {
    const ingredients = Object.entries(newRecipe)
      .filter(entry => entry[0].startsWith('ingredient') && entry[1] !== '')
      .map(ing => {
        const ingArray = ing[1].split(',').map(el => el.trim());
        if (ingArray.length !== 3)
          throw new Error(
            'Wrong ingriedient format. Please try using correct one!'
          );
        const [quantity, unit, description] = ingArray;
        return { quantity: quantity ? +quantity : null, unit, description };
      });
    const recipe = {
      title: newRecipe.title,
      source_url: newRecipe.sourceUrl,
      image_url: newRecipe.image,
      publisher: newRecipe.publisher,
      cooking_time: +newRecipe.cookingTime,
      servings: +newRecipe.servings,
      ingredients,
    };
    const data = await AJAX(`${API_URL}?key=${API_KEY}`, recipe);
    state.recipe = createRecipeObject(data.data.recipe);
    addBookmark(state.recipe);
  } catch (err) {
    throw err;
  }
};
