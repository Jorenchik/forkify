import { async } from 'regenerator-runtime';
import { API_URL } from './config';
import { getJSON } from './helpers';

export const state = {
  recipe: {},
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
    console.error(`${err} 🐫🐫🐫`);
  }
};
