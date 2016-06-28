(function() {
  'use strict';

  angular
    .module('bluetoothConfig')
    .run(appRun);

  appRun.$inject = [
    'routerHelper'
  ];

  function appRun(routerHelper) {
    routerHelper.configureStates(getStates(), '/bluetooth');
  }

  function getStates() {
    return [{
      state: 'main',
      config: {
        views: {
          'app': {
            templateUrl: 'components/core/app.template.html',
            controller: 'AppController',
            controllerAs: 'mac'
          }
        },
        url: '/'
      }
    }];
  }
})();
