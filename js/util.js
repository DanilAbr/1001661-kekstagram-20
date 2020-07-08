'use strict';

(function () {
  function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  function createNumbers(numbersCount) {
    var numbers = [];
    for (var a = 1; a <= numbersCount; a++) {
      numbers.push(a);
    }
    return numbers;
  }

  function createNumbersArray(numbersCount) {
    var randomNumbers = [];
    var numbers = createNumbers(numbersCount);

    while (numbers.length > 0) {
      var randomNumber = numbers
        .splice(window.util.getRandomNumber(0, numbers.length - 1), 1)[0];
      randomNumbers.push(randomNumber);
    }

    return randomNumbers;
  }

  function getRandomArrayItem(array) {
    return array[Math.floor(Math.random() * array.length)];
  }

  function clearContainer(container) {
    while (container.firstChild) {
      container.removeChild(container.firstChild);
    }
  }

  function createElement(tagName, className, text) {
    var element = document.createElement(tagName);
    element.classList.add(className);
    if (text) {
      element.textContent = text;
    }
    return element;
  }

  function renderElements(array, cb, container) {
    var fragment = document.createDocumentFragment();

    array.forEach(function (item) {
      fragment.appendChild(cb(item));
    });

    container.appendChild(fragment);
  }

  function shuffleArray(array) {
    var shuffledArray = array.slice();
    for (var i = shuffledArray.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var t = shuffledArray[i];
      shuffledArray[i] = shuffledArray[j];
      shuffledArray[j] = t;
    }
    return shuffledArray;
  }

  function debounce(cb) {
    var DEBOUNCE_INTERVAL = 500;
    var lastTimeout = null;

    return function () {
      var parameters = arguments;
      if (lastTimeout) {
        window.clearTimeout(lastTimeout);
      }
      lastTimeout = window.setTimeout(function () {
        cb.apply(null, parameters);
      }, DEBOUNCE_INTERVAL);
    };
  }

  window.util = {
    renderElements: renderElements,
    createElement: createElement,
    getRandomNumber: getRandomNumber,
    getRandomArrayItem: getRandomArrayItem,
    createNumbersArray: createNumbersArray,
    clearContainer: clearContainer,
    shuffleArray: shuffleArray,
    debounce: debounce,
  };
})();
