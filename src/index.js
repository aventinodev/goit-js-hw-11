import { Notify } from 'notiflix/build/notiflix-notify-aio';
// import SimpleLightbox from '~node_modules/simplelightbox';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { onFetch } from './js/fetch-api';
import { markupCardGallery } from './js/template';
// import * as append from './js/append';

const refs = {
  form: document.querySelector('.search-form'),
  gallery: document.querySelector('.gallery'),
  loadButton: document.querySelector('.load-more'),
  submitBtn: document.querySelector('.search-form button'),
  input: document.querySelector('.search-form input'),
};

let searchQuery = '';
let page = 1;
let perPage = 40;
let cards = [];
let amountCards = 0;

let galleryLightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});

refs.form.addEventListener('submit', onSearch);
refs.loadButton.addEventListener('click', onLoad);
refs.input.addEventListener('focus', onClearField);

function onSearch(e) {
  e.preventDefault();

  page = 1;
  onHideLoadBtn();
  refs.gallery.innerHTML = '';
  searchQuery = e.currentTarget.elements.searchQuery.value.trim();

  if (!searchQuery) {
    return onWornEmptyField();
  }
  //   const fetchData = await onFetch(searchQuery, page, perPage)
  //     .then(({ hits, totalHits }) => {
  //       cards = hits;
  //       amountCards = totalHits;

  //       if (!amountCards) {
  //         onWorn();
  //       } else {
  //         onTotalHits(totalHits);
  //         markupCardGallery(cards);
  //         galleryLightbox.refresh();
  //       }
  //       if (amountCards > perPage) {
  //         onShowLoadBtn();
  //         onLockSubmitBtn();
  //       }
  //     })
  //     .catch(error => {
  //       onError();
  //     });
  // }

  onFetch(searchQuery, page, perPage)
    .then(({ hits, totalHits }) => {
      cards = hits;
      amountCards = totalHits;

      if (!amountCards) {
        onInfo();
      } else {
        onTotalHits(totalHits);
        markupCardGallery(cards);
        galleryLightbox.refresh();
      }
      if (amountCards > perPage) {
        onShowLoadBtn();
        onLockSubmitBtn();
      }
    })
    .catch(error => {
      onError();
    });
}
function onLoad(e) {
  page += 1;
  onFetch(searchQuery, page, perPage)
    .then(({ hits, totalHits }) => {
      cards = hits;
      amountCards = totalHits;

      markupCardGallery(cards);
      galleryLightbox.refresh();
      onLockSubmitBtn();

      if (amountCards - perPage * page < perPage) {
        unLockSubmitBtn();
        onHideLoadBtn();
        onReachedTheEnd();
      }
    })
    .catch(error => {
      onError();
    });
}

function onClearField(e) {
  refs.input.value = '';
  unLockSubmitBtn();
}

function onHideLoadBtn() {
  refs.loadButton.classList.add('is-hidden');
}

function onShowLoadBtn() {
  refs.loadButton.classList.remove('is-hidden');
}
function onLockSubmitBtn() {
  refs.submitBtn.setAttribute('disabled', true);
}
function unLockSubmitBtn() {
  refs.submitBtn.removeAttribute('disabled');
}
function onWornEmptyField() {
  Notify.warning('Field is empty. Please, enter your search query');
}
function onInfo() {
  Notify.info(
    'Sorry, there are no images matching your search query. Please try again'
  );
}
function onTotalHits(totalHits) {
  Notify.success(`Hooray! We found ${totalHits} images.`);
}
function onError() {
  Notify.failure('Oops, somthing wrong!');
}
function onReachedTheEnd() {
  Notify.info('You have reached the maximum. Try new request');
}
