'use strict';

(function () {
  var SUCCESS_CODE = 200;

  var GET_URL = 'https://javascript.pages.academy/kekstagram/data';
  var SEND_URL = 'https://javascript.pages.academy/kekstagram';

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
    SEND_URL: SEND_URL,
  };
})();
