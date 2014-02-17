angular-heremaps
================

AngularJS Provider for working with the HERE Maps API

### Getting started

1. Add the `eyecatch.heremaps` module to your app:

        angular.module('MyApp', ['eyecatch.heremaps'])

2. Inject the `heremaps` provider to your controller/directive/module:

        angular.module('MyApp', [ 'eyecatch.heremaps'])
            .run(function ($rootScope, $state, $stateParams, $angularCacheFactory, $http, $log, heremaps) {
                ...
            }
            
3. Add HERE Maps config inside the `run` method above

        heremaps.appId("xyz");
        heremaps.appCode("xyz");
        
4. Subscribe to the `heremaps-loaded` message on the `$rootScope` that indicates that the map resources are ready

        $rootScope.$on('heremaps-loaded', function () {
            $scope.map = new nokia.maps.map.Display('mapContainerID', {
                components: [
                    new nokia.maps.map.component.Behavior()
                ],
                zoomLevel: 4,
                center: [64, 10]
            });
        });

### Contributing

1. Fork the repository

2. [Install grunt](http://gruntjs.com/getting-started#installing-the-cli)

3. Run `npm install` to install dependencies

4. To test your contribution, run `grunt`

5. When all tests are passing, run `grunt build` to minify all files

6. Submit a pull request.

### Changelog

##### 1.0.0

Initial release
