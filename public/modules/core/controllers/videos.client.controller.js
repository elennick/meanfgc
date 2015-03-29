'use strict';

angular.module('core').controller('VideoController', ['$scope', 'VideoService',
    function($scope, VideoService) {
        $scope.updateVideos = function(limit, searchText) {
            VideoService.getVideos(limit, searchText)
                .success(function(response) {
                    $scope.videos = response;
                    if(response.length > 0) {
                        $scope.toggleFilters(true);
                    }
                })
                .error(function(response) {
                    console.log('error! ' + response);
                });
        };

        $scope.$on('go-clicked', function(event, data) {
            $scope.updateVideos(10, data);
        });

        $scope.filterButtonClicked = function() {
            $scope.toggleFilters();
        };

        $scope.toggleFilters = function(hide) {
            var filterContainer = $('#filter-container');
            if(hide) {
                filterContainer.slideUp();
            } else {
                filterContainer.slideToggle();
            }
        };

        $scope.updateVideos(10);
    }
]);