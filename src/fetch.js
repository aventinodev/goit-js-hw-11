const API_KEY = '31696679-bf9e6793322cb75217b9eb83f';
const BASE_URL = 'https://pixabay.com/api/';
export function fetch(q) {
  const URL = `${BASE_URL}?key=${API_KEY}&q=${q}&image_type=photo&orientation=horizontal&safesearch=true&page=1&per_page=10`;
  return fetch(URL).then(response => {
    if (!response.ok) {
      throw new Error(response.status);
    }
    return response.json();
  });
  // .catch(error => {
  //   console.log(error);
  // });
}
