import {
  cleanError,
  createGenericElement,
  normalizeText,
  uniqueArray,
} from './utils/helpers';

export const mainSearch = (recipes, keyword) => {
  let filteredUniqueRecipes = [];
  let newRecipesList = [];
  if (keyword.length === 0) {
    cleanError('.error');
    return;
  }
  if (keyword.length < 3) {
    cleanError('.error');
    const error = createGenericElement('div', '', 'error');
    error.innerText = 'Veuillez entrer au moins 3 caractères';
    document.querySelector('.search-section').appendChild(error);
    return recipes;
  }
  cleanError('.error');
  for (let i = 0; i < recipes.length; i++) {
    if (normalizeText(recipes[i].name).includes(normalizeText(keyword))) {
      newRecipesList.push(recipes[i]);
    } else if (
      normalizeText(recipes[i].description).includes(normalizeText(keyword))
    ) {
      newRecipesList.push(recipes[i]);
    } else if (
      recipes[i].ingredients.toString().includes(normalizeText(keyword))
    ) {
      newRecipesList.push(recipes[i]);
    }
    filteredUniqueRecipes = uniqueArray(newRecipesList);
  }
  return filteredUniqueRecipes;
};
