import { Notify } from 'notiflix/build/notiflix-notify-aio';

function onHideLoadBtn() {
  refs.loadButton.classList.add('is-hidden');
}
function onTotalHits(totalHits) {
  Notify.success(`Hooray! We found ${totalHits} images.`);
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

function onError() {
  Notify.failure('Oops, somthing wrong!');
}
function onReachedTheEnd() {
  Notify.info('Sorry, you have reached the maximum. Try new request');
}

export {
  onTotalHits,
  onHideLoadBtn,
  onShowLoadBtn,
  onLockSubmitBtn,
  unLockSubmitBtn,
  onWornEmptyField,
  onInfo,
  onError,
  onReachedTheEnd,
};
