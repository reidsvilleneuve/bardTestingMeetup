/* jshint -W117, -W030 */
(function() {
    'use strict';

    describe('Directive: designSpecs', function() {

        var element,
            vm;

        beforeEach(function() {
            bard.appModule('app.components.todo', 'blocks.logger');

            bard.inject(
                '$compile',
                '$q',
                '$rootScope',
                '$templateCache',
                'todoService',
                'logger'
            );

            bard.mockService(todoService, {
                update: $q.when('Hello!'),
                remove: $q.when('Bye bye!')
            });

            bard.mockService(logger, {});
        });

        beforeEach(function() {
            var html = angular.element('<todo></todo>');
            $rootScope = $rootScope.$new();
            $templateCache.put('app/components/todo/todo.html', '');
            element = $compile(html)($rootScope);

            $rootScope.$digest(element);

            vm = element.controller('todo');
        });

        bard.verifyNoOutstandingHttpRequests();

        it('Opens the designEdit.directive', function() {
            expect(element).to.be.ok();
            expect(vm).to.be.ok();
        });

        describe('vm.save()', function() {
            it('Should log a notification', function(done) {
                vm.save('Test').then(function(result) {
                    expect(result).to.equal('Hello!');
                    expect(logger.success.called).to.be.true;
                    done();
                });

                $rootScope.$apply();
            });
        });
    });
})();
