'use strict';

(function () {
  function renderGallery() {
    var picturesList = document.querySelector('.pictures');

    window.util.renderElements(
        window.data.photos,
        window.picture.createPhotoElement,
        picturesList
    );

    window.picture.addPictureListners();
  }

  window.gallery = {
    renderGallery: renderGallery,
  };
})();
