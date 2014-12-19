(function() {
    'use strict';

    angular.module('linked', ['angularLinkedLists'])
        .controller('LinkedController', LinkedController);

    function LinkedController() {
        this.data = [{
            id: 213,
            title: 'Ukraine',
            selected: true
        }, {
            id: 1,
            title: 'Andorra'
        }, {
            id: 34,
            title: 'Great Britain'
        }, {
            id: 75,
            title: 'United States'
        }];

        this.selected = [];

        this.updateOnServer = updateOnServer;

        function updateOnServer() {
            console.log('updateOnServer');
        };
    };
})();