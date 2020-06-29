'use strict';

(function () {
  var SUCCESS_CODE = 200;

  var GET_URL = 'https://javascript.pages.academy/kekstagram/data';

  function createErrorMessage(errorMessage) {
    var node = document.createElement('div');
    node.style = 'z-index: 10; padding: 100px; text-align: center; background: tomato; position: absolute; left: 0; right: 0; font-size: 30px';
    node.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);
  }

  function transferData(metod, url, onSuccess, renderFunction, onError, data) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === SUCCESS_CODE) {
        onSuccess(xhr.response, renderFunction);
      } else {
        onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });

    xhr.open(metod, url);
    xhr.send(data);
  }

  window.backend = {
    transferData: transferData,
    GET_URL: GET_URL,
    createErrorMessage: createErrorMessage,
  };
})();
