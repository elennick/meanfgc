'use strict';

angular.module('core').controller('VideoController', ['$scope', 'VideoService',
    function($scope, VideoService) {
        VideoService.getVideos()
            .success(function(response) {
                $scope.videos = response;
            })
            .error(function(response) {
                console.log('error! ' + response);
            });
    }
]);