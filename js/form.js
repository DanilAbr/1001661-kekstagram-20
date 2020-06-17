'use strict';

(function () {
  var modal = document.querySelector('.img-upload__overlay');
  var closeButton = modal.querySelector('.img-upload__cancel');
  var inputUpload = document.querySelector('#upload-file');

  function onModalEscPress(evt) {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      onCloseButtonClick();
    }
  }

  function onInputUploadChange() {
    modal.classList.remove('hidden');
    document.body.classList.add('modal-open');
    closeButton.addEventListener('click', onCloseButtonClick);
    document.addEventListener('keydown', onModalEscPress);
  }

  function onCloseButtonClick() {
    modal.classList.add('hidden');
    document.body.classList.remove('modal-open');
    closeButton.removeEventListener('click', onCloseButtonClick);
    document.removeEventListener('keydown', onModalEscPress);
    inputUpload.value = '';
  }

  inputUpload.addEventListener('change', function () {
    onInputUploadChange();
  });

  // var pinEffect = modal.querySelector('.effect-level__pin');
  // var effectLevelLine = modal.querySelector('.effect-level__line');
  var slider = modal.querySelector('.img-upload__effect-level');

  // pinEffect.addEventListener('click', function (evt) {
  //   var currentPosition = +getComputedStyle(evt.target)['left'].slice(0, -2);
  //   var maxWidth = effectLevelLine.offsetWidth;
  //   var filterLevel = currentPosition / maxWidth;

  var imageUploadPreview = modal.querySelector('.img-upload__preview img');
  var effects = modal.querySelectorAll('input[name="effect"]');

  slider.classList.add('hidden');

  function changePreviewClass(evt) {
    var id = evt.target.id.slice(7);
    var currentClass = 'effects__preview--' + id;

    if (imageUploadPreview.className) {
      imageUploadPreview.className = '';
    }
    imageUploadPreview.classList.add(currentClass);
  }

  function addOrRemoveSlider() {
    if (imageUploadPreview.className === 'effects__preview--none') {
      slider.classList.add('hidden');
    } else {
      slider.classList.remove('hidden');
    }
  }

  function onPreviewEffectClick(evt) {
    changePreviewClass(evt);
    addOrRemoveSlider();
  }

  effects.forEach(function (item) {
    item.addEventListener('click', function (evt) {
      onPreviewEffectClick(evt);
    });
  });
})();
