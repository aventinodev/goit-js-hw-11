import { Notify } from 'notiflix/build/notiflix-notify-aio';

function onTotalHits(totalHits) {
  Notify.success(`Hooray! We found ${totalHits} images.`);
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
  Notify.info('You have reached the last page. Try new request');
}

export { onTotalHits, onWornEmptyField, onInfo, onError, onReachedTheEnd };
