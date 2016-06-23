cordova.define('cordova/plugin_list', function(require, exports, module) {
module.exports = [
    {
        "file": "plugins/cordova-plugin-bluetoothle/www/bluetoothle.js",
        "id": "cordova-plugin-bluetoothle.BluetoothLe",
        "clobbers": [
            "window.bluetoothle"
        ]
    },
    {
        "file": "plugins/cordova-plugin-splashscreen/www/splashscreen.js",
        "id": "cordova-plugin-splashscreen.SplashScreen",
        "clobbers": [
            "navigator.splashscreen"
        ]
    }
];
module.exports.metadata = 
// TOP OF METADATA
{
    "cordova-plugin-whitelist": "1.2.2",
    "cordova-plugin-bluetoothle": "4.0.0",
    "cordova-plugin-splashscreen": "3.2.2"
};
// BOTTOM OF METADATA
});