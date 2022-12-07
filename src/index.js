import { Notify } from 'notiflix/build/notiflix-notify-aio';

import { onFetch } from './js/fetch-api';
import { markupCardGallery } from './js/template';
import SimpleLightbox from '~node_modules/simplelightbox';
// import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import * as append from './js/append';
// import { onScroll } from './js/scroll';

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
// =================================================
async function onSearch(e) {
  e.preventDefault();

  page = 1;
  append.onHideLoadBtn;
  refs.gallery.innerHTML = '';
  searchQuery = e.currentTarget.elements.searchQuery.value.trim();

  if (!searchQuery) {
    return append.onWornEmptyField;
  }
  try {
    await onFetch(searchQuery, page, perPage).then(({ hits, totalHits }) => {
      if (!totalHits) {
        append.onInfo;
      } else {
        append.onTotalHits;
        markupCardGallery(hits);
      }

      if (totalHits > perPage) {
        append.onShowLoadBtn;
        append.onLockSubmitBtn;
      }
    });
    await galleryLightbox.refresh();
  } catch (error) {
    append.onError;
  }
}
// ===================================
// function onSearch(e) {
//   e.preventDefault();

//   page = 1;
//   onHideLoadBtn();
//   refs.gallery.innerHTML = '';
//   searchQuery = e.currentTarget.elements.searchQuery.value.trim();
//   onFetch(searchQuery, page, perPage)
//     .then(({ hits, totalHits }) => {
//       cards = hits;
//       amountCards = totalHits;

//       if (!amountCards) {
//         onInfo();
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
// ===================================================

async function onLoad(e) {
  page += 1;
  try {
    await onFetch(searchQuery, page, perPage).then(({ hits, totalHits }) => {
      if (totalHits - perPage * page < perPage) {
        append.unLockSubmitBtn;
        append.onHideLoadBtn;
        append.onReachedTheEnd;
      }
      append.onLockSubmitBtn;
      markupCardGallery(hits);
    });
    await galleryLightbox.refresh();
  } catch (error) {
    append.onError;
  }
}
//=======================================
// function onLoad(e) {
//   page += 1;
//   onFetch(searchQuery, page, perPage)
//     .then(({ hits, totalHits }) => {
//       markupCardGallery(hits);
//       galleryLightbox.refresh();
//       onLockSubmitBtn();

//       if (amountCards - perPage * page < perPage) {
//         unLockSubmitBtn();
//         onHideLoadBtn();
//         onReachedTheEnd();
//       }
//     })
//     .catch(error => {
//       onError();
//     });
// }
// ======================================
function onClearField(e) {
  refs.input.value = '';
  refs.gallery.innerHTML = '';
  append.unLockSubmitBtn;
  append.onHideLoadBtn;
}
