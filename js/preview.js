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

  function createBigPhoto(photo) {
    var bigPictureImg = bigPictureContainer.querySelector('img');
    var likesCount = bigPictureContainer.querySelector('.likes-count');
    var commentsCount = bigPictureContainer.querySelector('.comments-count');
    var socialCaption = bigPictureContainer.querySelector('.social__caption');
    var countComment = 0;

    function showPartOfComments(array) {
      countComment += 5;
      return array.slice(0, countComment);
    }

    function renderPartOfComments() {
      window.util.clearContainer(socialComments);
      window.util.renderElements(showPartOfComments(photo.comments), createCommentElement, socialComments);
    }

    bigPictureImg.src = photo.url;
    likesCount.textContent = photo.likes;
    commentsCount.textContent = photo.comments.length;
    socialCaption.textContent = photo.description;

    renderPartOfComments();

    commentsLoader.addEventListener('click', function () {
      renderPartOfComments();
    });
  }

  socialCommentCount.classList.add('hidden');

  window.preview = {
    createBigPhoto: createBigPhoto,
  };
})();
