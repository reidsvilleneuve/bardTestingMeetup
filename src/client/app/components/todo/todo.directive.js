(function () {

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
            //return added
            return todoService.update(t)
                //result added
                .then(function (result) {
                    logger.success('TODO item successfully saved to server');
                    //return added
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
