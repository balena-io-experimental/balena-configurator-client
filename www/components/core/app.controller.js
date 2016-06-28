(function() {
  'use strict';

  angular
    .module('bluetoothConfig')
    .controller('AppController', AppController);

  AppController.$inject = [
    '$scope',
    '$state',
    'localStorageService',
  ];

  /* @ngInject */
  function AppController($scope, $state, localStorageService) {
    var vm = this;

    vm.previousState = previousState;

    $scope.$on('$stateChangeSuccess', function() {
      vm.currentState = $state.current.name;
    })

    activate();

    function activate() {

    }

    //back button function to go back from children to parent
    //max parent in our case is main
    function previousState() {
      var parentStateName = $state.$current.parent.self.name;
      if (parentStateName !== 'main') {
        $state.go(parentStateName);
      }
    }
  }
})();
