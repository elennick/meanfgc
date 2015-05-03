'use strict';

angular.module('core').directive('videorow', [
    function() {
        return {
            scope: {
                video: '='
            },
            templateUrl: 'modules/core/directives/videorow.client.template.html',
            link: function(scope, element, attrs, controller) {
//                if(scope.video.postDate) {
//                    scope.video.postDate = moment(scope.video.postDate);
//                }

                if(!scope.video.game) {
                    scope.video.game = 'Unknown';
                }

                if(!scope.video.type) {
                    scope.video.type = 'Unknown';
                }

                if(!scope.video.event) {
                    scope.video.event = 'Unknown';
                }

                scope.video.playersString = 'Unknown';
                scope.video.charactersString = 'Unknown';
                for(var i = 0; i < scope.video.players.length; i++) {
                    if(i === 0) {
                        scope.video.playersString = scope.video.players[i].player;
                    } else {
                        scope.video.playersString += ', ';
                        scope.video.playersString += scope.video.players[i].player;
                    }

                    if(i === 0) {
                        scope.video.charactersString = scope.video.players[i].character;
                    } else {
                        scope.video.charactersString += ', ';
                        scope.video.charactersString += scope.video.players[i].character;
                    }
                }
            }
        };
    }
]);