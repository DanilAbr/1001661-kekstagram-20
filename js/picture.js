'use strict';

(function () {
  var pictureTemplate = document.querySelector('#picture').content.querySelector('a');
  var bigPictureContainer = document.querySelector('.big-picture');

  function createPhotoElement(photo) {
    var photoElement = pictureTemplate.cloneNode(true);
    var image = photoElement.querySelector('.picture__img');
    var likes = photoElement.querySelector('.picture__likes');
    var countComment = photoElement.querySelector('.picture__comments');

    image.src = photo.url;
    likes.textContent = photo.likes;
    countComment.textContent = photo.comments.length;

    return photoElement;
  }

  function addPictureListners(photos) {
    var previews = document.querySelectorAll('.picture');
    var buttonClose = bigPictureContainer.querySelector('.big-picture__cancel');

    function onBigPictureEscPress(evt) {
      evt.preventDefault();
      if (evt.key === 'Escape') {
        onButtonCloseClick();
      }
    }

    function onButtonCloseClick() {
      bigPictureContainer.classList.add('hidden');
      buttonClose.removeEventListener('click', onButtonCloseClick);
      document.removeEventListener('keydown', onBigPictureEscPress);
    }

    function showBigPicture() {
      bigPictureContainer.classList.remove('hidden');
      document.addEventListener('keydown', onBigPictureEscPress);
    }

    function showCurrentPhoto(index) {
      window.preview.createBigPhoto(photos[index]);
      showBigPicture();
      buttonClose.addEventListener('click', onButtonCloseClick);
    }

    previews.forEach(function (preview, index) {
      preview.addEventListener('click', function () {
        showCurrentPhoto(index);
      });
    });
  }

  window.picture = {
    createPhotoElement: createPhotoElement,
    addPictureListners: addPictureListners,
  };
})();
