'use strict';

(function () {
  var filterButtons = document.querySelectorAll('.img-filters__button');
  var buttonFilterDiscussed = document.querySelector('#filter-discussed');
  var buttonFilterRandom = document.querySelector('#filter-random');
  var buttonFilterDefault = document.querySelector('#filter-default');

  function clearGallery() {
    var pictures = document.querySelectorAll('.picture');
    pictures.forEach(function (picture) {
      picture.remove();
    });
  }

  function renderGallery(photos) {
    clearGallery();
    var picturesList = document.querySelector('.pictures');

    window.util.renderElements(
        photos,
        window.picture.createPhotoElement,
        picturesList
    );
    window.picture.addPictureListners();
  }

  function showFilters() {
    var filters = document.querySelector('.img-filters');
    filters.classList.remove('img-filters--inactive');
  }

  function resetButtons() {
    filterButtons.forEach(function (button) {
      button.classList.remove('img-filters__button--active');
    });
  }

  function createRandomPhotosArray() {
    return window.util.shuffleArray(window.data.photos).slice(0, 10);
  }

  function photosComparator(left, right) {
    if (left > right) {
      return 1;
    } else if (left < right) {
      return -1;
    } else {
      return 0;
    }
  }

  function createDiscussedPhotosArray(array) {
    return array.
      slice().
      sort(function (left, right) {
        var rankDiff = left.comments.length - right.comments.length;
        if (rankDiff === 0) {
          rankDiff = photosComparator(left.url, right.url);
        }
        return rankDiff;
      });
  }

  function setClassActiveOnButton(evt) {
    resetButtons();
    evt.classList.add('img-filters__button--active');
  }

  var updateRandomGallery = window.util.debounce(function () {
    renderGallery(createRandomPhotosArray());
  });

  var updateDiscussedGallery = window.util.debounce(function () {
    renderGallery(createDiscussedPhotosArray(window.data.photos));
  });

  var updateDefaultGallery = window.util.debounce(function () {
    renderGallery(window.data.photos);
  });

  function onFilterButtonClick(evt) {
    setClassActiveOnButton(evt);

    switch (evt) {
      case buttonFilterRandom:
        updateRandomGallery();
        break;
      case buttonFilterDiscussed:
        updateDiscussedGallery();
        break;
      case buttonFilterDefault:
        updateDefaultGallery();
        break;
    }
  }

  filterButtons.forEach(function (button) {
    button.addEventListener('click', function (evt) {
      onFilterButtonClick(evt.target);
    });
  });

  window.gallery = {
    renderGallery: renderGallery,
    showFilters: showFilters,
  };
})();
