const customFetch = async (url, method = 'GET', headers = {}, body = '') => {
  try {
    const response = await fetch(url, {
      method,
      headers,
      body: body === '' ? null : body,
    });
    const responseData = await response.json();
    return responseData;
  } catch (error) {
    return (document.querySelector('.fetch-error').textContent =
      "Une erreur s'est produite lors du chargement des données, veuillez réessayer plus tard");
  }
};
// eslint-disable-next-line no-undef
const unsplashKey = process.env.UNSPLASH_KEY;
async function searchUnsplash(searchQuery) {
  const endpoint = `https://api.unsplash.com/search/photos?query=${searchQuery}&client_id=${unsplashKey}`;
  try {
    if (!unsplashKey) {
      return './assets/images/missingApiKey.jpeg';
    }
    const response = await fetch(endpoint);
    const responseData = await response.json();
    let url;
    responseData.results?.[0]?.urls?.regular
      ? (url = responseData.results[0].urls.regular)
      : (url =
          'https://images.unsplash.com/photo-1622428051717-dcd8412959de?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1160&q=80');
    return url;
  } catch (error) {
    error;
  }
}

// create DOM element
/**
 *
 * @param {*} type(balise)
 * @param {*} text(contenu)
 * @param {*} className(style)
 * @param {*} attributes(src, alt, index, etc...)
 * @returns
 */
const createGenericElement = (
  type,
  text = '',
  className = '',
  attributes = []
) => {
  const element = document.createElement(type);
  if (text) {
    element.textContent = text;
  }
  if (className) {
    element.className = className;
  }
  if (attributes) {
    attributes.forEach((attribute) => {
      element.setAttribute(attribute.name, attribute.value);
    });
  }
  return element;
};

const normalizeText = (text) => {
  return text
    .toLowerCase()
    .normalize('NFD') // décomposer les graphèmes combinés en simple
    .replace(/[\u0300-\u036f]/g, ''); //enlever les signes diacritiques
};

const cleanError = (classname) => {
  document.querySelector(classname) &&
    document.querySelector(classname).remove();
};

const uniqueArray = (array) => {
  return array.filter((item, index) => array.indexOf(item) === index);
};

export {
  customFetch,
  createGenericElement,
  normalizeText,
  cleanError,
  searchUnsplash,
  uniqueArray,
};
