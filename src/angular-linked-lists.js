(function() {
    'use strict';

    angular.module('angularLinkedLists', ['angularLinkedLists.tpls', 'angularLinkedLists.directives', 'angularLinkedLists.filters']);
    angular.module('angularLinkedLists.tpls', ['template/angular-linked-list/linked-lists.html']);
    angular.module('angularLinkedLists.directives', [])
        .directive('linkedLists', linkedLists);

    function linkedLists() {
        return {
            restrict: 'EA',
            templateUrl: 'template/angular-linked-list/linked-lists.html',
            scope: {
                // filter: '=?',
                data: '=',
                selected: '=',
                selectionUpdated: '&'
            },
            link: link,
            controller: LinkedListsController,
            controllerAs: 'lists'
        };

        function link(scope, el, attr, ctrl) {
            scope.filterable = attr.filterable !== undefined;
        };
    };

    LinkedListsController.$inject = ['$scope'];

    function LinkedListsController($scope) {
        $scope.data = $scope.data;
        $scope.search = $scope.search;
        $scope.filterable = $scope.filterable;
        $scope.selected = $scope.selected;
        $scope.select = select;
        $scope.remove = remove;
        $scope.isSelected = isSelected;

        function select(item) {
            if ($scope.isSelected(item)) return;

            $scope.selected.push(item);

            $scope.selectionUpdated();
        };

        function remove(item) {
            var index = $scope.selected.indexOf(item);

            if (index !== -1) {
                $scope.selected.splice(index, 1);
            };

            $scope.selectionUpdated();
        };

        function isSelected(item) {
            return $scope.selected.indexOf(item) !== -1;
        };
    };

    angular.module('angularLinkedLists.filters', [])
        .filter('linkedListsFilter', linkedListsFilter);

    linkedListsFilter.$inject = ['$filter'];

    function linkedListsFilter($filter) {
        return function(collection, selected, search) {
            return selected.reduce(function(arr, item) {
                return arr.indexOf(item) === -1 ? arr.concat([item]) : arr;
            }, $filter('filter')(collection, search));
        };
    };

    angular.module('template/angular-linked-list/linked-lists.html', []).run(['$templateCache',
        function($templateCache) {
            $templateCache.put('template/angular-linked-list/linked-lists.html',
                '<div>' +
                '    <div ng-show="filterable">' +
                '         <p>Filter: {{search}}</p>' +
                '         <p><input ng-model="search"></p>' +
                '    </div>' +
                '    <h3>Initial items</h3>' +
                '    <ul>' +
                '        <li ng-repeat="i in data | linkedListsFilter:selected:search | orderBy:\'title\' track by $index" ng-click="select(i)"><span ng-bind="i.title"></span> <span ng-if="isSelected(i)">&#10004;</span></li>' +
                '    </ul>' +
                '<div>' +
                '<div>' +
                '    <h3>Selected items</h3>' +
                '    <ul>' +
                '        <li ng-repeat="i in selected | orderBy:\'title\' track by $index" ng-click="remove(i)"><span ng-bind="i.title"></span> <span>X</span></li>' +
                '    </ul>' +
                '<div>'
            );
        }
    ]);
})();