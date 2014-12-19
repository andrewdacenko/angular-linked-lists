(function() {
    'use strict';

    angular.module('angularLinkedLists', ['angularLinkedLists.tpls', 'angularLinkedLists.directives']);
    angular.module('angularLinkedLists.tpls', ['template/angular-linked-list/linked-list.html']);
    angular.module('angularLinkedLists.directives', [])
        .directive('linkedLists', linkedLists);

    function linkedLists() {
        return {
            restrict: 'EA',
            templateUrl: 'template/angular-linked-list/linked-list.html',
            scope: {
                data: '=',
                selected: '=',
                selectionUpdated: '&'
            },
            link: link,
            controller: ListsController,
            controllerAs: 'lists'
        };

        function link(scope, el, attr, ctrl) {};
    };

    ListsController.$inject = ['$scope'];

    function ListsController($scope) {
        $scope.data = $scope.data;
        $scope.selected = $scope.selected;
        $scope.select = select;
        $scope.remove = remove;

        activate();

        function activate() {
            $scope.data = $scope.data.map(function(i) {
                return angular.extend({
                    selected: false
                }, i);
            });

            getSelected();
        };

        function getSelected() {
            // erase selected array
            $scope.selected.length = 0;

            for (var i = $scope.data.length - 1; i >= 0; i--) {
                if ($scope.data[i].selected) {
                    $scope.selected.push($scope.data[i]);
                }
            };
        };

        function select(item) {
            if (item.selected) return;

            item.selected = true;
            $scope.selected.push(item);

            $scope.selectionUpdated();
        };

        function remove(item) {
            var index = $scope.selected.indexOf(item);

            if (index !== -1) {
                $scope.selected.splice(index, 1);
                item.selected = false;
            };

            $scope.selectionUpdated();
        };
    };

    angular.module('template/angular-linked-list/linked-list.html', []).run(['$templateCache',
        function($templateCache) {
            $templateCache.put('template/angular-linked-list/linked-list.html',
                '<div>' +
                '    <h3>Initial items</h3>' +
                '    <ul>' +
                '        <li ng-repeat="i in data | orderBy:\'title\'" ng-click="select(i)"><span ng-bind="i.title"></span> <span ng-if="i.selected">&#10004;</span></li>' +
                '    </ul>' +
                '<div>' +
                '<div>' +
                '    <h3>Selected items</h3>' +
                '    <ul>' +
                '        <li ng-repeat="i in selected | orderBy:\'title\'" ng-click="remove(i)"><span ng-bind="i.title"></span> <span>X</span></li>' +
                '    </ul>' +
                '<div>'
            );
        }
    ]);
})();