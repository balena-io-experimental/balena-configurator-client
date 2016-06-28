(function() {
    'use strict';

    angular
        .module('app.bluetooth')
        .factory('bluetoothService', bluetoothService);

    /* @ngInject */
    function bluetoothService() {
        var service = {
            enabled: enabled,
            startScan: startScan,
            stopScan: stopScan,
            information: information,
            connect: connect,
            disconnect: disconnect,
            configure: configure
        };

        return service;

        function enabled(callback) {
            ble.isEnabled(
                function() {
                    callback(true);
                },
                function() {
                    callback(false);
                }
            );
        }

        function startScan(callback) {
            ble.startScan(['F1D46062-7FD3-4C17-B096-9E8D61E15583'], function(device) {
                callback(device);
            }, function(err) {
                console.log("error", err);
            });
        }

        function stopScan(callback) {
            ble.stopScan(function() {
                callback(true);
            }, function(err) {
                callback(false);
            });
        }

        function connect(id, callback) {
            ble.connect(id, function() {
                callback(true);
            }, function() {
                callback(false);
            });
        }

        function configure(id, ssid, psk, cb) {
            async.series([
                    function(callback) {
                        // set WiFi SSID
                        ble.write(id, 'F1D46062-7FD3-4C17-B096-9E8D61E15583', 'FFFFFFFF-FFFF-FFFF-FFFF-FFFFFFFFFFF4', stringToBytes(ssid), function success() {
                            callback(null);
                        }, function failure(error) {
                            callback(error);
                        });
                    },
                    function(callback) {
                        // set WiFi PSK
                        ble.write(id, 'F1D46062-7FD3-4C17-B096-9E8D61E15583', 'FFFFFFFF-FFFF-FFFF-FFFF-FFFFFFFFFFF5', stringToBytes(psk), function success() {
                            callback(null);
                        }, function failure(error) {
                            callback(error);
                        });
                    },
                    function(callback) {
                        // set WiFi PSK - any data triggers the action so the shorter the better
                        ble.writeWithoutResponse(id, 'F1D46062-7FD3-4C17-B096-9E8D61E15583', 'FFFFFFFF-FFFF-FFFF-FFFF-FFFFFFFFFFF6', stringToBytes("1"), function success() {
                            callback(null);
                        }, function failure(error) {
                            callback(error);
                        });
                    },
                    function(callback) {
                        // let the device connect and check device WiFi state
                        setTimeout(function() {
                            ble.read(id, 'F1D46062-7FD3-4C17-B096-9E8D61E15583', 'FFFFFFFF-FFFF-FFFF-FFFF-FFFFFFFFFFF2', function success(data) {
                                callback(null, bytesToString(data));
                            }, function failure(error) {
                                callback(error);
                            });
                        }, 5000);
                    }
                ],
                // optional callback
                function(err, results) {
                    if (err) {
                        cb(err);
                    } else {
                        cb(null, results[0]);
                    }
                });
        }

        function information(id, cb) {
            async.series([
                    function(callback) {
                        // get device Resin UUID
                        ble.read(id, 'F1D46062-7FD3-4C17-B096-9E8D61E15583', 'FFFFFFFF-FFFF-FFFF-FFFF-FFFFFFFFFFF1', function success(data) {
                            callback(null, bytesToString(data));
                        }, function failure(error) {
                            callback(error);
                        });
                    },
                    function(callback) {
                        // get device WiFi state
                        ble.read(id, 'F1D46062-7FD3-4C17-B096-9E8D61E15583', 'FFFFFFFF-FFFF-FFFF-FFFF-FFFFFFFFFFF2', function success(data) {
                            callback(null, bytesToString(data));
                        }, function failure(error) {
                            callback(error);
                        });
                    }
                ],
                // optional callback
                function(err, results) {
                    if (err) {
                        cb(err);
                    } else {
                        cb(null, {
                            uuid: results[0],
                            state: results[1]
                        });
                    }
                });
        }

        function disconnect(id, callback) {
            ble.disconnect(id, function() {
                if (callback) {
                  callback(true);
                }
            }, function() {
              if (callback) {
                callback(false);
              }
            });
        }

        // ASCII only
        function stringToBytes(string) {
            var array = new Uint8Array(string.length);
            for (var i = 0, l = string.length; i < l; i++) {
                array[i] = string.charCodeAt(i);
            }
            return array.buffer;
        }

        // ASCII only
        function bytesToString(buffer) {
            return String.fromCharCode.apply(null, new Uint8Array(buffer));
        }
    }
})();
