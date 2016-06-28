(function() {
  'use strict';

  angular
    .module('app.bluetooth')
    .run(appRun);

  appRun.$inject = [
    'routerHelper'
  ];

  function appRun(routerHelper) {
    routerHelper.configureStates(getStates());
  }

  function getStates() {
    return [{
      state: 'bluetooth',
      config: {
        parent: 'main',
        views: {
          'main': {
            templateUrl: 'components/bluetooth/bluetooth.template.html',
            controller: 'BluetoothController',
            controllerAs: 'bc'
          }
        },
        url: 'bluetooth'
      }
    }];
  }

})();
