import { async } from 'regenerator-runtime';
import { API_URL, RESULTS_PER_PAGE } from './config';
import { getJSON } from './helpers';

export const state = {
  recipe: {},
  search: {
    results: [],
  },
};

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
  } catch (err) {
    console.error(err);
    throw err;
  }
};

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
    console.error(err);
    throw err;
  }
};

export const getSearchResultsPage = function (page) {
  const start = (page - 1) * RESULTS_PER_PAGE;
  const end = page * RESULTS_PER_PAGE;

  return state.search.results.slice(start, end);
};
