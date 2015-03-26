'use strict';

angular.module('core').directive('filters', [
    function() {
        return {
            scope: {
            },
            templateUrl: 'modules/core/directives/filters.client.template.html'
        };
    }
]);