'use strict';

angular.module('core').directive('videorow', [
    function() {
        return {
            scope: {
                video: '='
            },
            templateUrl: 'modules/core/directives/videorow.client.template.html'
        };
    }
]);