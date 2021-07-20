export const state = {
  recipe: {},
};

export const loadRecipe = async function (id) {
  try {
    const res = await fetch(
      `https://forkify-api.herokuapp.com/api/v2/recipes/${id}?key=c839caa0-136c-4f5b-881a-530fef098fe9`
    );
    const data = await res.json();
    if (!res.ok) throw new Error(`${data.message} (${res.status})`);
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
    alert(err);
  }
};
