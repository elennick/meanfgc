'use strict';

angular.module('core').directive('filters', [
    function() {
        return {
            templateUrl: 'modules/core/directives/filters.client.template.html',
            link: function(scope, element, attrs) {
                scope.searchText = '';

                scope.onGoClicked = function() {
                    scope.$emit('go-clicked', scope.searchText);
                };
            }
        };
    }
]);