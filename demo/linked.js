(function() {
    'use strict';

    angular.module('linked', ['angularLinkedLists'])
        .controller('LinkedController', LinkedController);

    function LinkedController() {
        this.data = [{
            id: 213,
            title: 'Ukraine',
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

        this.selected = [this.data[0]];

        this.updateOnServer = updateOnServer;

        function updateOnServer() {
            console.log('updateOnServer');
        };
    };
})();