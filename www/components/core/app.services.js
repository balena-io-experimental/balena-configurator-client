(function() {
  'use strict';

  angular
    .module('bluetoothConfig')
    .factory('appService', appService);

  appService.$inject = ['$http'];

  /* @ngInject */
  function appService($http) {
    var service = {

    };



    return service;
  }
})();
