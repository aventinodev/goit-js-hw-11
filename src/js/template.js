// function templateCard({
//   webformatURL,
//   largeImageURL,
//   tags,
//   likes,
//   views,
//   comments,
//   downloads,
// }) {
//   return `<div class="photo-card">
//         <a class="gallery__link" href="${largeImageURL} target="_blank" rel="noopener noreferrer">
//         <div class="gallery__wrap">
//         <img class="gallery__img" src="${webformatURL}" alt="${tags}" loading="lazy" width="480" />
//        </div>
//         <div class="gallery__info">
//           <p class="gallery__item">
//             <b>Likes</b>${likes}
//           </p>
//           <p class="gallery__item">
//             <b>Views</b>${views}
//           </p>
//           <p class="gallery__item">
//             <b>Comments</b>${comments}
//           </p>
//           <p class="gallery__item">
//             <b>Downloads</b>${downloads}
//           </p>
//         </div>
//        </a>
//        </div>`;
// }
// export function markupCardGallery(hits) {
//   const galerryMarkup = hits.map(templateCard).join('');
//   refs.gallery.innerHTML = galerryMarkup;
// }
