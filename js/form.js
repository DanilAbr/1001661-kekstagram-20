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
  // var slider = modal.querySelector('.img-upload__effect-level');

  // slider.classList.add('hidden');

  // pinEffect.addEventListener('click', function (evt) {
  //   var currentPosition = +getComputedStyle(evt.target)['left'].slice(0, -2);
  //   var maxWidth = effectLevelLine.offsetWidth;
  //   var filterLevel = currentPosition / maxWidth;
})();
