(function() {
    'use strict';

    angular
        .module('app.bluetooth')
        .controller('BluetoothController', BluetoothController);

    BluetoothController.$inject = ['$scope', 'bluetoothService'];

    /* @ngInject */
    function BluetoothController($scope, bluetoothService) {
        var vm = this;

        vm.toggleScan = toggleScan;
        vm.configure = configure;
        vm.disconnect = disconnect;
        vm.information = information;
        vm.connected = null;
        vm.ssid = "";
        vm.psk = "";
        vm.devicesFound = false;
        vm.devices = [];

        function toggleScan() {
            if (!vm.loading) {
                vm.loading = true;
                vm.devicesFound = false;
                vm.devices = [];
                if (vm.connected) {

                }
                bluetoothService.disconnect(vm.connected);
                bluetoothService.startScan(function(device) {
                    vm.devicesFound = true;
                    vm.devices.push(device);
                    $scope.$apply();
                });
            } else {
                vm.loading = false;
                bluetoothService.stopScan(function(result) {
                    //console.log('scan stopped');
                });
            }
        }

        function information(id) {
            vm.loading = true;
            async.series([
                function(callback) {
                    bluetoothService.connect(id,function (result) {
                      if (result===true) {
                        bluetoothService.information(id,function (error,result) {
                          console.log(result);
                          callback(null,result);
                        });
                      } else {
                        callback("connection with "+id+" failed");
                      }
                    });
                },
                function(callback) {
                    // do some more stuff ...
                    callback(null, 'two');
                }
            ],
            // optional callback
            function(err, results) {
                if (err) {
                  vm.loading = false;
                  $scope.$apply();
                } else {
                  vm.loading = false;
                  vm.connected = id;
                  $scope.$apply();
                }
                // results is now equal to ['one', 'two']
            });
        }
        function configure(id) {
          vm.loading = true;
          bluetoothService.configure(id,vm.ssid,vm.psk,function (err,state) {
              if (err) {
                console.log(err);
                vm.loading = false;
                $scope.$apply();
              } else {
                console.log(state);
                bluetoothService.disconnect(id,function (result) {
                  vm.connected= null;
                  vm.loading = false;
                  $scope.$apply();
                });
              }
              console.log(state);
          });
        }
        function disconnect(id) {
          vm.loading = true;
          bluetoothService.disconnect(id,function (result) {
            vm.connected= null;
            vm.loading = false;
            $scope.$apply();
          });
        }
    }
})();
