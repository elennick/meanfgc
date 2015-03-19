'use strict';

//Menu service used for managing  menus
angular.module('core').service('VideoService', ['$http',

    function($http) {
        this.getVideos = function() {
            return $http.get('/videos');
        };
    }
]);