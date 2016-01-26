(function () {

    angular.module('app.components.home')
        .directive('home', homeDirective);

    function homeDirective() {
        return {
            restrict: 'E',
            templateUrl: 'app/components/home/home.html',
            scope: {},
            controller: HomeController,
            controllerAs: 'vm',
            bindToController: true
        };
    }

    function HomeController() {
        var vm = this;

        vm.init = init;

        //////////

        function init() {
            vm.title = 'Home';
            vm.wColor = 'wred';
        }
    }

})();
