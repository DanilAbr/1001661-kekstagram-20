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
  var img = modal.querySelector('.img-upload__preview img');
  var effectButtons = modal.querySelectorAll('input[name="effect"]');
  var buttonMin = document.querySelector('.scale__control--smaller');
  var buttonMax = document.querySelector('.scale__control--bigger');

  function changePreviewClass(id) {
    var formatedId = id.slice(7);
    if (img.className) {
      img.className = '';
    }
    img.classList.add('effects__preview--' + formatedId);
  }

  function addOrRemoveSlider() {
    if (img.className === 'effects__preview--none') {
      slider.classList.add('hidden');
    } else {
      slider.classList.remove('hidden');
    }
  }

  function setDefaultSliderValue() {
    effectLine.style.width = bar.offsetWidth + 'px';
    pin.style.left = bar.offsetWidth + 'px';

    switch (img.className) {
      case Effect.CHROME:
        img.style.filter = 'grayscale(1)';
        break;
      case Effect.SEPIA:
        img.style.filter = 'sepia(1)';
        break;
      case Effect.MARVIN:
        img.style.filter = 'invert(100%)';
        break;
      case Effect.PHOBOS:
        img.style.filter = 'blur(3px)';
        break;
      case Effect.HEAT:
        img.style.filter = 'brightness(3)';
        break;
      default:
        img.style.filter = 'none';
    }
  }

  function onPreviewEffectClick(id) {
    changePreviewClass(id);
    addOrRemoveSlider();
    setDefaultSliderValue();
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

    switch (img.className) {
      case Effect.CHROME:
        img.style.filter = 'grayscale(' + filterLevel + ')';
        break;
      case Effect.SEPIA:
        img.style.filter = 'sepia(' + filterLevel + ')';
        break;
      case Effect.MARVIN:
        img.style.filter = 'invert(' + filterLevel * 100 + '%)';
        break;
      case Effect.PHOBOS:
        img.style.filter = 'blur(' + filterLevel * 3 + 'px)';
        break;
      case Effect.HEAT:
        img.style.filter = 'brightness(' + filterLevel * 3 + ')';
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

  function addEffectButtonsEventListeners() {
    effectButtons.forEach(function (item) {
      item.addEventListener('click', function (evt) {
        onPreviewEffectClick(evt.target.id);
      });
    });
  }

  function removeEffectButtonsEventListeners() {
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

  function addResizeButtonsEventListeners() {
    buttonMax.addEventListener('click', onButtonMaxClick);
    buttonMin.addEventListener('click', onButtonMinClick);
  }

  function removeResizeButtonsEventListeners() {
    buttonMax.removeEventListener('click', onButtonMaxClick);
    buttonMin.removeEventListener('click', onButtonMinClick);
  }

  var sizeValue = document.querySelector('.scale__control--value');
  sizeValue.value = '100%';

  window.effect = {
    resetEffects: resetEffects,
    addPinEventListener: addPinEventListener,
    removePinEventListener: removePinEventListener,
    addEffectButtonsEventListeners: addEffectButtonsEventListeners,
    removeEffectButtonsEventListeners: removeEffectButtonsEventListeners,
    addResizeButtonsEventListeners: addResizeButtonsEventListeners,
    removeResizeButtonsEventListeners: removeResizeButtonsEventListeners,
  };
})();
