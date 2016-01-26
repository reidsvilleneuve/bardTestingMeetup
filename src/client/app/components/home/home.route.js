(function() {
    'use strict';

    angular
        .module('app.components.home')
        .run(appRun);

    appRun.$inject = ['routerHelper'];

    /* @ngInject */
    function appRun(routerHelper) {
        routerHelper.configureStates(getStates());
    }

    function getStates() {
        return [
            {
                state: 'home',
                config: {
                    url: '/',
                    template: '<home></home>',
                    title: 'Home',
                    settings: {
                        nav: 1,
                        content: 'Home'
                    }
                }
            }
        ];
    }
})();
