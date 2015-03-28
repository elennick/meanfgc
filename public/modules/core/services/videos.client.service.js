'use strict';

//Menu service used for managing  menus
angular.module('core').service('VideoService', ['$http',
    function($http) {
        this.getVideos = function(limit, searchText) {
            return $http({
                method: 'GET',
                url: 'videos',
                params: { limit: limit, searchText: searchText }
            });
        };
    }
]);