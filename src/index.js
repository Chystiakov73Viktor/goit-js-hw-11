import Notiflix from 'notiflix';
import { fetchCardURL } from './js/cat-api';
import { cardMarkupImg } from './js/markup';
import { refs } from './js/refs';

const { formEl, cardContainerEl, loadMore } = refs;

let searchQuery = '';
let currentPage = 1;
let perPage = 40;

loadMore.hidden = true;

formEl.addEventListener('submit', onFopmSubmit);
loadMore.addEventListener('click', onLoadMore);

function onFopmSubmit(evt) {
  evt.preventDefault();
  searchQuery = evt.currentTarget.elements.searchQuery.value.trim();
  currentPage = 1;
  cardContainerEl.innerHTML = '';
  loadMore.style.display = 'none';
  loadMore.hidden = true;

  fetchCardURL(searchQuery, currentPage, perPage)
    .then(data => {
      const { hits, totalHits } = data;
      if (!totalHits || !searchQuery) {
        Notiflix.Notify.failure(
          'hello Sorry, there are no images matching your search query. Please try again.'
        );
        loadMore.hidden = true;
        return;
      }

      cardContainerEl.insertAdjacentHTML('beforeend', cardMarkupImg(hits));
      // Notiflix.Notify.success(`Hooray! We found ${totalHits} images.`);
      if (currentPage !== totalHits) {
        loadMore.style.display = 'block';
        loadMore.hidden = false;
      }
    })
    .catch(error => {
      Notiflix.Notify.failure('Sorry! Something went wrong!');
    });
}

function onLoadMore() {
  currentPage += 1;

  fetchCardURL(searchQuery, currentPage, perPage)
    .then(data => {
      const { hits, totalHits } = data;
      cardContainerEl.insertAdjacentHTML('beforeend', cardMarkupImg(hits));
      const totalPages = Math.ceil(totalHits / perPage);

      if (totalPages === currentPage) {
        loadMore.style.display = 'none';
        loadMore.hidden = true;
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
    })
    .catch(error => {
      Notiflix.Notify.failure('Sorry! Something went wrong!');
    });
}
