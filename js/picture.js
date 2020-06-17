'use strict';

(function () {
  var pictureTemplate = document.querySelector('#picture').content.querySelector('a');
  var picturesList = document.querySelector('.pictures');

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

  window.util.renderElements(window.data.photos, createPhotoElement, picturesList);
})();
