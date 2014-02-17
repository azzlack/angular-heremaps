/**
 * Angular HERE Maps - AngularJS Provider for working with the HERE Maps API
 * @version v1.0.0 - 2014-02-17
 * @link https://github.com/azzlack/angular-heremaps
 * @author Ove Andersen <ove.andersen@outlook.com>, http://www.eyecatch.no/
 * @license Apache License, Version 2.0, http://opensource.org/licenses/Apache-2.0
 */
(function (document, angular) {
    'use strict';
    angular.module('eyecatch.heremaps', []);

    angular.module('eyecatch.heremaps').provider('heremaps', function () {
        this._initialized = false;
        this._loaded = false;

        this.settings = {
            appId: '',
            appCode: '',
            secureConnection: true,
            testMode: true
        };

        this.$get = function ($rootScope, $log) {
            var self = this;

            if (!self._initialized) {
                var elem = document.createElement('script');
                elem.type = 'text/javascript';
                elem.src = 'https://js.api.here.com/se/2.5.3/jsl.js?blank=true';
                document.getElementsByTagName('head')[0].appendChild(elem);

                elem.onload = function () {
                    // Load features
                    nokia.Features.load(
                        nokia.Features.getFeaturesFromMatrix(['all']),
                        function () {
                            $log.info('HERE maps API loaded');

                            self._loaded = true;

                            self.appId(self.settings.appId);
                            self.appCode(self.settings.appCode);
                            self.secureConnection(self.settings.secureConnection);
                            self.testMode(self.settings.testMode);

                            $rootScope.$broadcast('heremaps-loaded');
                        },
                        function (error) {
                            $log.error('HERE maps API failed to load. ' + error);

                            $rootScope.$broadcast('heremaps-error', error);
                        },
                        null,
                        false
                    );

                    $rootScope.$broadcast('heremaps-initialized');
                };

                self._initialized = true;
            }

            return self;
        };

        this.appId = function (appId) {
            if (appId) {
                this.settings.appId = appId;

                if (this._loaded) {
                    nokia.Settings.set('app_id', this.settings.appId);
                }
            }

            return this.settings.appId;
        };

        this.appCode = function (appCode) {
            if (appCode) {
                this.settings.appCode = appCode;

                if (this._loaded) {
                    nokia.Settings.set('app_code', this.settings.appCode);
                }
            }

            return this.settings.appCode;
        };

        this.secureConnection = function (secureConnection) {
            if (secureConnection === Boolean) {
                this.settings.secureConnection = secureConnection;

                if (secureConnection === true && this._loaded) {
                    nokia.Settings.set('secureConnection', 'force');
                }
            }

            return this.settings.secureConnection;
        };

        this.testMode = function (testMode) {
            if (testMode === Boolean) {
                this.defaultSettings.testMode = testMode;

                if (testMode === true && this._loaded) {
                    nokia.Settings.set('serviceMode', 'cit');
                }
            }

            return this.settings.testMode;
        };
    });
})(document, window.angular);