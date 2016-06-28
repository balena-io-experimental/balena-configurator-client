# resin-configurator-client
a cross-platform companion app for [resin-wifi-connect-ble](https://github.com/resin-io-playground/wifi-connect-ble)

![screenshot1](https://raw.githubusercontent.com/resin-io-playground/resin-configurator-client/master/docs_assets/0.jpg)

![screenshot2](https://raw.githubusercontent.com/resin-io-playground/resin-configurator-client/master/docs_assets/1.jpg)

### Installation

```
npm install -g cordova cordova-icon cordova-splash

bower install
```

### Customization

* You might want to change `name`,`description` and `author` tags from [config.xml](https://github.com/resin-io-playground/resin-configurator-client/blob/master/config.xml)
* the [icon.png](https://github.com/resin-io-playground/resin-configurator-client/blob/master/icon.png) in the root of the projects gets automatically converted in all the required icon formats/sizes. Simply put your one with same sizes than the provided one and build.

### Testing

```
cordova clean
cordova run android
```

### Building

```
cordova clean
cordova build android
```


## License

Copyright 2016 Rulemotion Ltd.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

[http://www.apache.org/licenses/LICENSE-2.0](http://www.apache.org/licenses/LICENSE-2.0)

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
