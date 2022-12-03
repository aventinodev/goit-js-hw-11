// import axios from 'axios';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
// // import SimpleLightbox from 'simplelightbox';
// import 'simplelightbox/dist/simple-lightbox.min.css';
import { fetch } from './fetch';

const refs = {
  form: document.querySelector('.search-form'),
  // button: document.querySelector('button'),
};

refs.form.addEventListener('submit', onSearch);

function onSearch(e) {
  e.preventDefault();
  let q = e.currentTarget.elements.searchQuery.value.trim();

  fetch(q)
    .then(data => {
      console.log(data);
    })
    .catch(error => {
      onError();
    });
}

// function templateCard() {

// }

function onError() {
  Notify.failure('Oops, it is error');
}
