'use strict';

angular.module('core').controller('VideoController', ['$scope', '$timeout', 'VideoService',
    function($scope, $timeout, VideoService) {
        $scope.updateVideos = function(limit, searchText) {
            VideoService.getVideos(limit, searchText)
                .success(function(response) {
                    $scope.videos = response;
                    if(response.length > 0) {
                        $timeout(function() {
                            $scope.toggleFilters(true);
                        }, 1500);
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

        $scope.playerSearchText = '';
        $scope.playersAutocompleteList = [];

        $scope.updatePlayersAutocompleteList = function() {
            if($scope.playerSearchText.length > 0) {
                VideoService.getPlayersLike($scope.playerSearchText)
                    .success(function (response) {
                        $scope.playersAutocompleteList = response;
                    })
                    .error(function (response) {
                        console.log('error! ' + response);
                    });
            } else {
                $scope.playersAutocompleteList = [];
            }
        };

        $scope.updateVideos(10);
    }
]);