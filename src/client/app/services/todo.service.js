(function () {
    'use strict';

    angular
        .module('app.services')
        .factory('todoService', todoService);

    todoService.$inject = ['$http', '$q', 'logger'];

    /* @ngInject */
    function todoService($http, $q, logger) {
        var service = {
            getAll: getAll,
            remove: remove,
            update: update
        };

        return service;

        //////////

        function getAll() {
            return $http.get('/api/todos')
                .then(function(response) {
                    return response.data;
                })
                .catch(function(error) {
                    var msg = 'query for TODO list failed. ' + error.data.description;
                    logger.error(msg);
                    return $q.reject(msg);
                });
        }

        function remove(id) {
            return $http.delete('/api/todos/' + id)
                .catch(function (error) {
                    var msg = 'delete for TODO item failed. ' + error.data.description;
                    logger.error(msg);
                    return $q.reject(msg);
                });
        }

        function update(todo) {
            return $http.put('/api/todos/' + todo.id, todo)
                .then(function (response) {
                    return response.data;
                })
                .catch(function(error) {
                    var msg = 'update for TODO item failed. ' + error.data.description;
                    logger.error(msg);
                    return $q.reject(msg);
                });
        }
    }
})();
