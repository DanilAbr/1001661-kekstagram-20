'use strict';

(function () {
  var modal = document.querySelector('.img-upload__overlay');
  var pin = modal.querySelector('.effect-level__pin');
  var bar = modal.querySelector('.effect-level__line');
  var slider = modal.querySelector('.img-upload__effect-level');
  var effectLine = modal.querySelector('.effect-level__depth');

  var imageUploadPreview = modal.querySelector('.img-upload__preview img');
  var effects = modal.querySelectorAll('input[name="effect"]');

  slider.classList.add('hidden');

  function changePreviewClass(evt) {
    var id = evt.target.id.slice(7);

    if (imageUploadPreview.className) {
      imageUploadPreview.className = '';
    }
    imageUploadPreview.classList.add('effects__preview--' + id);
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
    setDefaultSliderValue();
  }

  function setDefaultSliderValue() {
    effectLine.style.width = bar.offsetWidth + 'px';
    pin.style.left = bar.offsetWidth + 'px';

    switch (imageUploadPreview.className) {
      case 'effects__preview--chrome':
        imageUploadPreview.style.filter = 'grayscale(1)';
        break;
      case 'effects__preview--sepia':
        imageUploadPreview.style.filter = 'sepia(1)';
        break;
      case 'effects__preview--marvin':
        imageUploadPreview.style.filter = 'invert(100%)';
        break;
      case 'effects__preview--phobos':
        imageUploadPreview.style.filter = 'blur(3px)';
        break;
      case 'effects__preview--heat':
        imageUploadPreview.style.filter = 'brightness(3)';
        break;
      default:
        imageUploadPreview.style.filter = 'none';
    }
  }

  pin.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startCoordX = evt.clientX;

    function onMouseMove(moveEvt) {
      moveEvt.preventDefault();

      var shiftX = startCoordX - moveEvt.clientX;
      startCoordX = moveEvt.clientX;

      pin.style.left = (pin.offsetLeft - shiftX) + 'px';
      effectLine.style.width = pin.offsetLeft + 'px';

      if (pin.offsetLeft < 0 || pin.offsetLeft > bar.offsetWidth) {
        pin.style.left = (pin.offsetLeft + shiftX) + 'px';
      }

      setEffectLevel();
    }

    function setEffectLevel() {
      var filterLevel = pin.offsetLeft / bar.offsetWidth;
      var effectInput = modal.querySelector('.effect-level__value');

      effectInput.value = Math.round(filterLevel * 100);

      switch (imageUploadPreview.className) {
        case 'effects__preview--chrome':
          imageUploadPreview.style.filter = 'grayscale(' + filterLevel + ')';
          break;
        case 'effects__preview--sepia':
          imageUploadPreview.style.filter = 'sepia(' + filterLevel + ')';
          break;
        case 'effects__preview--marvin':
          imageUploadPreview.style.filter = 'invert(' + filterLevel * 100 + '%)';
          break;
        case 'effects__preview--phobos':
          imageUploadPreview.style.filter = 'blur(' + filterLevel * 3 + 'px)';
          break;
        case 'effects__preview--heat':
          imageUploadPreview.style.filter = 'brightness(' + filterLevel * 3 + ')';
          break;
      }
    }

    function onMouseUp(upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    }

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

  effects.forEach(function (item) {
    item.addEventListener('click', function (evt) {
      onPreviewEffectClick(evt);
    });
  });
})();
