'use strict';

// Setting up route
angular.module('core').config(['$stateProvider', '$urlRouterProvider',
	function($stateProvider, $urlRouterProvider) {
		// Redirect to home view when route not found
		$urlRouterProvider.otherwise('/videos');

		// Home state routing
		$stateProvider.
		state('videos', {
			url: '/videos',
			templateUrl: 'modules/core/views/videos.client.view.html'
		}).
        state('news', {
            url: '/news',
            templateUrl: 'modules/core/views/news.client.view.html'
        }).
        state('about', {
            url: '/about',
            templateUrl: 'modules/core/views/about.client.view.html'
        });
	}
]);