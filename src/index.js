// import { Notify } from 'notiflix/build/notiflix-notify-aio';
var debounce = require('lodash.debounce');
import { onFetch } from './js/fetch-api';
import { markupCardGallery } from './js/template';
import SimpleLightbox from '~node_modules/simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import './sass/main.scss';
import * as append from './js/append';
// import { onScroll } from './js/scroll';
// import { onInfinityScroll } from './js/infinity_scroll';

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

let galleryLightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});

refs.form.addEventListener('submit', onSearch);
refs.loadButton.addEventListener('click', onLoad);
refs.input.addEventListener('focus', onClearField);

async function onSearch(e) {
  e.preventDefault();
  page = 1;
  onHideLoadBtn();
  refs.gallery.innerHTML = '';
  searchQuery = e.currentTarget.elements.searchQuery.value.trim();

  if (!searchQuery) {
    return append.onWornEmptyField();
  }
  try {
    const data = await onFetch(searchQuery, page, perPage);
    const { hits, totalHits } = data;
    if (!totalHits) {
      append.onInfo();
    } else {
      append.onTotalHits(totalHits);
      markupCardGallery(hits);
    }

    if (totalHits > perPage) {
      onShowLoadBtn();
      onLockSubmitBtn();
    }

    await galleryLightbox.refresh();
  } catch (error) {
    append.onError();
  }
}

async function onLoad(e) {
  page += 1;
  try {
    const data = await onFetch(searchQuery, page, perPage);
    const { hits, totalHits } = data;
    if (totalHits - perPage * page < perPage) {
      unLockSubmitBtn();
      onHideLoadBtn();
      append.onReachedTheEnd();
    }
    onLockSubmitBtn();
    markupCardGallery(hits);

    // if (window.scrollY) {
    //   window.scroll(0, 0);
    // }

    await galleryLightbox.refresh();
  } catch (error) {
    append.onError();
  }
}

function onClearField(e) {
  refs.input.value = '';
  refs.gallery.innerHTML = '';
  unLockSubmitBtn();
  onHideLoadBtn();
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
