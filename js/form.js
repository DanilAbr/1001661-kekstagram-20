'use strict';

(function () {
  var modal = document.querySelector('.img-upload__overlay');
  var buttonClose = modal.querySelector('.img-upload__cancel');
  var inputUpload = document.querySelector('#upload-file');
  var textarea = modal.querySelector('.text__description');
  var form = document.querySelector('.img-upload__form');
  var main = document.querySelector('main');
  var successTemplate = document.querySelector('#success').content.querySelector('section');
  var errorTemplate = document.querySelector('#error').content.querySelector('section');

  function onModalEscPress(evt) {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      onButtonCloseClick();
    }
  }

  function onInputUploadChange() {
    modal.classList.remove('hidden');
    document.body.classList.add('modal-open');
    buttonClose.addEventListener('click', onButtonCloseClick);
    document.addEventListener('keydown', onModalEscPress);
    window.effect.addPinEventListener();
    window.effect.addEffectsButtonEventListener();
    addFormEventListeners();
    window.effect.resetEffects();
  }

  function onButtonCloseClick() {
    modal.classList.add('hidden');
    document.body.classList.remove('modal-open');
    buttonClose.removeEventListener('click', onButtonCloseClick);
    document.removeEventListener('keydown', onModalEscPress);
    inputUpload.value = '';
    window.effect.removePinEventListener();
    window.effect.removeEffectButtonsEventListener();
    form.reset();
  }

  function createModalMessage(element) {
    var button = element.querySelector('button');

    function onModalSuccessEscPress(evt) {
      if (evt.key === 'Escape') {
        evt.preventDefault();
        closeModal();
      }
    }

    function closeModal() {
      element.remove();
      document.removeEventListener('keydown', onModalSuccessEscPress);
      document.removeEventListener('click', onOutsideModalClick);
    }

    function onOutsideModalClick(evt, modalElement) {
      modalElement = element.querySelector('div');
      if (!modalElement.contains(evt.target)) {
        closeModal();
      }
    }

    document.addEventListener('keydown', onModalSuccessEscPress);
    document.addEventListener('click', onOutsideModalClick);

    button.addEventListener('click', function () {
      element.remove();
    });

    return element;
  }

  function renderModalMessage(element) {
    main.appendChild(createModalMessage(element));
  }

  function onSuccess() {
    modal.classList.add('hidden');
    renderModalMessage(successTemplate);
  }

  function onError() {
    modal.classList.add('hidden');
    renderModalMessage(errorTemplate);
  }

  function upload() {
    window.backend.transferData(
        'POST',
        window.backend.SEND_URL,
        onSuccess,
        '',
        onError,
        new FormData(form)
    );
  }

  function onFormSubmit(evt) {
    evt.preventDefault();
    upload();
    form.reset();
  }

  function addOrRemoveEscListeners() {
    textarea.addEventListener('focus', function () {
      document.removeEventListener('keydown', onModalEscPress);
    });

    textarea.addEventListener('blur', function () {
      document.addEventListener('keydown', onModalEscPress);
    });
  }

  function addFormEventListeners() {
    form.addEventListener('submit', function (evt) {
      onFormSubmit(evt);
    });

    addOrRemoveEscListeners();
  }

  inputUpload.addEventListener('change', function () {
    onInputUploadChange();
  });
})();
