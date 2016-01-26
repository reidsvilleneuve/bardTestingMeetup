(function() {
    'use strict';

    angular
        .module('app.layout')
        .controller('ShellController', ShellController);

    ShellController.$inject = ['$rootScope', '$timeout', 'config', 'logger'];
    /* @ngInject */
    function ShellController($rootScope, $timeout, config, logger) {
        var vm = this;
        vm.busyMessage = 'Please wait ...';
        vm.isBusy = true;
        $rootScope.splashMessage = getSplashMessage();
        $rootScope.showSplash = true;
        vm.navline = {
            title: config.appTitle,
            text: 'BrieBug Powered!',
            link: 'http://www.briebug.com'
        };

        activate();

        function activate() {
            logger.success(config.appTitle + ' loaded!', null);
            hideSplash();
        }

        function hideSplash() {
            //Force a 1 second delay so we can see the splash.
            $timeout(function() {
                $rootScope.showSplash = false;
            }, 1000);
        }

        function getSplashMessage() {
            var messages = [
                'Hello',
                'I <3 testing!',
                'I dream of Mocha',
                'Bard sings to me',
                'Go away!',
                '[expletive deleted]'
            ];
            var now = new Date();
            return messages[now.getMilliseconds() % 6];
        }
    }
})();
