/*
 This is a non-functional service created for demonstration purposes.
 Note that myRestService does not exit - it represents a service that allows us to forgo $http boilerplate.
 *.example.js files have been excluded in the gulp config file, so this won't cause an issue.
 */

(function() {
    'use strict';

    angular.module('app.services')
        .factory('ProductService', ProductService);

    ProductService.$inject = ['myRestService'];

    function ProductService(myRestService) {

        var resource = '/api/products';

        return {
            remove: remove,
            loadAll: loadAll,
            loadById: loadById,
            save: save,
            search: search
        };

        function remove(id) {
            return myRestService.DELETE(resource + '/' + id);
        }

        function loadAll() {
            return myRestService.GET(resource);
        }

        function loadById(id) {
            return myRestService.GET(resource + '/' + id);
        }

        function save(data) {
            if (data._id) {
                return myRestService.PUT(resource + '/' + data._id, data);
            } else {
                return myRestService.POST(resource, data);
            }
        }

        function search(qry, limit, offset) {
            var obj = {
                qry: qry,
                offset: offset,
                limit: limit
            };

            return myRestService.GET(resource + '/search', obj);
        }
    }
})();
