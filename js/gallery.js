'use strict';

(function () {
  function renderGallery(photos) {
    var picturesList = document.querySelector('.pictures');

    window.util.renderElements(
        photos,
        window.picture.createPhotoElement,
        picturesList
    );
    window.picture.addPictureListners();
  }

  window.gallery = {
    renderGallery: renderGallery,
  };
})();
