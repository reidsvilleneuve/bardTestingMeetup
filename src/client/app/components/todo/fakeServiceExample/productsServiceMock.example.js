/*
 This is a mock for the non-functional "product" service that was created for demonstration purposes.
 Mocks that are sharable between components allow for less repeated code, and this is an easy way to achieve that.

 "mocks" is an object that exists on the global scope, and would be used in the test itself like so:

 bard.mockService(ProductService, mocks.ProductServiceMock($q));
 */

var mocks = mocks || {};

(function(mocks) {
    'use strict';

    mocks.ProductServiceMock = function($q) {
        var lastSearchQuery = {};

        return {
            //Utility functions
            data: getData,
            result: getResult,
            getLastSearch: getLastSearch,

            //Service endpoint mocks
            remove: remove,
            loadById: loadById,
            search: search,

            _default: getResult
        };

        //Utility functions

        function getData() {
            return [
                {
                    _id: 1,
                    name: 'Mock Product 1'
                },
                {
                    _id: 2,
                    name: 'Mock Product 2'
                }
            ];
        }

        function getResult() {
            return $q.when({
                data: getData(),
                recordCount: getData().length
            });
        }

        function getLastSearch() {
            return lastSearchQuery;
        }

        //Service endpoint mocks

        function remove(id) {
            return $q.when('Mock DELETE: ' + id);
        }

        function loadById(id) {
            id = parseInt(id, 10);

            return $q.when({
                //Assume lodash is on the global scope for the purpose of simplicity.
                data: _.find(getData(), {_id: id})
            });
        }

        function search(qry) {
            lastSearchQuery = qry;
            return getResult();
        }
    };
})(mocks);
