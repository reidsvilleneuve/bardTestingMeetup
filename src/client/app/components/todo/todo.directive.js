(function() {

    angular.module('app.components.todo')
        .directive('todo', todoDirective);

    function todoDirective() {
        return {
            restrict: 'E',
            templateUrl: 'app/components/todo/todo.html',
            scope: {
                todos: '='
            },
            controller: TodoController,
            controllerAs: 'vm',
            bindToController: true
        };
    }

    TodoController.$inject = ['todoService', 'logger'];
    function TodoController(todoService, logger) {
        var vm = this;

        vm.init = init;
        vm.save = save;
        vm.remove = remove;

        //////////

        function init() {
            vm.title = 'TODO List';
            vm.wColor = 'wviolet';
        }

        function save(t) {
            //Promise returned here for the purpose of mocked data demonstration.
            return todoService.update(t)
                .then(function(result) {
                    logger.success('TODO item successfully saved to server');
                    return result;
                });
        }

        function remove(index) {
            todoService.remove(vm.todos[index].id)
                .then(function() {
                    vm.todos.splice(index, 1);
                    logger.success('TODO item successfully removed from server');
                });
        }
    }

})();
