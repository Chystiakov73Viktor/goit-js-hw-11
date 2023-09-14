import axios from 'axios';
import Notiflix from 'notiflix';

const BASE_URL = 'https://pixabay.com/api/';
const KEY = '39345214-717d6f4bf0efce76fbf95fde4';

export const fetchCardURL = async (query, page, perPage) => {
  try {
    const response = await axios.get(`${BASE_URL}`, {
      params: {
        key: `${KEY}`,
        q: `${query}`,
        page: `${page}`,
        per_page: `${perPage}`,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
      },
    });
    const data = response.data;
    return data;
  } catch (errors) {
    Notiflix.Notify.failure(
      "We're sorry, but you've reached the end of search results.",
      {
        position: 'center-center',
        timeout: 4000,
        width: '400px',
        fontSize: '18px',
      }
    );
  }
};
