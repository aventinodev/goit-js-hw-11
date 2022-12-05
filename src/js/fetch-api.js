const API_KEY = '31696679-bf9e6793322cb75217b9eb83f';
const BASE_URL = 'https://pixabay.com/api/';

export function onFetch(query, page, perPage) {
  const URL = `${BASE_URL}?key=${API_KEY}&q=${query}&image_type=photo&orientation=horizontal&safesearch=true&page${page}&per_page=${perPage}`;

  return fetch(URL).then(response => {
    if (!response.ok) {
      throw new Error(response.status);
    }
    console.log(query);
    return response.json();
  });
  // .catch(error => {
  //   console.log(error);
  // });
}
