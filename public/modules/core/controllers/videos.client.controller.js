'use strict';

angular.module('core').controller('VideoController', ['$scope', 'VideoService',
    function($scope, VideoService) {
        $scope.updateVideos = function(limit, searchText) {
            VideoService.getVideos(limit, searchText)
                .success(function(response) {
                    $scope.videos = response;
                })
                .error(function(response) {
                    console.log('error! ' + response);
                });
        };

        $scope.$on('go-clicked', function(event, data) {
            $scope.updateVideos(10, data);
        });

        $scope.filterButtonClicked = function() {
            $('#filter-container').slideToggle();
        };

        $scope.updateVideos(10);
    }
]);