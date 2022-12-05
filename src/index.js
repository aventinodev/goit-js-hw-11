// import axios from 'axios';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
// // import SimpleLightbox from 'simplelightbox';
// import 'simplelightbox/dist/simple-lightbox.min.css';
import { onFetch } from './js/fetch-api';
// import { markupCardGallery } from './js/template';

const refs = {
  form: document.querySelector('.search-form'),
  gallery: document.querySelector('.gallery'),
  loadButton: document.querySelector('.load-more'),
};
let query = '';
let page = 1;
let perPage = 40;

refs.form.addEventListener('submit', onSearch);
refs.loadButton.addEventListener('click', onLoad);

function onSearch(e) {
  e.preventDefault();
  query = e.currentTarget.elements.searchQuery.value.trim();

  if (!query) {
    return onWornEmptyField();
  }
  onFetch(query, page, perPage)
    .then(query => {
      if (!query.hits.length) {
        onWorn();
      } else {
        onTotalHits(query);
        markupCardGallery(query.hits);
        console.log(query);

        refs.loadButton.classList.remove('is-hidden');
      }
    })
    .catch(error => {
      onError();
    });
  page += 1;
}
function onLoad(e) {
  page += 1;
  console.log(page);
  onFetch(query, page, perPage)
    .then(query => {
      onTotalHits(query);
      markupCardGallery(query.hits);
      console.log(query);
      console.log(page);
    })
    .catch(error => {
      onError();
    });
}

function onWornEmptyField() {
  Notify.warning('Field is empty. Please, enter your search query');
}
function onWorn() {
  Notify.warning(
    'Sorry, there are no images matching your search query. Please try again'
  );
}
function onTotalHits({ totalHits }) {
  Notify.success(`Hooray! We found ${totalHits} images.`);
}
function onError() {
  Notify.failure('Oops, somthing wrong!');
}

function templateCard({
  webformatURL,
  largeImageURL,
  tags,
  likes,
  views,
  comments,
  downloads,
}) {
  return `<div class="photo-card">
        <a class="gallery__link" href="${largeImageURL} target="_blank" rel="noopener noreferrer">
        <div class="gallery__wrap">
        <img class="gallery__img" src="${webformatURL}" alt="${tags}" loading="lazy" width="480" />
       </div>
        <div class="gallery__info">
          <p class="gallery__item">
            <b>Likes</b>${likes}
          </p>
          <p class="gallery__item">
            <b>Views</b>${views}
          </p>
          <p class="gallery__item">
            <b>Comments</b>${comments}
          </p>
          <p class="gallery__item">
            <b>Downloads</b>${downloads}
          </p>
        </div>
       </a>
       </div>`;
}
function markupCardGallery(hits) {
  const galerryMarkup = hits.map(templateCard).join('');
  refs.gallery.innerHTML = galerryMarkup;
}
