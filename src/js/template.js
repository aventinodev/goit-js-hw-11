const refs = {
  gallery: document.querySelector('.gallery'),
};

function templateCard({
  webformatURL,
  largeImageURL,
  tags,
  likes,
  views,
  comments,
  downloads,
}) {
  return `     
        <div class="gallery__wrap">
        <a class="gallery__link" href="${largeImageURL}" rel="noopener noreferrer">
          <img class="gallery__img" src="${webformatURL}" alt="${tags}" loading="lazy" /></a>
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
        </div>`;
}
function markupCardGallery(hits) {
  const galerryMarkup = hits.map(templateCard).join('');
  refs.gallery.insertAdjacentHTML('beforeend', galerryMarkup);
}

export { markupCardGallery };
