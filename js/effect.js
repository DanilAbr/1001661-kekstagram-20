'use strict';

(function () {
  var Effect = {
    CHROME: 'effects__preview--chrome',
    SEPIA: 'effects__preview--sepia',
    MARVIN: 'effects__preview--marvin',
    PHOBOS: 'effects__preview--phobos',
    HEAT: 'effects__preview--heat',
  };

  var modal = document.querySelector('.img-upload__overlay');
  var pin = modal.querySelector('.effect-level__pin');
  var bar = modal.querySelector('.effect-level__line');
  var slider = modal.querySelector('.img-upload__effect-level');
  var effectLine = modal.querySelector('.effect-level__depth');
  var imageUploadPreview = modal.querySelector('.img-upload__preview img');
  var effectButtons = modal.querySelectorAll('input[name="effect"]');

  function changePreviewClass(id) {
    var formatedId = id.slice(7);
    if (imageUploadPreview.className) {
      imageUploadPreview.className = '';
    }
    imageUploadPreview.classList.add('effects__preview--' + formatedId);
  }

  function addOrRemoveSlider() {
    if (imageUploadPreview.className === 'effects__preview--none') {
      slider.classList.add('hidden');
    } else {
      slider.classList.remove('hidden');
    }
  }

  function onPreviewEffectClick(id) {
    changePreviewClass(id);
    addOrRemoveSlider();
    setDefaultSliderValue();
  }

  function setDefaultSliderValue() {
    effectLine.style.width = bar.offsetWidth + 'px';
    pin.style.left = bar.offsetWidth + 'px';

    switch (imageUploadPreview.className) {
      case Effect.CHROME:
        imageUploadPreview.style.filter = 'grayscale(1)';
        break;
      case Effect.SEPIA:
        imageUploadPreview.style.filter = 'sepia(1)';
        break;
      case Effect.MARVIN:
        imageUploadPreview.style.filter = 'invert(100%)';
        break;
      case Effect.PHOBOS:
        imageUploadPreview.style.filter = 'blur(3px)';
        break;
      case Effect.HEAT:
        imageUploadPreview.style.filter = 'brightness(3)';
        break;
      default:
        imageUploadPreview.style.filter = 'none';
    }
  }

  function resetEffects() {
    slider.classList.add('hidden');
    changePreviewClass('effect-none');
    setDefaultSliderValue();
  }

  function setEffectLevel() {
    var filterLevel = pin.offsetLeft / bar.offsetWidth;
    var effectInput = modal.querySelector('.effect-level__value');

    effectInput.value = Math.round(filterLevel * 100);

    switch (imageUploadPreview.className) {
      case Effect.CHROME:
        imageUploadPreview.style.filter = 'grayscale(' + filterLevel + ')';
        break;
      case Effect.SEPIA:
        imageUploadPreview.style.filter = 'sepia(' + filterLevel + ')';
        break;
      case Effect.MARVIN:
        imageUploadPreview.style.filter = 'invert(' + filterLevel * 100 + '%)';
        break;
      case Effect.PHOBOS:
        imageUploadPreview.style.filter = 'blur(' + filterLevel * 3 + 'px)';
        break;
      case Effect.HEAT:
        imageUploadPreview.style.filter = 'brightness(' + filterLevel * 3 + ')';
        break;
    }
  }

  function onPinMousedown(evt) {
    evt.preventDefault();

    var startCoordX = evt.clientX;

    function onMouseMove(moveEvt) {
      moveEvt.preventDefault();

      var shiftX = startCoordX - moveEvt.clientX;
      startCoordX = moveEvt.clientX;

      pin.style.left = (pin.offsetLeft - shiftX) + 'px';

      if (pin.offsetLeft < 0 || pin.offsetLeft > bar.offsetWidth) {
        pin.style.left = (pin.offsetLeft + shiftX) + 'px';
      } else {
        effectLine.style.width = pin.offsetLeft + 'px';
      }

      setEffectLevel();
    }

    function onMouseUp(upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    }

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  }

  function addEffectButtonsEventListener() {
    effectButtons.forEach(function (item) {
      item.addEventListener('click', function (evt) {
        onPreviewEffectClick(evt.target.id);
      });
    });
  }

  function removeEffectButtonsEventListener() {
    effectButtons.forEach(function (item) {
      item.removeEventListener('click', function (evt) {
        onPreviewEffectClick(evt.target.id);
      });
    });
  }

  function addPinEventListener() {
    pin.addEventListener('mousedown', onPinMousedown);
  }

  function removePinEventListener() {
    pin.removeEventListener('mousedown', onPinMousedown);
  }

  var buttonMin = document.querySelector('.scale__control--smaller');
  var buttonMax = document.querySelector('.scale__control--bigger');
  var sizeValue = document.querySelector('.scale__control--value');
  var img = document.querySelector('.img-upload__preview img');
  sizeValue.value = '100%';

  function changeImgSize(percent) {
    img.style.transform = 'scale(' + percent / 100 + ')';
  }

  function onButtonMinClick() {
    var imgValue = sizeValue.value.slice(0, -1);
    sizeValue.value = '';

    if (imgValue > 25) {
      imgValue -= 25;
    }
    sizeValue.value += imgValue + '%';
    changeImgSize(imgValue);
  }

  function onButtonMaxClick() {
    var imgValue = sizeValue.value.slice(0, -1);
    sizeValue.value = '';

    if (imgValue < 100) {
      imgValue = +imgValue + 25;
    }
    sizeValue.value += imgValue + '%';
    changeImgSize(imgValue);
  }

  buttonMax.addEventListener('click', function () {
    onButtonMaxClick();
  });

  buttonMin.addEventListener('click', function () {
    onButtonMinClick();
  });

  window.effect = {
    resetEffects: resetEffects,
    addPinEventListener: addPinEventListener,
    removePinEventListener: removePinEventListener,
    addEffectsButtonEventListener: addEffectButtonsEventListener,
    removeEffectButtonsEventListener: removeEffectButtonsEventListener,
  };
})();
