'use strict';

(function () {
  var bigPictureContainer = document.querySelector('.big-picture');
  var socialComments = bigPictureContainer.querySelector('.social__comments');
  var socialCommentCount = bigPictureContainer.querySelector('.social__comment-count');
  var commentsLoader = bigPictureContainer.querySelector('.comments-loader');

  function createCommentElement(comment) {
    var commentItem = window.util.createElement('li', 'social__comment');
    var img = window.util.createElement('img', 'social__picture');

    img.src = comment.avatar;
    img.alt = comment.name;
    commentItem.appendChild(img);

    var commentText = window.util.createElement('p', 'social__text', comment.message);
    commentItem.appendChild(commentText);

    return commentItem;
  }

  function createBigPhoto(a) {
    var bigPhoto = window.data.photos[a];
    var bigPictureImg = bigPictureContainer.querySelector('img');
    var likesCount = bigPictureContainer.querySelector('.likes-count');
    var commentsCount = bigPictureContainer.querySelector('.comments-count');
    var socialCaption = bigPictureContainer.querySelector('.social__caption');

    bigPictureImg.src = bigPhoto.url;
    likesCount.textContent = bigPhoto.likes;
    commentsCount.textContent = bigPhoto.comments.length;
    socialCaption.textContent = bigPhoto.description;
    window.util.renderElements(bigPhoto.comments, createCommentElement, socialComments);
  }

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

  previews.forEach(function (item, i) {
    item.addEventListener('click', function () {
      createBigPhoto(i);
      showBigPicture();
      buttonClose.addEventListener('click', onButtonCloseClick);
    });
  });

  socialCommentCount.classList.add('hidden');
  commentsLoader.classList.add('hidden');
})();
