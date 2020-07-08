'use strict';

(function () {
  var isData = false;

  function onSuccess(data, renderFunction) {
    renderFunction(data);
    window.data.photos = data;
    window.gallery.showFilters();
  }

  function loadData(renderFunction) {
    if (!isData) {
      window.backend.transferData(
          'GET',
          window.backend.GET_URL,
          onSuccess,
          renderFunction,
          window.backend.createErrorMessage
      );
    }
    isData = true;
  }

  window.data = {
    loadData: loadData,
  };
})();
