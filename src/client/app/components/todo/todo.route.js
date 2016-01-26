(function() {
    'use strict';

    angular
        .module('app.components.todo')
        .run(appRun);

    appRun.$inject = ['routerHelper'];

    /* @ngInject */
    function appRun(routerHelper) {
        routerHelper.configureStates(getStates());
    }

    function getStates() {
        var route = [
            {
                state: 'todo',
                config: {
                    url: '/todo',
                    template: '<todo todos="vm.todos"></todo>',
                    controller: TodoController,
                    controllerAs: 'vm',
                    title: 'TODO List',
                    settings: {
                        nav: 2,
                        content: 'TODO'
                    },
                    resolve: {
                        todos: loadTodos
                    }
                }
            }
        ];

        TodoController.$inject = ['todos'];
        function TodoController(todos) {
            var vm = this;
            vm.todos = todos;
        }

        loadTodos.$inject = ['todoService'];
        function loadTodos(todoService) {
            return todoService.getAll();
        }

        return route;
    }
})();
