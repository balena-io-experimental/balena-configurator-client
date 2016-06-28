(function() {
    'use strict';

    angular
        .module('bluetoothConfig', [
          //External modules
          'ngAnimate',
          'ngAria',
          'ngMaterial',
          'ngCookies',
          'ngSanitize',
          'LocalStorageModule',
          'ngCordova',

          //internal modules
          'app.router',
          'app.bluetooth'
        ]);
})();
