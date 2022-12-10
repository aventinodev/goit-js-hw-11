import axios from 'axios';

axios.defaults.baseURL = 'https://pixabay.com/api/';
const API_KEY = '31696679-bf9e6793322cb75217b9eb83f';

export async function onFetch(query, page, perPage) {
  try {
    const response = await axios.get(
      `?key=${API_KEY}&q=${query}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=${perPage}`
    );
    const data = await response.data;

    return data;
  } catch (error) {
    throw new Error(response.status);
  }
}
// ================METHOD FETCH============
// const BASE_URL = 'https://pixabay.com/api/';
// const API_KEY = '31696679-bf9e6793322cb75217b9eb83f';

// export function onFetch(query, page, perPage) {
//   const URL = `${BASE_URL}?key=${API_KEY}&q=${query}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=${perPage}`;

//   return fetch(URL).then(response => {
//     if (!response.ok) {
//       throw new Error(response.status);
//     }
//     return response.json();
//   });
// }
